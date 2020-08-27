const state = [
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
    const item = document.createElement('li');
    const span = document.createElement('span');
    const textContent = document.createTextNode(name);

    span.appendChild(textContent);

    item.id = id;
    item.appendChild(span);
    item.appendChild(buildButtonEl('delete'));
    item.appendChild(buildButtonEl('edit'));

    return item;
}

function buildButtonEl(type) {
    const button = document.createElement('button');
    const textContent = document.createTextNode(type);

    button.setAttribute('id', type);
    button.setAttribute('type', 'button');
    button.appendChild(textContent);

    return button;
}

function renderTodoList() {
    const frag = document.createDocumentFragment();
    const todoListEl = document.querySelector('.todo');

    state.forEach(task => {
        const item = buildTodoItemEl(task.id, task.name);
        frag.appendChild(item);
    });

    deleteButtonEvent(frag);

    editButtonEvent(frag);

    while (todoListEl.firstChild) {
        todoListEl.removeChild(todoListEl.firstChild);
    }

    todoListEl.appendChild(frag);
}

function editButtonEvent(element) {
    element.childNodes.forEach(a => {
        a.querySelector('#edit').addEventListener('click', (e) => {

            replaceSpanWithInput(e);

        });
    });
}

function deleteButtonEvent(element) {
    element.childNodes.forEach(a => {
        a.querySelector('#delete').addEventListener('click', (e) => {
            a.parentNode.removeChild(e.target.parentNode);
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
