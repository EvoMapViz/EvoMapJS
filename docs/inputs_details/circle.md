---
layout: default
title: circles.json (Required)
nav_order: 1
parent: Inputs - Details
---

# `circles.json` (Required)

## Key-value pairs (each row)

#### Required
{: .mb-lg-3 }

> <span style="font-size:larger;"><code>name</code></span> : the name of the unit corresponding to the observation.

   - *Acceptable*: Any string.

> <span style="font-size:larger;"><code>time</code></span> : the time period for the observation.

   - *Acceptable*: Any integer or string.

  {: .warning}
   If the time period is a string, it will be sorted in alphabetical order. 
   For example, if you provide a complete year/month/date string, it must be formatted as `YYYY-MM-DD` (e.g., `1998-01-01`) to be sorted correctly.

> <span style="font-size:larger;"><code>x</code></span> : the x coordinate of the unit at `time`.

   - *Acceptable*: Any number.
 
> <span style="font-size:larger;"><code>y</code></span> : the y coordinate of the unit at `time`.

   - *Acceptable*: Any number.
 
   {: .note}
   x and y coordinates are rounded to 2 decimal places when data is loaded into the app to improve performance.

#### Optional
{: .mb-lg-3 }

> <span style="font-size:larger;"><code>continuous_feature_1</code></span> : a continuous feature of the unit at `time`.

   - *Acceptable*: Any number (float or integer).

 ⋮

> <span style="font-size:larger;"><code>continuous_feature_c</code></span> : a continuous feature of the unit at `time`.

   - *Acceptable*: Any number (float or integer).

> <span style="font-size:larger;"><code>discrete_feature_1</code></span> : a discrete feature of the unit at `time`.

   - *Acceptable*: Any string.

 ⋮
 
> <span style="font-size:larger;"><code>discrete_feature_d</code></span> : a discrete feature of the unit at `time`.

   - *Acceptable*: Any string.


## Further requirements and info

- Each row *must* contain the full exact same set of keys, including **at least one** continuous feature (on top of the required `name`, `time`, `x`, and `y` keys).

- Whether a feature is considered "continuous" or "discrete" is specified through `metadata.json`.
  - Features marked as "continuous" in `metadata.json` must be numerical.
  - Features marked as "discrete" in `metadata.json` will be treated as categorical, even if they are supplied in a numerical format.
    - Inconsistent types for "discrete" features has not been tested. 
    It's safest to have a single discrete feature be either all strings or all numericals across all rows. 

- Missing time periods for a unit is allowed. To indicate that a time period is missing, **completely** *omit* the row corresponding to that time period.
  - As indicated above, each *included* row *must* however contain the exact same set of keys. 
    In particular, the app does not allow for "partially missing" time periods whereby a row features missing keys or keys otherwise marked as `NA`, `NaN`, `null`,....

- The order of rows and key-value pairs within rows is irrelevant.


## Prototype of valid format


```
[
{"name":"1ST SOURCE CORP","time":1998,"mkvalt":0.58,"sic_code":"60","x":6.4079211884,"y":13.0098593574,"cluster":8,"sic_code_label":"Depository Institutions","cluster_label":"Banking"},
{"name":"1ST SOURCE CORP","time":1999,"mkvalt":0.48,"sic_code":"60","x":6.4444474746,"y":13.0361878325,"cluster":8,"sic_code_label":"Depository Institutions","cluster_label":"Banking"},
{"name":"PIONEER NATURAL RESOURCES CO","time":2000,"mkvalt":1.94,"rank":288.0,"sic_code":"13","x":6.8169413341,"y":3.6371516382,"cluster":4,"sic_code_label":"Oil and Gas Extraction","cluster_label":"Oil, Energy and Utilities"},
{"time":1999, "name":"PIONEER NATURAL RESOURCES CO", "mkvalt":0.9,"rank":417.0,"sic_code":"13","x":6.8474968473,"y":3.6536847176,"cluster":4,"sic_code_label":"Oil and Gas Extraction","cluster_label":"Oil, Energy and Utilities"}
]
```

For a full example of the data format, see [https://github.com/EvoMapViz/EvoMapJS/blob/main/src/data/circles_TEMPLATE_DO_NOT_ERASE.json](https://github.com/EvoMapViz/EvoMapJS/blob/main/src/data/circles_TEMPLATE_DO_NOT_ERASE.json) in this repository.
  - This is a reference template that should *not* be erased. 
  You should copy it, rename it to `circles.json`, and experiment with editing the latter with your own data (you can always revert to the template if you break the data format and want a fresh start).



