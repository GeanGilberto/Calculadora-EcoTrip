import { TRANSPORTS } from "./constants.js";

const numberFormatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0
});

const integerFormatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 0
});

export function getElements() {
  return {
    form: document.querySelector("#tripForm"),
    originInput: document.querySelector("#originInput"),
    destinationInput: document.querySelector("#destinationInput"),
    transportSelect: document.querySelector("#transportSelect"),
    calculateButton: document.querySelector("#calculateButton"),
    statusMessage: document.querySelector("#statusMessage"),
    metricGrid: document.querySelector("#metricGrid"),
    distanceMetric: document.querySelector("#distanceMetric"),
    emissionMetric: document.querySelector("#emissionMetric"),
    classificationMetric: document.querySelector("#classificationMetric"),
    passengerMetric: document.querySelector("#passengerMetric"),
    impactBand: document.querySelector("#impactBand"),
    impactDot: document.querySelector("#impactDot"),
    impactText: document.querySelector("#impactText"),
    equivalenceGrid: document.querySelector("#equivalenceGrid"),
    treesMetric: document.querySelector("#treesMetric"),
    chargesMetric: document.querySelector("#chargesMetric"),
    tipsBox: document.querySelector("#tipsBox"),
    tipsList: document.querySelector("#tipsList"),
    shareButton: document.querySelector("#shareButton"),
    comparisonBody: document.querySelector("#comparisonBody"),
    rankingGrid: document.querySelector("#rankingGrid"),
    historyList: document.querySelector("#historyList"),
    clearHistoryButton: document.querySelector("#clearHistoryButton"),
    themeToggle: document.querySelector("#themeToggle"),
    themeIcon: document.querySelector("#themeIcon")
  };
}

export function setLoading(elements, isLoading) {
  elements.calculateButton.disabled = isLoading;
  elements.calculateButton.textContent = isLoading ? "Calculando..." : "Calcular impacto";
}

export function setStatus(elements, message, tone = "neutral") {
  elements.statusMessage.textContent = message;
  elements.statusMessage.dataset.tone = tone;
}

export function renderResult(elements, result) {
  const { distanceKm, emissionKg, classification, equivalences, transportKey } = result;

  elements.metricGrid.hidden = false;
  elements.impactBand.hidden = false;
  elements.equivalenceGrid.hidden = false;
  elements.tipsBox.hidden = false;
  elements.shareButton.hidden = false;

  elements.distanceMetric.textContent = `${formatNumber(distanceKm)} km`;
  elements.emissionMetric.textContent = `${formatNumber(emissionKg)} kg CO2e`;
  elements.passengerMetric.textContent = `${formatNumber(emissionKg)} kg CO2e`;
  elements.classificationMetric.innerHTML = `<span class="badge ${classification.level}">${classification.label}</span>`;
  elements.impactDot.style.background = classification.color;
  elements.impactText.textContent = `Esta viagem foi classificada como ${classification.label.toLowerCase()} para o meio ${TRANSPORTS[transportKey].label}.`;
  elements.treesMetric.textContent = integerFormatter.format(equivalences.trees);
  elements.chargesMetric.textContent = integerFormatter.format(equivalences.phoneCharges);

  elements.tipsList.innerHTML = TRANSPORTS[transportKey].tips
    .map((tip) => `<li>${escapeHtml(tip)}</li>`)
    .join("");
}

export function renderComparison(elements, comparison, selectedKey) {
  elements.comparisonBody.innerHTML = comparison
    .map((item, index) => {
      const selected = item.key === selectedKey ? " aria-current=\"true\"" : "";
      return `
        <tr${selected}>
          <td>${index + 1}</td>
          <td><strong>${escapeHtml(item.label)}</strong></td>
          <td>${item.factor.toFixed(3)} kg CO2e/km/pessoa</td>
          <td>${formatNumber(item.emission)} kg CO2e</td>
        </tr>
      `;
    })
    .join("");
}

export function renderRanking(elements, comparison) {
  const topItems = comparison.slice(0, 3);

  elements.rankingGrid.innerHTML = topItems
    .map((item, index) => `
      <article class="ranking-card">
        <span>${index + 1}o lugar</span>
        <strong>${escapeHtml(item.label)}</strong>
        <p>${formatNumber(item.emission)} kg CO2e estimados</p>
      </article>
    `)
    .join("");
}

export function renderHistory(elements, history) {
  if (!history.length) {
    elements.historyList.innerHTML = "<p>Nenhum calculo salvo ainda.</p>";
    return;
  }

  elements.historyList.innerHTML = history
    .map((item) => `
      <article class="history-item">
        <div>
          <span>${formatDate(item.date)}</span>
          <strong>${escapeHtml(item.origin)} para ${escapeHtml(item.destination)}</strong>
          <p>${formatNumber(item.distanceKm)} km - ${escapeHtml(item.transportLabel)}</p>
        </div>
        <strong>${formatNumber(item.emissionKg)} kg CO2e</strong>
      </article>
    `)
    .join("");
}

export function applyTheme(elements, theme) {
  document.documentElement.dataset.theme = theme;
  elements.themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  elements.themeIcon.textContent = theme === "dark" ? "L" : "D";
}

export function formatNumber(value) {
  return numberFormatter.format(value);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
