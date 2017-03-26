import React, {PropTypes} from 'react';
import Layout from '../../components/Layout';
import TimeSeriesCard from '../../components/TimeSeriesCard';
import s from './styles.css';


class WindDataPage extends React.Component {

  render() {
    return (
      <Layout className={s.content}>
        <TimeSeriesCard />
      </Layout>
    );
  }
}
export default WindDataPage;
