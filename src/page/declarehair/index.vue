<template>
    <div>
        <div class="sy-declarehair">
            <h3 class="texttitle">品牌宣发</h3>
            <div :style="{'min-height':cliHeight+'px'}">
                <ul v-if="listData.length>0&&!jzloading" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                    infinite-scroll-distance="375.6">
                    <li v-for="(item,index) in listData" :class="index%2==0?'sy-margin':'sy-margins'" :key="index"
                        @click="hanldeUrl(item.magazine_code)">
                        <img :src="BaseUrl+item.img_url" :style="{'height':height +'px'}" style="margin-left:-50%;margin-right:-50%;"
                            alt="">
                        <div class="sy-content">
                            <div class="sy-title">{{item.title}}</div>
                            <div class="sy-text">{{item.issues}}</div>
                        </div>
                    </li>
                </ul>
                <div v-else class="text-center font-70 sy-nodata" style="color:rgb(205,206,207)">
                    <div>未查询到品牌宣发信息</div>
                </div>
            </div>
        </div>
        <sy-footer></sy-footer>
    </div>
</template>
<script>
import $ from "jquery";
import action from "@/assets/utils/action.js";
import syFooter from "@/page/public/footer";
export default {
    name: "declarehair_index",
    data() {
        return {
            page: 0,
            pageSize: 6,
            listData: [],
            loading: false,
            showBottom: false,
            jzloading: false,
            total: 0,
            height: 0
        };
    },
    beforeMount: function() {
        this.height = ($(window).width() * 664) / 1082;
    },
    components: { syFooter },
    mounted() {
        this.jzloading = true;
        this.getData();
    },
    methods: {
        //更多
        loadMore() {
            this.loading = true;
            setTimeout(() => {
                if (this.listData.length >= this.total) {
                    this.showBottom = true;
                    return;
                }
                this.page++;
                this.getData();
            }, 2500);
        },
        //获取数据
        getData() {
            action
                .magazineList(this.page, this.pageSize)
                .then(res => {
                    if (this.page == 0) {
                        this.listData = res.magazineList.data;
                    } else {
                        this.listData = this.listData.concat(
                            res.magazineList.data
                        );
                    }
                    this.jzloading = false;
                    this.total = res.magazineList.dataTotal;
                    if (this.listData.length >= this.total) {
                        this.showBottom = true;
                    }
                })
                .catch(() => {
                    this.jzloading = false;
                });
        },
        hanldeUrl(id) {
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
.sy-declarehair {
    background-color: #fff;
    h3 {
        font-size: 1.3rem;
        background-color: #fff;
    }
    ul {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        // margin: 0 -5px;
        margin: 0;
        padding: 0 0 1.3rem 0;
        // background-color: #faf8ef;
        li {
            list-style: none;
            flex: 0 0 50%;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            overflow: hidden;
            img {
                object-fit: cover;
                vertical-align: middle;
            }
            .sy-content {
                line-height: 1.3rem;
                font-size: 0.8rem;
                padding: 0.4rem 0;
                .sy-title {
                    overflow: hidden; /*自动隐藏文字*/
                    text-overflow: ellipsis; /*文字隐藏后添加省略号*/
                    white-space: nowrap;
                    color: black;
                    font-weight: bold;
                }
                .sy-text {
                    color: #8f8f8f;
                }
            }
        }
    }
    .sy-nodata {
        padding: 4rem 0 5rem 0;
    }
}
</style>

