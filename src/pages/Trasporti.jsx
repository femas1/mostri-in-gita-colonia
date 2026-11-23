import { ExternalLink } from 'lucide-react';
import { transports } from '../data/tripData';

export default function Trasporti() {
  return (
    <div>
      <div className="page-header">
        <h1>Trasporti & Tariffe Biglietti</h1>
        <p>Confronto tra abbonamenti urbani KVB, biglietti regionali NRW 24h e collegamenti DUS.</p>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Tipologia Biglietto</th>
              <th>Validità / Copertura</th>
              <th style={{ textAlign: 'right' }}>Prezzo Totale</th>
              <th style={{ textAlign: 'center' }}>Persone</th>
              <th style={{ textAlign: 'right' }}>Costo / Persona</th>
              <th>Bambini</th>
              <th>Quando Conviene / Note</th>
              <th>Acquisto</th>
            </tr>
          </thead>
          <tbody>
            {transports.map((t) => (
              <tr key={t.name}>
                <td><strong>{t.name}</strong></td>
                <td>{t.coverage}</td>
                <td style={{ textAlign: 'right' }}>€ {t.totalPrice.toFixed(2)}</td>
                <td style={{ textAlign: 'center' }}>{t.people}</td>
                <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--primary)' }}>
                  € {(t.totalPrice / t.people).toFixed(2)}
                </td>
                <td>{t.children}</td>
                <td>{t.note}</td>
                <td>
                  {t.url ? (
                    <a href={t.url} target="_blank" rel="noreferrer" className="btn-link">
                      Acquista <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>In stazione / app</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}