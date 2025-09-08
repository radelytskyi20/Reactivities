import { Box, Button } from "@mui/material";
import TextInput from "../../app/shared/components/TextInput";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditProfileSchema, editProfileSchema } from "../../lib/schemas/editProfileSchema";
import { UseMutationResult } from "@tanstack/react-query";

type Props = {
    setEditMode: (editMode: boolean) => void;
    profile?: Profile;
    updateProfile: UseMutationResult<void, Error, EditProfileSchema>
}

export default function ProfileEditForm({ setEditMode, profile, updateProfile }: Props) {
    const { control, handleSubmit, reset, formState: { isDirty, isValid } } = useForm<EditProfileSchema>({
        resolver: zodResolver(editProfileSchema),
        mode: 'onTouched'
    });

    const onSubmit = (data: EditProfileSchema) => {
        updateProfile.mutate(data, {
            onSuccess: () => setEditMode(false)
        })
    }

    useEffect(() => {
        reset({
            displayName: profile?.displayName,
            bio: profile?.bio || ''
        });
    }, [profile, reset]);

    return (
        <Box component='form'
            onSubmit={handleSubmit(onSubmit)}
            display='flex'
            flexDirection='column'
            alignContent='center'
            gap={3}
            mt={3}
        >
            <TextInput label='Display Name' name='displayName' control={control} />
            <TextInput
                label='Add your bio'
                name='bio'
                control={control}
                multiline
                rows={4}
            />
            <Button
                type='submit'
                variant='contained'
                disabled={!isValid || !isDirty || updateProfile.isPending}
            >
                Update profile
            </Button>
        </Box>
    );
}
