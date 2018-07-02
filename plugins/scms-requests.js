
const ajax = ( data, url, type, params) => {
    return $.ajax({
        ...params,
        data,
        url,
        type,
        dataType:'JSON'
    });
}

const ajaxFile = ( data, url, type, params ) =>{
    let formData = new FormData();
    Object.keys( data ).forEach( key =>{
        if ( Array.isArray( data[key] )){
            data[key].forEach( keyContent =>{

                if ( !( keyContent instanceof Blob )){

                    formData.append(`${key}[]`, encodeURIComponent( JSON.stringify ( keyContent ) )) ;
                }else{
                    formData.append(`${key}[]`,  keyContent ) ;
                }
            });
        }else{
            formData.append( key, data[key] );
        }
    });
    return $.ajax({
        ...params,
        url,
        data:formData,
        type,         
        processData: false,
        contentType: false
    });
}

export default {
    getJson:(data, url, params = {} ) =>{
        return ajax( data,url, 'get', params);
    },
    postJson: ( data, url = '', params = {}) => {
        return ajax( data,url, 'post', params);
    },
    putJson:(data, url = '', params = {}) =>{
        return ajax( data,url, 'put', params);
    },
    deleteJson:( data, url = '', params = {}) => {
        return ajax( data,url, 'delete' , params);
    },
    postFile:(data = {}, url, params = {}) => {
        return ajaxFile( data, url, 'post', params);
    },
    putFile:( data = {}, url , params = {}) =>{
        return ajaxFile( data, url, 'put', params);
    }
};

