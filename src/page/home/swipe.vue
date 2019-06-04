<template>
    <div class="sy-swiper" v-if="swipeData.length>0">
        <div id="slideshow" :style="{'height':height+'px'}">
            <img v-for="(item,index) in swipeData" :key="index" :src="BaseUrl + item.image" @click="handleDetail"
                @touchend="slideshow(true,$event)" @touchstart="touchStart" style="margin-left:-80%;margin-right-20%"
                alt="">
            <div class="sy-punctuation">
                <span v-for="(item,index) in swipeData.length" :key="index" class="active"></span>
            </div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";

export default {
    name: "swiper",
    props: {
        swipeData: {
            type: Array
        }
    },
    beforeMount: function() {
        this.height = ($(window).width() * 664) / 435;
    },
    data() {
        return {
            height: 0,
            currentPage: 0,
            startX: 0,
            startY: 0,
            endY: 0,
            endX: 0,
            X: 0,
            Y: 0,
            jstime: new Date().getTime(),
            slideon: 0
        };
    },
    mounted() {
        this.slideshow(false);
    },
    methods: {
        //查看详情
        handleDetail() {
            this.$router.push({
                path: "/swipe_detail",
                query: {
                    id: this.swipeData[this.currentPage].id
                }
            });
        },
        //滑动开始
        touchStart(e) {
            this.startX = e.touches[0].pageX;
            this.startY = e.touches[0].pageY;
        },
        //滑动幻灯片
        slideshow(val, e) {
            let _this = this;
            if (e) {
                this.endX = e.changedTouches[0].pageX;
                this.endY = e.changedTouches[0].pageY;
            }
            this.X = this.endX - this.startX;
            this.Y = this.endY - this.startY;
            var slideshow = document.getElementById("slideshow");
            var imgs = slideshow.getElementsByTagName("img"); //得到图片们
            var pages = slideshow.getElementsByTagName("span"); //得到页码们
            var current = 0; //current为当前活跃的图片编号

            function slideOff() {
                for (let i = 0; i < pages.length; i++) {
                    pages[i].className = "";
                    imgs[i].className = "";
                }
            }
            function slideOn(val) {
                if (val) {
                    imgs[val].className = "active"; //图片淡入
                    pages[val].className = "active";
                } else {
                    imgs[current].className = "active"; //图片淡入
                    pages[current].className = "active";
                }
                _this.currentPage = val && val != undefined ? val : current;
            }
            if (!val) {
                slideOff();
                slideOn();
            }
            if (!val) {
                this.slideon = setInterval(changeSlide, 5000); //每5s调用changeSlide函数进行图片轮播
            }
            function changeSlide() {
                current = _this.currentPage;
                //切换图片的函数
                slideOff();
                current++; //自增1
                if (current >= 3) current = 0;
                slideOn();
            }
            if (val) {
                window.clearInterval(this.slideon);
            }
            if (val) {
                for (var i = 0; i < pages.length; i++) {
                    if (pages[i].className == "active") {
                        _this.currentPage = i;
                    }
                }
                //定义鼠标移入和移出页码事件
                pages[_this.currentPage].ontouchend = function() {
                    slideOff(); //图片淡出
                    if (Math.abs(_this.X) > Math.abs(_this.Y) && _this.X < 0) {
                        _this.currentPage++;
                        if (_this.currentPage >= 3) {
                            _this.currentPage = 0;
                        }
                    } else if (
                        Math.abs(_this.X) > Math.abs(_this.Y) &&
                        _this.X > 0
                    ) {
                        _this.currentPage--;
                        if (_this.currentPage < 0) {
                            _this.currentPage = 2;
                        }
                    }
                    slideOn(_this.currentPage); //图片淡出
                };
                pages[_this.currentPage].ontouchend();
                this.slideon = setInterval(changeSlide, 5000);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.sy-swiper {
    #slideshow {
        margin: 0 auto; /*设置在页面水平居中*/
        overflow: hidden;
        position: relative;
        img {
            height: 100%;
            // object-fit: cover;
            position: absolute; /*图片采取绝对定位，均位于左上角，重叠在一起*/
            top: 0;
            left: 0;
            opacity: 0; /*初始不透明度为0，图片都看不见*/
            transition: opacity 1s linear;
        }
        & img.active {
            opacity: 1; /*有active类的图片不透明度为1，即显示图片*/
        }
        .sy-punctuation {
            position: absolute;
            bottom: 2.5rem;
            left: 38%;
            //
        }
        span {
            width: 0.7rem;
            height: 0.7rem;
            display: inline-block;
            line-height: 25px; /*当只有一行文本时height等于line-height*/
            border-radius: 25px; /*设置页码为圆形*/
            margin: 0 0.6rem;
            background: black;
            font-size: 1.15rem;
            opacity: 0.7;
        }
        & span.active {
            opacity: 0.8;
            background: white;
        }
    }
}
</style>

