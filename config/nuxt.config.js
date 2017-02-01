const webpack = require('webpack');
const path = require('path');

module.exports = {
    build: {
        vendor:['bootstrap','jquery'],
        plugins:[
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery',
                jquery: 'jquery'
            })
        ]
    },
    head:{
        title: 'Shen Blog',
        meta: [
            {charset:'utf-8'},
            { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1,minimum-scale=1' },
            { hid: 'description', content: "前端技术博客，Shen's Blog " },
        ],
        metaInfo: {
            base: { target: '_blank', href: '/' }
        },
        link:[
            { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' },
            { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
            { rel: 'stylesheet', href: '/style/main.css' },
            { rel: 'icon', type:'image/png', href:'/images/favicon.png'}
        ]
    },
    store: true,
    cache: true,
    dev: (process.env.NODE_ENV !== 'production')
}

        
    // new webpack.DefinePlugin({
    // 'process.env': {
    //     NODE_ENV: '"production"'
    // }
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    // compress: {
    //     warnings: false
    // }
    // })