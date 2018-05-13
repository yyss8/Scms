const routers = require('express').Router();
const services = require('../services/Setting.Service');
const postservices = require('../services/Post.Service');
const settingSrv = new services.SettingService();
const postSrv = new postservices.PostService();
const userServices = require('../services/User.Service');
const usrSrv = new userServices.UserService();


routers.get('/*', (req, res, next) => {

    //log access ip
    console.log(`${req.method} ${req.path} | From ${req.connection.remoteAddress.split(":").pop()} | At ${new Date().toLocaleTimeString()}`);

    //get all settings
    settingSrv.get_setting(result => {
        //on success
        req.preLoad = result;
        next();
    },err =>{
        //on error
        req.preLoad = err;
        next();
    });
});

routers.get('/*', (req,res,next) => {

    if ( /\/admin\/articles\/pages\/.*$/.test( req.originalUrl ) ){

        const matched = req.originalUrl.match( /\/admin\/articles\/pages\/(\d+)$/ );
        const pageNum = matched && !isNaN( matched[1] ) ? Number( matched[1] ):1;
        console.log( pageNum );
        postSrv.get_post_admin(pageNum, r => {
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

routers.get('/*',(req,res,next) => {

    if ( /\/admin\/users\/profile\/id\/.*$/.test( req.originalUrl ) ){

        const matched = req.originalUrl.match( /\/admin\/users\/profile\/id\/(.*)$/ );
        if ( matched ){

            const userId = matched[1];
            usrSrv.get_user_info_one( userId ,r => {
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
        
    }else{
        next();
    }


});

routers.get('/*', (req,res,next) => {

    if ( /\/pages\/.*$/.test( req.originalUrl ) ){

        const matched = req.originalUrl.match( /\/pages\/(\d+)$/ );
        const pageNum = matched && !isNaN( matched[1] ) ? Number(matched[1]):1;

        postSrv.get_post_firstPage( pageNum , result => {
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