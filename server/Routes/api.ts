import { store as ImageStore, show as ImageShow } from "../Controllers/ImagesController";
import { Route } from "../Framework/Logic/Route";

// Every route you define here will be prefixed with /api
function ApiRoutes() {
    Route.apiResource("/users");
    Route.apiResource("/blogs");

    Route.POST('/upload', ImageStore)
    Route.GET('/image/:id', ImageShow)
}

export default ApiRoutes;