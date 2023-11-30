export interface WeatherData {
    cloudCover: number;
    dayOfWeek: string;
    dayOrNight: "D" | "N";
    expirationTimeUtc: number;
    iconCode: number;
    iconCodeExtend: number;
    precipChance: number;
    precipType: string;
    pressureMeanSeaLevel: number;
    qpf: number;
    qpfSnow: number;
    temperature: number;
    temperatureDewPoint: number;
    temperatureFeelsLike: number;
    temperatureHeatIndex: number;
    temperatureWindChill: number;
    uvDescription: string;
    uvIndex: number;
    validTimeLocal: string;
    validTimeUtc: number;
    visibility: number;
    windDirection: number;
    windDirectionCardinal: string;
    windGust: number | null;
    windSpeed: number;
    wxPhraseLong: string;
    wxPhraseShort: string;
    wxSeverity: number;
  }
  