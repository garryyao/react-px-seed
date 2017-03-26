import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Layout from '../../components/Layout';
import wc from '../../components/WebComponent';
import s from './styles.css';

const PxContextBrowser = wc('px-context-browser');
const PxDeckSelector = wc('px-deck-selector');
const PxDeckIndex = wc('px-deck-index', 'elements/px-deck');
const PxSpinner = wc('px-spinner');
const DashboardView = wc('dashboard-bundle', 'elements');

export default class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      _decks: [],
      _selectedDeck: null,
      _rootAsset: null,
      _openedAsset: null,
    };
  }

  static get defaultProps() {
    return {
      viewServiceBaseUrl: '/sample-data/view-service/',
      assetServiceBaseUrl: '/sample-data/predix-asset/'
    };
  }

  render() {
    if (this.state.loading || !this.state._rootAsset) {
      return <PxSpinner size={50} className={s.spinner} />;
    }

    return (
      <DashboardView>
        <Layout className={s.content}>
          <PxContextBrowser
            onSelectedItemChanged={this._onAssetSelected.bind(this)}
            handlers={{
              // getChildren fires when a node is 'selected'
              getChildren: this._getChildren.bind(this),
              // itemOpenHandler fires when a node's 'open' link is clicked
              itemOpenHandler: this.openAsset.bind(this)
            }}
            id="contextBrowser"
            labelField="name"
            idField="id"
            showChevron="true"
            browserContext={this.state._rootAsset}>
          <PxDeckSelector
              onSelectedDeckChanged={this._onDeckSelected.bind(this)}
              decks={this.state._decks}
              ref={this._initDeckSelector.bind(this)}
            />
          </PxContextBrowser>
          {
            this.state._selectedDeck ?
           <PxDeckIndex
              viewServiceBaseUrl={this.props.viewServiceBaseUrl}
              deckId={this.state._selectedDeck.id}/>
             : null
          }
        </Layout>
      </DashboardView>
    );
  }

  // "getChildren" handler for px-context-browser
  // this function shall return a promise to the asset data
  _getChildren(node) {
    return fetch(this.props.assetServiceBaseUrl + node.uri + '.json').then(function(res) {
      return res.json();
    });
  }

  _onDeckSelected(evt) {
    this.setState({
      _selectedDeck: evt.detail.value
    });
  }

  // Re-distribute child contents
  _initDeckSelector(comp) {
    if(comp) {
      const $el = ReactDOM.findDOMNode(comp);
      const $parent = $el.parentNode;
      if($parent.is === 'px-context-browser') {
        $el.parentNode.querySelector('.content-wrapper').append($el);
      }
    }
  }

  _onAssetSelected(evt) {
    const asset = evt.detail.value;
    // handle opening initial asset on page load
    if (!this.state._openedAsset && asset.id) {
      this.openAsset(asset);
    }
  }

  // An asset is opened,
  openAsset(asset) {
    this.setState({
      _openedAsset: asset
    });

    // Load decks of the current asset
    fetch(this.props.viewServiceBaseUrl + '/tags/'+asset.id + '.json').then((res) => {
      return res.json();
    }).then((rawDecks) => {
      const decks = [];
      if (rawDecks && rawDecks.length > 0) {
        rawDecks.forEach(function(deck) {
          decks.push({name: deck.title, id: deck.id});
        });
      }
      return decks;
    }).then((decks) => {
      this.setState({
        _decks: decks,
        _selectedDeck: decks[0]
      });
    });
  }

  componentWillMount() {
    // Load root asset
    fetch(this.props.assetServiceBaseUrl + '/root/root.json').then((res) => {
      return res.json();
    }).then((rootAsset) => {
      this.setState({
        _rootAsset: rootAsset,
        loading: false
      });
    });
  }
}
