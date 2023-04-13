import * as d3 from 'd3';
import arrow9 from './utils/arrow9.js';
import tooltipGen from "./utils/tooltipGen";
import svgButton from "./utils/svgButton";


export default function Draw(data, meta, arrows, isArrows,
                              Width, Height, Margin, Share,
                              allFirms, minTime,
                              sizeSel, colorSel,
                              setTrans_d3, setJustClicked, 
                              OpacityRange,
                              x,y,
                              xfunc, yfunc, xYLfunc, yYLfunc, rfunc, fontfunc, opacityfunc, fillfunc, displayfunc, sortfunc,
                              refcur){

console.log('DRAW')

/*  */
/* SVG setup  */
/*  */

const width = Width;
const height = Height;
const margin = Margin
const arrow_text_dodge = 0.5; // nudge text away from arrow

const width_c2 = '40px; min-width: 5px; justify-content: center;">' // impacts style of tooltip columns
        


// Responsive SVG, see 
// https://stackoverflow.com/questions/16265123/resize-svg-when-window-is-resized-in-d3-js or
// https://stackoverflow.com/questions/9400615/whats-the-best-way-to-make-a-d3-js-visualisation-layout-responsive
const svg = d3.select(refcur)
              .style('width', Share + '%')
              .style('height', '99%')
              .attr('class', 'back-fore') //https://stackoverflow.com/a/48877138
              .append('div')
              .attr('class', 'background')//https://stackoverflow.com/a/48877138
              .append('svg')
              .style('width', '100%')
              .style('height', '100%')
              .attr("viewBox", "0 0 " + width + " " + height)
              .attr("class", 'svg-content-responsive')

// Tooltip
const tooldiv = d3.select(refcur)
              .append("div")
              .attr("class", "tooltip")
              .style('position', 'fixed')
              .style('opacity', 0);

const toolVarList = meta
                      .filter(d => d.tooltip === 'true' | d.tooltip === 'only')
                      .map(function(d){
                        let varList = {
                          'name': 'Missing name',
                          'label': 'Missing Label',
                          'value': 'Missing value',
                          'type': 'discrete',
                        }
                        if(typeof d.name !== 'undefined'){ varList.name = d.name}
                        if(typeof d.label !== 'undefined'){ varList.label = d.label}
                        if(typeof d.type !== 'undefined'){ varList.type = d.type}
                        if(typeof d.decimals !== 'undefined'){ varList['decimals'] = d.decimals}
                        if(typeof d.truncate_label !== 'undefined'){ varList['truncate_label'] = d.truncate_label}
                        if(typeof d.truncate_value !== 'undefined'){ varList['truncate_value'] = d.truncate_value}
                        if(typeof d.unit !== 'undefined'){ varList['unit'] = d.unit}
                        
                        return varList
                      })

/*  */
//
// Scales and parameters
//
/*  */

/* Scales */
const times = d3.extent(data, d => d.time);

/*  */
//
// Large bottom left time label
//
/*  */

svg.append('text')
  .attr('class', 'timeLabel')
  .attr('x', 40)
  .attr('y', height - margin.bottom - 20)
  .attr('fill', '#ccc')
  .attr('font-family', 'Helvetica Neue, Arial')
  .attr('font-weight', 500)
  .attr('font-size', 60)
  .text(times[0]);

/*  */
//
// Zoom and zoom buttons
//
/*  */

/*  */
// Zoom
/*  */

var zoom = d3.zoom()
  .scaleExtent([.5, 20])  
  .extent([[0, 0], [width, height]])
  .on("zoom", zoomed);

var trans_d3 = {k:1, x:0, y:60}

const backFore = d3.select('.back-fore')

backFore
  .style("pointer-events", "all")
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .call(zoom)
  .on("dblclick.zoom", null);

var zoom_group = svg
                  .append("g")
                  .attr("class", "zoom_group_g")
                  .attr("transform", 'translate(0,60) scale(1)') // Sets initial transform
backFore.call(zoom.transform, d3.zoomIdentity.translate(0,60)) // Sets corresponding initial

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
  
  // Trace year labels
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
// Zoom Buttons
/*  */

var zoomData = [{label: "Zoom in", type: "in", x: 30, y: 70 },
                {label: "Zoom out", type: "out", x: 30, y: 120 },
                {label: "Reset", type:"reset", x: 30, y: 170 }];

var button = svgButton(zoom) 

const zoom_button_svg = d3.selectAll('.back-fore')
                          .append('div')
                          .attr('class', 'foreground') // https://stackoverflow.com/a/48877138
                          .append('svg')
                          .style('width', '11%')
                          .style('height', '22%')
                          .attr("viewBox", "0 0 " + 100 + " " + 240)
                          .attr("class", 'svg-content-responsive')

zoom_button_svg
.selectAll('.button')
    .data(zoomData)
.enter()
    .append('g')
    .classed('button', true)
    .call(button);

/*  */
// Snapshot Button
/*  */

zoom_button_svg
.append('g')
.classed('snap_button_g', 'true')
.append("path")
.attr('d', "M896 672q119 0 203.5 84.5t84.5 203.5-84.5 203.5-203.5 84.5-203.5-84.5-84.5-203.5 84.5-203.5 203.5-84.5zm704-416q106 0 181 75t75 181v896q0 106-75 181t-181 75h-1408q-106 0-181-75t-75-181v-896q0-106 75-181t181-75h224l51-136q19-49 69.5-84.5t103.5-35.5h512q53 0 103.5 35.5t69.5 84.5l51 136h224zm-704 1152q185 0 316.5-131.5t131.5-316.5-131.5-316.5-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5z")
.attr('transform', 'translate(12 193) scale(0.02)')
.attr('id', 'snapbutton')

zoom_button_svg
.select('.snap_button_g')
.append('rect')
.attr('y', 0)
.attr('x', -100)
.attr('width', 1960)
.attr('height', 1760)
.classed('snap-button-rect', 'true')
.attr('cursor', 'pointer')
.attr('transform', 'translate(12 193) scale(0.02)')
.style('opacity', 0)
.on('mouseover', function(){d3.select('#snapbutton').attr('fill','#8f8f8f')})
.on('mouseout', function(){d3.select('#snapbutton').attr('fill','#4a4a4a')})
//
// "On click" snapshot event
//
.on('click', function() {

  console.log('SNAPSHOT!')

  // Button blink effect
  d3.select('#snapbutton')
  .transition()
  .duration(150)
  .attr('fill','#FBF7F3')
  .transition()
  .duration(200)
  .attr('fill','#4a4a4a')

  // Create blank clone svg canvas to host both the graph *and* legend svgs
  d3.select('.content')
              .append('svg')
              .style('width', '1400px')
              .style('height', '700px')
              .attr("class", 'svg_clone')

  // Clone main graph
 d3.select(".svg-content-responsive")
    .clone(true)                      // https://stackoverflow.com/questions/72727906/react-application-breaks-after-downloading-svg-through-d3-save-svg
    .attr('class', 'svg_graph_clone')
    .selectAll('g')
    .filter(function(){
      let tclass = d3.select(this).attr('class')
      return tclass === 'button' | tclass === 'snap_button_g' | tclass === 'axis axis--y' | tclass === 'axis axis--x'})
    .remove()
  
  d3.select(".svg_graph_clone")
    .selectAll('text')
    .attr('font-family', 'Helvetica,Arial,sans-serif')

  // Clone legends      
  
  d3.select('.legend-title-svg-responsive-container_1')
    .clone(true)                        // Again, need to clone first otherwise messes up with components of App itself              
    .attr('class', 'size_legend_title_clone')
    .selectAll('text')
    .attr('font-family', 'Helvetica,Arial,sans-serif')
  d3.select('.legend-svg-content-responsive')
    .clone(true)                     
    .attr('class', 'size_legend_clone')
    .selectAll('text')
    .attr('font-family', 'Helvetica,Arial,sans-serif')
  d3.select('.legend-title-svg-responsive-container_2')
    .clone(true)                      
    .attr('class', 'color_legend_title_clone')
    .selectAll('text')
    .attr('font-family', 'Helvetica,Arial,sans-serif')
  d3.select('.color-legend-svg-content-responsive')
    .clone(true)                      
    .attr('class', 'color_legend_clone')
    .selectAll('text')
    .attr('font-family', 'Helvetica,Arial,sans-serif')
    .attr('font-size', '24px')

  //Attach main graph and legends to blank clone svg canvas

  let tnodes = d3.select(".svg_clone").node()

  tnodes.appendChild(d3.select('.svg_graph_clone').node()) // https://stackoverflow.com/questions/21209549/embed-and-refer-to-an-external-svg-via-d3-and-or-javascript/21289967#21289967
  
  d3.select(".svg_clone").append('rect')
                        .attr('width', '13%')
                        .attr('height', '100%')
                        .attr('x', '87%')
                        .attr('class', 'clone_legend_background_rect') 
                        .style('fill', 'white')
  
  tnodes.appendChild(d3.select('.size_legend_title_clone').node()) 
  tnodes.appendChild(d3.select('.size_legend_clone').node())
  tnodes.appendChild(d3.select('.color_legend_title_clone').node())
  tnodes.appendChild(d3.select('.color_legend_clone').node())

  // Tune positions and sizings

  d3.select(".size_legend_title_clone") // size legend title
    .attr("viewBox", "0 0 250 30")
    .attr('width', '13%')
    .attr('x', '87%')
    .attr('y', '2%')

  d3.select(".size_legend_clone") // size legend
    .attr('width', '13%')
    .attr('x', '87%')
    .attr('y', '-33%')

  d3.select(".color_legend_title_clone") // color legend title
  .attr("viewBox", "0 0 250 30")
  .attr('width', '13%')
  .attr('x', '87%')
  .attr('y', '25%')

  d3.select(".color_legend_clone") // color legend 
    .attr('width', '19%')
    .attr('x', '82%')
    .attr('y', '4%')

  d3.select(".svg_graph_clone") // graph
    .attr("viewBox", "0 0 1600 1000");
  
  d3.select(".svg_clone")
    .attr('block-size', '650px')

  function saveSvg(svgEl, name) { //https://stackoverflow.com/a/46403589
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

  const toBeExported = d3.select(".svg_clone")['_groups'][0][0]
  saveSvg(toBeExported, 'test.svg')

  d3.select('.svg_clone').remove()
  d3.select('.size_legend_clone').remove() // For some reason, no need to further remove size_legend_clone (somehow already removed as part of "d3.select('.svg_clone').remove()"?)

});


/*  *//*  */
/*  */
//
// Initialize main graph
//
/*  */
/*  *//*  */


/*  */
/* Remove all highlights and trace when click on background */
/*  */

svg.on('click', function(event){
  if(event.target.className.baseVal === "svg-content-responsive"){ // if click is not also firm
    setJustClicked(['background'])
  }
});

/*  */
// Initalize explainer arrows
/*  */

if(isArrows){
  const arrow_svg = zoom_group
  .selectAll("explainer-arrow")  
  .data(
      arrows.filter((d) => d.time === minTime),
      (d) => d.name
    ) // d=>d.name is animation key
  .enter()

  arrow_svg
    .append("line")
    .attr("data-name", (d) => d.name)
    .classed('explainer-arrow', true)
    .classed('explainer', true)
    .attr("marker-end", "url(#my-arrow)")
    .attr("x1", x(0))
    .attr("y1", y(0))
    .attr("x2", (d) => x(d.x))
    .attr("y2", (d) => y(d.y))
    .attr("stroke", "#C0C0C0")
    .attr("stroke-width", 2/trans_d3.k)

  arrow_svg 
    .append('text')
    .attr("data-name", (d) => d.name)
    .classed('arrow-text', true)
    .classed('explainer', true)
    .text(d => d.name)
    .attr('fill', 'black')
    .attr('stroke', 'none')
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
    .attr('opacity', OpacityRange[0])
    .classed('arrow-text', true)
    .style("text-anchor", "middle") // https://stackoverflow.com/questions/13188125/d3-add-multiple-classes-with-function
}

/*  */
// Initalize circles
/*  */

/* Find first data entry for each firm */

const first_time_entries = allFirms.map(function(d){
  const firm_times = data
                      .filter(e => e.name === d)
                      .map(e => e.time)
  
  return({'name' : d, 'minTime' : d3.min(firm_times)})
})

function appendColumn(DF, column_name, column_data){ // Generate a function that appends column to a json object called "DF" (Copilot)
DF.map(function(d,i){
d[column_name] = column_data[i]
})
}

appendColumn(data,
'FY',
data.map(function(d){
const LFY = first_time_entries
.filter(e => e.name === d.name)
.map(e => e.minTime)
return(LFY[0])
})
)

/* Draw circles */

const selRank = 'rank-' + sizeSel

zoom_group
  .attr("data-high-count", 0)
  .selectAll("circle-firms")
  .data(
    data.filter((d) => d.time === d.FY),
    (d) => d.name
  ) // d=>d.name is animation key
  .enter()
  .append("circle")
  .sort(sortfunc)
  .classed("zoom-group", true)
  .classed("circle-firm", true)
  .attr("data-highlighted", false)
  .attr("fill", fillfunc)
  .attr("cx", (d) => x(d.x))
  .attr("cy", (d) => y(d.y))
  .attr("r", d => rfunc(d, trans_d3.k))
  .attr('opacity', OpacityRange[1])
  .attr("display", displayfunc)
  /* Click events */
  .on("click", function (event, d) {
    let tthis = d3.select(this);
    let cur_count = parseInt(zoom_group.attr("data-high-count"));
    let loc_high = tthis.attr("data-highlighted");

    if (loc_high === "true") {
      console.log("DE-highlight click!");
      tthis.attr("data-highlighted", "false");
      setJustClicked(["dehigh", d.name, tthis, d[colorSel], d[selRank]]);
      zoom_group.attr("data-high-count", cur_count - 1);
    }

    if (loc_high === "false") {
      console.log("HIghlight click!");
      tthis.attr("data-highlighted", "true");
      setJustClicked(["high", d.name, tthis, d[colorSel], d[selRank]]);
      zoom_group.attr("data-high-count", cur_count + 1);
    }
  })
  /* Show tooltip on hover */
  .on("mouseover", function (event, d) {
    tooldiv.transition().duration(100).style('opacity', 0.9);
    tooldiv
      .html(
        tooltipGen(
          d.name,
          toolVarList.map((e) => ({ ...e, value: d[e.name] })),
          width_c2
        )
      )
      .style("z-index", 9)
      .style("left", event.pageX + 10 + "px")
      .style(
        "top",
        event.pageY - document.documentElement.scrollTop + 10 + "px"
      );

    d3.select(this).style("stroke", "black");
  })
  .on("mouseout", function (d) {
    tooldiv.transition().duration(100).style('opacity', 0);
    d3.select(this).style("stroke", "none");
  })
  .filter((d) => d.time !== minTime) // Hide circles whose time is not minTime
  .attr("visibility", "hidden");

/*  */
// Initialize labels
/*  */

zoom_group.selectAll('label-firms')
  .data(
    data.filter((d) => d.time === d.FY),
    (d) => d.name
  ) // d=>d.name is animation key
  .enter()
  .append('text')
  .sort(sortfunc)
  .classed('firmLabel', true)
  .classed('zoom-group', true)
  .classed('unselectable', true)
  .text(d => d.label)
  .attr('data-highlighted', false)
  .attr('x', d => xfunc(d, trans_d3.k)) // adjust for size of circle
  .attr('y', d => yfunc(d, trans_d3.k))
  .attr('font-size', d => fontfunc(d, trans_d3.k))
  .attr('opacity', opacityfunc)
  .attr('display', 'none')
  .filter((d) => d.time !== minTime) // Hide labels whose time is not minTime
  .attr("visibility", "hidden");


}