import React from 'react';
import ReactDOM from 'react-dom';

import MLGraph from './components/MLGraph';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.decapitalize = function () {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

ReactDOM.render(
    <MLGraph url="https://raw.githubusercontent.com/janaipakos/money-laundering-chart/master/public/data/data.csv" />,
    document.getElementById('mlgraph'));
