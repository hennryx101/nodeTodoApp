const form = document.querySelector(".formTask");

const params = window.location.search
const id = new URLSearchParams(params).get('id')

async function fetchTask(){
    const res = await fetch(`/api/todo/${id}`, {
        method: "GET"
    })

    const data = await res.json();

    console.table(data.task, "hooooo");
    const ids = form.querySelector('.id');
    const task = form.querySelector('.task');
    const status = form.querySelector('.doneTask');  
    const completed = data.task.completed;

    ids.textContent = `id - ${data.task._id}`;
    ids.value = data.task._id;
    task.value = data.task.todo;
    
    if(completed){
        status.checked = true;
    }
}

fetchTask();

form.addEventListener('submit', async (e) => {
    const btn = form.querySelector('button');
    btn.textContent = "Loading...";

    e.preventDefault();
    const id = form.querySelector('.id').value;
    const task = form.querySelector('.task').value;
    let status = form.querySelector('.doneTask').checked;  

    if(status){
        console.log("status is checked");
        status = true;
    }else{
        console.log("status is not checked");
        
    }

    const data = {
        todo: task,
        completed: status,
    }
    console.table(data);

    const res = await fetch(`/api/todo/${id}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    console.log(result.message);
    location.reload();
    btn.textContent = "Edit";

});