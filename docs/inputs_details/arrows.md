---
layout: default
title: arrow.json
parent: Inputs - Details
---

# `arrows.json`

## Key-value pairs

#### Required
{: .mb-lg-3 }

> <span style="font-size:larger;"><code>name</code></span> : The name of the arrow as it will be displayed in the app >(also serves as a technical identifier inside the code).

   - *Acceptable*: Any string.

> <span style="font-size:larger;"><code>x</code></span> : The x-coordinate of the arrow's head.

   - *Acceptable*: Any number.
   - By default, all arrows tails are placed x = 0.

> <span style="font-size:larger;"><code>y</code></span> : The y-coordinate of the arrow's head.

   - *Acceptable*: Any number.
   - By default, all arrows tails are placed at y = 0.

> <span style="font-size:larger;"><code>time</code></span> : The time at which the arrow's head is located.

   - *Acceptable*: Any number in the range of time periods included in `circle.json`.

{: .note }
Support for missing time periods has not been tested. 
For *each* arrow identified in `arrows.json`, it is safest to provide `x` and `y` coordinates for *all* time periods included in `circle.json`. 

## Prototype of valid format

```
[
  {
    "name": "FACTOR 1",
    "x": 6.4079211884,
    "y": 13.0098593574,
    "time": 1998
  },
  {
    "name": "FACTOR 1",
    "x": 6.4444474746,
    "y": 13.0361878325,
    "time": 1999
  },
  {
    "name": "FACTOR 1",
    "x": 6.4658528654,
    "y": 13.0025843621,
    "time": 2000
  }
  ]
  ```


For a full example of the data format, see [url https://github.com/EvoMapViz/EvoMapJS/blob/main/src/data/arrows_TEMPLATE_DO_NOT_ERASE.json](https://github.com/EvoMapViz/EvoMapJS/blob/main/src/data/arrows_TEMPLATE_DO_NOT_ERASE.json) in this repository.
  - This is reference template that should *not* be erased. 
  You should copy it, rename it to `arrows.json`, and experiment editing the latter with your own data (you can always revert to the template if you break the data format and want a fresh start).