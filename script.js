$(document).ready(function() {

    // setting current time display
    var updateTime = function () {
        var currentTime = moment().format('dddd, MMMM Do, YYYY');
        $("#currentDay").text(currentTime);
    };

    // setting hour block times
    var updateColor = function () {
        // sets hour block time to current day with fixed hours, minutes, and seconds
        var nine = moment().hours(9).minutes(0).second(0);
        var ten = moment().hours(10).minutes(0).second(0);
        var eleven = moment().hours(11).minutes(0).second(0);
        var twelve = moment().hours(12).minutes(0).second(0);
        var thirteen = moment().hours(13).minutes(0).second(0);
        var fourteen = moment().hours(14).minutes(0).second(0);
        var fifteen = moment().hours(15).minutes(0).second(0);
        var sixteen = moment().hours(16).minutes(0).second(0);
        var seventeen = moment().hours(17).minutes(0).second(0);

        // formats the hour block text to be non-military for easier reading
        $("#nine").text(nine.format('h'));
        $("#ten").text(ten.format('h'));
        $("#eleven").text(eleven.format('h'));
        $("#twelve").text(twelve.format('h'));
        $("#thirteen").text(thirteen.format('h'));
        $("#fourteen").text(fourteen.format('h'));
        $("#fifteen").text(fifteen.format('h'));
        $("#sixteen").text(sixteen.format('h'));
        $("#seventeen").text(seventeen.format('h'));
    };

    // function to color code blocks
    var colorCode = function() {
        // create object with values equal to integers to aid time block coloring
        var numLetts = {
            nine: 9,
            ten: 10,
            eleven: 11,
            twelve: 12,
            thirteen: 13,
            fourteen: 14,
            fifteen: 15,
            sixteen: 16,
            seventeen: 17
        };

        // for each element with the hourHook class, apply the function that compares the current time with the set time in the hour block, and appropriately color the textarea
        $.each($(".hourHook"),function() {
            var numConv = numLetts[($(this).find("span").attr('id'))];
            var hourInt = moment().hours(numConv).minutes(0).seconds(0);

            if (hourInt.diff(moment(),'seconds') < -3600) {
                $(this).next().css("background-color","#d3d3d3");
            } else if (hourInt.diff(moment(),'seconds') > 0) {
                $(this).next().css("background-color","#77dd77");
            } else {
                $(this).next().css("background-color","#ff6961");
            }
        })
    };

    // saving input to local storage. event listener applied to all buttons. if the user saves an empty block, clear localstorage for that key
    $("button").on("click", function (event) {
        event.preventDefault();
        var textItem = $(this).prev().val();
        var findID = $(this).parent().find("span").attr("id");
        if (textItem.trim() === '' ? localStorage.removeItem(findID): localStorage.setItem(findID,textItem.trim()));
    });

    // get items from local storage. for each textarea element, apply the function that retrieves the value from local storage based on a corresponding ID
    $("textarea").each(function() {
        var findID = $(this).prev().find("span").attr("id");
        var storedItems = localStorage.getItem(findID);
        $(this).val(storedItems);
    });

    // calling functions
    updateTime();
    updateColor();
    colorCode();

    // set interval to continuously call functions. ensures color coding is updated and that the displayed time is correct, by the second 
    setInterval(updateTime, 1000);
    setInterval(colorCode, 1000);

});