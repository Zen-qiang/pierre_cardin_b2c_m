<template>
    <div>
        <header class="sy-header">
            <div class="sy-back" style="margin:auto">
                <div class="text-left sy-inline sy-left" @click="handleHome">
                    <img v-if="!showBack" src="../../assets/img/logos.png" width="27rem" height="27rem" alt>
                    <mt-button v-if="showBack" class="sy-button" icon="back" @click="handleBack"></mt-button>
                </div>
                <div class="text-center sy-inline sy-center" @click="handleHome">
                    <img src="../../assets/logo.png" width="150rem" height="20rem" alt>
                </div>
                <div class="text-right sy-inline sy-left">
                    <i class="icon icon-gengduo1 sy-ziti" @click="handleSearch"></i>
                </div>
                <search :popupVisible="popupVisible" @CB-popupVisible="CB_popupVisible"></search>
            </div>
        </header>
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
        },
        CB_popupVisible(val) {
            this.popupVisible = false;
        }
    }
};
</script>
<style lang="scss" scoped>
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
    border: 0.05rem solid #ededed;
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
    padding-top: 0.6rem;
    padding-right: 0.4rem;
    display: inline-block;
}
.sy-left {
    vertical-align: middle;
    width: 20%;
    text-align: rigth;
    .sy-ziti {
        font-size: 28px;
    }
}
.sy-center {
    width: 60%;
    vertical-align: middle;
    padding-top: 10px;
}
.sy-button {
    border: none;
}
</style>

