import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormSetError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { ZodSchema } from "zod";

interface AuthFormProps<T extends FieldValues> {
    schema: ZodSchema<T>;
    defaultValues?: DefaultValues<T>;
    onSubmitForm: (data: T, helpers: { setError: UseFormSetError<T> }) => void | Promise<void>;
    title: string;
    submitLabel: string;
    footerText: string;
    footerLink: {
        to: string;
        label: string
    };
    fields: {
        name: Path<T>;
        label: string;
        type?: string;
    }[];
}

export default function AuthForm<T extends FieldValues>({
    schema,
    defaultValues,
    onSubmitForm,
    title,
    submitLabel,
    footerText,
    footerLink,
    fields
}: AuthFormProps<T>) {
    const { control, handleSubmit, formState: { isValid, isSubmitting }, setError } = useForm<T>({
        mode: 'onTouched',
        resolver: zodResolver(schema),
        defaultValues: defaultValues
    });

    return (
        <Paper
            component='form'
            onSubmit={handleSubmit((data) => onSubmitForm(data, { setError }))}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                gap: 3,
                maxWidth: 'md',
                mx: 'auto',
                borderRadius: 3
            }}
        >
            <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                gap={3}
                color='secondary.main'
            >
                <LockOpen fontSize='large' />
                <Typography variant='h4'>{title}</Typography>
            </Box>
            {fields.map((field) => (
                <TextInput 
                    key={field.label} 
                    label={field.label} 
                    control={control} 
                    name={field.name} 
                    type={field?.type} 
                />
            ))}
            <Button
                type='submit'
                disabled={!isValid || isSubmitting}
                variant='contained'
                size='large'
            >
                {submitLabel}
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
                {footerText}
                <Typography sx={{ ml: 1 }} component={Link} to={footerLink.to} color='primary'>
                    {footerLink.label}
                </Typography>
            </Typography>
        </Paper>
    )
}
