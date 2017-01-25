<template>
    <div>
        <Self-Motto v-if='showMotto'></Self-Motto>
        <Self-Intro v-if='showIntro'></Self-Intro>
        <Quick-Btns v-if='isLogin'></Quick-Btns>
    </div>
</template>

<script>
    import store from "../../store/index";
    import SelfIntro from "./selfintros.vue";
    import SelfMotto from "./selfmotto.vue";
    import QuickBtns from "./quickbtns.vue";

    export default {
        data(){
            return {
                showIntro:true,
                showMotto:true,
            }
        },
        store,
        computed:{
            isLogin(){
                return store.state.isLogin
            }
        },
        components:{
            SelfIntro,
            SelfMotto,
            QuickBtns
        }
    }
</script>

<style>
    .sidebar{
        background-color: white;
    }
</style>