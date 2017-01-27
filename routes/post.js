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


module.exports = routers;