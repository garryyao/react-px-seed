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
import s from './styles.css';

import wc from '../../components/WebComponent';
const PxCard = wc('px-card');
const PxSpinner = wc('px-spinner');
const PxDataTable = wc('px-data-table');

const AssetDetailView = wc('simple-asset-bundle', 'elements');

class AssetDetailsCard extends React.Component {
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
    const _this = this;
    fetch('sample-data/compressor-2017.json').then((res) => {
      return res.json();
    }).then((data) => {
      this.setState(Object.assign({
        loading: false
      }, _this._formatDataForTable(data)));
    });
  }

  render() {

    // show loading card
    if (this.state.loading) {
      return <PxSpinner size={50} className={s.spinner}/>;
    }

    return (
      <AssetDetailView>
        <PxCard icon="fa-sitemap" headerText="Asset Details">
          <div className={s.card}>
            <h4>{this.state.assetDescription}</h4>
            <PxDataTable tableData={this.state.assetTableData}/>
          </div>
        </PxCard>
      </AssetDetailView>
    );
  }

  _formatDataForTable(raw) {
    let sensor, sensors = [];
    const assetTags = raw[0].assetTag;
    for (let property in assetTags) {
      if (assetTags.hasOwnProperty(property)) {
        sensor = assetTags[property];
        delete sensor.complexType;
        delete sensor.tagDatasource;
        sensors.push(sensor);
      }
    }
    return {
      assetTableData: sensors,
      assetDescription: raw[0].description + ": " + raw[0].assetId
    };
  }
}
export default AssetDetailsCard;
