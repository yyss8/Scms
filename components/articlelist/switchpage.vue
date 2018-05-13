<template>
    <div>
        <ul class="pagination" style='margin:0 auto;'>
            <li v-if='currentPage > 2' @click='toFirst'><a href="javascript:void(0)" class='fa fa-angle-double-left'></a></li>
            <li v-if='currentPage > 1' @click='lastPage'><a href="javascript:void(0)" class='fa fa-angle-left'></a></li>
            <li><span href="javascript:void(0)">第{{currentPage}}页</span></li>
            <li v-if='Math.floor($store.state.articleNum / 5) + 1 - currentPage >= 1' @click='nxtPage'><a href="javascript:void(0)" class='fa fa-angle-right'></a></li>
            <li v-if='Math.floor($store.state.articleNum / 5) + 1 - currentPage >= 2' @click='toLast'><a href="javascript:void(0)" class='fa fa-angle-double-right'></a></li>
        </ul>
        <div class='pull-right'>
            <button class='btn btn-default' style='border-color:#6FBADE;color:#6FBADE' @click='toTop'><i class='fa fa-arrow-up'></i></button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                currentPage:this.$route.params.pgNum !== undefined ? Number(this.$route.params.pgNum) : 1
            }
        },
        methods:{
            nxtPage(){
                this.currentPage += 1;
                window.scrollTo(0,0);
                this.$router.push('/pages/' + this.currentPage.toString());
            },
            lastPage(){
                this.currentPage -= 1;
                window.scrollTo(0,0);
                this.$router.push('/pages/' + this.currentPage.toString());
            },
            toFirst(){
                this.currentPage = 1;
                window.scrollTo(0,0);
                this.$router.push('/pages/');
            },
            toLast(){
                this.currentPage = Math.floor(this.$store.state.articleNum / 5) + 1;
                window.scrollTo(0,0);
                this.$router.push('/pages/' + this.currentPage.toString());
            },
            toTop(){
                window.scrollTo(0,0);
            }
        }
    }
</script>

<style>

</style>