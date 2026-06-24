import { PHONE_CHARGE_KG, TRANSPORTS, TREE_ABSORPTION_KG_YEAR } from "./constants.js";

const EARTH_RADIUS_KM = 6371;

export function calculateDistanceKm(origin, destination) {
  const lat1 = toRadians(origin.lat);
  const lat2 = toRadians(destination.lat);
  const deltaLat = toRadians(destination.lat - origin.lat);
  const deltaLon = toRadians(destination.lon - origin.lon);

  const haversine =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

export function calculateEmission(distanceKm, transportKey) {
  const transport = TRANSPORTS[transportKey];

  if (!transport) {
    throw new Error("Meio de transporte invalido.");
  }

  return distanceKm * transport.factor;
}

export function buildComparison(distanceKm) {
  return Object.entries(TRANSPORTS)
    .map(([key, transport]) => ({
      key,
      label: transport.label,
      factor: transport.factor,
      emission: distanceKm * transport.factor
    }))
    .sort((a, b) => a.emission - b.emission || a.label.localeCompare(b.label));
}

export function classifyImpact(emissionKg) {
  if (emissionKg <= 10) {
    return { label: "Baixo impacto", level: "low", color: "var(--success)" };
  }

  if (emissionKg <= 50) {
    return { label: "Moderado", level: "moderate", color: "var(--warning)" };
  }

  if (emissionKg <= 150) {
    return { label: "Alto", level: "high", color: "var(--orange)" };
  }

  return { label: "Muito alto", level: "very-high", color: "var(--danger)" };
}

export function calculateEquivalences(emissionKg) {
  return {
    trees: Math.ceil(emissionKg / TREE_ABSORPTION_KG_YEAR),
    phoneCharges: Math.round(emissionKg / PHONE_CHARGE_KG)
  };
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}
