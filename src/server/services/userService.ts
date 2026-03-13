import { prisma } from "@/server/db/db";
import { registerSchema, RegisterInput } from "@/types/auth.types";
import bcrypt from "bcryptjs";

export async function registerUser(data: RegisterInput) {
  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { nombre, correo, telefono, contrasena } = parsed.data;

  const exist = await prisma.usuario.findUnique({ where: { correo } });
  if (exist) return { error: "El correo ya esta registrado" };

  const hashedPassword = await bcrypt.hash(contrasena, 12);

  const saved = await prisma.usuario.create({
    data: {
      nombre,
      correo,
      telefono,
      contrasena: hashedPassword,
      fecharegistro: new Date(),
      isactive: 1,
    },
  });

  return { id: saved.idusuario, correo: saved.correo };
}

export async function getUsersByEmail(correo: string) {
  return prisma.usuario.findUnique({ where: { correo } });
}