import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { restaurants } from '../data/tripData';

export default function Ristoranti() {
  const [filter, setFilter] = useState('ALL');

  const filtered = restaurants.filter((r) => {
    if (filter === 'ALL') return true;
    if (filter === 'PROGRAMMA') return r.status !== 'Alternativa';
    return r.status === 'Alternativa';
  });

  return (
    <div>
      <div className="page-header">
        <h1>Ristoranti, Bar & Alternative</h1>
        <p>Locali già prenotati, tappe in programma e alternative selezionate in città.</p>
      </div>

      <div className="filter-bar">
        <button
          className="select"
          style={{ fontWeight: filter === 'ALL' ? 700 : 400, cursor: 'pointer' }}
          onClick={() => setFilter('ALL')}
        >
          Tutti ({restaurants.length})
        </button>
        <button
          className="select"
          style={{ fontWeight: filter === 'PROGRAMMA' ? 700 : 400, cursor: 'pointer' }}
          onClick={() => setFilter('PROGRAMMA')}
        >
          Nel Programma
        </button>
        <button
          className="select"
          style={{ fontWeight: filter === 'ALTERNATIVE' ? 700 : 400, cursor: 'pointer' }}
          onClick={() => setFilter('ALTERNATIVE')}
        >
          Alternative (Pranzo / Cena)
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Locale</th>
              <th>Tipo</th>
              <th>Quartiere</th>
              <th>Cucina & Specialità</th>
              <th>Opzioni Veg</th>
              <th>Prezzo</th>
              <th>Stato</th>
              <th>Note & Menu</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.name}>
                <td><strong>{r.name}</strong></td>
                <td>{r.type}</td>
                <td>{r.zone}</td>
                <td>{r.cuisine}</td>
                <td>{r.veg}</td>
                <td>{r.price}</td>
                <td>
                  <span
                    className={`badge ${
                      r.status.includes('Prenotato')
                        ? 'badge-green'
                        : r.status.includes('programma')
                        ? 'badge-amber'
                        : 'badge-grey'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td>
                  <div>{r.note}</div>
                  {r.url && (
                    <a href={r.url} target="_blank" rel="noreferrer" className="btn-link" style={{ marginTop: '0.25rem' }}>
                      Vedi Menu <ExternalLink size={13} />
                    </a>
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