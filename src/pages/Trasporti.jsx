import { useState } from 'react';
import {
  Train,
  Users,
  Baby,
  MapPin,
  ExternalLink,
  Smartphone,
  Info,
  Sparkles,
} from 'lucide-react';
import { transports } from '../data/tripData';

export default function Trasporti() {
  const [filter, setFilter] = useState('ALL');

  const filteredTransports = transports.filter((t) => {
    const text = `${t.name} ${t.coverage} ${t.note}`.toLowerCase();
    if (filter === 'KVB') return text.includes('kvb') || text.includes('città') || text.includes('urbano') || text.includes('colonia');
    if (filter === 'NRW') return text.includes('nrw') || text.includes('dus') || text.includes('drachenburg') || text.includes('regionale');
    return true;
  });

  const isRegional = (t) => {
    const text = `${t.name} ${t.coverage}`.toLowerCase();
    return text.includes('nrw') || text.includes('dus') || text.includes('regionale');
  };

  return (
    <div>
      {/* Intestazione Pagina */}
      <div className="page-header">
        <h1>Trasporti 🚆</h1>
        <p>
          Panoramica tra biglietti urbani KVB e pass regionali NRW.
        </p>
      </div>

      {/* Consigli Rapidi / Regola d'Oro */}
      <div
        className="card"
        style={{
          marginBottom: '1.5rem',
          borderLeft: '4px solid #f59e0b',
          backgroundColor: '#fffbeb',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.85rem',
        }}
      >
        <Sparkles size={20} style={{ color: '#d97706', flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.9rem', color: '#78350f', lineHeight: 1.5 }}>
          ⚠️ Quasi tutti i biglietti giornalieri
          esistono in versione <strong>Gruppo (fino a 5 persone)</strong>. Viaggiando insieme con un unico biglietto attivato
          su app (KVB / DB Navigator) si risparmia notevolmente rispetto ai biglietti singoli. ⚠️
        </div>
      </div>

      {/* Filtri Rapidi */}
      <div className="filter-bar" style={{ marginBottom: '1.5rem' }}>
        {[
          { id: 'ALL', label: `Tutti i biglietti (${transports.length})` },
          { id: 'KVB', label: '🚋 Urbano Colonia (KVB)' },
          { id: 'NRW', label: '🚄 Regionale / DUS / Drachenburg' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            className="select"
            onClick={() => setFilter(tab.id)}
            style={{
              cursor: 'pointer',
              fontWeight: filter === tab.id ? 700 : 500,
              backgroundColor: filter === tab.id ? 'var(--primary, #1e3a3a)' : '#ffffff',
              color: filter === tab.id ? '#ffffff' : 'var(--text, #0f172a)',
              borderColor: filter === tab.id ? 'var(--primary, #1e3a3a)' : '#cbd5e1',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Griglia Card Biglietti */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {filteredTransports.map((t) => {
          const regional = isRegional(t);
          return (
            <div
              key={t.name}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
                borderTop: `4px solid ${regional ? '#f59e0b' : '#10b981'}`,
              }}
            >
              <div>
                {/* Header Card: Badge Ambito + Prezzo Totale */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  <span className={`badge ${regional ? 'badge-amber' : 'badge-green'}`}>
                    {regional ? 'Regionale / Extra-urbano' : 'Urbano Colonia'}
                  </span>

                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontSize: '1.45rem',
                        fontWeight: 900,
                        color: 'var(--primary, #1e3a3a)',
                        lineHeight: 1.1,
                      }}
                    >
                      € {t.totalPrice.toFixed(2)}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      prezzo totale
                    </div>
                  </div>
                </div>

                {/* Titolo Biglietto */}
                <h2
                  style={{
                    fontSize: '1.12rem',
                    fontWeight: 800,
                    color: 'var(--text)',
                    marginBottom: '0.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                  }}
                >
                  <Train size={18} style={{ color: regional ? '#d97706' : '#059669', flexShrink: 0 }} />
                  {t.name}
                </h2>

                {/* Pillole Info (Copertura, Persone, Bambini) */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.45rem',
                    marginBottom: '0.85rem',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      backgroundColor: '#f1f5f9',
                      color: '#334155',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px',
                    }}
                  >
                    <MapPin size={13} /> {t.coverage}
                  </span>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      backgroundColor: '#f1f5f9',
                      color: '#334155',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px',
                    }}
                  >
                    <Users size={13} /> {t.people} {t.people === 1 ? 'persona' : 'persone'}
                  </span>

                  {t.children && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        backgroundColor: '#f1f5f9',
                        color: '#334155',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                      }}
                    >
                      <Baby size={13} /> {t.children}
                    </span>
                  )}
                </div>

                {/* Note / Quando conviene */}
                {t.note && (
                  <div
                    style={{
                      fontSize: '0.87rem',
                      color: 'var(--text-muted)',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '0.65rem 0.75rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.45rem',
                      lineHeight: 1.45,
                    }}
                  >
                    <Info size={15} style={{ flexShrink: 0, marginTop: '2px', color: '#64748b' }} />
                    <span>{t.note}</span>
                  </div>
                )}
              </div>

              {/* Footer Card: Azione Acquisto */}
              <div
                style={{
                  paddingTop: '0.75rem',
                  borderTop: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {t.url ? (
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      backgroundColor: 'var(--primary, #1e3a3a)',
                      color: '#ffffff',
                      padding: '0.6rem 1rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                    }}
                  >
                    Acquista online <ExternalLink size={15} />
                  </a>
                ) : (
                  <div
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: '#64748b',
                      backgroundColor: '#f1f5f9',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Smartphone size={15} /> Acquistabile in stazione o su app KVB / DB
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}