var Stasis = require('stasis');

function build() {
  // load config
  Stasis.initialize('stasis.json');
  // collect and render
  var pages = Stasis.createCollection('src/pages/*.md', 'out'),
      posts = Stasis.createCollection('src/posts/**/*.md', 'out/posts');
  Stasis.renderCollection(pages);
  Stasis.renderCollection(posts);
  Stasis.generateCollectionData(
    posts,
    'out/posts/data.json',
    function (doc) {
      return {
        title: doc.title,
        date: doc.date.mdy,
        tags: doc.tags,
        language: doc.language,
        path: doc.path.dir
      };
    }
  );
}

build();