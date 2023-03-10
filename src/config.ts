export const FLAG = {
  mode: import.meta.env.PROD ? "production" : "development",
  site: import.meta.env.SITE ?? "https://carlesbarreda.github.io",
  base: import.meta.env.BASE_URL ?? "/astro-pwa",
};

// Parse Argo CLI flags
for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === "--site") FLAG.site = process.argv[++i];
  if (process.argv[i] === "--base") FLAG.base = process.argv[++i];
}

// Add trailing slash if nedded
FLAG.base += !FLAG.base?.endsWith("/") ? "/" : "";

console.log("* FLAG");
console.log(FLAG);
console.log('/* import.meta.env */');
console.log(import.meta.env);
