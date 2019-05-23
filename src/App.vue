<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style>
html,
body {
    height: 100%;
    overflow: auto;
}
body {
    margin: 0;
    padding: 0;
    overscroll-behavior-y: none;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 3.7rem; */
    padding: 0;
    font-size: 16px;
    letter-spacing: 0.05rem;
    background-color: #fff;
}
</style>
