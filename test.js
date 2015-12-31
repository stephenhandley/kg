var KG = require('./index');
var Assert = require('assert');

module.exports = {
  'should like do stuff' : function (done) {
    var kg = new KG(process.env.KNOWLEDGE_GRAPH_API_KEY);
    kg.search({
      query    : 'Crazy Town',
      types    : 'MusicGroup',
      limit    : 1,
      callback : function(error, result) {
        Assert.equal(error, null);
        var wikipediaUrl = result.itemListElement[0].result.detailedDescription.url;
        Assert.equal(wikipediaUrl, 'http://en.wikipedia.org/wiki/Crazy_Town')
        done();
      }
    });
  }
}
