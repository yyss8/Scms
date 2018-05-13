const routers = require('express').Router();
const services = require('../services/Post.Service');
const postSrv = new services.PostService();

routers.get('/:date/pages/:pgNum',(req,res,next) => {
    if (req.params.date !== undefined){
        postSrv.get_post_byDate(req.params.date,req.params.pgNum,r => {
            //on success
            req.preLoad.articles = r.result;
            next(); 
        },err =>{
            //on error
            req.preLoad.articles = err;
            next();
        });
    }else{
        next();
    }
});

routers.get('/:date/pages/:pgNum/client',(req,res,next) => {
    postSrv.get_post_byDate(req.params.date,req.params.pgNum,r => {
        res.status(200).send(r);
    },err =>{
        res.status(400).send(err);
    });
});


module.exports = routers;