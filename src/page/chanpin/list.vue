<template>
    <div>
        <div class="sy-list" :style="{'min-height':cliHeight+'px'}">
            <div class="sy-title">
                <img v-if="infoData.big_img" :src="BaseUrl+infoData.big_img" alt="">
                <p>
                    <span class="sy-ziti">{{infoData.name}}</span>
                </p>
            </div>
            <div style="border-bottom:0.03rem solid #EBEBEB;padding-top:0;background-color:#fff;width:100%;overflow-y:scroll">
                <div class="sy-mint-scroll">
                    <mt-navbar v-model="selected">
                        <mt-tab-item :id="item.series_code" v-for="(item,index) in typeData" :key="index">{{item.name}}</mt-tab-item>
                    </mt-navbar>
                </div>
            </div>
            <div v-if="typeData.length>0" style="background-color:#fff">
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item :id="items.series_code" v-for="(items,indexs) in typeData" :key="indexs">
                        <div class="padding-top-20 sy-little-tab">
                            <div v-for="(item,index) in fenleiData" :key="index" class="padding-left-5 padding-right-5 sy-tab">
                                <span class="sy-checked" :class="item.dimflag_id==selects&&item.dimflag==dimflag?'is-xuanzhong':''"
                                    @click="handleXuanzhong(index,item.dimflag_id,item.dimflag)">{{item.name}}</span>
                            </div>
                        </div>
                        <div class="padding-top-10" v-if="productsData.length>0&&!jzloading">
                            <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                                infinite-scroll-distance="385.6">
                                <li v-for="(itm,idx) in productsData" :key="idx">
                                    <img v-if="itm.pdt_img_url" :src="itm.pdt_img_url" alt="" @click="handleImg(itm.pdt_id)">
                                    <div class="text-content">
                                        <h5 class="text-h5">{{itm.pdt_name}}</h5>
                                        <h5>零售价：￥{{itm.pdt_sale}}</h5>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div v-else class="text-center font-70 padding-top-20 padding-bottom-30" style="color:rgb(205,206,207)">
                            <div>未查询到产品信息</div>
                        </div>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
            <div v-else class="text-center font-70 sy-nodata" style="color:rgb(205,206,207)">
                <div>未查询到相关产品信息</div>
            </div>

        </div>
        <sy-footer></sy-footer>
    </div>
</template>
<script>
import action from "@/assets/utils/action.js";
import syFooter from "@/page/public/footer";
import $ from "jquery";
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
            flagitemleft: [],
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
    components: { syFooter },
    mounted() {
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
                    if (res.seriesList.data.length > 1) {
                        res.seriesList.data.unshift(data);
                    }
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
        handleXuanzhong(index, id, dimflag) {
            $(".sy-little-tab").animate(
                { scrollLeft: this.flagitemleft[index] },
                300
            );
            this.pageNow = 1;
            this.selects = id;
            let item = this.fenleiData.find(item => item.dimflag_id == id);
            if (item) {
                this.dimflag = item.dimflag;
            }
            this.showBottom = false;
            this.jzloading = true;
            this.setScroleleft();
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
        },
        setScroleleft() {
            let viewWidth = $(".sy-little-tab").width() / 2;
            let length = this.fenleiData.length;
            let dom = $(".sy-little-tab>.sy-tab");
            let itemleft = 0;
            for (let i = 0; i < length; i++) {
                itemleft =
                    dom.eq(i).position().left +
                    dom.eq(i).width() / 2 +
                    12 -
                    viewWidth;
                itemleft = parseInt(itemleft);
                this.flagitemleft.push(itemleft);
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.mint-tab-item-label {
    font-size: 1rem;
}
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
                font-size: 1.3rem;
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
    .mint-navbar {
        a,
        a:hover,
        a:active,
        a:visited,
        a:link,
        a:focus {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-tap-highlight-color: transparent;
            outline: none;
            background: none;
            text-decoration: none;
        }
    }
    .sy-little-tab {
        // width: 100%;
        overflow-x: scroll;
        padding-bottom: 0.8rem;
        .sy-tab {
            display: inline;
            padding-bottom: 0.6rem;
            .sy-checked {
                font-size: 13px;
                padding: 0.25rem 0.35rem 0.2rem 0.4rem;
                border: 0.04rem solid #ebebeb;
                border-radius: 2rem;
                box-shadow: 0 0 0 #ebebeb;
                white-space: nowrap;
            }
        }
        & .sy-tab:last-child {
            clear: both;
        }
    }
    .sy-nodata {
        background-color: #fff;
        padding: 4rem 0 5rem 0;
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
            width: 50%;
            padding: 0 2px;
            img {
                box-sizing: border-box;
                width: 100%;
            }
            .text-content {
                font-size: 0.9rem;
                text-shadow: none;
                line-height: 1.3rem;
                padding: 0.8rem 0;
                margin-bottom: 0.2rem;
                .text-h5 {
                    // overflow: hidden; /*自动隐藏文字*/
                    // text-overflow: ellipsis; /*文字隐藏后添加省略号*/
                    // white-space: nowrap;
                }
                h5 {
                    padding: 0;
                    margin: 0;
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
        border-bottom: 3px solid rgb(204, 51, 0);
        margin: auto;
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
<style lang="scss">
.sy-mint-scroll {
    .mint-navbar {
        .mint-tab-item {
            .mint-tab-item-label {
                font-size: 0.85rem;
                text-transform: Capitalize;
            }
        }
    }
}
</style>

