module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/static": "static" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("CNAME");

  eleventyConfig.addFilter("sortByOrder", (collection) => {
    return [...collection].sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
  });

  // union of every `stack` value used across a collection's project data,
  // so the filter chips never drift out of sync with the content itself.
  // (named `stack`, not `tags` — Eleventy merges frontmatter `tags` across
  // the data cascade for collection membership, so reusing that key here
  // would leak directory-level tags like "projects" into every item.)
  eleventyConfig.addFilter("uniqueTechTags", (collection) => {
    const set = new Set();
    collection.forEach((item) => {
      (item.data.stack || []).forEach((t) => set.add(t));
    });
    return [...set].sort((a, b) => a.localeCompare(b));
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("yearsSince", (startYear) => `${new Date().getFullYear() - startYear}`);

  eleventyConfig.addFilter("slugify", (str) =>
    String(str)
      .toLowerCase()
      .replace(/\+\+/g, "pp")
      .replace(/\+/g, "p")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
