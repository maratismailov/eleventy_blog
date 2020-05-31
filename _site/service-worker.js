/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "eleventy-plugin-pwa"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "admin/index.html",
    "revision": "9e74958b821f67e63a0fed748b5fade7"
  },
  {
    "url": "images/dimitry-anikin-R77kt9VjPjA-unsplash.jpg",
    "revision": "df1c6815cbf3312385c4e7ab0b651aa8"
  },
  {
    "url": "images/icons/favicon.ico",
    "revision": "368c3cae8682862cb9ac3f28e5756766"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "9d8149165df06fcee20c41f28e9ddcf5"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "d6cab375ea0f0b3d3e1d0983f3a4bbfa"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "bf895d7b0bf1682a37ef8676d3fc1c2a"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "dd019955da008d6eada6b8281237a041"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "8d659dd5cf7ed01bfdc1362c88a68c92"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "f83ee372f8c30c7447d46ad07d32b5c5"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "14a74c1abe482494ed1181745fa320a9"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "50b97d7e18825a4d490cb85be0356873"
  },
  {
    "url": "images/uploads/dimitry-anikin-R77kt9VjPjA-unsplash.jpg",
    "revision": "df1c6815cbf3312385c4e7ab0b651aa8"
  },
  {
    "url": "images/uploads/image.jpg",
    "revision": "e096444a49d892d54f71f48cda94c1e2"
  },
  {
    "url": "images/uploads/kevin-chinchilla-0dXewZttOB4-unsplash.jpg",
    "revision": "2554b43fd3f4e735822bf03b234f5b1f"
  },
  {
    "url": "images/uploads/markus-spiske-bO9B6cP0FZs-unsplash (1).jpg",
    "revision": "e096444a49d892d54f71f48cda94c1e2"
  },
  {
    "url": "index.html",
    "revision": "604a3974ce0d48e866bab1348f3b480f"
  },
  {
    "url": "manifest.json",
    "revision": "6c96a2771ad426c2ca36fb27da2155b9"
  },
  {
    "url": "posts/index.html",
    "revision": "8a04371f51344f6fa7bb703e72b8a2fc"
  },
  {
    "url": "posts/my-first-post/index.html",
    "revision": "1813f5e1ab5a475d22b9de81382f14a8"
  },
  {
    "url": "README/index.html",
    "revision": "9e9ddf2879fa4ed3fb4fe3b3f599a83c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
