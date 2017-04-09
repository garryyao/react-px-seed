/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable no-console, global-require */

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const mv = require('glob-move');
const ejs = require('ejs');
const webpack = require('webpack');
const task = require('./task');
const config = require('./config');
const spawn = require('child_process').spawn;

// Copy ./index.html into the /public folder
const html = task('html', () => {
  const webpackConfig = require('./webpack.config');
  const assets = JSON.parse(fs.readFileSync('./public/dist/assets.json', 'utf8'));
  const bundlePath = path.relative('/dist', assets.main.js);
  const template = fs.readFileSync('./public/index.ejs', 'utf8');
  const render = ejs.compile(template, { filename: './public/index.ejs' });
  const output = render({
    debug: webpackConfig.debug,
    bundle: bundlePath,
    config
  });
  fs.writeFileSync('./public/dist/index.html', output, 'utf8');
});

// Generate sitemap.xml
const sitemap = task('sitemap', () => {
  const urls = require('../src/routes.json')
    .filter(x => !x.path.includes(':'))
    .map(x => ({ loc: x.path }));
  const template = fs.readFileSync('./public/sitemap.ejs', 'utf8');
  const render = ejs.compile(template, { filename: './public/sitemap.ejs' });
  const output = render({ config, urls });
  fs.writeFileSync('public/sitemap.xml', output, 'utf8');
});

// Bundle JavaScript, CSS and image files with Webpack
const bundle = task('bundle', () => {
  const webpackConfig = require('./webpack.config');
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(stats.toString(webpackConfig.stats));
        resolve();
      }
    });
  }).then(function() {
    // create Polymer HTML bundles according to "public/polymer.json"
    return new Promise((resolve, reject) => {
      const build = spawn('../node_modules/.bin/polymer', ['build'], {cwd: 'public'});
      build.stdout.on('data', log => console.log(log.toString()));
      build.stderr.on('data', err => console.error(err.toString()));
      build.on('close', (code, stdout) => {
        if (!code) {
          mv('public/build/bundled/*', 'public/dist/').then(() => {
            rimraf.sync('public/build', {nosort: true, dot: true});
            resolve();
          }, reject);
        }
      })
    });
  });
});

//
// Build website into a distributable format
// -----------------------------------------------------------------------------
module.exports = task('build', () => {
  global.DEBUG = process.argv.includes('--debug') || false;
  rimraf.sync('public/dist/*', { nosort: true, dot: true });
  return Promise.resolve()
    .then(bundle)
    .then(html)
    .then(sitemap);
});
