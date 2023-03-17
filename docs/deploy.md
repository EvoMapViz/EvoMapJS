---
layout: default
title: Deploy online
nav_order: 3
---

# Deploy online (Netlify)

### Existing turnkey deployement synced with Github repository

  - The app has already been deployed to Netlify environments that are synced with the three main branches of the github repository. 

  {: .warning}
  To experiment with new data and metadata setting, please use your own branch with prefix `uexp/` (feel free to create one by cloning the `main` branch).
  **!! Do NOT use existing `main` or `dev` branches!!**.
  If you'd like to contribute, please create a new branch with prefix `dev/` and submit a pull request.

  - The deployment settings can be accessed at:
    - `main` branch [https://app.netlify.com/sites/main-evomapjs/overview](https://app.netlify.com/sites/main-evomapjs/overview).
    - `dev/master` branch [https://app.netlify.com/sites/dev-evomapjs/overview](https://app.netlify.com/sites/dev-evomapjs/overview).
    - `uexp/master` branch [https://app.netlify.com/sites/uexp-evomapjs/overview](https://app.netlify.com/sites/uexp-evomapjs/overview).
  - The deployed apps can be accessed at:
    - `main` branch [https://main-evomapjs.netlify.app/](https://main-evomapjs.netlify.app/).
    - `dev/master` branch [https://dev-evomapjs.netlify.app/](https://dev-evomapjs.netlify.app/).
    - `uexp/master` branch [https://uexp-evomapjs.netlify.app/](https://uexp-evomapjs.netlify.app/).

### Redeploying the app from scratch on Netlify from Github repository

  - Clone the branch of [https://github.com/EvoMapViz/EvoMapJS](https://github.com/EvoMapViz/EvoMapJS) you'd like to deploy to a separate Github repository of your own.
  - Create a Netlify account and link it to your Github account.
  - Create a new site on Netlify and link it to your cloned version of [https://github.com/EvoMapViz/EvoMapJS](https://github.com/EvoMapViz/EvoMapJS).
  - In your Netlify `Sites settings/Build setting`:
    - Set the "Base directory:" to `react`.
    - Set the "Build command:" to `CI=false npm run build`.
    - Set the publish directory to `react.build` if that is not already the default.
  - In your Netlify site's `Sites settings/Environment variables`, add 
    - A variable with key `NPM_FLAGS` and value `--legacy-peer-deps`.
