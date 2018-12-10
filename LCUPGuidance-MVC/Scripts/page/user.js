$(document).ready(function () {
    var userObj = {
        init: function () {
            var self = this;

            self.declaration();
            self.setEvents();
            self.setDatableEvents();
        },
        declaration: function () {
            var self = this;

            self.$btnAdd = $("#btnAddUser");
            self.$userTable = $("#userTable");
            self.$userTbody = $("#userTbody");
            self.$userTrow = $("#userTbody tr");
            self.$statusID = $("#statusID");
            self.$frmUser = $("#frmUser");
            self.$validateLI = $("#validateLI");
            self.$successMessage = $("#successMessage");
        },
        setEvents: function () {
            var self = this;

            self.$btnAdd.on("click", function (event) {
                event.preventDefault();
                var deferred = $.Deferred();
                $.when(deferred).done(function (partialviewhtmltx) {
                    var afterShowEventFunc = [];

                    afterShowEventFunc.push(function () {
                        $("#btnSave").on('click', function (e) {
                            e.preventDefault();
                            self.processSaveUser();
                        });
                        $("#btnCancel").on('click', function (e) {
                            e.preventDefault();
                            self.refreshUserModalForm();
                            $('#modal').modal('toggle');
                        });
                    });
                    $(this).modalTask({
                        title: "Add User",
                        dataHtml: partialviewhtmltx,
                        eventsAfterShow: afterShowEventFunc
                    });
                });
                self.populateDataInUserModal('User/AddEditUser/0', deferred);
            });
        },
        setDatableEvents: function () {
            var self = this;

            self.$userTable.DataTable({
                "preDrawCallback": function (settings, json) {
                    $.each(self.$userTrow.find('.a-edit'), function (i, obj) {
                        $(obj).off('click').on('click', function (e) {
                            ShowLoading();
                            var dataID = $(this).data('id');
                            self.editUser(dataID, "update");
                        })
                    });
                }
            });
        },
        editUser: function (id, operation) {
            var self = this;
            var deferred = $.Deferred();
            $.when(deferred).done(function (partialviewhtmltx) {
                HideLoading();
                var afterShowEventFunc = [];

                afterShowEventFunc.push(function () {
                    $("#btnSave").on('click', function (e) {
                        e.preventDefault();
                        self.processSaveUser();
                    });
                    $("#btnCancel").on('click', function (e) {
                        e.preventDefault();
                        //self.refreshUserModalForm();
                        $('#modal').modal('toggle');
                    });
                });

                $(this).modalTask({
                    title: "Edit User",
                    dataHtml: partialviewhtmltx,
                    eventsAfterShow: afterShowEventFunc
                });
            });
            self.populateDataInUserModal('User/AddEditUser/' + id + '?operation=' + operation, deferred);
        },
        populateDataInUserModal: function (url, deferred) {
            $.ajax({
                type: "GET",
                url: url,
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    deferred.reject();
                }
            });
        },
        processSaveUser: function () {
            var self = this;

            ShowLoading();

            $.ajax({
                type: "POST",
                url: "/User/Post",
                data: $("#frmUser").serialize(),
                //contentType: "application/json; charset=UTF-8",
                dataType: "json",
                success: function (response) {
                    if (response.successYn) {
                        self.$successMessage.text("Record successfully saved");
                        self.$successMessage.addClass("text-info");
                        self.refreshUserModalForm();
                        $("#modal").modal("toggle");
                        var deferred = $.Deferred();
                        self.rebuildUsersTable(response.users, deferred);
                        $.when(deferred).done(function () {
                            HideLoading();
                            self.setDatableEvents();
                        })
                    }
                    else {
                        self.populateErrorInValidateLI(response.Errors);
                        self.refreshUserModalForm();
                    }
                }
            })
        },
        refreshUserModalForm: function () {
            var self = this;

            $("#Firstname").val("");
            $("#Middlename").val("");
            $("#Lastname").val("");
            $("#Password").val("");
            $("#EmailAddress").val("");
            $("#cboStatus").val("");
            $("#validateLI").empty();
        },
        populateErrorInValidateLI: function (errors) {
            var self = this;
            
            $("#validateLI").empty();
            $.each(errors, function (index, obj) {
                var html = "<li>" + obj + "</li>";
                $("#validateLI").append(html).css({"color": "red"});
            });
        },
        rebuildUsersTable: function (users, deferred) {
            var self = this;

            self.$userTable.DataTable().destroy();
            self.$userTbody.empty();

            $.each(users, function (index, obj) {
                var html = "<tr>" +
                        "<td> <a href='#' class='a-edit' data-id='" + obj.UserID + "'>" + obj.UserID + "</a> </td>" +
                        "<td>" + obj.Fullname + "</td>" +
                        "<td>" + obj.Username + "</td>" +
                        "<td>" + obj.EmailAddress + "</td>" +
                        "<td>" + obj.Status.StatusName + "</td>" +
                        "</tr>";
                self.$userTbody.append(html);
            });
            deferred.resolve();
        }
    }
    var InitializeUserObj = function () {
        var userObjTask = Object.create(userObj);
        userObjTask.init();
    }
    InitializeUserObj();
});