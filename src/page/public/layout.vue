<template>
    <div id="layout">
        <syHeader @CB-Header="CB_Header" id="sy-header"></syHeader>
        <transition :style="{'min-height':cliHeight+'px'}">
            <router-view :key="$route.name" id="layouts" />
        </transition>
    </div>
</template>

<script>
import $ from "jquery";
import syHeader from "@/page/public/header";
var windowTop = 667;
window.addEventListener("touchmove", function(e) {
    if (e.targetTouches[0].pageY < windowTop) {
        if (e.targetTouches[0].pageY > 60) {
            $("#sy-header").css("display", "none");
        }
        windowTop = e.targetTouches[0].pageY;
    } else if (e.targetTouches[0].pageY > windowTop) {
        if ($("#sy-header").css("display") == "block") {
            windowTop = e.targetTouches[0].pageY;
            return;
        }
        $("#sy-header").css("display", "block");
        windowTop = e.targetTouches[0].pageY;
    }
});
export default {
    name: "layout",
    components: { syHeader },
    watch: {
        $route(newValue) {
            if (newValue) {
                $("#sy-header").css("display", "block");
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

