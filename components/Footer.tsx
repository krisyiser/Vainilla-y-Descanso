import { Building } from 'lucide-react';

// Componente Footer: Pie de página para mostrar derechos reservados y enlaces útiles.
export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Building className="text-primary w-6 h-6" />
          <span className="font-heading font-medium text-lg text-white">
            Vainilla & Descanso
          </span>
        </div>
        
        <p className="text-sm">
          © {new Date().getFullYear()} Vainilla y Descanso. Todos los derechos reservados.
        </p>

        <div className="flex gap-4">
          <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
          <a href="#" className="hover:text-primary transition-colors">Términos</a>
        </div>
      </div>
    </footer>
  );
}
