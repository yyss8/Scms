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

    update_general_setting(data,success,fail){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null,err);
            let collection = db.collection(dbName); 
            collection.updateOne({_id:1},{$set:{title:data.title,scnTitle:data.scnTitle,descri:data.description,keywords:data.keywords,author:data.author}}).then((doc,err) =>{
                if (err){
                    fail({status:"err",content:"出现错误",result:err});
                }else{
                    success({status:"ok",content:"设置更新成功"});
                }
            });
        });
    }

    update_header_links(data,success,fail){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null,err);
            let collection = db.collection(dbName); 
            collection.updateOne({_id:1},{$set:{headerLink:data}}).then((doc,err) =>{
                if (err){
                    fail({status:"err",content:"出现错误",result:err});
                }else{
                    success({status:"ok",content:"导航更新成功"});
                }
            });
        });
    }

    update_categories(data,success,fail){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null,err);
            let collection = db.collection(dbName); 
            collection.updateOne({_id:1},{$set:{categories:data}}).then((doc,err) =>{
                if (err){
                    fail({status:"err",content:"出现错误",result:err});
                }else{
                    success({status:"ok",content:"文章分类更新成功"});
                }
            });
        });
    }

    update_sidebar(data,success,fail){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null,err);
            let collection = db.collection(dbName); 
            collection.updateOne({_id:1},{$set:{sideBarComps:data}}).then((doc,err) =>{
                if (err){
                    fail({status:"err",content:"出现错误",result:err});
                }else{
                    success({status:"ok",content:"文章分类更新成功"});
                }
            });
        });
    }

    update_user_general(data,success,fail){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null,err);
            let collection = db.collection(dbName); 
            collection.updateOne({_id:1},{$set:{usersControl:data}}).then((doc,err) =>{
                if (err){
                    fail({status:"err",content:"出现错误",result:err});
                }else{
                    success({status:"ok",content:"用户基础更新成功"});
                }
            });
        });     
    }

}


module.exports = {SettingService:SettingService};