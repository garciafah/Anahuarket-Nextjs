import { getProducts } from "@/server/services/productService"
import { auth } from "@/server/auth"
import ProductsGrid from "@/features/products/components/ProductsGrid"

export default async function Page() {
  const [productos, session] = await Promise.all([
    getProducts(),
    auth()
  ])

  const productosSerialized = productos.map((prod) => ({
    ...prod,
    precio: Number(prod.precio),
    fotoproducto: prod.fotoproducto ? true : false,
    fechapublicacion: prod.fechapublicacion.toISOString(),
  }))

  return (
    <ProductsGrid
      productos={productosSerialized}
      nombreUsuario={session?.user?.name}
    />
  )
}