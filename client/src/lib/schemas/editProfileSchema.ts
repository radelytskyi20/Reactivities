import { z } from "zod";
import { requiredString } from "../utils/util";

export const editProfileSchema = z.object({
    displayName: requiredString('Display name'),
    bio: z.string().optional() 
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;