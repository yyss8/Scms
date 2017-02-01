const mongodb = require("mongodb");
const assert = require("assert")
const config = require('../config/db.config');
const objectID = require('mongodb').ObjectID;

const url = config.dataDB; //database url
const dbName = config.postCollection;

class PostService{

    get_post_firstPage(pgNum,fail,success){
        let data = {num:0,articles:[]}
        mongodb.connect(url,(err,db) =>{
            assert.equal(null, err);
            let collection = db.collection(dbName); 
            collection.find().count((err,doc) => {
                data.num = doc;
                const skipNum = (data.num - pgNum * 5) < 0 ? 0:data.num - pgNum * 5; //需要跳过的文章数 (如果最后一页则为0)
                const limitNum = (data.num - pgNum * 5) < 0 ? (data.num - (pgNum-1) * 5):5; //页数所需要的文章数 (如果最后一页则为发最后所有)
                collection.find({},{skip:skipNum,limit:limitNum}).toArray((err,doc) => {
                    data.articles = doc;
                    success(data);
                    db.close();
                },err =>{
                    fail(err);
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

    get_post_one(id,successs,fail){
        let _id;
        try {
            _id = objectID(id)
            mongodb.connect(url,(err,db) =>{
                assert.equal(null, err);
                let collection = db.collection(dbName); 
                collection.findOne({_id}).then((doc,err) =>{
                    if (err){
                        fail({status:"err",content:"出现错误"});
                    }else{
                        successs({status:"ok",content:"文章数据获得",result:doc});
                    }

                });
            });
        }catch(err){
            fail({status:"err",content:"错误id"})
        }

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

    update_post(data,success,fail){
        try {
            mongodb.connect(url,(err,db) =>{
                assert.equal(null,err);
                let collection = db.collection(dbName); 
                collection.updateOne({_id:objectID(data.id)},{$set:{title:data.title,content:data.content,category:data.category}}).then((doc,err) =>{
                    console.log(doc);
                    if (err){
                        fail({status:"err",content:"出现错误"});
                    }else{
                        success({status:"ok",content:"文章修改成功"});
                    }
                });
            });
        }catch(err){
            fail({status:"err",content:"错误id"})
        }

    }

    del_post(id,success,fail){
        try {
            mongodb.connect(url,(err,db) =>{
                assert.equal(null,err);
                let collection = db.collection(dbName); 
                collection.deleteOne({_id:objectID(id)}).then((doc,err) => {
                    if (err){
                        fail({status:"err",content:"出现错误"});
                    }else{
                        success({status:"ok",content:"文章删除成功"});
                    }
                });
            }); 
        }catch (err){
            fail({status:"err",content:"错误id"})
        }

    }
}

module.exports = {PostService:PostService};