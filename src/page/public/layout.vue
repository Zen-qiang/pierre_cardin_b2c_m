<template>
    <div id="layout">
        <syHeader id="sy-header" :scrollObj="scrollObj" :topheader="topheader" @CB-Header="CB_Header" class="no-margin no-padding"></syHeader>
        <!-- <div id="nodata" style="height:60px" v-if="scrollObj.direction=='up'||scrollObj.direction==''"></div> -->
        <transition :style="{'min-height':cliHeight+'px'}">
            <div @touchstart="touchStart" @touchmove="touchMove" style="padding-top:60px;">
                <router-view :key="$route.name" id="layouts" />
            </div>
        </transition>
    </div>
</template>

<script>
import syHeader from "@/page/public/header";
import $ from "jquery";

export default {
    name: "layout",
    components: { syHeader },
    data() {
        return {
            startX: 0,
            startY: 0,
            moveEndX: 0,
            moveEndY: 0,
            X: 0,
            Y: 0,
            scrollObj: {
                scrollTop: 0,
                direction: ""
            },
            toppop: false,
            topheader: false
        };
    },
    watch: {
        $route(newValue) {
            if (newValue) {
                // document.querySelector("#nodata").scrollIntoView(true);
                this.scrollObj = {
                    scrollTop: 0,
                    direction: ""
                };
            }
        }
    },
    methods: {
        touchStart(e) {
            this.startX = e.touches[0].pageX;
            this.startY = e.touches[0].pageY;
        },
        touchMove(e) {
            if ($("#layout").offset().top > -60) {
                this.scrollObj = {
                    scrollTop: 0,
                    direction: ""
                };
                if ($("#layout").offset().top >= 0) {
                    this.topheader = true;
                }
                return;
            }
            this.topheader = false;
            if (this.toppop) return;
            this.moveEndX = e.changedTouches[0].pageX;
            this.moveEndY = e.changedTouches[0].pageY;
            this.X = this.moveEndX - this.startX;
            this.Y = this.moveEndY - this.startY;
            if (Math.abs(this.Y) > Math.abs(this.X) && this.Y > 0) {
                this.scrollObj = {
                    scrollTop: 0,
                    direction: "up"
                };
            } else if (Math.abs(this.Y) > Math.abs(this.X) && this.Y < 0) {
                this.scrollObj = {
                    scrollTop: 0,
                    direction: "down"
                };
            }
        },
        CB_Header(val) {
            this.toppop = val;
            if (val) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
        }
    }
};
</script>
<style lang="scss">
#layout {
    margin: 0;
}
</style>

