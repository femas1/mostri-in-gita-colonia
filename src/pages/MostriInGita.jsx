import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Shuffle,
} from "lucide-react";
import MeteoColonia from '../components/MeteoColonia';

const curiosities = [
  {
    cat: "Drink & Tradizioni",
    emoji: "🍺",
    title: "Kölsch da 0,2 l & il trucco del sottobicchiere",
    text: 'La birra di Colonia si serve rigorosamente nei bicchieri cilindrici da 0,2 l (Stange) perché si sfiata velocemente. Finché non appoggi il sottobicchiere sopra il bicchiere vuoto, il cameriere ("Köbes") continuerà a portartene una nuova senza chiedere!',
  },
  {
    cat: "Goliardia & Misteri",
    emoji: "🍑",
    title: 'Il "Kallendresser" vicino a Heumarkt',
    text: "Tra Alter Markt e Heumarkt, sporgente da una grondaia, c’è una statuetta in bronzo impegnata a fare i suoi bisogni. Secondo la tradizione più nota mostra il sedere al consiglio comunale per protestare contro le tasse; un’altra leggenda racconta invece che il proprietario di casa si stesse vendicando così del vicino del piano di sotto che lo disturbava suonando la tromba!",
  },
  {
    cat: "Storia & Natura",
    emoji: "🏎️",
    title: "Michael Schumacher & la sua collezione privata",
    text: "Nato alle porte di Colonia (a Hürth-Hermülheim) e cresciuto sulla pista di kart di Kerpen, Michael Schumacher ha qui la sua esposizione ufficiale: al Motorworld Köln-Rheinland è custodita la sua collezione privata con monoposto di Formula 1 (tra cui le Ferrari iridate), trofei, caschi e tute originali. Visitabile gratuitamente.",
  },
  {
    cat: "Goliardia & Misteri",
    emoji: "😳",
    title: "La scultura proibita sulla torre del Rathaus",
    text: "Guardando bene tra le oltre 100 statue sulla facciata della torre del Municipio (proprio sotto l’arcivescovo Konrad von Hochstaden), spunta una figura contorta in un esplicito atto di auto-erotismo: leggenda vuole sia stata la vendetta di uno scalpellino non pagato.",
  },
  {
    cat: "Storia & Natura",
    emoji: "🌉",
    title: "Perché i ponti di Colonia sono verdi?",
    text: 'Quella tonalità specifica si chiama ufficialmente "Kölner Grün" e fu scelta da Konrad Adenauer quando era sindaco di Colonia (1917–1933), molto prima di diventare nel 1949 il primo Cancelliere della Germania Ovest.',
  },
  {
    cat: "Storia & Natura",
    emoji: "🚗",
    title: 'L’auto cementata sui Ringe ("Ruhender Verkehr")',
    text: 'All’altezza di Hohenzollernring 22-24 c’è una vera Opel Kapitän completamente inglobata in un blocco di cemento armato: è "Ruhender Verkehr" (Traffico fermo), celebre scultura dell’artista Wolf Vostell (1932–1998) realizzata nel 1969 come critica al consumismo e al traffico automobilistico.',
  },
  {
    cat: "Storia & Natura",
    emoji: "🦜",
    title: "I 3.000 pappagalli selvatici di Colonia",
    text: "Non stupirti se vedi stormi verdi tropicali tra gli alberi: a Colonia vivono circa 3.000 parrocchetti dal collare (Halsbandsittiche) perfettamente adattati al clima del Reno.",
  },
  {
    cat: "Storia & Natura",
    emoji: "🧙‍♂️",
    title: "Gli Heinzelmännchen",
    text: "La celeberrima poesia sui folletti (Heinzelmännchen) che di notte lavoravano al posto degli artigiani di Colonia fu scritta nel 1836 da August Kopisch di Breslavia — che con ogni probabilità non aveva mai nemmeno visitato la città.",
  },
  {
    cat: "Storia & Natura",
    emoji: "🧴",
    title: 'Perché si dice "Acqua di Colonia"?',
    text: 'Nel 1709 l’italiano Giovanni Maria Farina fondò proprio qui la fabbrica di profumi più antica al mondo e battezzò la sua fragranza "Eau de Cologne" in onore della sua nuova città: è da quel profumo — di cui Napoleone consumava flaconi interi ogni settimana — che deriva il nome italiano "Acqua di Colonia".',
  },
  {
    cat: "Drink & Tradizioni",
    emoji: "🎭",
    title: "Carnevale: l’11/11 e la maglia dell’1. FC Köln",
    text: 'A Colonia il Carnevale è la "quinta stagione" e inizia l’11 novembre alle 11:11. La febbre è tale che persino la squadra di calcio cittadina (1. FC Köln) scende in campo con una divisa speciale dedicata al Carnevale.',
  },
  {
    cat: "Duomo",
    emoji: "🏗️",
    title: "632 anni di lavori (e non finirà mai)",
    text: 'La costruzione del Duomo è durata 632 anni (dal 1248 al 1880), ma le impalcature non spariscono mai: per via dei continui restauri, a Colonia si dice che "quando il Duomo sarà finito, finirà il mondo".',
  },
  {
    cat: "Duomo",
    emoji: "🖤",
    title: "Il Duomo sarebbe chiaro (ma non viene pulito)",
    text: "Il Duomo di Colonia è costruito con pietre chiare annerite nei secoli da smog e fuliggine. Non viene ripulito per tre motivi: pulirlo rovinerebbe la pietra porosa e la sua patina protettiva, costerebbe decine di milioni di euro e — essendo stato costruito in 632 anni con oltre 50 tipi di pietra provenienti da cave diverse — una volta pulito non avrebbe un colore uniforme.",
  },
  {
    cat: "Duomo",
    emoji: "🏆",
    title: "Ex edificio più alto del mondo",
    text: "Con i suoi 157 metri d’altezza, al momento del completamento nel 1880 il Duomo era la costruzione più alta del pianeta. Oggi resta comunque la terza chiesa più alta al mondo.",
  },
  {
    cat: "Duomo",
    emoji: "📏",
    title: "Due torri quasi gemelle (4 cm di differenza)",
    text: "A prima vista sembrano identiche, ma la torre nord del Duomo supera la torre sud di esattamente quattro centimetri.",
  },
  {
    cat: "Duomo",
    emoji: "🔔",
    title: "Una campana da 24 tonnellate",
    text: 'La Campana del Duomo ("Petersglocke"), fusa nel 1923 ad Apolda in Turingia, pesa circa 24 tonnellate ed è la campana oscillante più grande del mondo.',
  },
];

