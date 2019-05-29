<template>
    <div class="sy-search">
        <mt-popup style="height:100%;width:101%;background-color:white;" v-model="popupVisible" position="bottom">
            <div style="height:100%;width:100%;">
                <div style="margin-top:60px;">
                    <div class="sy-cell" v-if="!hasFocus">
                        <mt-cell class="sy-mt-cell" v-for="(item,index) in typeLei" @click.native="handleUrl(item.id)"
                            is-link :key="index">
                            <div slot="title">
                                <span>{{ item.name }}</span>
                            </div>
                        </mt-cell>
                    </div>
                    <div class="menu-search tree_con_focus" id="i_con_search">
                        <i class="icon icon-search2"></i>
                        <input placeholder="搜索" type="text" v-model="value" class="form-control" @focus="inputFocus"
                            @keyup.enter="inputBlur(true)">
                        <span v-if="hasFocus" class="searchDelete" @click.self="searchInput">搜索</span>
                    </div>
                </div>
            </div>
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
    watch: {
        popupVisible(newValue) {
            if (!newValue) {
                this.closeSearch();
            }
        }
    },
    methods: {
        inputFocus() {
            document.querySelector("#i_con_search").scrollIntoView(true);
            window.scrollTo(0, 0);
            this.hasFocus = true;
            $("#i_con_search").removeClass("tree_con_focus");
            $("#i_con_search").addClass("search-focus-top");
            $("#i_con_search").removeClass("search-focus-bottom");
            $("#i_con_search input").removeAttr("placeholder");
            $("#i_con_search").css({
                "border-bottom": "1px solid #687378"
            });
        },
        inputBlur(val) {
            $(".sy-header").removeClass("fadeInDown");
            $(".sy-header").removeClass("fadeOutUp");
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
}
</style>
<style lang="scss">
.sy-cell {
    .sy-mt-cell {
        .mint-cell-title {
            font-size: 1rem;
            padding-left: 0.8rem;
            font-weight: 700;
        }
    }
    .mint-cell-wrapper {
        background-size: 0;
        text-align: left;
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
    .mint-cell:last-child {
        background-image: none;
    }
}

.search-focus-bottom {
    bottom: 60px;
}
.search-focus-top {
    top: 80px;
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

