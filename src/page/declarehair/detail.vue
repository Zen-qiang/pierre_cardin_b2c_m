<template>
    <div>
        <div id="nodata" style="height:60px;"></div>
        <div :style="{'min-height':cliHeight+'px'}" class="sy-declarehair_detail">
            <h4 class="text-left padding-left-20 padding-top-20">{{info.title}}</h4>
            <div class="padding-bottom-40">
                <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page" class="padding-bottom-5"></canvas>
            </div>
        </div>
        <sy-footer></sy-footer>
    </div>
</template>
<script>
import action from "@/assets/utils/action.js";
import syFooter from "@/page/public/footer";
import PDFJS from "pdfjs-dist";

export default {
    name: "declarehair_detail",
    data() {
        return {
            info: {
                title: ""
            },
            pdfDoc: null,
            pages: 0
        };
    },
    components: { syFooter },
    mounted() {
        document.querySelector("#nodata").scrollIntoView(true);
        this.getRead();
    },
    methods: {
        //读取数据源
        getRead() {
            action.magazineDetail(this.$route.params.id).then(res => {
                this.info = res.magazineDetail.data[0];
                if (this.info.pdf_url) {
                    this.loadFile(this.BaseUrl + this.info.pdf_url);
                }
            });
        },
        renderPage(num) {
            let _this = this;
            this.pdfDoc.getPage(num).then(function(page) {
                let canvas = document.getElementById("the-canvas" + num);
                let ctx = canvas.getContext("2d");
                let dpr = window.devicePixelRatio || 1;
                let bsr =
                    ctx.webkitBackingStorePixelRatio ||
                    ctx.mozBackingStorePixelRatio ||
                    ctx.msBackingStorePixelRatio ||
                    ctx.oBackingStorePixelRatio ||
                    ctx.backingStorePixelRatio ||
                    1;
                let ratio = dpr / bsr;
                var viewport = page.getViewport(
                    screen.availWidth / page.getViewport(1).width
                );
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                canvas.style.width = viewport.width + "px";
                canvas.style.height = viewport.height + "px";
                ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                page.render(renderContext);
                if (_this.pages > num) {
                    _this.renderPage(num + 1);
                }
            });
        },
        loadFile(url) {
            let _this = this;
            PDFJS.getDocument(url).then(function(pdf) {
                _this.pdfDoc = pdf;
                _this.pages = _this.pdfDoc.numPages;
                _this.$nextTick(() => {
                    _this.renderPage(1);
                });
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.sy-declarehair_detail {
    img {
        width: 100%;
    }
    canvas {
        display: block;
    }
}
</style>

