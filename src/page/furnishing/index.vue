<template>
    <div>
        <div class="sy-furnishings" :style="{'min-height':cliHeight+'px'}">
            <h3>家居顾问</h3>
            <ul v-if="listData.length>0&&!jzloading" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                infinite-scroll-distance="385.6">
                <li v-for="(item,index) in listData" :key="index" @click="handleUrl(item.msg_code)">
                    <img v-if="item.img_url&&item.img_url" v-lazy="BaseUrl+item.img_url" alt="">
                    <img v-else src="../../assets/noimg.jpg" alt="">
                    <p class="sy-content">
                        <span class="sy-ziti" v-html="Trim(item.title)"></span>
                    </p>
                </li>
            </ul>
            <jz-loading v-else-if="jzloading"></jz-loading>
            <div v-else class="text-center text-muted font-70 sy-nodata">
                <i class="icon icon-lian-hengxian sy-cry"></i>
                <div>没有查询到家居顾问信息</div>
            </div>
            <load-bottom v-if="showBottom && listData.length>0"></load-bottom>
            <div class="sy-explain">
                “我们为确保产品的使用性，<br>在法国总部专门成立了研究部门<br>时常反复检查产品的易用性，舒适性，实用性，<br>只为对您的生活方式提供更好的未来。”
            </div>
        </div>
        <sy-footer></sy-footer>
    </div>
</template>
<script>
import action from "@/assets/utils/action.js";
import syFooter from "@/page/public/footer";
import LoadBottom from "@/page/public/loadbottom";
import JzLoading from "@/components/loading";
let typedata = true;
export default {
    name: "furnishings_index",
    data() {
        return {
            page: 0,
            pageSize: 6,
            listData: [],
            loading: false,
            showBottom: false,
            jzloading: false,
            total: 0
        };
    },
    components: { syFooter, LoadBottom, JzLoading },
    mounted() {
        this.jzloading = true;
        this.getData();
    },
    methods: {
        //详情
        handleUrl(id) {
            this.$router.push({
                name: "furnishing_detail",
                params: {
                    id: id
                }
            });
        },
        //更多
        loadMore() {
            this.loading = true;
            if (!typedata) {
                setTimeout(() => {
                    if (this.listData.length >= this.total) {
                        this.showBottom = true;
                        return;
                    }
                    this.page++;
                    this.getData();
                }, 2500);
            }
        },
        //获取数据
        getData() {
            action
                .brandMsgList(this.page, this.pageSize)
                .then(res => {
                    typedata = false;
                    if (this.page == 0) {
                        this.listData = res.messageList.data;
                    } else {
                        this.listData = this.listData.concat(
                            res.messageList.data
                        );
                    }
                    this.jzloading = false;
                    this.total = res.messageList.dataTotal;
                    if (this.listData.length >= this.total) {
                        this.showBottom = true;
                    }
                })
                .catch(() => {
                    this.jzloading = false;
                });
        },
        hanldeUrl(id) {
            this.$router.push({
                name: "furnishing_detail",
                params: {
                    id: id
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.sy-furnishings {
    background-color: #fff;
    h3 {
        color: black;
        font-size: 1.3rem;
        padding: 2.8rem 0 1.4rem 0;
    }
    ul {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        // margin: 0 -5px;
        margin: 0;
        padding: 0 0 2rem 0;
        li {
            list-style: none;
            flex: 0 0 100%;
            box-sizing: border-box;
            position: relative;
            padding: 0.15rem;
            img {
                width: 100%;
                vertical-align: middle;
            }
            p {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: 0;
                &::before {
                    content: "";
                    display: inline-block;
                    width: 0;
                    height: 100%;
                    vertical-align: middle;
                }
                .sy-ziti {
                    width: 90%;
                    color: white;
                    font-weight: 500;
                    font-size: 1rem;
                    display: inline-block;
                    vertical-align: middle;
                    text-shadow: 0 0 30px #3d3d3d;
                }
            }
        }
    }
    .sy-explain {
        color: #388e8e;
        line-height: 23px;
        width: 90%;
        font-size: 0.7rem;
        margin: auto;
        padding-bottom: 2rem;
        letter-spacing: 0.05rem;
    }
    .sy-nodata {
        padding: 4rem 0 5rem 0;
        .sy-cry {
            font-size: 4.2rem;
        }
    }
}
</style>

