const routers = require('express').Router();
const services = require('../services/Post.Service');
const postSrv = new services.PostService();


routers.get('/page/:pageNum',(req,res) => {
    postSrv.get_post_morePage(req.params.pageNum,result => {
        res.status(200).send(result);
    },err => {
        res.status(404).send(err);
    });
});

routers.post('/',(req,res) => {
    postSrv.create_new_post(req.body,result =>{
        res.status(201).send(result);
    },err =>{
        res.status(500).send(err);
    });
});

routers.delete('/:id',(req,res) => {
    postSrv.del_post(req.params.id,success =>{
        res.status(200).send(success);
    },err => {
        res.status(400).send(err);
    });
});

routers.put('/',(req,res) => {
    postSrv.update_post(req.body,success =>{
        res.status(200).send(success);
    },err =>{
        res.status(400).send(err);
    });
});

module.exports = routers;