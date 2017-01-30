<template>
        <Main-Content :pg='pgNum'></Main-Content>
</template>

<script>
    import MainContent from "../../components/articlecontent/articlecontent.vue";

    export default {
        data ({route}) {
            return {
                pgNum:route.params.pgNum === undefined ? 1:route.params.pgNum
            }
        },
        components:{
            MainContent
        }
    }
</script>