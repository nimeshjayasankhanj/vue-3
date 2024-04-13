<template>
  <nav>
    <RouterLink to="/bar-d3">Bar D3. js</RouterLink>
    <RouterLink to="/pie-d3">Pie D3. js</RouterLink>
    <RouterLink to="/donut-d3">donut-d3</RouterLink>
    <RouterLink to="/dot-d3">dot-d3</RouterLink>
    <RouterLink to="/line-d3">line-d3</RouterLink>
    <RouterLink to="/unit-test">unit tests</RouterLink>
    <RouterLink to="/end-to-end">End to End test</RouterLink>
  </nav>
  <p>{{ posts }}</p>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePostStore } from '@/stores/post'
import { onMounted, computed } from 'vue'

const store = usePostStore()

const posts = computed(() => {
  return store.posts
})

onMounted(() => {
  store.getPosts()
})
</script>