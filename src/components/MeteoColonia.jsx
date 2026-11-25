import { useState, useEffect } from 'react';
import { CloudSun, ExternalLink } from 'lucide-react';

const weatherIcons = {
  0: { icon: '☀️', desc: 'Sereno' },
  1: { icon: '🌤️', desc: 'Preval. sereno' },
  2: { icon: '⛅', desc: 'Parz. nuvoloso' },
  3: { icon: '☁️', desc: 'Nuvoloso' },
  45: { icon: '🌫️', desc: 'Nebbia' },
  48: { icon: '🌫️', desc: 'Nebbia gelata' },
  51: { icon: '🌦️', desc: 'Pioggerella' },
  53: { icon: '🌦️', desc: 'Pioggerella' },
  55: { icon: '🌧️', desc: 'Pioggia leggera' },
  61: { icon: '🌧️', desc: 'Pioggia' },
  63: { icon: '🌧️', desc: 'Pioggia moderata' },
  65: { icon: '⛈️', desc: 'Pioggia forte' },
  71: { icon: '🌨️', desc: 'Neve leggera' },
  73: { icon: '❄️', desc: 'Neve' },
  75: { icon: '❄️', desc: 'Neve forte' },
  80: { icon: '🌦️', desc: 'Rovesci' },
  95: { icon: '⛈️', desc: 'Temporale' },
};

const getWeatherInfo = (code) =>
  weatherIcons[code] || { icon: '🌤️', desc: 'Variabile' };

const GIORNI_SETTIMANA = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

export default function MeteoColonia({ dark = false }) {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    // Richiede anche hourly=weather_code per leggere il meteo delle 13:00 (fascia diurna)
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=50.9375&longitude=6.9603&current=temperature_2m,weather_code&hourly=weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin&forecast_days=4&models=icon_seamless'
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data?.daily?.time) return;

        const days = data.daily.time.map((dateStr, idx) => {
          const [year, month, day] = dateStr.split('-').map(Number);
          const dateObj = new Date(year, month - 1, day);
          const dayTitle =
            idx === 0
              ? 'Oggi'
              : `${GIORNI_SETTIMANA[dateObj.getDay()]} ${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}`;

          // Prende il codice meteo diurno alle 13:00 (indice idx * 24 + 13)
          const noonCode = data.hourly?.weather_code?.[idx * 24 + 13];
          const codeToUse = noonCode !== undefined ? noonCode : data.daily.weather_code[idx];
          const info = getWeatherInfo(codeToUse);

          return {
            dayTitle,
            icon: info.icon,
            desc: info.desc,
            max: Math.round(data.daily.temperature_2m_max[idx]),
            min: Math.round(data.daily.temperature_2m_min[idx]),
          };
        });

        setForecast({
          currentTemp: Math.round(data.current.temperature_2m),
          currentInfo: getWeatherInfo(data.current.weather_code),
          days,
        });
      })
      .catch(() => {});
  }, []);

  if (!forecast) return null;

  const boxStyle = dark
    ? {
        backgroundColor: 'rgba(6, 78, 59, 0.45)',
        border: '1px solid rgba(52, 211, 153, 0.3)',
        color: '#f1f5f9',
      }
    : {
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        color: '#0f172a',
      };

  return (
    <div
      className="card"
      style={{
        ...boxStyle,
        padding: '1rem 1.25rem',
        borderRadius: '16px',
        marginTop: '1.25rem',
        marginBottom: '0.25rem',
      }}
    >
      {/* Intestazione */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.95rem' }}>
          <CloudSun size={18} style={{ color: '#f59e0b' }} />
          <span>
            Meteo Colonia adesso: {forecast.currentInfo.icon}{' '}
            <strong style={{ color: dark ? '#fbbf24' : 'var(--primary)' }}>
              {forecast.currentTemp}°C
            </strong>{' '}
            <span style={{ fontWeight: 500, opacity: 0.8 }}>({forecast.currentInfo.desc})</span>
          </span>
        </div>

        <a
          href="https://www.wetter.com/deutschland/koeln/DE0005156.html"
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            color: dark ? '#fbbf24' : 'var(--primary)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}
        >
          Dettagli su wetter.com <ExternalLink size={13} />
        </a>
      </div>

      {/* Griglia 4 giorni (Oggi + 3 giorni) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.6rem',
        }}
      >
        {forecast.days.map((d) => (
          <div
            key={d.dayTitle}
            style={{
              backgroundColor: dark ? 'rgba(2, 44, 34, 0.7)' : '#f8fafc',
              border: dark ? '1px solid rgba(52, 211, 153, 0.2)' : '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '0.6rem 0.4rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                color: dark ? '#a7f3d0' : '#334155',
              }}
            >
              {d.dayTitle}
            </div>
            <div style={{ fontSize: '1.4rem', margin: '0.2rem 0' }}>{d.icon}</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.75, marginBottom: '0.2rem' }}>
              {d.desc}
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800 }}>
              <span style={{ color: dark ? '#fbbf24' : '#0f172a' }}>{d.max}°</span>{' '}
              <span style={{ opacity: 0.6, fontWeight: 600 }}>/ {d.min}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}