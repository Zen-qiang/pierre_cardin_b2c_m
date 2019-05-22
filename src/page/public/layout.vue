<template>
    <div id="layout">
        <syHeader @CB-Header="CB_Header" class="no-margin no-padding"></syHeader>
        <transition :style="{'min-height':cliHeight+'px'}">
            <router-view :key="$route.name" id="layouts" />
        </transition>
    </div>
</template>

<script>
import syHeader from "@/page/public/header";

export default {
    name: "layout",
    components: { syHeader },

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

