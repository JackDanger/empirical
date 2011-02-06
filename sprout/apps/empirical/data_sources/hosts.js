// ==========================================================================
// Project:   Empirical.Hosts
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Empirical */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
Empirical.HostDataSource = SC.DataSource.extend(
/** @scope Empirical.Hosts.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {
    SC.Request.getUrl('/data?buckets=true').json()
      .notify(this, this.didFetchHosts, store, query)
      .send()
    // TODO: Add handlers to fetch data for specific queries.  
    // call store.dataSourceDidFetchQuery(query) when done.

    return NO ; // return YES if you handled the query
  },

  didFetchHosts: function(response, store, query){
    if (SC.ok(response)){
      var items = response.get('body')['buckets']
      var length = items.length
      for (var i = 0; i < length; i++){
        store.loadRecord(Empirical.Host, {name: items[i], id: i}, i);
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
