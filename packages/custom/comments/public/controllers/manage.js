(function(window) {
    'use strict';
    angular.module('mean.comments').controller('ManageCtrl', manageCtrl);
    manageCtrl.$inject = ['$scope', 'Comments'];

    function manageCtrl($scope, Comments) {
        var vm = this;

        /**
         * Display comments that are not approved
         * @return {promise}
         */
        vm.displayComments = function() {
            // getting the last one only
            Comments.query({
                "limit": 1
            }, function(comments) {
                // display the oldest comment
                vm.commentQueue = comments;
                vm.comment = comments[0];
            });
        };

        /**
         * Approves one comment at the time
         * @return {promise} promise to approve the selected comment
         */
        vm.update = function(comment) {
            // approve the comment
            comment.approved = true;
            comment.$update({
                "id": comment._id
            }, function(response) {
                if (response) {
                    // resets the form for the view elements
                    vm.resetForm();
                    vm.displayComments();
                }
            });
        };

        /**
         * Remove a comment from the list of the comments
         * @param  {commentid} id of the comment to delete
         * @return {promise} object
         */
        vm.remove = function(comment) {
            // pass the comment object !!!
            comment.$remove({
                "id": comment._id
            }, function(response) {
                //FIXME: handle the response
                vm.resetForm();
                vm.displayComments();
            });
        };

        /**
         * Function resets the $submitted prop of the form
         * in order to reset the labels on the buttons
         * @return {void}
         */
        vm.resetForm = function() {
            $scope.manageComments.$submitted = false;
        }
    }
}(window));
