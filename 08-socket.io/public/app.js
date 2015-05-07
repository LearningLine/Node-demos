var socket = io.connect();

socket.on('connect', function() {
    console.log('client connected to server');
});

socket.on('chatMessage', function(msg) {
    addMsg(msg);
});

var room;

$('#send').on('click', function() {
    var msg = $('#msg').val();

    if (msg.indexOf('/join ') === 0) {
        room = msg.split(' ', 2).pop();
        socket.emit('joinRoom', room);
    } else {
        // addMsg(msg);
        socket.emit('sendMessage', room, msg);
    }
});

function addMsg(msg) {
    $('<li>').text(msg).appendTo('#msgs');
}
