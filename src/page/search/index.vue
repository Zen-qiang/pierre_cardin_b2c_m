<template>
    <div class="sy-search">
        <mt-popup style="height:100%;width:101%;background-color:white;" v-model="popupVisible" position="bottom">
            <header class="sy-header">
                <div class="sy-back" style="margin:auto">
                    <div class="text-left sy-inline sy-left sy-right" @click="handleHome">
                        <img src="../../assets/img/logos.png" width="27rem" height="27rem" alt>
                    </div>
                    <div class="text-center sy-inline sy-center" @click="handleHome">
                        <img src="../../assets/logo.png" width="150rem" height="20rem" alt>
                    </div>
                    <div class="text-right sy-inline sy-left sy-menu">
                        <i class="icon icon-error3 sy-ziti" @click="handleClose"></i>
                    </div>
                </div>
            </header>
            <div :style="{'height':showHeight+'px'}">
                <div class="sy-cell" v-if="!hasFocus">
                    <mt-cell class="sy-mt-cell" v-for="(item,index) in typeLei" @click.native="handleUrl(item.id)"
                        is-link :key="index">
                        <div slot="title">
                            <span>{{ item.name }}</span>
                        </div>
                    </mt-cell>
                </div>
                <div class="menu-search tree_con_focus" id="i_con_search">
                    <!-- <img src="../../../static/search.png" /> -->
                    <i class="icon icon-search2"></i>
                    <input placeholder="搜索" type="text" v-model="value" class="form-control" @focus="inputFocus"
                        @keyup.enter="inputBlur(true)">
                    <span v-if="hasFocus" class="searchDelete" @click.self="searchInput">搜索</span>
                </div>
            </div>

            <!-- <mt-search v-model="value" @focus="handleFocus"></mt-search> -->

        </mt-popup>
    </div>
