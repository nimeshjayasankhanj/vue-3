<template>
  <div>
    <svg ref="chart"></svg>
    <svg ref="legend"></svg>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

export default {
  name: 'PieChart',
  setup() {
    const chart = ref(null)
    const legend = ref(null)

    onMounted(() => {
      const data = [10, 20, 30, 40, 50]
      const width = 300
      const height = 300
      const radius = Math.min(width, height) / 2

      const color = d3.scaleOrdinal().range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56'])

      const arc = d3
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(0)

      const pie = d3
        .pie()
        .sort(null)
        .value((d) => d)

      const svg = d3
        .select(chart.value)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`)

      const g = svg.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc')

      g.append('path')
        .attr('d', arc)
        .style('fill', (d) => color(d.data))

      g.append('text')
        .attr('transform', (d) => `translate(${arc.centroid(d)})`)
        .attr('dy', '0.35em')
        .text((d) => d.data)

      // Legend
      const legendItems = color.domain()
      const legendSvg = d3.select(legend.value)

      const legendGroup = legendSvg
        .selectAll('.legend-item')
        .data(legendItems)
        .enter()
        .append('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => `translate(0, ${i * 20})`)

      legendGroup
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 10)
        .attr('height', 10)
        .style('fill', color)

      legendGroup
        .append('text')
        .attr('x', 20)
        .attr('y', 10)
        .text((d) => d)
    })

    return { chart, legend }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
