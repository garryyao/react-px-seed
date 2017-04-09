/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import Header from './Header';
import s from './Layout.css';

import wc from '../../components/WebComponent';
const PxAppNav = wc('px-app-nav');
const Footer = wc('seed-footer', 'elements/seed-footer');
const AppLayout = wc('app-layout-bundle', 'elements');

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navExpanded: 'true'
    };
  }

  static propTypes = {
    className: PropTypes.string,
  };

  static get defaultProps() {
    return {
      navItems: [
        {
          "label": "Dashboards",
          "path": "dashboard",
          "icon": "fa-tachometer"
        }, {
          "label": "Blank Page",
          "path": "blankpage",
          "icon": "fa-file"
        },
        {
          "label": "Simple Asset",
          "path": "simple-asset",
          "icon": "fa-sitemap"
        },
        {
          "label": "Wind Data",
          "path": "winddata",
          "icon": "fa-line-chart"
        }
      ],
      footerLinks: [
        {
          "label": "隐私策略",
          "href": "http://www.ge.com/privacy",
          "target": "_blank"
        }, {
          "label": "使用条款",
          "href": "http://www.ge.com/terms",
          "target": "_blank"
        }
      ]
    }
  };

  handleExpand(e) {
    this.setState({
      navExpanded: e.detail.value
    });
  }

  render() {
    return (
      <AppLayout>
        <Header />
        <div className="viewport">
          <div className="content-wrapper">
            <PxAppNav
              pathPrefix="#/"
              navExpanded={this.state.navExpanded}
              navItems={this.props.navItems}
              onNavExpandedChanged={this.handleExpand.bind(this)} />
            <main className="u-pt-- u-pr-- u-pl--" role="main">
              <div className={cx(s.content, this.props.className)} />
              {this.props.children}
            </main>
          </div>
        </div>
        <Footer footeLinks={this.props.footerLinks}></Footer>
      </AppLayout>
    );
  }
}

export default Layout;
