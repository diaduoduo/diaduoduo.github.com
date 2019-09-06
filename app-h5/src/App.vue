<template>
    <div id="app">
        <keep-alive exclude="play,Album,starChoiceList,caseDetail,caseList">
            <router-view/>
        </keep-alive>
        <div class="loading" id="loading" style="display: none">
            <img src="./assets/images/loading.gif" class="loading-img" alt="">
        </div>
    </div>
</template>

<style lang="scss">
    .loading-img {
        position: fixed;
        top:50%;
        left:50%;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        -o-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        width: 0.5rem;
        height: 0.5rem;
    }

</style>
