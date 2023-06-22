import Add from "../pages/Add";
import Posts from "../pages/Posts";
import Update from "../pages/Update";

export type RoutesType = {
    path: string,
    element: React.ComponentType
}

export const ROUTES: RoutesType[] = [
    {
        path: "/",
        element: Posts
    },
    {
        path: "/add",
        element: Add
    },
    {
        path: "/update/:id",
        element: Update
    }
]