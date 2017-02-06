const routers = require('express').Router();
const services = require('../services/Setting.Service');
const settingSrv = new services.SettingService();

routers.put('/gs',(req,res) => {
    settingSrv.update_general_setting(req.body,success =>{
        res.status(200).send(success);
    },err =>{
        res.status(400).send(err);
    });
});

module.exports = routers;