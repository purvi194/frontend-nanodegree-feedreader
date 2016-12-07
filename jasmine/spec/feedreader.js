/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        it('Url is defined, not empty, and is formatted properly', function() {
            /*will loop through all the url feeds making sure
                they are defined and are non empty*/
            allFeeds.forEach(function(feed) {
                /*tests that URL's  start with HTTPS*/
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* tests that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Name is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    describe('The menu', function() {
        /*ensuring that menu is hidden by default*/
        it('is hidden By default', function() {
            expect($(document.body).hasClass('menu-hidden')).toBe(true);
        });
        it('Changes visibility on icon click', function() {
            /*ensures the menu changes
          visibility when the menu icon is clicked. This test
          should have two expectations: does the menu display when
          clicked and does it hide when clicked again.*/
            $('a.menu-icon-link').click();
            expect(document.body.className).not.toContain('menu-hidden');
        });

        it('changes visibility after second click', function() {
            $('a.menu-icon-link').click();
            expect(document.body.className).toContain('menu-hidden');

        });
    });

    describe('Initial Entries', function() {
        var entry;
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('has an entry in feed container', function(done) {
            entry = $('.feed').contents().find('.entry').size();
            expect(entry).not.toBe(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        /*ensures when a new feed is loaded
          by the loadFeed function that the content actually changes.
          Remember, loadFeed() is asynchronous.*/
        var feed;

        beforeEach(function(done) {
            loadFeed(1, function() {
                feed = $('.feed').html();
                done();
            });
        });

        it('content changes', function(done) {
            loadFeed(0, function() {
                expect($('.feed').html()).not.toEqual(feed);
                done();
            });
        });
    });
}());