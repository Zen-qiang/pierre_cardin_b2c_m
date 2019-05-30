<template>
    <div class="sy-xuanfa">
        <h3 class="texttitle">品牌宣发</h3>
        <ul>
            <li v-for="(item,index) in pinpaiData" :key="index" @click="handleUrl(item.magazine_code)">
                <img :src="BaseUrl+item.img_url" alt>
            </li>
        </ul>
        <div class="margin-top-10 padding-bottom-30 sy-more">
            <div class="sy-button" @click="handleMore">查看更多 <i></i></div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
export default {
    name: "xuanfa",
    props: {
        pinpaiData: {
            type: Array
        }
    },
    beforeMount: function() {
        this.height = ($(window).width() * 664) / 1082;
    },
    data() {
        return {
            height: 0
        };
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
h3 {
    margin: 1.4rem 0;
}
.sy-xuanfa {
    // background-color: #faf8ef;
    ul {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        margin: 0;
        padding: 0;
        width: 100%;
        li {
            list-style: none;
            position: relative;
            flex: 0 0 50%;
            box-sizing: border-box;
            padding: 0 0.1rem;
            img {
                width: 100%;
            }
        }
    }
    .sy-more {
        width: 100%;
        .sy-button {
            margin: auto;
            width: 95%;
            line-height: 23px;
            font-size: 0.9rem;
            color: rgb(105, 113, 118);
            text-align: center;
            padding: 0.7rem 1.2rem 0.7rem 1.2rem;
            border: 0.02rem solid rgb(105, 113, 118);
        }
    }
}
</style>

