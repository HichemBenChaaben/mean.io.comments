(function(window) {
    'use strict';
    angular.module('mean.comments').controller('CommentsController', commentsCtrl);
    commentsCtrl.$inject = ['$scope', 'Global', "$stateParams", 'Comments', 'MeanUser'];

    function commentsCtrl($scope, Global, $stateParams, Comments, MeanUser) {
        var vm = this,
            articleId = $stateParams.articleId;

        /**
         * Getting the list of comments from the api
         * where it matches the viewed article
         * the comments will displayed on the same page as the article underneath it
         * @return {void}
         */
        vm.displayComments = function() {
            Comments.query({
                articleId: articleId
            }, function(comments) {
                vm.commentList = comments;
            });
        };

        /**
         * Post a comment to the db
         * @formValidity {boolean} form object validity
         * @return {void}
         */
        vm.create = function(formValidity) {
            // IF the form is valid we add article_id to
            // the comments then the date of the comment
            // then we save the comment
            if (formValidity) {
                // comment from the view
                var comments = new Comments(vm.comment);
                // Adding article_id to the comments
                comments.content = vm.usercomment.comment
                comments.articleId = $stateParams.articleId;
                // sending the user
                comments.user = MeanUser.user;
                // Saving the comment
                comments.$save(function(response) {
                    if (response) {
                        // Removing the label 'posting your comment'
                        $scope.commentsForm.$submitted = false;
                        vm.displayComments();
                    }
                });
                // Resetting the comments and the form
                vm.comment = {};
                vm.usercomment = {};
            } else {
                // commentsForm is the form name
                vm.commentsForm.$submitted = true;
            }
        };
    }
}(window));
