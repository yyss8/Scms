<template>
    <div class='sidebar'>
        <Quick-Btns v-if='QuickBtns'></Quick-Btns>
        <Self-Motto v-if='SelfMotto'></Self-Motto>
        <Self-Intro v-if='SelfIntro'></Self-Intro>
        <Hot-Posts></Hot-Posts>
    </div>
</template>

<script>
    import SelfIntro from "./selfintros.vue";
    import SelfMotto from "./selfmotto.vue";
    import QuickBtns from "./quickbtns.vue";
    import HotPosts from "./hotarticles.vue";

    export default {
        computed:{
            isLogin(){
                return this.$store.state.isLogin
            },
            sideBarComps(){
                return this.$store.state.sideBarComps
            },
            SelfIntro(){
                if (!this.$store.state.sideBarComps["SelfIntro"].onlyAdmin){
                    return this.$store.state.sideBarComps["SelfIntro"].display ? true:false
                }
                return this.$store.state.isLogin && this.$store.state.sideBarComps["SelfIntro"].display ? true:false
            },
            SelfMotto(){
                if (!this.$store.state.sideBarComps["SelfMotto"].onlyAdmin){
                    return this.$store.state.sideBarComps["SelfMotto"].display ? true:false
                }
                return this.$store.state.isLogin && this.$store.state.sideBarComps["SelfMotto"].display ? true:false
            },
            QuickBtns(){
                if (!this.$store.state.sideBarComps["QuickBtns"].onlyAdmin){
                    return this.$store.state.sideBarComps["QuickBtns"].display ? true:false
                }
                return this.$store.state.isLogin && this.$store.state.sideBarComps["QuickBtns"].display ? true:false
            }
        },
        components:{
            SelfIntro,
            SelfMotto,
            QuickBtns,
            HotPosts
        }
    }
</script>
