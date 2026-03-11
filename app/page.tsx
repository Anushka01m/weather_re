"use client";
import React, { useState, useEffect } from 'react';
import { Search, CloudSun, Wind, Droplets, MapPin } from 'lucide-react';
import { WeatherData, ForecastData } from '../types/weather';

export default function WeatherDashboard() {
  const [city, setCity] = useState('Vellore');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Vercel will inject this environment variable securely
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const fetchWeather = async (searchCity: string) => {
    setLoading(true);
    setError('');
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${API_KEY}`
      );
      if (!weatherRes.ok) throw new Error('City not found');
      const weatherData = await weatherRes.json();

      setWeather(weatherData);
    } catch (err) {
      setError('Could not find that city. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (API_KEY) {
      fetchWeather(city);
    } else {
      setError('API key is missing. Please add it to Vercel environment variables.');
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search city..."
            className="w-full p-4 bg-slate-800 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 pl-12 text-white"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const target = e.target as HTMLInputElement;
                setCity(target.value);
                fetchWeather(target.value);
              }
            }}
          />
          <Search className="absolute left-4 top-4 text-slate-400" size={24} />
        </div>

        {error && <p className="text-red-400 mb-4 bg-red-900/20 p-4 rounded-xl">{error}</p>}
        {loading && <p className="text-blue-400 mb-4 animate-pulse">Loading weather data...</p>}

        {weather && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-bold flex items-center gap-2">
                    <MapPin size={28} /> {weather.name}
                  </h1>
                  <p className="text-blue-100 mt-2 capitalize text-lg">{weather.weather[0].description}</p>
                </div>
                <img 
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
                  alt="weather icon" 
                  className="w-24 h-24"
                />
              </div>
              <div className="text-7xl font-black mt-4">{Math.round(weather.main.temp)}°C</div>
              <p className="text-blue-200 mt-4 text-sm">Feels like {Math.round(weather.main.feels_like)}°C</p>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 flex items-center gap-4 hover:border-blue-500 transition-colors">
                <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400"><Droplets size={28} /></div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Humidity</p>
                  <p className="text-2xl font-bold">{weather.main.humidity}%</p>
                </div>
              </div>
              <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 flex items-center gap-4 hover:border-orange-500 transition-colors">
                <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-400"><Wind size={28} /></div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Wind Speed</p>
                  <p className="text-2xl font-bold">{weather.wind.speed} m/s</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
