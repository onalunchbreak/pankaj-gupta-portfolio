import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Saving is disabled in production" }, { status: 403 });
    }

    const { stations } = await request.json();

    if (!Array.isArray(stations)) {
      return NextResponse.json({ error: "Invalid stations payload format" }, { status: 400 });
    }

    const dataFilePath = path.join(
      process.cwd(),
      "src",
      "lib",
      "data.ts"
    );

    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json({ error: "data.ts file not found" }, { status: 404 });
    }

    let fileContent = fs.readFileSync(dataFilePath, "utf8");

    const stationsJsonString = JSON.stringify(stations, null, 2);
    const metroRegex = /export const METRO_STATIONS: MetroStation\[\] = \[\s*[\s\S]*?\n\];/;

    if (!metroRegex.test(fileContent)) {
      return NextResponse.json({ error: "METRO_STATIONS regex match failed in data.ts" }, { status: 500 });
    }

    fileContent = fileContent.replace(
      metroRegex,
      `export const METRO_STATIONS: MetroStation[] = ${stationsJsonString};`
    );

    fs.writeFileSync(dataFilePath, fileContent, "utf8");

    try {
      await execAsync(
        `git add "${dataFilePath}" && git commit -m "content(metro): update platform copy and case study sections via inline dev editor"`
      );
    } catch {
      // Git commit may fail if no changes
    }

    return NextResponse.json({ success: true, message: "Metro stations permanently saved to data.ts & committed!" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save metro data" }, { status: 500 });
  }
}
