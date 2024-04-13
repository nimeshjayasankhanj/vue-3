<template>
  <div id="app">
    <svg :width="width" :height="height">
      <g :transform="'translate(' + width / 2 + ',' + height / 2 + ')'">
        <g v-for="(slice, index) in pieData" :key="index" class="arc">
          <path :d="arcPath(slice)" :fill="slice.color" />
          <text
            :transform="'translate(' + arcCentroid(slice) + ')'"
            text-anchor="middle"
            class="label"
          >
            {{ slice.data.label }}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import * as d3 from 'd3'

const width = 400
const height = 400

const data = [
  { label: 'A', value: 20 },
  { label: 'B', value: 30 },
  { label: 'C', value: 50 }
]

const pieData = computed(() => {
  const pie = d3.pie().value((d) => d.value)(data)
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
  return pie.map((slice, index) => ({
    ...slice,
    color: colorScale(index)
  }))
})

const arcPath = (slice) => {
  const arc = d3.arc().innerRadius(100).outerRadius(200)
  return arc(slice)
}

const arcCentroid = (slice) => {
  const arc = d3.arc().innerRadius(100).outerRadius(200)
  return arc.centroid(slice)
}
</script>

<style scoped>
.label {
  font: 12px sans-serif;
}
</style>
