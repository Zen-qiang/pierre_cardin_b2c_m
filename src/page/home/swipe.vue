<template>
    <div class="sy-swiper" v-if="swipeData.length>0">
        <div id="slideshow" :style="{'height':height+'px'}">
            <img v-for="(item,index) in swipeData" :key="index" v-lazy="BaseUrl + item.image" style="margin-left:-80%;margin-rightL-20%"
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
            height: 0
        };
    },
    mounted() {
        this.slideshow();
    },
    methods: {
        slideshow() {
            var slideshow = document.getElementById("slideshow");
            var imgs = slideshow.getElementsByTagName("img"); //得到图片们
            var pages = slideshow.getElementsByTagName("span"); //得到页码们
            var current = 0; //current为当前活跃的图片编号

            function slideOff() {
                for (let i = 0; i < pages.length; i++) {
                    pages[i].className = "";
                }
                imgs[current].className = ""; //图片淡出
            }
            function slideOn() {
                imgs[current].className = "active"; //图片淡入
                pages[current].className = "active";
            }
            slideOff();
            slideOn();
            function changeSlide() {
                //切换图片的函数
                slideOff();
                current++; //自增1
                if (current >= 3) current = 0;
                slideOn();
            }

            //每6s调用changeSlide函数进行图片轮播
            var slideon = setInterval(changeSlide, 6000);

            slideshow.touchmouve = function() {
                changeSlide();
                clearInterval(slideon); //当鼠标移入时清除轮播事件
            };
            slideshow.touchend = function() {
                slideon = setInterval(changeSlide, 6000); //当鼠标移出时重新开始轮播事件
            };

            for (var i = 0; i < pages.length; i++) {
                //定义鼠标移入和移出页码事件
                pages[i].touchstart = function() {
                    slideOff(); //图片淡出
                    current = this.innerHTML - 1; //得到鼠标停留的页码对应的current
                    slideOn(); //图片淡出
                };
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
            transition: opacity 3s linear;
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
        }
        & span.active {
            opacity: 0.8;
            background: white;
        }
    }
}
</style>

