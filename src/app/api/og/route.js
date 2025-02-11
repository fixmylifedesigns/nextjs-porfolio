// src/app/api/og/route.js
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: "white",
              marginBottom: 20,
            }}
          >
            Irving Jose Duran
          </h1>
          <p
            style={{
              fontSize: 30,
              color: "white",
              opacity: 0.8,
              marginBottom: 10,
            }}
          >
            Full Stack Engineer
          </p>
          <p
            style={{
              fontSize: 24,
              color: "white",
              opacity: 0.6,
            }}
          >
            Brooklyn, New York
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
