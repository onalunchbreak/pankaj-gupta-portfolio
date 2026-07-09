import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";

const NAMESPACE = "pankaj-portfolio-v1";
const BASE_VISITORS = 1482;

export async function GET(req: NextRequest) {
  try {
    const headersList = await headers();
    
    // Extract client IP address from headers
    const rawIp = headersList.get("x-forwarded-for")?.split(",")[0] || 
                  headersList.get("x-real-ip") || 
                  "127.0.0.1";
    
    // Hash the IP address for privacy/GDPR compliance
    const hashedIp = crypto.createHash("sha256").update(rawIp).digest("hex");
    
    // 1. Check if this specific IP has already visited
    const checkRes = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/ip-${hashedIp}/`, {
      cache: "no-store",
    });
    const checkData = await checkRes.json();
    
    let count = 0;
    
    if (checkData.code === 400 || (checkData.message && checkData.message.includes("not found"))) {
      // New visitor: increment IP visit status + increment global counter
      await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/ip-${hashedIp}/up`, {
        cache: "no-store",
      });
      const upRes = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/unique-visitors/up`, {
        cache: "no-store",
      });
      const upData = await upRes.json();
      count = upData.count || 1;
    } else {
      // Existing visitor: just fetch current global unique visitors count
      const getRes = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/unique-visitors/`, {
        cache: "no-store",
      });
      const getData = await getRes.json();
      count = getData.count || 1;
    }
    
    return NextResponse.json({
      uniqueVisitors: BASE_VISITORS + count,
      success: true,
    });
  } catch (error) {
    console.error("Failed to fetch/update unique visitors counter:", error);
    // Graceful fallback: return the base count
    return NextResponse.json({
      uniqueVisitors: BASE_VISITORS,
      success: false,
    });
  }
}
