<template>
    <div>
        <div class="sy-furn_detail" :style="{'min-height':cliHeight-48+'px'}">
            <div v-if="listData.length>0&&!jzloading">
                <div v-for="(item,index) in listData" :key="index">
                    <div class="text-left sy-time">{{item.time|fomartDate}}</div>
                    <h4>{{item.title}}</h4>
                    <div class="text-left sy-content" v-html="Trim(item.content)"></div>
                </div>
            </div>
            <jz-loading v-else></jz-loading>
        </div>
        <div class="sy-footer">文章出处：皮尔卡丹家居</div>
        <sy-footer></sy-footer>
    </div>
</template>
<script>
import action from "@/assets/utils/action.js";
import syFooter from "@/page/public/footer";
import JzLoading from "@/components/loading";
export default {
    name: "furnishing_detail",
    data() {
        return {
            jzloading: false,
            listData: []
        };
    },
    mounted() {
        this.getRead();
    },
    components: { syFooter, JzLoading },
    methods: {
        getRead() {
            this.jzloading = true;
            action
                .brandMsgDetail(this.$route.params.id)
                .then(res => {
                    this.listData = res.messageDetail.data;
                    this.jzloading = false;
                })
                .catch(() => {
                    this.jzloading = false;
                });
        }
    }
};
</script>
<style lang="scss" scoped>
.sy-furn_detail {
    padding: 0.8rem;
    .sy-time {
        padding: 0.3rem 0 0.2rem 0;
        font-size: 0.6rem;
        color: #d4d4d4;
    }
    h4 {
        margin: 0;
        padding: 0;
        text-align: left;
    }
    .sy-content {
        padding: 2.5rem 0 0 0;
        font-size: 0.8rem;
        line-height: 1.4rem;
    }
}
.sy-footer {
    color: #e8e8e8;
    font-size: 0.6rem;
    text-align: center;
    margin-top: 0.5rem;
    padding: 1.1rem 0;
    position: relative;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
}
</style>
<style lang="scss">
.sy-furn_detail {
    img {
        width: 100% !important;
        height: 75% !important;
    }
}
</style>

