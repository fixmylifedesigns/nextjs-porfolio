// src/app/api/users/route.js
import { NextResponse } from "next/server";
import admin from "../../../firebase/firebaseAdmin";
import { isAdmin } from "../../../utils/adminUtils";

export async function GET(request) {
  console.log("API route accessed");

  // Get the user's session token from the request headers
  const sessionToken = request.headers
    .get("Authorization")
    ?.split("Bearer ")[1];

  if (!sessionToken) {
    console.log("No authentication token provided");
    return NextResponse.json(
      { error: "No authentication token provided" },
      { status: 401 }
    );
  }

  try {
    console.log("Verifying session token");
    // Verify the session token and get the user
    const decodedToken = await admin.auth().verifyIdToken(sessionToken);
    console.log("Token verified, fetching user");
    const user = await admin.auth().getUser(decodedToken.uid);

    console.log("Checking if user is admin");
    // Check if the user is an admin
    if (!isAdmin(user)) {
      console.log("User is not an admin");
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    console.log("Fetching all users");
    // Fetch all users
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map((userRecord) => ({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      creationTime: userRecord.metadata.creationTime,
      lastSignInTime: userRecord.metadata.lastSignInTime,
    }));

    console.log("Successfully fetched users");
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
