const routers = require('express').Router();
const services = require('../services/Setting.Service');
const postservices = require('../services/Post.Service');
const settingSrv = new services.SettingService();
const postSrv = new postservices.PostService();
const userServices = require('../services/User.Service');
const usrSrv = new userServices.UserService();


routers.get('/',(req,res,next) => {
    //get all settings
    
    if (req.originalUrl.charAt(1) !== "_"){
        settingSrv.get_setting(result => {
            //on success
            req.preLoad = result;
            next();
        },err =>{
            //on error
            req.preLoad = err;
            next();
        });
    }else{
        next();
    }
});

routers.get('/',(req,res,next) => {
    if (req.originalUrl.includes("/admin/articles/pages/")){
        const pgNum = Number(req.originalUrl.replace("/admin/articles/pages/",""));
        postSrv.get_post_admin(pgNum,r => {
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

routers.get('/',(req,res,next) => {
    if (req.originalUrl.includes("/admin/users/profile/id/")){
        const id = req.originalUrl.replace("/admin/users/profile/id/","");
        usrSrv.get_user_info_one(id,r => {
            //on success
            req.preLoad.user = r.result;
            next(); 
        },err =>{
            //on error
            req.preLoad.user = err;
            next();
        });
    }else{
        next();
    }
});

routers.get('/',(req,res,next) => {
    if (req.originalUrl.substring(0,6) === "/pages"){
        const pageNum = req.originalUrl == "/pages" ? 1:req.originalUrl.substring(7,req.originalUrl.length);
        postSrv.get_post_firstPage(pageNum,result => {
            //on success
            req.preLoad.articles = result;
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

module.exports = routers;