import { NextRequest, NextResponse } from "next/server";
import { FrameworkRouting_Do_Not_Use } from "./Logic/Route";
import { NextURL } from "next/dist/server/web/next-url";

export default async function handleRouting(request: NextRequest): Promise<NextResponse<unknown>> {
    const method = request.method;
    const path = request.nextUrl.pathname;

    const routes = FrameworkRouting_Do_Not_Use.getRoutes();
    for (let route of routes) {
        const routePath = route.path;
        const routeParams = getRouteParams(routePath);

        if (route.method === method && matchPath(path, routePath, routeParams)) {
            const params = extractParams(path, routePath, routeParams);
            return await route.handler(request);
        }
    }

    const response = NextResponse.json({ "message": "Route not found", "Routes": routes });
    return response;
}

function getRouteParams(routePath: string): string[] {
    const regex = /:(\w+)/g;
    const matches = routePath.match(regex);
    if (matches) {
        return matches.map(match => match.slice(1));
    }
    return [];
}

function matchPath(path: string, routePath: string, routeParams: string[]): boolean {
    const pathSegments = path.split("/");
    const routeSegments = routePath.split("/");

    if (pathSegments.length !== routeSegments.length) {
        return false;
    }

    for (let i = 0; i < pathSegments.length; i++) {
        const pathSegment = pathSegments[i];
        const routeSegment = routeSegments[i];

        if (routeSegment.startsWith(":")) {
            continue;
        }

        if (pathSegment !== routeSegment) {
            return false;
        }
    }

    return true;
}

function extractParams(path: string, routePath: string, routeParams: string[]): Record<string, string> {
    const pathSegments = path.split("/");
    const routeSegments = routePath.split("/");
    const params: Record<string, string> = {};

    for (let i = 0; i < pathSegments.length; i++) {
        const routeSegment = routeSegments[i];

        if (routeSegment.startsWith(":")) {
            const paramName = routeSegment.slice(1);
            const paramValue = pathSegments[i];
            params[paramName] = paramValue;
        }
    }

    return params;
}
