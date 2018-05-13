<template>
    <nuxt-child></nuxt-child>
</template>

<script>
    export default {
        fetch({redirect,route,store,req}){
            if (req){
            }
            if (route.params.cgNum !== undefined){
                if (route.params.pgNum === undefined){
                    redirect(`/categories/${route.params.cgNum}/pages/1`);
                }
            }else{
                redirect(`/pages/1`);
            }
        }
    }
</script>