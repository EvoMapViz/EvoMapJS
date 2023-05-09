import { useRef, useEffect} from "react";
import * as d3 from 'd3';
import Draw from "./Draw.js"
import UpdateTime from "./UpdateTime.js";
import UpdateCircleClick from "./UpdateCircleClick.js";
import UpdateHighlightSel from "./UpdateHighlightSel.js";
import UpdateAllnames from "./UpdateAllnames.js";
import UpdateTimeLabs from "./UpdateTimeLabs.js";
import UpdateN from "./UpdateN.js";
import UpdateAdaptiveDisplay from "./UpdateAdaptiveDisplay.js";
import UpdateSizeSel from "./UpdateSizeSel.js";
import UpdateColorSel from "./UpdateColorSel.js";
import UpdateArrows from "./UpdateArrows.js";
import UpdateColgroupDiscrete from "./UpdateColgroupDiscrete.js";
import UpdateColgroupContinuous from "./UpdateColgroupContinuous.js";
import UpdateZoom from "./UpdateZoom.js"
import ClearSvg from "./ClearSvg.js"

import "./Gapminder.css"

import { data, metaData,
         Width, Height, Margin,
         xDomain, yDomain, xRange, yRange,
         allFirms, allNames, maxNfirms, minTime, nTimes, timeLabs,
         adaptDisps, Time, nFirms, sizeSel, colorSel, colgroup, arrowsSel,
         transD3, 
         justClicked, justSelHigh, 
         colorType, colorDomain, colorRange, colorBins, colorIncreasing, colorBounds, 
         sizeIncreasing, sizeExponent, sizeDomain, sizeRange,
         fontExponent, fontDomain, fontRange,
         opacityExponent, opacityDomain, opacityRange, Share, 
         arrows, isArrows,
         clearSvgTrigger, highlightCount} from 'jotaiStore.js';
import { useAtom } from 'jotai'


