import {
    odgovor
}from "./index_cisto.js"

$(function() {

    let INDEX = 0;
    $("#chat-submit").click(function(e) {
        let msg = $("#unos").val();
        e.preventDefault();
        if (msg.trim() == "") {
            return false;
        }
        generate_message_main(msg, "self", odgovor);
        setTimeout(function() {
            generate_message_main(msg, "user", odgovor);
        }, 1000);

    });

    function generate_message_main(msg, type, odgovor) {
        INDEX++;
        if (type == "self") {
            let str = "";
            str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + '">';
            str += '          <div class="cm-msg-text">';
            str += msg;
            str += "          </div>";
            str += "        </div>";
            $(".chat-logs").append(str); // stavlja kod
            $("#cm-msg-" + INDEX)
                .hide()
                .fadeIn(300);
            $("#unos").val("");
            $(".chat-logs") // github
                .stop()
                .animate({
                    scrollTop: $(".chat-logs")[0].scrollHeight
                }, 1000);
        } else {
            let str = "";
            str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + '">';
            str += '          <div class="cm-msg-text">';
            str += odgovor;
            str += "          </div>";
            str += "        </div>";
            $(".chat-logs").append(str); // stavlja kod 
            $("#cm-msg-" + INDEX)
                .hide()
                .fadeIn(300);
        }
    }


    $("#chat-circle").click(function() { // otvaranje chatboxa
        $("#chat-circle").toggle("scale");
        $(".chat-box").toggle("scale");
    });

    $(".chat-box-toggle").click(function() { // zatvaranje chatboxa
        $("#chat-circle").toggle("scale");
        $(".chat-box").toggle("scale");
    });
});
