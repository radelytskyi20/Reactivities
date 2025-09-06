import { useAccount } from '../../lib/hooks/useAccount';
import { useLocation, useNavigate } from 'react-router';
import { loginSchema, LoginSchema } from '../../lib/schemas/loginSchema';
import AuthForm from './AuthForm';

export default function LoginForm() {
    const { loginUser } = useAccount();
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.from || '/activities');
            }
        });
    }

    return (
        <AuthForm<LoginSchema>
            schema={loginSchema}
            title='Sign in'
            submitLabel='Login'
            footerText="Don't have an account?"
            footerLink={{ to: "/register", label: "Sign up" }}
            fields={[
                { name: "email", label: "Email" },
                { name: "password", label: "Password", type: "password" }
            ]}
            onSubmitForm={onSubmit} />
    )
}
