<template>
    <Filtered-Articles :data='dateArticles' :pg='pgNum' v-on:switch='switchPg' :title='$route.params.date'></Filtered-Articles>
</template>

<script>

    import FilteredArticles from "~/components/filteredarticlelist/articlecontent.vue";

    export default {
        async asyncData({store,req,params,route}){
            if (req){
                return {
                    dateArticles:req.preLoad.articles,
                    pgNum:params.pgNum
                }
            }

            const {result} = await $.get(`/date/${params.date}/pages/${params.pgNum}/client`);
            return {
                dateArticles:result,
                pgNum:params.pgNum
            };
        },
        methods:{
            switchPg(pg){
                this.$router.push(`/date/${this.$route.params.date}/pages/${pg}`);
            },
        },
        components:{
            FilteredArticles
        }
    }
</script>