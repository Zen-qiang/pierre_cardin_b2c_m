<template>
    <div class="page">
        <swiper v-if="swipeData.length>0" :swipeData="swipeData">轮播图</swiper>
        <products :chanpinData="chanpinData" id="products">产品系列</products>
        <pin-pai v-if="jiajuData.length>0" :jiajuInfo="jiajuInfo" :jiajuData="jiajuData">家居顾问</pin-pai>
        <xuan-fa v-if="pinpaiData.length>0" :pinpaiData="pinpaiData">品牌宣发</xuan-fa>
        <sy-footer></sy-footer>
    </div>
</template>
<script>
import { mapState } from "vuex";
import action from "@/assets/utils/action.js";
import Swiper from "./swipe";
import Products from "./product";
import PinPai from "./jiaju";
import XuanFa from "./xuanfa";
import syFooter from "@/page/public/footer";

export default {
    name: "home",
    computed: {
        ...mapState(["isLocation"])
    },
    components: { Swiper, Products, PinPai, XuanFa, syFooter },
    data() {
        return {
            swipeData: [],
            jiajuData: [],
            jiajuInfo: [],
            pinpaiData: [],
            productsData: [],
            chanpinData: [],
            jzloading: false
        };
    },
    watch: {
        isLocation(newValue) {
            if (newValue) {
                this.setLocation(this.setLocation);
            }
        }
    },
    mounted() {
        action.homeBase().then(res => {
            if (res) {
                this.swipeData = res.slideData.data;
                this.jiajuInfo = res.messageInfo.data.filter(
                    item => item.img_url && item.img_url != ""
                );
                if (this.jiajuInfo.length % 2 > 0) {
                    this.jiajuInfo = this.jiajuInfo.filter(
                        (item, index) => index != this.jiajuInfo.length - 1
                    );
                }
                this.jiajuData = res.messageData.data.filter(
                    item => item.img_url && item.img_url != ""
                );
                this.pinpaiData = res.magazineData.data;
                if (this.isLocation) {
                    this.setLocation(this.setLocation);
                }
                this.productsData.push(res.series7.data);
                this.productsData.push(res.series8.data);
                this.productsData.push(res.series9.data);
                this.productsData.push(res.series10.data);
                this.getChanpin();
            }
        });
    },
    methods: {
        getChanpin() {
            this.jzloading = true;
            action
                .chanpinType()
                .then(res => {
                    let data = res.productType.data.filter(
                        item =>
                            item.id == 7 ||
                            item.id == 8 ||
                            item.id == 9 ||
                            item.id == 10
                    );
                    for (var i in data) {
                        for (var j in this.productsData) {
                            if (
                                parseInt(data[i].id) ==
                                parseInt(this.productsData[j][0].parent_code)
                            ) {
                                data[i].img_url = this.productsData[j][0]
                                    .img_url
                                    ? this.BaseUrl +
                                      this.productsData[j][0].img_url
                                    : this.imgfilter(data[i].id);
                            }
                        }
                    }
                    this.chanpinData = JSON.parse(JSON.stringify(data));
                    this.$store.commit("setProductsType", data);
                    this.jzloading = false;
                })
                .catch(() => {
                    this.jzloading = false;
                });
        },
        //过滤图片
        imgfilter(val) {
            let img_url = "";
            switch (val) {
                case 7:
                    img_url = "../../assets/img/jiafang";
                    break;
                case 8:
                    img_url = "../../assets/img/jiaju";
                    break;
                case 9:
                    img_url = "../../assets/img/yongpin";
                    break;
                case 10:
                    img_url = "../../assets/img/homeec";
                    break;
            }
            return img_url;
        },
        //锚点定位
        setLocation(val) {

        }
    }
};
</script>

<style>
.page {
    margin-bottom: -46px;
    background-color: #fff;
}
</style>
