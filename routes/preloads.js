const routers = require('express').Router();
const services = require('../services/Setting.Service');
const postservices = require('../services/Post.Service');
const settingSrv = new services.SettingService();
const postSrv = new postservices.PostService();


routers.get('/*',(req,res,next) => {
    //get all settings
    if (req.originalUrl.substring(0,5) != "/_nuxt"){
        settingSrv.get_setting(result => {
            //on success
            req.preLoad = result;
            next();
        },err =>{
            //on error
            req.preLoad = err;
            next();
        });
    }
});

routers.get('/*',(req,res,next) => {
    if (req.originalUrl.substring(0,5) != "/_nuxt"){
        const pageNum = req.originalUrl == "/" ? 1:req.originalUrl.substring(1,req.originalUrl.length);
        postSrv.get_post_firstPage(pageNum,result => {
            //on success
            req.preLoad.articles = result;
            next();
        },err =>{
            //on error
            req.preLoad.articles = err;
            next();
        });
    }

});

module.exports = routers;