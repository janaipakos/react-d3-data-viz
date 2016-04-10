import React, { Component } from 'react';
import _ from 'lodash';

import ControlRow from './ControlRow';

class Controls extends Component {
  constructor() {
        super();

        this.state = {
            yearFilter: () => true,
            year: '*',
            stateFilter: () => true,
            state: '*'
        };
    }

    updateYearFilter(year, reset) {
        let filter = (d) => d.submit_date.getFullYear() == year;

        if (reset || !year) {
            filter = () => true;
            year = '*';
        }

        this.setState({yearFilter: filter,
                       year: year});
    }

    updateStateFilter(state, reset) {
        var filter = (d) => d.state == state;

        if (reset || !state) {
            filter = () => true;
            state = '*';
        }

        this.setState({stateFilter: filter,
                       state: state});
    }

   componentDidUpdate() {
        this.props.updateDataFilter(
            ((filters) => {
                return (d) =>  filters.yearFilter(d)
                    && filters.stateFilter(d)
            })(this.state)
        );
    }

  shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.state, nextState);
    }
  render() {
    let getYears = (data) => {
            return _.keys(_.groupBy(data,
                                    (d) => d.submit_date.getFullYear()))
                    .map(Number);
        }

         let getStates = (data) => _.sortBy(_.keys(_.groupBy(data, (d) => d.state)));

    return(
            <div>
              <ControlRow data={this.props.data}
                  getToggleNames={getYears}
                  updateDataFilter={::this.updateYearFilter} />
              <ControlRow data={this.props.data}
                  getToggleNames={getStates}
                  updateDataFilter={::this.updateStateFilter}
                  capitalize="true" />
            </div>
      )
  }
}

export default Controls;
