const crypto = require('crypto');
const connection = require('./db');

const _collection = 'images';



class ImageService {

    static getRandomKey(orgUrl = '' , prefix = ''){

        const date = new Date();
    
        const randomText = date.getMonth() + date.getDay() + date.getHours() + date.getMinutes();
        const _randomText = orgUrl === '' ? randomText + ( Math.random() * 200 )   : randomText + ( Math.random() * 99 ) + orgUrl;
        const randomKey = (  crypto.createHash('md5').update(_randomText).digest('hex').substring(0, 17) + randomText ).replace(/\-/,'_');
        return prefix + '_' + randomKey;
        
    }

    static addCosImages( images ){

        return new Promise( async (resolve, reject)  =>{

            if ( !images || images.length <= 0 ){
                reject({
                    status:'err',
                    content:'上传图片为空'
                });
                return;
            }

            
            try {

                const db = await connection( _collection );
                const inserted = await db.insertMany( images );

                resolve( inserted );

            }catch( e ){
                reject(e);   
            }

        });

        mongodb.connect(url, ( err, db) =>{


            assert.equal(null,err);
            const collection = db.collection(dbName); 
            collection.insertOne(data).then((doc,err) =>{
                if (err){
                    fail({status:"err",content:"出现错误"});
                }else{
                    success({status:"ok",content:"文章发表成功"});
                }
            });
        });
    }

    async addCosImage(){

    }
}

module.exports = ImageService;