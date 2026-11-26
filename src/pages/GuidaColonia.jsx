import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

const guideTopics = [
  {
    id: 'birreria',
    tabLabel: '🍺 Regole Birreria',
    badge: 'Colonia • Hausordnung im Brauhaus',
    title: 'Regolamento della Birreria',
    subtitle: 'Cosa dà per scontato il "Köbes" (il cameriere tradizionale di Colonia) e perché la "Stange" (il tipico bicchiere cilindrico) contiene solo 0,2 litri',
    image: '/images/brauhaus-koelsch.png',
    paragraphs: [
      'I. LA STANGE CONTIENE 0,2 LITRI: La Kölsch ha poco corpo, poco zucchero residuo e poca anidride carbonica. Se resta ferma troppo a lungo, diventa calda e sgasata. Con un bicchiere piccolo si risolve il problema',
      'II. IL KÖBES RABBOCCA SENZA CHE GLI VENGA CHIESTO: Passa tra i tavoli portando le Stange nel Kranz (il tipico vassoio circolare con manico) e sostituisce ogni bicchiere vuoto con uno pieno, senza chiedere.',
      'III. IL SOTTOBICCHIERE SOPRA IL BICCHIERE SIGNIFICA "BASTA": Quando non ne vuoi più, appoggia il sottobicchiere sopra il bicchiere. Altrimenti te ne arriverà subito un’altra.',
      'IV. IL CONTO SI FA SUL SOTTOBICCHIERE: Ogni Kölsch bevuta equivale a un segno a matita sul tuo sottobicchiere; si salda tutto alla fine.',
      'V. SI BEVE FRESCA: Viene servita tra gli 8 e i 10 gradi',
      'Kölsch è un termine protetto: secondo la Convenzione della Kölsch del marzo 1986, firmata da 24 birrifici, è una birra chiara, limpida, luppolata e ad alta fermentazione prodotta nell’area di Colonia. Dal 1997 è un marchio tutelato in tutta l’UE (IGP). Viene fermentata ad alta temperatura ma poi fatta maturare a freddo come una Pils: da qui nasce la sua leggera nota fruttata unita a un finale pulito e secco.',
    ],
  },
  {
    id: 'duomo',
    tabLabel: '⛪ Duomo',
    badge: 'Tappa Sabato • Ore 10:00',
    title: 'Il Duomo di Colonia (Kölner Dom)',
    subtitle: '157 metri di gotico, l’Arca dei Re Magi e 533 gradini panoramici',
    image: '/images/koelner-dom.jpg',
    paragraphs: [
      'Simbolo assoluto della città e Patrimonio UNESCO, il Duomo di Colonia colpisce subito per le sue due torri gemelle alte 157 metri (la torre nord supera la sud di esattamente 4 cm). La costruzione iniziò nel 1248 per custodire le reliquie dei Re Magi e si concluse solo 632 anni dopo, nel 1880.',
      'All’interno meritano una sosta lo Scrigno dorato dei Re Magi dietro l’altare maggiore, le vetrate medievali e la celebre vetrata contemporanea composta da oltre 11.000 quadrati colorati firmata da Gerhard Richter.',
      'Per chi vuole salire in cima: la scala a chiocciola della torre sud conta 533 gradini stretti e porta a circa 100 metri d’altezza con vista completa sul Reno e sui mercatini sottostanti.',
    ],
  },
  {
    id: 'veedel',
    tabLabel: '🏘️ I Quartieri (Veedel)',
    badge: 'Vita Locale & Quartieri',
    title: 'Oltre il centro: cosa sono i "Veedel" di Colonia',
    subtitle: 'Una città policentrica fatta di quartieri-villaggio con un’identità fortissima',
    image: '/images/veedel.webp',
    paragraphs: [
      'Se arrivi dall’Italia, dimentica la classica divisione tra "centro storico" e "periferia". Colonia, ricostruita quasi da zero dopo la guerra, ha sì una zona centrale attorno al Duomo e alle piazze sul Reno, ma nella vita reale è una città policentrica.',
      'I residenti non "vanno in centro": vivono i Veedel, quartieri-villaggio con un’identità fortissima e una propria piazza dove si concentra la vita sociale.',
      '• Belgisches Viertel: elegante e creativo, pieno di boutique indipendenti, caffè e bar attorno a Brüsseler Platz.',
      '• Ehrenfeld: l’ex quartiere operaio, oggi cuore alternativo, multiculturale e pieno di street art e locali (dove andremo sabato sera al Red Fox Bar).',
      '• Südstadt: rilassato, autentico e molto amato dalle famiglie e dai locali per le sue osterie e birrerie.',
      '• Kalk: sulla riva destra del Reno, popolare, verace e in piena trasformazione, perfetto per vedere l’anima più genuina e lavoratrice della città (proprio dove abbiamo la casa e il birrificio Sünner!).',
    ],
  },
  {
    id: 'drachenburg',
    tabLabel: '🏰 Drachenburg',
    badge: 'Escursione Domenica • Ore 12:00',
    title: 'Castello di Drachenburg (Königswinter)',
    subtitle: 'Un castello da fiaba ottocentesco affacciato sulla valle del Reno',
    image: '/images/drachenburg.jpg', 
    paragraphs: [
      'Arroccato sulla collina del Drachenfels ("Roccia del Drago", dove secondo la leggenda dei Nibelunghi Sigfrido sconfisse il drago), Schloss Drachenburg non è una fortezza medievale ma una spettacolare residenza privata costruita a tempo di record tra il 1882 e il 1884 dal banchiere Stephan von Sarter.',
      'Mescola stile neogotico, affreschi epici, vetrate istoriate e terrazze panoramiche sul fiume Reno. Per raggiungerlo dalla stazione di Königswinter si può scegliere tra una camminata di circa 35 minuti nel bosco oppure la Drachenfelsbahn, la più antica ferrovia a cremagliera ancora in funzione in Germania (inaugurata nel 1883).',
    ],
  },
];

