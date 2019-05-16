<template>
    <div>
        <div class="sy-chanpin" :style="{'min-height':cliHeight+'px'}">
            <h3 class="padding-50">{{title}}</h3>
            <ul class="sy-ulli" v-if="chanpinData.length>0&&!jzloading">
                <li v-for="(item,index) in chanpinData" :key="index" @click="handleUrl(item.series_code)">
                    <img v-lazy="BaseUrl+item.img_url" alt>
                    <p>
                        <span class="sy-ziti">{{item.name}}</span>
                    </p>
                </li>
            </ul>
            <jz-loading v-else></jz-loading>
            <div style="clear:both"></div>
            <div class="padding-top-40 padding-bottom-40">
                <div class="sy-type" v-for="(item,index) in productsType" :key="index">
                    <a @click="handleClick(item.id)"><span :class="$route.params.id==item.id?'sy-yangshi':''">{{item.name}}</span></a>
                </div>
            </div>
        </div>
        <sy-footer></sy-footer>
    </div>
</template>
<script>
import { mapState } from "vuex";
import syFooter from "@/page/public/footer";
import action from "@/assets/utils/action.js";
import JzLoading from "@/components/loading";
export default {
    name: "chanpin",
    data() {
        return {
            title: "",
            chanpinData: [],
            jzloading: false
        };
    },
    watch: {
        "$route.params.id"(newValue) {
            if (newValue) {
                let item = this.productsType.find(
                    item => item.id == this.$route.params.id
                );
                if (item) {
                    this.title = item.name;
                }
                this.getData();
            }
        }
    },
    computed: {
        ...mapState(["productsType"])
    },
    mounted() {
        this.jzloading = true;
        this.getData();
        let item = this.productsType.find(
            item => item.id == this.$route.params.id
        );
        if (item) {
            this.title = item.name;
        }
    },
    components: { syFooter, JzLoading },
    methods: {
        //获取数据源
        getData() {
            action
                .productClassify(this.$route.params.id)
                .then(res => {
                    this.chanpinData = res.seriesList.data;
                    this.jzloading = false;
                })
                .catch(() => {
                    this.jzloading = false;
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
        margin: 0;
        padding: 0;
        color: black;
    }
    .sy-ulli {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        padding: 0;
        margin: 0;
        padding-left: 0.08rem;
        padding-right: 0.08rem;
        li {
            list-style: none;
            position: relative;
            flex: 0 0 50%;
            img {
                width: 100%;
                padding: 0 0.1rem 0 0.1rem;
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
    a {
        margin: 0;
        padding: 0;
        .sy-yangshi {
            color: black;
            padding: 0;
            margin: 0;
            border-bottom: 2px solid #cc3300;
            text-decoration: none;
            line-height: 50px;
        }
    }
}
</style>

