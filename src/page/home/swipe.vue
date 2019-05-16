<template>
    <div class="sy-swiper" v-if="swipeData.length>0">
        <mt-swipe class="sy-swipe" :auto="6000" :speed="2000" continuous showIndicators :style="{'height':height+'px'}">
            <mt-swipe-item v-for="(item,index) in swipeData" :key="index">
                <img v-lazy="BaseUrl + item.image" alt>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
import $ from "jquery";
export default {
    name: "swiper",
    props: {
        swipeData: {
            type: Array
        }
    },
    beforeMount: function() {
        this.height = ($(window).width() * 664) / 500;
    },
    data() {
        return {
            height: 0
        };
    },

    methods: {}
};
</script>

<style lang="scss" scoped>
.sy-swiper {
    .sy-swipe {
        img {
            border: 0;
            margin: 0;
            left: 0;
            padding: 0;
            width: 100%;
            overflow-x: hidden;
            // width: 100%;
            height: 100%;
            object-fit: cover;
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

