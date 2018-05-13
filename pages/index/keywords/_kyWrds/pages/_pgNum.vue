<template>
    <Filtered-Articles :data='searchArticles' :pg='pgNum' v-on:switch='switchPg' :title='"关键词: " + $scms.showShortTitle($route.params.kyWrds.replace("+"," "),10)'></Filtered-Articles>
</template>

<script>

    import FilteredArticles from "~/components/filteredarticlelist/articlecontent.vue";

    export default {
        async asyncData({store,req,params,route}){
            if (req){
                return {
                    searchArticles:req.preLoad.articles,
                    pgNum:params.pgNum
                }
            }

            const {result} = await $.get(`/keywords/${params.kyWrds}/pages/${params.pgNum}/client`);
            return {
                searchArticles:result,
                pgNum:params.pgNum
            };
        },
        methods:{
            switchPg(pg){
                this.$router.push(`/keywords/${this.$route.params.kyWrds}/pages/${pg}`);
            },
        },
        components:{
            FilteredArticles
        }
    }
</script>