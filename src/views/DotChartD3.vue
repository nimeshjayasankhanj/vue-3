<template>
  <div>
    <svg ref="chart" width="400" height="300"></svg>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

export default {
  setup() {
    const chart = ref(null)

    onMounted(() => {
      renderDotChart(chart.value)
    })

    const renderDotChart = (svgElement) => {
      const data = [
        { x: 10, y: 20 },
        { x: 40, y: 90 },
        { x: 80, y: 50 },
        { x: 160, y: 120 },
        { x: 200, y: 10 }
      ]

      const margin = { top: 20, right: 20, bottom: 30, left: 40 }
      const width = 400 - margin.left - margin.right
      const height = 300 - margin.top - margin.bottom

      const svg = d3
        .select(svgElement)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.x)])
        .range([0, width])

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.y)])
        .range([height, 0])

      // Draw x axis
      svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(xScale))

      // Draw y axis
      svg.append('g').call(d3.axisLeft(yScale))

      // Draw dots
      svg
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d) => xScale(d.x))
        .attr('cy', (d) => yScale(d.y))
        .attr('r', 5)
        .style('fill', 'blue') // Change color if needed
    }

    return {
      chart
    }
  }
}
</script>
