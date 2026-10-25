export interface GeocodeSuggestion {
  label: string;
  address: string;
  latitude: number;
  longitude: number;
}

export function normalizeGeocodeResult(raw: any): GeocodeSuggestion | null {
  if (!raw || typeof raw !== "object") return null;

  const label = typeof raw.display_name === "string" ? raw.display_name.trim() : "";
  const address = label || "Localização informada";
  const latitude = Number(raw.lat ?? raw.latitude);
  const longitude = Number(raw.lon ?? raw.longitude);

  if (!label || Number.isNaN(latitude) || Number.isNaN(longitude)) return null;

  return {
    label: address,
    address,
    latitude,
    longitude,
  };
}

export async function fetchAddressSuggestions(query: string): Promise<GeocodeSuggestion[]> {
  const clean = query.trim();
  if (clean.length < 3) return [];

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "5");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("q", clean);

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error("Não foi possível buscar sugestões de endereço.");
  }

  const data = await response.json();
  if (!Array.isArray(data)) return [];

  return data
    .map(normalizeGeocodeResult)
    .filter((item): item is GeocodeSuggestion => Boolean(item));
}
