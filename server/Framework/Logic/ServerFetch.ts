import { NextResponse } from "next/server";
import { FrameworkRouting_Do_Not_Use } from "./Route";

export async function sFetch(url: string, method: string): Promise<unknown> {
    const routes = FrameworkRouting_Do_Not_Use.getRoutes();

    for (let route of routes) {
        if (route.path === url && route.method === method) {
            const res = await route.handler(null);
            const body = await res.json();
            return body;
        }
    }

    return NextResponse.json({ "message": "Route not found", "Routes": routes });
}