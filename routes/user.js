const routers = require('express').Router();
const services = require('../services/User.Service');
const userSrv = new services.UserService();

routers.post('/login',(req,res,next) => {
    userSrv.user_auth(req.body.username,req.body.password,result =>{
        if (result.status == "ok"){
            req.session.regenerate(() => {
                req.session.auth = true;
                req.session.user = result.result;
                res.status(200).send(result);
             });
        }else{
            res.status(400).send(result);
        }
    });
});

routers.get('/logout',(req,res,next) => {
    req.session.destroy(() => {
        res.redirect('../');
        next();
    });
});

routers.post('/signup',(req,res,next) => {
    userSrv.signup_user(req.body,result => {
        if (result.status == "ok"){
            req.session.regenerate(() => {
                req.session.auth = true;
                req.session.user = req.body;
                res.status(200).send(result);
             });
        }
    },error => {
        res.status(400).send(error);
    });
});

routers.get('/matched/:kyWrds',(req,res,next) => {
    if (req.session){
        userSrv.get_matched_users(req.params.kyWrds,result => {
            res.status(200).send(result);
        }, err => {
            res.status(400).send(err);
        });
    }
});

routers.put('/:id',(req,res) => {
    userSrv.update_user_info(req.body, result => {
        req.session.user.email = req.body.email;
        req.session.user.password = req.body.password;
        res.status(200).send(result);
    },
    err => {
        res.status(400).send(err);
    });
});


module.exports = routers;