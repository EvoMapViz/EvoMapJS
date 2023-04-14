import React, { useState } from 'react';
import * as d3 from "d3";
import Grid from "@mui/material/Grid";

import AtomSlider from 'Components/UI/AtomSlider';
import PlaySlider from 'Components/UI/PlaySlider';
import {MultiSelectAll} from 'Components/UI/MultiSelectAll';
import { MultiSelectAbrev } from 'Components/UI/MultiSelectAbrev.js';

import HighlightFirmSelector from './HighlightFirmSelector.js';

import ReactSelect from 'react-select';

import {Columns} from 'react-bulma-components';
import './Navbar.css';

import {useAtom} from 'jotai';
import {data, arrows, 
        adaptDisps, allNames, timeLabs, 
        nFirms, maxNfirms, Time, minTime, maxTime, metaData, sizeSel, colorSel, sizeSelLabel, colorSelLabel, colgroup,
        colorOptions, colorType, colorDomain, colorRange, colorBins, colorIncreasing, colorExtremes, discColorRange,
        sizeOptions, sizeIncreasing, sizeExponent, sizeDomain, sizeRange, arrowsSel} 
        from 'jotaiStore.js';
import {interpolatePlasma} from "d3-scale-chromatic";

const NavbarArrow = () => {

    const [locData,] = useAtom(data)
    const [locArrows, ] = useAtom(arrows)
    const [locMeta, ] = useAtom(metaData)
    const [locmaxNfirms, ] = useAtom(maxNfirms)
    const [locminTime, ] = useAtom(minTime)
    const [locmaxTime, ] = useAtom(maxTime)
    const [, locSetColgroup] = useAtom(colgroup)
    
    let [locSizeOptions, ] = useAtom(sizeOptions)
    locSizeOptions = locSizeOptions.map(d => ({"value": d.name, "label": d.label}))
    
    const arrowOptions = locArrows
                            .filter(d => d.time === locminTime)
                            .map(d => ({"value": d.name, "label": d.name}) )
    const [selected, setSelected] = useState([]); // Select-all "local" state for multi-selection in arrow selector

    const [, locSetArrowSel] = useAtom(arrowsSel)

    const [, locSetSizeSel] = useAtom(sizeSel)
    const [, locSetSizeSelLabel] = useAtom(sizeSelLabel)
    
    let [locColorOptions, ] = useAtom(colorOptions)
    locColorOptions = locColorOptions.map(d => ({"value": d.name, "label": d.label}))
    
    const [ ,locSetColorSel] = useAtom(colorSel)
    const [ ,locSetColorSelLabel] = useAtom(colorSelLabel)
    const [ ,locSetColortype] = useAtom(colorType)
    const [ ,locSetColorrange] = useAtom(colorRange)
    const [ ,locSetColorbins] = useAtom(colorBins)
    const [ ,locSetColordomain] = useAtom(colorDomain)
    const [ ,locSetColorincreasing] = useAtom(colorIncreasing)
    const [locDiscColorRange, ] = useAtom(discColorRange)
    const [locColorExtremes, ] = useAtom(colorExtremes)

    const [, locSetSizeincreasing] = useAtom(sizeIncreasing)
    const [, locSetSizeexponent] = useAtom(sizeExponent)
    const [, locSetSizedomain] = useAtom(sizeDomain)
    const [, locSetSizerange] = useAtom(sizeRange)
    


const handleSizeChange = (event) => {
    let sizeSel = event.value

    locSetSizeSel(sizeSel) // Communicate the change to relevant jotai state
    locSetSizeSelLabel(event.label)

    const sizeSelMeta = locMeta.filter(d => d.name === sizeSel)

    var increasing = 'true'
    if(typeof sizeSelMeta[0].scale_increasing !== 'undefined'){increasing = sizeSelMeta[0].scale_increasing}
    locSetSizeincreasing(increasing)
    
    var size_exponent = 1
    if(typeof sizeSelMeta[0].scale_exponent !== 'undefined'){size_exponent = Number(sizeSelMeta[0].scale_exponent)}
    locSetSizeexponent(size_exponent)

    const size_domain = d3.extent(locData, d => d[sizeSel])
    locSetSizedomain(size_domain)

    var max_size = 50
    if(typeof sizeSelMeta[0].scale_maxSize !== 'undefined'){max_size = Number(sizeSelMeta[0].scale_maxSize)}
    var min_size = 1
    if(typeof sizeSelMeta[0].scale_minSize !== 'undefined'){min_size = Number(sizeSelMeta[0].scale_minSize)}
    const size_range = [min_size, max_size]
    locSetSizerange(size_range)
}

const handleColorChange = (event) => {
    // Needs to be manually synchronized with similar code in jotaiStore.js -> "Color Scales"

    const colorSel = event.value


    locSetColorSel(colorSel) // Communicate the change to relevant jotai state
    locSetColorSelLabel(event.label)
    locSetColgroup('Show All')

    const colorSelMeta = locMeta.filter(d => d.name === colorSel)

    let selType = "discrete"
    if(typeof colorSelMeta[0].type !== 'undefined'){selType = colorSelMeta[0].type}
    
    let bins = []
    let domain = []
    let range = []

    if(selType === 'discrete'){
    domain = locData.sort((a, b) => d3.ascending(a[colorSel], b[colorSel])).map(d => d[colorSel])
    range = locDiscColorRange
    // https://stackoverflow.com/questions/20847161/how-can-i-generate-as-many-colors-as-i-want-using-d3
    // http://jnnnnn.github.io/category-colors-constrained.html
    }
    
    if(selType === 'continuous'){
    
        if(typeof colorSelMeta[0].color_bins !== 'undefined'){
            bins = colorSelMeta[0].color_bins
        } else {
            bins = [Math.round(d3.quantile(locData.map(d => d[colorSel]), 0.2)),
                    Math.round(d3.quantile(locData.map(d => d[colorSel]), 0.4)),
                    Math.round(d3.quantile(locData.map(d => d[colorSel]), 0.6)),
                    Math.round(d3.quantile(locData.map(d => d[colorSel]), 0.8)),
                    ]
        
        bins = [...new Set(bins)] 
        }

        domain = bins

        let colExtremes = locColorExtremes
        let arr = [...Array(bins.length + 1).keys()] 
        arr = arr.map(d => colExtremes[0] + (d*(1/(arr[arr.length - 1])))*(colExtremes[1]-colExtremes[0]) ) //
        range = arr.map(d => interpolatePlasma(d))

        var increasing = 'true'
        if(typeof colorSelMeta[0].scale_increasing !== 'undefined'){increasing = colorSelMeta[0].scale_increasing}
        locSetColorincreasing(increasing)
    }

    if(increasing === 'false'){
        range.reverse()
    }

    locSetColortype(selType)
    locSetColorrange(range)
    locSetColorbins(bins)
    locSetColordomain(domain)
}

const handleArrowChange = (event) => { // `event` is and arrow containing the value of each selected option as a string
    locSetArrowSel(event.map(d => d.value))
}

// Display options

const displayOptions = [
    { value: "adaptDisps", label: "Adaptive display" },
    { value: "allNames", label: "Show all names" },
    { value: "timeLabs", label: "Time labels" }
  ];

const displayDefault = [displayOptions[0], displayOptions[2]]

// Selector styles

const cust_style = {  
    control: base => ({ // https://stackoverflow.com/questions/73939936/react-select-how-to-change-the-font-size-on-on-the-dropdown-menu
        ...base,
        cursor: 'pointer'
      }), 
    menu: base => ({
    ...base,
    cursor: 'pointer'
    }),
    menuPortal: base => ({
        ...base,
        cursor: 'pointer'
    }),
    option: (styles) => ({ // https://github.com/JedWatson/react-select/issues/3831
        ...styles,
        cursor: 'pointer',
      })
  };
    
    return (
        <div id = 'Navbar'>
            <Columns centered = {true} vCentered = {true}>
                {/* HIGHLIGHT + FACTOR Block */}
                <Columns.Column size = {4}>
                    <Columns centered = {true} vCentered = {true}>
                        {/* Highlight column */}
                        <Columns.Column size = {7}>
                        <HighlightFirmSelector></HighlightFirmSelector>
                        </Columns.Column>
                         {/* Factor column */}
                        <Columns.Column size = {5}>
                            <Grid container direction="column" alignItems="center" justifyContent="center">
                                <Grid item xs ={12}>
                                    <h4> Explaining factors </h4>
                                </Grid>
                                <Grid item xs ={12} style={{'width': '100%'}}>
                                <MultiSelectAll 
                                    options={arrowOptions} 
                                    value = {selected}
                                    onChange={[setSelected, handleArrowChange]} // setSelected updates "internal" atom that keeps track of "select all" interaction. Seconds function follows up and acts on state update for communication with rest of App 
                                    />
                                </Grid>
                            </Grid>
                        </Columns.Column>
                    </Columns>
                </Columns.Column>
                {/* DISPLAY OPTIONS Block */}
                <Columns.Column size = {2}>
                    <Grid container direction="column" alignItems="center" justifyContent="center">
                        <Grid item xs ={12}>
                            <h4> Display options </h4>
                        </Grid>
                        <Grid item xs ={12} style={{'width': '100%'}}>
                        <MultiSelectAbrev
                            className="basic-single"
                            classNamePrefix="select"
                            name= "display"
                            options = {displayOptions}
                            defaultValue = {displayDefault}
                            isClearable = {false}
                            atoms = {{'adaptDisps' : adaptDisps, 'allNames' : allNames, 'timeLabs': timeLabs}}
                        />
                        </Grid>
                    </Grid>
                </Columns.Column>
                {/* SIZE + COLOR BLOCK */}
                <Columns.Column size = {3}>
                    <Columns centered = {true} vCentered = {true}>
                        {/* Size column */}
                        <Columns.Column size = {6}>
                            <Grid container direction="column" alignItems="center" justifyContent="center">
                                <Grid item xs ={12}>
                                    <h4> Size </h4>
                                </Grid>
                                <Grid item xs ={12} style={{'width': '100%'}}>
                                    <ReactSelect
                                        className="basic-single"
                                        classNamePrefix="select"
                                        defaultValue={locSizeOptions[0]}
                                        name="size"
                                        options = {locSizeOptions}
                                        onChange={handleSizeChange}
                                        styles = {cust_style}
                                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }} //https://stackoverflow.com/questions/54961077/react-select-is-there-a-way-to-remove-the-button-on-the-right-that-expand-the-l
                                    />
                                </Grid>
                            </Grid>
                        </Columns.Column>
                        {/* Color column */}
                        <Columns.Column size = {6}>
                            <Grid container direction="column" alignItems="center" justifyContent="center">
                                <Grid item xs ={12}>
                                    <h4> Color </h4>
                                </Grid>
                                <Grid item xs ={12} style={{'width': '100%'}}>
                                    <ReactSelect
                                        className="basic-single"
                                        classNamePrefix="select"
                                        defaultValue={locColorOptions[0]}
                                        name="color"
                                        options = {locColorOptions}
                                        onChange={handleColorChange}
                                        styles = {cust_style}
                                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }} //https://stackoverflow.com/questions/54961077/react-select-is-there-a-way-to-remove-the-button-on-the-right-that-expand-the-l
                                    />
                                </Grid>
                            </Grid>
                        </Columns.Column>
                    </Columns>
                </Columns.Column>
                {/* SHOW TOP N + YEAR Block */}
                <Columns.Column column size = {3}>
                    <Columns centered = {true} vCentered = {true}>
                        {/* Show top N column */}
                        <Columns.Column size = {5}>
                            <Grid container direction="column" alignItems="center" justifyContent="center">
                                <Grid item xs ={12}>
                                    <h4> Show top N </h4>
                                </Grid>
                                <Grid item xs ={12}>
                                    <AtomSlider min={0} max ={locmaxNfirms} default={100} width={100} atom={nFirms}/>
                                </Grid>
                            </Grid>
                        </Columns.Column>
                        {/* Time column */}
                        <Columns.Column size = {7}>
                            <Grid container direction="column" alignItems="center" justifyContent="center">
                                <Grid item xs ={12}>
                                    <h4> Time </h4>
                                </Grid>
                                <Grid item xs ={12}>
                                    <PlaySlider min={locminTime} max ={locmaxTime} delay={700} width={100} atom ={Time}/>
                                </Grid>
                            </Grid>
                        </Columns.Column>
                    </Columns>
                </Columns.Column>
            </Columns>
            
        </div>
    )
}

export default NavbarArrow