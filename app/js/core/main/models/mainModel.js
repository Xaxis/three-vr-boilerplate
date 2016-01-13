/**
 * Backbone module model
 */
define([
  'backbone'
], function(Backbone) {
  var MainModel = Backbone.Model.extend({
    defaults: function() {
      return {
        id: 0
      };
    }
  });

  return MainModel;
});
