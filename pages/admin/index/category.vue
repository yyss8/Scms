<template>
    <div class='panel panel-default'>
        <div><h3><b>分类管理</b></h3></div><br />
        <ul class="nav nav-tabs admin-tabs">
            <li :class='{active:$route.path == "/admin/category" ? true:false}'>
                <nuxt-link :to="{path:'/admin/category'}">
                    主导航
                </nuxt-link>
            </li>
            <li :class='{active:$route.path == "/admin/category/sidebar" ? true:false}'>
                <nuxt-link :to="{path:'/admin/category/sidebar'}">
                    侧快捷栏
                </nuxt-link>
            </li>
            <li :class='{active:$route.path == "/admin/category/articles" ? true:false}'>
                <nuxt-link :to="{path:'/admin/category/articles'}">
                    文章分类
                </nuxt-link>
            </li>
        </ul>
        <nuxt-child></nuxt-child>
    </div>
</template>
