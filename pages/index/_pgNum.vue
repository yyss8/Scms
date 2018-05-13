<template>
        <Main-Content :pg='pgNum'></Main-Content>
</template>

<script>
    import MainContent from "~/components/articlelist/articlecontent.vue";

    export default {
        async asyncData ({store,req,params}) {
            if (req){
                //主页文章列表获取已存于store/index.js文件中
            }else{
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