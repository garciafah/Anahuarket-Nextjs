type Props = {
  idproducto: number
  nombreproducto: string
  precio: number
  fotoproducto: boolean
  vendedor: { nombre: string }
}

export default function ProductCard({ idproducto, nombreproducto, precio, fotoproducto, vendedor }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
      <div className="h-44 bg-gray-100 overflow-hidden">
        {fotoproducto ? (
          <img
            src={`/api/productos/${idproducto}/foto`}
            alt={nombreproducto}
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
        <p className="text-xs text-gray-400 uppercase font-semibold">{vendedor.nombre}</p>
        <p className="font-semibold text-gray-800 text-sm mt-1 line-clamp-2">{nombreproducto}</p>
        <p className="text-[#FF6B00] font-black mt-2">${precio.toLocaleString('es-MX')}</p>
      </div>
    </div>
  )
}