import { TOKENS } from "./tokens.js";

// Retorna { tokens, erros }. Cada token: { tipo, lexema, linha }.
// Cada erro: { linha, trecho } (trecho = palavra inteira, até o próximo espaço).
export function lexer(codigo) {
  const tokens = [];
  const erros = [];
  let pos = 0;
  let linha = 1;

  while (pos < codigo.length) {
    let casou = false;

    for (const t of TOKENS) {
      t.regex.lastIndex = pos;
      const m = t.regex.exec(codigo);
      if (!m) continue;

      casou = true;
      pos += m[0].length;
      if (t.tipo === "NOVA_LINHA") linha++;
      if (!t.ignorar) tokens.push({ tipo: t.tipo, lexema: m[0], linha });
      break;
    }

    if (!casou) {
      // nenhum token casou: registra a palavra inteira como erro e segue depois dela
      const palavra = /\S+/y;
      palavra.lastIndex = pos;
      const trecho = palavra.exec(codigo)[0];
      erros.push({ linha, trecho });
      pos += trecho.length;
    }
  }

  tokens.push({ tipo: "EOF", lexema: "", linha });
  return { tokens, erros };
}
