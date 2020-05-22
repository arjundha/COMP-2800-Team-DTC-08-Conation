$("#searchBanner").hide();

$("#searchSubmit").on("click", () => {
    $(".businessCard").show();
    $("#searchBanner").hide();
    $("#searchBannerText").html("");
    $("#searchBannerFilter").html("");
    $("#searchBannerOnlineStore").html("");

    let text = $("#searchText").val();
    if (text) {
        console.log("Searching by " + text);
        $(".businessCard:not(:contains(" + text + "))").hide();
        $("#searchBanner").show();
        $("#searchBannerText").html("Showing results for: \"" + text + "\".");
    }

    let filter = $("#searchFilter").val();
    if (filter !== "None") {
        console.log("Filtering by " + filter);
        $(".businessCard:not(." + filter + "):visible").hide();
        $("#searchBanner").show();
        if (text) {
            $("#searchBannerFilter").html("<br>Filtering by category: " + filter + ".");
        } else {
            $("#searchBannerFilter").html("Filtering by category: " + filter + ".");
        }
    }

    let onlineStore = $("#searchOnlineStore").is(":checked");
    if (onlineStore) {
        console.log("Filtering by online store");
        $(".businessCard.productCount0:visible").hide();
        $("#searchBanner").show();
        if (text || filter !== "None") {
            $("#searchBannerOnlineStore").html("<br>Showing businesses with an online store.");
        } else {
            $("#searchBannerOnlineStore").html("Showing businesses with an online store.");
        }
    }
});