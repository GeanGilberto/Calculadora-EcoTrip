# EcoTrip - Calculadora de Impacto Ambiental de Viagens

EcoTrip e uma aplicacao web estatica, hospedavel no GitHub Pages, que estima emissoes de CO2e por passageiro em viagens e compara diferentes meios de transporte. O projeto foi desenvolvido apenas com HTML5, CSS3 e JavaScript ES6+, sem frameworks.

## Objetivo

Ajudar usuarios a entender o impacto ambiental de uma viagem a partir de origem, destino e meio de transporte principal, apresentando estimativas simples, comparativos sustentaveis e dicas praticas para reduzir emissoes.

## Funcionalidades

- Geocodificacao de origem e destino com a API publica Nominatim, do OpenStreetMap.
- Calculo de distancia por formula de Haversine, sem necessidade de chave de API.
- Estimativa de kg CO2e por passageiro para aviao, carro gasolina, carro eletrico, onibus, trem, moto, bicicleta e caminhada.
- Classificacao ambiental em baixo impacto, moderado, alto e muito alto.
- Equivalencias em arvores necessarias por ano e recargas de celular.
- Tabela comparativa ordenada do menor para o maior impacto.
- Ranking com as alternativas mais ecologicas para a rota.
- Dicas de sustentabilidade conforme o transporte escolhido.
- Historico local com os ultimos 10 calculos usando LocalStorage.
- Tema claro e escuro com preferencia persistida.
- Compartilhamento por `navigator.share` quando disponivel, com fallback para copiar texto.
- Boas praticas de acessibilidade com labels, foco visivel, contraste e regioes `aria-live`.

## Tecnologias Utilizadas

- HTML5 semantico
- CSS3 com variaveis, Grid, Flexbox e media queries
- JavaScript ES6+ com modulos nativos
- Nominatim API para geocodificacao
- LocalStorage para historico e preferencias

## Arquitetura

O codigo JavaScript foi separado por responsabilidade:

- `app.js`: inicializacao, eventos e orquestracao do fluxo.
- `api.js`: comunicacao com APIs publicas.
- `calculator.js`: calculos de distancia, emissao, classificacao e equivalencias.
- `constants.js`: fatores de emissao, textos e chaves compartilhadas.
- `storage.js`: persistencia em LocalStorage.
- `ui.js`: renderizacao e atualizacao da interface.

## Estrutura de Pastas

```text
/
|-- index.html
|-- css/
|   |-- style.css
|   |-- variables.css
|   `-- responsive.css
|-- js/
|   |-- app.js
|   |-- api.js
|   |-- calculator.js
|   |-- storage.js
|   |-- ui.js
|   `-- constants.js
|-- assets/
|   |-- icons/
|   `-- images/
|       `-- eco-route.svg
`-- README.md
```

## Como Executar Localmente

Por usar modulos ES, execute com um servidor local:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

Tambem e possivel usar extensoes como Live Server no VS Code.

## Como Publicar no GitHub Pages

1. Envie os arquivos para um repositorio no GitHub.
2. Acesse `Settings > Pages`.
3. Em `Build and deployment`, selecione `Deploy from a branch`.
4. Escolha a branch principal e a pasta `/root`.
5. Salve e aguarde a URL publica ser gerada.

## Possiveis Melhorias Futuras

- Integrar OpenRouteService para distancia por rota real.
- Permitir numero de passageiros e ocupacao do veiculo.
- Adicionar mapas interativos.
- Exportar resultado em PDF.
- Incluir estimativas por pais ou matriz eletrica regional.
- Adicionar testes automatizados para os modulos de calculo.

## Licenca

Projeto academico para portfolio. 