import * as d3 from 'd3';

export default function clearSVG(svg, allNames, 
                                 data, sizeSel, time,
                                 OpacityRange, OpacityDomain, OpacityExponent,
                                 adaptDisp = 'true'){

    console.log('Clearing up! (clearSVG)')
    console.log('allNames: ' + allNames)

    const opacityScale = d3.scalePow()
                            .exponent(OpacityExponent)
                            .domain(OpacityDomain)
                            .range(OpacityRange)

    svg.selectAll('.trace') // Remove circle traces
    .filter(function() { return d3.select(this).classed('trace') })
    .remove()

    let to_be_dehigh = svg.selectAll('.firmLabel') //Hide labels
    if(allNames === "true"){ 
      to_be_dehigh
      // .attr('fill-opacity', d => adaptDisp === 'true' ? opacityScale(d[sizeSel]) : 0.7)
      .attr('opacity', d => adaptDisp === 'true' ? opacityScale(d[sizeSel]) : OpacityRange[1])
      .attr('data-highlighted', false)
    } else { 
      to_be_dehigh
      .attr('display', 'none')
      // .attr('fill-opacity', d => adaptDisp === 'true' ? opacityScale(d[sizeSel]) : 0.7)
      .attr('opacity', d => adaptDisp === 'true' ? opacityScale(d[sizeSel]) : OpacityRange[1])
      .attr('data-highlighted', false)
    }

    svg.selectAll('.circle-firm')//De-highlight firm circles
    .style('stroke', 'none')
    .attr('opacity', OpacityRange[1])
    .attr('data-trace', false)
    .attr('data-highlighted', false)
    .on("mouseout", function(d) {
      d3.select('.tooltip')
        .transition()
        .duration(100)
        .style('opacity', 0);
    d3.select(this)
    .style("stroke", "none")
    })

}