import * as d3 from 'd3';

export default function UpdateColorSel(data,
                                      colorSel, 
                                      setJustClicked, allNames,
                                      fillfunc,
                                      sizeSel, time, OpacityRange, OpacityDomain, OpacityExponent,
                                      setClearSvgTrigger, highlightCount, setHighlightCount,){

console.log("Color selector Update");

const svg = d3.select(".svg-content-responsive");
const circ = svg.selectAll(".circle-firm");
const selRank = 'rank-' + sizeSel;

// Update on-click event so setJustClicked and thereby traces added later on have the right cluster (d[colorSel]) associated with them.
const zoom_group = d3.selectAll(".zoom_group_g");
circ.on("click", function (event, d) {
  let tthis = d3.select(this);
  if (tthis.attr("data-highlighted") === "true") {
    tthis.attr("data-highlighted", "false");
    setJustClicked(["dehigh", d.name, tthis, d[colorSel], d[selRank]]);
    setHighlightCount(d => d - 1);
  } else {
    tthis.attr("data-highlighted", "true");
    setJustClicked(["high", d.name, tthis, d[colorSel], d[selRank]]);
    setHighlightCount(d => d + 1)
  }

  if (highlightCount === 0) {
    setClearSvgTrigger(d => d + 1)
    setHighlightCount(0)
  }
});

// Update colors and attributes

circ
  .transition()
  .duration(700)
  .attr("fill", fillfunc);

}