'use strict';

var mongoose = require('mongoose'),
    Comment = mongoose.model('Comment'),
    ObjectId = mongoose.Types.ObjectId;

module.exports = function(database, Comments) {
    return {
        /**
         * Create an comments
         */
        create: function(req, res) {
            var CommentModel = new Comment(req.body);
            CommentsModel.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the comments'
                    });
                }
                res.json(comments);
            });
        },
        /**
         * Update an article
         */
        update: function(req, res, id) {
            var CommentsModel = new Comment(req.body);
            Comment.findByIdAndUpdate(new Object(req.query.id), CommentsModel, function(err, comment) {
                if (err) {
                    return res.status(500).json({
                        type: false,
                        error: 'couldn\'t update the comment'
                    })
                }
                return res.json({
                    type: true,
                    data: 'approved successfully'
                });
                // push the approved object to the
                io.emit('approved', req.body);
            });
        },
        /**
         * Delete an article
         */
        destroy: function(req, res, id) {
            Comment.findByIdAndRemove(new Object(req.query.id), function(err, comment) {
                if (err) {
                    return res.status(500).json({
                        type: false,
                        error: 'couldn\'t delete the comment'
                    })
                }
                res.json({
                    type: true,
                    data: 'deleted successfully'
                });
            });
        },
        /**
         * List of comments that are not validated by the admin
         */
        allComments: function(req, res, id) {
            Comment.find({
                    "approved": false
                })
                .sort('-created')
                .populate('comments', 'content')
                .exec(function(err, comments) {
                    if (err) {
                        return res.status(500).json({
                            error: 'Cannot list the articles'
                        });
                    }
                    res.json(comments);
                });
        },
        /**
         * List of comments
         *
         */
        all: function(req, res, id) {
            var articleId = req.params.articleId,
                user = req.params.user,
                limit = req.query.limit;
            Comment.find({
                    "articleId": articleId
                })
                .where('approved').equals(true)
                .limit(limit)
                .populate('comments', 'content')
                .exec(function(err, comments) {
                    if (err) {
                        return res.status(500).json({
                            error: 'Cannot list the comments'
                        });
                    }
                    res.json(comments);
                });
        }
    };
}
