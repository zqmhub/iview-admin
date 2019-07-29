<template>
    <Breadcrumb>
        <BreadcrumbItem
            v-for="item in currentPath"
            :href="item.path"
            :key="item.name"
        >投资信息管理系统</BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
export default {
    name: 'breadcrumbNav',
    props: {
        currentPath: Array
    },
    methods: {
    }
};
</script>

