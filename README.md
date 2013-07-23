Whether
=======

An app for comparing different locations weather

Development Environment Setup
-----------------------------

Before you can get started with Whether, you'll need a few things:

* Ruby (standard on Mac OS X)
* Node.js (>=0.10.5 http://nodejs.org)

Once these have been installed, things become slightly easier. First, let's install grunt-cli:

`npm install -g grunt-cli`

Next, let's make sure all of our other Node dependencies are installed:

`npm install`

After that, let's make sure we have bundler:

`gem install bundler`

And then let's install Ruby related dependencies (CSS compliation, SASS, Compass):

`bundle install`

Boot Up
-------

If you've done all of the above, you should be able to run the following:

`grunt server`

Which should give you Redress running at [http://localhost:3000](http://localhost:3000).

Test It
-------

For testing we are using [Mocha](http://visionmedia.github.io/mocha/) with help on mocking and stubbing from [Sinon](http://sinonjs.org/docs/). To run the tests, simply call:

`grunt` or `grunt test`

Running Integration (In browser) Tests
--------------------------------------
You'll need to download/install phantomJS (http://phantomjs.org/download.html)

You'll also need to install mocha-phantomjs:
 `npm install mocha-phantomjs`

