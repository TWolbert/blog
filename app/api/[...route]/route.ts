import handleRouting from "@/server/Framework/routing";
import { NextRequest, NextResponse } from "next/server";

export async function handler(req: NextRequest) {
    return await handleRouting(req);
}

export {
    handler as GET,
    handler as POST,
    handler as PUT,
    handler as DELETE,
    handler as PATCH
}