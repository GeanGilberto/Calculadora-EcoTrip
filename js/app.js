import { geocodeAddress } from "./api.js";
import {
  buildComparison,
  calculateDistanceKm,
  calculateEmission,
  calculateEquivalences,
  classifyImpact
} from "./calculator.js";
import { TRANSPORTS } from "./constants.js";
import {
  clearHistory,
  getHistory,
  getSavedTheme,
  saveHistoryItem,
  saveTheme
} from "./storage.js";
import {
  applyTheme,
  getElements,
  renderComparison,
  renderHistory,
  renderRanking,
  renderResult,
  setLoading,
  setStatus
} from "./ui.js";

const elements = getElements();
let lastShareText = "";

initialize();

function initialize() {
  const preferredTheme = getSavedTheme() || getSystemTheme();
  applyTheme(elements, preferredTheme);
  renderHistory(elements, getHistory());
  renderRanking(elements, buildComparison(100));

  elements.form.addEventListener("submit", handleSubmit);
  elements.shareButton.addEventListener("click", handleShare);
  elements.clearHistoryButton.addEventListener("click", handleClearHistory);
  elements.themeToggle.addEventListener("click", handleThemeToggle);
}

async function handleSubmit(event) {
  event.preventDefault();

  const origin = elements.originInput.value.trim();
  const destination = elements.destinationInput.value.trim();
  const transportKey = elements.transportSelect.value;

  if (!origin || !destination) {
    setStatus(elements, "Informe origem e destino para calcular.", "error");
    return;
  }

  try {
    setLoading(elements, true);
    setStatus(elements, "Buscando coordenadas e calculando distancia...", "neutral");

    const [originPlace, destinationPlace] = await Promise.all([
      geocodeAddress(origin),
      geocodeAddress(destination)
    ]);

    const distanceKm = calculateDistanceKm(originPlace, destinationPlace);
    const emissionKg = calculateEmission(distanceKm, transportKey);
    const classification = classifyImpact(emissionKg);
    const equivalences = calculateEquivalences(emissionKg);
    const comparison = buildComparison(distanceKm);

    const result = {
      origin,
      destination,
      distanceKm,
      emissionKg,
      classification,
      equivalences,
      transportKey
    };

    renderResult(elements, result);
    renderComparison(elements, comparison, transportKey);
    renderRanking(elements, comparison);

    const transportLabel = TRANSPORTS[transportKey].label;
    lastShareText = `Minha viagem de ${origin} para ${destination} gerou ${emissionKg.toFixed(1)} kg de CO2e. Comparei os meios de transporte utilizando a EcoTrip.`;

    const nextHistory = saveHistoryItem({
      origin,
      destination,
      distanceKm,
      emissionKg,
      transportLabel,
      date: new Date().toISOString()
    });

    renderHistory(elements, nextHistory);
    setStatus(elements, `Calculo concluido para ${transportLabel}.`, "success");
  } catch (error) {
    setStatus(elements, error.message || "Nao foi possivel calcular a rota.", "error");
  } finally {
    setLoading(elements, false);
  }
}

async function handleShare() {
  if (!lastShareText) {
    return;
  }

  try {
    if (navigator.share) {
      await navigator.share({
        title: "Resultado EcoTrip",
        text: lastShareText
      });
      setStatus(elements, "Resultado compartilhado.", "success");
      return;
    }

    await navigator.clipboard.writeText(lastShareText);
    setStatus(elements, "Resultado copiado para a area de transferencia.", "success");
  } catch {
    setStatus(elements, "Nao foi possivel compartilhar agora.", "error");
  }
}

function handleClearHistory() {
  clearHistory();
  renderHistory(elements, []);
  setStatus(elements, "Historico removido.", "success");
}

function handleThemeToggle() {
  const currentTheme = document.documentElement.dataset.theme || "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  saveTheme(nextTheme);
  applyTheme(elements, nextTheme);
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
