import * as d3 from 'd3';
import svgButton from "./utils/svgButton";
import arrow9 from './utils/arrow9.js';

export default function UpdateZoom( data,
                                    Width, Height,
                                    XDomain, YDomain, XRange, YRange,
                                    SizeExponent, SizeRange, SizeDomain, SizeIncreasing,
                                    FontRange, FontDomain, FontExponent, OpacityRange, OpacityDomain, OpacityExponent,
                                    adaptDisps, sizeSel,
                                    trans_d3, setTrans_d3,
                                    isArrows){

console.log("Update Zoom") 

/*  */
/* Parameters and scales */
/*  */

const svg = d3.select(".svg-content-responsive")

const width = Width;
const height = Height;
const label_nudge = 0.12; // label nudge away from circles
const arrow_text_dodge = 0.5; // nudge text away from arrow

const x = d3.scaleLinear()
            .domain(XDomain)
            .range(XRange)
const y = d3.scaleLinear()
            .domain(YDomain) 
            .range(YRange) 
const size = d3.scalePow()
            .exponent(SizeExponent)
            .domain(SizeDomain)
            .range(SizeRange)
const fontScale = d3.scalePow()
                .exponent(FontExponent)
                .domain(FontDomain)
                .range(FontRange)

let xfunc;
if (adaptDisps === "true") {
  if (SizeIncreasing === "true") {
    xfunc = (d, tdk = 1) => x(d.x) + (size(d[sizeSel]) / tdk) + label_nudge;
  } else {
    xfunc = (d, tdk = 1) => x(d.x) + (size(SizeDomain[1] - d[sizeSel]) / tdk) + label_nudge;
  }
} else {
  xfunc = (d, tdk = 1) => x(d.x) + 4/tdk + label_nudge;
}

let yfunc;
if (adaptDisps === "true") {
  if (SizeIncreasing === "true") {
    yfunc = (d, tdk = 1) => y(d.y) - (size(d[sizeSel]) / tdk) - label_nudge;
  } else {
    yfunc = (d, tdk = 1) => y(d.y) - (size(SizeDomain[1] - d[sizeSel]) / tdk) - label_nudge;
  }
} else {
  yfunc = (d, tdk = 1) => y(d.y) - 4/tdk + label_nudge;
}

let fontfunc;
if (adaptDisps === "true") {
  if (SizeIncreasing === "true") {
    fontfunc = (d, tdk = 1) => fontScale(d[sizeSel]) / tdk;
  } else {
    fontfunc = (d, tdk = 1) => fontScale(SizeDomain[1] - d[sizeSel]) / tdk;
  }
} else {
  fontfunc = (d, tdk = 1) => 12 / tdk;
}

let xYLfunc;
if (adaptDisps === "true") {
  if (SizeIncreasing === "true") {
    xYLfunc = (d, tdk = 1) => x(d.x) - (size(d[sizeSel]) / tdk) - label_nudge;
  } else {
    xYLfunc = (d, tdk = 1) => x(d.x) - (size(SizeDomain[1] - d[sizeSel]) / tdk) - label_nudge;
  }
} else {
  xYLfunc = (d, tdk = 1) => x(d.x) - 4/tdk + label_nudge;
}

let yYLfunc;
if (adaptDisps === "true") {
  if (SizeIncreasing === "true") {
    yYLfunc = (d, tdk = 1) => y(d.y) + (size(d[sizeSel]) / tdk) + label_nudge;
  } else {
    yYLfunc = (d, tdk = 1) => y(d.y) + (size(SizeDomain[1] - d[sizeSel]) / tdk) + label_nudge;
  }
} else {
  yYLfunc = (d, tdk = 1) => y(d.y) + 4/tdk + label_nudge;
}

let rfunc;
if (adaptDisps === "true") {
  if (SizeIncreasing === "true") {
    rfunc = (d, tdk = 1) => size(d[sizeSel]) / tdk;
  } else {
    rfunc = (d, tdk = 1) => size(SizeDomain[1] - d[sizeSel]) / tdk;
  }
} else {
  rfunc = (d, tdk = 1) => 4 / tdk;
}

/*  */            
// Zoom elements
/*  */

var zoom = d3.zoom()
  .scaleExtent([.5, 20])  
  .extent([[0, 0], [width, height]])
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