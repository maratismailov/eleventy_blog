const pluginPWA = require("eleventy-plugin-pwa");
const sharp = require('sharp');
const fs = require('fs')

module.exports = function (eleventyConfig) {
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



  eleventyConfig.addTransform("images", function (content, outputPath) {
    const blog = /posts\/([a-zA-Z0-9_-]+)\/index\.html/i;
    // const projects = /projects\/([a-zA-Z0-9_-]+)\/index\.html/i;
    // const imagesInParagraph =
    //   /\<p\>\<img src\=\"\/images\/([^\.]*).([^\"]*)\" alt\=\"([^\>]*)\"(.*?)\>\<\/p\>/ig;
    const images = /\<img src\=\"\/images\/([^\.]*).([^\"]*)\" alt\=\"([^\>]*)\"(.*?)\>/ig;
    // Image sizes property for adaptive images
    // const sizes = "(max-width: calc(1000px + 2 * 2.4rem)) calc(100vw - 2 * 2.4rem), 1000px"
    const sizes = "(max-width: 600px) 320px, (max-width: 600px) 480px, 1000px"


    function generateImage(url, extension, alt) {
      // Get image
      // const image = sharp(`${url}.${extension}`);
      const image = sharp(`_site/images/${url}.${extension}`, { failOnError: false });
      // Resize image to 320px and 640px
      const smallImage = image.clone().resize({ width: 320 });
      const mediumImage = image.clone().resize({ width: 640 });
      // Generate a webp version of a large image
      // image.clone().webp().toFile(`_site/images/${url}.webp`);
      image.clone().webp().toBuffer(function (err, buffer) {
        fs.writeFile(`_site/images/${url}.webp`, buffer, function (e) { });
      });
      // Generate a small original and webp image
      smallImage.clone().toFile(`_site/images/${url}-small.${extension}`);
      // smallImage.clone().toBuffer(function (err, buffer) {
      //   fs.writeFile(`_site/images/${url}-small.${extension}`, buffer, function (e) { });
      // });
      smallImage.clone().webp().toFile(`_site/images/${url}-small.webp`);
      // smallImage.clone().webp().toBuffer(function (err, buffer) {
      //   fs.writeFile(`_site/images/${url}-small.webp`, buffer, function (e) { });
      // });
      // Generate a medium original and webp image
      mediumImage.clone().toFile(`_site/images/${url}-medium.${extension}`);
      // mediumImage.clone().toBuffer(function (err, buffer) {
      //   fs.writeFile(`_site/images/${url}-medium.${extension}`, buffer, function (e) { });
      // });
      mediumImage.clone().webp().toFile(`_site/images/${url}-medium.webp`);
      // mediumImage.clone().webp().toBuffer(function (err, buffer) {
      //   fs.writeFile(`_site/images/${url}-medium.webp`, buffer, function (e) { });
      // });

      // sharp('file.jpg').resize(100, 100).toBuffer(function (err, buffer) {
      //   fs.writeFile('file.jpg', buffer, function (e) { });
      // });

      return `
      <figure>
      <picture>
        <source
          srcset="/images/${url}-small.webp 320w,
                  /images/${url}-medium.webp 640w,
                  /images/${url}.webp 1000w"
          sizes="${sizes}"
          type="image/webp">
        <img
          src="/images/${url}.${extension}"
          data-src="auto"
          srcset="/images/${url}-small.${extension} 320w,
                  /images/${url}-medium.${extension} 640w,
                  /images/${url}.${extension} 1000w"
          data-srcset="/images/${url}-small.${extension} 320w,
                      /images/${url}-medium.${extension} 640w,
                      /images/${url}.${extension} 1000w"
          sizes="${sizes}"
          alt="${alt}" loading="lazy">
      </picture>
      <figcaption>${alt}</figcaption>
    </figure>`
    }
    //   <figure>
    //   <picture>
    //     <source
    //       srcset="/images/${url}-small.webp 320w,
    //               /images/${url}-medium.webp 640w,
    //               /images/${url}.webp 1000w"
    //       sizes="${sizes}"
    //       type="image/webp">
    //     <img
    //       src="/images/${url}.${extension}"
    //       data-src="auto"
    //       srcset="/images/${url}-small.${extension} 320w,
    //               /images/${url}-medium.${extension} 640w,
    //               /images/${url}.${extension} 1000w"
    //       data-srcset="/images/${url}-small.${extension} 320w,
    //                   /images/${url}-medium.${extension} 640w,
    //                   /images/${url}.${extension} 1000w"
    //       sizes="${sizes}"
    //       alt="${alt}" loading="lazy">
    //   </picture>
    //   <figcaption>${alt}</figcaption>
    // </figure>`

    if (outputPath && outputPath.match(blog)) {
      content = content.replace(images, (match, p1, p2, p3) => {
        return generateImage(p1, p2, p3);
      });
    }


    return content;
  });

};