</template>
<script>
import $ from "jquery";
export default {
    name: "search",
    props: {
        popupVisible: { type: Boolean }
    },
    data() {
        return {
            hasFocus: false,
            showHeight: 0,
            typeLei: [
                {
                    id: 1,
                    name: "商品展示",
                    path: ""
                },
                {
                    id: 2,
                    name: "家居顾问",
                    path: ""
                },
                {
                    id: 3,
                    name: "品牌宣发",
                    path: ""
                },
                {
                    id: 4,
                    name: "会员招募",
                    path: "/member"
                },
                {
                    id: 5,
                    name: "城市合伙人",
                    path: ""
                }
            ],
            value: ""
        };
    },
    mounted() {
        $("#i_con_search").addClass("search-focus-bottom");
        this.showHeight = JSON.parse(JSON.stringify(this.cliHeight));
    },
    methods: {
        inputFocus() {
            $("input").on("focus", function() {
                window.scroll(0, 0);
            });
            this.hasFocus = true;
            // console.log("获取焦点");
            $("#i_con_search").removeClass("tree_con_focus");
            $("#i_con_search").addClass("search-focus-top");
            $("#i_con_search").removeClass("search-focus-bottom");
            $("#i_con_search input").removeAttr("placeholder");
            $("#i_con_search").css({
                "border-bottom": "1px solid #687378"
            });
        },
        inputBlur(val) {
            // console.log("失去焦点");
            if (val) {
                this.searchText();
            }
            this.closeSearch();
        },
        searchInput() {
            if (this.value) {
                this.searchText();
            }
            this.closeSearch();
        },
        closeSearch() {
            $("#i_con_search").addClass("tree_con_focus");
            $("#i_con_search").removeClass("search-focus-top");
            $("#i_con_search input").attr("placeholder", "搜索");
            $("#i_con_search").css({ "border-bottom": 0 });
            this.hasFocus = false;
            this.value = "";
        },
        searchText() {
            this.$router.push({
                path: "/search",
                query: {
                    keys: this.value
                }
            });
            this.$emit("CB-popupVisible");
        },
        handleClose() {
            this.closeSearch();
            this.$emit("CB-popupVisible");
        },
        //返回首页
        handleHome() {
            if (this.$route.name == "home") {
                this.$emit("CB-popupVisible");
            } else {
                this.$router.push({
                    name: "home"
                });
            }
        },
        handleUrl(id) {
            switch (id) {
                case 1:
                    if (this.$route.name != "home") {
                        this.$router.push({
                            name: "home"
                        });
                    }
                    this.$store.commit("setIsLocation", true);
                    this.$emit("CB-popupVisible");
                    break;
                case 2:
                    this.$router.push({
                        name: "furnishing_index"
                    });
                    break;
                case 3:
                    this.$router.push({
                        name: "declarehair_index"
                    });
                    break;
                case 4:
                    this.$router.push({
                        name: "member"
                    });
                    break;
                case 5:
                    window.open(this.BaseUrl + "/im");
                    break;
            }
            this.$emit("CB-popupVisible");
        }
    }
};
</script>
<style lang="scss" scoped>
.sy-search {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    // border-bottom: 0.01rem solid #e0eeee;
    .sy-header {
        top: 0;
        right: 0;
        left: 0;
        position: fixed;
        z-index: 1;
        background-color: #fff;
        color: black;
        height: 60px;
        -webkit-box-align: center;
        align-items: center;
        box-sizing: border-box;
        display: fixed;
        font-size: 14px;
        line-height: 1;
        padding: 0 10px;
        text-align: center;
        white-space: nowrap;
        border-bottom: 0.01rem solid #e0eeee;
    }
    .sy-back {
        width: 100%;
        text-align: left;
        -webkit-box-flex: 5;
        flex: 5;
        .mint-button--default {
            background-color: #fff;
            box-shadow: none;
            font-weight: 600;
        }
        .mint-button--normal {
            padding: 0;
            margin: 0;
        }
        .mint-button {
            height: 21px;
        }
    }
    .sy-right {
        margin-top: 0.45rem;
        padding-left: 0.2rem;
    }
    .sy-inline {
        padding-top: 0.6rem;
        padding-right: 0.6rem;
        display: inline-block;
    }
    .sy-menu {
        padding-top: 0.5rem !important;
    }
    .sy-left {
        vertical-align: middle;
        width: 20%;
        .sy-ziti {
            font-size: 1.4rem;
            padding-right: 0.2rem;
        }
    }
    .sy-center {
        width: 60%;
        vertical-align: middle;
        padding-top: 11px;
        padding-right: 0.5rem;
    }
}
</style>
<style lang="scss">
.sy-cell {
    padding-top: 60px;
    .sy-mt-cell {
        .mint-cell-title {
            font-size: 1rem;
            padding-left: 0.8rem;
            font-weight: 600;
        }
    }
    .mint-cell-wrapper {
        background-size: 0;
    }
    .mint-cell-allow-right::after {
        border: solid 1px black;
        width: 9px;
        height: 9px;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        top: 50%;
        right: 20px;
        position: absolute;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
    }
}
.search-focus-top {
    top: 80px;
}
.search-focus-bottom {
    bottom: 60px;
}
.menu-search {
    // width: 60%;
    position: absolute;
    margin-left: 20px;
    margin-right: 1.5rem;
    // .input-group-prepend {
    //     width: 35px !important;
    // }
    & .icon-search2 {
        font-size: 25px;
        margin: 0;
        position: relative;
        left: 0;
        bottom: -0.15rem;
    }
    & .searchDelete {
        font-size: 20px !important;
        width: 24px;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
    }
    input {
        margin-left: 0;
        padding: 0;
        border: none;
        outline: none;
    }
    & input:hover {
        border: none !important;
    }
    & .form-control {
        border-radius: 0 !important;
        border: none !important;
        font-size: 18px !important;
        color: #000 !important;
        width: 200px;
        height: 40px !important;
        padding: 0 10px !important;
        padding-left: 10px;
    }
    & .form-control:focus {
        border-radius: 0 !important;
        border: none !important;
        box-shadow: 0 0 0 0 !important;
    }
    & .form-control::placeholder {
        font-size: 1.3rem !important;
        color: #000 !important;
        line-height: 1.3rem !important;
    }
}
.tree_con_focus {
    // position: relative !important;
    bottom: 60px;
}
</style>

