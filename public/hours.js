// Populates time inputs
$(".time-input").append(`<option selected disabled>---</option>`);
$(".time-input").append(`<option>12:00 AM</option>`);
$(".time-input").append(`<option>12:30 AM</option>`);
for(let i = 1; i <= 11; i++) {
    $(".time-input").append(`<option>${i}:00 AM</option>`);
    $(".time-input").append(`<option>${i}:30 AM</option>`);
}
$(".time-input").append(`<option>12:00 PM</option>`);
$(".time-input").append(`<option>12:30 PM</option>`);
for(let i = 1; i <= 11; i++) {
    $(".time-input").append(`<option>${i}:00 PM</option>`);
    $(".time-input").append(`<option>${i}:30 PM</option>`);
};

// Controls hours of operation input
$("#monCheckClosed").on("change", () => {
    if ($("#monCheckClosed")[0].checked) {
        $("#monCheck24").prop("disabled", true);
        $("#monOpen").prop("disabled", true);
        $("#monClose").prop("disabled", true);
    } else {
        $("#monCheck24").prop("disabled", false);
        $("#monOpen").prop("disabled", false);
        $("#monClose").prop("disabled", false);
    }
});
$("#monCheck24").on("change", () => {
    if ($("#monCheck24")[0].checked) {
        $("#monCheckClosed").prop("disabled", true);
        $("#monOpen").prop("disabled", true);
        $("#monClose").prop("disabled", true);
    } else {
        $("#monCheckClosed").prop("disabled", false);
        $("#monOpen").prop("disabled", false);
        $("#monClose").prop("disabled", false);
    }
});
$("#tueCheckClosed").on("change", () => {
    if ($("#tueCheckClosed")[0].checked) {
        $("#tueCheck24").prop("disabled", true);
        $("#tueOpen").prop("disabled", true);
        $("#tueClose").prop("disabled", true);
    } else {
        $("#tueCheck24").prop("disabled", false);
        $("#tueOpen").prop("disabled", false);
        $("#tueClose").prop("disabled", false);
    }
});
$("#tueCheck24").on("change", () => {
    if ($("#tueCheck24")[0].checked) {
        $("#tueCheckClosed").prop("disabled", true);
        $("#tueOpen").prop("disabled", true);
        $("#tueClose").prop("disabled", true);
    } else {
        $("#tueCheckClosed").prop("disabled", false);
        $("#tueOpen").prop("disabled", false);
        $("#tueClose").prop("disabled", false);
    }
});
$("#wedCheckClosed").on("change", () => {
    if ($("#wedCheckClosed")[0].checked) {
        $("#wedCheck24").prop("disabled", true);
        $("#wedOpen").prop("disabled", true);
        $("#wedClose").prop("disabled", true);
    } else {
        $("#wedCheck24").prop("disabled", false);
        $("#wedOpen").prop("disabled", false);
        $("#wedClose").prop("disabled", false);
    }
});
$("#wedCheck24").on("change", () => {
    if ($("#wedCheck24")[0].checked) {
        $("#wedCheckClosed").prop("disabled", true);
        $("#wedOpen").prop("disabled", true);
        $("#wedClose").prop("disabled", true);
    } else {
        $("#wedCheckClosed").prop("disabled", false);
        $("#wedOpen").prop("disabled", false);
        $("#wedClose").prop("disabled", false);
    }
});
$("#thuCheckClosed").on("change", () => {
    if ($("#thuCheckClosed")[0].checked) {
        $("#thuCheck24").prop("disabled", true);
        $("#thuOpen").prop("disabled", true);
        $("#thuClose").prop("disabled", true);
    } else {
        $("#thuCheck24").prop("disabled", false);
        $("#thuOpen").prop("disabled", false);
        $("#thuClose").prop("disabled", false);
    }
});
$("#thuCheck24").on("change", () => {
    if ($("#thuCheck24")[0].checked) {
        $("#thuCheckClosed").prop("disabled", true);
        $("#thuOpen").prop("disabled", true);
        $("#thuClose").prop("disabled", true);
    } else {
        $("#thuCheckClosed").prop("disabled", false);
        $("#thuOpen").prop("disabled", false);
        $("#thuClose").prop("disabled", false);
    }
});
$("#friCheckClosed").on("change", () => {
    if ($("#friCheckClosed")[0].checked) {
        $("#friCheck24").prop("disabled", true);
        $("#friOpen").prop("disabled", true);
        $("#friClose").prop("disabled", true);
    } else {
        $("#friCheck24").prop("disabled", false);
        $("#friOpen").prop("disabled", false);
        $("#friClose").prop("disabled", false);
    }
});
$("#friCheck24").on("change", () => {
    if ($("#friCheck24")[0].checked) {
        $("#friCheckClosed").prop("disabled", true);
        $("#friOpen").prop("disabled", true);
        $("#friClose").prop("disabled", true);
    } else {
        $("#friCheckClosed").prop("disabled", false);
        $("#friOpen").prop("disabled", false);
        $("#friClose").prop("disabled", false);
    }
});
$("#satCheckClosed").on("change", () => {
    if ($("#satCheckClosed")[0].checked) {
        $("#satCheck24").prop("disabled", true);
        $("#satOpen").prop("disabled", true);
        $("#satClose").prop("disabled", true);
    } else {
        $("#satCheck24").prop("disabled", false);
        $("#satOpen").prop("disabled", false);
        $("#satClose").prop("disabled", false);
    }
});
$("#satCheck24").on("change", () => {
    if ($("#satCheck24")[0].checked) {
        $("#satCheckClosed").prop("disabled", true);
        $("#satOpen").prop("disabled", true);
        $("#satClose").prop("disabled", true);
    } else {
        $("#satCheckClosed").prop("disabled", false);
        $("#satOpen").prop("disabled", false);
        $("#satClose").prop("disabled", false);
    }
});
$("#sunCheckClosed").on("change", () => {
    if ($("#sunCheckClosed")[0].checked) {
        $("#sunCheck24").prop("disabled", true);
        $("#sunOpen").prop("disabled", true);
        $("#sunClose").prop("disabled", true);
    } else {
        $("#sunCheck24").prop("disabled", false);
        $("#sunOpen").prop("disabled", false);
        $("#sunClose").prop("disabled", false);
    }
});
$("#sunCheck24").on("change", () => {
    if ($("#sunCheck24")[0].checked) {
        $("#sunCheckClosed").prop("disabled", true);
        $("#sunOpen").prop("disabled", true);
        $("#sunClose").prop("disabled", true);
    } else {
        $("#sunCheckClosed").prop("disabled", false);
        $("#sunOpen").prop("disabled", false);
        $("#sunClose").prop("disabled", false);
    }
});