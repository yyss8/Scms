const mongodb = require("mongodb");
const assert = require("assert")
const config = require('../config/db.config');

const url = config.dataDB; //database url
const dbName = config.userCollection 

class UserService{
    user_auth(username,password,callback,error){
        //user authentication
        mongodb.connect(url,(err,db) =>{
            assert.equal(null, err);
            let collection = db.collection(dbName); 
            collection.findOne({username:username}).then((doc) => {
                if (doc === null){
                    callback({"status":"un","content":"In-correct Username"}); 
                }else if (doc.password != password){
                    callback({"status":"pw","content":"In-correct Password"});
                }else{
                    callback({"status":"ok","content":"Sucessful Login"});
                }
            },(err)=>{
                error({"status":"err","content":"Error Happened"});
            });
            db.close();
        })
    }

    get_user_info(username,callback){
        //get username & password
        mongodb.connect(url,(err,db) =>{
            assert.equal(null, err);
            let collection = db.collection(dbName); 
            collection.findOne({username:username},{fields:{password:1}}).then((doc) => {
                callback({status:"ok",content:"Username Found",result:doc});
            },(err)=>{
                error({"status":"err","content":"Error Happened"});
            });
            db.close();
        }) 
    }

    change_user_info(user,callback){
        //update username & password
        mongodb.connect(url,(err,db) =>{
            assert.equal(null, err);
            let collection = db.collection(dbName); 
            collection.update({username:user.username},{$set:{username:user.username,password:user.password}}).then((doc) => {
                callback({status:"ok",content:"User Modified",result:doc});
            },(err)=>{
                error({"status":"err","content":"Error Happened"});
            });
            db.close();
        }) 
    }

}

module.exports = {UserService:UserService}