---
title: Quickstart
layout: default
nav_order: 1
description: "A JS Toolbox for Mapping Evolving Relationship Data."
---

# Quickstart

This tutorial provides a quick overview about the different tools available in EvoMapJS.

To install the app *locally*:

- Clone the github repo.
- Inside a terminal, navigate to the `react` folder inside the local copy of the repository (`cd "local_path_of_githb_repo/react"`).
- Run `npm i` (this will installs `Node.js` module dependencies for `React`).
- Run `npm start` (the will starts the local server environment for the app).
- The app should open automatically in your default browser. 
If it does not, open a browser and navigate to [http://localhost:3000/](http://localhost:3000/). 

See the [Deploy online](https://evomapviz.github.io/EvoMapJS/docs/deploy/) section for a guide on how to deploy the app *online*.

# Branch management and usage

 - The `main` branch contains the latest stable version of the app.
 - Branches with the `dev/` prefix contain the development version(s) of the app (potentially unstable).
 - Branches with the `uexp/` prefix contain versions that all users to experiments with new data and metadata.

{: .warning}
  To experiment with new data and metadata setting, please use your own branch with prefix `uexp/` (feel free to create one by cloning the `main` branch).
  **!! Do NOT use existing `main` or `dev` branches!!**.
  If you'd like to contribute, please create a new branch with prefix `dev/` and submit a pull request.

{: .note}
  The doc is maintained on the `main` branch only, and deployed at [https://evomapviz.github.io/EvoMapJS/](https://evomapviz.github.io/EvoMapJS/). 
  Please always consult the doc through that link (unless they have been recently synced with the `main` branch, the `dev` and `uexp` branches may not contain up-to-date doc).

# Background

Last updated: March 2023

This quickstart guide is based on the following paper. If you use this package or parts of its code, please cite our work.

References

[1] Matthe, M., Ringel, D. M., Skiera, B. (2022), "Mapping Market Structure Evolution", Marketing Science, forthcoming.

Read the full paper here (open access): [https://doi.org/10.1287/mksc.2022.1385](https://doi.org/10.1287/mksc.2022.1385)

Contact: For questions or feedback, please [get in touch].

[get in touch]: mailto:matthe@wiwi.uni-frankfurt.de