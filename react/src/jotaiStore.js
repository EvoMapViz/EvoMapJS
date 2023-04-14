import { atom } from "jotai";

import circle_data from "./data/circles.json"
import meta_data from "./data/metadata.json"
import arrow_data from "./data/arrows.json"
import abbreviate from "abbreviate";
import { tidy, select, mutate, rename } from '@tidyjs/tidy';
import * as d3 from "d3";
import {interpolatePlasma} from "d3-scale-chromatic";

/*  */
/* State variables for user controls */ // Some other variables are defined through initialization inside the Meta-Data section
/*  */

const adaptDisps = atom('true');
const allNames = atom('false');
const timeLabs = atom('true');
const display = atom(['adaptDisps', 'timeLabs'])

const justClicked = atom('');
const justSelHigh = atom('');
const colgroup = atom('Show All');
const arrowsSel = atom('');

/*  */
/* Visualization dimensions and positionning */
/*  */

const share = 80; /* Share in percent of the width reserved for graph (as opposed to legend)  */
const width = 1000;
const height = 1000;
const margin = {top: 10, right: 18, bottom: 18, left: 23};
const x_domain = [d3.min(circle_data, d => d.x) , 
                  d3.max(circle_data, d => d.x) 
                ];
const y_domain = [d3.min(circle_data, d => d.y) - 4, //-4 leaves room for time label
                  d3.max(circle_data, d => d.y)
                ]; 
const x_range = [0, width]
const y_range = [height, 0]

const Share = atom(share)
const Width = atom(width)
const Height = atom(height)
const Margin = atom(margin)

const xDomain = atom(x_domain)
const yDomain = atom(y_domain)
const xRange = atom(x_range)
const yRange = atom(y_range)

/*  */
/* Meta-Data */
/*  */

const metaData = atom(meta_data)
const sizeOptionsNA = meta_data
                        .filter(d =>  d.type === "continuous" && d.tooltip !== 'only')
                        .sort((a, b) => a.label.localeCompare(b.label))
const colorOptionsNA = meta_data
                        .filter(d => d.tooltip !== 'only')
                        .sort((a, b) => a.label.localeCompare(b.label))

const default_color_sel = colorOptionsNA[0]
const default_size_sel = sizeOptionsNA[0]

const sizeOptions = atom(sizeOptionsNA.map(d => ({"name": d.name, "label": d.label}) ))
const colorOptions = atom(colorOptionsNA.map(d => ({"name": d.name, "label": d.label}) ))
const sizeSel = atom(default_size_sel.name) // Needs to be manually synchronized with selector's default option in Navbar
const colorSel = atom(default_color_sel.name) // Needs to be manually synchronized with selector's default option in Navbar
const sizeSelLabel = atom(default_size_sel.label) // Needs to be manually synchronized with selector's default option in Navbar
const colorSelLabel = atom(default_color_sel.label)

// Color Scales
// Needs to be manually synchronized with similar code in Navbar.js -> handleColorChange()

var selType = "discrete"
if(typeof default_color_sel.type !== 'undefined'){selType = default_color_sel.type} 
var bins = []
var domain = []
var range = []
var increasing = 'true'
const disc_color_range = ['#1f77b4',
'#ff7f0e',
'#2ca02c',
'#d62728',
'#9467bd',
'#8c564b',
'#e377c2',
'#7f7f7f',
'#bcbd22',
'#17becf',
'#882255',
'#117733',
'#88CCEE',
'#DDCC77',
'#AA4499',
'#44AA99',
'#332288',
'#999933',
'#CC6677',
'#DDDDDD',
'#000000']
// https://github.com/vanderlindenma/firms_gapminder_v3_build/issues/4
// For other option: https://stackoverflow.com/questions/20847161/how-can-i-generate-as-many-colors-as-i-want-using-d3
// http://jnnnnn.github.io/category-colors-constrained.html

if(selType === 'discrete'){
  domain = circle_data.sort((a, b) => d3.ascending(a[default_color_sel.name], b[default_color_sel.name])).map(d => d[default_color_sel.name])
  range = disc_color_range 
}

let colExtremes = [0,1] // Bounds for continuous color selection within the plasma scale "interpolatePlasma" (widest bounds are [0,1])

if(selType === 'continuous'){
  
  if(typeof meta_data[0].color_bins !== 'undefined'){
    bins = meta_data[0].color_bins
  } else {
    bins = [Math.round(d3.quantile(circle_data.map(d => d[default_color_sel.name]), 0.2)),
              Math.round(d3.quantile(circle_data.map(d => d[default_color_sel.name]), 0.4)),
              Math.round(d3.quantile(circle_data.map(d => d[default_color_sel.name]), 0.6)),
              Math.round(d3.quantile(circle_data.map(d => d[default_color_sel.name]), 0.8)),
                ]
    
    bins = [...new Set(bins)] 
  }  

  domain = bins

  let arr = [...Array(bins.length + 1).keys()]
  arr = arr.map(d => colExtremes[0] + (d*(1/(arr[arr.length - 1])))*(colExtremes[1]-colExtremes[0]) ) //
  range = arr.map(d => interpolatePlasma(d))

  const colorSelMeta = meta_data.filter(d => d.name === default_color_sel.name)
  if(typeof colorSelMeta[0].scale_increasing !== 'undefined'){increasing = colorSelMeta[0].scale_increasing}
}

console.log('jotai color domain: ', domain)

const colorDomain = atom(domain)
const colorType = atom(selType)
const colorRange = atom(range)
const discColorRange = atom(disc_color_range)
const colorBins = atom(bins)
const colorIncreasing = atom(increasing)
const colorBounds = atom([]) // For bounds related to continuous colgroup selection
const colorExtremes = atom(colExtremes) // Bounds for continuous color selection within the plasma scale "interpolatePlasma" (widest bounds are [0,1])

