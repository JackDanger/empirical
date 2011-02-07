// ==========================================================================
// Project:   Empirical.sessionsController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Empirical */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Empirical.sessionsController = SC.ArrayController.create(
/** @scope Empirical.sessionsController.prototype */ {


  changeSession: function(){
    var selected = this.get('selection')
    var name = selected.getEach('name')[0]
    var query = SC.Query.local(Empirical.Path, { name: name});
    Empirical.pathsController.set('content', Empirical.riak.find(query))
  }

}) ;
