import React, { Component } from 'react';
import d3 from 'd3';
import _ from 'lodash';

export default class Meta extends Component {
    getYears(data) {
        data || (data = this.props.data);

        return _.keys(_.groupBy(this.props.data,
                                (d) => d.submit_date.getFullYear())
        );
    }

    getUSStates(data) {
        data || (data = this.props.data);

        return _.keys(_.groupBy(this.props.data,
                                (d) => d.state)
        );
    }

    getFormatter(data) {
        data || (data = this.props.data);

        return d3.scale.linear()
                 .domain(d3.extent(this.props.data,
                                   (d) => d.base_salary))
                 .tickFormat();
    }
}
