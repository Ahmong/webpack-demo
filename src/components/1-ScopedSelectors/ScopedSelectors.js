import styles from './ScopedSelectors.less';
// import styles from '../style_locals.css';
// var styles = require('../style_js').locals;
import styles1 from '!yan-css-loader/locals?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:8]!./ScopedRoot.css';
// require('../style_js')
// require('./ScopedSelectors_locals.js')
// require('./AgentRoot.less');

import React, { Component } from 'react';

export default class ScopedSelectors extends Component {

  render() {
    return (
      <div>
        <div className={ styles.root }>
          <p className={ styles.text }>Scoped Selectors</p>
        </div>
        <p className={ `${styles.text} ${styles.composed}` }>Outside class root</p>
        <p className={ `${styles.text} ${styles.composed}` }>styles1 = { JSON.stringify(styles1, null, 4) }</p>
        <p className={ `${styles.text} ${styles.composed}` }>styles = { JSON.stringify(styles, null, 4) }</p>
      </div>
    );
  }

};
