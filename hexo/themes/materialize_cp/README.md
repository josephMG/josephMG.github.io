# Welcome to Materialize Hexo Theme

![Screenshot](https://raw.githubusercontent.com/carlos-algms/hexo-theme-materialize/master/source/images/_hexo-theme-materialize.jpg)

[Live Demo Here](http://carlos-algms.github.io/)

<!-- more -->

## Features Overview

- Home and Blog pages with different layouts
- Responsive
- Google Analytics
- Pagination
- Pages
- Categories Support
- About page
- Stylus CSS preprocessor


## External libraries used

- [Materialize CSS](http://materializecss.com/)
- [Font Awesome](http://fontawesome.io/icons/)
- [Lightbox2](https://github.com/lokesh/lightbox2)
- [jQuery Circle Progress](http://kottenator.github.io/jquery-circle-progress/)


## Installation

### Install the theme

You can install the theme by using:

```
$ git clone https://github.com/carlos-algms/hexo-theme-materialize.git themes/materialize
```

Then update your blog's main `_config.yml` to set the theme to `materialize`:

i.e:

``` yaml
# Extensions
## Plugins: http://hexo.io/plugins/
## Themes: http://hexo.io/themes/
theme: materialize
```

After this, uninstall `hexo-generator-index` 
since this theme will use a custom index, we dont need this hexo generator.

```
npm uninstall --save hexo-generator-index
```

Create your custom index file on `source/index.html`:

```html
---
layout: index
title:
comments: false
---
<h1>Hello World<h1> 
``` 


## Configure your site urls

You can configure any url you may want to serve your blog content,
follow the suggested one: 

```yml
permalink: blog/:title/
tag_dir: blog/tags
archive_dir: blog
category_dir: blog/categories
```


## Post Configurations

Each post supports the standard `title`, `date`, `categories`, `tags`.

Example:

``` yaml
title: Welcome to Materialize
tags: ["ThisIsATag", "Intro", "Welcome"]
---
```

## Theme Configuration

The theme's global configuration is done in `/themes/materialize/_config.yml`.


### Menu

The menu is configured under the theme's `_config.yml`.

``` yaml
# Header
menu:
  Home: /
  Blog: /blog
```

**PS:** The `Blog` menu must match your `archive_dir` config.


### Google Analytics

The Google Analytics Tracking ID is configured in the theme's `_config.yml`.

``` yaml
# Google Analytics Tracking ID
google_analytics: UA-XXXXXX-Y
```


## Creator

This theme was created by Carlos A. Gomes, check out my [github](https://github.com/carlos-algms) and [blog](http://carlos-algms.github.io/).


## Bugs

If you have a question, feature request or a bug you need me to fix, please [click here](https://github.com/carlos-algms/hexo-theme-materialize/issues/new) to file an issue.


## License

MIT

Enjoy :)