// Size Scales

const sizeSelMeta = meta_data.filter(d => d.name === default_size_sel.name)

var size_increasing = 'true'
if(typeof sizeSelMeta.scale_increasing !== 'undefined'){size_increasing = sizeSelMeta.scale_increasing}
var size_unit = ""
if(typeof sizeSelMeta.unit !== 'undefined'){size_unit = sizeSelMeta.unit}

var size_exponent = 1
if(typeof sizeSelMeta[0].scale_exponent !== 'undefined'){size_exponent = Number(sizeSelMeta[0].scale_exponent)}
const size_domain = d3.extent(circle_data, d => d[default_size_sel.name])
var max_size = 50
if(typeof sizeSelMeta[0].scale_maxSize !== 'undefined'){max_size = Number(sizeSelMeta[0].scale_maxSize)}
var min_size = 1
if(typeof sizeSelMeta[0].scale_minSize !== 'undefined'){min_size = Number(sizeSelMeta[0].scale_minSize)}
const size_range = [min_size, max_size]

let allTimes = circle_data.map(d => d.time)
console.log(allTimes)
allTimes = [... new Set(allTimes)]
const domain_Timesize = d3.extent(circle_data.filter(d => d.time === allTimes[0]), d => d[default_size_sel.name])

// Font and opacity scales

const font_exponent = 1
const font_domain = domain_Timesize
const font_range = [12,18]

const opacity_exponent = 1
const opacity_domain = domain_Timesize
const opacity_range = [0.3,0.8]

// Scales parameters into Atoms

const sizeIncreasing = atom(size_increasing)
const sizeUnit = atom(size_unit)

const sizeExponent = atom(size_exponent)
const sizeDomain = atom(size_domain) 
const sizeRange = atom(size_range)

const fontExponent = atom(font_exponent)
const fontDomain = atom(font_domain) 
const fontRange = atom(font_range)

const opacityExponent = atom(opacity_exponent)
const opacityDomain = atom(opacity_domain) 
const opacityRange = atom(opacity_range)

/*  */
/* "Explainer" arrow data */
/*  */

const arrows = atom(arrow_data)
const isArrows = atom(arrow_data.length > 0)

/*  */
/* Main Circle Data */
/*  */

/* Data transformations */

let roundable = meta_data
                  .filter(d => d.type === 'continuous')
                  .map(d => d.name)
roundable = roundable.concat(['x','y'])
roundable = [...new Set(roundable)]

var newData = circle_data

// Round continuous variable (and coordinates) for better animation performance
roundable.map(function(e){ 
  
  let estr = e.toString()
  
  newData = tidy(
    newData,
    mutate({
      xflrsix : (d) => Math.round(d[estr]*1000)/1000
    })
  )

  newData = tidy(
    newData,
    select('-' + estr)
  )

  newData = tidy(
    newData,
    rename({xflrsix: estr})
  )
})

// Create short labels
newData = newData.map(function(d){ 
    let new_d = d; 
    new_d['label'] = abbreviate(d.name, {length: 20, keepSeparators: true})
    return new_d})

// Create unique id
newData = newData.map(function(d, index){ 
    let new_d = d; 
    new_d['id'] = index
    return new_d
  })

// Compute ranks for all continuous variables

for (const contVar of sizeOptionsNA.map(d => d.name) ){
  for (const time of allTimes){

    const filtData = newData.filter(d => d.time === time)

    const ideedTBRankedVals = filtData.map(d => ({'value': typeof d[contVar] !== 'undefined' ? d[contVar] : -Infinity, 
                                                      // + (Math.random()/100000),//Math.random()/10000 is for tie-breaking purposes
                                                      'id': d['id']})) 
    const ranked = ideedTBRankedVals
                    .sort((a, b) => b['value'] - a['value'])
                    .map(function(d, index){ 
                      let new_d = d; 
                      new_d['rank'] = index + 1
                      return new_d
                    })

    ranked.forEach(function(d){
      const objIndex = newData.findIndex((obj => obj.id === d.id && obj.time === time));
      newData[objIndex]['rank-' + contVar] = d.rank
    })
  } 
}

const data = atom(newData)

/*  */
/* Data-dependent states */
/*  */

let names = newData.map(d => d.name)
let uniqueNames = [...new Set(names)]
let numbFirms = uniqueNames.length
const allFirms = atom(uniqueNames)
const maxNfirms = atom(numbFirms);

const nFirms = atom(Math.round(numbFirms/10))

let alltimes = newData.map(d => d.time).sort()
let locmin = alltimes[0]
const minTime = atom(locmin);
const locmax = Math.max(...alltimes)
const maxTime = atom(locmax);
const nTimes = atom(locmax - locmin + 1);
const Time = atom(locmin);

/*  */
/* Other states */
/*  */

const transD3 = atom({'k':1, 'x':0, 'y':0})

/*  */
/* State export */
/*  */

export {adaptDisps, allNames, timeLabs, display,
        justClicked, justSelHigh,
        colgroup,
        arrowsSel,
        sizeOptions, sizeSel, colorSel, sizeSelLabel, colorSelLabel,
        colorOptions, colorType, colorDomain, colorRange, colorBins, colorIncreasing, colorBounds, colorExtremes, discColorRange,
        Share, Width, Height, Margin, 
        xDomain, yDomain, xRange, yRange, 
        sizeIncreasing, sizeUnit, 
        sizeExponent, sizeDomain, sizeRange, 
        fontExponent, fontDomain, fontRange, 
        opacityExponent, opacityDomain, opacityRange, 
        allFirms, 
        maxNfirms, 
        nFirms,
        Time, 
        minTime, maxTime, nTimes,
        data, metaData, arrows, isArrows,
        transD3};