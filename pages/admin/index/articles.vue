<template>
    <div class='panel panel-default'>
        <div><h3><b>文章管理</b></h3></div><br />
        <nuxt-child></nuxt-child>
    </div>
</template>

<script>

    import ResultView from "~/components/minorcomponents/resultview.vue";

    export default {
        fetch({redirect,route}){
            if (route.path == "/admin/articles"){
                redirect('/admin/articles/pages/1');
            }
        }
    }
</script>