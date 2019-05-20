<template>
    <div id="layout">
        <syHeader @CB-Header="CB_Header"></syHeader>
        <keep-alive>
            <router-view :key="$route.name" />
        </keep-alive>
    </div>
</template>

<script>
import syHeader from "@/page/public/header";
export default {
    name: "layout",
    components: { syHeader },
    activated() {
        document.getElementById("layout").scrollTop = 0;
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
    // overflow: scroll;
}
</style>

