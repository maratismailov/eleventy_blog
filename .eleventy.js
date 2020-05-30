const pluginPWA = require("eleventy-plugin-pwa");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(pluginPWA, {
        swDest: "./_site/service-worker.js",
        globDirectory: "./_site",
        clientsClaim: true,
        skipWaiting: true
      });

    eleventyConfig.addPassthroughCopy('images')
    eleventyConfig.addPassthroughCopy('admin')
    eleventyConfig.addPassthroughCopy('manifest.json')
  
    const {
      DateTime
    } = require("luxon");
  
    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
      eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {
          zone: 'utc'
        }).toFormat('yy-MM-dd');
      });
  
      eleventyConfig.addFilter("readableDate", dateObj => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat("dd-MM-yy");
    });
  
  };