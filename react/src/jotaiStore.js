import { atom } from "jotai";

console.log('Blank jotaiStore.js')

/*  */
/* Raw data
/*  */

const rawCircleData = atom('')
const rawMetaData = atom('')
const rawArrowData = atom([])
const woRawCircleData = atom(null, (get, set, update) => {set(rawCircleData, update)}) // write-only atom to avoid re-rendering, see https://egghead.io/lessons/react-prevent-rerenders-and-add-functionality-with-jotai-write-only-atoms
const woRawMetaData = atom(null, (get, set, update) => {set(rawMetaData, update)})
const woRawArrowData = atom(null, (get, set, update) => {set(rawArrowData, update)})


/*  */
/* State variables for user controls */ // Some other variables are defined through initialization inside the Meta-Data section
/*  */

const adaptDisps = atom('');
const allNames = atom('');
const timeLabs = atom('');
const display = atom('')
const woAdaptDisps = atom(null, (get, set, update) => {set(adaptDisps, update)})
const woAllNames = atom(null, (get, set, update) => {set(allNames, update)})
const woTimeLabs = atom(null, (get, set, update) => {set(timeLabs, update)})
const woDisplay = atom(null, (get, set, update) => {set(display, update)})


const justClicked = atom('');
const justSelHigh = atom('');
const colgroup = atom('');
const arrowsSel = atom('');
const woJustClicked = atom(null, (get, set, update) => {set(justClicked, update)})
const woJustSelHigh = atom(null, (get, set, update) => {set(justSelHigh, update)})
const woColgroup = atom(null, (get, set, update) => {set(colgroup, update)})
const woArrowsSel = atom(null, (get, set, update) => {set(arrowsSel, update)})

/*  */
/* Visualization dimensions and positionning */
/*  */

const Share = atom('')
const Width = atom('')
const Height = atom('')
const Margin = atom('')

const woShare = atom(null, (get, set, update) => {set(Share, update)})
const woWidth = atom(null, (get, set, update) => {set(Width, update)})
const woHeight = atom(null, (get, set, update) => {set(Height, update)})
const woMargin = atom(null, (get, set, update) => {set(Margin, update)})

const xDomain = atom('')
const yDomain = atom('')
const xRange = atom('')
const yRange = atom('')
const woXDomain = atom(null, (get, set, update) => {set(xDomain, update)})
const woYDomain = atom(null, (get, set, update) => {set(yDomain, update)})
const woXRange = atom(null, (get, set, update) => {set(xRange, update)})
const woYRange = atom(null, (get, set, update) => {set(yRange, update)})

/*  */
/* Meta-Data */
/*  */

const metaData = atom('')
const woMetaData = atom(null, (get, set, update) => {set(metaData, update)})

const sizeOptions = atom('')
const colorOptions = atom('')
const sizeSel = atom('') 
const colorSel = atom('') 
const sizeSelLabel = atom('') 
const colorSelLabel = atom('')
const woSizeOptions = atom(null, (get, set, update) => {set(sizeOptions, update)})
const woColorOptions = atom(null, (get, set, update) => {set(colorOptions, update)})
const woSizeSel = atom(null, (get, set, update) => {set(sizeSel, update)})
const woColorSel = atom(null, (get, set, update) => {set(colorSel, update)})
const woSizeSelLabel = atom(null, (get, set, update) => {set(sizeSelLabel, update)})
const woColorSelLabel = atom(null, (get, set, update) => {set(colorSelLabel, update)})


// Color Scales

const colorDomain = atom('')
const colorType = atom('')
const colorRange = atom('')
const discColorRange = atom('')
const colorBins = atom('')
const colorIncreasing = atom('')
const colorBounds = atom('') 
const colorExtremes = atom('')
const woColorDomain = atom(null, (get, set, update) => {set(colorDomain, update)})
const woColorType = atom(null, (get, set, update) => {set(colorType, update)})
const woColorRange = atom(null, (get, set, update) => {set(colorRange, update)})
const woDiscColorRange = atom(null, (get, set, update) => {set(discColorRange, update)})
const woColorBins = atom(null, (get, set, update) => {set(colorBins, update)})
const woColorIncreasing = atom(null, (get, set, update) => {set(colorIncreasing, update)})
const woColorBounds = atom(null, (get, set, update) => {set(colorBounds, update)})
const woColorExtremes = atom(null, (get, set, update) => {set(colorExtremes, update)})


// Scales parameters into Atoms

const sizeIncreasing = atom('')
const sizeUnit = atom('')
const woSizeIncreasing = atom(null, (get, set, update) => {set(sizeIncreasing, update)})
const woSizeUnit = atom(null, (get, set, update) => {set(sizeUnit, update)})

