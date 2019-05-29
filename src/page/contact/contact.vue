<template>
    <div id="concat">
        <div class="sy-contacts">
            <h3 class="sy-context texttitle">联系我们</h3>
            <div class="sy-contact">
                <div class="sy-text">
                    <h4 class="text-left sy-title">全国服务热线</h4>
                    <div class="text-left sy-content">您对 pierre cardin home 产品及网站有任何疑问和建议，都可以拨打全国服务热线：400-188-0127</div>
                </div>
            </div>
            <div class="sy-contact">
                <div class="sy-text">
                    <h4 class="text-left sy-title">E-mail</h4>
                    <div class="text-left sy-content">
                        您在购物及游览过程中有任何疑问及建议，
                        <br>都可以发送Email：pierrecardin@pcc18.vip 给我们，
                        <br>我们将在收到邮件的第一时间给您回复
                    </div>
                </div>
            </div>
            <div class="sy-contact padding-bottom-10">
                <div class="sy-text">
                    <h4 class="text-left sy-title">公司地址</h4>
                    <div class="text-left sy-content">
                        上海市中山北一路1111号2号皮尔·卡丹家居总部
                        <br>65783099/65871122
                    </div>
                </div>
            </div>
            <img src="../../assets/img/contact.jpg" width="100%" alt>
        </div>
        <sy-footer></sy-footer>
    </div>
</template>
<script>
import syFooter from "@/page/public/footer";
export default {
    name: "contact",
    data() {
        return {};
    },
    components: { syFooter }
};
</script>
<style lang="scss" scoped>
.sy-contacts {
    width: 100%;
    line-height: 40px;
    background-color: #faf8ef;
    padding: 0 0.7rem;
    .sy-context {
        text-align: left;
        font-size: 1.3rem;
        margin: 0;
        padding-top: 1rem;
        font-weight: 700;
    }
    .sy-contact {
        h4 {
            color: black;
        }
        .sy-title {
            margin-top: 0px;
            margin-bottom: 8px;
        }
        .sy-content {
            border-top: 1px solid #d7d7cb;
            padding-top: 12px;
            color: #697279;
            line-height: 1.45rem;
            font-size: 0.9rem;
            padding-bottom: 12px;
        }
    }
}
</style>

