var Stasis = require('stasis');
var path = require('path');

function build() {

  // Load config file.
  Stasis.initialize('stasis.json');

  // Collect and render.
  var pages = Stasis.createCollection('src/pages/*.md', 'out'),
      posts = Stasis.createCollection('src/posts/**/*.md', 'out/posts');
  Stasis.renderCollection(pages);
  Stasis.renderCollection(posts);

  // Generate blog post data for blog index polymer element.
  // Note that data generation callback function is exposed for ease of use.
  // This allows one can create own a polymer element and correspoding object data.
  Stasis.generateCollectionData(
    posts,
    'out/posts/data.json',
    function (doc) {
      return {
        title: doc.title,
        date: doc.date.mdy,
        tags: doc.tags,
        language: doc.language,
        path: path.relative('out/posts', doc.path.dir)
      };
    }
  );

}

build();