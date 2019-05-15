<template>
    <div class="sy-swiper">
        <mt-swipe class="sy-swipe" :auto="6000" :speed="2000" continuous showIndicators>
            <mt-swipe-item v-for="(item,index) in swipeData" :key="index" style="margin-left:-72%;margin-right:28%;">
                <img v-lazy="BaseUrl + item.image" alt>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    name: "swiper",
    props: {
        swipeData: {
            type: Array
        }
    },
    data() {
        return {};
    },

    methods: {}
};
</script>

<style lang="scss" scoped>
.sy-swiper {
    height: 520px;
    .sy-swipe {
        img {
            border: 0;
            margin: 0;
            left: 50%;
            padding: 0;
            overflow-x: hidden;
            // width: 100%;
            height: 100%;
        }
    }
}
</style>
<style lang="scss">
.sy-swiper {
    .mint-swipe-indicators {
        bottom: 4.3rem;
        .mint-swipe-indicator {
            width: 0.6rem;
            height: 0.6rem;
            margin: 0 0.25rem;
        }
    }
}
</style>

