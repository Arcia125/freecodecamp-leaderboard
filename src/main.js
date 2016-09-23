// main.js

var React = require('react');
var ReactDOM = require('react-dom');
var style = require('./main.scss');
var html = require('./index.html');


import Table from './app/app';

ReactDOM.render(
  <Table source='https://fcctop100.herokuapp.com/api/fccusers/top/recent' />,
  document.getElementsByClassName('react-app')[0]
);