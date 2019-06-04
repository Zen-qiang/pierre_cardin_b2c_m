<template>
    <div>
        <div :style="{'min-height':cliHeight+'px'}" class="sy-swipe_detail">
            <div v-html="details"></div>
        </div>
        <syFooter></syFooter>
    </div>
</template>
<script>
import action from "@/assets/utils/action.js";
import syFooter from "@/page/public/footer";

export default {
    name: "swipe_detail",
    data() {
        return {
            details: ""
        };
    },
    components: { syFooter },
    mounted() {
        this.getRead();
    },
    methods: {
        getRead() {
            action.slideMsgDetail().then(res => {
                let filters = res.slideData.data.find(
                    item => item.id == parseInt(this.$route.query.id)
                );
                if (filters) {
                    this.details = filters.details;
                }
            });
        }
    }
};
</script>
<style lang="scss">
.sy-swipe_detail {
    img {
        width: 100% !important;
        height: 75% !important;
    }
}
</style>

