// src/app/api/projects/route.js
import { NextResponse } from "next/server";
import admin from "../../../firebase/firebaseAdmin";

export async function POST(request) {
  console.log("POST request received");
  const userId = request.headers.get("X-User-ID");
  if (!userId) {
    console.log("Unauthorized: No X-User-ID header");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("Parsing request body");
    const { name, description, hostedUrl, githubUrl } = await request.json();
    console.log("Request body:", { name, description, hostedUrl, githubUrl });

    console.log("Initializing database");
    const db = admin.database();
    console.log("Database initialized");

    console.log("Creating new project reference");
    const newProjectRef = db.ref(`projects/${userId}`).push();
    console.log("New project reference created");

    console.log("Setting project data");
    await newProjectRef.set({
      name,
      description,
      hostedUrl,
      githubUrl,
      createdAt: admin.database.ServerValue.TIMESTAMP,
    });
    console.log("Project data set successfully");

    return NextResponse.json({ id: newProjectRef.key }, { status: 201 });
  } catch (error) {
    console.error("Error adding project:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
