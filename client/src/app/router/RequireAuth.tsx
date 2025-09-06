import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount"
import { Typography } from "@mui/material";

export default function RequireAuth() {
    const { loginStatus } = useAccount();
    const location = useLocation();
 
    if (loginStatus === 'checking') return <Typography>Loading...</Typography>

    if (loginStatus === 'unauthenticated') return <Navigate to='/login' state={{from: location}} />

    return (
        <Outlet />
  )
}