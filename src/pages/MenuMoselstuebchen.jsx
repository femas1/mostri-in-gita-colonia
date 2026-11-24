import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Search, MapPin, Phone, MessageCircle } from 'lucide-react';

const foodCategories = [
  {
    id: '01',
    title: '01 · Piccoli & Sfiziosi (Antipasti e Contorni)',
    subtitle: '5 Piatti',
    items: [
      { name: 'Olive', desc: 'Una ciotolina di olive Nocciola', diet: 'vegano', price: '4,20 €' },
      { name: 'Pane con salsa', desc: 'Pane fresco con aioli fatta in casa al limone e rosmarino', diet: 'vegano', price: '4,90 €' },
      { name: 'Insalata di contorno', desc: 'Con erbe selvatiche fresche e verdure', diet: 'vegano', price: '6,90 €' },
      { name: 'Patatine fritte', desc: 'Una porzione classica', diet: 'vegano', price: '6,50 €' },
      { name: 'Poutine', desc: 'Patatine fritte con fondo bruno fatto in casa, formaggio ed erbe aromatiche', diet: 'vegetariano', price: '9,90 €' },
    ],
  },
  {
    id: '02',
    title: '02 · Senza niente di animale',
    subtitle: '7 Piatti — 100% vegetali (vegani o vegetariani)',
    items: [
      { name: 'Carpaccio di barbabietola rossa', desc: 'Con formaggio di capra gratinato, noci e pane fresco', diet: 'vegetariano', price: '15,90 €' },
      { name: 'Insalata della casa', desc: 'Con verdure, noci e pane', diet: 'vegano', price: '18,90 €' },
      { name: 'Spätzle al formaggio (Käsespätzle)', desc: 'Gnocchetti tedeschi con formaggio di montagna saporito, cipolle croccanti ed erbe fresche', diet: 'vegetariano', price: '18,90 €' },
      { name: 'Bistecca e patatine (planted.)', desc: 'Bistecca vegetale con patatine fritte e salsa alle erbe', diet: 'vegano', price: '22,50 €' },
      { name: 'Gyros vegetale', desc: 'Con patatine fritte, insalata e salsa tzatziki', diet: 'vegano', price: '22,50 €' },
      { name: 'Non-Filetto di Salmone', desc: 'Alternativa vegetale al salmone con purè di patate e funghi di bosco freschi', diet: 'vegano', price: '24,90 €' },
      { name: 'Piatto Taxi (Taxiteller)', desc: 'Piatto unico con gyros vegetale, currywurst vegetale e patatine fritte', diet: 'vegano', price: '25,90 €' },
    ],
  },
  {
    id: '03',
    title: '03 · A te la scelta',
    subtitle: '8 Piatti — Ordinabili sia in versione vegana che classica con carne/pesce',
    items: [
      { name: 'Bastoncini di pesce', desc: 'Fatti in casa con pesci pregiati del giorno e purè di patate', diet: 'vegano o classico', price: '24,90 €' },
      { name: 'Gulasch di manzo', desc: 'Di manzo al pascolo con purè di patate', diet: 'vegano o classico', price: '25,90 €' },
      { name: 'Polpette alla Königsberger', desc: 'Classiche di vitello in salsa bianca con patate novelle e insalata di barbabietola rossa', diet: 'vegano o classico', price: '25,90 €' },
      { name: 'Salsiccia rustica (Grobe Bratwurst)', desc: 'Di vitello con crauti, carote e purè di patate', diet: 'vegano o classico', price: '22,90 €' },
      { name: 'Cielo e Terra (Himmel und Äd)', desc: 'Piatto tipico di Colonia con sanguinaccio (Flönz), mele e purè di patate', diet: 'vegano o classico', price: '20,90 €' },
      { name: 'Currywurst', desc: 'Wurstel di vitello con salsa al curry fatta in casa, patatine fritte e cipolle croccanti', diet: 'vegano o classico', price: '19,90 €' },
      { name: 'Cotoletta di maiale', desc: 'Maiale dell’Eifel con salsa cremosa ai funghi e patatine fritte', diet: 'vegano o classico', price: '22,90 €' },
      { name: 'Cotoletta alla Viennese (Wiener Schnitzel)', desc: 'Tagliata dal filetto di vitello, con insalata di patate fatta in casa', diet: 'classico', price: '32,90 €' },
    ],
  },
  {
    id: '04',
    title: '04 · Dolce conclusione',
    subtitle: '2 Dolci',
    items: [
      { name: 'Sorbetto fatto in casa', desc: 'Con frutta fresca di stagione', diet: 'vegano', price: '5,90 €' },
      { name: 'Muffin soffice', desc: 'Servito con gelato alla vaniglia fatto in casa', diet: 'vegano', price: '7,90 €' },
    ],
  },
];