export default function GuidaColonia() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialIdx = guideTopics.findIndex((t) => t.id === searchParams.get('tappa'));
  const [activeIdx, setActiveIdx] = useState(initialIdx !== -1 ? initialIdx : 0);

  useEffect(() => {
    const idx = guideTopics.findIndex((t) => t.id === searchParams.get('tappa'));
    if (idx !== -1) setActiveIdx(idx);
  }, [searchParams]);

  const selectTopic = (idx) => {
    setActiveIdx(idx);
    setSearchParams({ tappa: guideTopics[idx].id });
  };

  const current = guideTopics[activeIdx];

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/" className="btn-link">
          <ArrowLeft size={16} /> Torna alla home
        </Link>
      </div>

      <div className="page-header">
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={26} /> Mini-Guida di Colonia
        </h1>
      </div>

      {/* Selettore rapido argomenti */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {guideTopics.map((topic, idx) => (
          <button
            key={topic.id}
            onClick={() => selectTopic(idx)}
            className={`day-tab ${idx === activeIdx ? 'active' : ''}`}
            style={{ padding: '0.55rem 0.95rem', fontSize: '0.88rem', fontWeight: 700 }}
          >
            {topic.tabLabel}
          </button>
        ))}
      </div>

      {/* Card principale con eventuale foto + testo */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: current.image ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
            gap: '1.5rem',
            alignItems: 'start',
          }}
        >
          {current.image && (
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '0.75rem',
                textAlign: 'center',
              }}
            >
              <img
                src={current.image}
                alt={current.title}
                style={{
                  width: '100%',
                  maxHeight: '460px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
              />
            </div>
          )}

          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.6rem',
              }}
            >
              <span className="badge badge-amber">{current.badge}</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                {activeIdx + 1} / {guideTopics.length}
              </span>
            </div>

            <h2 style={{ fontSize: '1.45rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>
              {current.title}
            </h2>
            <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '1.1rem' }}>
              {current.subtitle}
            </p>

            <div style={{ display: 'grid', gap: '0.85rem', lineHeight: 1.65, fontSize: '0.96rem' }}>
              {current.paragraphs.map((p, i) => (
                <p key={i} style={{ margin: 0 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Barra navigazione Avanti / Indietro */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1.75rem',
            paddingTop: '1rem',
            borderTop: '1px solid #e2e8f0',
          }}
        >
          <button
            className="select"
            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700 }}
            onClick={() => selectTopic((activeIdx - 1 + guideTopics.length) % guideTopics.length)}
          >
            <ChevronLeft size={16} /> Precedente
          </button>

          <button
            className="select"
            style={{
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontWeight: 700,
              backgroundColor: 'var(--primary)',
              color: '#fff',
              borderColor: 'var(--primary)',
            }}
            onClick={() => selectTopic((activeIdx + 1) % guideTopics.length)}
          >
            Prossima <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}