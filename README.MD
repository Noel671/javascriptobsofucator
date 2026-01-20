# JavaScript-Obfuscator

Ein einfacher, lokaler Obfuscator für JavaScript, gebaut mit HTML, CSS und Vanilla JavaScript. Die Obfuskierung ist bewusst simpel gehalten und dient zu Lern- und Demo-Zwecken.

## Funktionen

- Entfernt Kommentare und reduziert Whitespace.
- Optionale Umbenennung von Variablen.
- Optionale String-Kodierung (Base64).
- Kopieren-Button für den obfuskierte Code.

## Verwendung

1. Projektordner öffnen.
2. `index.html` im Browser öffnen.
3. JavaScript-Code in das Eingabefeld einfügen.
4. Optionen auswählen und auf **Obfuskieren** klicken.

## Hinweise

- Template-Strings bleiben unverändert.
- Die String-Kodierung nutzt `btoa/atob`, was nur für ASCII/UTF-8-Inhalte geeignet ist.
- Für echte Produktions-Obfuscation bitte professionelle Tools nutzen.

## Projektstruktur

```
.
├── index.html
├── style.css
├── script.js
└── README.MD
```
