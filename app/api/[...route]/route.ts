import handleRouting from "@/server/Framework/routing";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 60 * 60 * 24; // 24 hours

async function handler(req: NextRequest): Promise<NextResponse> {
    return await handleRouting(req);
}

export {
    handler as GET,
    handler as POST,
    handler as PUT,
    handler as DELETE,
    handler as PATCH
}