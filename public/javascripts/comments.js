$(document).ready(function() {
    $("#postComment").click(function(event) {
        event.preventDefault();
        var myobj = { Name: $("#name").val(), Comment: $("#comment").val() };
        var jobj = JSON.stringify(myobj);
        $("#json").html("<b>" + "Click Get Comments to see what you've just posted" + "</b>");
        $("#comments").html("");
        var url = "comment";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                var status = textStatus.toUpper();
                $("#done").html(status);
            }
        });
        $("#name").val("");
        $("#comment").val("");
    });
    $("#getComments").click(function() {
        $("#json").html("");
        $.getJSON('comment', function(data) {
            console.log(data);
            var everything ="";
            for (var comment in data) {
                var com = data[comment];
                everything += "<b>" + com.Name + "</b>" + "<br>" + com.Comment + "<br><br>";
            }
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
            var everything = "";
            $.each(data, function (i, item) {
                everything += "<b>" + data[i].Name + "</b>" + "<br>" + data[i].Comment + "<br><br>";
            });
            $("#comments").html(everything);    
        });
    $("#query").val("");
    });
});
