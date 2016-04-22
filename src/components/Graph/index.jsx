import React, { Component } from 'react';
import d3 from 'd3';

import { Title, Description } from './Meta';
import Histogram from '../Histogram';
import Controls from './Controls';


class Graph extends Component {
  constructor() {
    super();

    this.state = {
      rawData: [],
      dataFilter: () => true
    };
  }

  loadRawData() {
    let dateFormat = d3.time.format("%m/%d/%Y");

    d3.csv(this.props.url)
      .row((d) => {
          if (!d['base salary']) {
              return null;
          }

         return {employer: d.employer,
                      submit_date: dateFormat.parse(d['submit date']),
                      start_date: dateFormat.parse(d['start date']),
                      case_status: d['case status'],
                      job_title: d['job title'],
                      base_salary: Number(d['base salary']),
                      salary_to: d['salary to'] ? Number(d['salary to']) : null,
                      city: d.city,
                      state: d.state};
          })
          .get((error, rows) => {
              if (error) {
                  console.error(error);
                  console.error(error.stack);
              }else{
                  this.setState({rawData: rows});
              }
          });
    }

  updateDataFilter(filter) {
      this.setState({dataFilter: filter});
  }

  componentWillMount() {
     this.loadRawData();
  }

  render() {
    if (!this.state.rawData.length) {
      return (
        <h2>Loading data now</h2>
        );
    }

    let params = {
            bins: 20,
            width: 1000,
            height: 500,
            axisMargin: 83,
            topMargin: 10,
            bottomMargin: 5,
            value: (d) => d.base_salary
        },
            fullWidth = 1000;

            let filteredData = this.state.rawData
                               .filter(this.state.dataFilter);

    return (
      <div>
        <Title data={filteredData} />
        <Description data={filteredData} allData={this.state.rawData} />
        <Controls data={this.state.rawData} updateDataFilter={::this.updateDataFilter} />
        <svg width={fullWidth} height={params.height}>
          <Histogram {...params} data={filteredData} />
        </svg>

      </div>
      );
  }
}

export default Graph;
