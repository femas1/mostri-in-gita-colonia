import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, X, ArrowRight } from "lucide-react";

// =========================================================================
// CONFIGURAZIONE ULTIMA NOVITÀ (modifica solo questo oggetto per i prossimi update)
// =========================================================================
const LATEST_UPDATE = {
  version: "v2-burg-satzvey", // Cambia questa stringa per far riapparire il popup a tutti
  badge: "Novità mostruose  ",
  title: "Cambio di programma! 🏰",
  items: [
    "Nuova tappa Domenica 06/12: al posto di Drachenburg (sold-out) andiamo al castello sull’acqua di Burg Satzvey per il mercatino natalizio medievale!",
  ],
  // Metti cta: null se per un futuro avviso non ti serve il bottone con link
  cta: {
    label: "Vedi nuova tappa",
    to: "/programma?giorno=06/12",
  },
};

const STORAGE_KEY = "mostri_colonia_whats_new";

export default function WhatsNewModal() {
  const [isOpen, setIsOpen] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== LATEST_UPDATE.version;
    } catch {
      return true;
    }
  });

  const handleClose = () => {
    try {
      localStorage.setItem(STORAGE_KEY, LATEST_UPDATE.version);
    } catch {
      // Ignora eventuali blocchi di localStorage
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md bg-slate-900 border-2 border-amber-400/60 rounded-3xl p-6 sm:p-7 shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Chiudi novità"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" /> {LATEST_UPDATE.badge}
        </div>

        <h3 className="text-2xl font-black text-white mb-3">
          {LATEST_UPDATE.title}
        </h3>

        <ul className="space-y-2.5 text-sm text-slate-300 leading-relaxed mb-6">
          {LATEST_UPDATE.items.map((text, idx) => (
            <li key={idx}>• {text}</li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-2.5">
          {LATEST_UPDATE.cta && (
            <Link
              to={LATEST_UPDATE.cta.to}
              onClick={handleClose}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm px-4 py-3 rounded-xl transition-colors"
            >
              {LATEST_UPDATE.cta.label} <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          <button
            onClick={handleClose}
            className={`${
              LATEST_UPDATE.cta ? "" : "w-full"
            } px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm cursor-pointer transition-colors`}
          >
            Ho capito
          </button>
        </div>
      </div>
    </div>
  );
}