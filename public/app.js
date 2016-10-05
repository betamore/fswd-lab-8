import $ from 'jquery';
import bootstrap from 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
import 'bootstrap/css/bootstrap-theme.css!'
import angular from 'angular';
import _ from 'lodash';

import 'fswd';

// Make jquery available in the console
window.$ = $;

$('body').show();

angular.element(document).ready(function() {
  angular.bootstrap(angular.element(document), ['fswd']);
  // this must be a bug of some kind
  // TODO: Dig into this
  angular.resumeBootstrap([]);
});

// $(function() {
//   $('button#add').click(function(e) {
//     // Make sure the form does not get submitted
//     e.preventDefault();
//
//     // extract the current value of the todo
//     var newTodo = $('input[name=todo]').val();
//
//     // create a completely new (unattached)
//     // list item element (<li>)
//     var newListElement = $('<li></li>');
//     var newListElementButton = $('<button>X</button>');
//     newListElementButton.click(function(e) {
//       e.preventDefault();
//
//       newListElement.fadeOut(1000, function() {
//         newListElement.remove();
//       });
//     });
//
//     // Set its text
//     newListElement.text(newTodo);
//     newListElement.append(newListElementButton);
//
//     // And add it to the end of the list
//     $('ul').append(newListElement);
//
//     // Then clear out the input element
//     $('input[name=todo]').val("");
//   });
// });
