



const state = {
    todo: [],
    inprogress: [],
    done: [],
  };
  
  const modal = document.getElementById('modal');
  const taskTitle = document.getElementById('taskTitle');
  const taskDesc = document.getElementById('taskDesc');
  const saveTask = document.getElementById('saveTask');
  const closeModal = document.getElementById('closeModal');
  const createBtn = document.getElementById('createBtn');
  const sort = document.getElementById('sort');
  
  createBtn.onclick = () => {
    modal.style.display = 'flex';
  };
  
  closeModal.onclick = () => {
    modal.style.display = 'none';
  };
  
  saveTask.onclick = () => {
    const title = taskTitle.value.trim();
    const desc = taskDesc.value.trim();
    if (!title) return;
  
    const task = {
      id: Date.now(),
      title,
      desc,
      createdAt: Date.now()
    };
  
    state.todo.push(task);
    save();
    render();
    modal.style.display = 'none';
    taskTitle.value = '';
    taskDesc.value = '';
  };
  
  function render() {
    ['todo', 'inprogress', 'done'].forEach(status => {
      const container = document.getElementById(status);
      container.innerHTML = "";
  
      const tasks = [...state[status]];
      if (sort.value === 'oldest') {
        tasks.sort((a, b) => a.createdAt - b.createdAt);
      } else {
        tasks.sort((a, b) => b.createdAt - a.createdAt);
      }
  
      tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "task";
        div.innerHTML = `
          <div class="task-header">${task.title}</div>
          <div class="task-desc">${task.desc}</div>
          <div class="actions">
            ${status !== 'inprogress' ? `<button class="inprogress">→</button>` : ''}
            ${status !== 'done' ? `<button class="done">✔</button>` : ''}
            <button class="delete">🗑</button>
          </div>
        `;
  
        div.querySelector(".inprogress")?.addEventListener("click", () => move(task.id, status, 'inprogress'));
        div.querySelector(".done")?.addEventListener("click", () => move(task.id, status, 'done'));
        div.querySelector(".delete").addEventListener("click", () => remove(task.id, status));
        container.appendChild(div);
      });
    });
  }
  
  function move(id, from, to) {
    const index = state[from].findIndex(t => t.id === id);
    if (index > -1) {
      const [task] = state[from].splice(index, 1);
      state[to].push(task);
      save();
      render();
    }
  }
  
  function remove(id, from) {
    state[from] = state[from].filter(t => t.id !== id);
    save();
    render();
  }
  
  function save() {
    localStorage.setItem("taskboard", JSON.stringify(state));
  }
  
  function load() {
    const data = JSON.parse(localStorage.getItem("taskboard"));
    if (data) {
      Object.assign(state, data);
    }
    render();
  }
  
  sort.onchange = render;
  load();
  

  
  