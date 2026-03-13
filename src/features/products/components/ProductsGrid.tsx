"use client"

"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Search, Home, User, LogOut } from "lucide-react"

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
  const router = useRouter()

  const filterProducts = productos.filter((prod) => {
    const searchMatch = prod.nombreproducto
      .toLowerCase()
      .includes(busqueda.toLowerCase())

    const categoryMatch =
      categoriaActiva === "Todos" ||
      prod.categoria.nombrecategoria.toLowerCase() === categoriaActiva.toLowerCase()

    return searchMatch && categoryMatch
  })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="bg-[#FF6B00] px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-md">
        <span className="text-white font-black text-xl tracking-tight">ANAHUARKET</span>

        {/* Buscador */}
        <div className="hidden md:flex items-center w-96 bg-white rounded-full px-4 py-2 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar productos en la Anáhuac..."
            className="flex-grow text-sm outline-none text-gray-700"
          />
        </div>

        {/* Botones */}
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/")} >
            <Home className="h-5 w-5 text-white" />
          </button>

          <button onClick={() => router.push("/perfil")} >
            <User className="h-5 w-5 text-white" />
          </button>

          <button onClick={() => signOut({ callbackUrl: "/login" })} >
            <LogOut className="h-5 w-5 text-white" />
          </button>
        </div>
      </header>

      {/* Categorías */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3">
        <ul className="flex gap-8 justify-center">
          {CATEGORIAS.map(cat => (
            <li
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`cursor-pointer uppercase tracking-wide text-xs font-semibold transition-colors
                ${categoriaActiva === cat
                  ? "text-[#FF6B00] border-b-2 border-[#FF6B00] pb-1"
                  : "text-gray-500 hover:text-[#FF6B00]"
                }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-10">

        {/* Bienvenida */}
        <section className="text-center mb-10">
          <h2 className="text-2xl font-black text-gray-800">
            ¡Qué bueno verte, {nombreUsuario?.split(' ')[0] || 'Estudiante'}!
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Explora los materiales disponibles en la Anáhuac Cancún.
          </p>
        </section>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filterProducts.map((prod) => (
            <div
              key={prod.idproducto}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="h-44 bg-gray-100 overflow-hidden">
                {prod.fotoproducto ? (
                  <img
                    src={`/api/productos/${prod.idproducto}/foto`}
                    alt={prod.nombreproducto}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="/placeholder.png"
                    alt="Sin imagen"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-400 uppercase font-semibold">
                  {prod.vendedor.nombre}
                </p>
                <p className="font-semibold text-gray-800 text-sm mt-1 line-clamp-2">
                  {prod.nombreproducto}
                </p>
                <p className="text-[#FF6B00] font-black mt-2">
                  ${Number(prod.precio).toLocaleString('es-MX')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filterProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No se encontraron productos.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="text-[#FF6B00] font-black text-xl">ANAHUARKET</p>
            <p className="text-gray-400 text-sm mt-2">© 2026 Todos los derechos reservados.</p>
            <p className="text-gray-400 text-sm">La plataforma oficial de intercambio para estudiantes de la Universidad Anáhuac Cancún.</p>
          </div>
          <div>
            <p className="text-white font-bold">SOPORTE Y CONTACTO</p>
            <p className="text-gray-400 text-sm mt-2">Centro de ayuda y contacto</p>
            <p className="text-[#FF6B00] font-bold mt-1">📞 9988776644</p>
          </div>
        </div>
      </footer>
    </div>
  )
}