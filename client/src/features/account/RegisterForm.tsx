import { UseFormSetError } from 'react-hook-form';
import { useAccount } from '../../lib/hooks/useAccount';
import { registerSchema, RegisterSchema } from '../../lib/schemas/registerSchema';
import AuthForm from './AuthForm';

export default function RegisterForm() {
    const { registerUser } = useAccount();
    const onSubmit = async (
        data: RegisterSchema,
        { setError }: { setError: UseFormSetError<RegisterSchema> }
    ) => {
        await registerUser.mutateAsync(data, {
            onError: (errors) => {
                if (Array.isArray(errors)) {
                    errors.forEach((error) => {
                        if (error.includes("Email")) setError("email", { message: error });
                        if (error.includes("Password")) setError("password", { message: error });
                    });
                }
            },
        });
    };

    return (
        <AuthForm<RegisterSchema>
            schema={registerSchema}
            title="Register"
            submitLabel="Register"
            footerText="Already have an account?"
            footerLink={{ to: "/login", label: "Sign in" }}
            fields={[
                { name: "email", label: "Email" },
                { name: "displayName", label: "Display name" },
                { name: "password", label: "Password", type: "password" }
            ]}
            onSubmitForm={onSubmit}
        />
    );
}

