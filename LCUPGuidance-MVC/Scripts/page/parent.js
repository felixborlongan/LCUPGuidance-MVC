$(document).ready(function () {
    var parentObj = {
        init: function () {
            var self = this;

            self.declaration();
            self.setEvents();
            self.setDataTableEvents();
        },
        initializeSelect2: function () {
            $("#cboChildrens").select2();
        },
        declaration: function () {
            var self = this;

            self.$btnAdd = $("#btnAddParent");
            self.$parentTable = $("#parentTable");
            self.$parentTbody = $("#parentTbody");
            self.$parentTrow = $("#parentTbody tr");
            self.$statusID = $("#statusID");
            self.$frmParent = $("#frmParent");
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
                            self.processSaveParent();
                        });
                        $("#btnCancel").on('click', function (e) {
                            e.preventDefault();
                            self.refreshParentModalForm();
                            $('#modal').modal('toggle');
                        });
                    });
                    $(this).modalTask({
                        title: "Add Parent",
                        dataHtml: partialviewhtmltx,
                        eventsAfterShow: afterShowEventFunc
                    });
                    self.initializeSelect2();
                });
                self.populateDataInParentModal('Parent/AddEditParent/0', deferred);
            });
        },
        setDataTableEvents: function () {
            var self = this;

            self.$parentTable.DataTable({
                "preDrawCallback": function (settings, json) {
                    $.each(self.$parentTrow.find('.a-edit'), function (i, obj) {
                        $(obj).off('click').on('click', function (e) {
                            ShowLoading();
                            var dataID = $(this).data('id');
                            self.editParent(dataID, "update");
                        })
                    });
                }
            });
        },
        editParent: function (id, operation) {
            var self = this;
            var deferred = $.Deferred();
            $.when(deferred).done(function (partialviewhtmltx) {
                HideLoading();
                var afterShowEventFunc = [];

                afterShowEventFunc.push(function () {
                    $("#btnSave").on('click', function (e) {
                        e.preventDefault();
                        self.processSaveParent();
                    });
                    $("#btnCancel").on('click', function (e) {
                        e.preventDefault();
                        //self.refreshUserModalForm();
                        $('#modal').modal('toggle');
                    });
                });

                $(this).modalTask({
                    title: "Edit Parent",
                    dataHtml: partialviewhtmltx,
                    eventsAfterShow: afterShowEventFunc
                });
                self.initializeSelect2();
            });
            self.populateDataInParentModal('Parent/AddEditParent/' + id + '?operation=' + operation, deferred);
        },
        populateDataInParentModal: function (url, deferred) {
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
        processSaveParent: function () {
            var self = this;

            ShowLoading();

            $.ajax({
                type: "POST",
                url: "/Parent/Post",
                data: $("#frmParent").serialize(),
                //contentType: "application/json; charset=UTF-8",
                dataType: "json",
                success: function (response) {
                    if (response.successYn) {
                        self.$successMessage.text("Record successfully saved");
                        self.$successMessage.addClass("text-info");
                        self.refreshParentModalForm();
                        $("#modal").modal("toggle");
                        var deferred = $.Deferred();
                        self.rebuildParentsTable(response.parents, deferred);
                        $.when(deferred).done(function () {
                            HideLoading();
                            self.setDataTableEvents();
                        });
                    }
                    else {
                        self.populateErrorInValidateLI(response.Errors);
                        HideLoading();
                    }
                }
            })
        },
        rebuildParentsTable: function (parents, deferred) {
            var self = this;

            self.$parentTable.DataTable().destroy();
            self.$parentTbody.empty();

            $.each(parents, function (index, obj) {
                var html = "<tr>" +
                        "<td> <a href='#' class='a-edit' data-id='" + obj.ParentID + "'>" + obj.ParentID + "</a> </td>" +
                        "<td>" + obj.Fullname + "</td>" +
                        "<td>" + obj.EmailAddress + "</td>" +
                        "<td>" + obj.Status.StatusName + "</td>" +
                        "</tr>";
                self.$parentTbody.append(html);
            });
            deferred.resolve();
        },
        refreshParentModalForm: function () {
            var self = this;

            $("#Firstname").val("");
            $("#Middlename").val("");
            $("#Lastname").val("");
            $("#EmailAddress").val("");
            $("#cboStatus").val("");
            $("#validateLI").empty();
        },
        populateErrorInValidateLI: function (errors) {
            var self = this;

            $("#validateLI").empty();
            $.each(errors, function (index, obj) {
                var html = "<li>" + obj + "</li>";
                $("#validateLI").append(html).css({ "color": "red" });
            });
        }
    }

    var InitializeParentObj = function () {
        var parentTaskObj = Object.create(parentObj);
        parentTaskObj.init();
    }
    InitializeParentObj();
}); 