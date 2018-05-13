<template>
    <nuxt-child></nuxt-child>
</template>

<script>
    export default {
        fetch({redirect,route,store,req}){
            if (req){
            }
            if (route.params.date !== undefined){
                if (route.params.pgNum === undefined){
                    redirect(`/date/${route.params.date}/pages/1`);
                }
            }else{
                redirect(`/pages/1`);
            }
        }
    }
</script>