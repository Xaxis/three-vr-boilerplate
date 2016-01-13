/**
 * App initialization module
 */
define([
  'router',
  'core/main/views/mainView'
], function(
  Router,
  MainView
) {
  var Init = function() {
    return {

      /**
       * Initialize modules
       */
      initialize: function() {

        // Module initializations
        Router.initialize({pushState: true});

        // Backbone initializations
        new MainView();
      }
    };
  };

  return Init;
});
