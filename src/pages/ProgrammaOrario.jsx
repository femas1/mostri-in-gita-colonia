import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, MapPin, ExternalLink, Info, Utensils } from 'lucide-react';
import { linksEscursioni } from '../data/tripData';
import MeteoColonia from '../components/MeteoColonia';

const dailySchedule = [
  {
    date: '04/12',
    dayName: 'Venerdì',
    subtitle: 'Arrivi',
    summary: '',
    events: [
      {
        time: '09:35',
        duration: 'Mattina',
        cat: 'arrivo',
        badge: '✈️ Volo Arrivo',
        title: '',
        location: 'Aeroporto CGN',
        details: 'Giorgio, Sofija.',
      },
      {
        time: '12:35',
        duration: 'Pranzo',
        cat: 'arrivo',
        badge: '✈️ Volo Arrivo',
        title: '',
        location: 'Aeroporto CGN',
        details: 'Zoro, Anna, Lucia, Armando, Sara.',
      },
      {
        time: '19:05 - 20:05',
        duration: 'Sera',
        cat: 'arrivo',
        badge: '✈️ Volo Arrivo',
        title: '',
        location: 'Köln Hbf & Aeroporto DUS',
        details:
          '• 19:05 Köln Hbf: Bonomo, Ada, Yuri\n• 19:30 DUS: Gigia, Mangus\n• 20:05 DUS: Mincix, Rossella, Cosimo, Greta',
      },
      {
        time: '20:00',
        duration: 'Cena',
        cat: 'pasto',
        badge: '👿',
        title: 'TBA',
        location: 'Centro Colonia',
        details: '',
      },
    ],
  },
  {
    date: '05/12',
    dayName: 'Sabato',
    subtitle: 'Mercatini di Natale, Duomo & serata a Ehrenfeld',
    summary: '',
    events: [
      {
        time: '10:00 - 13:00',
        duration: '3 ore',
        cat: 'visita',
        badge: '🎄 Visita',
        title: 'Mercatini di Natale & Duomo di Colonia',
        location: 'Centro Storico / Kölner Dom',
        details:
          'Ingresso Duomo: 12€. Opzionali: \na) Museo dei Tesori (30-60 min): 8€; \nb) Torre 533 gradini (30-45 min): 8€; \nc) Combo a+b = 12€.',
      },
      {
        time: '13:00 - 15:00',
        duration: 'Pranzo',
        cat: 'pasto',
        badge: '🥨 Libero',
        title: 'Pranzo ai mercatini di Natale',
        location: 'Mercatini Centro',
        details: 'Street food e specialità natalizie.',
      },
      {
        time: '15:00 - 19:00',
        duration: 'Pomeriggio',
        cat: 'visita',
        badge: '🚶 Passeggiata',
        title: 'Mercatini di Natale',
        location: 'Altstadt / Centro',
        details: '',
      },
      {
        time: '19:30',
        duration: 'Cena',
        cat: 'pasto',
        badge: '🍷 Prenotato',
        title: 'Cena da Moselstübchen',
        location: 'Altstadt / Centro',
        details: 'Prenotazione confermata (acconto di 160€ già versato). ⚠️ Scegliere il menu entro il 28/11.',
        link: {
          label: 'Apri Menu Moselstübchen',
          url: '/menu-moselstuebchen',
        },
      },
      {
        time: '22:30',
        duration: 'Dopocena',
        cat: 'sera',
        badge: '🍸 Serata',
        title: 'Red Fox Bar',
        location: 'Quartiere Ehrenfeld',
        details: 'Serata nel quartiere alternativo di Colonia.',
      },
    ],
  },
  {
    date: '06/12',
    dayName: 'Domenica',
    subtitle: 'Brunch, Castello di Drachenburg & birrificio storico Sünner',
    summary: '',
    events: [
      {
        time: '09:30 - 11:00',
        duration: '1h 30m',
        cat: 'pasto',
        badge: '🥞 Prenotato',
        title: 'The Ash (19,90€)',
        location: 'Messe / Deutz',
        details: 'Brunch a buffet',
      },
      {
        time: '11:00 - 12:00',
        duration: 'Trasferimento',
        cat: 'arrivo',
        badge: '🚆 Treno + Bus',
        title: 'Spostamento verso Königswinter',
        location: 'Köln Hbf/Deutz → (Troisdorf) → Königswinter Bf',
        details: 'Tratta: treni S19/RE9 + Bus RE8 fino a Königswinter Bahnhof.',
      },
      {
        time: '12:00 - 17:00',
        duration: '5 ore',
        cat: 'visita',
        badge: '🏰 Escursione',
        title: 'Castello di Drachenburg',
        location: 'Königswinter (Drachenfels)',
        details:
          'Ingresso: 10€/persona (bambini gratis). Per la salita al castello ci sono due opzioni:\n \n- Avventura 🤠: circa 35 min a piedi nel bosco/collina (gratis)\n- Comoda💲: Ferrovia a cremagliera panoramica (12€/persona, bambini gratis)',
        link: {
          label: 'Biglietti Castello (10€)',
          url: 'https://schloss-drachenburg.shop.koronaevent.de/en/admissions/AD1/price',
        },
        secondLink: {
          label: 'Biglietti Cremagliera (12€)',
          url: 'https://www.drachenfelsbahn.de/en/tickets',
        },
      },
      {
        time: '17:30 - 19:30',
        duration: 'Pomeriggio',
        cat: 'sera',
        badge: '☕ Relax',
        title: 'Caffè a casa',
        location: 'Casa Kalk',
        details: '😾⚠️ SI ENTRA SENZA SCARPE! ⚠️😾',
      },
      {
        time: '20:00',
        duration: 'Cena',
        cat: 'pasto',
        badge: '🍺 Prenotato',
        title: 'Cena da Sünner (25€ - 35€)',
        location: 'Kalk',
        details: 'Prenotazione confermata per le ore 20:00 nel birrificio più antico di Colonia.',
      },
    ],
  },
  {
    date: '07/12',
    dayName: 'Lunedì',
    subtitle: 'Sayonara, Mostri!',
    summary: '',
    events: [
      {
        time: '09:00',
        duration: 'Partenza 1',
        cat: 'arrivo',
        badge: '🛫 Volo Rientro',
        title: 'Partenza da DUS (Düsseldorf)',
        location: 'Aeroporto DUS',
        details: 'Giorgio, Sofija.',
      },
      {
        time: '09:30 - 13:00',
        duration: 'Mattina',
        cat: 'libero',
        badge: '🧭 Libero',
        title: 'Mattinata libera in città',
        location: 'Colonia',
        details: '',
      },
      {
        time: '13:10',
        duration: 'Partenza 2',
        cat: 'arrivo',
        badge: '🛫 Volo Rientro',
        title: 'Partenza da CGN (Colonia/Bonn)',
        location: 'Aeroporto CGN',
        details: 'Bonomo, Ada, Yuri.',
      },
      {
        time: '13:30 - 17:30',
        duration: 'Pomeriggio',
        cat: 'libero',
        badge: '🧭 Libero',
        title: 'Pranzo libero & ultimi giri',
        location: 'Ehrenfeld / Centro',
        details: '',
      },
      {
        time: '17:55',
        duration: 'Partenza 3',
        cat: 'arrivo',
        badge: '🛫 Volo Rientro',
        title: 'Partenza da CGN (Colonia/Bonn)',
        location: 'Aeroporto CGN',
        details: 'Zoro, Anna, Lucia, Armando, Sara.',
      },
      {
        time: '20:50',
        duration: 'Partenza 4',
        cat: 'arrivo',
        badge: '🛫 Volo Rientro',
        title: 'Partenza da DUS (Düsseldorf)',
        location: 'Aeroporto DUS',
        details: 'Mincix, Rossella, Cosimo, Greta.',
      },
    ],
  },
  {
    date: '08/12',
    dayName: 'Martedì',
    subtitle: 'Partenze',
    summary: '',
    events: [
      {
        time: '14:45',
        duration: '',
        cat: 'arrivo',
        badge: '🛫 Volo Rientro',
        title: 'Partenza da DUS (Düsseldorf)',
        location: 'Aeroporto DUS',
        details: 'Gigia, Mangus.',
      },
    ],
  },
];

