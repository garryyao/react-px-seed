import React, {PropTypes} from 'react';
import Layout from '../../components/Layout';
import AssetDetailsCard from '../../components/AssetDetailsCard';
import s from './styles.css';

class SimpleAssetPage extends React.Component {

  render() {
    return (
      <Layout className={s.content}>
        <AssetDetailsCard />
      </Layout>
    );
  }
}
export default SimpleAssetPage;
