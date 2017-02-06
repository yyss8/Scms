const routers = require('express').Router();
const services = require('../services/Post.Service');
const postSrv = new services.PostService();

routers.get('/:id',(req,res,next) => {
    postSrv.get_post_one(req.params.id,result =>{
        req.article = result.data
        next();
    },err => {
        req.article = err;
        next();
    });
});

routers.get('/:id/client',(req,res,next) => {
    postSrv.get_post_one(req.params.id,result =>{
        res.send(result);
    },err => {
        res.send(result);
    });
});

module.exports = routers;