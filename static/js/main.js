

let buttonId = document.getElementById("buttonOpen");
let chatContainer = document.getElementById("chat-container");
let inputMsg = document.getElementById("input_msg").value

let received_msg;

document.getElementById("input_msg").value = "";
console.clear();

// Main Functions
 
function openChat() {
    if (chatContainer.style.display === "none") {
      chatContainer.style.display = "block";
      buttonId.style.display = "none"
    } else {
	  chatContainer.style.display = "none"; 
    }
}

function closeChat() {
	if (chatContainer.style.display === "none") {
		chatContainer.style.display = "none"; 
		buttonId.style.display = "block"
	  } else {
		chatContainer.style.display = "none"; 
		buttonId.style.display = "block";
	  }
}

function sendMessage() {
	let inputMsg2 = document.getElementById("input_msg").value
    if (inputMsg2){

		showUserMessage($('#input_msg').val());
		connectionToPython(inputMsg2);

		setTimeout(function () {
		 showBotMessage(received_msg);
		document.getElementById("input_msg").value = "";
		}, 600);
	} else {
        return;
	}
}



// Help Functions

$(window).on('load', function () {
	showBotMessage('Hey, how can I help you?');
});

function getCurrentTime() {
	return new Date();
}

function showUserMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'right',
	});
}

function showBotMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'left',
	});
}

function renderMessageToScreen(args) {

	let displayDate = (args.time || getCurrentTime()).toLocaleString('en-IN', {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});

	let messagesContainer = $('.messages');

	let message = $(`
	<li class="message ${args.message_side}">
		<div class="avatar"></div>
		<div class="text_wrapper">
			<div class="text">${args.text}</div>
			<div class="timestamp">${displayDate}</div>
		</div>
	</li>
	`);
	messagesContainer.append(message);
	setTimeout(function () {
		message.addClass('appeared');
	}, 0);
	messagesContainer.animate({ scrollTop: messagesContainer.prop('scrollHeight') }, 300);
}

function connectionToPython(inputMsg2) {

	if ("WebSocket" in window) {
		const ws = new WebSocket("ws://localhost:8000");
		 
		ws.onopen = function() {
		   let outputMsg = inputMsg2
		   ws.send(outputMsg);
		};
		 
		ws.onmessage = function (evt) { 
		   received_msg = evt.data; 
		   console.log("Message recieved:", received_msg)
		};
		 
		ws.onclose = function() { 
		};
	 } else {
		alert("WebSocket NOT supported by your Browser!");
	 }

}