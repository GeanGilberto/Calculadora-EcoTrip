const NOMINATIM_ENDPOINT = "https://nominatim.openstreetmap.org/search";

export async function geocodeAddress(query) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    throw new Error("Informe um endereco ou cidade.");
  }

  const url = new URL(NOMINATIM_ENDPOINT);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("q", trimmedQuery);

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Nao foi possivel consultar a geocodificacao agora.");
  }

  const results = await response.json();

  if (!Array.isArray(results) || results.length === 0) {
    throw new Error(`Nao encontramos coordenadas para "${trimmedQuery}".`);
  }

  const [place] = results;

  return {
    label: place.display_name,
    lat: Number(place.lat),
    lon: Number(place.lon)
  };
}
