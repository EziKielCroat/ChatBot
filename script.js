$(function() {
    
  msg = $("#unos").val();

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
      e.preventDefault();

      console.log(msg); // check if msg is parsed
      if (msg.trim() == "") {
          return false;
      }
      generate_message(msg, "self");
      setTimeout(function() {
          generate_message(msg, "user");
      }, 1000);

  });


  function generate_message(msg, type) { 

      INDEX++;
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
