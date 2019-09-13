const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin'); //导入在内存中自动生成 index 页面的插件


// 创建一个插件的实例对象
const htmlPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname,'./src/index.html'), //源文件
    filename:'index.html'  //生成内存中首页的名称
});


// 向外暴露一个打包的配置对象，因为webpack是基于node构建的，所以webpack支持所有Node Api 语法
module.exports = {
    mode: 'production', //development production
//    在webpack4.x，约定大于配置，约定默认的打包路径是src->最基本的React操作.js
    plugins:[
        htmlPlugin
    ],
    performance: {
        // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
        hints: "warning",
        // 开发环境设置较大防止警告
        // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
        maxEntrypointSize: 5000000, 
        // 最大单个资源体积，默认250000 (bytes)
        maxAssetSize: 3000000
    },
    module:{  //所有第三方模块的匹配规则
        rules: [
            {
                test: /\.js|jsx$/,
                use: 'babel-loader',
                exclude:/node_modules/  //排除项
            },
            {   // 在css-loader后添加参数 modules 之后，可以启用模块化，将样式文件添加作用域
                test:/\.css$/,
                use: ['style-loader', 'css-loader'] //打包处理第三方样式表的loader
            },
            {   //打包处理字体文件的loader
                test:/\.ttf|woff|woff2|eot|svg$/,
                use: 'url-loader'
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]','less-loader']
            },
            { test: /\.(png|gif|bmp|jpg)$/, use: 'url-loader?limit=5000' },
        ]
    },
    resolve:{
        extensions:['.js','.jsx','.json'],  //表示这几个文件后缀名可以省略不写
        alias:{
            '@':path.join(__dirname,'./src')//这样在项目中@表示项目根路径
        }
    }
};