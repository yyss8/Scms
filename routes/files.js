
const routers = require('express').Router();
const COS = require('cos-nodejs-sdk-v5');
const ImageService = require('../services/Image.Service');
const multipart = require('connect-multiparty');
const mp = multipart();
const fs = require('fs');

routers.put('/',(req,res ) => {

});

routers.post('/', async (req, res) => {

    const config = require('../config/oss');   

    if ( typeof config === 'undefined' ){
        res.status(400).send({ status:'err', content:'找不到腾讯OSS密钥文件' });
        return;
    }

    const txCos = new COS({
        SecretId:config.SecretId,
        SecretKey:config.SecretKey
    });

    const onTest = req.params.onTest;

    try {

        const osRes = await txCos.putObject({
            Bucket:onTest ? config.debug:config.prod,
            Region:config.region,
            Body:'',
        })


        

    }catch( e ){
        res.status(400).send({ status:'err', content:'OSS上传出错', error:e });
    }

});


routers.post('/images', mp , (req, res) => {

    const config = require('../config/oss');   
    if ( typeof config === 'undefined' ){
        res.status(400).send({ status:'err', content:'找不到腾讯OSS密钥文件' });
        return;
    }


    const txCos = new COS({
        SecretId:config.SecretId,
        SecretKey:config.SecretKey

    });

    const onTest = req.body.onTest === '1';

    if ( typeof req.files.images === 'undefined' || req.files.images.length <= 0 ){
        res.status(400).send({
            status:'err',
            content:'无任何图片'
        });
    }

    Promise.all( req.files.images.map( file =>{

        return new Promise( (resolve, reject) =>{

            try {
                const randomName = ImageService.getRandomKey(file.path, req.body.prefix || '');

                txCos.putObject({
                    Bucket:onTest ? config.debug:config.prod,
                    Region:config.region,
                    Body:fs.createReadStream( file.path ),
                    ContentLength:file.size,
                    Key:randomName
                }, (err, data) =>{
                    if ( err ){
                        reject(err);
                        return;
                    }
    
                    resolve(data);
                });
            }catch( e ){
                reject(e);
            }

        });
    }) ).then( async uploadedResponse =>{

        const images = uploadedResponse.filter( response => response.statusCode === 200 ).map( response => {
            const _key = /\.com\/(.*)$/.exec( response.Location );
            return {
                key:_key[1],
                type:'txcos',
                url:`${onTest ? config.ossSrcTemp:config.ossSrc}/${_key[1]}`,
                env:onTest ? 'dev':'prod'
            };
        });
        
        res.status(200).send({status:'ok', result:{ images }, content:'图片上传成功'});
    }, error =>{
        res.status(400).send({status:'err', content:'图片上传出错'});
    });
    
});


module.exports = routers;