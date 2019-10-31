const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
//Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要添加插件 VueLoaderPlugin的
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 当以命令行形式运行 webpack 或 webpack-dev-server 的时候，工具会发现，我们并没有提供 要打包 的文件的 入口 和 出口文件，此时，他会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个 配置对象，然后根据这个对象，进行打包构建
module.exports = { // 这个配置文件，起始就是一个 JS 文件，通过 Node 中的模块操作，向外暴露了一个 配置对象
    entry: path.resolve(__dirname, 'src/main.js'), // 入口，表示，要使用 webpack 打包哪个文件
    output: { // 输出文件相关的配置
        path: path.resolve(__dirname, 'dist'),  // 指定 打包好的文件，输出到哪个目录中去
        filename: 'bundle.js' // 这是指定 输出的文件的名称
    },
    plugins:[ // // 配置插件的节点
        new htmlWebpackPlugin({// // 创建一个 在内存中 生成 HTML  页面的插件
            template:path.resolve(__dirname, 'src/index.html'), // 指定 模板页面，将来会根据指定的页面路径，去生成内存中的 页面
            filename:'index.html'//// 指定生成的页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module: { // 用来配置第三方loader模块的
        rules: [ //  // 所有第三方模块的 匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },//处理css文件的规则
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },// 处理 less 文件的 loader
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },// 处理 scss 文件的 loader
            { test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' },// 处理 图片路径的 loader
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader 
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法,exclude配置不要转换的目录
            { test: /\.vue$/, use: 'vue-loader' }//处理 .vue 文件的 loader
        ]
    },
    resolve: {
        alias: { // 修改 Vue 被导入时候的包的路径
          // "vue$": "vue/dist/vue.js"
        }
    }
}


// 当我们在 控制台，直接输入 webpack 命令执行的时候，webpack 做了以下几步：
//  1. 首先，webpack 发现，我们并没有通过命令的形式，给它指定入口和出口
//  2. webpack 就会去 项目的 根目录中，查找一个叫做 `webpack.config.js` 的配置文件
//  3. 当找到配置文件后，webpack 会去解析执行这个 配置文件，当解析执行完配置文件后，就得到了 配置文件中，导出的配置对象
//  4. 当 webpack 拿到 配置对象后，就拿到了 配置对象中，指定的 入口  和 出口，然后进行打包构建；