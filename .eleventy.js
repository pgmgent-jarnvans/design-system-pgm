const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'css': 'assets/css',
    'images': 'assets/images'
  });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  return {
    dir: {
      input: 'views',
      output: 'docs'
    },
    htmlTemplateEngine: 'njk',
    pathPrefix: '/design-system-pgm/'
  };
};