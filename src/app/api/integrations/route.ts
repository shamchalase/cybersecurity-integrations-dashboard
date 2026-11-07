import { NextResponse } from "next/server";
import { integrations, categoryNames } from "@/data/integrations";

export async function GET() {
  return NextResponse.json({
    success: true,
    total: integrations.length,
    categories: categoryNames,
    data: integrations
  });
}
