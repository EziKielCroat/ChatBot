import {odgovor} from "./index_cisto.js"
console.log(odgovor);

$(function() {

  let buttons = [{
          name: "Existing User",
          value: "existing"
      },
      {
          name: "New User",
          value: "new"
      }
  ];

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

function generate_message_main(msg, type, odgovor){
    INDEX++;
if(type == "self"){
    let str = "";
    str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + '">';
    str += '          <div class="cm-msg-text">';
    str += msg;
    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#cm-msg-" + INDEX)
        .hide()
        .fadeIn(300);
        $("#unos").val("");
    $(".chat-logs")
        .stop()
        .animate({
            scrollTop: $(".chat-logs")[0].scrollHeight
        }, 1000);
}else{
    let str = "";
    str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + '">';
    str += '          <div class="cm-msg-text">';
    str += odgovor;
    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#cm-msg-" + INDEX)
        .hide()
        .fadeIn(300);
  }
 } 




// redoing completely function

  function generate_message(msg, type) { 
      INDEX++;
      let str = "";
      str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + '">';
      str += '          <div class="cm-msg-text">';
      str += odgovor;
      str += "          </div>";
      str += "        </div>";
      $(".chat-logs").append(str);
      $("#cm-msg-" + INDEX)
          .hide()
          .fadeIn(300);
      if (type == "self") {
          $("#unos").val("");
      }
      $(".chat-logs")
          .stop()
          .animate({
              scrollTop: $(".chat-logs")[0].scrollHeight
          }, 1000);
  }

  $(document).delegate(".chat-btn", "click", function() {
      let value = $(this).attr("chat-value");
      let name = $(this).html();
      $("#unos").attr("disabled", false);
      generate_message(name, "self");
  });

  $("#chat-circle").click(function() {
      $("#chat-circle").toggle("scale");
      $(".chat-box").toggle("scale");
  });

  $(".chat-box-toggle").click(function() {
      $("#chat-circle").toggle("scale");
      $(".chat-box").toggle("scale");
  });
});
