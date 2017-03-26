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
import Layout from '../../components/Layout';
import cx from 'classnames';
import wc from '../../components/WebComponent';
import s from './styles.css';
const PxAlertMessage = wc('px-alert-message');

class AlertsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: true
    };
  }

  static get defaultProps() {
    return {
      alertType: 'important',
      alertTitle: 'Heads up!',
      alertMessage: 'This definitely needs our attention.',
      alertAction: 'dismiss',
    };
  };

  handleDismiss() {
    this.setState({
      showAlert: false
    });
  }

  render() {
    return (
      <Layout>
        <PxCard icon="fa-calendar-o" headerText="Alert Card">
          {
            this.state.showAlert ?
            <PxAlertMessage className={cx({foo: 1})} type={this.props.alertType}
                            messageTitle={this.props.alertTitle}
                            message={this.props.alertMessage}
                            action={this.props.alertAction}
                            onPxAlertMessageHidden={this.handleDismiss.bind(this)}>
            </PxAlertMessage> : null
          }
        </PxCard>
      </Layout>
    );
  }
}
export default AlertsPage;
