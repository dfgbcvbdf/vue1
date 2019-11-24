<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr />
        <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="myCmt"></textarea>
        
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in commentList" :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}</div>
                <div class="cmt-content" v-text="item.content"></div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import moment from "moment";
export default {
    data() {
        return {
            id: this.newsId,
            commentList: [],
            pageIndex: 1,
            myCmt: "",
            postDate: ""
        };
    },
    props: ["newsId"], //这里变量名是字符串
    methods: {
        getComment() {
            this.$http.jsonp("api/getcomments/?artid="+ this.id+ "&pageindex="+ this.pageIndex).then(result => {
                if(result.body.status === 0){
                    this.commentList = result.body.message;
                     Toast("加载评论ok");
                } else{
                    Toast("加载评论失败");
                }
            });
        },
        getMore() {
            this.pageIndex++;
            this.getComment();
        },
        postComment() {
            if(this.myCmt.trim().length == 0 ) {
                 Toast("评论内容不能为空！");
            } else {
                this.postDate = moment().format();
                //jsonp 只能发get的
                this.$http.jsonp("api/postcomment?artid="+ this.id+ "&content="+ this.myCmt.trim()).then(res => {
                    var info = res.body;
                    console.dir(info);
                    console.dir(this.commentList);
                    if(info.status == "0") {
                        this.commentList.unshift({
                            "user_name": "匿名用户",
                            "add_time": this.postDate,
                            "content": this.myCmt.trim()
                        });
                        
                        Toast(info.message);
                    }else {
                        Toast(info.message);
                    }
                    this.myCmt = "";
                });
            }
        }
    },
    created() {
        this.getComment();
    },
};
</script>

<style lang="less" scoped>
    .cmt-container {
        >h3 {
            font-size: 18px;
            color: black;
        }
        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list {
            margin: 5px 0;
            .cmt-item {
                font-size: 13px;
                .cmt-title {
                    background-color: #ccc;
                    line-height: 30px;
                }
                .cmt-content {
                    text-indent: 2em;
                    line-height: 35px;
                }
            }
        }
        
        
    }
</style>