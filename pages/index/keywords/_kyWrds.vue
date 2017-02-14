<template>
    <nuxt-child></nuxt-child>
</template>

<script>
    export default {
        fetch({redirect,route,store,req}){
            if (route.params.kyWrds !== undefined){
                if (route.params.pgNum === undefined){
                    redirect(`/keywords/${route.params.kyWrds}/pages/1`);
                }
            }else{
                redirect(`/pages/1`);
            }
        }
    }
</script>