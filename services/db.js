const mongodb = require("mongodb");
const config = require('../config/db.config');

const url = config.dataDB;


module.exports = ( collection )  =>{
    return new Promise( (resolve , reject) =>{
        mongodb.connect( url, (err, db) =>{

            if ( err ){
                reject( `Mongodb数据库链接出错: ${err}` );
            }
            resolve( db.collection( collection ) );
        });
    });
}