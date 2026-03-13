"use client"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Search, Home, User, LogOut } from "lucide-react"

type Props = {
  nombreUsuario: string | null | undefined
  busqueda?: string
  onSearchChange?: (value: string) => void
}

export default function Header({ nombreUsuario, busqueda, onSearchChange }: Props) {
  const router = useRouter()

  return (
    <header className="bg-[#FF6B00] px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-md">
      
      <span className="text-white font-black text-xl tracking-tight">ANAHUARKET</span>

      {onSearchChange && (
        <div className="hidden md:flex items-center w-96 bg-white rounded-full px-4 py-2 gap-2">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={busqueda || ""}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar productos en la Anáhuac..."
            className="flex-grow text-sm outline-none text-gray-700"
          />
        </div>
      )}

      <div className="flex items-center gap-4">
        <button onClick={() => router.push("/")} title="Inicio" className="text-white hover:text-orange-200 transition-colors">
          <Home className="h-5 w-5" />
        </button>
        <button onClick={() => router.push("/perfil")} title="Perfil" className="text-white hover:text-orange-200 transition-colors">
          <User className="h-5 w-5" />
        </button>
        <button onClick={() => signOut({ callbackUrl: "/login" })} title="Cerrar sesión" className="text-white hover:text-orange-200 transition-colors">
          <LogOut className="h-5 w-5" />
        </button>
      </div>

    </header>
  )
}