import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    // Only allow saving in local dev environment
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Saving is disabled in production" }, { status: 403 });
    }

    const { nodes, portrait } = await request.json();

    if (!Array.isArray(nodes) || !portrait) {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    const heroFilePath = path.join(
      process.cwd(),
      "src",
      "components",
      "sections",
      "hero.tsx"
    );

    if (!fs.existsSync(heroFilePath)) {
      return NextResponse.json({ error: "hero.tsx file not found" }, { status: 404 });
    }

    let fileContent = fs.readFileSync(heroFilePath, "utf8");

    // Replace UNIFIED_CANVAS_BASELINE content
    const nodesJsonString = JSON.stringify(nodes, null, 2);
    const baselineRegex = /const UNIFIED_CANVAS_BASELINE: StudioNode\[\] = \[\s*[\s\S]*?\n\];/;

    if (!baselineRegex.test(fileContent)) {
      return NextResponse.json({ error: "UNIFIED_CANVAS_BASELINE regex match failed" }, { status: 500 });
    }

    fileContent = fileContent.replace(
      baselineRegex,
      `const UNIFIED_CANVAS_BASELINE: StudioNode[] = ${nodesJsonString};`
    );

    // Replace PORTRAIT_BASELINE content
    const portraitRegex = /const PORTRAIT_BASELINE = \{ scale: \d+, x: -?\d+, y: -?\d+ \};/;
    if (portraitRegex.test(fileContent)) {
      fileContent = fileContent.replace(
        portraitRegex,
        `const PORTRAIT_BASELINE = { scale: ${portrait.scale}, x: ${portrait.x}, y: ${portrait.y} };`
      );
    }

    // Write updated content back to hero.tsx
    fs.writeFileSync(heroFilePath, fileContent, "utf8");

    // Run git commit asynchronously in local repo
    try {
      await execAsync(
        `git add "${heroFilePath}" && git commit -m "feat(hero): auto-save canvas layout and portrait parameters from studio editor"`
      );
    } catch {
      // Git commit may fail if no changes, ignore
    }

    return NextResponse.json({ success: true, message: "Hero layout permanently saved & committed to source code!" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save layout" }, { status: 500 });
  }
}
