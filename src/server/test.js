const http = require('http');
// 导入解析 URL 地址的核心模块
const urlModule = require('url');

const server = http.createServer();
const path = require('path');
const fs = require('fs');

const comment = require("./comment.json");
const imgCategory = require("./imgcat.json");
const imgs = require("./imgs.json");
const thumImages = require("./thumimages.json");
const goods = require("./goods.json");

const moment = require("moment");
const querystring = require('querystring');

// 监听 服务器的 request 请求事件，处理每个请求
server.on('request', (req, res) => {
    const url = req.url;

    // 解析客户端请求的URL地址
    var info = urlModule.parse(url, true);

    // 如果请求的 URL 地址是 /getjsonp ，则表示要获取JSONP类型的数据
    if (info.pathname === '/getjsonp') {
        // 获取客户端指定的回调函数的名称
        var cbName = info.query.callback;
        // 手动拼接要返回给客户端的数据对象
        var data = {
            status: 0,
            message: [
                { id: "1", url: "#1", img: "https://img10.360buyimg.com/ebookadmin/jfs/t1/79930/19/13098/185340/5da49a9fE5bae5d6b/43db2c79f7b08193.jpg.dpg" },
                { id: "2", url: "#2", img: "https://img10.360buyimg.com/ebookadmin/jfs/t1/61715/35/13441/328973/5dad507eE1b47d767/fde1f73734e43178.jpg.dpg" },
                { id: "3", url: "#3", img: "https://img10.360buyimg.com/ebookadmin/jfs/t1/52352/38/14792/95747/5db7a9d3Eec6ede4c/3fc62d4ba81cd98b.jpg.dpg" }
            ]
        }
        // 拼接出一个方法的调用，在调用这个方法的时候，把要发送给客户端的数据，序列化为字符串，作为参数传递给这个调用的方法：
        var result = `${cbName}(${JSON.stringify(data)})`;
        // 将拼接好的方法的调用，返回给客户端去解析执行
        res.end(result);
    } else if (info.pathname === '/api/getnewslist') {
        var cbName = info.query.callback;
        // 手动拼接要返回给客户端的数据对象
        var data = {

            status: 0,
            message: [
                {
                    id: 1,
                    title: "杜特尔特缺席这一重要活动引发猜测 菲官方忙澄清",
                    add_time: "2015-04-16T03:50:28.000Z",
                    zhaiyao: "杜特尔特缺席这一重要活动引发猜测 菲官方忙澄清",
                    click: 6,
                    img_url: "https://n.sinaimg.cn/translate/783/w950h633/20191104/92ad-ihuuxuu7149355.jpg"
                },
                {
                    id: 2,
                    title: "麦当劳宣布解雇CEO 因其与公司员工保持不当关系",
                    add_time: "2015-03-16T03:50:28.000Z",
                    zhaiyao: "麦当劳宣布解雇CEO 因其与公司员工保持不当关系",
                    click: 5,
                    img_url: "https://n.sinaimg.cn/translate/199/w578h421/20191104/dc10-ihuuxuu5545519.jpg"
                },
                {
                    id: 3,
                    title: "美媒：历史逆转难接受 英国百年来没找到合适角色",
                    add_time: "2017-03-16T03:50:28.000Z",
                    zhaiyao: "美媒：历史逆转难接受 英国百年来没找到合适角色",
                    click: 4,
                    img_url: "https://n.sinaimg.cn/translate/199/w1080h719/20190926/a933-ifaench6851662.jpg"
                },
                {
                    id: 4,
                    title: "杜特尔特缺席这一重要活动引发猜测 菲官方忙澄清",
                    add_time: "2015-04-16T03:50:28.000Z",
                    zhaiyao: "杜特尔特缺席这一重要活动引发猜测 菲官方忙澄清",
                    click: 6,
                    img_url: "https://n.sinaimg.cn/translate/783/w950h633/20191104/92ad-ihuuxuu7149355.jpg"
                },
                {
                    id: 5,
                    title: "麦当劳宣布解雇CEO 因其与公司员工保持不当关系",
                    add_time: "2015-03-16T03:50:28.000Z",
                    zhaiyao: "麦当劳宣布解雇CEO 因其与公司员工保持不当关系",
                    click: 5,
                    img_url: "https://n.sinaimg.cn/translate/199/w578h421/20191104/dc10-ihuuxuu5545519.jpg"
                },
                {
                    id: 6,
                    title: "美媒：历史逆转难接受 英国百年来没找到合适角色",
                    add_time: "2017-03-16T03:50:28.000Z",
                    zhaiyao: "美媒：历史逆转难接受 英国百年来没找到合适角色",
                    click: 4,
                    img_url: "https://n.sinaimg.cn/translate/199/w1080h719/20190926/a933-ifaench6851662.jpg"
                },
                {
                    id: 7,
                    title: "杜特尔特缺席这一重要活动引发猜测 菲官方忙澄清",
                    add_time: "2015-04-16T03:50:28.000Z",
                    zhaiyao: "杜特尔特缺席这一重要活动引发猜测 菲官方忙澄清",
                    click: 6,
                    img_url: "https://n.sinaimg.cn/translate/783/w950h633/20191104/92ad-ihuuxuu7149355.jpg"
                },
                {
                    id: 8,
                    title: "麦当劳宣布解雇CEO 因其与公司员工保持不当关系",
                    add_time: "2015-03-16T03:50:28.000Z",
                    zhaiyao: "麦当劳宣布解雇CEO 因其与公司员工保持不当关系",
                    click: 5,
                    img_url: "https://n.sinaimg.cn/translate/199/w578h421/20191104/dc10-ihuuxuu5545519.jpg"
                },
                {
                    id: 9,
                    title: "美媒：历史逆转难接受 英国百年来没找到合适角色",
                    add_time: "2017-03-16T03:50:28.000Z",
                    zhaiyao: "美媒：历史逆转难接受 英国百年来没找到合适角色",
                    click: 4,
                    img_url: "https://n.sinaimg.cn/translate/199/w1080h719/20190926/a933-ifaench6851662.jpg"
                },
                {
                    id: 10,
                    title: "杜特尔特缺席这一重要活动引发猜测 菲官方忙澄清",
                    add_time: "2015-04-16T03:50:28.000Z",
                    zhaiyao: "杜特尔特缺席这一重要活动引发猜测 菲官方忙澄清",
                    click: 6,
                    img_url: "https://n.sinaimg.cn/translate/783/w950h633/20191104/92ad-ihuuxuu7149355.jpg"
                },
                {
                    id: 11,
                    title: "麦当劳宣布解雇CEO 因其与公司员工保持不当关系",
                    add_time: "2015-03-16T03:50:28.000Z",
                    zhaiyao: "麦当劳宣布解雇CEO 因其与公司员工保持不当关系",
                    click: 5,
                    img_url: "https://n.sinaimg.cn/translate/199/w578h421/20191104/dc10-ihuuxuu5545519.jpg"
                },
                {
                    id: 12,
                    title: "美媒：历史逆转难接受 英国百年来没找到合适角色",
                    add_time: "2017-03-16T03:50:28.000Z",
                    zhaiyao: "美媒：历史逆转难接受 英国百年来没找到合适角色",
                    click: 4,
                    img_url: "https://n.sinaimg.cn/translate/199/w1080h719/20190926/a933-ifaench6851662.jpg"
                }
            ]
        }

        // 拼接出一个方法的调用，在调用这个方法的时候，把要发送给客户端的数据，序列化为字符串，作为参数传递给这个调用的方法：
        var result = `${cbName}(${JSON.stringify(data)})`;
        // 将拼接好的方法的调用，返回给客户端去解析执行
        res.end(result);
    } else if (info.pathname.includes("/api/getnew")) {
        var id = info.query.id;
        var cbName = info.query.callback;
        var data1 = {
            status: 0,
            message: [
                {
                    id: 1,
                    title: "杜特尔特缺席这一重要活动引发猜测 菲官方忙澄清",
                    add_time: "2015-04-16T03:50:28.000Z",
                    content: "环球网报道记者王博雅琪]据俄新社4日报道，一架载有玻利维亚总统埃沃•莫拉莱斯的直升机因飞机尾翼出现故障当天紧急迫降，所幸无人员伤亡。<img id='0' src='https:///n.sinaimg.cn/translate/94/w578h316/20191105/cf8c-ihuuxuu9838686.png'>当天中午，莫拉莱斯乘坐一架直升机计划从科尔基里飞往奥鲁罗，但起飞时飞机尾翼发生故障，导致紧急着陆。声明补充说，没有人员伤亡。目前，玻利维亚空军正就此展开调查。玻利维亚最高选举法院10月24日宣布，总统选举计票已完成99.99%，执政党候选人、现任总统莫拉莱斯在首轮投票中获得47.07%的选票，处于领先。自10月20日举行总统和议会选举以来，玻利维亚发生持续一周示威，玻利维亚现总统莫拉莱斯与前总统卡洛斯•梅萨两个阵营的支持者一度爆发冲突。由大选结果引发的抗议蔓延到玻利维亚多个地区，莫拉莱斯10月23日谴责反对派正在进行“政变”，宣布国家进入紧急状态以捍卫民主。	",
                    click: 6,
                }
            ]
        }
        var data2 = {
            status: 0,
            message: [
                {
                    id: 2,
                    title: "麦当劳宣布解雇CEO 因其与公司员工保持不当关系",
                    add_time: "2015-04-16T03:50:28.000Z",
                    content: "环球网报道记者王博雅琪]据俄新社4日报道，一架载有玻利维亚总统埃沃•莫拉莱斯的直升机因飞机尾翼出现故障当天紧急迫降，所幸无人员伤亡。<img id='0' src='https:///n.sinaimg.cn/translate/94/w578h316/20191105/cf8c-ihuuxuu9838686.png'>当天中午，莫拉莱斯乘坐一架直升机计划从科尔基里飞往奥鲁罗，但起飞时飞机尾翼发生故障，导致紧急着陆。声明补充说，没有人员伤亡。目前，玻利维亚空军正就此展开调查。玻利维亚最高选举法院10月24日宣布，总统选举计票已完成99.99%，执政党候选人、现任总统莫拉莱斯在首轮投票中获得47.07%的选票，处于领先。自10月20日举行总统和议会选举以来，玻利维亚发生持续一周示威，玻利维亚现总统莫拉莱斯与前总统卡洛斯•梅萨两个阵营的支持者一度爆发冲突。由大选结果引发的抗议蔓延到玻利维亚多个地区，莫拉莱斯10月23日谴责反对派正在进行“政变”，宣布国家进入紧急状态以捍卫民主。	",
                    click: 6,
                }
            ]
        }
        var data3 = {
            status: 0,
            message: [
                {
                    id: 3,
                    title: "美媒：历史逆转难接受 英国百年来没找到合适角色",
                    add_time: "2015-04-16T03:50:28.000Z",
                    content: "环球网报道记者王博雅琪]据俄新社4日报道，一架载有玻利维亚总统埃沃•莫拉莱斯的直升机因飞机尾翼出现故障当天紧急迫降，所幸无人员伤亡。<img id='0' src='https:///n.sinaimg.cn/translate/94/w578h316/20191105/cf8c-ihuuxuu9838686.png'>当天中午，莫拉莱斯乘坐一架直升机计划从科尔基里飞往奥鲁罗，但起飞时飞机尾翼发生故障，导致紧急着陆。声明补充说，没有人员伤亡。目前，玻利维亚空军正就此展开调查。玻利维亚最高选举法院10月24日宣布，总统选举计票已完成99.99%，执政党候选人、现任总统莫拉莱斯在首轮投票中获得47.07%的选票，处于领先。自10月20日举行总统和议会选举以来，玻利维亚发生持续一周示威，玻利维亚现总统莫拉莱斯与前总统卡洛斯•梅萨两个阵营的支持者一度爆发冲突。由大选结果引发的抗议蔓延到玻利维亚多个地区，莫拉莱斯10月23日谴责反对派正在进行“政变”，宣布国家进入紧急状态以捍卫民主。	",
                    click: 6,
                }
            ]
        }
        var data;
        switch (id) {//这里id得到的是字符串，所以下面也要用字符串
            case "1":
                data = data1;
                break;
            case "2":
                data = data2;
                break;
            default:
                data = data3;
                break;
        }
        var result = `${cbName}(${JSON.stringify(data)})`;
        res.setHeader('Content-Type', 'application/json;charset=utf-8');//json乱码解决
        res.end(result);
    } else if (info.pathname.includes("/api/getcomments")) {
        var artid = info.query.artid; //jsonp 只能发get的，所以要用query接受
        var pageindex = info.query.pageindex;
        var cbName = info.query.callback;
        var myMessage = [];
        comment.forEach((e, i) => {
            if (e.artid == artid) {
                if (myMessage.length < 3 * pageindex) {
                    myMessage.push(e);
                } else {
                    return;
                }

            }
        });
        var data = {
            status: 0,
            message: myMessage
        }
        var result = `${cbName}(${JSON.stringify(data)})`;
        res.setHeader('Content-Type', 'application/json;charset=utf-8');//json乱码解决
        res.end(result);

    } else if (info.pathname.includes("/api/postcomment")) {
        var artid = info.query.artid;
        var cbName = info.query.callback;

        var item = {
            "artid": parseInt(artid),
            "user_name": "匿名用户",
            "add_time": moment().format(),
            "content": info.query.content
        }
        comment.unshift(item);//数据是倒序排列，所以新增项目在最前面
        writeDataToFile(err => {
            let returnINfo = {};
            if (!err) {
                returnINfo = {
                    status: 0,
                    message: "post ok"
                }            
            } else {
                returnINfo = {
                    status: 1,
                    message: "error"
                }
            }
            var result = `${cbName}(${JSON.stringify(returnINfo)})`;
            res.setHeader('Content-Type', 'application/json;charset=utf-8');//json乱码解决
            res.end(result);
        }, "comment.json", comment);
        
    } else if (info.pathname.includes("/api/getimgcategory")) {
        var cbName = info.query.callback;
        var data = {
            status: "0",
            message: imgCategory
        }

        var result = `${cbName}(${JSON.stringify(data)})`;
        res.setHeader('Content-Type', 'application/json;charset=utf-8');//json乱码解决
        res.end(result);

    } else if (info.pathname.includes("/api/getimages")) {
        var cbName = info.query.callback;
        var cateid = info.query.cateid;
        var data = "";
        if(cateid == "0") {
            data = {
                status: "0",
                message: imgs
            }
        }else {
            var temp = [];
            imgs.forEach((item, index) => {
                if(item.catid == cateid) {
                    temp.push(item);
                }
            });
            if(temp.length > 0) {
                data = {
                    status: "0",
                    message: temp
                }
            }else {
                data = {
                    status: "1",
                    message: ["分类不存在！"]
                }
            }
            
        }

        var result = `${cbName}(${JSON.stringify(data)})`;
        res.setHeader('Content-Type', 'application/json;charset=utf-8');//json乱码解决
        res.end(result);
    } else if (info.pathname.includes("/api/getthumimages")) {
        var cbName = info.query.callback;
        var imgId = info.query.imgid;

        var temp = thumImages.filter(item => {
            if(item.imgId == imgId) {
                return item;
            }
        });
        var data = "";
        if(temp) {
            data = {
                status: "0",
                message: temp[0].imgs
            }
        }else {
            data = {
                status: "1",
                message: ["缩略图不存在！"]
            }
        }
        
        var result = `${cbName}(${JSON.stringify(data)})`;
        res.setHeader('Content-Type', 'application/json;charset=utf-8');//json乱码解决
        res.end(result);
    }else if(info.pathname.includes("/api/getimageInfo")) {
        var cbName = info.query.callback;
        var imgId = info.query.imgid;
        var temp = imgs.filter(item => {
            if(item.id == imgId) {
                return item;
            }
        });
        var data = "";
        if(temp) {
            data = {
                status: "0",
                message: temp
            }
        }else {
            data = {
                status: "1",
                message: ["图片不存在！"]
            }
        }
        
        var result = `${cbName}(${JSON.stringify(data)})`;
        res.setHeader('Content-Type', 'application/json;charset=utf-8');//json乱码解决
        res.end(result);
    }else if(info.pathname.includes("/api/getgoods")) {
        var pageindex = info.query.pageindex;
        var cbName = info.query.callback;
        var data = {
            status: 0,
            message: []
        }
        var count = 5;
        var begin = (pageindex - 1) * count;
        var end = pageindex * count -1;
        goods.forEach((em, index) => {
            if(begin <= index && index <= end) {
                data.message.push(em);
            }
        });
        if(data.message.length <= 0) {
            data.status = 1;
        }
        var result = `${cbName}(${JSON.stringify(data)})`;
        res.setHeader('Content-Type', 'application/json;charset=utf-8');//json乱码解决
        res.end(result);
    }else if(info.pathname.includes("/api/goods/getinfo") || info.pathname.includes("/api/goods/getdesc")) {
        var id = info.query.id;
        var cbName = info.query.callback;
        var data = {
            status: 0,
            message: []
        }
        goods.forEach((em, index) => {
            if(em.id == id) {
                data.message.push(em);
            }
        })
        if( data.message.length <= 0) {
            data.status = 1;
        }
        var result = `${cbName}(${JSON.stringify(data)})`;
        res.setHeader('Content-Type', 'application/json;charset=utf-8');//json乱码解决
        res.end(result);
    }else if(info.pathname.includes("api/goods/getshopcarlist")) {
        var ids = info.query.ids.split(",");
        var cbName = info.query.callback;
        var data = {
            status: 0,
            message: []
        }
        goods.forEach((em, index) => {
            ids.forEach(emt => {
                if(em.id == emt.toString()) {
                    data.message.push({
                        id: em.id,
                        title: em.title,
                        sell_price: em.sell_price,
                        thumb_path: em.thumb_path,
                        cou: 1
                    });
                }
            });
            
        })
        if( data.message.length <= 0) {
            data.status = 1;
        }
        var result = `${cbName}(${JSON.stringify(data)})`;
        res.setHeader('Content-Type', 'application/json;charset=utf-8');//json乱码解决
        res.end(result);
    }else {
        var cbName1 = info.query.callback;
        var data9 = { status: 1 };
        var result1 = `${cbName1}(${JSON.stringify(data9)})`;
        res.end(result1);
    }
});

function writeDataToFile(cb, jsonName, newFile) {
    fs.writeFile(path.join(__dirname, jsonName), JSON.stringify(newFile, null, 4), (err) => {//JSON.stringify第三个参数是几个空格
        cb(err);
        
    });
}


server.listen(3003, "192.168.2.247", () => {
    console.log('server running at http://127.0.0.1:3003');
});