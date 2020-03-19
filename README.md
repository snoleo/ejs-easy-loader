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

EJS loader for [Webpack](http://webpack.js.org/)([git](http://webpack.github.io/)). Uses [ejs](https://ejs.co/)([git](https://github.com/mde/ejs)) templating engine to compile templates, achieving partial in templates.

## Installation

`npm install ejs-easy-loader`

## Usage

Use with [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin), a very helpful plugin for generating HTML files.

Below is a minimal example illustrating how to use ejs-easy-loader to include partials in a template file.

1. First install all the modules:
`npm install -D webpack webpack-cli html-webpack-plugin ejs-easy-loader`

2. config, template and partial files content:

**webpack.conf.js**
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.ejs$/i,
        use: [
          { loader: 'ejs-easy-loader' }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.ejs',
      filename: './page-a.html',
      title: 'Page A Title',
      meta: {'keywords': 'word1, word2', 'description': 'page '},
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
```js
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
      <%- require('./page-a.ejs')() // include partial file %>
    <% } else if (htmlWebpackPlugin.options.name === "b") { %>
      <%- require('./page-b.ejs')(htmlWebpackPlugin.options) // pass variable to partial file %>
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

3. run webpack to generate HTML files:
`./node_modules/webpack/bin/webpack.js --config ./webpack.conf.js`
webpack will generate files in folder `./dist/` in default, the output html files as follows:

**./dist/page-a.html**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Page A Title</title>
<meta name="keywords" content="word1, word2"><meta name="description" content="page "></head>
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

### ejs-easy-loader options

Generally there is no need to set any additional options for `ejs-easy-loader`, just load it as `{ loader: 'ejs-easy-loader' }` in webpack config file without any options. `ejs-easy-loader` has set the default options `{ client: true, filename: '.' }` for `ejs.compile` function in the program.
If you want to set some additional options or overwrite the default options(not recommended), refer to [EJS docs](https://ejs.co/#docs) for more details.

### Minification

If you want to minimize the output htmls, you should set `minify` option in [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin#minification).


## Why another ejs loader

There are several ejs loaders for Webpack on github, but most of them are outdated. When I tried to insert some partial HTML inside a [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) template file, seems none of the ejs loader could achieve this. Neither could answers on stackoverflow.com would help.
After searching and learning I wrote this `ejs-easy-loader`, hope it will help others who want to achieve partial in template.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)