import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LoginSchema } from "../schemas/loginSchema"
import agent from "../api/agent"
import { useLocation, useNavigate } from "react-router";
import { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();

    const loginUser = useMutation({
        mutationFn: async (credentials: LoginSchema) => {
            await agent.post('/login?useCookies=true', credentials);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            });
        }
    });

    const registerUser = useMutation({
        mutationFn: async (credentials: RegisterSchema) => {
            await agent.post('/account/register', credentials)
        },
        onSuccess: () => {
            toast.success('Register successful - you can now login');
            navigate('/login');
        }
    })

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout');
        },
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['user'] });
            queryClient.removeQueries({ queryKey: ['activities'] });
            navigate('/');
        }
    })

    const { data: currentUser, isLoading, isFetching } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user']) 
            && location.pathname !== '/login'
            && location.pathname !== '/register'
    })

    let loginStatus: AuthStatus = "checking";

    if (queryClient.getQueryData<User>(["user"])) {
        loginStatus = "authenticated";
    } else if (isLoading || isFetching) {
        loginStatus = "checking";
    } else {
        loginStatus = "unauthenticated";
    }

    return {
        loginUser,
        currentUser,
        logoutUser,
        registerUser,
        loginStatus
    }
}