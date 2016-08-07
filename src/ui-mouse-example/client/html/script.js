var documentWidth = document.documentElement.clientWidth;
var documentHeight = document.documentElement.clientHeight;

var cursor = document.getElementById("cursor");
var cursorX = documentWidth / 2;
var cursorY = documentHeight / 2;

function UpdateCursorPos() {
    cursor.style.left = cursorX;
    cursor.style.top = cursorY;
}

function Click(x, y) {
    var element = $(document.elementFromPoint(x, y));
    element.focus().click();
}

$(function() {
    window.addEventListener('message', function(event) {
        if (event.data.type == "curserpos") {
            cursorX = event.data.x * documentWidth;
            cursorY = event.data.y * documentHeight;
            
            UpdateCursorPos();
        } else if (event.data.type == "enableui") {
            cursor.style.display = event.data.enable ? "block" : "none";
            document.body.style.display = event.data.enable ? "block" : "none";
        } else if (event.data.type == "click") {
            Click(cursorX - 1, cursorY - 1); 
        }
    });

    document.onkeyup = function (data) {
        if (data.which == 27) { // Escape key
            $.post('http://ui-mouse-example/escape', JSON.stringify({}));
        }
    };

    $("#login-form").submit(function(e) {
        e.preventDefault(); // Prevent form from submitting
        
        $.post('http://ui-mouse-example/login', JSON.stringify({
            username: $("#username").val(),
            password: $("#password").val()
        }));
    });
});