export default function MostriInGita() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });
  const [curiosityCat, setCuriosityCat] = useState("Tutte");
  const [curiosityIdx, setCuriosityIdx] = useState(0);

  useEffect(() => {
    const target = new Date("2026-12-04T09:35:00").getTime();
    const updateTimer = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / 1000 / 60) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };
    updateTimer();
    const id = setInterval(updateTimer, 1000);
    return () => clearInterval(id);
  }, []);

  const categories = [
    "Tutte",
    "Duomo",
    "Drink & Tradizioni",
    "Goliardia & Misteri",
    "Storia & Natura",
  ];
  const filteredCuriosities =
    curiosityCat === "Tutte"
      ? curiosities
      : curiosities.filter((c) => c.cat === curiosityCat);

  const safeIdx = curiosityIdx % filteredCuriosities.length;
  const activeCuriosity = filteredCuriosities[safeIdx];

  const handleCatChange = (cat) => {
    setCuriosityCat(cat);
    setCuriosityIdx(0);
  };

  const nextCuriosity = () => {
    setCuriosityIdx((prev) => (prev + 1) % filteredCuriosities.length);
  };

  const prevCuriosity = () => {
    setCuriosityIdx(
      (prev) =>
        (prev - 1 + filteredCuriosities.length) % filteredCuriosities.length,
    );
  };

  const randomCuriosity = () => {
    if (filteredCuriosities.length <= 1) return;
    let next = Math.floor(Math.random() * filteredCuriosities.length);
    if (next === safeIdx) next = (next + 1) % filteredCuriosities.length;
    setCuriosityIdx(next);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      {/* =========================================================
          SEZIONE 1: HERO & COUNTDOWN
         ========================================================= */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-emerald-950/60 via-slate-950 to-slate-950 px-6 py-20 text-center">
      <div aria-hidden="true" className="pointer-events-none">
          <span className="snowflake text-sm" style={{ left: "10%", animationDuration: "9s", animationDelay: "0s" }}>❄</span>
          <span className="snowflake text-xs" style={{ left: "26%", animationDuration: "12s", animationDelay: "2s" }}>•</span>
          <span className="snowflake text-base" style={{ left: "48%", animationDuration: "10s", animationDelay: "4s" }}>❄</span>
          <span className="snowflake text-xs" style={{ left: "72%", animationDuration: "11s", animationDelay: "1s" }}>•</span>
          <span className="snowflake text-sm" style={{ left: "88%", animationDuration: "9.5s", animationDelay: "3s" }}>❄</span>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-6">
            🇩🇪 Colonia • 04 - 08 Dicembre 2026 🇩🇪
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-10">
            Mostri in Gita:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-emerald-400">
              Colonia
            </span>{" "}
            🎄👾
          </h1>

          {/* Countdown Box */}
          <div className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl mb-10">
            <div className="grid grid-cols-4 gap-3 sm:gap-5">
              {[
                { label: "Giorni", val: timeLeft.days },
                { label: "Ore", val: timeLeft.hours },
                { label: "Minuti", val: timeLeft.mins },
                { label: "Secondi", val: timeLeft.secs },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-emerald-950/70 border border-emerald-700/40 rounded-2xl py-4 px-2"
                >
                  <div className="text-3xl sm:text-5xl font-black text-amber-400 tabular-nums">
                    {String(item.val).padStart(2, "0")}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-200/80 mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
            
          </div>

          <MeteoColonia dark/>

          {/* Pulsanti di navigazione diretti */}
          {/* <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/programma"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3.5 rounded-xl transition-transform hover:scale-105 shadow-lg shadow-amber-400/20"
            >
              <Calendar className="w-5 h-5" />
              Vedi programma
            </Link>
          </div> */}
        </div>
      </section>

      {/* =========================================================
          SEZIONE 2: IDENTIKIT DELLA SPEDIZIONE
         ========================================================= */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-b border-slate-800/80">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            I numeri della gita
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { emoji: "👾", stat: "18 Mostri" },
            { emoji: "🌙", stat: "3 Notti" },
            { emoji: "🍖", stat: "2 Cene & 1 Brunch" },
            { emoji: "🏰", stat: "1 Castello" },
          ].map((card) => (
            <div
              key={card.stat}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl py-8 px-6 flex flex-col items-center justify-center text-center hover:border-slate-700 transition-colors"
            >
              <div className="text-4xl mb-4">{card.emoji}</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight leading-snug">
                {card.stat}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          SEZIONE 3: LE 3 REGOLE D'ORO DEI MOSTRI
         ========================================================= */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-b border-slate-800/80">
        <div className="text-center mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
            Checklist prima della partenza
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Tre compiti per i mostri
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* COMPITO 01: MENU MOSELSTÜBCHEN (Scadenza 28/11 - Bordo Rosso) */}
          <div className="urgent-card-red relative bg-gradient-to-br from-red-950/40 via-slate-900/95 to-slate-900 border-2 border-red-500/80 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/50">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  ⚠️ Scadenza 28/11
                </span>
                <span className="text-2xl font-black text-red-500/40">
                  01
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Entro il 28 Novembre
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed mb-5">
                Il ristorante{" "}
                <strong className="text-red-300">Moselstübchen</strong>{" "}
                richiede un pre-ordine: scegli dal menù un piatto principale
                (eventuali antipasti e bevande si ordinano al ristorante).
              </p>
            </div>
            <Link
              to="/menu-moselstuebchen"
              className="inline-flex items-center gap-1.5 text-sm font-black text-red-400 hover:text-red-300"
            >
              Guarda il menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* COMPITO 02: SFIDA DRACHENBURG (Scadenza 28/11) */}
          <div className="urgent-card relative bg-gradient-to-br from-amber-950/40 via-slate-900/95 to-slate-900 border-2 border-amber-400/70 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/50">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  ⚠️ Scadenza 28/11
                </span>
                <span className="text-2xl font-black text-amber-400/40">
                  02
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Castello di Drachenburg
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed mb-5">
                35 min di salita nel bosco o cremagliera panoramica (12€)?
                Decidi entro il{" "}
                <strong className="text-amber-300">28 Novembre</strong>!
              </p>
            </div>
          <Link
              to="/programma?giorno=06/12"
              className="inline-flex items-center gap-1.5 text-sm font-black text-amber-400 hover:text-amber-300"
            >
              Vedi dettagli tappa <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* COMPITO 03: TRASPORTI FURBI */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/15 text-emerald-300 border border-emerald-400/30">
                  🎫 Risparmio Gruppo
                </span>
                <span className="text-2xl font-black text-slate-700">03</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Trasporti furbi
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                Gruppi da 5 con <strong>KVB 24h</strong> in città e{" "}
                <strong>NRW 24h</strong> per DUS. Meno spesa, più Glühwein!
              </p>
            </div>
            <Link
              to="/trasporti"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-400 hover:text-amber-300"
            >
              Confronta i trasporti <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/programma"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-7 py-3.5 rounded-xl transition-transform hover:scale-105 shadow-lg shadow-amber-400/20"
          >
            <Calendar className="w-5 h-5" />
            Vedi programma completo
          </Link>
        </div>
      </section>

      {/* =========================================================
          SEZIONE 4: CURIOSITÀ & SEGRETI DI COLONIA (CAROSELLO)
         ========================================================= */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-b border-slate-800/80">
        <div className="text-center mb-8">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
            Lo sapevi che...? {curiosities.length} perle locali
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Segreti e curiosità di Colonia 🧐
          </h2>
        </div>

        {/* Filtri categoria */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCatChange(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                curiosityCat === cat
                  ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20"
                  : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Card attiva */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="flex items-center justify-between gap-2 mb-5">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/15 text-emerald-300 border border-emerald-400/30">
              {activeCuriosity.cat}
            </span>
            <span className="text-xs font-bold text-slate-400 tabular-nums">
              {safeIdx + 1} / {filteredCuriosities.length}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left min-h-[140px]">
            <div className="text-5xl sm:text-6xl shrink-0">
              {activeCuriosity.emoji}
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2.5">
                {activeCuriosity.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeCuriosity.text}
              </p>
            </div>
          </div>

          {/* Controlli Carosello */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-8 pt-5 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <button
                onClick={prevCuriosity}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Precedente
              </button>
              <button
                onClick={nextCuriosity}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black cursor-pointer transition-colors"
              >
                Prossima <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={randomCuriosity}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-emerald-400 text-xs font-bold cursor-pointer transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" /> Curiosità a caso
            </button>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="border-t border-slate-800/80 py-8 px-6 text-center text-xs text-slate-500">
        <div className="flex flex-wrap justify-center gap-5 mb-3 text-slate-400 font-medium">
          <Link to="/programma" className="hover:text-amber-400">
            Programma
          </Link>
          <Link to="/trasporti" className="hover:text-amber-400">
            Trasporti
          </Link>
        </div>
        <p>Mostri in Gita a Colonia 04-08 Dicembre 2026</p>
      </footer>
    </div>
  );
}