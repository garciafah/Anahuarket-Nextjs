import z from "zod";

export const registerSchema = z.object({
    nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    correo: z.string().email("Correo no válido").endsWith("@anahuac.mx", "Debes usar tu correo institucional @anahuac.mx"),
    telefono: z.string().min(7, "Teléfono no válido"),
    contrasena: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type RegisterInput = z.infer<typeof registerSchema>;