$(document).ready(function () {
    var studentObj = {
        init: function () {
            var self = this;

            self.declaration();
            self.setEvents();
        },
        declaration: function () {

        },
        setEvents: function () {

        }
    }

    var InitializeStudentObj = function () {
        var studentTaskObj = Object.create(studentObj);
        studentTaskObj.init();
    }
    InitializeStudentObj();
});