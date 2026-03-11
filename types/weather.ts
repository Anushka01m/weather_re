export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
  wind: {
    speed: number;
  };
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: { temp: number };
    weather: Array<{ icon: string; description: string }>;
    dt_txt: string;
  }>;
}
