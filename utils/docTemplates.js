

export const indexVue = ({pageName}) => {
    return `<template>
    <div class="${pageName}">
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
`
}

export const indexScss = ({pageName}) => {
    return `.${pageName} {
}
`}

export const packageJson = ({name, description}) => {
    return `{
    "name": "${name}",
    "description": "${description}",
    "private": true,
    "version": "0.0.1",
    "type": "module",
    "scripts": {
        "local": "vite --mode testing",
        "build:dev": "vite build --mode dev",
        "build:test": "vite build --mode testing", 
        "build": "vite build --mode prod",
        "preview": "vite preview"
    },
    "dependencies": {
        "axios": "^1.4.0",
        "dayjs": "^1.11.9",
        "lib-flexible": "^0.3.2",
        "postcss-pxtorem": "^6.0.0",
        "sass": "^1.56.2",
        "sass-loader": "^13.2.0",
        "vue": "^3.2.41",
        "vue-router": "^4.0.13"
    },
    "devDependencies": {
        "@vitejs/plugin-vue": "^3.2.0",
        "autoprefixer": "^10.4.13",
        "typescript": "^4.6.4",
        "url": "^0.11.1",
        "vite": "^3.2.3",
        "vite-plugin-html": "^3.2.0",
        "vite-plugin-singlefile": "^0.13.2",
        "vue-tsc": "^1.0.9"
    }
}
`
}