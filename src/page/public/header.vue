<template>
    <div>
        <header class="sy-header">
            <div class="sy-back" style="margin:auto">
                <div class="text-left sy-inline sy-left sy-right" @click="handleHome">
                    <img v-if="!showBack" src="../../assets/img/logos.png" width="27rem" height="27rem" alt>
                    <mt-button v-if="showBack" class="sy-button" icon="back" @click="handleBack"></mt-button>
                </div>
                <div class="text-center sy-inline sy-center" @click="handleHome">
                    <img src="../../assets/logo.png" width="150rem" height="20rem" alt>
                </div>
                <div class="text-right sy-inline sy-left sy-menu">
                    <i class="icon icon-menu sy-ziti" @click="handleSearch"></i>
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
    background-color: #fff;
    color: black;
    height: 60px;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
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
    padding-top: 0.1rem;
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
    padding-right: 0.5rem;
    display: inline-block;
}
.sy-right {
    margin-top: 0.5rem;
}
.sy-menu {
    padding-top: 0.5rem !important;
}
.sy-left {
    vertical-align: middle;
    width: 20%;
    text-align: rigth;
    margin-top: 0.15rem;
    .sy-ziti {
        font-size: 36px;
    }
}
.sy-center {
    width: 60%;
    vertical-align: middle;
    padding-top: 8px;
}
.sy-button {
    border: none;
}
</style>

