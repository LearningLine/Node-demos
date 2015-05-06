(function (global, $) {
    function create(todo) {
        return $.ajax({
            type: 'POST',
            url: '/api/todos',
            contentType: 'application/json',
            data: JSON.stringify(todo),
            dataType: 'json'
        });
    }

    function read() {
        return $.get('/api/todos');
    }

    function update(todo) {
        return $.ajax({
            type: 'PUT',
            url: '/api/todos/' + todo.id,
            contentType: 'application/json',
            data: JSON.stringify(todo),
            dataType: 'json'
        });
    }

    function delete_(todo) {
        return $.ajax({
            type: 'DELETE',
            url: '/api/todos/' + todo.id,
            contentType: 'application/json',
            dataType: 'json'
        });
    }

    global.db = {
        create: create,
        read: read,
        update: update,
        delete: delete_
    };
})(window, jQuery);
