/**
 * Backbone module view template
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'text!../templates/main.tpl.html',
  '../collections/mainCollection'
], function(
  $,
  _,
  Backbone,
  MainTemplate,
  MainCollection
) {
  var MainView = Backbone.View.extend({
    el: $('body'),

    module_template: _.template(MainTemplate),

    events: {
      'click': 'defaultHandler'
    },

    initialize: function() {
      var
        _this             = this;

      // Bind methods
      _.bindAll(this,
        'defaultHandler'
      );

      // Initialize model collection
      this.collection = new MainCollection();
    },

    defaultHandler: function() {
    }

  });

  return MainView;
});
