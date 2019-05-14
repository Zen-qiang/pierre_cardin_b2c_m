<template>
    <div>
        <div class="sy-products-detail" :style="{'min-height':cliHeight+'px'}">
            <div v-if="img_url.length>0&&img_url[0].pdt_a1">
                <img v-for="(item,index) in img_url" :key="index" v-lazy="BaseUrl+item.pdt_a1" alt="">
            </div>
            <div class="sy-headerTou" v-if="A2Data.length>0">
                <div class="sy-headerImg">
                    <ul>
                        <li v-for="(item,index) in A2Data" :key="index"><img v-lazy="item.pdt_img_url" @click="handleImg(item.pdt_id)"
                                alt=""></li>
                    </ul>
                </div>
            </div>
            <div v-if="containerData.pdt_name&&!jzloading">
                <h3 class="sy-h3">单品信息</h3>
                <div class="sy-single">
                    <mt-swipe :showIndicators="false" :defaultIndex="0">
                        <mt-swipe-item v-for="(item,index) in headerData" :key="index">
                            <img v-lazy="item.pdt_img_url" alt="">
                            <span class="sy-label">{{index+1}}/{{headerData.length}}</span>
                        </mt-swipe-item>
                    </mt-swipe>
                    <div class="text-center sy-title padding-top-20">
                        <div>{{containerData.pdt_name}}</div>
                        <div>零售价：￥{{containerData.pdt_price}}</div>
                        <div class="sy-guige sy-margin">规格：<span class="sy-guiges">{{containerData.pdt_standard}}</span></div>
                        <div class="sy-guige">{{containerData.pdt_salestalk}}</div>
                    </div>
                </div>
                <h3>产品描述</h3>
                <div class="pdtDesc" v-if="containerData.tmail_link.length">
                    <div class="flexContainer" v-for="(item, index) of containerData.tmail_link" :key="index">
                        <div class="imgContent"><img v-lazy="BaseUrl+item.img"></div>
                        <div class="textContent">
                            <div class="text">
                                <h4>{{item.title}}</h4>
                                <p>{{item.desc}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <jz-loading v-else></jz-loading>
        </div>
        <sy-footer></sy-footer>
    </div>
</template>
<script>
import action from "@/assets/utils/action.js";
import syFooter from "@/page/public/footer";
import JzLoading from "@/components/loading";
export default {
    name: "chanpin_detail",
    data() {
        return {
            img_url: [],
            headerData: [],
            A2Data: [],
            jzloading: false,
            containerData: {
                pdt_details: "",
                pdt_img_url: "",
                pdt_name: "",
                pdt_price: "",
                pdt_sale: "",
                pdt_salestalk: "",
                pdt_standard: "",
                tmail_link: ""
            }
        };
    },
    components: { syFooter, JzLoading },
    created() {
        this.getHead();
    },
    watch: {
        "$route.params.id"(newValue) {
            if (newValue) {
                this.getHead();
            }
        }
    },
    methods: {
        //获取头部数据
        getHead() {
            action.productA1(this.$route.params.id).then(res => {
                this.img_url = res.productA1.data;
                this.getA2();
            });
        },
        //获取A2区域数据
        getA2() {
            action.productA2List(this.$route.params.id, 1, 1000).then(res => {
                this.A2Data = res.productA2List.data.filter(
                    item => item.pdt_img_url
                );
                this.getRead();
            });
        },
        //获取主详情数据
        getRead() {
            this.jzloading = true;
            action
                .productDetail(this.$route.params.id)
                .then(res => {
                    this.headerData = res.productB57List.data;
                    this.containerData = res.productBInfo.data[0];
                    this.containerData.tmail_link = JSON.parse(
                        this.containerData.tmail_link
                    );
                    this.jzloading = false;
                })
                .catch(() => {
                    this.jzloading = false;
                });
        },
        handleImg(id) {
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
.sy-products-detail {
    img {
        width: 100%;
    }
    .sy-headerTou {
        white-space: nowrap;
        overflow-y: hidden;
        overflow-x: auto;
        height: 125 px;
        ul {
            padding: 0;
            margin: 0;
            li {
                width: 33.33%;
                list-style: none;
                display: inline-block;
                box-sizing: border-box;
                margin-right: 4px;
            }
        }
    }
    .sy-title {
        padding-bottom: 20px;
        border-bottom: 0.01em solid #b8bbbf;
        line-height: 28px;
        .sy-guige {
            line-height: 25px;
            font-size: 12px;
            color: #687378;
            .sy-guiges {
                padding: 0.1rem 0.3rem 0.1rem 0.3rem;
                border: 0.01rem solid #687378;
            }
        }
        .sy-margin {
            margin-top: 5px;
        }
    }
    .sy-h3 {
        margin: 18px 0 23px 0;
    }
    .sy-single {
        .sy-label {
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            color: #cd8c95;
            font-size: 0.05rem;
            background-color: #fff;
            padding: 0.1rem 0.2rem;
        }
    }
    ul {
        padding: 0;
        margin: 0;
        li {
            list-style: none;
            img {
                width: 100%;
            }
        }
    }
    & .pdtDesc {
        width: 100%;
        text-align: center;
    }
    .pdtDesc {
        margin-bottom: 80px;
        .flexContainer {
            display: flex;
            flex-flow: row nowrap;
            &:nth-child(even) {
                flex-flow: row-reverse nowrap;
            }
            > div {
                flex: 0 0 50%;
                overflow: hidden;
                height: 0;
                padding-bottom: 50%;
                position: relative;
            }
            .imgContent {
                img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .textContent {
                text-align: left;
                background: #faf8ef;
                &::after {
                    content: "";
                    display: inline-block;
                    height: 100%;
                    width: 0;
                    padding-bottom: 100%;
                    vertical-align: middle;
                }
                .text {
                    display: inline-block;
                    vertical-align: middle;
                    line-height: 1.3rem;
                    padding: 0 10%;
                    h4 {
                        font-size: 0.7rem;
                        margin-bottom: 0.1rem;
                    }
                    p {
                        color: #687378;
                        font-size: 0.8rem;
                        margin: 0;
                    }
                }
            }
        }
    }
}
</style>
<style lang="scss">
.mint-swipe {
    .mint-swipe-items-wrap {
        height: 257px !important;
    }
}
</style>
