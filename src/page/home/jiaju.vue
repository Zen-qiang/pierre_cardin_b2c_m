<template>
    <div class="sy-jiaju">
        <h3 class="texttitle">家居顾问</h3>
        <ul>
            <li v-for="(item,index) in jiajuData" :key="index" @click="handleUrl(item.msg_code)">
                <img v-if="item.img_url" :src="BaseUrl+item.img_url" alt>
                <img v-else src="../../assets/noimg.jpg" alt="">
                <p>
                    <span class="sy-ziti" v-html="Trim(item.title)"></span>
                </p>
            </li>
        </ul>
        <ul class="padding-bottom-20 sy-furnishing">
            <li v-for="(item,index) in jiajuInfo" :key="index" @click="handleUrl(item.msg_code)" :class="index%2==0?'sy-margin':'sy-margins'">
                <img v-if="item.img_url" :src="BaseUrl+item.img_url" :style="{'height':height +'px'}" style="margin-left:-50%;margin-right:-50%;"
                    alt>
                <img v-else src="../../assets/noimg.jpg" alt="">
            </li>
        </ul>
        <div class="sy-more" @click="handleMore">
            <div class="sy-button">查看更多<i></i></div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
export default {
    name: "jiaju",
    props: {
        jiajuData: {
            type: Array
        },
        jiajuInfo: {
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
        handleUrl(id) {
            this.$router.push({
                name: "furnishing_detail",
                params: {
                    id: id
                }
            });
        },
        handleMore() {
            this.$router.push({
                name: "furnishing_index"
            });
        }
    }
};
</script>
<style lang="scss" scoped>
h3 {
    margin: 1.4rem 0;
    background-color: #fff;
}
.sy-jiaju {
    background-color: #fff;
    width: 100%;
    .sy-furnishing {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        margin: 0;
        padding: 0.06rem 0;
        li {
            list-style: none;
            box-sizing: border-box;
            flex: 0 0 50%;
            margin: 0;
            padding: 0.1rem 0;
            box-sizing: border-box;
            overflow: hidden;
            img {
                object-fit: cover;
                vertical-align: middle;
            }
        }
    }
    ul {
        width: 100%;
        margin: 0;
        padding: 0;
        li {
            list-style: none;
            flex: 0 0 100%;
            position: relative;
            img {
                width: 100%;
                vertical-align: middle;
            }
            p {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: 0;
                &::before {
                    content: "";
                    display: inline-block;
                    width: 0;
                    height: 100%;
                    vertical-align: middle;
                }
                .sy-ziti {
                    width: 72%;
                    font-size: 1.1rem;
                    color: #fff;
                    text-shadow: 0 0 30px rgb(204, 51, 0);
                    display: inline-block;
                    vertical-align: middle;
                }
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
            border: 0.02rem solid #eaeaea;
        }
    }
}
.sy-margin {
    margin-left: -0.2rem !important;
}
.sy-margins {
    margin-left: 0.2rem !important;
}
</style>

