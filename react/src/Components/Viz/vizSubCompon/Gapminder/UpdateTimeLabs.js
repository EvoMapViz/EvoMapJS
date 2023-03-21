import * as d3 from 'd3';

export default function UpdateArrows(timeLabs){

console.log("Time labels update")
console.log('timeLabs: ', timeLabs) 

const timeLabsElements = d3.select('.zoom_group_g')
                     .selectAll('.time-label-trace-firm')

timeLabs === 'true' ? timeLabsElements.attr("visibility", "visible") : timeLabsElements.attr("visibility", "hidden")
}