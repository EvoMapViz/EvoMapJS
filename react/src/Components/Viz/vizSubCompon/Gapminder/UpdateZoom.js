import * as d3 from 'd3';
import svgButton from "./utils/svgButton";
import arrow9 from './utils/arrow9.js';

export default function UpdateZoom( Width, Height,
                                    setTrans_d3,
                                    isArrows,
                                    x,y,
                                    xfunc, yfunc, xYLfunc, yYLfunc, rfunc, fontfunc
                                    ){

console.log("Update Zoom") 
console.log(xfunc)

/*  */
/* Parameters and scales */
/*  */

const arrow_text_dodge = 0.5; // nudge text away from arrow

/*  */            
// Zoom elements
/*  */

var zoom = d3.zoom()
  .scaleExtent([.5, 20])  
  .extent([[0, 0], [Width, Height]])
  .on("zoom", zoomed);

var zoom_group = d3.select(".zoom_group_g")
/*  */            
// New Zoom elements
/*  */

function zoomed({transform}) {
  let trans_d3 = transform
  setTrans_d3(transform);

  // Update firms circles and labels
  /*  */

  // Circles
  zoom_group
    .attr("transform", trans_d3)
    .selectAll('circle')
    .attr("r", d => rfunc(d, trans_d3.k))
    
  // Firm labels  
  zoom_group  
    .selectAll('.firmLabel')
    .attr('x', d => xfunc(d, trans_d3.k))
    .attr('y', d => yfunc(d, trans_d3.k))
    .attr('font-size', d => fontfunc(d, trans_d3.k))
  
  // Trace labels
  zoom_group  
    .selectAll('.time-label-trace-firm')
    .attr('x', d => xYLfunc(d, trans_d3.k)) 
    .attr('y', d => yYLfunc(d, trans_d3.k))
    .attr('font-size', 12/trans_d3.k)
  
  // Explainer arrows
  /*  */

  if(isArrows){
    // Arrows
    zoom_group
    .selectAll('.explainer-arrow')
    .attr("stroke-width", 2/trans_d3.k)

    zoom_group
      .selectAll('.explainer-arrow')
      .attr("stroke-width", 2/trans_d3.k)

    zoom_group
      .selectAll('#my-arrow')
      .remove()

    // Arrow heads
    const arrow = arrow9( Math.min(1/trans_d3.k, 1) ) // scale parameter
    .id("my-arrow")

    zoom_group.call(arrow);

    d3.select('#my-arrow')
      .selectAll('path')
      .attr("fill", "#C0C0C0")

    // Arrow explainer text
    d3.selectAll('.arrow-text')
      .attr('x', function(d){
        const alpha = Math.abs(d.y/d.x)
        return( 
          x(
            d.x + Math.sign(d.x) * ( 
              (arrow_text_dodge/trans_d3.k)/(Math.sqrt(1 + alpha**2)) 
              )
          )
        )
      })
      .attr('y', function(d){
        const alpha = Math.abs(d.y/d.x)
        return( 
          y(
            d.y + Math.sign(d.y) * ( 
              (arrow_text_dodge/trans_d3.k) * (alpha/(Math.sqrt(1 + alpha**2))) 
              )
          )
        )
      })
      .attr('font-size', 12/trans_d3.k)
  } // End of "isArrows" if statement
} // End of new zoom function  

/*  */            
// Apply new Zoom function
/*  */

d3.select('.back-fore').call(zoom) 

/*  */            
// Update button zoom behavior
/*  */

d3.select('#button-in')
.on('click', function(){
  d3.select('#button-in')
      .transition()
      .duration(150)
      .attr('class','button-clicked')
      .transition()
      .duration(150)
      .attr('class','button-baseline')

    d3.select('.back-fore').transition().call(zoom.scaleBy, 1.5)
})

d3.select('#button-out')
.on('click', function(){
  d3.select('#button-out')
      .transition()
      .duration(150)
      .attr('class','button-clicked')
      .transition()
      .duration(150)
      .attr('class','button-baseline')

    d3.select('.back-fore').transition().call(zoom.scaleBy, 0.6)
})

d3.select('#button-reset')
.on('click', function(){
  d3.select('#button-reset')
    .transition()
    .duration(150)
    .attr('class','button-clicked')
    .transition()
    .duration(150)
    .attr('class','button-baseline')
    
    d3.select('.back-fore').transition().call(zoom.transform, d3.zoomIdentity);
})

}