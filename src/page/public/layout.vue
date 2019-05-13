<template>
    <div id="layout">
        <syHeader></syHeader>
        <transition>
            <router-view />
        </transition>
    </div>
</template>

<script>
import syHeader from "@/page/public/header";
export default {
    name: "layout",
    components: { syHeader }
};
</script>
<style lang="scss">
#layout {
    margin: 0;
    padding: 0;
}
</style>

