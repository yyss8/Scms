const mongodb = require("mongodb");
const assert = require("assert")
const config = require('../config/db.config');
const objectID = require('mongodb').ObjectID;

const url = config.dataDB; //database url
const dbName = config.postCollection;

class PostService{

    get_post_firstPage(fail,success){
        let data = {num:0,articles:[]}
        let skipNum;
        mongodb.connect(url,(err,db) =>{
            assert.equal(null, err);
            let collection = db.collection(dbName); 
            collection.find().count((err,doc) => {
                data.num = doc;
                skipNum = data.num - 1 * 5;
                collection.find({},{skip:skipNum}).toArray((err,doc) => {
                    data.articles = doc;
                    success({status:"ok",content:"Post Loaded",result:data});
                    db.close();
                },err =>{
                    fail({status:"err",content:err});
                    db.close();
                });
            },err=>{
                fail({status:"err",content:err});
                db.close();
            });
        }); 
    }

    get_post_morePage(articleNum,pgNum,success,fail){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null, err);
            let collection = db.collection(dbName); 
            collection.find().count((err,doc) => {
                const skipNum = (articleNum - pgNum * 5) < 0 ? 0:articleNum - pgNum * 5; //需要跳过的文章数 (如果最后一页则为0)
                const limitNum = (articleNum - pgNum * 5) < 0 ? (articleNum - (pgNum-1) * 5):5; //页数所需要的文章数 (如果最后一页则为发最后所有)
                collection.find({},{skip:skipNum,limit:limitNum}).toArray((err,doc) => {
                    success({status:"ok",content:"Post Loaded",result:doc});
                    db.close();
                },err =>{
                    fail({status:"err",content:err});
                    db.close();
                });
            },err=>{
                fail({status:"err",content:err});
                db.close();
            });
        }); 
    }

    create_new_post(data,success,fail){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null,err);
            let collection = db.collection(dbName); 
            collection.insertOne(data).then((doc,err) =>{
                if (err){
                    fail({status:"err",content:"出现错误"});
                }else{
                    success({status:"ok",content:"文章发表成功"});
                }
            });
        });
    }

    del_post(id,success,fail){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null,err);
            let collection = db.collection(dbName); 
            collection.deleteOne({_id:objectID(id)}).then((doc,err) => {
                console.log(doc);
                if (err){
                    fail({status:"err",content:"出现错误"});
                }else{
                    success({status:"ok",content:"文章删除成功"});
                }
            });
        }); 
    }
}

module.exports = {PostService:PostService};