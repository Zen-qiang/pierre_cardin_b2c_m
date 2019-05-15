<template>
    <div class="page">
        <swiper v-if="swipeData.length>0" :swipeData="swipeData">轮播图</swiper>
        <products id="products">产品系列</products>
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
            pinpaiData: []
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
            }
        });
    },
    methods: {
        //锚点定位
        setLocation(val) {
            setTimeout(() => {
                document.querySelector("#products").scrollIntoView(val);
            }, 500);
        }
    }
};
</script>

<style>
.page {
    margin-bottom: -46px;
}
</style>
