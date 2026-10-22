import { lexer } from "./lexer.js";
import { parser } from "./parser.js";

const entrada = document.getElementById("entrada");
const saida = document.getElementById("saida");

function escapar(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function analisar() {
  const { tokens, erros } = lexer(entrada.value);
  let html = "";

  html += "<h2>Tokens</h2><table><tr><th>Tipo</th><th>Lexema</th><th>Linha</th></tr>";
  for (const t of tokens) {
    html += `<tr><td>${t.tipo}</td><td>${escapar(t.lexema)}</td><td>${t.linha}</td></tr>`;
  }
  html += "</table>";

  if (erros.length > 0) {
    html += "<h2>Erros léxicos</h2><ul class='erro'>";
    for (const e of erros) html += `<li>Linha ${e.linha}: trecho inválido '${escapar(e.trecho)}'</li>`;
    html += "</ul>";
  } else {
    const r = parser(tokens);
    if (r.erro) {
      html += `<h2>Erro sintático</h2><p class='erro'>Linha ${r.erro.linha}: esperado ${escapar(r.erro.esperado)}, encontrado ${escapar(r.erro.encontrado)}.</p>`;
    } else {
      html += `<h2>AST</h2><pre>${escapar(JSON.stringify(r.ast, null, 2))}</pre>`;
    }
  }

  saida.innerHTML = html;
}

document.getElementById("analisar").addEventListener("click", analisar);
