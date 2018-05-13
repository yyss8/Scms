<template>
    <div class='panel panel-default'>
        <ul class="nav nav-tabs admin-tabs">
            <li :class='{active:$route.path == "/admin/users" ? true:false}'>
                <nuxt-link :to="{path:'/admin/users'}">
                    基础管理
                </nuxt-link>
            </li>
            <li :class='{active:$route.path.includes("/admin/users/profile") ? true:false}'>
                <nuxt-link :to="{path:'/admin/users/profile'}">
                    用户管理
                </nuxt-link>
            </li>
        </ul>
        <nuxt-child></nuxt-child>
    </div>
</template>