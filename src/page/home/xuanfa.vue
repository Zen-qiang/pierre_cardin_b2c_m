<template>
    <div class="sy-xuanfa">
        <h4 class="padding-top-20">品牌宣发</h4>
        <ul>
            <li v-for="(item,index) in pinpaiData" :key="index" @click="handleUrl(item.magazine_code)">
                <img v-lazy="BaseUrl+item.img_url" width="100%" alt>
            </li>
        </ul>
        <div class="margin-top-30 padding-bottom-50 sy-more">
            <div class="sy-button" @click="handleMore">查看更多 <i></i></div>
        </div>
    </div>
</template>
<script>
export default {
    name: "xuanfa",
    props: {
        pinpaiData: {
            type: Array
        }
    },
    data() {
        return {};
    },
    methods: {
        //查看更多
        handleMore() {
            this.$router.push({
                name: "declarehair_index"
            });
        },
        //详情
        handleUrl(id) {
            console.log(id);
            this.$router.push({
                name: "declarehair_detail",
                params: {
                    id: id
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.sy-xuanfa {
    background-color: #faf8ef;

    ul {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        margin: 0;
        padding: 0 0 0 0.2rem;
        // width: 100%;
        li {
            width: 33%;
            list-style: none;
            box-sizing: border-box;
            padding: 0 0.1rem;
        }
    }
    .sy-more {
        width: 100%;
        .sy-button {
            margin: auto;
            width: 95%;
            line-height: 23px;
            font-size: 0.85rem;
            color: #8e8e8e;
            text-align: center;
            padding: 0.7rem 1.2rem 0.7rem 1.2rem;
            border: 0.02rem solid #eaeaea;
        }
    }
}
</style>

