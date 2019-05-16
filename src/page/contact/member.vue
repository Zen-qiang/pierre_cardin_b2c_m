<template>
    <div>
        <div class="sy-page">
            <div class="sy-contacts">
                <h3 class="sy-context">会员招募</h3>
            </div>
            <img src="../../assets/img/recruitBanner.jpg" class="margin-top-10 no-padding margin-bottom-10" width="100%"
                alt>
            <div class="sy-contacts">
                <div class="text-left sy-htitle">
                    全新美好生活，
                    <br>从成为 pierre cardin Home 会员开始。
                </div>
                <div class="text-left sy-content" style="padding-top:13px;">从家居趋势资讯到生活哲学，我们将带给你最时新的设计灵感与理念。同时可通过会员独家商品优惠资讯，让你更从容与优雅地获得生活的质感与动人细节。</div>
                <h4 class="text-left sy-title">会员权益</h4>
                <div class="text-left sy-content">作为 pierre cardin Home 俱乐部的会员，你将获得的，不仅仅是优惠特权与福利，你还将全方位的感受到 Pierre
                    Cardin
                    的设计精髓与 Home Etudes 专业资讯报道结合的家居生活分享，从生活哲学到设计趋势，通过专属与你的优惠，实现美好家居生活，感受生活的质感。</div>
                <h4 class="text-left sy-title">更时新的资讯报道</h4>
                <div class="text-left sy-content">与国际最新生活资讯零距离，不论是家居生活方式理念，还是家居设计趋势，你将获得第一手的家居资讯。</div>
                <h4 class="text-left sy-title">更特别的优惠折扣</h4>
                <div class="text-left sy-content padding-bottom-20">随时获得专属于你的 pierre cardin Home 特别折扣。</div>
            </div>
            <img src="../../assets/img/people.jpg" class="sy-img" width="95%" alt>
            <div class="sy-contacts padding-bottom-40">
                <div class="text-left sy-htitle">
                    每个人都拥有感受生活美好、实现理想家居生活的权利。
                    <br>
                    <div class="padding-top-20">"Everyone is given the right to experience the beauty of life,as well
                        as to
                        realize their own ideal life."</div>
                    <div class="pull-right">-- pierre cardin</div>
                    <div style="clear:both" class="padding-bottom-20"></div>
                </div>
            </div>
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
.sy-page {
    background-color: #faf8ef;
    .sy-contacts {
        width: 100%;
        line-height: 40px;
        padding: 0 10px;
        .sy-htitle {
            font-size: 0.95rem;
            color: black;
            font-weight: 700;
            line-height: 23px;
            padding-bottom: 13px;
            border-bottom: 1px solid #e0e0e0;
        }
        .sy-context {
            text-align: left;
            font-size: 1.2rem;
            font-weight: 700;
            padding-top: 25px;
            color: black;
            margin-bottom: 1.2rem;
        }

        .sy-title {
            font-size: 1rem;
            color: #697279;
            margin-bottom: 1rem;
        }
        .mint-button--default {
            background-color: #faf8ef;
        }
        .mint-button {
            font-size: 13px;
        }
        .sy-content {
            padding-top: 0px;
            color: #697279;
            line-height: 1.2rem;
            font-size: 11px;
        }
    }
    .sy-img {
        margin-bottom: 2.8rem;
    }
}
</style>

