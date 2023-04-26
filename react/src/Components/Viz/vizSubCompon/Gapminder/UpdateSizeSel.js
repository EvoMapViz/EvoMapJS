import * as d3 from 'd3';
import svgButton from "./utils/svgButton"

export default function UpdateSizeSel(OpacityRange,
                                      adaptDisps, 
                                      xfunc, yfunc, xYLfunc, yYLfunc, rfunc, fontfunc, opacityfunc, 
                                      trans_d3){

console.log("Sizes selector Update") 

const svg = d3.select(".svg-content-responsive")
const zoom_group = d3.select('.zoom_group_g')

/*  */
/* Update current sizes */
/*  */

if(adaptDisps === "true"){

  // Circles
  svg
    .selectAll('circle')
    .transition()
    .duration(700)
    .attr("r", d => rfunc(d, trans_d3.k))
       
  // Firm labels
  svg
    .selectAll('.firmLabel')
    .transition()
    .duration(700)
    .attr('x', d => xfunc(d, trans_d3.k)) // adjust for size of circle
    .attr('y', d => yfunc(d, trans_d3.k))              
  
  // Firm labels
  if(zoom_group.attr('data-high-count') === "0"){
    svg
    .selectAll('.firmLabel')
    .transition()
    .duration(700)
    .attr('x', d => xfunc(d, trans_d3.k)) // adjust for size of circle
    .attr('y', d => yfunc(d, trans_d3.k))
    .attr('font-size', d => fontfunc(d, trans_d3.k))
    .attr('opacity', d => opacityfunc(d))
    }

  if(zoom_group.attr('data-high-count') !== "0"){
    svg
    .selectAll('.firmLabel')
    .transition()
    .duration(700)
    .attr('x', d => xfunc(d, trans_d3.k)) // adjust for size of circle
    .attr('y', d => yfunc(d, trans_d3.k))
    .attr('font-size', d => fontfunc(d, trans_d3.k))
    }

  // Time labels
  svg
    .selectAll('.time-label-trace-firm')
    .transition()
    .duration(700)
    .attr('x', d => xYLfunc(d, trans_d3.k)) // adjust for size of circle
    .attr('y', d => yYLfunc(d, trans_d3.k))
  
  }

if(adaptDisps === "false"){
  svg
    .selectAll('circle')
    .transition()
    .duration(700)
    .attr("r", d => 4 / trans_d3.k)
  
  // Firm labels
  if(zoom_group.attr('data-high-count') === "0"){  
    svg
      .selectAll('.firmLabel')
      .transition()
      .duration(700)
      .attr('x', d => xfunc(d, trans_d3.k)) // adjust for size of circle
      .attr('y', d => yfunc(d, trans_d3.k))
      .attr('font-size', 12/trans_d3.k)
      .attr('opacity', OpacityRange[1])
  }

  if(zoom_group.attr('data-high-count') !== "0"){  
    svg
      .selectAll('.firmLabel')
      .transition()
      .duration(700)
      .attr('x', d => xfunc(d, trans_d3.k)) // adjust for size of circle
      .attr('y', d => yfunc(d, trans_d3.k))
      .attr('font-size', 12/trans_d3.k)
      .attr('opacity', function(d){
        return d3.select(this).attr("data-highlighted") === "false" ? OpacityRange[0] : OpacityRange[1]
      })
  }

  // Time labels
  svg
  .selectAll('.time-label-trace-firm')
  .transition()
  .duration(700)
  .attr('x', d => xYLfunc(d, trans_d3.k)) // adjust for size of circle
  .attr('y', d => yYLfunc(d, trans_d3.k))
  
}

}