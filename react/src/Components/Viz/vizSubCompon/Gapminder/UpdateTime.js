import * as d3 from "d3";

export default function UpdateTime(
  data, arrows, isArrows,
  time,
  Colortype, 
  x,y,
  xfunc, yfunc, rfunc, fontfunc, opacityfunc, fillfunc,
  highlightCount,
  trans_d3
) {
  console.log("Update Time");

  const zoom_group = d3.select(".zoom_group_g");
  const svg = d3.select(".svg-content-responsive");
  const arrow_text_dodge = 0.5; // nudge text away from arrow

  /* Time Label */
  svg.selectAll(".timeLabel").text(time);


  /*  */
  /* Update Firm circles */
  /*  */

  const f_circ = zoom_group.selectAll(".circle-firm").data(
    data.filter((d) => d.time === time),
    (d) => d.name // d=>d.name is animation key
  );

  /* Transition circles with non-missing data */

  if (Colortype === "discrete") {
    
    f_circ
      .transition()
      .duration(200)
      .ease(d3.easeLinear)
      .attr("cx", (d) => x(d.x))
      .attr("cy", (d) => y(d.y))
      .attr("r", d => rfunc(d, trans_d3.k))
      .transition()
      .duration(1) // adding an extra transition guarantees the circles are only visible after they have moved
      .ease(d3.easeLinear)
      .attr('visibility', 'visible')

    }

  if (Colortype === "continuous") {

    f_circ
      .transition()
      .duration(200)
      .ease(d3.easeLinear)
      .attr("cx", (d) => x(d.x))
      .attr("cy", (d) => y(d.y))
      .attr("r", d => rfunc(d, trans_d3.k))
      .attr('fill', fillfunc)
      .transition()
      .duration(1) // adding an extra transition guarantees the circles are only visible after they have moved
      .ease(d3.easeLinear)
      .attr('visibility', 'visible')

    }

  /* Hide circles with missing data */

  zoom_group
    .selectAll(".circle-firm")
    .filter((d) => d.time !== time)
    .attr("visibility", "hidden");

  /*  */
  /* Update labels */
  /*  */

   /* Transition labels with non-missing data */

  const labels = zoom_group.selectAll(".firmLabel").data(
    data.filter((d) => d.time === time),
    (d) => d.name
  ); // d=>d.name is animation key

  if(highlightCount === 0){
    labels
    .transition()
    .duration(200)
    .ease(d3.easeLinear)
    .attr("x", d => xfunc(d, trans_d3.k)) 
    .attr("y", d => yfunc(d, trans_d3.k))
    .attr("font-size", d => fontfunc(d, trans_d3.k)) 
    .attr('opacity', d => opacityfunc(d))
    .transition()
    .duration(1) // adding an extra transition guarantees the labels are only visible after they have moved.
                // Using on.('end') method instead (https://stackoverflow.com/a/10692220/14095529) creates severe lags in the time animation 
    .attr('visibility', 'visible')
  } else {
    labels
    .transition()
    .duration(200)
    .ease(d3.easeLinear)
    .attr("x", d => xfunc(d, trans_d3.k)) 
    .attr("y", d => yfunc(d, trans_d3.k))
    .attr("font-size", d => fontfunc(d, trans_d3.k)) 
    .transition()
    .duration(1) // adding an extra transition guarantees the labels are only visible after they have moved.
                // Using on.('end') method instead (https://stackoverflow.com/a/10692220/14095529) creates severe lags in the time animation 
    .attr('visibility', 'visible')
  }
                                                              
/* Hide labels with missing data */

zoom_group
  .selectAll(".firmLabel")
  .filter((d) => d.time !== time)
  .attr("visibility", "hidden");
  

if(isArrows){  
  /*  */
  /* Update explainer arrows */
  /*  */

  let arrow_nodes = zoom_group
                .selectAll(".explainer-arrow")
                .data(
                  arrows.filter((d) => d.time === time),
                  (d) => d.name
                ); // d=>d.name is animation key

  arrow_nodes
    .transition()
    .duration(200)
    .ease(d3.easeLinear)
    .attr("x1", x(0))
    .attr("y1", y(0))
    .attr("x2", (d) => x(d.x))
    .attr("y2", (d) => y(d.y))
    .attr("stroke-width", 2/trans_d3.k)

  /*  */
  /* Update explainer text */
  /*  */

  let arrow_text_nodes = zoom_group
    .selectAll(".arrow-text")
    .data(
      arrows.filter((d) => d.time === time),
      (d) => d.name
    ); // d=>d.name is animation key

  arrow_text_nodes
    .transition()
    .duration(200)
    .ease(d3.easeLinear)
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
}


}
