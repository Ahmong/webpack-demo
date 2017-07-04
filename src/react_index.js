import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const app = document.getElementById("outlet");
// document.body.appendChild(app);
ReactDOM.render(<App />, app);
/*
const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);
*/

export default App;
