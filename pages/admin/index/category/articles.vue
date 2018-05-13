<template>
    <div>
        <table class="table table-striped">
            <thead>
            <tr>
                <th>分类id</th>
                <th>分类名称</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for='(category, categoryIndex) in categories' :key='`category-${categoryIndex}`'>
                <td><input v-model='category.id' class='form-control'/></td>
                <td><input v-model='category.name' class='form-control' /></td>
                <td class='text-center'><button class='btn btn-default' @click='remove(categoryIndex)'><i class='fa fa-times'></i></button></td>
            </tr>
            </tbody>
        </table>

        <div class='admin-category-controls'>
            <br />
            <Result-View ref='resultView'></Result-View>
            <span class='pull-right'>
                <button class='btn btn-default' @click='addCategory'>添加导航</button>&nbsp;&nbsp;
                <button class='btn btn-default' onclick='window.location.reload();'>重置导航</button>&nbsp;&nbsp;
                <button class='btn btn-default' @click='saveCategory'>保存导航</button>
            </span>
        </div>
    </div>
</template>

<script>

    import ResultView from "~/components/minorcomponents/resultview.vue";

    export default {
        data(){
            return {
                categories:this.$store.state.postCategories
            }
        },
        methods:{
            remove(index){
                this.categories.splice(index,1);
            },
            addCategory(){
                this.categories.push({
                    id:this.categories.length + 1,
                    name:""
                })
            },
            saveCategory(){

                const data = {
                    categories:this.categories
                };

                $.ajax({
                    url: `/admin/nav/cg`,
                    type:"PUT",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: (result)=>{
                        this.$store.commit('updateCategories',this.categories);
                        this.$refs.resultView.sendMsg(result.content,"success");
                    },
                    error: err => {
                        this.$refs.resultView.sendMsg(err.responseJSON.content,"error");
                    }
                });
            }

        },
        components:{
            ResultView
        }
    }
</script>