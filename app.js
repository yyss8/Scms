const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const Nuxt = require('nuxt');
const nuxtConfig = require('./config/nuxt.config');
const nuxt = new Nuxt(nuxtConfig);

const user = require('./routes/user');
const setting = require('./routes/setting');
const post = require('./routes/post');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('static'));
app.use(session({
  secret:'scBlog',
  cookie:{ maxAge:60*60*1000*24 },
  resave:false,
  saveUninitialized:false
}));

app.use("/user",user);
app.use("/setting",setting);
app.use("/post",post);

nuxt.build().then(() => {

    app.use(nuxt.render);

    const server = app.listen(8085, function () {

        const host = server.address().address;
        const port = server.address().port; 

        console.log("Server Started", host, port);

    })
});




