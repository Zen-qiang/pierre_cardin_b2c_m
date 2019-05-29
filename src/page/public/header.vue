<template>
    <div>
        <header class="sy-header">
            <div class="sy-headerpage" :class="scrollObj.direction">
                <div class="sy-back" :class="popupVisible?'sy-backs':''" style="margin:auto">
                    <div class="text-left sy-inline sy-left sy-right" @click="handleHome">
                        <img v-if="!showBack" src="../../assets/img/logos.png" width="27rem" height="27rem" alt>
                        <mt-button v-if="showBack" class="sy-button" icon="back" @click="handleBack"></mt-button>
                    </div>
                    <div class="text-center sy-inline sy-center" @click="handleHome">
                        <img src="../../assets/logo.png" width="188rem" height="25rem" alt>
                    </div>
                    <div class="text-right sy-inline sy-left sy-menu">
                        <i v-if="!popupVisible" class="icon icon-menu sy-ziti" @click="handleSearch"></i>
                        <i v-else class="icon icon-error3 sy-zitis" @click="handleClose"></i>
                    </div>
                </div>
            </div>
        </header>
        <search :popupVisible="popupVisible" @CB-popupVisible="CB_popupVisible"></search>
    </div>
</template>
<script>
import { mapState } from "vuex";
import Search from "@/page/search/index";
export default {
    name: "sy-header",
    data() {
        return {
            popupVisible: false
        };
    },
    props: {
        scrollObj: {
            type: Object
        },
        topheader: { type: Boolean }
    },
    components: { Search },
    computed: {
        ...mapState(["showBack"])
    },
    methods: {
        handleBack() {
            this.$router.go(-1);
        },
        //返回首页
        handleHome() {
            if (this.$route.name == "home") return;
            this.$router.push({
                name: "home"
            });
        },
        handleSearch() {
            this.popupVisible = true;
            this.$emit("CB-Header", this.popupVisible);
        },
        handleClose() {
            this.popupVisible = false;
            this.$emit("CB-Header", this.popupVisible);
        },
        CB_popupVisible(val) {
            this.popupVisible = false;
            this.$emit("CB-Header", this.popupVisible);
        }
    }
};
</script>
<style lang="scss" scoped>
.sy-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 9999;
    margin: 0;
    padding: 0;
    background-color: #fff;
    color: black;
    overflow-x: hidden;
    height: 60px;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    font-size: 1.2rem;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    background-color: transparent;
}
.sy-backs {
    padding-top: 0.65rem !important;
}
.sy-back {
    width: 100%;
    text-align: left;
    -webkit-box-flex: 5;
    padding-top: 0.4rem;
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
    padding-top: 0.5rem;
    padding-right: 0.5rem;
    display: inline-block;
}
.sy-menu {
    padding-top: 0.4rem !important;
}
.sy-left {
    vertical-align: middle;
    width: 15%;
    text-align: rigth;
    .sy-ziti {
        font-size: 36px;
    }
    .sy-zitis {
        font-size: 1.4rem;
        padding-right: 0.2rem;
    }
}
.sy-center {
    width: 70%;
    vertical-align: middle;
    padding-top: 0.5rem;
}
.sy-button {
    border: none;
}
.sy-headerpage {
    position: relative;
    top: 0;
    height: 60px;
    width: 100%;
    padding: 0 10px;
    border-bottom: 0.05rem solid #ededed;
    background-color: #fff;
    transition: background-color 200ms cubic-bezier(0.645, 0.045, 0.355, 1),
        border 300ms cubic-bezier(0.645, 0.045, 0.355, 1),
        color 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
    &.down {
        top: -60px;
        background-color: #fff;
        left: 0;
        position: fixed;
        transition: top 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    &.up {
        top: 0;
        background-color: #fff;
        left: 0;
        position: fixed;
        transition: top 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
    }
}
</style>

