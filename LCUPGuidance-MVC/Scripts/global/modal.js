$(document).ready(function () {
    var ModalTaskObj = {
        init: function (element, options) {
            var self = this;
            self.$elemTrigger = $(element);
            self.options = $.extend({}, $.fn.modalTask.options, options);
            self.declaration();
            self.build();
        },

        declaration: function () {
            var self = this;
            self.$modal = undefined;
        },

        build: function () {
            var self = this;
            var body = "";
            var deferred = $.Deferred();

            $.when(deferred).done(function (body) {
                if (body != false) {
                    self.modalhtmltx = "<div class='modal fade in' id='" + self.options.id + "' tabindex='-1' role='dialog'>" +
                            "<div class='modal-dialog' role='document'>" +
                                "<div class='modal-content'>" +
                                    "<div class='modal-header font6'>" +
                                        "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                                        "<h4 class='text-center' style='font-weight:bold'>" + self.options.title + "</h4>" +
                                    "</div>" +
                                    "<div class='modal-body'>" + body + "</div>" +
                                   " <div class='modal-footer'>" +
                                       "<button type='button' id='btnSave' class='btn btn-primary btnModalFooter' >Save</button>" +
                                       "<button type='button' id='btnCancel' class='btn btn-primary btnModalFooter btnOutlinePrimary' >Cancel</button>" +
                                     "</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>";

                    $('body').append(self.modalhtmltx);

                    self.$modal = $("#" + self.options.id + ".modal");
                    self.modalTitle = self.$modal.find("div.modal-header h4").text();
                    self.$modalDialog = self.$modal.find("div.modal-dialog:first");
                    self.$modalBtnYes = self.$modal.find("div.modal-footer").find("button#btnYes");
                    self.$modalBtnNo = self.$modal.find("div.modal-footer").find("button#btnNo");
                    self.$modalForm = self.$modal.find("form:first");
                    HideLoading(); // HIDE PRELOADER BEFORE SHOWING THE MODAL

                    self.modal = self.$modal.modal({ backdrop: "static", show: true }); // DISPLAY THE MODAL

                    //self.$modalDialog.css("width", "");
                    // SET MODAL WIDTH
                    if ((self.options.modalWidthRateno != "") && $.isNumeric(self.options.width))
                        self.$modalDialog.css("width", self.options.width + "%");

                    if (self.options.btnYesHideyn) {
                        //self.$modal.find("div.modal-footer").find("button#btnYes").remove();
                        self.$modalBtnYes.remove();
                    } else {
                        self.$modalBtnYes.text(self.options.btnYestx);
                    }

                    if (self.options.btnNoHideyn) {
                        //self.$modal.find("div.modal-footer").find("button#btnNo").remove();
                        self.$modalBtnNo.remove();
                    } else {
                        self.$modalBtnNo.text(self.options.btnNotx);
                    }

                    self.setEvents();
                } else {
                    if (self.options.eventsFailed.length > 0) {
                        $.each(self.options.eventsFailed, function (ind, failedEvent) {
                            failedEvent();
                        })
                    }
                }
            });

            if (self.options.dataText != undefined && self.options.dataText.trim().length > 0) {
                body = "<p>" + self.options.dataText.trim() + "</p>";
                deferred.resolve(body);
            } else if (self.options.dataHtml != undefined && self.options.dataHtml.trim().length > 0) {
                body = self.options.dataHtml;
                deferred.resolve(body);
            } else if (self.options.dataUrl != undefined && self.options.dataUrl.trim().length > 0) {
                body = dataHtml;

                $.get(self.options.dataUrl, function (returnData) {
                    body = returnData;
                    deferred.resolve(body);
                }).fail(function (error) {
                    deferred.resolve(false);
                });
            }
            else {
                deferred.resolve(false);
            }

        },

        setEvents: function () {
            var self = this;

            if (self.options.eventsAfterShow.length > 0) {
                self.modal.on("shown.bs.modal", function () {
                    $.each(self.options.eventsAfterShow, function (ind, afterShowFunc) {
                        afterShowFunc(self);
                    });
                });
            }

            if (self.options.eventsCloseModal.length > 0) {
                self.modal.on("hidden.bs.modal", function () {

                    $.each(self.options.eventsCloseModal, function (ind, closeModalFunc) {
                        closeModalFunc(self);
                    })

                    $(this).data('bs.modal', null);
                    self.$modal.remove();
                });
            } else {
                self.modal.on("hidden.bs.modal", function () {
                    $(this).data('bs.modal', null);
                    self.$modal.remove();
                });
            }

            setTimeout(function () {
                //self.modal.show();
            }, 1000);
        }
    }

    $.fn.modalTask = function (options) {
        var element = this;
        var modalTaskObj = Object.create(ModalTaskObj);
        modalTaskObj.init(element, options);
    }

    $.fn.modalTask.options = {
        id: "modal", // STRING || MODAL ID
        title: "Confirmation", // STRING || MODAL TITLE
        dataText: "", // STRING || TEXT CONTENT OF THE MODAL'S BODY
        dataHtml: "", // STRING || HTML CONTENT OF THE MODAL'S BODY
        dataUrl: "", 
        btnYestx: "Save", // STRING || TEXT FOR THE YES BUTTON
        btnNotx: "Cancel", // STRING || TEXT FOR THE NO BUTTON
        btnYesHideyn: false, // BOOLEAN || HIDE YES BUTTON
        btnNoHideyn: false, // BOOLEAN || HIDE NO BUTTON
        width: undefined, // NUMERIC || WIDTH PERCENTAGE OF THE MODAL
        eventsAfterShow: [], // ARRAY || COLLECTION OF FUNCTIONS THAT WILL BE EXECUTED AFTER THE MODAL WAS SHOWN
        eventsCloseModal: [], // ARRAY ||COLLECTION OF FUNCTIONS THAT WILL BE EXECUTED AFTER THE MODAL WAS HIDDEN
        eventsFailed: [], // ARRAY || COLLECTION OF FUNCTIONS THAT WILL BE EXECUTED IF THE CREATION OF MODAL WAS UNSUCCESSFUL 
    }
});