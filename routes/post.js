const routers = require('express').Router();
const services = require('../services/Post.Service');
const postSrv = new services.PostService();

routers.get('/first',(req,res,next) => {
    //get all settings
    postSrv.get_post_firstPage(result => {
        //on success
        res.send(result);
    },err =>{
        //on error
        res.send(err);
    });
});

routers.get('/page/:pageNum/:articleNum',(req,res,next) => {
    postSrv.get_post_morePage(req.params.articleNum,req.params.pageNum,result => {
        res.send(result);
    },err => {
        res.send(err);
    });
});

routers.post('/',(req,res,next) => {
    postSrv.create_new_post(req.body,result =>{
        res.send(result);
    },err =>{
        res.send(err);
    });
});

routers.delete('/:id',(req,res,next) => {
    postSrv.del_post(req.params.id,success =>{
        res.send(success);
    },err => {
        res.send(err);
    });
});

module.exports = routers;