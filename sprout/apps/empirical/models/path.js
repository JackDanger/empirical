// ==========================================================================
// Project:   Empirical.Path
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Empirical */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Empirical.Path = SC.Record.extend(
/** @scope Empirical.Path.prototype */ {

  session_id: SC.Record.attr(String),
  path: SC.Record.attr(String),
  timer: SC.Record.attr(Number),
  ctime: SC.Record.attr(Number),
  user_name: SC.Record.attr(String),
  user_id: SC.Record.attr(Number)

}) ;
