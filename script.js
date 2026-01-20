const inputCode = document.querySelector("#inputCode");
const outputCode = document.querySelector("#outputCode");
const obfuscateButton = document.querySelector("#obfuscateButton");
const copyButton = document.querySelector("#copyButton");
const clearButton = document.querySelector("#clearButton");
const renameVariablesToggle = document.querySelector("#renameVariables");
const encodeStringsToggle = document.querySelector("#encodeStrings");

const reservedWords = new Set([
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "export",
  "extends",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "new",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
  "let",
  "enum",
  "await",
  "implements",
  "package",
  "protected",
  "static",
  "interface",
  "private",
  "public",
]);

const builtins = new Set([
  "Array",
  "Boolean",
  "Date",
  "Math",
  "Number",
  "Object",
  "RegExp",
  "String",
  "JSON",
  "console",
  "document",
  "window",
  "setTimeout",
  "setInterval",
  "clearTimeout",
  "clearInterval",
]);

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const normalizeWhitespace = (code) =>
  code
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .trim();

const collectIdentifiers = (code) => {
  const identifiers = new Set();
  const matches = code.match(/\b[$A-Z_][0-9A-Z_$]*\b/gi) ?? [];

  for (const token of matches) {
    if (!reservedWords.has(token) && !builtins.has(token)) {
      identifiers.add(token);
    }
  }

  return Array.from(identifiers);
};

const obfuscateIdentifiers = (code) => {
  const identifiers = collectIdentifiers(code);
  const mapping = new Map();
  let counter = 0;

  for (const name of identifiers) {
    mapping.set(name, `_${counter.toString(36)}`);
    counter += 1;
  }

  let result = code;
  for (const [original, replacement] of mapping.entries()) {
    const pattern = new RegExp(`\\b${escapeRegExp(original)}\\b`, "g");
    result = result.replace(pattern, replacement);
  }

  return result;
};

const encodeStrings = (code) =>
  code.replace(/(['"`])((?:\\.|(?!\1).)*)\1/g, (match, quote, content) => {
    if (match.startsWith("`")) {
      return match;
    }

    const encoded = btoa(unescape(encodeURIComponent(content)));
    return `atob("${encoded}")`;
  });

const obfuscateCode = () => {
  const source = inputCode.value;
  if (!source.trim()) {
    outputCode.value = "";
    return;
  }

  let result = normalizeWhitespace(source);

  if (encodeStringsToggle.checked) {
    result = encodeStrings(result);
  }

  if (renameVariablesToggle.checked) {
    result = obfuscateIdentifiers(result);
  }

  outputCode.value = result;
};

const copyOutput = async () => {
  const content = outputCode.value;
  if (!content) {
    return;
  }

  try {
    await navigator.clipboard.writeText(content);
    copyButton.textContent = "Kopiert!";
    setTimeout(() => {
      copyButton.textContent = "Kopieren";
    }, 1800);
  } catch (error) {
    copyButton.textContent = "Fehlgeschlagen";
    setTimeout(() => {
      copyButton.textContent = "Kopieren";
    }, 1800);
    console.error(error);
  }
};

const clearAll = () => {
  inputCode.value = "";
  outputCode.value = "";
};

obfuscateButton.addEventListener("click", obfuscateCode);
copyButton.addEventListener("click", copyOutput);
clearButton.addEventListener("click", clearAll);
