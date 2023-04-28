import * as d3 from 'd3';

export default function ClearSvg(allNames, 
                                 opacityScale,
                                 sizeSel,
                                 OpacityRange,
                                 adaptDisp,
                                 nFirms){

console.log('Clear SVG!')

const svg = d3.select(".svg-content-responsive")

svg.selectAll('.trace')
.filter(function() { return d3.select(this).classed('trace') })
.remove()

let to_be_dehigh = svg.selectAll('.firmLabel') //Hide labels

if(allNames === "true"){ 
    to_be_dehigh
    .attr('opacity', d => adaptDisp === 'true' ? opacityScale(d[sizeSel]) : OpacityRange[1])
    .attr('data-highlighted', false)
} else { 
    to_be_dehigh
    .attr('display', 'none')
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