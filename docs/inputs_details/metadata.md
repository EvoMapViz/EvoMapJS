---
layout: default
title: metadata.json
nav_order: 2
parent: Inputs - Details
---

# `metadata.json`
{: .mb-lg-5 } 
<!-- https://just-the-docs.github.io/just-the-docs/docs/utilities/layout/ -->

{: .note}
The array must contain **at least** *one object corresponding to a feature* from `circles.json`, and must identify **at least** *one* of these features as *"continuous"*.

## Key-value pairs (each row)


#### Required
{: .mb-lg-3 }

> <span style="font-size:larger;"><code>name</code></span> : The name of the feature.

- *Acceptable*: Any string that matches the name of a feature in `circles.json`.
<!-- {: .px-6 } -->

>  <span style="font-size:larger;"><code>label</code></span> : The label of the feature as it should be displayed
in the app's UI.

  - *Acceptable*: Any string.

#### Optional
{: .mb-lg-3 }

> <span style="font-size:larger;"><code>type</code></span> :  The type of the feature. 

  - *Acceptable*: `"continuous"`, `"discrete"`.
  - *Default*: `"discrete"`.
  - *Effect*:
    - `"continuous"`: 
       - Feature appears in the "Size" selector menu of the app's UI unless the `tooltip` key is set to `"only"`.
       - Feature must be numerical in `circle.json`. 
    - `"discrete"`:
       - Feature appears in the "Color" selector menu of the app's UI unless the `tooltip` key is set to `"only"`.
       - Feature will be treated as categorical (even if it is supplied in a numerical format in `circle.json`).

> <span style="font-size:larger;"><code>tooltip</code></span> :  Whether the featyre should be included in the tooltip that appears when the user hovers over a circle.

   - *Acceptable*: `"true"`, `"false"`, `"only"`.
   - *Default*: `"false"`.
   - *Effect*:
      - `"true"`: 
        - The feature is included in the tooltip that appears when the user hovers over a circle.
      - `false`: 
        - The feature is *not* included in the tooltip that appears when the user hovers over a circle.
        - The feature is included in the relevant selector menu of the app's UI (see `type`).
      - `"only"`:
        - The feature *is* included in the tooltip that appears when the user hovers over a circle.
        - The feature is *not* included in the relevant selector menu of the app's UI (see `type`).
  - *Note*: The tooltip is calibrated to include at least one feature (on top of each circle's name). If no features listed in
`metadata.json` has `tooltip` set of `"true"` or `"only"`, the
dimensions of the tooltip will be slightly off.

> <span style="font-size:larger;"><code>color_bins</code></span> :  How circles are binned into discrete categories when the feature is selected in the "Color" selector (e.g., `"color_bins": [1,10,100,300,600]` bins the feature based on whether its value is between its minimum value and 1, between 1 and 10, …, between 300 and 600, and between 600 and the feature's maximum value). Only affects features with `type` "continuous".

  -	*Acceptable*: An array of numbers, e.g., `[1,10,100,300,600]`.
  - *Default*: The quintiles of the feature's distribution (`undefined` for features with `type` "discrete").  

> <span style="font-size:larger;"><code>size_legend_bins</code></span> :  Set of values of features with `type` "continuous" for which a bubble-size is displayed in the size-legend.

  - *Acceptable*: An array of numbers, e.g., `[5, 100,300,600]`. Only affects features with `type` "continuous".
  - *Default*: 10%, 50%, and 100% quantiles of the feature's distribution (`undefined` for features with `type` "discrete").  

> <span style="font-size:larger;"><code>scale_increasing</code></span> :  Whether the feature's values should be mapped to circle sizes in an increasing or decreasing manner. Only affects features with `type` "continuous".

  - *Acceptable*: `“true”`, `“false”`.
  - *Default*: `“true”` for features with `type` "continous", `undefined` for features with `type` "discrete".
  - *Effect*:
    - `true`: For features with `type` "continuous", when the feature is selected through the "Size" selector, makes 
      - circle sizes  proportional  to the corresponding continuous feature.
      - the size Legend display from lower to higher values.
  proportional (`“true”`) or inversely proportional (“false”) to the corresponding continuous feature.
    - `false`: For features with `type` "continuous", when the feature is selected through the "Size" selector, makes
      - The size Legend is displayed from higher to lower values (`“false”`).
      - circle sizes inversely proportional to the corresponding continuous feature.

> <span style="font-size:larger;"><code>scale_minSize</code></span> :  Lowest possible circle-size. 

   -	*Acceptable*: a single number.
   -  *Default*: `1`.

> <span style="font-size:larger;"><code>scale_maxSize</code></span> :  Highest possible circle-size. 

   -	*Acceptable*: a single number.
   -  *Default*: `50`.

> <span style="font-size:larger;"><code>scale_exponent</code></span> :  Curvature of the matching between the values of a feature identified as “continuous” and the corresponding circle-sizes. Only affects features with `type` "continuous".

   -  *Acceptable*: a single number.
   -  *Default*: `1`.
   - *Effect*:
      -	A value of 1 corresponds to a linear scale, i.e., all values of the feature between its min and max will be linearly recast to sizes between `scale_minSize` and `scale_maxSize`.
      - A value above 1 corresponds to a concave scale, i.e., starting from `scale_minSize`, sizes will first increase fast with the value of the feature, and then increase slower and slower as they approach
    `scale_maxSize`.
      - A value below 1 corresponds to a convex scale, i.e., starting from `scale_minSize`, sizes will first increase slowly with the value of the feature, and then increase faster and faster as they approach `scale_maxSize`. 

> <span style="font-size:larger;"><code>unit</code></span> :   The unit-sign appended whenever the value of a continuous feature is displayed, whether in legends or in tooltips. Only affects features with `type` "continuous".

   - *Acceptable*: A string (`"B"`, `"USD"`, or `"$"`).
   - *Default*: empty string `""` (no unit-sign appended).

> <span style="font-size:larger;"><code>truncate_label</code></span> :  The number of characters after which the feature’s name label is truncated when displayed in the tooltip. 

   - *Acceptable*: A single number.
   - *Default*: `9`.

> <span style="font-size:larger;"><code>truncate_value</code></span> :  The number of characters after which whether the value of the feature is truncated when displayed in the tooltip.   

   - *Acceptable*: A single number.
   - *Default*: `6`.

> <span style="font-size:larger;"><code>legend_dline_extral</code></span> :  The base-length of the dashed line connecting bubble-sizes to their label in the size-legend. Only affects features with `type` "continuous".

   - *Acceptable*: A single number.
   - *Default*: `10`.

## Prototype of valid format

```
[ 
  {"name": "cluster",
  "label": "Cluster Number",
  "type": "discrete"
  },
  {"name": "mkvalt",
  "label": "Market Value",
  "type": "continuous",
  "tooltip" : "true"
  }
]
``` 

For a full example of the data format, see [https://github.com/EvoMapViz/EvoMapJS/blob/main/src/data/metadata_TEMPLATE_DO_NOT_ERASE.json](https://github.com/EvoMapViz/EvoMapJS/blob/main/src/data/metadata_TEMPLATE_DO_NOT_ERASE.json) in this repository.
  - This is a reference template that should *not* be erased. 
  You should copy it, rename it to `metadata.json`,  and experiment editing the latter with your own data (you can always revert to the template if you break the data format and want a fresh start).
  - `src/data/metadata_TEMPLATE_DO_NOT_ERASE.json` is made to work with `src/data/circles_TEMPLATE_DO_NOT_ERASE.json`.
