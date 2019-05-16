<template>
    <div class="sy-page">
        <h3>产品系列</h3>
        <ul v-if="chanpinData.length>0&&!jzloading">
            <li class="sy-li" v-for="(item,index) in chanpinData" :key="index" @click="handleClick(item.id)">
                <img :src="item.img_url" :style="{'height':height +'px'}" style="margin-left:-50%;margin-right:-50%;"
                    alt>
                <p>
                    <span class="sy-ziti">{{item.name}}</span>
                </p>
            </li>
        </ul>
        <jz-loading v-else></jz-loading>
    </div>
</template>
<script>
import $ from "jquery";
import JzLoading from "@/components/loading";
export default {
    name: "product",
    data() {
        return {
            jzloading: false,
            height: 0
        };
    },
    props: {
        chanpinData: {
            type: Array
        }
    },
    beforeMount: function() {
        this.height = ($(window).width() * 664) / 1135;
    },
    components: { JzLoading },
    mounted() {},
    methods: {
        handleClick(id) {
            this.$router.push({
                name: "chanpin_index",
                params: {
                    id: id
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.sy-page {
    h3 {
        margin: 1.4rem 0;
        color: black;
    }
    ul {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        width: 100%;
        margin: 0;
        padding: 0 0.1rem;
        .sy-li {
            list-style: none;
            position: relative;
            flex: 0 0 48.8%;
            padding: 0.1rem 0;
            box-sizing: border-box;
            overflow: hidden;
            margin: 0 0.13rem;
            img {
                height: 100%;
                object-fit: cover;
                vertical-align: middle;
            }
            p {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: 0;
                &::before {
                    content: "";
                    display: inline-block;
                    width: 0;
                    height: 100%;
                    vertical-align: middle;
                }
                .sy-ziti {
                    color: white;
                    font-weight: 500;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }
    }
}
</style>

