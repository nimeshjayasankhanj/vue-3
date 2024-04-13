<template>
  <svg ref="chart"></svg>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

export default {
  name: 'BarChart',
  setup() {
    const chart = ref(null)

    onMounted(() => {
      drawChart(chart.value)
    })

    const drawChart = (chartRef) => {
      const data = [
        { letter: 'A', frequency: 10 },
        { letter: 'B', frequency: 20 },
        { letter: 'C', frequency: 30 }
      ]

      const margin = { top: 20, right: 30, bottom: 30, left: 40 }
      const width = 600 - margin.left - margin.right
      const height = 400 - margin.top - margin.bottom

      const svg = d3
        .select(chartRef)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.letter))
        .range([0, width])
        .padding(0.1)

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.frequency)])
        .range([height, 0])

      svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x))

      svg.append('g').call(d3.axisLeft(y))

      svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.letter))
        .attr('y', (d) => y(d.frequency))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(d.frequency))
    }

    return { chart }
  }
}
</script>

<style scoped>
</style>
