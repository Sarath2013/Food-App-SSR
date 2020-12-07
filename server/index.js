import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../src/App';
const express = require('express');
const path = require('path');
const fetch = require("node-fetch");
const server = express();
const fs = require('fs');
let recipes = [];

server.get('/', function (req, res) {
  const context = {};
  const html = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App recipes={recipes} />
    </StaticRouter>
  );
  fs.readFile('./build/index.html', 'utf8', function (err, data) {
    if (err) throw err;
    const serverRendered = data.replace(/<div id="root"><\/div>/, `<div id="root">${html}</div><script>window.recipes = ${JSON.stringify(recipes)}</script>`);
    res.send(serverRendered);
  });
});

server.use(express.static('./images'));
server.use(express.static('./build'));
server.use(express.static('./server-build'));

server.listen(process.env.PORT || 9000, async () => {
  try {
    recipes = JSON.parse(fs.readFileSync('./server/recipes.json'));
    console.log(`Server Started...`);
  } catch (e) {
    console.log(`Server failure...`, e);
  }
})