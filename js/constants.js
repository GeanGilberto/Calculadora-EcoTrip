export const TRANSPORTS = {
  plane: {
    label: "Aviao",
    factor: 0.255,
    tips: ["Priorize voos diretos.", "Considere compensacao de carbono.", "Evite voos curtos quando houver trem ou onibus viavel."]
  },
  gasolineCar: {
    label: "Carro gasolina",
    factor: 0.192,
    tips: ["Compartilhe viagens.", "Mantenha revisoes em dia.", "Evite excesso de peso no veiculo."]
  },
  electricCar: {
    label: "Carro eletrico",
    factor: 0.053,
    tips: ["Recarregue em horarios de menor demanda.", "Planeje paradas para reduzir desvios.", "Combine energia renovavel quando possivel."]
  },
  bus: {
    label: "Onibus",
    factor: 0.105,
    tips: ["Opcao eficiente para longas distancias.", "Prefira linhas diretas.", "Viagens coletivas diluem emissoes por passageiro."]
  },
  train: {
    label: "Trem",
    factor: 0.041,
    tips: ["Excelente relacao entre conforto e emissao.", "Priorize trem em rotas intermunicipais disponiveis.", "Combine com caminhada ou bicicleta no trecho final."]
  },
  motorcycle: {
    label: "Moto",
    factor: 0.103,
    tips: ["Conduza de forma constante.", "Mantenha pneus calibrados.", "Evite deslocamentos desnecessarios em horarios de pico."]
  },
  bicycle: {
    label: "Bicicleta",
    factor: 0,
    tips: ["Emissao operacional praticamente nula.", "Use rotas seguras e ciclovias.", "Combine com transporte publico para distancias maiores."]
  },
  walking: {
    label: "Caminhada",
    factor: 0,
    tips: ["Impacto ambiental zero.", "Ideal para trajetos curtos.", "Planeje horarios e rotas com seguranca."]
  }
};

export const STORAGE_KEYS = {
  history: "ecotrip:history",
  theme: "ecotrip:theme"
};

export const HISTORY_LIMIT = 10;
export const TREE_ABSORPTION_KG_YEAR = 22;
export const PHONE_CHARGE_KG = 0.008;
