// ==========================================================================
// Project:   Empirical.Session
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Empirical */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
Empirical.SessionDataSource = SC.DataSource.extend(
/** @scope Empirical.Session.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {
    console.log(store, query)
    SC.Request.getUrl('/data/'+query.host+'?keys=true').json()
      .notify(this, this.didFetchSessions, store, query)
      .send()

    // TODO: Add handlers to fetch data for specific queries.  
    // call store.dataSourceDidFetchQuery(query) when done.

    return NO ; // return YES if you handled the query
  },

  didFetchSessions: function(response, store, query){
    if (SC.ok(response)){
      var items = response.get('body')['keys']
      var length = items.length
      for (var i = 0; i < length; i++){
        store.loadRecord(Empirical.Session, {name: items[i]}, i);
      }
    } else
      store.dataSourceDidErrorQuery(query, response)
  },

  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  createRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;
