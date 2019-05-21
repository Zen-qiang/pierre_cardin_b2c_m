<template>
    <div>
        <div id="nodata" style="height:60px;"></div>
        <div class="sy-declarehair" :style="{'min-height':cliHeight+'px'}">
            <h3>品牌宣发</h3>
            <ul v-if="listData.length>0&&!jzloading" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                infinite-scroll-distance="385.6">
                <li v-for="(item,index) in listData" :key="index" @click="hanldeUrl(item.magazine_code)">
                    <img v-lazy="BaseUrl+item.img_url" alt="">
                    <div class="sy-content">
                        <div class="sy-title">{{item.title}}</div>
                        <div class="sy-text">{{item.issues}}</div>
                    </div>
                </li>
            </ul>
            <jz-loading v-else-if="jzloading"></jz-loading>
            <div v-else class="text-center text-muted font-70 sy-nodata">
                <i class="icon icon-lian-hengxian sy-cry"></i>
                <div>没有查询到品牌宣发信息</div>
            </div>
            <load-bottom v-if="showBottom && listData.length>0" class="sy-loadbottom"></load-bottom>
        </div>
        <sy-footer></sy-footer>
    </div>
</template>
<script>
import action from "@/assets/utils/action.js";
import syFooter from "@/page/public/footer";
import LoadBottom from "@/page/public/loadbottom";
import JzLoading from "@/components/loading";
let typedata = true;
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
            total: 0
        };
    },
    components: { syFooter, LoadBottom, JzLoading },
    mounted() {
        document.querySelector("#nodata").scrollIntoView(true);
        this.jzloading = true;
        this.getData();
    },
    methods: {
        //更多
        loadMore() {
            this.loading = true;
            if (!typedata) {
                setTimeout(() => {
                    if (this.listData.length >= this.total) {
                        this.showBottom = true;
                        return;
                    }
                    this.page++;
                    this.getData();
                }, 2500);
            }
        },
        //获取数据
        getData() {
            action
                .magazineList(this.page, this.pageSize)
                .then(res => {
                    typedata = false;
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
    h3 {
        padding: 2.8rem 0;
        color: black;
        font-size: 1.3rem;
        background-color: #fff;
        margin: 0;
    }
    ul {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        // margin: 0 -5px;
        margin: 0;
        padding: 0 0.15rem 3.5rem 0.15rem;
        background-color: #faf8ef;
        li {
            list-style: none;
            flex: 0 0 50%;
            box-sizing: border-box;
            padding: 0.2rem 0.1rem;
            img {
                width: 100%;
            }
            .sy-content {
                line-height: 1.2rem;
                padding: 0.4rem 0;
                .sy-title {
                    padding-top: 0.2rem;
                    font-size: 0.7rem;
                    color: black;
                    font-weight: bold;
                }
                .sy-text {
                    color: #8f8f8f;
                    font-size: 0.6rem;
                }
            }
        }
    }
    .sy-nodata {
        background-color: #faf8ef;
        padding: 4rem 0 5rem 0;
        .sy-cry {
            font-size: 4.2rem;
        }
    }

    .sy-loadbottom {
        background-color: #faf8ef;
    }
}
</style>

