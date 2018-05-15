# Scms

    a simple blog content management system based on Nuxtjs/Vue SSR

Demo: http://118.25.128.65:4422 国内要备案只能用IP :(

## Installation instruction

### Runtime Environment Tested: Nodejs@10.0/Npm@6.0.1

1. git clone https://github.com/yyss8/Scms.git
2. npm install
3. use Mongodb Compass or command line "mongodbimport" to import data dumps files located in /dumps/scblog
4. mongodbimport Example: mongoimport --db scblog --collection collectionname --file yourdatafilepath
5. rename "db.config.js.example" located in /config folder to "db.config.js" and modify variable "dataDB" to your mongodb server url. (modify collection names as well if needed)
6. run "npm run dev" or "npm start" in console and wait for Nuxtjs to finish building 
7. visit http://localhost:4422 (if port 4422 is not used by other applications)

## Technology Stacks

Front-end:Vuejs/Vuex/Vue-Router/Bootstrap@3.3.7/Jquery

Back-end: Nuxtjs@1.4.0/Express@4.16.3

Database: Mongodb@3.6

### v1.0.1 (05/13/2018) Updates:

1. Project continued.
2. Codes are now updated to be compatible with the latest version of dependencies.
3. optimized router matching for preloads.

### 02/13/17 Updates:

1. articles/categories/general control panel features finished.
2. article search feature finished.

### 02/07/17 Updates:
1. Comment feature added.
2. Admin pages initiated.
3. content editor is now easier to be imported by other components

### 01/31/17 Updates:
1. content editor improved by adding more built-in string converting features.
2. raw-html are now defaultly disabled in content editor.

### 01/30/17 Updates:
1. router added for page switching feature.
2. data fetching logic redesigned, setting and articles data are now loaded before rendering page content.

### 01/29/17 Updates:

1. article posting feature finished
2. article deleting feature finished
3. page switching feature finished
4. layout adjusted for mobile platform

## Notes:

Scms is only using Nuxtjs as a middleware, so please use "npm start" or "npm run dev" to start it.
