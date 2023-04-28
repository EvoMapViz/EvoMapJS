import * as d3 from 'd3';

export default function UpdateAdaptiveDisplay(
                                            xfunc, yfunc, xYLfunc, yYLfunc, rfunc, fontfunc, opacityfunc,
                                            highlightCount,
                                            trans_d3
                                            ){

console.log("Adaptive Size Update")

const svg = d3.select(".svg-content-responsive")
// const label_nudge = 0.12; // label nudge away from circles
const zoom_group = d3.select('.zoom_group_g')

/*  */
/* Update current sizes */
/*  */

// Circles
svg
  .selectAll('circle')
  .transition()
  .duration(700)
  .attr("r", d => rfunc(d, trans_d3.k))

// Firm labels

const fLabs = svg
        .selectAll('.firmLabel')
        .transition()
        .duration(700)
        .attr('x', d => xfunc(d, trans_d3.k)) 
        .attr('y', d => yfunc(d, trans_d3.k))
        .attr('font-size', d => fontfunc(d, trans_d3.k))

if(highlightCount === 0){
  fLabs.attr('opacity', opacityfunc)
}

// Trace time labels
svg
  .selectAll('.time-label-trace-firm')
  .transition()
  .duration(700)
  .attr('x', d => xYLfunc(d, trans_d3.k)) 
  .attr('y', d => yYLfunc(d, trans_d3.k))

}