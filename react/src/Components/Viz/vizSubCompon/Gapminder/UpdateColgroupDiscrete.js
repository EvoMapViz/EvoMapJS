import * as d3 from 'd3';

export default function UpdateColgroupDiscrete(colGroup, nFirms, sizeSel, colorSel, allNames, 
                                              Sizeincreasing, maxNfirms){

console.log("Cluster DISCRETE Update") 

const selRank = 'rank-' + sizeSel
const svg = d3.select(".svg-content-responsive")

const f_circ =  svg.selectAll('.circle-firm')
const f_trace =  svg.selectAll('.trace')
const f_lab =  svg.selectAll('.firmLabel')
const f_circ_Nshow = f_circ
                      .filter(function(d){
                        if(Sizeincreasing === 'true'){ return d[selRank] <= nFirms}
                        if(Sizeincreasing === 'false'){return d[selRank] >= (maxNfirms - nFirms)}  
                      })
const f_lab_Nshow = f_lab
                      .filter(function(d){
                        if(Sizeincreasing === 'true'){ return d[selRank] <= nFirms}
                        if(Sizeincreasing === 'false'){return d[selRank] >= (maxNfirms - nFirms)}  
                      })

// 
// Click is on background of colGroup legend, go back to showing everything  
//

if(colGroup === "Show All"){
  f_circ_Nshow
     .attr('display', 'inline')
  f_trace
    .filter(function(d){ return d3.select(this).attr('data-highlighted') === 'true'})
     .attr('display', 'inline')
  f_lab
     .filter(function(d){ return d3.select(this).attr('data-highlighted') === 'true'})
     .attr('display', 'inline') 

  if(allNames === 'true'){
    f_lab_Nshow
      .attr('display', 'inline')
  }

} else {

// 
// Click is on a colGroup in the legend, show only those circles 
//

const names_in_group = f_circ
                          .filter(d => d[colorSel] === colGroup)
                          .nodes()
                          .map(d => d.__data__.name)

  // Elements to hide
  f_circ
  .filter(d => !names_in_group.includes(d.name))
    .attr('display', 'none')
  f_trace
  .filter(d => !names_in_group.includes(d.length > 1 ? d[0].name : d.name))
    .attr('display', 'none')
  f_lab
  .filter(d => !names_in_group.includes(d.name))
    .attr('display', 'none')

  // Elements to show  
  f_circ_Nshow
    .filter(d => d[colorSel] === colGroup)
    .attr('display', 'inline')
  f_trace
    .filter(function(d){return names_in_group.includes(d.length > 1 ? d[0].name : d.name) && 
                               d3.select(this).attr('data-highlighted') === 'true'}) 
    .attr('display', 'inline')
  f_lab
    .filter(function(d){return names_in_group.includes(d.name) && 
                               d3.select(this).attr('data-highlighted') === 'true'})
    .attr('display', 'inline') 

  if(allNames === 'true'){
    f_lab_Nshow
      .filter(d => names_in_group.includes(d.name))
      .attr('display', 'inline') 
  }

}

}