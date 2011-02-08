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
    var session_id = selected.getEach('session')[0]
    console.log(session_id)
    var query = SC.Query.local(Empirical.Path, { session_id: session_id});
    Empirical.pathsController.set('content', Empirical.riak.find(query))
  }

}) ;
