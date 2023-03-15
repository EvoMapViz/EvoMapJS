---
layout: default
title: metadata.json
nav_order: 2
parent: Inputs - Details and effects on visualization
---

# metadata.json

The array must contain **at least** *one object corresponding to a feature* from `circles.json`, and must identify **at least** *one* of these features as *"continuous"*.

For each object in the array, the key-value pairs are:

> `name` (required): The name of the feature.
>   - *Acceptable*: Any string that matches the name of a feature in `circles.json`.
> 
> `label` (required): The label of the feature as it should be displayed
> in the app's UI.
>   - *Acceptable*: Any string.
> 
> `type` (optional): The type of the feature. Must be either
> "continuous" or "discrete".
>   - *Default*: `"discrete"`.
>   - *Acceptable*: `"continuous"`, `"discrete"`.
>   - `"continuous"`: 
>      - Feature appears in the "Size" selector menu of the app's UI unless the `tooltip` key is set to `"only"`.
>      - Feature must be numerical in `circle.json`. 
>    - `"discrete"`:
>      - Feature appears in the "Color" selector menu of the app's UI unless the `tooltip` key is set to `"only"`.
>      - Feature will be treated as categorical (even if it is supplied in a numerical format in `circle.json`).
> 
> `tooltip` (optional): 
>   - *Acceptable*: `"true"`, `"false"`, `"only"`.
>   - *Default*: `"false"`.
>   - `"true"`: 
>     - The feature is included in the tooltip that appears when the user hovers over a circle.
>   - `false`, 
>     - The feature is *not* included in the tooltip that appears when the user hovers over a circle.
>     - The feature is included in the relevant selector menu of the app's UI (see `type`).
>   - `"only"`:
>     - The feature *is* included in the tooltip that appears when the user hovers over a circle.
>     - The feature is *not* included in the relevant selector menu of the app's UI (see `type`).
>   - *Note*: The tooltip is calibrated to include at least one feature (on top of each circle's name). If no features listed in
> `metadata.json` has `tooltip` set of `"true"` or `"only"`, the
> dimensions of the tooltip will be slightly off.
> 
>   !!! The rest of this "metadata" section contains rough and
> approximative guidance on how to use the other metadata parameters. 
> It is a barely edited copy-paste from old documentation and may not be
> up-to-date. TO DO: Update this documentation to better reflect the
> current state of the app and unify formatting !!!.
> 
> `color_bins` (optional):   
>   -	*Acceptable*: An array of numbers, e.g., `[1,10,100,300,600]`.
>   - *Default*: 
>       - Features marked as "continuous" :The quintiles of the feature's distribution.
>       - Features marked as "discrete": `undefined`.  
>   -	For features marked as "continuous", determines how circles are binned into discrete categories when the feature is selected in the "Color" selector (e.g., `"color_bins": [1,10,100,300,600]` bins the feature based on whether its value is between its minimum value and 1, between 1 and 10, …, between 300 and 600, and between 600 and the feature's maximum value).
>   - No effect on features marked as "discrete".
> 
> `size_legend_bins` (optional):   
>   - *Acceptable*: An array of numbers, e.g., `[5, 100,300,600]`.
>   - *Default*: 
>       - Features marked as "continuous" :10%, 50%, and 100% quantiles of the feature's distribution.
>       - Features marked as "discrete": `undefined`.
>   - Determines the set of values of features marked as "continuous" for which a bubble-size is displayed in the size-legend.
>   - No effect on features marked as "discrete".
> 
> `scale_increasing` (optional): 
>   - *Acceptable*: `“true”`, `“false”`.
>   - *Default*: `“true”` for features marked as "continous", `undefined` for features marked as "discrete".
>   - `true`: For features marked as "continuous", when the feature is selected through the "Size" selector, makes 
>     - circle sizes  proportional  to the corresponding continuous feature.
>     - the size Legend display from lower to higher values.
proportional (`“true”`) or inversely proportional (“false”) to the corresponding continuous feature.
> - `false`: For features marked as "continuous", when the feature is selected through the "Size" selector, makes
>   - The size Legend is displayed from higher to lower values (`“false”`).
>   - circle sizes inversely proportional to the corresponding continuous feature.
>  - No effect on features marked as "discrete".
>
> `scale_minSize` (optional):
>   -	*Acceptable*: a single number.
>   - *Default*: `1`.
>   -	Determines the lowest possible circle-size. 
>
>`scale_maxSize` (optional):   
>   -	*Acceptable*: a single number.
>   - *Default*: `50`.
>   -	Determines the highest possible circle-size. 
>
>`scale_exponent` (optional):
>   -  *Acceptable*: a single number.
>   - *Default*: `1`.
>   - Determines the curvature of the matching between the values of a feature identified as “continuous” and the corresponding circle-sizes.
>     -	A value of 1 corresponds to a linear scale, i.e., all values of the feature between its min and max will be linearly recast to sizes between `scale_minSize` and `scale_maxSize`.
>     - A value above 1 corresponds to a concave scale, i.e., starting from `scale_minSize`, sizes will first increase fast with the value of the feature, and then increase slower and slower as they approach
> `scale_maxSize`.
>     - A value below 1 corresponds to a convex scale, i.e., starting from `scale_minSize`, sizes will first increase slowly with the value of the feature, and then increase faster and faster as they approach `scale_maxSize`. 
>  - No effect on features marked as "discrete".
>
>`unit`:
>   - *Acceptable*: A string (`"B"`, `"USD"`, or `"$"`).
>   - *Default*: empty string `""`.
>   - Determines whether a unit sign is appended whenever the value of a continuous feature is displayed, whether in legends or in tooltips. 
>   - No effect on features marked as "discrete".
>
>`truncate_label` (optional):   
>   - *Acceptable*: A single number.
>   - *Default*: `9`.
>   - Determines the number of characters after which the feature’s name label is truncated when displayed in the tooltip.  
>
>`truncate_value`:   
>   - *Acceptable*: A single number.
>   - *Default*: `6`.
>   - Determines the number of characters after which whether the value of the feature is truncated when displayed in the tooltip.  
>
>`legend_dline_extral`:  
>   - *Acceptable*: A single number.
>   - *Default*: `10`.
>   - For features marked as "continuous", determines the base-length of the dashed line connecting bubble-sizes to their label in the size-legend.
>   - No effect on features marked as "discrete".

Prototype of valid format:

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

For a full example of the data format, see `src/data/metadata_TEMPLATE_DO_NOT_ERASE.json` in this repository.
  - This is a reference template that should *not* be erased. 
  You should copy it, rename it to `metadata.json`,  and experiment editing the latter with your own data (you can always revert to the template if you break the data format and want a fresh start).
  - `src/data/metadata_TEMPLATE_DO_NOT_ERASE.json` is made to work with `src/data/circles_TEMPLATE_DO_NOT_ERASE.json`.
