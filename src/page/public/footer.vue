<template>
    <div class="sy-footer">
        <ul>
            <li class="li-border-bottom" @click="handleClick('contact')">联系我们</li>
            <li class="li-border-bottom" @click="handleClick('brand')">品牌招聘</li>
            <li class="li-border-bottom" @click="handleClick('member')">会员招募</li>
            <li>
                <div>招商申请</div>
                <img src="../../assets/code.png" width="100rem" height="100px">
            </li>
        </ul>
        <div class="copy-footer">
            pierre cardin Home.版权所有 Copyright &copy;皮尔卡丹
            <a href="http://www.miibeian.gov.cn" target="blank">沪ICP备18041453号</a>
        </div>
    </div>
</template>
<script>
export default {
    name: "sy-footer",
    data() {
        return {};
    },
    methods: {
        handleClick(type) {
            let url = "";
            switch (type) {
                case "contact":
                    url = "contact";
                    break;
                case "brand":
                    url = "brand";
                    break;
                case "member":
                    url = "member";
                    break;
            }
            if (this.$route.name == url) return;
            this.$router.push({
                name: url
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.sy-footer {
    width: 100%;
    background-color: #687378;
    ul {
        margin: 0;
        padding: 0;
        width: 100%;
        li {
            padding: 0 5px;
            width: 100%;
            list-style: none;
            color: #fbf8f1;
            font-size: 0.85rem;
            line-height: 3.7rem;
        }
        .li-border-bottom {
            border-bottom: 1px solid #535d63;
        }
    }
    .copy-footer {
        font-size: 0.2rem;
        border-top: 1px solid #535d63;
        color: #c5cace;
        line-height: 56px;
    }
}
</style>

