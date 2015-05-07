var myForm = document.getElementById('myForm');

myForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/');

    var data = JSON.stringify({
        name: document.getElementById('name').value
    });

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.send(data);

    xhr.responseType = 'json';

    xhr.onload = function() {
        var data = typeof xhr.response === 'object'
            ? xhr.response : JSON.parse(xhr.response);

        console.log(data);
    };
});
