<template>
    <div id="layout">
        <syHeader @CB-Header="CB_Header" class="sy-header"></syHeader>
        <transition :style="{'min-height':cliHeight+'px'}">
            <router-view :key="$route.name" id="layouts" />
        </transition>
    </div>
</template>

<script>
import $ from "jquery";
import syHeader from "@/page/public/header";
var windowTop = 0;
window.addEventListener("touchmove", function(e) {
    if (e.targetTouches[0].pageY < windowTop) {
        if (e.targetTouches[0].pageY > 60) {
            if (!$(".sy-heade").hasClass("fadeOutUp")) {
                $(".sy-header").addClass("animated fadeOutUp");
                $(".sy-header").removeClass("fadeInDown");
            } else {
                $(".sy-header").removeClass("fadeInDown");
                $(".sy-header").removeClass("fadeOutUp");
            }
        }
        windowTop = e.targetTouches[0].pageY;
    } else if (e.targetTouches[0].pageY > windowTop) {
        if (!$(".sy-header").hasClass("fadeInDown")) {
            $(".sy-header").addClass("animated fadeInDown");
            $(".sy-header").removeClass("fadeOutUp");
        } else {
            $(".sy-header").removeClass("fadeInDown");
            $(".sy-header").removeClass("fadeOutUp");
        }
        windowTop = e.targetTouches[0].pageY;
    }
});
export default {
    name: "layout",
    components: { syHeader },
    watch: {
        $route(newValue) {
            if (newValue) {
                $(".sy-header").removeClass("fadeInDown");
                $(".sy-header").removeClass("fadeOutUp");
            }
        }
    },
    methods: {
        CB_Header(val) {
            if (val) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
        },
        preventDefaultFn(event) {
            event.preventDefault();
        }
    }
};
</script>
<style lang="scss">
#layout {
    margin: 0;
    padding: 0;
    -webkit-overflow-scrolling: touch;
}
</style>

