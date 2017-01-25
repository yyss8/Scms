<template>
    <div class='panel panel-default blog-content'>
        <div class='panel-body'>
            <div class='panel panel-info' v-for='article in fakeData'>
                <div class='panel-body'>
                    <br />
                    <div class='article-title'>
                        <a href='javascript:void(0)'>{{ article.title }}</a>
                    </div>
                    <div class='article-content'>
                        {{ article.content }} <a href='javascript:void(0)'>更多...</a>
                    </div>
                    <div class='article-btns'>
                        <span><i class='fa fa-calendar'></i>&nbsp; &nbsp;<a href='javascript:void(0)'>{{ article.date }}</a></span><br />
                        <span><i class='fa fa-folder-open-o'></i>&nbsp; &nbsp;<a href='javascript:void(0)'>{{ article.category }}</a></span>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                fakeData:[
                    {
                        title:"Demo Title",
                        date:"2009年07月26日",
                        content:`
Vue.js（读音 /vjuː/, 类似于 view） 是一套构建用户界面的 渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，并且非常容易学习，非常容易与其它库或已有项目整合。另一方面，Vue 完全有能力驱动采用单文件组件和 Vue 生态系统支持的库开发的复杂单页应用。
                        `,
                        category:"普通文章"
                    },
                    {
                        title:"Demo Title",
                        date:"2009年07月26日",
                        content:`
Vue.js（读音 /vjuː/, 类似于 view） 是一套构建用户界面的 渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，并且非常容易学习，非常容易与其它库或已有项目整合。另一方面，Vue 完全有能力驱动采用单文件组件和 Vue 生态系统支持的库开发的复杂单页应用。
                        `,
                        category:"普通文章"
                    },
                    {
                        title:"Demo Title",
                        date:"2009年07月26日",
                        content:`
Vue.js（读音 /vjuː/, 类似于 view） 是一套构建用户界面的 渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，并且非常容易学习，非常容易与其它库或已有项目整合。另一方面，Vue 完全有能力驱动采用单文件组件和 Vue 生态系统支持的库开发的复杂单页应用。
                        `,
                        category:"普通文章"
                    },
                    {
                        title:"Demo Title",
                        date:"2009年07月26日",
                        content:`
Vue.js（读音 /vjuː/, 类似于 view） 是一套构建用户界面的 渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，并且非常容易学习，非常容易与其它库或已有项目整合。另一方面，Vue 完全有能力驱动采用单文件组件和 Vue 生态系统支持的库开发的复杂单页应用。
                        `,
                        category:"普通文章"
                    },
                    {
                        title:"Demo Title",
                        date:"2009年07月26日",
                        content:`
Vue.js（读音 /vjuː/, 类似于 view） 是一套构建用户界面的 渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，并且非常容易学习，非常容易与其它库或已有项目整合。另一方面，Vue 完全有能力驱动采用单文件组件和 Vue 生态系统支持的库开发的复杂单页应用。
                        `,
                        category:"普通文章"
                    }
                ]
            }
        }
    }
</script>

<style>

    .article-title{
        text-align: center;
        font-size:20px;
        font-weight: bold;
    }

    .article-title a{
        text-decoration: none;
        color:black;
    }

    .article-content{
        padding:30px 40px 30px 40px;
    }

    .article-btns{
        padding-left:10px;
    }

    .blog-content{
        overflow-y:auto;
    }
</style>