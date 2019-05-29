<template>
    <div>
        <div class="sy-chanpin" :style="{'min-height':cliHeight+'px'}">
            <h3 class="texttitle">{{title}}</h3>
            <ul class="sy-ulli" v-if="chanpinData.length>0&&!jzloading">
                <li v-for="(item,index) in chanpinData" :key="index" :class="index%2==0?'sy-margin':'sy-margins'"
                    @click="handleUrl(item.series_code)">
                    <img :src="BaseUrl+item.img_url" :style="{'height':height +'px'}" style="margin-left:-50%;margin-right:-50%;"
                        alt>
                    <p>
                        <span class="sy-ziti">{{item.name}}</span>
                    </p>
                </li>
            </ul>
            <div class="padding-top-20 padding-bottom-20">
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
import $ from "jquery";
export default {
    name: "chanpin",
    data() {
        return {
            title: "",
            chanpinData: [],
            jzloading: false,
            height: 0
        };
    },
    beforeMount: function() {
        this.height = ($(window).width() * 664) / 1082;
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
    components: { syFooter },
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
    background-color: #fff;
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
            margin: 0;
            padding: 0.1rem 0;
            box-sizing: border-box;
            overflow: hidden;
            img {
                object-fit: cover;
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
                    font-size: 1.1rem;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }
    }
    .sy-type {
        line-height: 2.8rem;
        font-size: 1.1rem;
    }
    a {
        margin: 0;
        padding: 0;
        .sy-yangshi {
            color: black;
            padding: 0;
            margin: 0;
            border-bottom: 3px solid rgb(204, 51, 0);
            text-decoration: none;
            // line-height: 0px;
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

