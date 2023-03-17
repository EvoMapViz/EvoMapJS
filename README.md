# EvoMapJS - A JavaScript Toolbox for Mapping Evolving Relationship Data

TBA : Intro blurb

## Installation

To install the app *locally*:

- Clone the github repo.
- Open the terminal and navigate inside the terminal to its local repository (`cd local_path_of_githb_repo`).
- Run `npm i` (this will installs `Node.js` module dependencies for `React`).
- Run `npm start` (the will starts the local server environment for the app).
- The app should open automatically in your default browser. 
If it does not, open a browser and navigate to [http://localhost:3000/](http://localhost:3000/). 

See [https://evomapviz.github.io/EvoMapJS/docs/deploy/](https://evomapviz.github.io/EvoMapJS/docs/deploy/) for a guide on how to deploy the app *online*.

## Usage

> :warning: *WARNING*:
>
> To experiment with new data and metadata setting, please use your own branch with prefix `uexp/` (feel free to create one by cloning the `main` branch).
> **!! Do NOT use existing `main` or `dev` branches!!**.
> If you'd like to contribute, please create a new branch with prefix `dev/` and submit a pull request.

See the doc at [https://evomapviz.github.io/EvoMapJS/docs/](https://evomapviz.github.io/EvoMapJS/docs/) for detailed instructions on how to use the app.

## References

This package is based on the authors' work in 

```
[1] Matthe, M., Ringel, D. M., Skiera, B. (2022), Mapping Market Structure Evolution. Marketing Science, forthcoming.
```
Read the full paper here (open access): <a href = 'https://doi.org/10.1287/mksc.2022.1385'>https://doi.org/10.1287/mksc.2022.1385</a> 

<b><i>Please cite our paper if you use this package or part of its code</i></b>

`evomap` also builds upon the work of others, including
```
[2] Ringel, D. M., & Skiera, B. (2016). Visualizing asymmetric competition among more than 1,000 products using big search data. Marketing Science, 35(3), 511-534.

[3] Torgerson, W. S. (1952). Multidimensional Scaling: I. Theory and method. Psychometrika, 17(4), 401-419.

[4] Van der Maaten, L., & Hinton, G. (2008). Visualizing data using t-SNE. Journal of Machine Learning Research, 9(11).

[5] Sammon, J. W. (1969). A nonlinear mapping for data structure analysis. IEEE Transactions on computers, 100(5), 401-409.

[6] Kruskal, J. B. (1964). Multidimensional scaling by optimizing goodness of fit to a nonmetric hypothesis. Psychometrika, 29(1), 1-27.
```

If you use the respective methods implemented in `evomap`, consider also citing the original references.

## License

`EvoMapJS` is licensed under the terms of the MIT license. It is free to use, however, <i>please cite our work</i>.