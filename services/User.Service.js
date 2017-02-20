const mongodb = require("mongodb");
const assert = require("assert")
const config = require('../config/db.config');
const objectID = require('mongodb').ObjectID;

const url = config.dataDB; //database url
const dbName = config.userCollection 

class UserService{
    user_auth(username,password,success,error){
        //user authentication
        mongodb.connect(url,(err,db) =>{
            assert.equal(null, err);
            let collection = db.collection(dbName); 
            collection.findOne({username:username}).then((doc) => {
                if (doc === null){
                    success({status:"un",content:"用户名未找到"}); 
                }else if (doc.password != password){
                    success({status:"pw",content:"用户密码错误"});
                }else{
                    success({status:"ok",content:"登录成功",result:doc});
                }
            },(err)=>{
                error({status:"err",content:"出现错误"});
            });
            db.close();
        });
    }

    get_matched_users(kyWrds,success,fail){
        const re = new RegExp(kyWrds,"gi");
        mongodb.connect(url,(err,db) =>{
            assert.equal(null, err);
            let collection = db.collection(dbName); 
            collection.find({$or:[{username:re},{email:kyWrds}]},{_id:1,username:1}).toArray((error,doc) => {
                if (error) {
                    error({status:"err",content:"出现错误",result:error});
                }else{
                    success({status:"ok",content:"用户信息获得",result:doc});
                }
            },(err)=>{
                error({status:"err",content:"出现错误",result:err});
            });
            db.close();
        });
    }

    get_user_info_one(id,success,error){
        //get username & password
        try {
            mongodb.connect(url,(err,db) =>{
                assert.equal(null, err);
                let collection = db.collection(dbName); 
                collection.findOne({_id:objectID(id)}).then((doc,error) => {
                    if (error) {
                        error({status:"err",content:"出现错误",result:error});
                    }else{
                        success({status:"ok",content:"用户信息获得",result:doc});
                    }
                },(err)=>{
                    error({status:"err",content:"出现错误",result:err});
                });
                db.close();
            });
        } catch (err) {
            error({status:"err",content:"错误用户ID",result:err});
        }
    }

    update_user_info_admin(user,success,error){
        try {
            mongodb.connect(url,(err,db) =>{
                assert.equal(null, err);
                let collection = db.collection(dbName); 
                collection.update({_id:objectID(user.id)},{$set:{
                    username:user.username,
                    password:user.password,
                    usertype:user.usertype,
                    email:user.email
                }}).then((doc,error) => {
                    if (error) {
                        error({status:"err",content:"出现错误",result:error});
                    }else{
                        success({status:"ok",content:"用户信息更新成功"});
                    }
                },(err)=>{
                    error({status:"err",content:"出现错误",result:err});
                });
                db.close();
            });
        }catch (err){
            error({status:"err",content:"错误用户ID",result:err});
        }
    }

    update_user_info(user,success,error){
        try {
            mongodb.connect(url,(err,db) =>{
                assert.equal(null, err);
                let collection = db.collection(dbName); 
                collection.update({_id:objectID(user.id)},{$set:{
                    password:user.password,
                    email:user.email
                }}).then((doc,error) => {
                    if (error) {
                        error({status:"err",content:"出现错误",result:error});
                    }else{
                        success({status:"ok",content:"用户信息更新成功"});
                    }
                },(err)=>{
                    error({status:"err",content:"出现错误",result:err});
                });
                db.close();
            });
        }catch (err){
            error({status:"err",content:"错误用户ID",result:err});
        }
    }

    signup_user(user,success,fail){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null,err);
            const collection = db.collection(dbName); 
            collection.insertOne(user).then((doc,err) =>{
                if (err){
                    fail({status:"err",content:"出现错误"});
                }else{
                    success({status:"ok",content:"用户注册成功"});
                }
            });
        });
    }
}

module.exports = {UserService:UserService}