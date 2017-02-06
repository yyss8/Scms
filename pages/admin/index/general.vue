<template>
    <div class='panel panel-default'>
        <div><h3><b>站点信息</b></h3></div><br />
        <label>站点标题:<input class='form-control' v-model='blogTitle' /></label><br /><br />
        <label>站点副标题:<input class='form-control' v-model='blogScnTitle' /></label><br /><br />
        <label>站点作者:<input class='form-control' v-model='blogAuthor' /></label><br /><br />
        <label>站点描述:<input class='form-control' v-model='blogDescription' style='width:300px' /></label><br /><br />
        <label>
            站点关键词 
            <span class='dropdown'>
                <a class='fa fa-info-circle'></a>
                <div class='dropdown-content panel-default'>
                    <span>
                    常用分隔符: <br /> <br /> "-" (横线)  <br /> "_" (下划线)  <br /> "|" (竖线)  <br />"," (逗号)
                    </span>
                </div>
            </span>
            <input class='form-control' v-model='blogKyWrds' style='width:500px' />
        </label><br /><br />
        <div style='width:25%;'>
            <Result-View ref='resultView'></Result-View>    
        </div><br />
        <button class='btn btn-default' @click='save'>保存</button>
    </div>
</template>

<script>

    import ResultView from "~components/minorcomponents/resultview.vue";

    export default {
        data({store}){
            return {
                blogTitle:store.state.blogTitle,
                blogScnTitle:store.state.blogScnTitle,
                blogDescription:store.state.blogDescription,
                blogKyWrds:store.state.blogKyWrds,
                blogAuthor:store.state.blogAuthor
            }  
        },
        methods:{
            save(){
                const data = {
                    title:this.blogTitle,
                    scnTitle:this.blogScnTitle,
                    description:this.blogDescription,
                    keywords:this.blogKyWrds,
                    author:this.blogAuthor
                }

                $.ajax({
                    url: `/admin/gs`,
                    type:"PUT",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: (result)=>{
                        if (result.status == "ok"){
                            this.$refs.resultView.sendMsg(result.content,"success");
                        }else{
                            this.$refs.resultView.sendMsg(result.content,"error");
                        }
                    }
                });
            }
        },
        components:{
            ResultView
        }
    }
</script>