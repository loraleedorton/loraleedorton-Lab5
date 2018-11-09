$(document).ready(function() {
    $("#postComment").click(function() {
        var myobj = { Name: $("#name").val(), Comment: $("#comment").val() };
        var jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
        var url = "comment";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        });
    });
    $("#getComments").click(function() {
        $.getJSON('comment', function(data) {
            console.log(data);
            var everything = "<ul>";
            for (var comment in data) {
                var com = data[comment];
                everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
            }
            everything += "</ul>";
            $("#comments").html(everything);
        });
    });
    $("#deleteComments").click(function() {
        $.ajax({
            url: "comment",
            type: "DELETE",
            success: function(data, textStatus) {
                var nothing = "There are no comments";
                $("#comments").html(nothing);
            }
        });
    });
    $("#getCommentsQuery").click(function(event) {
        var url = 'query?q=' + $("#query").val();
        $.getJSON(url, function(data) {
            console.log("query returned data: ", data);
            var everything = "<ul>";
            $.each(data, function (i, item) {
                everything += "<li> Name: " + data[i].Name + " -- Comment: " + data[i].Comment + "</li>";
            });
            everything += "</ul>";
            $("#comments").html(everything);    
        })
    })
});
