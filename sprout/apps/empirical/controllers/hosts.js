// ==========================================================================
// Project:   Empirical.hostsController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Empirical */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Empirical.hostsController = SC.ArrayController.create(
/** @scope Empirical.hostsController.prototype */ {

  summary: function () {
    var len = this.get('length'), ret;
    if (len && len > 0)
      ret = 1 == len ? '1 Host' : "%@ Hosts".fmt(len)
    else
      ret = "No Hosts"

    return ret
  }.property('length').cacheable(),

  changeSession: function(){
    var selected = this.get('selection')
    var name = selected.getEach('name')[0]
    // Empirical.store.find(Empirical.Session, {name: name})
  }


}) ;
