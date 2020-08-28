const tasks = [
    {
        id: 'todo-0',
        name: 'Learn some js 0!'
    },
    {
        id: 'todo-1',
        name: 'Learn some js 1!'
    },
    {
        id: 'todo-2',
        name: 'Learn some js 2!'
    }
];

function buildTodoItemEl(id, name) {
    let item = document.createElement('li');
    let span = document.createElement('span');
    let textContent = document.createTextNode(name);

    span.appendChild(textContent);

    item.id = id;
    item.appendChild(span);
    item.appendChild(buildButtonEl('delete'));
    item.appendChild(buildButtonEl('edit'));

    return item;
}

function buildButtonEl(type) {
    let button = document.createElement('button');
    let textContent = document.createTextNode(type);

    button.setAttribute('id', type);
    button.setAttribute('type', 'button');
    button.appendChild(textContent);

    return button;
}

function renderTodoList() {
    let fragment = document.createDocumentFragment();
    let todoListEl = document.querySelector('.todo');

    tasks.forEach(task => {
        const item = buildTodoItemEl(task.id, task.name);
        fragment.appendChild(item);
    });

    deleteButtonEvent(fragment);

    editButtonEvent(fragment);

    while (todoListEl.firstChild) {
        todoListEl.removeChild(todoListEl.firstChild);
    }

    todoListEl.appendChild(fragment);
}

function editButtonEvent(element) {
    element.childNodes.forEach(node => {
        node.querySelector('#edit').addEventListener('click', (event) => {

            replaceSpanWithInput(event);

        });
    });
}

function deleteButtonEvent(element) {
    element.childNodes.forEach(node => {
        node.querySelector('#delete').addEventListener('click', (event) => {
            node.parentNode.removeChild(event.target.parentNode);
        });
    });
}

function replaceSpanWithInput(event) {
    let span = event.target.parentNode.querySelector('span');
    let input = document.createElement('input');

    input.setAttribute('type', 'text');
    input.value = span.innerHTML;

    event.target.parentNode.replaceChild(input, span);

    replaceEditWithOk(event);
}

function replaceEditWithOk(event) {
    let editButton = event.target.parentNode.querySelector('#edit');
    let okButton = buildButtonEl( 'ok');
    let parent = event.target.parentNode;
    parent.replaceChild(okButton, editButton);

    parent.querySelector('#ok').addEventListener('click', () => {
        let input = parent.querySelector('input');
        let span = document.createElement('span');
        let textContent = document.createTextNode(input.value);
        let newEditButton = buildButtonEl('edit');

        span.appendChild(textContent);

        parent.replaceChild(span, input);
        parent.replaceChild(newEditButton, okButton);
        parent.querySelector('#edit').addEventListener('click', (e) => {
            replaceSpanWithInput(e);
        })
    });
}

renderTodoList();
