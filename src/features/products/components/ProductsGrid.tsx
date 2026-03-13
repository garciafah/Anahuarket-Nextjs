"use client"
import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import ProductCard from "./ProductCard"

const CATEGORIAS = ["Todos", "Comida", "Eventos", "Tecnología", "Hogar", "Servicios", "Ropa", "Otros"]

type Producto = {
  idproducto: number
  nombreproducto: string
  precio: number
  fotoproducto: boolean
  vendedor: { nombre: string }
  categoria: { nombrecategoria: string }
}

type Props = {
  productos: Producto[]
  nombreUsuario: string | null | undefined
}

export default function ProductosGrid({ productos, nombreUsuario }: Props) {
  const [busqueda, setBusqueda] = useState("")
  const [categoriaActiva, setCategoriaActiva] = useState("Todos")

  const productosFiltrados = productos.filter((prod) => {
    const coincideBusqueda = prod.nombreproducto
      .toLowerCase()
      .includes(busqueda.toLowerCase())

    const coincideCategoria =
      categoriaActiva === "Todos" ||
      prod.categoria.nombrecategoria.toLowerCase() === categoriaActiva.toLowerCase()

    return coincideBusqueda && coincideCategoria
  })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        nombreUsuario={nombreUsuario}
        busqueda={busqueda}
        onSearchChange={setBusqueda}
      />
      <Navbar
        categoriaActiva={categoriaActiva}
        onCategoryChange={setCategoriaActiva}
      />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-10">
        <section className="text-center mb-10">
          <h2 className="text-2xl font-black text-gray-800">
            ¡Qué bueno verte, {nombreUsuario?.split(' ')[0] || 'Estudiante'}!
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Explora los materiales disponibles en la Anáhuac Cancún.
          </p>
        </section>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {productosFiltrados.map((prod) => (
            <ProductCard key={prod.idproducto} {...prod} />
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No se encontraron productos.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}