const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';
const packageJson = require('../package.json');


module.exports = {
    build: {
        vendor:['bootstrap','jquery'],
        plugins:[
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                $sg:"~plugins/scms-global.js"
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: `"${process.env.NODE_ENV}"`
                },
                APP_VR:packageJson.version
            })
        ]
    },
    head:{
        link:[
            { rel: 'stylesheet', href: 'https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css' },
            { rel: 'stylesheet', href: 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css' },
            { rel: 'stylesheet', href: '/style/main.css' },
            { rel: 'icon', type:'image/png', href:'/images/favicon.png'}
        ],
        bodyScript: [
            { src: 'https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js' }
        ]
    },
    plugins: ['~plugins/scms-global'],
    cache: true,
    dev: (process.env.NODE_ENV !== 'production')
}