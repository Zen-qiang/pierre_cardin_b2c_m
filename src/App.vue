<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import $ from "jquery";
export default {
    name: "App"
};
// eslint-disable-next-line one-var
var windowHeight = $(window).height(),
    $body = $("body");
$body.css("height", windowHeight);
</script>
<style lang="scss">
@font-face {
    font-family: "Helveticas";
    src: url("../static/fonts/Helvetica.ttf");
}
html,
body {
    height: 100%;
    overflow: auto;
}
body {
    margin: 0;
    padding: 0;
    // position: fixed;
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
}

#app {
    font-family: "Helveticas", "Avenir", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: black;
    padding: 0;
    font-size: 16px;
    background-color: #fff;
}
</style>
