// ==========================================================================
// Project:   Pathogen.Host
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Pathogen */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Pathogen.Host = SC.Record.extend(
/** @scope Pathogen.Host.prototype */ {

  name: SC.Record.attr(String),
  sessions: SC.Record.attr(Array)

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('pathogen');