const drinkGroups = [
  {
    group: 'Bibite & Succhi frizzanti',
    items: [
      { name: 'fritz-kola classica / zero (0,2 l)', price: '3,20 €' },
      { name: 'fritz mischmasch — cola e arancia (0,2 l)', price: '3,20 €' },
      { name: 'fritz mischmasch zero (0,33 l)', price: '4,20 €' },
      { name: 'fritz-limo limone, arancia o melone (0,2 l)', price: '3,20 €' },
      { name: 'fritz-limo zenzero e lime (0,33 l)', price: '4,20 €' },
      { name: 'Succo frizzante mela o rabarbaro (0,2 l)', price: '3,20 €' },
      { name: 'Limonata fatta in casa (0,33 l)', price: '5,90 €' },
      { name: 'Acqua frizzante o naturale (0,33 l)', price: '3,50 €' },
      { name: 'Acqua frizzante o naturale (0,75 l)', price: '6,90 €' },
    ],
  },
  {
    group: 'Birra',
    items: [
      { name: 'Reissdorf Kölsch alla spina — birra tipica di Colonia (0,2 l)', price: '2,20 €' },
      { name: 'Reissdorf Kölsch analcolica (0,33 l)', price: '4,20 €' },
      { name: 'Reissdorf Radler con / senza alcol (0,33 l)', price: '4,20 €' },
      { name: 'Bitburger Pils con / senza alcol (0,33 l)', price: '4,20 €' },
      { name: 'Schneider Weisse chiara con / senza alcol (0,5 l)', price: '5,50 €' },
      { name: 'Fustino da tavolo Reissdorf Pittermännchen (10 l)', price: '100,00 €' },
      { name: 'Vitamalz — bevanda al malto analcolica (0,33 l)', price: '4,20 €' },
    ],
  },
  {
    group: 'Vino (calice 0,15 l — tutti a 6,50 €)',
    items: [
      { name: 'Ambs — Pinot Grigio / Pinot Nero / Rosé (Baden, vino della casa)', price: '6,50 €' },
      { name: 'J. Neus Blanc de Noir Glanzstück — Pinot Nero (Rheinhessen, fresco e fruttato)', price: '6,50 €' },
      { name: 'Blacks Devil’s — Negroamaro / Primitivo (Puglia, fruttato)', price: '6,50 €' },
      { name: 'Bruno — Pinot Bianco della Mosella (Cantina Kartäuserhof, minerale)', price: '6,50 €' },
    ],
  },
  {
    group: 'Longdrink & Spritz (0,25 l — tutti a 7,90 €)',
    items: [
      { name: 'Aperol Spritz', price: '7,90 €' },
      { name: 'Campari Spritz', price: '7,90 €' },
      { name: 'Cuba Libre', price: '7,90 €' },
      { name: 'Gin Tonic', price: '7,90 €' },
      { name: 'Wildberry Lillet', price: '7,90 €' },
      { name: 'Vitoni Spritz', price: '7,90 €' },
    ],
  },
  {
    group: 'Caffetteria & Amari della casa',
    items: [
      { name: 'Espresso', price: '2,50 €' },
      { name: 'Espresso Doppio', price: '3,10 €' },
      { name: 'Caffè Americano', price: '3,10 €' },
      { name: 'Grappa della casa (2 cl): Moselaner (Forte e speziata)', price: '2,50 €' },
      { name: 'Grappa della casa (2 cl): Moselmilch (Cremosa alla nocciola)', price: '2,50 €' },
      { name: 'Grappa della casa (2 cl): Helbing (Liquore al cumino di Amburgo)', price: '2,50 €' },
    ],
  },
];

