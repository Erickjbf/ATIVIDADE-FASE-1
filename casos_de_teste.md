# Casos de teste

Cole cada programa na página de teste (`index.html`) e compare com o resultado esperado.

## Programas válidos

### V1 – Programa mínimo (só tela e comentário)

```desenho
canvas 100 50
// nenhum desenho
```

**Esperado:** sem erros; AST: `Programa` com `tela {largura: 100, altura: 50}` e `itens: []`.

### V2 – Formas com modificadores (exemplo 1 da especificação)

```desenho
canvas 300 200
// casa simples
retangulo 100 100 100 80 cor_fundo amarelo cor_traco preto espessura 2
segmento 100 100 150 60 cor_traco vermelho espessura 3
segmento 150 60 200 100 cor_traco vermelho espessura 3
grupo deslocamento 20 20 {
  circulo 0 0 15 cor_fundo laranja
  grupo rotacao 45 {
    segmento 0 0 25 0 cor_traco #FF8800
  }
}
```

**Esperado:** sem erros; AST com 5 itens (retângulo, 2 segmentos, 1 grupo); o grupo contém um círculo e um grupo interno (rotação 45) com um segmento de cor `#FF8800`.

### V3 – Grupo vazio e atributos repetidos (exemplo 2)

```desenho
canvas 100 100
grupo { }
grupo rotacao 30 rotacao 60 deslocamento 10 10 {
  circulo 50 50 20 cor_traco azul cor_traco verde
}
```

**Esperado:** sem erros; primeiro grupo com `modificadores: []` e `itens: []`; segundo grupo com modificadores `Rotacao 30`, `Rotacao 60`, `Deslocamento 10 10` (nessa ordem) e um círculo com `CorTraco azul`, `CorTraco verde`.

### V4 – Aninhamento em três níveis, zero e hexadecimal minúsculo

```desenho
canvas 500 500
grupo deslocamento 0 0 {
  grupo rotacao 0 {
    grupo deslocamento 10 20 rotacao 90 {
      retangulo 0 0 5 5 cor_fundo #a0b1c2
    }
  }
}
```

**Esperado:** sem erros; três `Grupo` encadeados; o mais interno tem modificadores `Deslocamento 10 20` e `Rotacao 90` e um retângulo com `CorFundo "#a0b1c2"`. Os zeros aparecem como número `0`.

### V5 – Todas as cores nomeadas e todos os modificadores

```desenho
canvas 200 200
segmento 0 0 200 200 cor_traco vermelho
segmento 0 200 200 0 cor_traco azul espessura 0
circulo 100 100 50 cor_fundo verde cor_traco preto
circulo 100 100 20 cor_fundo branco cor_traco amarelo espessura 4
retangulo 10 10 30 30 cor_fundo laranja
```

**Esperado:** sem erros; AST com 5 itens e 7 cores nomeadas distintas; `espessura 0` vira `Espessura` com `valor: 0`.

## Programas inválidos

### I1 – Erro léxico (zero à esquerda)

```desenho
canvas 100 100
// raio com zero à esquerda
circulo 10 10 05
```

**Esperado:** erro léxico: `Linha 3: trecho inválido '05'`. A análise sintática não roda e não há AST.

### I2 – Erro sintático: `canvas` ausente

```desenho
circulo 10 10 5
```

**Esperado:** erro sintático: `Linha 1: esperado CANVAS, encontrado CIRCULO 'circulo'.`

### I3 – Erro sintático: argumento faltando

```desenho
canvas 100 100
segmento 0 0 10 cor_traco azul
```

**Esperado:** erro sintático: `Linha 2: esperado NUM, encontrado COR_TRACO 'cor_traco'.`
