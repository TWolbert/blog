import { NextRequest, NextResponse } from "next/server";
import { db } from "../Database/schema";
import { hash } from "bcryptjs";
import Blog from "../Models/Blog";

export async function index(request: NextRequest | null = null): Promise<NextResponse<unknown>> {
    return NextResponse.json({
        blogs: await db.select().from(Blog.getPG()),
    })
}

export async function store(request: NextRequest): Promise<NextResponse<unknown>> {
    // Todo

    return NextResponse.json({
        message: "Blog created",
        data: {}
    })
}

export async function show(request: NextRequest | null = null): Promise<NextResponse<unknown>> {
    // Todo

    return NextResponse.json({
        message: "Blog found",
        data: {}
    })
}