export default function ProgrammaOrario() {
const [searchParams] = useSearchParams();
  const initialIdx = dailySchedule.findIndex((d) => d.date === searchParams.get('giorno'));
  const [selectedDayIdx, setSelectedDayIdx] = useState(initialIdx !== -1 ? initialIdx : 0);
  const currentDay = dailySchedule[selectedDayIdx];

  const renderEventLink = (linkObj) => {
    if (!linkObj) return null;
    if (linkObj.url.startsWith('/')) {
      return (
        <Link to={linkObj.url} className="btn-link">
          <Utensils size={14} /> {linkObj.label}
        </Link>
      );
    }
    return (
      <a href={linkObj.url} target="_blank" rel="noreferrer" className="btn-link">
        {linkObj.label} <ExternalLink size={14} />
      </a>
    );
  };

  return (
    <div>
      <div className="page-header">
        <h1>Programma Giornaliero</h1>
        <p>Seleziona un giorno per esplorare gli orari, i dettagli logistici e i link utili.</p>
      </div>

      {/* Selettore Giorni (Tabs) */}
      <MeteoColonia light/>
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
            {currentDay.dayName} {currentDay.date} - {currentDay.subtitle}
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
                  {renderEventLink(ev.link)}
                  {renderEventLink(ev.secondLink)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Box Link Rapidi sempre accessibile */}
      <div className="card" style={{ marginTop: '1.75rem' }}>
        <h3 style={{ marginBottom: '0.75rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Info size={18} /> Link rapidi prenotazioni e biglietti
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
          {linksEscursioni.map((link) => (
            <span key={link.url}>{renderEventLink(link)}</span>
          ))}
        </div>
      </div>
    </div>
  );
}