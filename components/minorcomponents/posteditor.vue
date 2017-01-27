<template>
    <div class='post-editor'>
        <div v-if='isEditing'>
            <input placeholder="输入文章标题" class='form-control' v-model='postTitle'>
            <div class='post-content-editor-btns'>

                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle btn-sm" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        {{category}} <span class="caret" v-if='category === "文章分类"'></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li  @click='selectCategories(category.name)' v-for='category in $store.state.postCategories'><a href="javascript:void(0)">{{category.name}}</a></li>
                    </ul>
                </div>&nbsp;

                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle btn-sm" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        字号
                    </button>
                    <ul class="dropdown-menu">
                        <li @click='addFontSize("90%")'><a href="javascript:void(0)">90%</a></li>
                        <li @click='addFontSize("110%")'><a href="javascript:void(0)">110%</a></li>
                        <li @click='addFontSize("120%")'><a href="javascript:void(0)">120%</a></li>
                        <li @click='addFontSize("130%")'><a href="javascript:void(0)">130%</a></li>
                        <li @click='addFontSize("140%")'><a href="javascript:void(0)">140%</a></li>
                        <li @click='addFontSize("150%")'><a href="javascript:void(0)">150%</a></li>
                        <li @click='addFontSize("custom")'><a href="javascript:void(0)">自定义</a></li>
                    </ul>
                </div>&nbsp;
                
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle btn-sm" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        颜色
                    </button>
                    <ul class="dropdown-menu">
                        <li style='background-color:#808080;' @click='addColor("#808080")'><a href="javascript:void(0)" style='color:#fff;'>灰</a></li>
                        <li style='background-color:#FFFF00;' @click='addColor("#FFFF00")'><a href="javascript:void(0)">黄</a></li>
                        <li style='background-color:#FF0000;' @click='addColor("#FF0000")'><a href="javascript:void(0)" style='color:#fff;'>红</a></li>
                        <li style='background-color:#008000;' @click='addColor("#008000")'><a href="javascript:void(0)" style='color:#fff;'>绿</a></li>
                        <li style='background-color:#0000FF;' @click='addColor("#0000FF")'><a href="javascript:void(0)" style='color:#fff;'>蓝</a></li>
                        <li style='background-color:#800080;' @click='addColor("#800080")'><a href="javascript:void(0)" style='color:#fff;'>紫</a></li>
                        <li @click='addColor("custom")'><a href="javascript:void(0)">自定义</a></li>
                    </ul>
                </div>&nbsp;

                <button class='btn btn-default btn-sm' @click='addBold'><i class='fa fa-bold'></i></button>&nbsp;
                <button class='btn btn-default btn-sm' @click='addItalic'><i class='fa fa-italic'></i></button>&nbsp;
                <button class='btn btn-default btn-sm' @click='addUnderLine'><i class='fa fa-underline'></i></button>&nbsp;
                <div class="dropdown">
                    <button class='btn btn-default btn-sm' @click='openUrlDropDown'><i class='fa fa-link'></i></button>
                    <div id='urlInput' class='dropdown-menu' v-if='showUrlInput' style='display:block'>
                        <div><br />
                            <input placeholder="链接文字" class='form-control' v-model='urlText'>
                            <input placeholder="链接地址" class='form-control' v-model='urlLink'>
                            <button class='btn btn-default btn-sm' @click='addUrl'>确认</button>&nbsp;
                            <button class='btn btn-default btn-sm' @click='openUrlDropDown'>取消</button>
                        </div>
                        <br />
                    </div>
                </div>&nbsp;
                <button class='btn btn-default btn-sm' @click='addQuote'><i class='fa fa-quote-left'></i></button>&nbsp;
                <div class="dropdown">
                    <button class='btn btn-default btn-sm' @click='openImgDropDown'><i class='fa fa-file-image-o'></i></button>
                    <div id='imgInput' class='dropdown-menu' v-if='showImgInput' style='display:block'>
                        <div><br />
                            <input placeholder="图片描述" class='form-control' v-model='imgAlt'>
                            <input placeholder="图片链接" class='form-control' v-model='imgLink'>
                            <input class='form-control' placeholder="宽度" style='width:30%;' v-model='imgWidth'><input class='form-control' placeholder='长度' style='width:30%;' v-model='imgHeight'>
                            <button class='btn btn-default btn-sm' @click='addImg'>确认</button>&nbsp;
                            <button class='btn btn-default btn-sm' @click='openImgDropDown'>取消</button>
                        </div>
                        <br />
                    </div>
                </div>&nbsp;
                <button class='btn btn-default btn-sm' @click='preview'>预览</button>
            </div>
            
            <textarea placeholder="输入文章内容" v-model='postContent' class='form-control' id='editorArea'></textarea>
            <div class='post-btns'>
                <button class='btn btn-default' @click='submit'>发表</button>&nbsp;
                <button class='btn btn-default' @click='hideModal'>暂存</button>&nbsp;
                <button class='btn btn-default' @click='cancel'>撤销</button>
            </div>
        </div>
        <div v-if='isPreviewing'>
            <div class='panel panel-default'>
                <div class='panel-heading'>预览</div><br />
                <div class='article-title'>
                    <a href='javascript:void(0)'>{{ postTitle }}</a>
                </div>
                <div v-html='previewContent' class='panel-body'></div>
            </div>
            
            <div class='post-btns'>
                <button class='btn btn-default' @click='preview'>取消</button>&nbsp;
                <button class='btn btn-default' @click='cancel'>撤销</button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                postTitle:"",
                postContent:"",
                previewContent:"",
                postTitle:"",
                category:"文章分类",
                selectionStart:0,
                selectionEnd:0,
                urlText:"",
                urlLink:"",
                imgAlt:"",
                imgLink:"",
                imgWidth:"",
                imgHeight:"",
                showUrlInput:false,
                showImgInput:false,
                isEditing:true,
                isPreviewing:false
            }
        },
        methods:{
            submit(){
                
            },
            selectCategories(category){
                this.category = category;
            },
            cancel(){
                this.postTitle = "",
                this.postContent = "";
                this.hideModal();
            },
            preview(){
                this.previewContent = this.postContent.replace(/(?:\r\n|\r|\n)/g, '<br />');
                this.isEditing = !this.isEditing;
                this.isPreviewing = !this.isPreviewing;
            },
            hideModal(){
                $("#quickPostField").modal('hide');
            },
            addFontSize(size){
                const index = this.selectedTextIndex();
                const selectionStart = index[0];
                const selectionEnd = index[1];
                if (size != "custom"){
                    this.postContent = this.postContent.substring(0, selectionStart)
                        + `<span style="font-size:${size}">` + this.postContent.substring(selectionStart, selectionEnd)
                        + '</span>' + this.postContent.substring(selectionEnd);      
                }else{
                    const customSize = prompt('输入字体大小','100% 或 10px');
                    this.postContent = this.postContent.substring(0, selectionStart)
                        + `<span style="color:${customSize}">` + this.postContent.substring(selectionStart, selectionEnd)
                        + '</span>' + this.postContent.substring(selectionEnd);       
                }  
            },
            addColor(color){
                const index = this.selectedTextIndex();
                const selectionStart = index[0];
                const selectionEnd = index[1];
                if (color != "custom"){
                    this.postContent = this.postContent.substring(0, selectionStart)
                        + `<span style="color:${color}">` + this.postContent.substring(selectionStart, selectionEnd)
                        + '</span>' + this.postContent.substring(selectionEnd);      
                }else{
                    const customColor = prompt('输入颜色代码','#000000');
                    this.postContent = this.postContent.substring(0, selectionStart)
                        + `<span style="color:${customColor}">` + this.postContent.substring(selectionStart, selectionEnd)
                        + '</span>' + this.postContent.substring(selectionEnd);       
                }
            },
            addBold(){
                const index = this.selectedTextIndex();
                const selectionStart = index[0];
                const selectionEnd = index[1];
                this.postContent = this.postContent.substring(0, selectionStart)
                    + '<b>' + this.postContent.substring(selectionStart, selectionEnd)
                    + '</b>' + this.postContent.substring(selectionEnd);
            },
            addItalic(){
                const index = this.selectedTextIndex();
                const selectionStart = index[0];
                const selectionEnd = index[1];
                this.postContent = this.postContent.substring(0, selectionStart)
                    + '<i>' + this.postContent.substring(selectionStart, selectionEnd)
                    + '</i>' + this.postContent.substring(selectionEnd);      
            },
            addUnderLine(){
                const index = this.selectedTextIndex();
                const selectionStart = index[0];
                const selectionEnd = index[1];
                this.postContent = this.postContent.substring(0, selectionStart)
                    + '<u>' + this.postContent.substring(selectionStart, selectionEnd)
                    + '</u>' + this.postContent.substring(selectionEnd);      
            },
            openUrlDropDown(){
                if (!this.showUrlInput){
                    const index = this.selectedTextIndex();
                    const selectionStart = index[0];
                    const selectionEnd = index[1];
                    this.selectionStart = selectionStart;
                    this.selectionEnd = selectionEnd;
                    this.urlText = this.postContent.substring(selectionStart, selectionEnd); //添加链接文字
                    this.urlLink = "";
                }
                this.showUrlInput = !this.showUrlInput;
            },
            addUrl(){
                this.postContent = this.postContent.substring(0, this.selectionStart) + `<a href='${this.urlLink}'>${this.urlText}</a>` + this.postContent.substring(this.selectionEnd);
                this.showUrlInput = false;
            },
            addQuote(){
                const index = this.selectedTextIndex();
                const selectionStart = index[0];
                const selectionEnd = index[1];
                this.postContent = this.postContent.substring(0, selectionStart)
                    + '<blockquote>' + this.postContent.substring(selectionStart, selectionEnd)
                    + '</blockquote>' + this.postContent.substring(selectionEnd);      
            },
            openImgDropDown(){
                if (!this.showImgInput){
                    const index = this.selectedTextIndex();
                    const selectionStart = index[0];
                    const selectionEnd = index[1];
                    this.selectionStart = selectionStart;
                    this.selectionEnd = selectionEnd;
                    this.imgAlt = this.postContent.substring(selectionStart, selectionEnd); //添加图片描述
                    this.imgLink = "";
                }
                this.showImgInput = !this.showImgInput;
            },
            addImg(){
                const width = this.imgWidth == "" || isNaN(this.imgWidth) ? "" : `width='${this.imgWidth}'`; //防止非数字长宽度
                const height = this.imgHeight == "" || isNaN(this.imgWidth) ? "": `height='${this.imgHeight}'`;
                this.postContent = this.postContent.substring(0, this.selectionStart) + `<img alt='${this.imgAlt}' src='${this.imgLink}' ${width} ${height}>` + this.postContent.substring(this.selectionEnd);
                this.showImgInput = false;
            },
            selectedTextIndex(){
                const editorArea = document.getElementById('editorArea');
                return [editorArea.selectionStart, editorArea.selectionEnd];
            }
        }
    }

</script>

<style>
    .post-editor{
        padding-top:30px;
        position: relative;
        width:95%;
        margin:0 auto;
    }

    .post-content-editor-btns{
        padding:10px 0 10px 0;
    }

    .post-editor textarea{
        height:200px;
        width:100%;
        resize: none;
        margin-bottom: 15px;
    }

    .post-btns{
        text-align: right;
        margin-bottom: 20px;
    }

    #urlInput{
        width:400px;
    }

    #urlInput div{
        width:80%;
        margin:0 auto;
    }

    #urlInput div input{
        margin-bottom: 15px;
    }

    #imgInput{
        width:400px;
    }

    #imgInput div{
        width:80%;
        margin:0 auto;
    }

    #imgInput div input{
        margin-bottom: 15px;
    }
</style>