export default function Gapminder() {

/*  */
//
// State imports
//
/*  */

const ref = useRef()
const didMountRef = useRef(false); // Used below to prevent Updates but not Draw on initial render (https://stackoverflow.com/questions/53253940/make-react-useeffect-hook-not-run-on-initial-render)

const [locData, ] = useAtom(data)
const [locMeta, ] = useAtom(metaData)
const [locArrows, ] = useAtom(arrows)
const [locIsArrows, ] = useAtom(isArrows)

const [locShare, ] = useAtom(Share)
const [locWidth, ] = useAtom(Width)
const [locHeight, ] = useAtom(Height)
const [locMargin, ] = useAtom(Margin)

const [locXDomain, ] = useAtom(xDomain)
const [locYDomain, ] = useAtom(yDomain)
const [locXRange, ] = useAtom(xRange)
const [locYRange, ] = useAtom(yRange)

const [locTime, ] = useAtom(Time)
const [locColgroup,] = useAtom(colgroup)

const [locColorSel,] = useAtom(colorSel)
const [locColortype,] = useAtom(colorType)
const [locColorrange,] = useAtom(colorRange)
const [locColorbins,] = useAtom(colorBins)
const [locColordomain,] = useAtom(colorDomain)
const [locColorincreasing,] = useAtom(colorIncreasing)
const [locColorbounds, locSetColorbounds] = useAtom(colorBounds)

const [locSizeSel,] = useAtom(sizeSel)
const [locSizeIncreasing,] = useAtom(sizeIncreasing)
const [locSizeExponent, ] = useAtom(sizeExponent)
const [locSizeDomain, ] = useAtom(sizeDomain)
const [locSizeRange, ] = useAtom(sizeRange)

const [locArrowSel, ] = useAtom(arrowsSel)

const [locFontExponent, ] = useAtom(fontExponent)
const [locFontDomain, ] = useAtom(fontDomain)
const [locFontRange, ] = useAtom(fontRange)

const [locOpacityExponent, ] = useAtom(opacityExponent)
const [locOpacityDomain, ] = useAtom(opacityDomain)
const [locOpacityRange, ] = useAtom(opacityRange)

const [locAdaptDisp,] = useAtom(adaptDisps)
const [locAllNames,] = useAtom(allNames)
const [locAllFirms,] = useAtom(allFirms)
const [locTimeLabs,] = useAtom(timeLabs)
const [locMaxnfirms,] = useAtom(maxNfirms)
const [locMintime,] = useAtom(minTime)
const [locNTimes,] = useAtom(nTimes)
const [locNfirms,] = useAtom(nFirms)
const [locTransD3, locSetTransD3 ] = useAtom(transD3)
const [locJustClicked, locSetJustClicked] = useAtom(justClicked)
const [locJustSelHigh, ] = useAtom(justSelHigh)

const [locClearSvgTrigger, locSetClearSvgTrigger] = useAtom(clearSvgTrigger)
const [locHighlightCount, locSetHighlightCount] = useAtom(highlightCount)

const varType = locMeta
                    .filter(d => d.name === locColorSel)
                    .map(d => d.type)
  
/*  */
//
// State-dependent attribute setting functions and scales
//
/*  */

/*  */
/* Scales */
/*  */

const locSelRank = 'rank-' + locSizeSel

const x = d3.scaleLinear()
            .domain(locXDomain)
            .range(locXRange)

const y = d3.scaleLinear()
            .domain(locYDomain) 
            .range(locYRange)

const size = d3.scalePow()
            .exponent(locSizeExponent)
            .domain(locSizeDomain)
            .range(locSizeRange)

let color;
if(locColortype === 'discrete'){
  color = d3.scaleOrdinal() 
                .domain(locColordomain)
                .range(locColorrange) 
}
if(locColortype === 'continuous'){
  color = d3.scaleThreshold() 
                .domain(locColordomain)
                .range(locColorrange);
}

const fontScale = d3.scalePow()
                .exponent(locFontExponent)
                .domain(locFontDomain)
                .range(locFontRange)
const opacityScale = d3.scalePow()
              .exponent(locOpacityExponent)
              .domain(locOpacityDomain)
              .range(locOpacityRange)

/*  */
/* Attribute setting functions */
/*  */

let xfunc;
if (locAdaptDisp === "true") {
  if (locSizeIncreasing === "true") {
    xfunc = (d, tdk = 1) => x(d.x) + (size(d[locSizeSel]) / tdk) ;
  } else {
    xfunc = (d, tdk = 1) => x(d.x) + (size(locSizeDomain[1] - d[locSizeSel]) / tdk) ;
  }
} else {
  xfunc = (d, tdk = 1) => x(d.x) + 4/tdk ;
}

let yfunc;
if (locAdaptDisp === "true") {
  if (locSizeIncreasing === "true") {
    yfunc = (d, tdk = 1) => y(d.y) - (size(d[locSizeSel]) / tdk) ;
  } else {
    yfunc = (d, tdk = 1) => y(d.y) - (size(locSizeDomain[1] - d[locSizeSel]) / tdk) ;
  }
} else {
  yfunc = (d, tdk = 1) => y(d.y) - 4/tdk ;
}

let fontfunc;
if (locAdaptDisp === "true") {
  if (locSizeIncreasing === "true") {
    fontfunc = (d, tdk = 1) => fontScale(d[locSizeSel]) / tdk;
  } else {
    fontfunc = (d, tdk = 1) => fontScale(locSizeDomain[1] - d[locSizeSel]) / tdk;
  }
} else {
  fontfunc = (d, tdk = 1) => 12 / tdk;
}

let xYLfunc;
if (locAdaptDisp === "true") {
  if (locSizeIncreasing === "true") {
    xYLfunc = (d, tdk = 1) => x(d.x) - (size(d[locSizeSel]) / tdk) ;
  } else {
    xYLfunc = (d, tdk = 1) => x(d.x) - (size(locSizeDomain[1] - d[locSizeSel]) / tdk) ;
  }
} else {
  xYLfunc = (d, tdk = 1) => x(d.x) - 4/tdk ;
}

let yYLfunc;
if (locAdaptDisp === "true") {
  if (locSizeIncreasing === "true") {
    yYLfunc = (d, tdk = 1) => y(d.y) + (size(d[locSizeSel]) / tdk) ;
  } else {
    yYLfunc = (d, tdk = 1) => y(d.y) + (size(locSizeDomain[1] - d[locSizeSel]) / tdk) ;
  }
} else {
  yYLfunc = (d, tdk = 1) => y(d.y) + 4/tdk ;
}

let rfunc;
if (locAdaptDisp === "true") {
  if (locSizeIncreasing === "true") {
    rfunc = (d, tdk = 1) => size(d[locSizeSel]) / tdk;
  } else {
    rfunc = (d, tdk = 1) => size(locSizeDomain[1] - d[locSizeSel]) / tdk;
  }
} else {
  rfunc = (d, tdk = 1) => 4 / tdk;
}

let fillfunc;
  if (locColortype === "discrete") {
    fillfunc = (d) => color(d[locColorSel]);
  } else {
    if (locSizeIncreasing === "true") {
      fillfunc = (d) => color(d[locColorSel]);
    } else {
      fillfunc = (d) => color(locColordomain[1] - d[locColorSel]);
    }
  }
  
let displayfunc;
  if (locColorincreasing === "true") {
    displayfunc = (d) => d[locSelRank] <= locNfirms ? "inline" : "none";
  }
  if (locColorincreasing === "false") {
    displayfunc = (d) => d[locSelRank] >= maxNfirms - locNfirms ? "inline" : "none";
  }

let opacityfunc;
  if(locAdaptDisp === 'true'){
    if(locSizeIncreasing === "true"){ 
      opacityfunc = (d) => opacityScale(d[locSizeSel]) } else {
      opacityfunc = (d) => opacityScale(locSizeDomain[1] - d[locSizeSel])}
  } else {
      opacityfunc = (d) => locOpacityRange[1]
  }

let sortfunc;
  if (locSizeIncreasing === "true") {
    sortfunc = (a,b) =>  d3.ascending(a[locSizeSel], b[locSizeSel]);
  } else {
    sortfunc = (a,b) =>  d3.descending(a[locSizeSel], b[locSizeSel]);
  }

/*  */
//
// Initialize visualization
//
/*  */

useEffect(() => {
  Draw(locData, locMeta, locArrows, locIsArrows,
        locWidth, locHeight, locMargin, locShare,
        locAllFirms, locMintime,
        locSizeSel, locColorSel, 
        locSetTransD3, locSetJustClicked, 
        locOpacityRange,
        x,y,
        xfunc,yfunc, xYLfunc, yYLfunc, rfunc, fontfunc, opacityfunc, fillfunc, displayfunc, sortfunc,
        locSetClearSvgTrigger, locHighlightCount, locSetHighlightCount,
        ref.current)
}, []) // [] implies code will run only once => similar to didMount

/*  */
//
// Update visualization
//
/*  */

/* Zoom */

useEffect(() => {
  if (didMountRef.current){ // Prevents run on initial render
    return UpdateZoom(locWidth, locHeight,
                      locSetTransD3,
                      locIsArrows,
                      x,y,
                      xfunc, yfunc, xYLfunc, yYLfunc, rfunc, fontfunc,
                      )}  
}, [locAdaptDisp, locSizeSel, locTime])

/* Main circle/label animation */

useEffect(() => {
  if (didMountRef.current){ 
    return UpdateTime(locData, locArrows, locIsArrows,
                      locTime,
                      locColortype,
                      x,y,
                      xfunc, yfunc, rfunc, fontfunc, opacityfunc, fillfunc,
                      locHighlightCount,
                      locTransD3,
                      )} 
}, [locData, locTime, locAllFirms]) 

/* Size selector */

useEffect(() => {
  if (didMountRef.current){ 
    return UpdateSizeSel(locOpacityRange,
                         locAdaptDisp, 
                         xfunc, yfunc, xYLfunc, yYLfunc, rfunc, fontfunc, opacityfunc, 
                         locHighlightCount,
                         locTransD3,
                         )} 
}, [locSizeSel])

/* Color selector */

useEffect(() => {
  if (didMountRef.current){ 
    return UpdateColorSel(locData,
                          locColorSel,
                          locSetJustClicked, locAllNames,
                          fillfunc,
                          locSetClearSvgTrigger, locHighlightCount, locSetHighlightCount
                          )} 
}, [locColorSel])

/* Show all names */

useEffect(() => {
  if (didMountRef.current){  
    return UpdateAllnames(locAllNames)} 
}, [locAllNames, locSizeSel])

/* Show/Hide time labels upon highlight */

useEffect(() => {
  if (didMountRef.current){  
    return UpdateTimeLabs(locTimeLabs)} 
}, [locTimeLabs])

/* Max. number of firms N */

useEffect(() => {
  if (didMountRef.current){  
    return UpdateN(locAllNames, locMaxnfirms,
                   locSizeIncreasing, locNfirms, locColgroup, locSetJustClicked,
                   locData, locSizeSel, locColorSel, locTime,
                   locColortype, locColorbounds,
                   locSetClearSvgTrigger, locHighlightCount, locSetHighlightCount
                   )} 
}, [locNfirms, locSizeSel, locClearSvgTrigger])

/* Value Sizes */

useEffect(() => {
  if (didMountRef.current){ // Prevents run on initial render
    return UpdateAdaptiveDisplay(
                              xfunc, yfunc, xYLfunc, yYLfunc, rfunc, fontfunc, opacityfunc,
                              locHighlightCount,
                              locTransD3
                              )}  
}, [locAdaptDisp])

/* Colgroup */

  useEffect(() => {
    if (didMountRef.current){                                       
      if (varType[0] === "discrete"){
        return UpdateColgroupDiscrete(locColgroup, locNfirms, locSizeSel, locColorSel, locAllNames,
                                      locSizeIncreasing, locMaxnfirms) } 
      if (varType[0] === "continuous"){
        return UpdateColgroupContinuous(locColgroup, locNfirms, locAllNames, locSizeSel, locColorSel, locColorbins, locSetColorbounds,
                                       locSizeIncreasing, locMaxnfirms) }
    }
  }, [locColgroup])

/* Highlights (includes all circle-click related events) */

// From Viz

useEffect(() => {
  if (didMountRef.current){  
    return UpdateCircleClick(locData, locTime, locJustClicked,
                            locOpacityRange, locOpacityDomain, locOpacityExponent, locAdaptDisp,
                            locSizeSel, locAllNames, locNfirms, locNTimes, locTimeLabs,
                            x,y,
                            xYLfunc, yYLfunc, rfunc, 
                            locSetClearSvgTrigger, locHighlightCount, locSetHighlightCount,
                            locTransD3)
    }
}, [locJustClicked])

// From Selector

useEffect(() => {
  if (didMountRef.current){ 
    if (locHighlightCount !== '0'){ // Go through highlight routine only if last click was NOT dehighlight of last highlighted 
    return UpdateHighlightSel(locData, locJustSelHigh, 
                              locOpacityRange, // To set highlight intensity as upper bound of range
                              locSizeSel,locAllNames, locNfirms, locNTimes, locTimeLabs,
                              x,y,
                              xYLfunc, yYLfunc, rfunc, 
                              locSetClearSvgTrigger, locHighlightCount,
                              locTransD3)} 
    if (locHighlightCount === '0'){
      locSetClearSvgTrigger('t')
    }
  }
  didMountRef.current = true; 
}, [locJustSelHigh])

/* Explainer arrows */

useEffect(() => {
  if (didMountRef.current && isArrows){ 
    return UpdateArrows(locArrowSel)}  
}, [locArrowSel])

/* Clear SVG */

useEffect(() => {
  if (didMountRef.current){ 
    return ClearSvg(locAllNames, 
                    opacityScale,
                    locSizeSel,
                    locOpacityRange,
                    locAdaptDisp,
                    locNfirms)}  
}, [locClearSvgTrigger])

/*  */
//
// Return DIV element
//
/*  */

  return (
    <div
      ref={ref}
    />
  )
}

