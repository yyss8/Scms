const routers = require('express').Router();
const services = require('../services/Setting.Service');
const settingSrv = new services.SettingService();

routers.get('/all',(req,res,next) => {
    //get all settings
    settingSrv.get_setting(result => {
        //on success
        res.send(result);
    },err =>{
        //on error
        res.send(err);
    });
});


module.exports = routers;