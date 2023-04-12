import * as d3 from 'd3';

export default function UpdateAdaptiveDisplay(
                                            XDomain, YDomain, XRange, YRange,
                                            SizeExponent, SizeRange, SizeDomain, SizeIncreasing,
                                            FontRange, FontDomain, FontExponent, 
                                            OpacityRange, OpacityDomain, OpacityExponent,
                                            adaptDisps, sizeSel,
                                            trans_d3){

console.log("Adaptive Size Update")

const svg = d3.select(".svg-content-responsive")
const label_nudge = 0.12; // label nudge away from circles
const zoom_group = d3.select('.zoom_group_g')

const x = d3.scaleLinear()
            .domain(XDomain)
            .range(XRange)
const y = d3.scaleLinear()
            .domain(YDomain) //-4 leaves room for time label
            .range(YRange)
const size = d3.scalePow()
            .exponent(SizeExponent)
            .domain(SizeDomain)
            .range(SizeRange)
const fontScale = d3.scalePow()
                .exponent(FontExponent)
                .domain(FontDomain)
                .range(FontRange)
const opacityScale = d3.scalePow()
              .exponent(OpacityExponent)
              .domain(OpacityDomain)
              .range(OpacityRange)

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

let opacityfunc;
  if(adaptDisps === 'true'){
    if(SizeIncreasing === "true"){ 
      opacityfunc = (d) => opacityScale(d[sizeSel]) } else {
      opacityfunc = (d) => opacityScale(SizeDomain[1] - d[sizeSel])}
  } else {
      opacityfunc = (d) => OpacityRange[1]
  }

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

if(zoom_group.attr('data-high-count') === "0"){
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