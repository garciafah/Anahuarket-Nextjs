const CATEGORIAS = ["Todos", "Comida", "Eventos", "Tecnología", "Hogar", "Servicios", "Ropa", "Otros"]

type Props = {
  categoriaActiva: string
  onCategoryChange: (categoria: string) => void
}

export default function Navbar({ categoriaActiva, onCategoryChange }: Props) {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <ul className="flex gap-8 justify-center">
        {CATEGORIAS.map(cat => (
          <li
            key={cat}
            onClick={() => onCategoryChange(cat)}
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
  )
}