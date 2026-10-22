# Linguagem de Desenho – Fase 1

Nome: Erick Junio Barrsoso Ferreira
RA: 26029783

Atividade da disciplina de Laboratório de Programação Avançada II – Compiladores.

## Sobre o projeto

Foi criado uma pequena linguagem de comandos para descrever desenhos 2D (tela, retas, círculos, retângulos e grupos) e implementei, em JavaScript puro e sem bibliotecas, as etapas de análise:

1. **Análise léxica:** transforma o texto em tokens e aponta erros (linha e trecho inválido).
2. **Análise sintática:** verifica se o programa segue a gramática (parser descendente recursivo) e para no primeiro erro.
3. **AST:** se não houver erros, gera a árvore sintática abstrata em JSON.

## Testar online

🔗 **Página de teste:**

Cole um programa na caixa de texto e clique em **Analisar**. A página mostra os tokens e, conforme o caso, os erros léxicos, o erro sintático ou a AST.

## Exemplo

```
canvas 300 200
// casa simples
retangulo 100 100 100 80 cor_fundo amarelo cor_traco preto espessura 2
grupo deslocamento 20 20 {
  circulo 0 0 15 cor_fundo laranja
  grupo rotacao 45 {
    segmento 0 0 25 0 cor_traco #FF8800
  }
}
```

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `index.html` | página de teste |
| `main.js` | liga a página ao léxico e ao parser |
| `tokens.js` | definição dos tokens (expressões regulares) |
| `lexer.js` | analisador léxico |
| `parser.js` | analisador sintático e geração da AST |
| `casos_de_teste.md` | 5 programas válidos e 3 inválidos, com o resultado esperado |
| `Especificacao_Linguagem_de_Desenho.pdf` | especificação (tokens, gramática, AST e decisões de projeto) |


