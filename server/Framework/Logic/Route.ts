import ApiRoutes from "@/server/Routes/api";
import { NextRequest, NextResponse } from "next/server";

type RouteType = {
    method: string,
    path: string,
    handler: Handler
}

interface Handler extends Function { 
    (req: NextRequest | null): Promise<NextResponse<unknown>>;
}

class Route {
    routes: RouteType[] = [];

    constructor() {
        this.routes = [];
    }

    GET(path: string, handler: Handler) { 
        // Check if path doesnt already exist
        for (let route of this.routes) {
            if (route.path === path && route.method === 'GET') {
                return;
            }
        }
        this.routes.push({ method: 'GET', path, handler })
    }

    POST(path: string, handler: Handler) { 
        for (let route of this.routes) {
            if (route.path === path && route.method === 'POST') {
                return;
            }
        }
        this.routes.push({ method: 'POST', path, handler })
    }

    PUT(path: string, handler: Handler) { 
        for (let route of this.routes) {
            if (route.path === path && route.method === 'PUT') {
                return;
            }
        }
        this.routes.push({ method: 'PUT', path, handler })
    }

    DELETE(path: string, handler: Handler) { 
        for (let route of this.routes) {
            if (route.path === path && route.method === 'DELETE') {
                return;
            }
        }
        this.routes.push({ method: 'DELETE', path, handler })
    }

    PATCH(path: string, handler: Handler) { 
        for (let route of this.routes) {
            if (route.path === path && route.method === 'PATCH') {
                return;
            }
        }
        this.routes.push({ method: 'PATCH', path, handler })
    }

    getRoutes() {
        ApiRoutes();
        return this.routes;
    }
}

class ApiRoute extends Route { 
    constructor() {
        super();
    }

    GET(path: string, handler: Handler) { 
        RouteInstance.GET(`/api${path}`, handler);
    }

    POST(path: string, handler: Handler) { 
        RouteInstance.POST(`/api${path}`, handler);
    }

    PUT(path: string, handler: Handler) { 
        RouteInstance.PUT(`/api${path}`, handler);
    }

    DELETE(path: string, handler: Handler) { 
        RouteInstance.DELETE(`/api${path}`, handler);
    }

    PATCH(path: string, handler: Handler) { 
        RouteInstance.PATCH(`/api${path}`, handler);
    }

    apiResource(path: string, handlerName: string | null = null) {
        // If handlerName is null, use the path as the handlerName
        if (handlerName === null) {
            handlerName = path.split("/")[1];
            handlerName = handlerName.charAt(0).toUpperCase() + handlerName.slice(1);
        }

        // all handler files are in server/Controllers
        const handlerFile = require(`@/server/Controllers/${handlerName}Controller.ts`);

        this.GET(`${path}`, handlerFile.index);
        this.POST(`${path}`, handlerFile.store);
        this.PUT(`${path}`, handlerFile.update);
        this.DELETE(`${path}`, handlerFile.destroy);
    }
}

// Make static instance of WebRoute and ApiRoute
const RouteInstance = new Route();
const ApiRouteInstance = new ApiRoute();

export { RouteInstance as FrameworkRouting_Do_Not_Use, ApiRouteInstance as Route }
