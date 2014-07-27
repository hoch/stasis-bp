# Stasis

> Yet Another Static Site Generator for Node


# Usage

### installation
    $> npm install -g stasis    # install stasis

### creating a new project
    $> mkdir newSite
    $> stasis init newSite      # create project scaffolding

### development
    $> cd newSite
    $> stasis dev               # watch project folder, build and liveReload
    $> stasis new_page $TITLE   # create a new page in /pages with filename
    $> stasis new_post $TITLE   # create a new blog post with filename

### build
    $> stasis

### publish
    #> stasis publish           # build and publish to (gh-pages || rsync)


# Directory Structure
scaffolding by `stasis init`

    .
    |
    +- bower_components         # filled by bower
    +- cache                    # site data cache (for incremental build)
    +- node_modules             # filled by npm
    +- out                      # generated output (FIXED)
    +- src                      # site source (FIXED)
    |   |
    |   +- assets               # images, media and etc
    |   +- pages                # static page sources
    |   +- posts                # blog post sources
    |       |
    |       +- 'YEAR'           # post sources in 'YEAR'
    |       +- ......           # post sources in another year
    +- template                 # Dust.js template files (FIXED)
    |   |
    |   +- partials             # partial templates
    |   +- scss                 # SASS files for site
    +- bower.json               # bower (REQUIRED)
    +- stasis.json              # stasis config file (REQUIRED)
    +- Gruntfile.js             # Grunt (REQUIRED)
    +- package.json             # npm (REQUIRED)
    +- README.md


# Stasis configuration file: stasis.json

    {
      authors: []               # authors
      siteTitle:              
      siteVersion:
      siteURL:
      deploymentURL:            # deployment URL, gh-pages or ssh/rsync
      gaTrackingID:             # google analytics tracking ID
      disqusName:               # disqus account name
      copyright: "CC BY-.."     # copyright (http://creativecommons.org/)
      editor:                   # favorite code editor path
    }


# Stasis Site Cache

    {
      'docId': {                # usually '.permalink' in doc
        srcPath:
        outPath:
        lastUpdated:            # moment unix format
      },
      ...
    }

- building a site produces a sitemap, a collection of docId and the correnspoding path
- when template rendering, stasis will parse the site map and compare the docId tipping the current location to the menu bar.

# License and Contact

MIT License, Hongchan Choi (hongchan.choi@gmail.com).