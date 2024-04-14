import { NextRequest, NextResponse } from "next/server";
import { db } from "../Database/schema";
import { hash } from "bcryptjs";
import User from "../Models/User";

export async function index(request: NextRequest | null = null): Promise<NextResponse<unknown>> {
    const users = await db.select().from(User.getPG());
    return NextResponse.json({
        users: users,
    })
}

export async function store(request: NextRequest): Promise<NextResponse<unknown>> {
    const { name, email, password }: {
        name: string,
        email: string,
        password: string
    } = await request.json();

    const pwHash = await hash(password, 12);
    
    const newUser = await db.insert(User.getPG()).values({ 
        name,
        email,
        password: pwHash,
        role: "reader"
    });

    return NextResponse.json({
        message: "User created",
        data: newUser
    })
}