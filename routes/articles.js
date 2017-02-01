const routers = require('express').Router();
const services = require('../services/Post.Service');
const postSrv = new services.PostService();

routers.get('/:id',(req,res,next) => {
    postSrv.get_post_one(req.params.id,result =>{
        req.article = result.result
        next();
    },err => {
        req.article = err;
        next();
    });
});

module.exports = routers;