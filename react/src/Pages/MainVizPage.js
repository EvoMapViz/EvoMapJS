import './bulma.min.css';
import './MainVizPage.css'
import {Columns} from 'react-bulma-components';
import {useMemo} from 'react';

import Viz from 'Components/Viz/Viz' // Absolute path import from src allowed through jsconfig.json in root (https://create-react-app.dev/docs/importing-a-component/, https://stackoverflow.com/questions/45213279/how-to-avoid-using-relative-path-imports-redux-action-action1-in-cre)
import NavbarArrow from 'Components/Navbar/NavbarArrow'
import NavbarNoArrow from 'Components/Navbar/NavbarNoArrow'

import { useAtom } from 'jotai'

import {rawCircleData, rawMetaData, rawArrowData,
        woRawCircleData, woRawMetaData, woRawArrowData,
        woAdaptDisps, woAllNames, woTimeLabs, woDisplay,
        woJustClicked, woJustSelHigh,
        woColgroup,
        woArrowsSel,
        woSizeOptions, woSizeSel, woColorSel, woSizeSelLabel, woColorSelLabel,
        woColorOptions, woColorType, woColorDomain, woColorRange, woColorBins, woColorIncreasing, woColorBounds, woColorExtremes, woDiscColorRange,
        woShare, woWidth, woHeight, woMargin,
        woXDomain, woYDomain, woXRange, woYRange,
        woSizeIncreasing, woSizeUnit,
        woSizeExponent, woSizeDomain, woSizeRange,
        woFontExponent, woFontDomain, woFontRange,
        woOpacityExponent, woOpacityDomain, woOpacityRange,
        woAllFirms,
        woMaxNfirms,
        woNFirms,
        woTime,
        woMinTime, woMaxTime, woNTimes,
        woData, woMetaData, woArrows, woIsArrows,
        woTransD3, woClearSvgTrigger, woHighlightCount} from 'jotaiStore';

import initializeAtoms from 'initializeAtoms';

