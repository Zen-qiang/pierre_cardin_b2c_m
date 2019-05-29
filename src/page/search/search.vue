<template>
    <div>
        <div id="nodata" style="height:60px;"></div>
        <div :style="{'min-height':cliHeight+'px'}" class="sy-search-index">
            <div class="text-center text-muted sy-search">搜索结果</div>
            <div class="text-center sy-title">“{{$route.query.keys}}”</div>
            <ul v-if="listData.length>0&&!jzloading" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                infinite-scroll-distance="536">
                <li v-for="(item,index) in listData" :key="index" @click="handleUrl(item.pdt_id)">
                    <img :src="item.pdt_img_url" alt="">
                    <div class="text-content">
                        <h5>{{item.pdt_name}}</h5>
                        <h5>零售价：￥{{item.pdt_price}}</h5>
                    </div>
                </li>
            </ul>
            <div v-else class="text-center font-70" style="color:rgb(205,206,207)">
                <div>未查询到产品信息</div>
            </div>
        </div>
        <sy-footer></sy-footer>
    </div>
</template>
<script>
import action from "@/assets/utils/action.js";
import syFooter from "@/page/public/footer";
export default {
    name: "search_index",
    data() {
        return {
            listData: [],
            jzloading: false,
            page: 1,
            pageSize: 10,
            total: 0,
            showBottom: false
        };
    },
    watch: {
        "$route.query.keys"(newValue) {
            if (newValue) {
                document.querySelector("#nodata").scrollIntoView(true);
                this.page = 1;
                this.getData();
            }
        }
    },
    components: { syFooter },
    mounted() {
        document.querySelector("#nodata").scrollIntoView(true);
        this.jzloading = true;
        this.getData();
    },
    methods: {
        //更多
        loadMore() {
            this.loading = true;
            setTimeout(() => {
                if (this.pageSize > this.total) return;
                this.page++;
                this.getData();
            }, 2500);
        },
        getData() {
            action
                .searchList(this.$route.query.keys, this.page, this.pageSize)
                .then(res => {
                    if (this.page == 1) {
                        this.listData = res.productList.data;
                    } else {
                        this.listData = this.listData.concat(
                            res.productList.data
                        );
                    }
                    this.total = res.productList.dataTotal;
                    if (this.total >= 0 && this.total < this.pageSize) {
                        this.showBottom = true;
                    }
                    this.jzloading = false;
                })
                .catch(() => {
                    this.jzloading = false;
                });
        },
        handleUrl(id) {
            this.$router.push({
                name: "chanpin_detail",
                params: {
                    id: id
                }
            });
        },
        handleMore() {
            if (this.pageSize > this.total) return;
            this.page++;
            this.getData();
        }
    }
};
</script>
<style lang="scss" scoped>
.sy-search-index {
    background-color: #fff;
    .sy-search {
        color: rgb(105, 113, 118);
        font-size: 0.8rem;
        padding: 2.6rem 0 1.5rem 0;
    }
    .sy-title {
        font-size: 1.3rem;
        color: black;
        padding-bottom: 3rem;
    }
    ul {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        padding: 0.15rem 2px;
        margin: 0;
        padding-top: 0.2rem;
        li {
            list-style: none;
            flex: 0 0 50%;
            width: 50%;
            box-sizing: border-box;
            img {
                width: 100%;
                padding: 0 2px;
            }
            .text-content {
                font-size: 0.9rem;
                text-shadow: none;
                line-height: 1.3rem;
                padding: 0.8rem 0;
                margin-bottom: 0.2rem;
                .sy-title {
                    overflow: hidden; /*自动隐藏文字*/
                    text-overflow: ellipsis; /*文字隐藏后添加省略号*/
                    white-space: nowrap;
                    font-weight: bold;
                }
                h5 {
                    padding: 0;
                    margin: 0;
                }
            }
        }
    }
    .sy-more {
        width: 100%;
        .sy-button {
            margin: auto;
            width: 90%;
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

