import React, {PropTypes} from 'react';
import Layout from '../../components/Layout';
import wc from '../../components/WebComponent';
import s from './styles.css';

const PxCard = wc('px-card');

class BlankPage extends React.Component {

  render() {
    return (
      <Layout className={s.content}>
        <PxCard icon="fa-calendar-o" headerText="Blank Card">
          <p>This is a blank card</p>
        </PxCard>
      </Layout>
    );
  }
}
export default BlankPage;