const sizeExponent = atom('')
const sizeDomain = atom('') 
const sizeRange = atom('')
const woSizeExponent = atom(null, (get, set, update) => {set(sizeExponent, update)})
const woSizeDomain = atom(null, (get, set, update) => {set(sizeDomain, update)})
const woSizeRange = atom(null, (get, set, update) => {set(sizeRange, update)})

const fontExponent = atom('')
const fontDomain = atom('') 
const fontRange = atom('')
const woFontExponent = atom(null, (get, set, update) => {set(fontExponent, update)})
const woFontDomain = atom(null, (get, set, update) => {set(fontDomain, update)})
const woFontRange = atom(null, (get, set, update) => {set(fontRange, update)})

const opacityExponent = atom('')
const opacityDomain = atom('') 
const opacityRange = atom('')
const woOpacityExponent = atom(null, (get, set, update) => {set(opacityExponent, update)})
const woOpacityDomain = atom(null, (get, set, update) => {set(opacityDomain, update)})
const woOpacityRange = atom(null, (get, set, update) => {set(opacityRange, update)})

/*  */
/* "Explainer" arrow data */
/*  */

const isArrows = atom('')
const arrows = atom('')
const woIsArrows = atom(null, (get, set, update) => {set(isArrows, update)})
const woArrows = atom(null, (get, set, update) => {set(arrows, update)})

/*  */
/* Main Circle Data */
/*  */

const data = atom('')
const woData = atom(null, (get, set, update) => {set(data, update)})

/*  */
/* Data-dependent states */
/*  */

const allFirms = atom('')
const maxNfirms = atom('');
const nFirms = atom('')
const minTime = atom('');
const maxTime = atom('');
const nTimes = atom('');
const Time = atom('');
const woAllFirms = atom(null, (get, set, update) => {set(allFirms, update)})
const woMaxNfirms = atom(null, (get, set, update) => {set(maxNfirms, update)})
const woNFirms = atom(null, (get, set, update) => {set(nFirms, update)})
const woMinTime = atom(null, (get, set, update) => {set(minTime, update)})
const woMaxTime = atom(null, (get, set, update) => {set(maxTime, update)})
const woNTimes = atom(null, (get, set, update) => {set(nTimes, update)})
const woTime = atom(null, (get, set, update) => {set(Time, update)})

/*  */
/* Other states */
/*  */

const transD3 = atom('')
const clearSvgTrigger = atom('')
const highlightCount = atom('')
const woTransD3 = atom(null, (get, set, update) => {set(transD3, update)})
const woClearSvgTrigger = atom(null, (get, set, update) => {set(clearSvgTrigger, update)})
const woHighlightCount = atom(null, (get, set, update) => {set(highlightCount, update)})

/*  */
/* State export */
/*  */

export {rawCircleData, rawMetaData, rawArrowData,
        woRawCircleData, woRawMetaData, woRawArrowData,
        adaptDisps, allNames, timeLabs, display,
        woAdaptDisps, woAllNames, woTimeLabs, woDisplay,
        justClicked, justSelHigh,
        woJustClicked, woJustSelHigh,
        colgroup,
        woColgroup,
        arrowsSel,
        woArrowsSel,
        sizeOptions, sizeSel, colorSel, sizeSelLabel, colorSelLabel,
        woSizeOptions, woSizeSel, woColorSel, woSizeSelLabel, woColorSelLabel,
        colorOptions, colorType, colorDomain, colorRange, colorBins, colorIncreasing, colorBounds, colorExtremes, discColorRange,
        woColorOptions, woColorType, woColorDomain, woColorRange, woColorBins, woColorIncreasing, woColorBounds, woColorExtremes, woDiscColorRange,
        Share, Width, Height, Margin, 
        woShare, woWidth, woHeight, woMargin,
        xDomain, yDomain, xRange, yRange, 
        woXDomain, woYDomain, woXRange, woYRange,
        sizeIncreasing, sizeUnit, 
        woSizeIncreasing, woSizeUnit,
        sizeExponent, sizeDomain, sizeRange, 
        woSizeExponent, woSizeDomain, woSizeRange,
        fontExponent, fontDomain, fontRange, 
        woFontExponent, woFontDomain, woFontRange,
        opacityExponent, opacityDomain, opacityRange, 
        woOpacityExponent, woOpacityDomain, woOpacityRange,
        allFirms, 
        woAllFirms,
        maxNfirms, 
        woMaxNfirms,
        nFirms, 
        woNFirms,
        Time, 
        woTime,
        minTime, maxTime, nTimes,
        woMinTime, woMaxTime, woNTimes,
        data, metaData, arrows, isArrows,
        woData, woMetaData, woArrows, woIsArrows,
        transD3, clearSvgTrigger, highlightCount,
        woTransD3, woClearSvgTrigger, woHighlightCount};