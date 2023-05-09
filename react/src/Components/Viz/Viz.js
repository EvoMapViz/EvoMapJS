import React from 'react';
import Gapminder from './vizSubCompon/Gapminder/Gapminder.js';
import SizeLegend from './vizSubCompon/SizeLegend/SizeLegend.js';
import ColorLegend from './vizSubCompon/ColorLegend/ColorLegend.js';
import LegendTitle from './vizSubCompon/LegendTitle/LegendTitle.js';
import './Viz.css';
import { useAtom } from 'jotai'
import {colorSelLabel, sizeSelLabel } from 'jotaiStore';

export default function Viz() {

    const [locSizeLabel, ] = useAtom(sizeSelLabel)
    const [locColorLabel, ] = useAtom(colorSelLabel)

    return (
        <div className = 'viz'>
            <Gapminder/>
            <div style={{
                // width: (100-locShare) + '%', 
                width: '300px', 
                height :'99%'
                }}>
                <LegendTitle varHeader = 'Size:' varLabel = {locSizeLabel} instance = '1'/>
                <SizeLegend/>
                <LegendTitle varHeader = 'Color:' varLabel = {locColorLabel} instance = '2'/>
                <ColorLegend/>
            </div>
        </div>
    )
}