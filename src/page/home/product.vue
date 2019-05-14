<template>
    <div class="sy-page">
        <h4>产品系列</h4>
        <ul>
            <li class="sy-li" v-for="(item,index) in chanpinData" :key="index" @click="handleClick('chanpin_index',item.id)">
                <img :src="item.img_url" alt>
                <p>
                    <span class="sy-ziti">{{item.title}}</span>
                </p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "product",
    data() {
        return {
            chanpinData: [
                {
                    id: 9,
                    title: "家纺装饰",
                    img_url: require("../../assets/img/jiafang.jpg")
                },
                {
                    id: 8,
                    title: "家居服饰",
                    img_url: require("../../assets/img/jiaju.jpg")
                },
                {
                    id: 7,
                    title: "家居用品",
                    img_url: require("../../assets/img/yongpin.jpg")
                },
                {
                    id: 10,
                    title: "Home Etudes CAFE",
                    img_url: require("../../assets/img/homeec.jpg")
                }
            ]
        };
    },
    methods: {
        handleClick(type, id) {
            this.$router.push({
                name: type,
                params: {
                    id: id
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.sy-page {
    ul {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        width: 100%;
        margin: 0;
        padding: 0 0.1rem;
        .sy-li {
            list-style: none;
            position: relative;
            flex: 0 0 50%;
            padding: 0.1rem;
            box-sizing: border-box;
            margin: 0;
            img {
                width: 100%;
                // padding: 0 2px 2px 2px;
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
                    color: white;
                    font-weight: 500;
                    font-size: 0.9rem;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }
    }
}
</style>

