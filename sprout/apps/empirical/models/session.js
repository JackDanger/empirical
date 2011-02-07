// ==========================================================================
// Project:   Empirical.Session
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Empirical */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Empirical.Session = SC.Record.extend(
/** @scope Empirical.Session.prototype */ {

  name: SC.Record.attr(String),
  host: SC.Record.attr(Empirical.Host),
  paths: SC.Record.attr(Array)

}) ;
