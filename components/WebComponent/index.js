import assign from 'object-assign';
import pascalCase from 'pascal-case';
import camel2Dash from 'camel-2-dash';
import React from 'react';
import ReactDOM from 'react-dom';
import config from '../../tools/config';

const defaults = {
  React,
  ReactDOM,
};

// default base path of web components, read from config
const BASE_PATH = config.webComponentsBase.replace(/\/$/, '');

function syncEvent(node, eventName, newEventHandler) {
  const eventNameLc = camel2Dash(eventName);
  const eventStore = node.__events || ( node.__events = {}
    );
  const oldEventHandler = eventStore[eventNameLc];
  // Remove old listener so they don't double up.
  if (oldEventHandler) {
    node.removeEventListener(eventNameLc, oldEventHandler);
  }
  // Bind new listener.
  if (newEventHandler) {
    node.addEventListener(eventNameLc, eventStore[eventNameLc] = function handler(e) {
      newEventHandler.call(this, e);
    });
  }
}

function isElementDefined(elementName) {
  if(window.customElements.get(elementName)) {
    return true;
  }
  const constructor = document.createElement(elementName).constructor;
  return constructor !== HTMLElement && constructor !== HTMLUnknownElement;
}

function ReactWebComponent(CustomElement, opts, url) {
  opts = assign({}, defaults, opts);
  let tagName;
  if (typeof CustomElement === 'function') {
    tagName = (new CustomElement()).tagName;
  } else {
    tagName = CustomElement;
  }
  const displayName = pascalCase(tagName);
  const {React, ReactDOM} = opts;
  if (!React || !ReactDOM) {
    throw new Error('React and ReactDOM must be dependencies, globally on your `window` object or passed via opts.');
  }

  class ReactComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        imported: false
      };
    }

    static get displayName() {
      return displayName;
    }

    componentWillMount() {
      const self = this;
      function completed() {
        self.setState({
          imported: true
        });
      }

      if(!isElementDefined(tagName) ) {
        // Load the component async
        Polymer.Base.importHref(url, completed, (er) => {
          throw new Error('Failed to import module:' + url);
        }, true);
      } else {
        completed();
      }
    }

    componentDidMount() {
      // Import is already
      if(this.state.imported) {
        this.componentWillReceiveProps(this.props);
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if(this.state.imported && !prevState.imported) {
        this.componentWillReceiveProps(prevProps);
      }
    }

    componentWillReceiveProps(props) {
      const node = ReactDOM.findDOMNode(this);
      Object.keys(props).forEach(name => {
        if (name === 'children' || name === 'style') {
          return;
        }
        if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
          syncEvent(node, name.substring(2), props[name]);
        } else {
          node[name] = props[name];
        }
      });
    }

    render() {
      if (!this.state.imported) {
        return null;
      }

      return React.createElement(tagName, {style: this.props.style}, this.props.children);
    }
  }
  return ReactComponent;
}

export default function ReactPolymerComponent(
  element,
  elementPath=`${BASE_PATH}/${element}`,
  opts
) {
  const url = `${elementPath}/${element}.html`;
  return ReactWebComponent(element, opts, url);
};