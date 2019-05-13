<template>
    <div>
        <div class="sy-chanpin">
            <h3 class="padding-50">{{title}}</h3>
            <ul class="sy-ulli">
                <li v-for="(item,index) in chanpinData" :key="index" @click="handleUrl(item.series_code)">
                    <img v-lazy="BaseUrl+item.img_url" alt>
                    <p>
                        <span class="sy-ziti">{{item.name}}</span>
                    </p>
                </li>
            </ul>
            <div style="clear:both"></div>
            <div class="padding-top-40 padding-bottom-40">
                <div class="sy-type" v-for="(item,index) in typeData" :key="index">
                    <a :class="$route.params.id==item.id?'sy-yangshi':''" @click="handleClick(item.id)">{{item.title}}</a>
                </div>
            </div>
        </div>
        <sy-footer></sy-footer>
    </div>
</template>
<script>
import syFooter from "@/page/public/footer";
import action from "@/assets/utils/action.js";
export default {
    name: "chanpin",
    data() {
        return {
            title: "",
            chanpinData: [],
            typeData: [
                {
                    id: 9,
                    title: "家纺装饰",
                    type: "series7"
                },
                {
                    id: 8,
                    title: "家居服饰",
                    type: "series8"
                },
                {
                    id: 7,
                    title: "家居用品",
                    type: "series9"
                },
                {
                    id: 10,
                    title: "Home Etudes CAFE",
                    type: "series10"
                }
            ]
        };
    },
    watch: {
        "$route.params.id"(newValue) {
            if (newValue) {
                this.getData();
            }
        }
    },
    created() {
        this.getData();
        let item = this.typeData.find(item => item.id == this.$route.params.id);
        if (item) {
            this.title = item.title;
        }
    },
    components: { syFooter },
    methods: {
        //获取数据源
        getData() {
            action.productClassify(this.$route.params.id).then(res => {
                this.chanpinData = res.seriesList.data;
            });
        },
        handleClick(id) {
            if (this.$route.params.id == id) return;
            this.$router.push({
                name: "chanpin_index",
                params: {
                    id: id
                }
            });
        },
        //跳入产品3级列表
        handleUrl(id) {
            this.$router.push({
                name: "chanpin_list",
                params: {
                    pid: this.$route.params.id,
                    id: id
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.sy-chanpin {
    background-color: #faf8ef;
    h3 {
        padding: 0;
        margin: 0;
    }
    .sy-ulli {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        padding: 0;
        margin: 0;
        li {
            list-style: none;
            position: relative;
            flex: 0 0 50%;
            img {
                width: 100%;
                padding: 0 2px 0 2px;
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
                    font-size: 1rem;
                    display: inline-block;
                    vertical-align: middle;
                    text-shadow: 0 0 0.1rem red;
                }
            }
        }
    }
    .sy-type {
        line-height: 36px;
        font-size: 13px;
    }
    .sy-yangshi {
        color: black;
        border-bottom: 2px solid red;
        text-decoration: none;
        line-height: 50px;
    }
}
</style>

