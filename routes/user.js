const routers = require('express').Router();
const services = require('../services/User.Service');
const userSrv = new services.UserService();

routers.post('/login',(req,res,next) => {
    userSrv.user_auth(req.body.username,req.body.password,result =>{
        if (result.status == "ok"){
            req.session.regenerate(() => {
                req.session.auth = true;
                req.session.user = req.body.username;
                result['user'] = req.session.user;
                res.status(200).send(result);
             });
        }else{
            res.status(400).send(result);
            next();
        }
    });
});

routers.get('/logout',(req,res,next) => {
    req.session.destroy(() => {
        res.redirect('../');
        next();
    });
});


module.exports = routers;