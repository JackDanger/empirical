// ==========================================================================
// Project:   Empirical.Host
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Empirical */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Empirical.Host = SC.Record.extend(
/** @scope Empirical.Host.prototype */ {

  id: SC.Record.attr(Number),
  name: SC.Record.attr(String),
  sessions: SC.Record.attr(Array)

}) ;
