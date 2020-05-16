const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'css': 'assets/css',
    'images': 'assets/images',
    'js': 'assets/js',
    'files': 'assets/files'
  });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addWatchTarget("./css/");

  return {
    dir: {
      input: 'views',
      output: 'docs'
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    pathPrefix: '/opdracht-digitale-marketing'
  };
};