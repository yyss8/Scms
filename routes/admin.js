const routers = require('express').Router();
const services = require('../services/Setting.Service');
const settingSrv = new services.SettingService();
const postServices = require('../services/Post.Service');
const postSrv = new postServices.PostService();
const userServices = require("../services/User.Service");
const usrSrv = new userServices.UserService();

routers.put('/gs',(req,res) => {
    settingSrv.update_general_setting(req.body,success =>{
        res.status(200).send(success);
    },err =>{
        res.status(400).send(err);
    });
});

routers.put('/nav/headers',(req,res) => {
    settingSrv.update_header_links(req.body.links,success => {
        res.status(200).send(success);
    },err =>{
        res.status(400).send(err);
    });
});

routers.put('/nav/sidebar',(req,res) => {
    settingSrv.update_sidebar(req.body,success => {
        res.status(200).send(success);
    },err =>{
        res.status(400).send(err);
    });
});

routers.get('/articles/pages/:pageNum/client',(req,res) => {
    postSrv.get_post_admin(req.params.pageNum,result => {
        res.status(200).send(result);
    },err => {
        res.status(400).send(err);
    });
});

routers.get('/users/profile/:id/client',(req,res) => {
    usrSrv.get_user_info_one(req.params.id, result => {
        res.status(200).send(result);
    }, err => {
        res.status(400).send(err);
    });
});

routers.put('/users/profile/:id',(req,res) => {
    usrSrv.update_user_info_admin(req.body, result => {
        res.status(200).send(result);
    },
    err => {
        res.status(400).send(err);
    });
});

routers.put('/users/gs',(req,res) => {
    settingSrv.update_user_general(req.body, result => {
        res.status(200).send(result);
    },
    err => {
        res.status(400).send(err);
    });
});

module.exports = routers;