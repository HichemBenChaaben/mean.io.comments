'use strict';

module.exports = function(Comment, app, auth) {

    var comments = require('../controllers/comments')(Comment);

    // get all the comments for administrator validation
    app.route('/api/comments')
        .get(auth.requiresLogin, comments.allComments);

    // get the comments matching an article
    app.route('/api/comments/:articleId')
        .get(auth.requiresLogin, comments.all)
        .post(auth.requiresLogin, comments.create)
        .put(auth.requiresLogin, comments.update)
        .delete(auth.requiresLogin, comments.destroy);
};
