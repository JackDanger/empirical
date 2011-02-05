// ==========================================================================
// Project:   Pathogen.Host Fixtures
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Pathogen */

sc_require('models/host');

Pathogen.Host.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.

  { guid: 1,
    name: "highvolume.com",
    sessions: [] },
  
  { guid: 2,
    name: "manyvisitors.com",
    sessions: [] },
  
  { guid: 3,
    name: "we-track-everything.com",
    sessions: [] }

];
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('pathogen');