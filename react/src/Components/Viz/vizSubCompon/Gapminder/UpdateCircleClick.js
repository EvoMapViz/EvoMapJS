import * as d3 from 'd3';
import clearSVG from "./utils/clearSVG";

export default function UpdateCircleClick(data, time, justClicked,
                                          OpacityRange, OpacityDomain, OpacityExponent, AdaptDisp, // To set highlight intensity as upper bound of range AND use in clearSVG
                                          sizeSel, allNames, nFirms, nTimes, timeLabs,
                                          x,y,
                                          xYLfunc, yYLfunc, rfunc, 
                                          trans_d3){

console.log("High Update") 

const zoom_group = d3.select('.zoom_group_g')
const svg = d3.select(".svg-content-responsive")

/* ----- */        
/*  */
/* HIGHLIGHTS  */
/*  */
/* ----- */

d3.selectAll('circle')  // Put non-highlighted circles in opacity background 
  .filter(function() {
    const tthis = d3.select(this) 
    return !tthis.classed('trace') && 
           tthis.attr("data-highlighted") === "false"
  })
  .attr('opacity', OpacityRange[0])
  .style('stroke', 'none')
  .on("mouseout", function(d) { // standard mouseout for non-highlighted
    d3.select('.tooltip')
      .transition()
      .duration(100)
      .style('opacity', 0);
    d3.select(this)
      .style("stroke", "none")
  })

d3.selectAll('.firmLabel')  // Put non-highlighted labels in opacity background 
  .filter(function() {
    const tthis = d3.select(this) 
    return !tthis.classed('trace') && 
           tthis.attr("data-highlighted") === "false"
  })
  // .attr('fill-opacity', 0.25)
  .attr('opacity', OpacityRange[0])
     
/*  */
/* Clear SVG if click is a "background" click */
/*  */

if(justClicked[0] === 'background'){  
  clearSVG(svg, allNames, data, sizeSel, time, OpacityRange, OpacityDomain,  OpacityExponent, AdaptDisp)
  zoom_group.attr('data-high-count', 0)
}

/* ----- */  
/*  */
/* HIGHLIGHT click if NOT already highlighted */
/*  */
/* ----- */  

if(justClicked[0] === 'high'){                                                      
  justClicked[2] // Highlight main firm circle
    .attr("data-highlighted", 'true')
    .attr('opacity', 1)
    .style('stroke', 'black')
    .on("mouseout", function(d) { //special mouseout to keep clicked stroke
      d3.select('.tooltip')
        .transition()
        .duration(100)
        .style('opacity', 0);
  })

  d3.selectAll('.firmLabel') //Highlight firm label
    .filter(function(d) {return d.name === justClicked[1]})
    .attr('opacity', 1)
    .attr('display', 'inline')
    .attr("data-highlighted", 'true')

  const filt_data = data.filter(function(d){ return d.name === justClicked[1] })

  /*  */
  /* Add Trace */
  /*  */

  /* Add path trace */

  if(filt_data.length === nTimes){ // Complete data series for all times

    zoom_group.selectAll('path-trace-firm') 
      .data([ filt_data  ]) // data is array because object to create is path element (multiple points)
      .enter()
      .append('path')
      .attr('data-highlighted', 'true')
      .classed('trace', true)
      .sort((a, b) => d3.descending(a.time, b.time))
      .attr('class', 'trace path-trace-firm')
      .attr("d", d3.line()
                  .x(d => x(d.x))
                  .y(d => y(d.y))
      )
      .attr('fill', 'none')
      .attr('stroke-width', 1)
      .attr('stroke', 'black')
      .attr('opacity', OpacityRange[0]) 
      .lower() 
  } else { // Incomplete data series, missing for some times

    for (let i = 0; i < filt_data.length - 1; i++) {

      let filt_data_2 = filt_data.slice(i, i+2)

      if(filt_data_2[1]['time'] - filt_data_2[0]['time'] === 1){
        zoom_group.selectAll('path-trace-firm') 
          .data([ filt_data_2  ]) // data is array because object to create is path element (multiple points)
          .enter()
          .append('path')
          .attr('data-highlighted', 'true')
          .classed('trace', true)
          .sort((a, b) => d3.descending(a.time, b.time))
          .attr('class', 'trace path-trace-firm')
          .attr("d", d3.line()
                      .x(d => x(d.x))
                      .y(d => y(d.y))
          )
          .attr('fill', 'none')
          .attr('stroke-width', 1)
          .attr('stroke', 'black')
          .attr('opacity', OpacityRange[0]) 
          .lower()
      }
    }
  }

  /* Add circle trace */  
  
  zoom_group.selectAll('circle-trace-firm') 
    .data(filt_data)
    .enter()
    .append('circle')
    .attr('display', 'inline')
    .attr('data-highlighted', 'true')
    .sort((a, b) => d3.descending(a.time, b.time))
    .classed('trace', true)
    .classed('circle-trace-firm', true)
    .attr('fill', 'grey')
    .attr('stroke', 'black')
    .attr('cx', d => x(d.x))
    .attr('cy', d => y(d.y))
    .attr('opacity', OpacityRange[0]) 
    .attr("r", d => rfunc(d, trans_d3.k) )
    .lower() 

      /* Add time label trace */  

    const timeLabsElements = zoom_group.selectAll('time-label-trace-firm')
    
    timeLabsElements
      .data(filt_data)
      .enter()
      .append('text')
      .attr('display', 'inline')
      .attr('data-highlighted', 'true')
      .sort((a, b) => d3.descending(a.time, b.time))
      .classed('trace', true)
      .classed('time-label-trace-firm', true)
      .classed('unselectable', true)
      .attr('fill', 'grey')
      .attr('stroke', 'black')
      .text(d => d.time)
      .attr('x', d => xYLfunc(d, trans_d3.k) )
      .attr('y', d => yYLfunc(d, trans_d3.k) )
      .attr('font-size', 12/trans_d3.k)
      .attr('opacity', OpacityRange[0])
      .attr("text-anchor", "end") // https://stackoverflow.com/questions/13188125/d3-add-multiple-classes-with-function
      .attr("visibility", d =>  timeLabs === 'true' ? "visible" : "hidden")
      .lower() 
} 

/*  */
/* DE-HIGHLIGHT click if already highlighted */
/*  */
if(justClicked[0] === 'dehigh') { 

  justClicked[2]
    .attr("data-highlighted", 'false')
    .attr('opacity', OpacityRange[0])
    .style('stroke', 'none')
    .on("mouseout", function(d) {
      d3.select('.tooltip')
        .transition()
        .duration(100)
        .style('opacity', 0);
      d3.select(this)
      .style("stroke", "none")
    })

  if(justClicked[5] > nFirms){
    justClicked[2].attr('display', 'none')
  }

  console.log('dehigh')

  svg.selectAll('.trace') //De-highlight trace
      .filter(d => d.length > 1 ?  d[0].name === justClicked[1] : d.name === justClicked[1]) // d[0] is first element of path if element is path element
      .remove()
  
  let to_be_dehigh = d3.selectAll('.firmLabel') //De-highlight firm label
                        .filter(d => d.name === justClicked[1])
                        .attr("data-highlighted", 'false')

  if(allNames === 'true'){
  to_be_dehigh
    // .attr('fill-opacity', 0.25)
    .attr('opacity', OpacityRange[0])
  } else { 
  to_be_dehigh
    // .attr('fill-opacity', 0.25)
    .attr('opacity', OpacityRange[0])
    .attr('display', 'none')
  }

  if(zoom_group.attr('data-high-count') === '0'){
    clearSVG(svg, allNames, data, sizeSel, time, OpacityRange, OpacityDomain,  OpacityExponent, AdaptDisp)
    zoom_group.attr('data-high-count', 0)
  }

}

}