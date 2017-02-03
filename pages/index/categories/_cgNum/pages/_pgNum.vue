<template>
    <Filtered-Articles :data='cgArticles' :pg='pgNum' v-on:switch='switchPg' :title='cgArticles.cg'></Filtered-Articles>
</template>

<script>

    import FilteredArticles from "~components/filteredarticlelist/articlecontent.vue";

    export default {
        async data({store,req,params,route}){
            if (req){
                return {
                    cgArticles:req.preLoad.articles,
                    pgNum:params.pgNum
                }
            }else{
                const {result} = await $.get(`/categories/${params.cgNum}/pages/${params.pgNum}/client`);
                return {
                    cgArticles:result,
                    pgNum:params.pgNum
                }
            }
        },
        methods:{
            switchPg(pg){
                this.$router.push(`/categories/${this.$route.params.cgNum}/pages/${pg}`);
            },
        },
        components:{
            FilteredArticles
        }
    }
</script>