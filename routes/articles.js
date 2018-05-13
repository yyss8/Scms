const routers = require('express').Router();
const services = require('../services/Post.Service');
const postSrv = new services.PostService();

routers.get('/:id',(req,res,next) => {
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress.split(":").pop();
    postSrv.get_post_one(req.params.id,ip,result =>{
        req.article = result.data
        next();
    },err => {
        res.redirect('/error');
    });
});

routers.get('/:id/client',(req,res,next) => {
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress.split(":").pop();
    postSrv.get_post_one(req.params.id,ip,result =>{
        res.send(result);
    },err => {
        res.redirect('/error');
    });
});

module.exports = routers;