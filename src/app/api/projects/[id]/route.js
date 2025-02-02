// src/app/api/projects/[id]/route.js
import { NextResponse } from "next/server";
import admin from "../../../../firebase/firebaseAdmin";

export async function DELETE(request, { params }) {
  const userId = request.headers.get("X-User-ID");
  const { id } = params;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = admin.database();
    const projectRef = db.ref(`projects/${userId}/${id}`);
    const snapshot = await projectRef.once("value");

    if (!snapshot.exists()) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await projectRef.remove();
    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
