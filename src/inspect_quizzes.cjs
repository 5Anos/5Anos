const fs = require("fs");
const path = require("path");

const files = [
  "themeCorreioEletronicoData.ts",
  "themeDireitosAutorData.ts",
  "themeErgonomiaData.ts",
  "themeNavegarInternetData.ts",
  "themePalavrasPasseData.ts",
  "themeSegurancaData.ts",
  "themeTicSociedadeData.ts"
];

files.forEach(f => {
  const code = fs.readFileSync(path.join(__dirname, "data", f), "utf8");
  console.log("\n=========================================");
  console.log("FILE: " + f);
  console.log("=========================================");

  // Find all quiz questions blocks
  const questionRegex = /question:\s*\{\s*pt:\s*['"`]([\s\S]*?)['"`]\s*,\s*en:/g;
  let match;
  while ((match = questionRegex.exec(code)) !== null) {
    const qText = match[1].replace(/\n/g, " ");
    const snippet = code.substring(match.index, match.index + 900);
    
    // Find options pt
    const optRegex = /options:\s*\{\s*pt:\s*\[([\s\S]*?)\]\s*,\s*en:/;
    const optMatch = snippet.match(optRegex);

    console.log("\n[Q] " + qText);
    if (optMatch) {
      const optsString = optMatch[1];
      const opts = optsString.split(/,\s*\n|\n/).map(s => s.trim()).filter(s => s.length > 0);
      opts.forEach(o => console.log("   -> " + o));
    }
  }
});
