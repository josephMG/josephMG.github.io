import $ from 'jquery';

import 'materialize-css';

import 'font-awesome/css/font-awesome.css';
import 'materialize-css/dist/css/materialize.css';

import '../styles/style.scss';

(function app() {
  // https://materializecss.com/sidenav.html
  $('.sidenav').sidenav();
  $('.collapsible').collapsible();
}());