export default function MenuMoselstuebchen() {
  const [search, setSearch] = useState('');
  const [dietFilter, setDietFilter] = useState('ALL');

  const getBadgeStyle = (diet) => {
    if (diet === 'vegano') return 'badge badge-green';
    if (diet === 'vegetariano' || diet === 'vegano o classico') return 'badge badge-amber';
    return 'badge badge-grey';
  };

  const filteredFood = foodCategories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((dish) => {
        const matchText =
          dish.name.toLowerCase().includes(search.toLowerCase()) ||
          dish.desc.toLowerCase().includes(search.toLowerCase());
        const matchDiet =
          dietFilter === 'ALL' ||
          (dietFilter === 'VEGAN' && dish.diet.includes('vegano')) ||
          (dietFilter === 'VEG' && (dish.diet.includes('vegano') || dish.diet.includes('vegetariano')));
        return matchText && matchDiet;
      }),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/" className="btn-link">
          <ArrowLeft size={16} /> Torna alla home (Mostri in gita)
        </Link>
      </div>

      <div className="page-header">
        <h1>Menu — Moselstübchen 🍷</h1>
        <p style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <span>Sabato 05 Dicembre • Ore 19:30</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <MapPin size={14} /> Landmannstraße 3, 50825 Köln (Neuehrenfeld)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Phone size={14} /> +49 221 5506084
          </span>
        </p>
      </div>

      {/* Box Riepilogo Prenotazione & Scadenza */}
      <div
        className="card"
        style={{
          marginBottom: '1.25rem',
          borderColor: '#f59e0b',
          backgroundColor: '#fffbeb',
        }}
      >
        <div style={{ fontWeight: 700, color: '#92400e', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <AlertTriangle size={18} /> Scadenza scelta piatti: entro il 28 Novembre
        </div>
        <div style={{ fontSize: '0.9rem', color: '#78350f', marginTop: '0.25rem' }}>
          Prenotazione confermata per il <strong>5/12 alle 19:30</strong> • Quasi tutti i piatti classici sono disponibili anche in versione <strong>vegana</strong> senza sovrapprezzo.
        </div>
      </div>
      {/* Box Conferma Scelta via WhatsApp */}
      <div
        className="card"
        style={{
          marginTop: '1.5rem',
           marginBottom: '1.5rem',
          borderColor: '#10b981',
          backgroundColor: '#ecfdf5',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.08rem', color: '#065f46' }}>
            Hai scelto? 🍽️
          </div>
          <div style={{ fontSize: '0.92rem', color: '#047857', marginTop: '0.2rem' }}>
            Comunica la tua scelta entro il <strong>28 Novembre</strong> così inviamo l&apos;ordine al ristorante!
          </div>
        </div>

        <a
          href="https://wa.me/4915251539299?text=Ciao!%20Ecco%20la%20mia%20scelta%20per%20Moselst%C3%BCbchen%3A%20"
          target="_blank"
          rel="noreferrer"
          style={{
            backgroundColor: '#25D366',
            color: '#ffffff',
            padding: '0.7rem 1.2rem',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '0.92rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
          }}
        >
          <MessageCircle size={18} />
          Comunica su WhatsApp
        </a>
      </div>

      {/* Barra di ricerca e filtri */}
      <div className="filter-bar">
        <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            type="text"
            className="input"
            style={{ width: '100%', paddingLeft: '2.1rem' }}
            placeholder="Cerca piatto o ingrediente (es. Cotoletta, Patatine, Spätzle...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="select"
          style={{ fontWeight: dietFilter === 'ALL' ? 700 : 400, cursor: 'pointer' }}
          onClick={() => setDietFilter('ALL')}
        >
          Tutti i piatti
        </button>
        <button
          className="select"
          style={{
            fontWeight: dietFilter === 'VEGAN' ? 700 : 400,
            cursor: 'pointer',
            backgroundColor: dietFilter === 'VEGAN' ? '#d1fae5' : '#fff',
          }}
          onClick={() => setDietFilter('VEGAN')}
        >
          🌱 Opzione Vegana
        </button>
        <button
          className="select"
          style={{
            fontWeight: dietFilter === 'VEG' ? 700 : 400,
            cursor: 'pointer',
            backgroundColor: dietFilter === 'VEG' ? '#fef3c7' : '#fff',
          }}
          onClick={() => setDietFilter('VEG')}
        >
          🥗 Vegetariano / Vegano
        </button>
      </div>

      {/* Categorie Piatti (01 - 04) */}
      <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {filteredFood.map((cat) => (
          <div key={cat.id} className="card">
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>{cat.title}</h2>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>{cat.subtitle}</div>
            </div>

            <div style={{ display: 'grid', gap: '0.85rem' }}>
              {cat.items.map((dish) => (
                <div
                  key={dish.name}
                  style={{
                    paddingBottom: '0.85rem',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text)' }}>
                      {dish.name}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      {dish.desc}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className={getBadgeStyle(dish.diet)}>{dish.diet}</span>
                    <strong style={{ fontSize: '0.98rem', color: 'var(--primary)', whiteSpace: 'nowrap' }}>
                      {dish.price}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sezione 05: Bevande */}
      <div className="card">
        <div style={{ marginBottom: '1.1rem' }}>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>05 · Bevande</h2>
          <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            Bibite, Birre Kölsch, Vini della Mosella, Longdrink, Caffetteria e Amari della casa
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem' }}>
          {drinkGroups.map((grp) => (
            <div
              key={grp.group}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '0.9rem',
                backgroundColor: '#f8fafc',
              }}
            >
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.65rem' }}>
                {grp.group}
              </h3>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '0.45rem', fontSize: '0.86rem' }}>
                {grp.items.map((d) => (
                  <li
                    key={d.name}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                      borderBottom: '1px dashed #cbd5e1',
                      paddingBottom: '0.3rem',
                    }}
                  >
                    <span>{d.name}</span>
                    <strong style={{ whiteSpace: 'nowrap', color: 'var(--primary)' }}>{d.price}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Box Conferma Scelta via WhatsApp */}
      <div
        className="card"
        style={{
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
          borderColor: '#10b981',
          backgroundColor: '#ecfdf5',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.08rem', color: '#065f46' }}>
            Hai scelto? 🍽️
          </div>
          <div style={{ fontSize: '0.92rem', color: '#047857', marginTop: '0.2rem' }}>
            Comunica la tua scelta entro il <strong>28 Novembre</strong> così inviamo l&apos;ordine al ristorante!
          </div>
        </div>

        <a
          href="https://wa.me/4915251539299?text=Ciao!%20Ecco%20la%20mia%20scelta%20per%20Moselst%C3%BCbchen%3A%20"
          target="_blank"
          rel="noreferrer"
          style={{
            backgroundColor: '#25D366',
            color: '#ffffff',
            padding: '0.7rem 1.2rem',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '0.92rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
          }}
        >
          <MessageCircle size={18} />
          Comunica su WhatsApp
        </a>
      </div>
    </div>
  );
}