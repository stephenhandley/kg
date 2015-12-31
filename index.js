var Request = require('request');
var Arghh = require('arghh');

// https://kgsearch.googleapis.com/v1/entities:search?query=taylor+swift&key=API_KEY&limit=1&indent=True
function KG (key) {
  if (key) {
    this.key = key;
  }
}

KG.uri = 'https://kgsearch.googleapis.com/v1/entities:search';

// query     string  A literal string to search for in the Knowledge Graph.
// ids       string  A list of entity IDs to search for in the Knowledge Graph.
// languages string  The list of language codes (defined in ISO 639) to run the /query with, for instance en.
// types     string  Restricts returned entities to those of the specified types. For example, you can specify Person (as defined in http://schema.org/Person) to restrict the results to entities representing people.
// indent    boolean Enables indenting of JSON results.
// prefix    boolean Enables prefix (initial substring) match against names and aliases of entities. For example, a prefix Jung will match entities and aliases such as Jung, Jungle, and Jung-ho Kang.
// limit     number  Limits the number of entities to be returned.

KG.prototype.search = function (args) {
  var callback = args.callback;

  var params = Arghh({
    required : ['key', ['query', 'ids']],
    optional : ['languages', 'types', 'indent', 'prefix', 'limit'],
    defaults : {
      key       : this.key,
      languages : 'en',
      indent    : false,
      prefix    : false
    }
  })(args);

  function done (error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }

    error = null;
    if (body.error) {
      error = new Error(body.error.message)
      body = null
    }

    callback(error, body);
  }

  Request.get({
    uri  : this.constructor.uri,
    qs   : params,
    json : true
  }, done);
};

module.exports = KG
