<template>
        <Main-Content :pg='pgNum'></Main-Content>
</template>

<script>
    import MainContent from "~/components/articlelist/articlecontent.vue";

    export default {
        async asyncData ( {store,req,params} ) {
            if (!req){
                const { result } = await $.get(`/post/page/${params.pgNum}`);
                store.commit('getArticleNum',result);
            }

            return {
                pgNum:params.pgNum === undefined ? 1:params.pgNum,
            }
        },
        components:{
            MainContent
        }
    }
</script>