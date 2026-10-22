// Definição dos tokens: testados na ordem; vence o primeiro que casar.
// A flag y (sticky) faz a regex casar exatamente na posição lastIndex.
export const TOKENS = [
  { tipo: "ESPACO", regex: /[ \t\r]+/y, ignorar: true },
  { tipo: "NOVA_LINHA", regex: /\n/y, ignorar: true },
  { tipo: "COMENTARIO", regex: /\/\/[^\n]*/y, ignorar: true },

  { tipo: "CANVAS", regex: /canvas\b/y },
  { tipo: "SEGMENTO", regex: /segmento\b/y },
  { tipo: "CIRCULO", regex: /circulo\b/y },
  { tipo: "RETANGULO", regex: /retangulo\b/y },
  { tipo: "GRUPO", regex: /grupo\b/y },
  { tipo: "COR_TRACO", regex: /cor_traco\b/y },
  { tipo: "COR_FUNDO", regex: /cor_fundo\b/y },
  { tipo: "ESPESSURA", regex: /espessura\b/y },
  { tipo: "ROTACAO", regex: /rotacao\b/y },
  { tipo: "DESLOCAMENTO", regex: /deslocamento\b/y },

  { tipo: "COR", regex: /(vermelho|azul|verde|preto|branco|amarelo|laranja)\b|#[0-9a-fA-F]{6}\b/y },
  { tipo: "NUM", regex: /(0|[1-9][0-9]*)\b/y },

  { tipo: "ABRE", regex: /\{/y },
  { tipo: "FECHA", regex: /\}/y },
];
