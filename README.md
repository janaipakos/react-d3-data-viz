# Data Visualization with React and D3
Histogram in React and D3 showing average developer salaries by state and year.

## Demo site:
- [http://jamesanaipakos.com/react-d3-data-viz](http://jamesanaipakos.com/react-d3-data-viz)
- [Blog post](http://jamesanaipakos.com/2016-04-12-scaffolding-a-react-web-application)

## How to Use:
```bash
git clone https://github.com/janaipakos/react-d3-data-viz.git
cd react-d3-data-viz
npm install
npm start
open http://localhost:3000 for development and http://localhost:8080 for production
```

## Features:
React components with d3 functionality. The description and title changes with the displayed data.

## Directory Structure
The directory has four folders.

- The production application loads `dist/index.html`, which reads the compiled `bundle.js`. Any change that needs to be reflected in production, the user should use the `npm run postinstall` script to run the production Webpack file and compile a new `dist/bundle.js`.
- `css/` contains the styling. The LESS file is referenced by the main Histogram Component, and bundled together for development. But in production, this styling is loaded as an external CSS file to avoid the Flash Of Unstyled Content.
- `public/data/` contains the data that will be loaded into the gragh. The only place this data is referenced is `/components/index.jsx` and the name of this file and the data include can be changed here.
- `.src/` is where the application Components live. Each Component has its own folder and is imported to other Components accordingly.
- The development application loads `index.html` in the root directory. And the production application loads `index.html` in `/dist`.


## Design Tools
- [**React and ReactDOM**](https://github.com/facebook/react) for reusable components.
- [**D3.js**](https://github.com/mbostock/d3) for visual component.
- [**Bootstrap**](http://getbootstrap.com/) for layout and styling.

## Deployment Tools
- [**gh-pages**](https://www.npmjs.com/package/gh-pages) for hosting through GitHub Pages.

## Build Tools
- [**Webpack**](https://github.com/webpack) for transpiling and load optimizations.

## Test Tools & Error Handling
- [**eslint**](https://github.com/eslint/eslint) to identify and report patterns.

## Image
![image.png][1]

[1]: https://raw.github.com/janaipakos/react-d3-data-viz/master/image.png

## Thank you
To [@Swizec](https://github.com/Swizec) for the original idea.
