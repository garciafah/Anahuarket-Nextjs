import { prisma } from "@/server/db/db"

export async function getProducts() {
  return prisma.producto.findMany({
    where: { isactive: 1 },
    include: {
      vendedor: { select: { nombre: true } },
      categoria: { select: { nombrecategoria: true } },
    }
  })
}

export async function getProductsPicture(id: number) {
  return prisma.producto.findUnique({
    where: { idproducto: id },
    select: { fotoproducto: true }
  })
}