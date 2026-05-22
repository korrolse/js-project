const createListBtn = document.querySelector('#create-list-btn');
const listsContainer = document.querySelector('#lists-container');

// Load lists from localStorage
let lists = JSON.parse(localStorage.getItem('todoLists') || '[]');

function saveLists() {
    localStorage.setItem('todoLists', JSON.stringify(lists));
}

function createNewList() {
    const listObj = { id: Date.now().toString(), title: 'My List', tasks: [] };
    lists.push(listObj);
    saveLists();
    createListUI(listObj);
}

function createListUI(listObj) {
    const listBlock = document.createElement('div');
    listBlock.classList.add('todo-list');

    const title = document.createElement('h2');
    title.textContent = listObj.title || 'My List';

    const input = document.createElement('input');
    input.placeholder = 'Enter task';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add';

    const ul = document.createElement('ul');

    const deleteListBtn = document.createElement('button');
    deleteListBtn.textContent = 'Delete List';
    deleteListBtn.classList.add('delete-list-btn');

    function render() {
        ul.innerHTML = '';
        listObj.tasks.forEach(function (task, index) {
            const li = document.createElement('li');

            const span = document.createElement('span');
            span.textContent = task.text || task;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = !!task.completed;
            li.classList.toggle('completed', !!task.completed);
            checkbox.addEventListener('change', function () {
                const idx = lists.findIndex(l => l.id === listObj.id);
                if (idx === -1) return;
                lists[idx].tasks[index].completed = checkbox.checked;
                li.classList.toggle('completed', checkbox.checked);
                saveLists();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () {
                const idx = lists.findIndex(l => l.id === listObj.id);
                if (idx === -1) return;
                lists[idx].tasks.splice(index, 1);
                render();
                saveLists();
            });

            li.appendChild(span);
            li.appendChild(checkbox);
            li.appendChild(deleteButton);
            ul.appendChild(li);
        });
    }

    addButton.addEventListener('click', function () {
        const value = input.value.trim();
        if (!value) return;
        const idx = lists.findIndex(l => l.id === listObj.id);
        if (idx === -1) return;
        lists[idx].tasks.push({ text: value, completed: false });
        input.value = '';
        render();
        saveLists();
    });

    deleteListBtn.addEventListener('click', function () {
        const idx = lists.findIndex(l => l.id === listObj.id);
        if (idx === -1) return;
        lists.splice(idx, 1);
        saveLists();
        listsContainer.removeChild(listBlock);
    });

    listBlock.appendChild(title);
    listBlock.appendChild(input);
    listBlock.appendChild(addButton);
    listBlock.appendChild(deleteListBtn);
    listBlock.appendChild(ul);
    listsContainer.appendChild(listBlock);

    render();
}

createListBtn.addEventListener('click', createNewList);

// Load saved lists on startup
lists.forEach(l => createListUI(l));