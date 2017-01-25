<template>
    <div>
        <div class='panel panel-default'>
            <div class='panel-heading'>
                快速按钮
            </div>
            <div class='quick-btns'>
                <button class='btn btn-default' data-toggle="modal" data-target="#quickPostField">发布文章</button>
            </div>
        </div>
        <div class="modal fade" id="quickPostField" tabindex="-1" role="dialog" aria-labelledby="quickPostFieldLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <Post-Editor></Post-Editor>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PostEditor from "../minorcomponents/posteditor.vue";

    export default {
        components:{
            PostEditor
        }
    }
</script>

<style>
    .quick-btns{
        padding:15px;
    }
</style>