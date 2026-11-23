import { useState } from 'react';
import { participants } from '../data/tripData';

export default function Partecipanti() {
  const [search, setSearch] = useState('');
  const [hubFilter, setHubFilter] = useState('ALL');

  const filtered = participants.filter((p) => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchHub =
      hubFilter === 'ALL' ||
      p.arrHub.includes(hubFilter) ||
      p.depHub.includes(hubFilter);
    return matchName && matchHub;
  });

  return (
    <div>
      <div className="page-header">
        <h1>Partecipanti & Voli ({filtered.length} / {participants.length})</h1>
        <p>Orari di arrivo e partenza, aeroporti/stazioni e note logistiche.</p>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          className="input"
          placeholder="Cerca partecipante..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select"
          value={hubFilter}
          onChange={(e) => setHubFilter(e.target.value)}
        >
          <option value="ALL">Tutti gli Hub (CGN, DUS, Hbf)</option>
          <option value="CGN">Aeroporto Colonia (CGN)</option>
          <option value="DUS">Aeroporto Düsseldorf (DUS)</option>
          <option value="Hbf">Stazione Köln Hbf</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Partecipante</th>
              <th>Gruppo Arrivo</th>
              <th>Data / Ora Arrivo</th>
              <th>Hub Arrivo</th>
              <th>Data / Ora Partenza</th>
              <th>Hub Partenza</th>
              <th>Notti</th>
              <th>Note Trasferimento</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.name}>
                <td><strong>{p.name}</strong></td>
                <td>{p.group}</td>
                <td>{p.arrDate} — <strong>{p.arrTime}</strong></td>
                <td>{p.arrHub}</td>
                <td>{p.depDate} — <strong>{p.depTime}</strong></td>
                <td>{p.depHub}</td>
                <td style={{ textAlign: 'center' }}>{p.nights}</td>
                <td>{p.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}