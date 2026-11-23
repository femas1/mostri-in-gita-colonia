import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, ExternalLink, Info } from 'lucide-react';
import { linksEscursioni } from '../data/tripData';

const dailySchedule = [
  {
    date: '04/12',
    dayName: 'Venerdì',
    subtitle: 'Arrivi scaglionati & Cena di benvenuto',
    summary: '5 scaglioni di arrivo (CGN, Köln Hbf, DUS) • Cena di gruppo',
    events: [
      {
        time: '09:35',
        duration: 'Mattina',
        cat: 'arrivo',
        badge: '✈️ Volo Arrivo',
        title: 'Arrivo a CGN (Colonia/Bonn)',
        location: 'Aeroporto CGN',
        details: 'Partecipanti: Giorgio, Sofija.',
      },
      {
        time: '12:35',
        duration: 'Pranzo',
        cat: 'arrivo',
        badge: '✈️ Volo Arrivo',
        title: 'Arrivo a CGN (Colonia/Bonn)',
        location: 'Aeroporto CGN',
        details: 'Partecipanti: Zoro, Anna, Lucia, Armando, Sara (gruppo ideale per KVB 24h 5 pers.).',
      },
      {
        time: '19:05 – 20:05',
        duration: 'Sera',
        cat: 'arrivo',
        badge: '🚆✈️ Arrivi Serali',
        title: 'Tre arrivi ravvicinati tra stazione e DUS',
        location: 'Köln Hbf & Aeroporto DUS',
        details:
          '• 19:05 Köln Hbf: Bonomo, Ada, Yuri\n• 19:30 DUS: Gigia, Mangus\n• 20:05 DUS: Mincix, Rossella, Cosimo, Greta',
      },
      {
        time: '21:00',
        duration: 'Cena',
        cat: 'pasto',
        badge: '🍽️ Da prenotare',
        title: 'Cena da Sattgrün (15€ - 20€)',
        location: 'Centro Colonia',
        details: 'Cucina vegetariana/vegana. Verificare prenotazione telefonica per ~10 persone.',
      },
    ],
  },
  {
    date: '05/12',
    dayName: 'Sabato',
    subtitle: 'Mercatini di Natale, Duomo & Serata a Ehrenfeld',
    summary: 'Visita centro storico • Moselstübchen 19:30 • Red Fox Bar',
    events: [
      {
        time: '10:00 – 13:00',
        duration: '3 ore',
        cat: 'visita',
        badge: '🎄 Visita',
        title: 'Mercatini di Natale & Duomo di Colonia',
        location: 'Centro Storico / Kölner Dom',
        details:
          'Ingresso Duomo: 12€. Optional: a) Museo dei Tesori 8€ (30-60 min); b) Torre 533 gradini 8€ (30-45 min); c) Combo a+b = 12€.',
      },
      {
        time: '13:00 – 15:00',
        duration: 'Pranzo',
        cat: 'pasto',
        badge: '🥨 Libero',
        title: 'Pranzo ai Mercatini di Natale',
        location: 'Mercatini Centro',
        details: 'Street food e specialità natalizie tra le casette.',
      },
      {
        time: '15:00 – 19:00',
        duration: 'Pomeriggio',
        cat: 'visita',
        badge: '🚶 Passeggiata',
        title: 'Giro tra i mercatini e relax pre-cena',
        location: 'Altstadt / Centro',
        details: 'Tempo libero per shopping natalizio o rientro rapido a cambiarsi prima di cena.',
      },
      {
        time: '19:30',
        duration: 'Cena',
        cat: 'pasto',
        badge: '🍷 Prenotato',
        title: 'Cena da Moselstübchen (25€ - 30€)',
        location: 'Altstadt / Centro',
        details: 'Prenotazione confermata (acconto di 160€ già versato). ⚠️ AZIONE: scegliere il menu entro il 02/12.',
        link: {
          label: 'Apri Menu Moselstübchen',
          url: 'https://moselstuebchen-koeln.de/speisekarte',
        },
      },
      {
        time: '22:30',
        duration: 'Dopocena',
        cat: 'sera',
        badge: '🍸 Serata',
        title: 'Drink al Red Fox Bar',
        location: 'Quartiere Ehrenfeld',
        details: 'Serata nel quartiere più vivace di Colonia.',
      },
    ],
  },
  {
    date: '06/12',
    dayName: 'Domenica',
    subtitle: 'Brunch, Castello di Drachenburg & Birrificio Sünner',
    summary: 'The Ash 09:30 • Escursione Königswinter • Cena Sünner 20:00',
    events: [
      {
        time: '09:30 – 11:00',
        duration: '1h 30m',
        cat: 'pasto',
        badge: '🥞 Prenotato',
        title: 'Brunch da The Ash (19,90€)',
        location: 'Messe / Deutz',
        details: 'Prenotazione confermata per le ore 09:30.',
      },
      {
        time: '11:00 – 12:00',
        duration: 'Trasferimento',
        cat: 'arrivo',
        badge: '🚆 Treno + Bus',
        title: 'Spostamento verso Königswinter',
        location: 'Köln Hbf/Deutz → (Troisdorf) → Königswinter Bf',
        details: 'Tratta: treni S19/RE9 + Bus RE8 fino a Königswinter Bahnhof.',
      },
      {
        time: '12:00 – 17:00',
        duration: '5 ore',
        cat: 'visita',
        badge: '🏰 Escursione',
        title: 'Castello di Drachenburg',
        location: 'Königswinter (Drachenfels)',
        details:
          'Ingresso: 10€/persona (bambini gratis).\nSalita dalla stazione al castello:\n• Opz. A: ~35 min a piedi nel bosco/collina (gratis)\n• Opz. B: Ferrovia a cremagliera panoramica (12€/persona, bambini gratis)',
        link: {
          label: 'Biglietti Castello (10€)',
          url: 'https://schloss-drachenburg.shop.koronaevent.de/de/admissions/AD1/price',
        },
        secondLink: {
          label: 'Biglietti Cremagliera (12€)',
          url: 'https://www.drachenfelsbahn.de/tickets#!/o/ee332234b069c14c3ce1af073c847ba5/cw/f861741971a5b0b28910635c64ca34bb',
        },
      },
      {
        time: '17:30 – 19:30',
        duration: 'Pomeriggio',
        cat: 'sera',
        badge: '☕ Relax',
        title: 'Caffè e dolce a casa nostra',
        location: 'Casa Colonia',
        details: 'Rientro da Königswinter e pausa pomeridiana tutti insieme.',
      },
      {
        time: '20:00',
        duration: 'Cena',
        cat: 'pasto',
        badge: '🍺 Prenotato',
        title: 'Cena da Sünner (20€ - 30€)',
        location: 'Kalk / Deutz',
        details: 'Prenotazione confermata per le ore 20:00 nello storico birrificio.',
      },
    ],
  },
  {
    date: '07/12',
    dayName: 'Lunedì',
    subtitle: 'Programma libero & Partenze principali (14 partecipanti)',
    summary: '4 finestre di partenza tra DUS e CGN',
    events: [
      {
        time: '09:00',
        duration: 'Partenza 1',
        cat: 'arrivo',
        badge: '🛫 Volo Rientro',
        title: 'Partenza da DUS (Düsseldorf)',
        location: 'Aeroporto DUS',
        details: 'Partecipanti: Giorgio, Sofija.',
      },
      {
        time: '09:30 – 13:00',
        duration: 'Mattina',
        cat: 'libero',
        badge: '🧭 Libero',
        title: 'Mattinata libera in città',
        location: 'Colonia',
        details: 'Colazione con calma, ultimi acquisti o passeggiata in centro.',
      },
      {
        time: '13:10',
        duration: 'Partenza 2',
        cat: 'arrivo',
        badge: '🛫 Volo Rientro',
        title: 'Partenza da CGN (Colonia/Bonn)',
        location: 'Aeroporto CGN',
        details: 'Partecipanti: Bonomo, Ada, Yuri.',
      },
      {
        time: '13:30 – 17:30',
        duration: 'Pomeriggio',
        cat: 'libero',
        badge: '🧭 Libero',
        title: 'Pranzo libero & ultimi giri',
        location: 'Ehrenfeld / Centro',
        details: 'Ideale per provare una delle alternative pranzo (es. Mayer Imbiss o Elif’s Luncheonette).',
      },
      {
        time: '17:55',
        duration: 'Partenza 3',
        cat: 'arrivo',
        badge: '🛫 Volo Rientro',
        title: 'Partenza da CGN (Colonia/Bonn)',
        location: 'Aeroporto CGN',
        details: 'Partecipanti: Zoro, Anna, Lucia, Armando, Sara.',
      },
      {
        time: '20:50',
        duration: 'Partenza 4',
        cat: 'arrivo',
        badge: '🛫 Volo Rientro',
        title: 'Partenza da DUS (Düsseldorf)',
        location: 'Aeroporto DUS',
        details: 'Partecipanti: Mincix, Rossella, Cosimo, Greta.',
      },
    ],
  },
  {
    date: '08/12',
    dayName: 'Martedì',
    subtitle: 'Ultima mattinata & Rientri finali',
    summary: 'Ultimi due partecipanti in partenza da DUS',
    events: [
      {
        time: '09:30 – 12:30',
        duration: 'Mattina',
        cat: 'libero',
        badge: '🧭 Libero',
        title: 'Ultima mattinata a Colonia',
        location: 'Colonia',
        details: 'Colazione e preparazione bagagli per Gigia e Mangus.',
      },
      {
        time: '14:45',
        duration: 'Partenza Finale',
        cat: 'arrivo',
        badge: '🛫 Volo Rientro',
        title: 'Partenza da DUS (Düsseldorf)',
        location: 'Aeroporto DUS',
        details: 'Partecipanti: Gigia, Mangus (chiusura del viaggio).',
      },
    ],
  },
];

