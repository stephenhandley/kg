# KG
Request-based wrapper around Google's Knowledge Graph HTTP API

# Example
```js
var kg = new KG('<YR API KEY>')
kg.search({
  query    : 'Crazy Town',
  types    : 'MusicGroup',
  limit    : 1,
  callback : function(error, result) {
    Assert.equal(error, null);
    var wikipediaUrl = result.itemListElement[0].result.detailedDescription.url;
    Assert.equal(wikipediaUrl, 'http://en.wikipedia.org/wiki/Crazy_Town')
  }
});
```
