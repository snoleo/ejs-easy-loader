<div align="center">
  <img width="100" height="100" src="https://worldvectorlogo.com/logos/html5.svg">
  <a href="https://github.com/webpack/webpack">
    <img src="https://webpack.js.org/assets/icon-square-big.svg" width="100" height="100" alt="webpack logo">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]

# ejs-easy-loader for Webpack

EJS loader for [Webpack](http://webpack.js.org/)( [webpack github](http://webpack.github.io/) ). Uses [ejs](https://ejs.co/)( [ejs github](https://github.com/mde/ejs) ) templating engine to compile templates, easy to insert partial in templates.

## Installation

`npm install ejs-easy-loader`

## Usage

Add to webpack conf:
```javascript
module.exports = {
  //...
  module: {
    rules: [
      { test: /\.ejs$/i, use: [ { loader: 'ejs-easy-loader' } ] }
    ]
  },
  //...
};
```

Include partial in template file:
```html
<div>
  <% /* following line includes partial ejs file without passing any parameter to partial file */ %>
  <%- require('./partial-a.ejs')() %>
</div>
<div>
  <% /* following line includes partial file and passing a parameter (an object) to partial file */ %>
  <%- require('./partial-b.ejs')({ 'title': 'Part-B', 'content': 'Partial Content' }) %>
</div>
```

Recommend to use this loader with [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin), a very helpful plugin for generating HTML files in Webpack.

### Example

Below is a minimal example illustrating how to use ejs-easy-loader to include partials in a template file. You can find this example in [examples](https://github.com/snoleo/ejs-easy-loader/blob/master/examples) folder.

#### Step 3-1) Install the modules in ./ejs-easy-loader-eg folder:
```
mkdir -p ./ejs-easy-loader-eg/node_modules && cd ./ejs-easy-loader-eg && \
  npm install webpack webpack-cli html-webpack-plugin ejs-easy-loader
```
After testing the example, you can just delete this `./ejs-easy-loader-eg` folder.

#### Step 3-2) Add webpack config, template and partial files:

**webpack.conf.js**
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  module: {
    rules: [
      { test: /\.ejs$/i, use: [ { loader: 'ejs-easy-loader' } ] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.ejs',
      filename: './page-a.html',
      title: 'Page A Title',
      meta: {'keywords': 'word1, word2', 'description': 'page description'},
      name: "a"
    }),
    new HtmlWebpackPlugin({
      template: './template.ejs',
      filename: './page-b.html',
      title: 'Page B Title',
      name: "b",
      obj: {"food": "fruit"},
      arr: ["apple", "orange", "banana"]
    })
  ]
};
```

**index.js**
```javascript
// You can leave this entry file empty in this example.
```

**template.ejs**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
  <div id="header"><h2>Common Page Header</h2></div>
  <div id="content">
    <% if (htmlWebpackPlugin.options.name === "a") { %>
      <%- require('./page-a.ejs')() /* include partial file without parameter */ %>
    <% } else if (htmlWebpackPlugin.options.name === "b") { %>
      <%- require('./page-b.ejs')(htmlWebpackPlugin.options) /* pass an object to partial file */ %>
    <% } %>
  </div>
  <div id="footer"><h2>Common Page Footer</h2></div>
</body>
</html>
```

**page-a.ejs**
```html
<h2>This is content for Page A.</h2>
```

**page-b.ejs**
```html
<h2>Content for Page B - <%= obj.food %></h2>
<ul>
  <% arr.forEach(function(item){ %>
    <li><%= item %></li>
  <% }); %>
</ul>
```

#### Step 3-3) Run webpack to generate HTML files:

`./node_modules/webpack/bin/webpack.js --config ./webpack.conf.js`

webpack will generate files in folder `./dist/` in default. The two output html files generated are as follows:

**./dist/page-a.html**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Page A Title</title>
<meta name="keywords" content="word1, word2"><meta name="description" content="page description"></head>
<body>
  <div id="header"><h2>Common Page Header</h2></div>
  <div id="content">
    
      <h2>This is content for Page A.</h2>

    
  </div>
  <div id="footer"><h2>Common Page Footer</h2></div>
<script type="text/javascript" src="main.js"></script></body>
</html>
```

**./dist/page-b.html**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Page B Title</title>
</head>
<body>
  <div id="header"><h2>Common Page Header</h2></div>
  <div id="content">
    
      <h2>Content for Page B - fruit</h2>
<ul>
  
    <li>apple</li>
  
    <li>orange</li>
  
    <li>banana</li>
  
</ul>

    
  </div>
  <div id="footer"><h2>Common Page Footer</h2></div>
<script type="text/javascript" src="main.js"></script></body>
</html>
```

### Options for `ejs-easy-loader` 

Generally there is no need to set any additional options for `ejs-easy-loader`, just load it as `{ loader: 'ejs-easy-loader' }` in webpack config file without any options. 

`ejs-easy-loader` has set the default options `{ client: true, filename: '.' }` for `ejs.compile` function in the program.

If you want to set some additional options or overwrite the default options(not recommended), refer to [EJS docs](https://ejs.co/#docs) for more details.

### Minification

If you want to minimize the output htmls, you should set `minify` option in [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin#minification).


## Why another ejs loader

There are already several ejs loaders for Webpack on github, but most of them are outdated. When I tried to insert some partial HTML inside a [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) template file, none of the ejs loader could work. Neither could answers on stackoverflow.com would help.

After searching and learning I decided to create this `ejs-easy-loader`, hope it will help others to work at partial in template.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)


[npm]: https://img.shields.io/npm/v/ejs-easy-loader.svg
[npm-url]: https://npmjs.com/package/ejs-easy-loader

[node]: https://img.shields.io/node/v/ejs-easy-loader.svg
[node-url]: https://nodejs.org

[deps]: https://img.shields.io/david/snoleo/ejs-easy-loader.svg
[deps-url]: https://david-dm.org/snoleo/ejs-easy-loader