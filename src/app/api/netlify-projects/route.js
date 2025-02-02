import { NextResponse } from "next/server";
import blankImage from "../../../data/images/06dc8dda360a79a8ec50.webp";
export async function GET() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    const response = await fetch("https://api.netlify.com/api/v1/sites", {
      headers: {
        Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error("Failed to fetch projects from Netlify");
    }

    const data = await response.json();

    const projects = data.map((site) => ({
      id: site.id,
      name: site.name,
      url: site.url,
      screenshot: site.screenshot_url || blankImage,
      repo_url: site.build_settings?.repo_url,
      repo_path: site.build_settings?.repo_path,
      admin_url: site.admin_url,
      created_at: site.created_at,
      updated_at: site.updated_at,
      framework: site.published_deploy?.framework,
      branch: site.published_deploy?.branch,
      deploy_url: site.deploy_url,
    }));

    return NextResponse.json(projects);
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Request timed out");
      return NextResponse.json({ error: "Request timed out" }, { status: 504 });
    }
    console.error("Error fetching Netlify projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
