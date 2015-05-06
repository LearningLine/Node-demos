(function ($, db) {
    var $todoForm = $('#todo-form');
    var $todoInput = $('#todo-input');
    var $todoList = $('#todo-list');
    var itemTemplate = $('#todo-template').text();

    db.read().then(function (todos) {
        todos.forEach(render);
    });

    $todoForm.on('submit', function (e) {
        e.preventDefault();

        db.create({ title: $todoInput.val(), completed: false }).then(function (todo) {
            render(todo);
        });
    });

    $todoList.on('click', '.todo-toggle, .todo-text', function (e) {
        var $item = $(this).closest('.todo-item');
        var todo = $item.data('todo');
        todo.completed = !todo.completed;
        check(todo, $item);
        db.update(todo);
    });

    $todoList.on('click', '.todo-edit', function (e) {
        var $item = $(this).closest('.todo-item');
        var todo = $item.data('todo');
        toggleEditing(todo, $item);
    });

    $todoList.on('click', '.todo-delete', function (e) {
        var $item = $(this).closest('.todo-item');
        var todo = $item.data('todo');
        db.delete(todo).then(function () {
            $item.remove();
        });
    });

    function render(todo) {
        var $item = $(itemTemplate).data('todo', todo);
        check(todo, $item);
        $item.find('.todo-text').text(todo.title);
        $item.appendTo($todoList);
    }

    function check(todo, $item) {
        $item
            .toggleClass('todo-active', !todo.completed)
            .toggleClass('todo-completed', todo.completed)
        ;
    }

    function toggleEditing(todo, $item) {
        if ($item.hasClass('todo-editing')) {
            setTimeout(function () {
                var val = $item.find('.todo-val').val();

                if (todo.title !== val) {
                    todo.title = val;

                    db.update(todo).then(function () {
                        $item.removeClass('todo-editing').find('.todo-text').text(todo.title);
                    });
                }
            });
        } else {
            setTimeout(function () {
                $item.addClass('todo-editing').find('.todo-val').val(todo.title).focus();
            });
        }
    }
})(jQuery, window.db);
