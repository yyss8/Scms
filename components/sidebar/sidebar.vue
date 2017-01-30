<template>
    <div class='sidebar'>
        <Self-Motto v-if='SelfIntro'></Self-Motto>
        <Self-Intro v-if='SelfMotto'></Self-Intro>
        <Quick-Btns v-if='isLogin && QuickBtns'></Quick-Btns>
    </div>
</template>

<script>
    import SelfIntro from "./selfintros.vue";
    import SelfMotto from "./selfmotto.vue";
    import QuickBtns from "./quickbtns.vue";

    export default {
        data(){
            return {
                SelfIntro:this.$store.state.sideBarComps["SelfIntro"].display,
                SelfMotto:this.$store.state.sideBarComps["SelfMotto"].display,
                QuickBtns:this.$store.state.sideBarComps["QuickBtns"].display
            }
        },
        computed:{
            isLogin(){
                return this.$store.state.isLogin
            },
            sideBarComps(){
                return this.$store.state.sideBarComps
            }
        },
        mounted(){
            for (let comp in this.sideBarComps){
                if (this.sideBarComps[comp].display){
                    this[comp] = true;
                }
            }
        },
        components:{
            SelfIntro,
            SelfMotto,
            QuickBtns
        }
    }
</script>
