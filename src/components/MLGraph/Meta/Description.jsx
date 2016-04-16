import React, { Component } from 'react';
import d3 from 'd3';

import Meta from './BaseComponent';
import StatesMap from './StatesMap';


class Description extends Meta {
  getAllDataByYear(year, data) {
        data || (data = this.props.allData);

        return data.filter((d) => d.submit_date.getFullYear() == year);
    }

    getAllDataByUSState(USstate, data) {
        data || (data = this.props.allData);

        return data.filter((d) => d.state == USstate);
    }
    getPreviousYearFragment() {
        let years = this.getYears().map(Number),
            fragment;

        if (years.length > 1) {
            fragment = "";
        }else if (years[0] == 2010) {
            fragment = "";
        }else{
            let year = years[0],
                lastYear = this.getAllDataByYear(year-1),
                USstates = this.getUSStates();


            if (USstates.length == 1) {
                lastYear = this.getAllDataByUSState(USstates[0], lastYear);
            }

            if (this.props.data.length/lastYear.length > 2) {
                let times_more = (this.props.data.length/lastYear.length).toFixed();

                fragment = `, ${times_more} times more than the year before`;
            }else{
                let percent = ((1-lastYear.length/this.props.data.length)*100).toFixed();

                fragment = `, ${Math.abs(percent)}% ${percent > 0 ? "more" : "less"} than the year before`;
            }
        }

        return fragment;
    }
    getYearFragment() {
        let years = this.getYears(),
            fragment;

        if (years.length > 1) {
            fragment = "";
        }else{
            fragment = "In "+years[0];
        }

        return fragment;
    }

    getUSStateFragment() {
        let states = this.getUSStates(),
            fragment;

        if (states.length > 1) {
            fragment = "the US";
        }else{
            fragment = StatesMap[states[0].toUpperCase()];
        }

        return fragment;
    }
    render() {
      let formatter = this.getFormatter(),
            mean = d3.mean(this.props.data,
                           (d) => d.base_salary),
            deviation = d3.deviation(this.props.data,
                                     (d) => d.base_salary);

        let yearFragment = this.getYearFragment(),
            USStateFragment = this.getUSStateFragment(),
            previousYearFragment = this.getPreviousYearFragment(),
            N = formatter(this.props.data.length),
            min_salary = formatter(mean-deviation),
            max_salary = formatter(mean+deviation);
        return (
            <p className="lead">{yearFragment.length ? yearFragment : "Since 2010"}, {USStateFragment} {yearFragment.length ? "created" : "created"} {N} jobs for React developers{previousYearFragment}, who earned between ${min_salary} and ${max_salary}.</p>
        )
    }
}

export default Description;
