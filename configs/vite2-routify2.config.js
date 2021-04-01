var fs = require("fs");
module.exports = {
  name: "Vite 2 / Routify 2",
  supersedes: ["svite-routify"],
  condition: ({ pkgjson }) => pkgjson.dependencies["@sveltejs/vite-plugin-svelte"],
  config: () => {
    const config = {
      sitemap: ".routify/urlIndex.json",
      indexHtml: "dist/index.html",
      entrypoint: "dist/__app.html",
      inlineDynamicImports: true,
      outputDir: "dist",
      eventName: "app-loaded",
    };

    if (!fs.existsSync(config.entrypoint)) {
      fs.renameSync(config.indexHtml, config.entrypoint, function (err) {
        if (err) console.log("ERROR: " + err);
      });
    }

    const script = getScript(config.entrypoint);
    if (script) config.script = `dist${script}`;

    console.log("detected script " + config.script);

    return config;
  },
};

function getScript(entrypoint) {
  const { readFileSync, existsSync } = require("fs");
  if (existsSync(entrypoint)) return readFileSync(entrypoint, "utf8").match(/<script .+?src="([^"]+)"/)[1];
}
