<template>
    <div class="sy-swiper">
        <mt-swipe class="sy-swipe" :auto="5000" :speed="1000" continuous showIndicators>
            <mt-swipe-item v-for="(item,index) in swipeData" :key="index">
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
    height: 225px;
    .sy-swipe {
        img {
            width: 100%;
        }
    }
}
</style>

