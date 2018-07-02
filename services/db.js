const mongodb = require("mongodb");
const config = require('../config/db.config');

const url = config.dataDB;


module.exports = ( collection )  =>{
    return new Promise( (resolve , reject) =>{
        mongodb.connect( url, (err, db) =>{

            if ( err ){
                reject( err);
            }
            resolve( db.collection( collection ) );
        });
    });
}