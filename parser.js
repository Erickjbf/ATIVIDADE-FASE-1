// Parser descendente recursivo. Uma função por regra da gramática.
// Retorna { ast } ou { erro: { linha, esperado, encontrado } } (para no primeiro erro).
export function parser(tokens) {
  let i = 0;

  const atual = () => tokens[i];

  function erro(esperado) {
    const t = atual();
    const encontrado = t.tipo === "EOF" ? "fim do programa" : `${t.tipo} '${t.lexema}'`;
    throw { linha: t.linha, esperado, encontrado };
  }

  function esperar(tipo) {
    if (atual().tipo !== tipo) erro(tipo);
    return tokens[i++];
  }

  const num = () => Number(esperar("NUM").lexema);
  const cor = () => esperar("COR").lexema;

  const INICIO_ITEM = ["SEGMENTO", "CIRCULO", "RETANGULO", "GRUPO"];

  // programa → tela itens
  function programa() {
    const tela = telaDecl();
    const itens = listaItens();
    if (atual().tipo !== "EOF") erro("SEGMENTO, CIRCULO, RETANGULO, GRUPO ou fim do programa");
    return { tipo: "Programa", tela, itens };
  }

  // tela → CANVAS NUM NUM
  function telaDecl() {
    esperar("CANVAS");
    const largura = num();
    const altura = num();
    return { tipo: "Tela", largura, altura };
  }

  // itens → item itens | ε
  function listaItens() {
    const itens = [];
    while (INICIO_ITEM.includes(atual().tipo)) itens.push(item());
    return itens;
  }

  // item → forma | grupo
  function item() {
    return atual().tipo === "GRUPO" ? grupo() : forma();
  }

  // forma → SEGMENTO ... | CIRCULO ... | RETANGULO ...
  function forma() {
    const t = atual().tipo;
    if (t === "SEGMENTO") {
      i++;
      const x1 = num(), y1 = num(), x2 = num(), y2 = num();
      return { tipo: "Segmento", x1, y1, x2, y2, modificadores: modsForma() };
    }
    if (t === "CIRCULO") {
      i++;
      const cx = num(), cy = num(), raio = num();
      return { tipo: "Circulo", cx, cy, raio, modificadores: modsForma() };
    }
    if (t === "RETANGULO") {
      i++;
      const x = num(), y = num(), largura = num(), altura = num();
      return { tipo: "Retangulo", x, y, largura, altura, modificadores: modsForma() };
    }
    erro("SEGMENTO, CIRCULO, RETANGULO ou GRUPO");
  }

  // modsForma → modForma modsForma | ε
  function modsForma() {
    const mods = [];
    for (;;) {
      const t = atual().tipo;
      if (t === "COR_TRACO") { i++; mods.push({ tipo: "CorTraco", cor: cor() }); }
      else if (t === "COR_FUNDO") { i++; mods.push({ tipo: "CorFundo", cor: cor() }); }
      else if (t === "ESPESSURA") { i++; mods.push({ tipo: "Espessura", valor: num() }); }
      else return mods;
    }
  }

  // grupo → GRUPO modsGrupo ABRE itens FECHA
  function grupo() {
    esperar("GRUPO");
    const modificadores = modsGrupo();
    esperar("ABRE");
    const itens = listaItens();
    if (atual().tipo !== "FECHA") erro("SEGMENTO, CIRCULO, RETANGULO, GRUPO ou FECHA");
    esperar("FECHA");
    return { tipo: "Grupo", modificadores, itens };
  }

  // modsGrupo → modGrupo modsGrupo | ε
  function modsGrupo() {
    const mods = [];
    for (;;) {
      const t = atual().tipo;
      if (t === "ROTACAO") { i++; mods.push({ tipo: "Rotacao", angulo: num() }); }
      else if (t === "DESLOCAMENTO") { i++; const dx = num(); const dy = num(); mods.push({ tipo: "Deslocamento", dx, dy }); }
      else return mods;
    }
  }

  try {
    return { ast: programa() };
  } catch (e) {
    if (e && e.esperado) return { erro: e };
    throw e;
  }
}
