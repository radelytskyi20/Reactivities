import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashbord from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetail from "../../features/activities/details/ActivityDetail";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashbord /> },
            { path: 'activities/:id', element: <ActivityDetail /> },
            { path: 'createActivity', element: <ActivityForm key='create' /> },
            { path: '/manage/:id', element: <ActivityForm /> }
        ]
    }
])