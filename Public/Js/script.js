
async function getAllTask() {
    const res = await fetch('/api/todo', {
        method: "GET"
    })
    const data = await res.json();
    const tbody = document.querySelector('.tbody');

    data.todos.forEach(todo => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const a1 = document.createElement('a');

        td1.textContent = todo.todo;
        td2.textContent = "edit";
        td3.textContent = "delete";
        td3.classList.add("del")
        a1.href = `Views/viewTask.html?id=${todo._id}`;
        td3.addEventListener('click', (e) => handleDelete(e, todo._id))
        a1.appendChild(td2);

        if(todo.completed){
            td1.style = "text-decoration: line-through";
        }

        tr.append(td1, a1, td3);

        tbody.appendChild(tr);
    });
}
getAllTask();


const form = document.getElementById("myForm");

form.addEventListener('submit', async (e) => {
    console.log("btn click");
    const btn = form.querySelector('button');
    btn.textContent = "Saving...";
    e.preventDefault();
    

    const todo = form.todo.value;

    const Task = {
        todo : todo
    }

    try {
        const res = await fetch('/api/todo', {
            method: 'POST',
            body: JSON.stringify(Task),
            headers: {"content-type" : "application/json"}
        })
        
        const data = await res.json();
        const errorP = form.querySelector(".error");

        console.log(data);
        if(data.errors){
            console.log(data.errors.todo);
            errorP.textContent = data.errors.todo;
            btn.textContent = "Save";
        }
        
        if(data.task){
            errorP.textContent = "";
            console.log(data.redirect);
            alert("Succesfully added task");
            window.location.href = data.redirect;
            btn.textContent = "Save";
        }
    } catch (err) {
        console.log(err, "err");
    }

})

async function handleDelete(e, id){

    e.target.setAttribute("disabled", "disabled")

    console.log(id);

    if(window.confirm("are you sure you want to delete this task?")){
        
        const res = await fetch(`/api/todo/${id}`, {
            method: "DELETE",
        })
    
        const result = await res.json();
    
        console.log(result);
        if(result.message === "success"){
            location.reload();
        }
    }
}