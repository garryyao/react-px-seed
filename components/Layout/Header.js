/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

import wc from '../../components/WebComponent';
const GeSvgLogo = wc('ge-svg-logo', 'elements/ge-svg-logo');
const PredixLogo = wc('predix-logo', 'elements/predix-logo');

class Header extends React.Component {

  render() {
    return (
      <header role="banner" className="flex flex--middle">
        <div className="viewport flex">
          <h3 className="flex__item app-title">
            <GeSvgLogo className="u-mr--"></GeSvgLogo>
            Predix应用
          </h3>
          <div className="flex__item">
            <div className="flex" style={{textAlign: 'right'}}>
              <h3 className="flex__item weight--normal logo">
                运行于
                <PredixLogo style={{display: 'inline-block', width: '82px'}} className="flex__item"></PredixLogo>
              </h3>
            </div>
          </div>
        </div>
      </header>
    );
  }

}

export default Header;
