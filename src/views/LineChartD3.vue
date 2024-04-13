<template>
  <div class="chart-container" ref="chart"></div>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

export default {
  name: 'LineChart',
  setup() {
    const chart = ref(null)

    onMounted(() => {
      const data = [
        { date: '2024-01-01', value: 10 },
        { date: '2024-02-01', value: 20 },
        { date: '2024-03-01', value: 15 },
        { date: '2024-04-01', value: 25 },
        { date: '2024-05-01', value: 30 }
      ]

      const margin = { top: 20, right: 30, bottom: 30, left: 40 }
      const width = 600 - margin.left - margin.right
      const height = 200 - margin.top - margin.bottom

      const svg = d3
        .select(chart.value)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      const xScale = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => new Date(d.date)))
        .range([0, width])

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)])
        .range([height, 0])

      const xAxis = d3.axisBottom(xScale)
      const yAxis = d3.axisLeft(yScale)

      svg.append('g').attr('transform', `translate(0,${height})`).call(xAxis)

      svg.append('g').call(yAxis)

      const line = d3
        .line()
        .x((d) => xScale(new Date(d.date)))
        .y((d) => yScale(d.value))

      svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', line)
    })

    return {
      chart
    }
  }
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
