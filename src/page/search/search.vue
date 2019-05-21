<template>
    <div>
        <div id="nodata" style="height:60px;"></div>
        <div :style="{'min-height':cliHeight+'px'}" class="sy-search-index">
            <div class="text-center text-muted sy-search">搜索结果</div>
            <div class="text-center sy-title">“{{$route.query.keys}}”</div>
            <ul v-if="listData.length>0&&!jzloading" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                infinite-scroll-distance="385.6" class="padding-bottom-40">
                <li v-for="(item,index) in listData" :key="index" @click="handleUrl(item.pdt_id)">
                    <img v-lazy="item.pdt_img_url" alt="">
                    <div class="text-content">
                        <h5>{{item.pdt_name}}</h5>
                        <h5>零售价：￥{{item.pdt_price}}</h5>
                    </div>
                </li>
            </ul>
            <jz-loading v-else></jz-loading>
            <load-bottom v-if="showBottom && listData.length>0"></load-bottom>
        </div>
        <sy-footer></sy-footer>
    </div>
</template>
<script>
import action from "@/assets/utils/action.js";
import syFooter from "@/page/public/footer";
import JzLoading from "@/components/loading";
import LoadBottom from "@/page/public/loadbottom";
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
    components: { syFooter, JzLoading, LoadBottom },
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
        color: #68838b;
        font-size: 0.2rem;
        padding: 2.6rem 0 1.5rem 0;
    }
    .sy-title {
        font-size: 1.2rem;
        color: black;
        border-bottom: 0.01rem solid #e8e8e8;
        padding-bottom: 3rem;
    }
    ul {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        padding: 0;
        margin: 0;
        padding-top: 0.2rem;
        li {
            list-style: none;
            flex: 0 0 50%;
            img {
                width: 100%;
                padding: 0 0.1rem 0 0.1rem;
            }
            .text-content {
                padding: 0.4rem 0 1.4rem 0;
                h5 {
                    padding: 0;
                    margin: 0;
                    font-size: 0.7rem;
                    line-height: 1.2rem;
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

