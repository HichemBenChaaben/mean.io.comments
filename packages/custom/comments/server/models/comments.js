'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentsShema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    articleId: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    approved: {
        type: Boolean,
        default: false
    }
});

mongoose.model('Comment', CommentsShema);
