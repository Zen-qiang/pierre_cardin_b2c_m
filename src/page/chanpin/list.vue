<template>
    <div>
        <div class="sy-list" :style="{'min-height':cliHeight+'px'}">
            <div class="sy-title">
                <img :src="BaseUrl+infoData.big_img" alt="">
                <p>
                    <span class="sy-ziti">{{infoData.name}}</span>
                </p>
            </div>
            <div style="border-bottom:0.03rem solid #EBEBEB;padding-top:0;background-color:#fff;width:100%;overflow-y:scroll">
                <div>
                    <mt-navbar v-model="selected">
                        <mt-tab-item :id="item.series_code" v-for="(item,index) in typeData" :key="index">{{item.name}}</mt-tab-item>
                    </mt-navbar>
                </div>
            </div>
            <div v-if="typeData.length>0" style="background-color:#fff">
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item :id="items.series_code" v-for="(items,indexs) in typeData" :key="indexs"
                        class="margin-bottom-30">
                        <div class="padding-top-20">
                            <span v-for="(item,index) in fenleiData" :key="index" class="padding-5" style="width:100%;overflow-y:scroll">
                                <span class="sy-checked" :class="item.dimflag_id==selects&&item.dimflag==dimflag?'is-xuanzhong':''"
                                    @click="handleXuanzhong(item.dimflag_id,item.dimflag)">{{item.name}}</span>
                            </span>
                        </div>
                        <div class="padding-top-30" v-if="productsData.length>0&&!jzloading">
                            <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                                infinite-scroll-distance="385.6">
                                <li v-for="(itm,idx) in productsData" :key="idx">
                                    <img v-lazy="itm.pdt_img_url" alt="" @click="handleImg(itm.pdt_id)">
                                    <div class="text-content">
                                        <h5>{{itm.pdt_name}}</h5>
                                        <h5>零售价：￥{{itm.pdt_price}}</h5>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div v-else-if="jzloading" class="text-center text-muted padding-top-30">
                            <i class="icon icon-Loading1 sy-cry sy-loading"></i>
                        </div>
                        <div v-else class="text-center text-muted font-70 padding-top-30">
                            <i class="icon icon-lian-hengxian sy-cry"></i>
                            <div>没有查询到商品信息</div>
                        </div>
                    </mt-tab-container-item>
                </mt-tab-container>
                <load-bottom v-if="showBottom && productsData.length>0"></load-bottom>
            </div>
            <div v-else class="text-center text-muted font-70 sy-nodata">
                <i class="icon icon-lian-hengxian sy-cry"></i>
                <div>没有查询到相关产品信息</div>
            </div>

        </div>
        <sy-footer></sy-footer>
    </div>