export default function ProgrammaOrario() {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const currentDay = dailySchedule[selectedDayIdx];

  return (
    <div>
      <div className="page-header">
        <h1>Programma Giornaliero</h1>
        <p>Seleziona un giorno per esplorare gli orari, i dettagli logistici e i link utili.</p>
      </div>

      {/* Selettore Giorni (Tabs) */}
      <div className="day-tabs">
        {dailySchedule.map((day, idx) => (
          <button
            key={day.date}
            className={`day-tab ${idx === selectedDayIdx ? 'active' : ''}`}
            onClick={() => setSelectedDayIdx(idx)}
          >
            <span className="day-tab-date">{day.date}</span>
            <span className="day-tab-name">{day.dayName}</span>
          </button>
        ))}
      </div>

      {/* Intestazione Giorno Selezionato + Frecce Prev/Next */}
      <div className="day-banner card">
        <button
          className="nav-arrow-btn"
          onClick={() => setSelectedDayIdx((prev) => Math.max(0, prev - 1))}
          disabled={selectedDayIdx === 0}
          title="Giorno precedente"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="day-banner-info">
          <div className="day-banner-title">
            {currentDay.dayName} {currentDay.date} — {currentDay.subtitle}
          </div>
          <div className="day-banner-sub">{currentDay.summary}</div>
        </div>

        <button
          className="nav-arrow-btn"
          onClick={() => setSelectedDayIdx((prev) => Math.min(dailySchedule.length - 1, prev + 1))}
          disabled={selectedDayIdx === dailySchedule.length - 1}
          title="Giorno successivo"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Timeline Verticale del Giorno */}
      <div className="timeline">
        {currentDay.events.map((ev, idx) => (
          <div key={idx} className={`timeline-item cat-${ev.cat}`}>
            <div className="timeline-time">
              <div className="time-main">
                <Clock size={14} /> {ev.time}
              </div>
              <div className="time-sub">{ev.duration}</div>
            </div>

            <div className="timeline-content">
              <div className="timeline-top">
                <span className="timeline-badge">{ev.badge}</span>
                <span className="timeline-loc">
                  <MapPin size={13} /> {ev.location}
                </span>
              </div>

              <h3 className="timeline-title">{ev.title}</h3>

              <p className="timeline-desc">{ev.details}</p>

              {(ev.link || ev.secondLink) && (
                <div className="timeline-links">
                  {ev.link && (
                    <a href={ev.link.url} target="_blank" rel="noreferrer" className="btn-link">
                      {ev.link.label} <ExternalLink size={14} />
                    </a>
                  )}
                  {ev.secondLink && (
                    <a href={ev.secondLink.url} target="_blank" rel="noreferrer" className="btn-link">
                      {ev.secondLink.label} <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Box Link Rapidi sempre accessibile */}
      <div className="card" style={{ marginTop: '1.75rem' }}>
        <h3 style={{ marginBottom: '0.75rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Info size={18} /> Link Rapidi Prenotazioni & Biglietti
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
          {linksEscursioni.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="btn-link">
              {link.label} <ExternalLink size={15} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}