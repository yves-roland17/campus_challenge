import {z} from "zod";

export const eventSchema=z.object({
    title:z.string().min(1, "le titre est requis").max(100, "le titre ne doit pas dépasser 100 caractères"),
    description:z.string().min(1, "la description est requise").max(1000, "la description ne doit pas dépasser 1000 caractères"),
    date:z.coerce.date({error:"la date est requise"}),
    image:z.string().optional().transform((val) => (val === "" ? undefined : val))
})

export const participationSchema=z.object({
    description:z.string().min(1, "la description est requise").max(1000, "la description ne doit pas dépasser 1000 caractères"),
    lien:z.string().url("le lien doit être une URL valide"),
    demo:z.string().url("le lien de démonstration doit être une URL valide").optional()
})


export const loginSchema=z.object({
    email:z.string().email("l'email doit être valide"),
    password:z.string().min(6, "le mot de passe doit contenir au moins 6 caractères")
})

export const registerSchema=z.object({
    name:z.string().min(1, "le nom est requis").max(100, "le nom ne doit pas dépasser 100 caractères"),
    email:z.string().email("l'email doit être valide"),
    password:z.string().min(6, "le mot de passe doit contenir au moins 6 caractères"),
    role: z.string().optional()
})


export const UpdateProfile=z.object({
    name:z.string().min(1, "le nom est requis").max(100, "le nom ne doit pas dépasser 100 caractères"),
    email:z.string().email("l'email doit être valide")
})
    export type eventInput=z.infer<typeof eventSchema>
    export type participationInput=z.infer<typeof participationSchema>
    export type loginInput=z.infer<typeof loginSchema>
    export type registerInput=z.infer<typeof registerSchema>