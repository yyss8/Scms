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

    postSrv.update_post( req.body )
           .then( result =>{
                res.status(200).send({
                    status:'ok',
                    content:result
                });
           })
           .catch( err =>{
                res.status(400).send({
                    status:'err',
                    content:err
                });
           });
});

routers.post('/:id/comments',(req,res) => {
    postSrv.create_comment(req.body,success =>{
        res.status(201).send(success);
    },err =>{
        res.status(500).send(err);
    });
});

routers.post('/:id/comments/upload',(req,res) => {
    if(req.files.myFile) {

    }
    res.end();
});

routers.delete('/:id/comments/:commentid',(req,res) => {
    postSrv.delete_comment(req.params.id,req.params.commentid,success =>{
        res.status(200).send(success);
    },err =>{
        res.status(400).send(err);
    });
});

routers.post('/:id/comments/:commentid',(req,res) => {
    postSrv.create_subcomment(req.params.id,req.body,success =>{
        res.status(201).send(success);
    },err =>{
        res.status(400).send(err);
    });
});

routers.delete('/:id/comments/:commentid/subcomments/:subid',(req,res) => {
    postSrv.delete_sub_comment(req.params,success =>{
        res.status(200).send(success);
    },err =>{
        res.status(400).send(err);
    });
});

routers.put('/:id/comments/:commentid/like',(req,res) => {
    req.params.ip = req.headers['x-real-ip'] || req.connection.remoteAddress.split(":").pop();
    postSrv.like_comment(req.params,success =>{
        res.status(200).send(success);
    },err =>{
        res.status(400).send(err);
    });
});

routers.put('/:id/comments/:commentid/subcomments/:subid/like',(req,res) => {
    
    req.params.ip = req.headers['x-real-ip'] || req.connection.remoteAddress.split(":").pop();
    postSrv.like_sub_comment(req.params,success =>{
        res.status(200).send(success);
    },err =>{
        res.status(400).send(err);
    });
});

routers.delete('/:id/all/comments',(req,res) => {
    postSrv.delete_comment_all(req.params.id,success =>{
        res.status(200).send(success);
    },err =>{
        res.status(400).send(err);
    });
});

routers.delete('/:id/all/comments/:commentid/subcomments',(req,res) => {
    postSrv.delete_sub_comment_all(req.params.id,req.params.commentid,success =>{
        res.status(200).send(success);
    },err =>{
        res.status(400).send(err);
    });
});

module.exports = routers;