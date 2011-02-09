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
    var session_id = this.get('selection').getEach('id')[0]
    var host = Empirical.hostsController.get('selection').getEach('name')[0]
    var query = SC.Query.local(Empirical.Path, { host: host, session_id: session_id});
    Empirical.pathsController.set('content', Empirical.riak.find(query))
  }

}) ;
