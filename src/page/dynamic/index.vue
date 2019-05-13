<template>
    <div>
        <div class="sy-dynamic"></div>
        <sy-footer></sy-footer>
    </div>
</template>
<script>
import action from "@/assets/utils/action.js";
import syFooter from "@/page/public/footer";
export default {
    name: "dynamic",
    data() {
        return {};
    },
    components: { syFooter },
    created() {
        action.productClassify().then(res => {
            console.log(res);
        });
    }
};
</script>

