const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { Nuxt, Builder } = require('nuxt');
const nuxtConfig = require('./config/nuxt.config');
const nuxt = new Nuxt(nuxtConfig);

const files = require('./routes/files');
const user = require('./routes/user');
const preloads = require('./routes/preloads');
const admin = require('./routes/admin');
const post = require('./routes/post');
const articles = require('./routes/articles');
const categories = require('./routes/categories');
const date = require("./routes/date");
const search = require('./routes/search');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('static'));
app.use(session({
  secret:'scBlog',
  cookie:{ maxAge:60*60*1000*24 },
  resave:false,
  saveUninitialized:false
}));

//api
app.use("/user", user);
app.use("/post", post);
app.use("/admin", admin);
app.use('/files', files);

//page rendering
app.use(/^[^(.|\_\_)]*$/, preloads); //loading preload data for non-file routes
app.use("/articles", articles);
app.use("/categories", categories);
app.use("/date", date);
app.use("/keywords", search);
app.use(nuxt.render);

if (  process.env.BUILD !== 'disable' ){
  new Builder(nuxt).build()
  .catch((error) => {
     console.error(error);
     process.exit(1)
   });
}

const server = app.listen(4422, function () {

    const host = server.address().address;
    const port = server.address().port; 

    console.log("Server Started", host, port);

});