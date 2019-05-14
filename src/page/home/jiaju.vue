<template>
    <div class="sy-jiaju">
        <h4>家居顾问</h4>
        <ul>
            <li v-for="(item,index) in jiajuData" :key="index" @click="handleUrl(item.msg_code)">
                <img v-if="item.img_url" v-lazy="BaseUrl+item.img_url" alt>
                <img v-else src="../../assets/noimg.jpg" alt="">
                <p>
                    <span class="sy-ziti" v-html="Trim(item.title)"></span>
                </p>
            </li>
        </ul>
        <ul class="padding-bottom-20 sy-furnishing">
            <li v-for="(item,index) in jiajuInfo" :key="index" @click="handleUrl(item.msg_code)">
                <img v-if="item.img_url" v-lazy="BaseUrl+item.img_url" alt>
                <img v-else src="../../assets/noimg.jpg" alt="">
            </li>
        </ul>
        <div class="sy-more" @click="handleMore">
            <div class="sy-button">查看更多<i></i></div>
        </div>
    </div>
</template>
<script>
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
    data() {
        return {};
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
.sy-jiaju {
    .sy-furnishing {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        margin: 0;
        padding: 0;
        li {
            list-style: none;
            box-sizing: border-box;
            flex: 0 0 50%;
            img {
                width: 100%;
                padding: 0.11rem;
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
                    width: 90%;
                    color: #fff;
                    text-shadow: 0 0 30px #3d3d3d;
                    font-size: 0.9rem;
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
            font-size: 0.85rem;
            color: #8e8e8e;
            text-align: center;
            padding: 0.7rem 1.2rem 0.7rem 1.2rem;
            border: 0.02rem solid #eaeaea;
        }
    }
}
</style>

