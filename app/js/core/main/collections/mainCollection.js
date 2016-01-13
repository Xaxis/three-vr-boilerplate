/**
 * Backbone module collection
 */
define([
  'backbone',
  '../models/mainModel'
], function(Backbone, MainModel) {
  var MainCollection = Backbone.Collection.extend({
    model: MainModel
  });

  return MainCollection;
});
