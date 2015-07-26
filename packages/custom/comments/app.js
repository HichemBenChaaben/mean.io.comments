'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Comments = new Module('comments');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Comments.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Comments.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Comments.menus.add({
        title: 'Manage comments',
        link: 'Manage comments',
        roles: ['admin'],
        menu: 'main'
    });

    // Collect assets and aggregate them from the folder /public/assets
    // the path is relative by default
    Comments.aggregateAsset('css', 'comments.css');

    return Comments;
});
