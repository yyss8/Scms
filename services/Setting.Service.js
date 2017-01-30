const mongodb = require("mongodb");
const assert = require("assert");
const config = require('../config/db.config');


const url = config.dataDB; //database url
const dbName = config.settingCollection;

class SettingService{
    get_setting(success,fail){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null, err);
            const collection = db.collection(dbName); 
            collection.findOne({_id:1}).then((doc) => {
                success({status:"ok",content:"Setting Found",settings:doc});
            },(err)=>{
                fail({status:"err",content:"Error Happened"});
            });
            db.close();
        }); 
    }
}


module.exports = {SettingService:SettingService};