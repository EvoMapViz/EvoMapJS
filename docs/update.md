---
layout: default
title: Update input data
nav_order: 4
---

# Updating process for `circle.json`, `metadata.json`, and `arrows.json`

## Netlify

  {: .warning}
  To experiment with new data and metadata setting, please use your own branch with prefix `uexp/` (feel free to create one by cloning the `main` branch).
  **!! Do NOT use existing `main` or `dev` branches!!**.
  If you'd like to contribute, please create a new branch with prefix `dev/` and submit a pull request.

#### Existing turnkey deployement synced with Github repository.

  - Clone the `uexp/master` branche from [https://github.com/EvoMapViz/EvoMapJS](https://github.com/EvoMapViz/EvoMapJS).
  - Edit `circle.json`, `metadata.json`, or `arrows.json` locally in the `src/data` folder.
  - Commit your changes using `git` and push them to the Github repository.
  - The deployement at [https://uexp-evomapjs.netlify.app/](https://uexp-evomapjs.netlify.app/)) should automatically update (pending about a minute for the build process to complete).

#### App redeployed from scratch on Netlify from Github repository.

  - Clone the relevant branch at [https://github.com/EvoMapViz/EvoMapJS](https://github.com/EvoMapViz/EvoMapJS) repo.
  - Edit `circle.json`, `metadata.json`, or `arrows.json` locally in the `src/data` folder.
  - Commit your changes using `git` and push them to the Github repository.
  - The Netlify app you synced with your personal copy of the repo should automatically update on Netlify (pending about a minute for the build process to complete).

## Local

- After running `npm start` (which starts the local server environment for the app), edit `circle.json`, `metadata.json`, or `arrows.json` locally in the `src/data` folder.
- After you save your updates locally, the local deployment of your app at [http://localhost:3000/](http://localhost:3000/) should automatically update in your browser.