</template>
<script>
import action from "@/assets/utils/action.js";
import syFooter from "@/page/public/footer";
import LoadBottom from "@/page/public/loadbottom";
let typedata = true;
export default {
    name: "chanpin_list",
    data() {
        return {
            fenleiData: [],
            productsData: [],
            fenData: [],
            typeData: [],
            selected: "",
            infoData: {
                name: "",
                img_url: ""
            },
            selects: "",
            dimflag: "",
            pageNow: 1,
            pageSize: 6,
            total: 0,
            showBottom: false,
            jzloading: false,
            loading: false
        };
    },
    components: { syFooter, LoadBottom },
    created() {
        this.jzloading = true;
        this.getFenlei();
    },
    watch: {
        selected(newValue) {
            if (newValue) {
                this.selected = newValue;
                let item = this.typeData.find(
                    item => item.series_code == newValue
                );
                if (item) {
                    this.pageNow = 1;
                    this.selects = item.dimflag_id;
                    this.dimflag = item.dimflag;
                }
                this.showBottom = false;
                this.jzloading = true;
                if (!typedata) {
                    this.getBeitype();
                }
            }
        }
    },
    methods: {
        //更多
        loadMore() {
            this.loading = true;
            setTimeout(() => {
                if (this.pageSize > this.total) {
                    this.showBottom = true;
                    return;
                }
                this.pageNow++;
                this.getList();
            }, 2500);
        },
        //获取主分类
        getFenlei() {
            action.productClassify(this.$route.params.pid).then(res => {
                let item = res.seriesList.data.find(
                    item => item.series_code == this.$route.params.id
                );
                if (item) {
                    this.infoData = item;
                }
                this.getData();
            });
        },
        //获取一级分类
        getData() {
            action.productClassify(this.$route.params.id).then(res => {
                if (res.seriesList.data.length) {
                    this.typeData = res.seriesList.data;
                    this.selected = this.typeData[0].series_code;
                    this.dimflag = this.typeData[0].dimflag;
                }
                this.getBeitype();
            });
        },
        //获取二级分类
        getBeitype() {
            action.productClassify(this.selected).then(res => {
                if (res.seriesList.data.length > 0) {
                    let data = {
                        dimflag: this.dimflag,
                        dimflag_id: this.selects,
                        series_code: this.selected,
                        name: "全部"
                    };
                    res.seriesList.data.unshift(data);
                    this.fenleiData = res.seriesList.data;
                }
                this.getList();
            });
        },
        //获取列表
        getList() {
            action
                .productList(
                    this.dimflag,
                    this.selects,
                    this.pageNow,
                    this.pageSize
                )
                .then(res => {
                    typedata = false;
                    if (this.pageNow == 1) {
                        this.productsData = res.productList.data;
                    } else {
                        this.productsData = this.productsData.concat(
                            res.productList.data
                        );
                    }
                    this.jzloading = false;
                    this.loading = false;
                    this.total = res.productList.dataTotal;
                })
                .catch(() => {
                    this.jzloading = false;
                    this.loading = false;
                });
        },
        handleXuanzhong(id, dimflag) {
            this.pageNow = 1;
            this.selects = id;
            let item = this.fenleiData.find(item => item.dimflag_id == id);
            if (item) {
                this.dimflag = item.dimflag;
            }
            this.showBottom = false;
            this.jzloading = true;
            this.getList();
        },
        //跳转详情页
        handleImg(id) {
            this.showBottom = false;
            this.$router.push({
                name: "chanpin_detail",
                params: {
                    id: id
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.sy-list {
    .sy-title {
        padding: 0;
        margin: 0;
        position: relative;
        background-color: #fff;
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
                color: white;
                font-weight: 500;
                font-size: 1rem;
                display: inline-block;
                vertical-align: middle;
            }
        }
        img {
            width: 100%;
        }
    }
    .mint-navbar .mint-tab-item {
        padding: 12px 0;
    }
    .sy-checked {
        font-size: 13px;
        padding: 3px 6px 3px 6px;
        border: 0.04rem solid #ebebeb;
        border-radius: 2rem;
        box-shadow: 0 0 0 #ebebeb;
    }
    .sy-nodata {
        background-color: #fff;
        padding: 4rem 0 5rem 0;
        .sy-cry {
            font-size: 4.2rem;
        }
    }
    ul {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        padding: 0;
        padding-left: 2px;
        padding-right: 2px;
        margin: 0;
        li {
            flex: 0 0 50%;
            list-style: none;
            box-sizing: border-box;
            padding: 0 2px;
            img {
                box-sizing: border-box;
                width: 100%;
            }
            .text-content {
                padding: 8px 0;
                margin-bottom: 0.6rem;
                h5 {
                    padding: 0;
                    margin: 0;
                    font-size: 0.4rem;
                    line-height: 1.3rem;
                }
            }
        }
    }
    .mint-button {
        border-radius: 10px;
    }
    .mint-button--small {
        padding: 0 8px;
        font-size: 12px;
        height: 27px;
    }
    .is-xuanzhong {
        background-color: #faf8ef;
    }
    .is-selected {
        color: black;
        border-bottom: 3px solid red;
        margin: auto;
        max-width: 23%;
    }
    .sy-cry {
        font-size: 50px;
    }
    .sy-loading {
        display: inline-block;
        animation: loading 1s linear infinite;
        @keyframes loading {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    }
}
</style>

