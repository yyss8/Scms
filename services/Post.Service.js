const mongodb = require("mongodb");
const assert = require("assert")
const config = require('../config/db.config');


const url = config.dataDB; //database url
const dbName = config.postCollection;

class PostService{

    get_post_firstPage(fail,success){
        let hasError = false;
        let data = {num:0,articles:[]}
        mongodb.connect(url,(err,db) =>{
            assert.equal(null, err);
            let collection = db.collection(dbName); 
            collection.find().count((err,doc) => {
                data.num = doc;
                if (data.articles.length != 0 ){
                    success({status:"ok",content:"Post Loaded",result:data});
                    db.close();
                }
            },err=>{
                if (!hasError){
                    hasError = true;
                    fail({status:"err",content:err});
                    db.close();
                }
            });
            collection.find({},{limit:5}).toArray((err,doc) => {
                data.articles = doc;
                if (data.num != 0){
                    success({status:"ok",content:"Post Loaded",result:data});
                    db.close();
                }
            },err =>{
                if (!hasError){
                    hasError = true;
                    fail({status:"err",content:err});
                    db.close();
                }
            });
        }); 
    }

    new_post(data,callback){
        
    }
}

module.exports = {PostService:PostService};