<template>
    <div class="text-center text-muted padding-top-30 padding-bottom-30">
        <i class="icon icon-Loading1 sy-cry sy-loading"></i>
    </div>
</template>
<script>
export default {
    name: "jzloading"
};
</script>
<style lang="scss" scoped>
.sy-cry {
    font-size: 50px;
}
.sy-loading {
    display: inline-block;
    animation: loading 1s linear infinite;
    @keyframes loading {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
}
</style>

