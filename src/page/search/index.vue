<template>
    <div class="sy-search">
        <mt-popup style="height:100%;width:100%;background-color:white" v-model="popupVisible" position="bottom">
            <header class="sy-header">
                <div class="sy-back" style="margin:auto">
                    <div class="text-left sy-inline sy-left" @click="handleHome">
                        <img src="../../assets/img/logos.png" width="27rem" height="27rem" alt>
                    </div>
                    <div class="text-center sy-inline sy-center" @click="handleHome">
                        <img src="../../assets/logo.png" width="150rem" height="20rem" alt>
                    </div>
                    <div class="text-right sy-inline sy-left">
                        <i class="icon icon-error3 sy-ziti" @click="handleClose"></i>
                    </div>
                </div>
            </header>
            <div :style="{'height':cliHeight+46+'px'}">
                <div class="sy-cell">
                    <mt-cell class="sy-mt-cell" v-for="(item,index) in typeLei" @click.native="handleUrl(item.id)"
                        is-link :key="index">
                        <div slot="title">
                            <span>{{ item.name }}</span>
                        </div>
                    </mt-cell>
                </div>
                <div class="sy-searchs">
                    <mt-search v-model="value"></mt-search>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
export default {
    name: "search",
    props: {
        popupVisible: { type: Boolean }
    },
    data() {
        return {
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
    methods: {
        handleClose() {
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
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    this.$router.push({
                        name: "member"
                    });
                    break;
                case 5:
                    window.open(this.BaseUrl + "/lab/business.html");
                    break;
            }
            this.$emit("CB-popupVisible");
        }
    }
};
</script>
<style lang="scss" scoped>
.sy-search {
    border-bottom: 0.01rem solid #e0eeee;
    .sy-header {
        top: 0;
        right: 0;
        left: 0;
        position: fixed;
        z-index: 1;
        background-color: #fff;
        color: black;
        height: 46px;
        -webkit-box-align: center;
        align-items: center;
        box-sizing: border-box;
        display: fixed;
        font-size: 14px;
        line-height: 1;
        padding: 0 10px;
        text-align: center;
        white-space: nowrap;
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
    .sy-inline {
        padding-top: 10px;
        padding-right: 10px;
        display: inline-block;
    }
    .sy-left {
        vertical-align: middle;
        width: 20%;
        .sy-ziti {
            font-size: 1.3rem;
            padding-right: 0.2rem;
        }
    }
    .sy-center {
        width: 60%;
        vertical-align: middle;
        padding-top: 10px;
    }
}
</style>
<style lang="scss">
.sy-cell {
    padding-top: 46px;
    .sy-mt-cell {
        .mint-cell-title {
            font-size: 0.9rem;
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
    .sy-searchs {
        background-color: #fff;
        .mint-searchbar {
            background-color: #fff;
            .mintui-search {
                font-size: 21px;
                color: black;
            }
            .mint-searchbar-core {
                font-size: 18px;
                color: black;
                padding-left: 10px;
            }
        }
    }
}
</style>