const MainVizPage = () => {

  console.log('MainVizPage')

  // Initialize atoms

  const [locRawCircleData,] = useAtom(rawCircleData);
  const [locRawMetaData,] = useAtom(rawMetaData);
  const [locRawArrowData,] = useAtom(rawArrowData);

  const any_arrows = locRawArrowData.length > 0

  const [, locSetAdaptDisps] = useAtom(woAdaptDisps);
  const [, locSetAllNames] = useAtom(woAllNames);
  const [, locSetTimeLabs] = useAtom(woTimeLabs);
  const [, locSetDisplay] = useAtom(woDisplay);
  const [, locSetJustClicked] = useAtom(woJustClicked);
  const [, locSetJustSelHigh] = useAtom(woJustSelHigh);
  const [, locSetColgroup] = useAtom(woColgroup);
  const [, locSetArrowsSel] = useAtom(woArrowsSel);
  const [, locSetShare] = useAtom(woShare);
  const [, locSetWidth] = useAtom(woWidth);
  const [, locSetHeight] = useAtom(woHeight);
  const [, locSetMargin] = useAtom(woMargin);
  const [, locSetXDomain] = useAtom(woXDomain);
  const [, locSetYDomain] = useAtom(woYDomain);
  const [, locSetXRange] = useAtom(woXRange);
  const [, locSetYRange] = useAtom(woYRange);
  const [, locSetSizeOptions] = useAtom(woSizeOptions);
  const [, locSetColorOptions] = useAtom(woColorOptions);
  const [, locSetSizeSel] = useAtom(woSizeSel);
  const [, locSetColorSel] = useAtom(woColorSel);
  const [, locSetSizeSelLabel] = useAtom(woSizeSelLabel);
  const [, locSetColorSelLabel] = useAtom(woColorSelLabel);
  const [, locSetColorDomain] = useAtom(woColorDomain);
  const [, locSetColorType] = useAtom(woColorType);
  const [, locSetColorRange] = useAtom(woColorRange);
  const [, locSetDiscColorRange] = useAtom(woDiscColorRange);
  const [, locSetColorBins] = useAtom(woColorBins);
  const [, locSetColorIncreasing] = useAtom(woColorIncreasing);
  const [, locSetColorBounds] = useAtom(woColorBounds);
  const [, locSetColorExtremes] = useAtom(woColorExtremes);
  const [, locSetSizeIncreasing] = useAtom(woSizeIncreasing);
  const [, locSetSizeUnit] = useAtom(woSizeUnit);
  const [, locSetSizeExponent] = useAtom(woSizeExponent);
  const [, locSetSizeDomain] = useAtom(woSizeDomain);
  const [, locSetSizeRange] = useAtom(woSizeRange);
  const [, locSetFontExponent] = useAtom(woFontExponent);
  const [, locSetFontDomain] = useAtom(woFontDomain);
  const [, locSetFontRange] = useAtom(woFontRange);
  const [, locSetOpacityExponent] = useAtom(woOpacityExponent);
  const [, locSetOpacityDomain] = useAtom(woOpacityDomain);
  const [, locSetOpacityRange] = useAtom(woOpacityRange);
  const [, locSetAllFirms] = useAtom(woAllFirms);
  const [, locSetMaxNfirms] = useAtom(woMaxNfirms);
  const [, locSetNFirms] = useAtom(woNFirms);
  const [, locSetTime] = useAtom(woTime);
  const [, locSetMinTime] = useAtom(woMinTime);
  const [, locSetMaxTime] = useAtom(woMaxTime);
  const [, locSetNTimes] = useAtom(woNTimes);
  const [, locSetData] = useAtom(woData);
  const [, locSetRawMetaData] = useAtom(woMetaData);
  const [, locSetArrows] = useAtom(woArrows);
  const [, locSetIsArrows] = useAtom(woIsArrows);
  const [, locSetTransD3] = useAtom(woTransD3);
  const [, locSetClearSvgTrigger] = useAtom(woClearSvgTrigger);
  const [, locSetHighlightCount] = useAtom(woHighlightCount);


  useMemo(() => { // useMemo doesn't wait until render is complete to execute the effect (unlike useEffect), see https://stackoverflow.com/questions/63711013/how-to-trigger-useeffects-before-render-in-react
                  // Important because some of the rendered components depend on the atoms being initialized
    console.log('Atoms Memo initialization')
      initializeAtoms(locRawCircleData, locRawMetaData, locRawArrowData,
                      locSetAdaptDisps,
                      locSetAllNames,
                      locSetTimeLabs,
                      locSetDisplay,
                      locSetJustClicked,
                      locSetJustSelHigh,
                      locSetColgroup,
                      locSetArrowsSel,
                      locSetSizeOptions,
                      locSetColorOptions,
                      locSetSizeSel,
                      locSetColorSel,
                      locSetSizeSelLabel,
                      locSetColorSelLabel,
                      locSetColorDomain,
                      locSetColorType,
                      locSetColorRange,
                      locSetDiscColorRange,
                      locSetColorBins,
                      locSetColorIncreasing,
                      locSetColorBounds,
                      locSetColorExtremes,
                      locSetShare,
                      locSetWidth,
                      locSetHeight,
                      locSetMargin,
                      locSetXDomain,
                      locSetYDomain,
                      locSetXRange,
                      locSetYRange,
                      locSetSizeIncreasing,
                      locSetSizeUnit,
                      locSetSizeExponent,
                      locSetSizeDomain,
                      locSetSizeRange,
                      locSetFontExponent,
                      locSetFontDomain,
                      locSetFontRange,
                      locSetOpacityExponent,
                      locSetOpacityDomain,
                      locSetOpacityRange,
                      locSetAllFirms,
                      locSetMaxNfirms,
                      locSetNFirms,
                      locSetTime,
                      locSetMinTime,
                      locSetMaxTime,
                      locSetNTimes,
                      locSetData,
                      locSetRawMetaData,
                      locSetArrows,
                      locSetIsArrows,
                      locSetTransD3,
                      locSetClearSvgTrigger,
                      locSetHighlightCount)
  },[])

  // Render Home page

  return (
    <div className="box">
    <div className="row header">
      <Columns>
        <Columns.Column size ={12}>
          {any_arrows ? <NavbarArrow/> : <NavbarNoArrow/>}
        </Columns.Column>
      </Columns>
    </div>
    <div className="row content">
      <Viz/>
    </div>
  </div>
  );
}

export default MainVizPage;
