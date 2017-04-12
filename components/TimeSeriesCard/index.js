/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import s from './styles.css';

import wc from '../../components/WebComponent';
const PxCard = wc('px-card');
const PxSpinner = wc('px-spinner');
const PxRangePicker = wc('px-rangepicker');
const PxVisTimeSeries = wc('px-vis-timeseries');
const TimeseriesView = wc('time-series-bundle', 'elements');

class TimeSeriesCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  static get defaultProps() {
    return {
    };
  };

  componentWillMount() {
    setTimeout(()=> {
      fetch('sample-data/time-series.json').then((res) => {
        return res.json();
      }).then((data) => {

        data = this._formatChartData(data);
        // count for rangepicker
        const rangeFrom = Math.min.apply(null, data.map(function(n) {
          return n.x;
        }));
        const rangeTo = Math.max.apply(null, data.map(function(n) {
          return n.x;
        }));

        const range = {
          from: new Date(rangeFrom).toISOString(),
          to: new Date(rangeTo).toISOString(),
        };

        this.setState({
          chartData: data,
          range: range,
          loading: false
        });
      });
    }, 3e3);
  }

  _formatChartData(raw) {
    const series = [];
    const datapoints = raw.tags[0].results[0].values || raw.tags[0].results[0].datapoints;
    datapoints.forEach(function(point) {
      series.push({x: point[0], y: point[1]});
    });
    return series;
  }

  handleRangeChange(e) {
    this.setState({
      range: e.detail.value
    });
  }

  initRangePicker(comp) {
    if(comp) {
      Polymer.RenderStatus.afterNextRender(null, () => {
        const $rangePicker = this.$rangePicker = ReactDOM.findDOMNode(comp);
        const range = this.state.range;
        ['from', 'to'].map(function(which) {
          const picker = $rangePicker.querySelector('px-calendar-picker#' + which);
          picker.blockDatesBefore = range.from;
          picker.blockDatesAfter = range.to;
          picker.baseDate = moment(range[which]);
        });
      });
    }
  }

  render() {

    // show loading card
    if (this.state.loading || !this.state.chartData) {
      return <PxSpinner size={50} className={s.spinner}/>;
    }

    // The following components usage is primarily to illustrate attributes bindings
    // while not necessarily to.
    return (
        <TimeseriesView>
          <PxCard icon="fa-calendar-o" headerText="Time Series Card">
            <div className={s.card}>
              <PxRangePicker
                onRangeChanged={this.handleRangeChange.bind(this)}
                ref={this.initRangePicker.bind(this)}
                hidePresets
                dateFormat="YYYY/MM/DD"
                timeFormat="hh:mm:ss A"
                showButtons="true"
                range={this.state.range}>
              </PxRangePicker>
              <PxVisTimeSeries
                ref={(node) => { this.timeseries = ReactDOM.findDOMNode(node); }}
                width$={800}
                height$={300}
                preventResize$
                enableTooltip$
                registerLocation$
                includeAllSeries$
                yAxisConfig$={{"title": "Hz"}}
                seriesConfig$={{
                  "cruise-vibration": {
                    "type": "line",
                    "x": "x",
                    "y": "y",
                    "yAxisUnit": "Hz"
                  }
                }}
                selectionType$="xy"
                chartData$={this.state.chartData}
                range$={this.state.range}>
              </PxVisTimeSeries>
            </div>
          </PxCard>
        </TimeseriesView>
    );
  }
}
export default TimeSeriesCard;
