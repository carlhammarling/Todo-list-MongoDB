const form = document.querySelector('#form');
const addBtn = document.querySelector('#addBtn');
const input = document.querySelector('#form input')
const output = document.querySelector('#output');
// const modal = document.querySelector('.modalWrapper')


//Tom array för att pusha in i
const todos = []

const modalHandler = (modalText) => {
    document.querySelector('.modal p').innerText = modalText
    document.querySelector('.modalWrapper').classList.remove('hidden')
}

//En GET som hämtar från API och lägger till i todos.
const getTodos = async () => {
    const res = await fetch('./api/todos');
    const data = await res.json()

    //Data i det här fallet är en array, som pushar allt innehåll in i todos.
    data.forEach(todo => todos.push(todo))
    
    data.forEach(todo => console.log(todo._id))
    listTodos()
}
getTodos()



const listTodos = () => {

    output.innerHTML= ''

    //skapa item
    todos.forEach(todo => {   
    const item  = document.createElement('DIV');
    item.classList.add('item');
    item.id = todo._id

    //skapa p tag
    const p = document.createElement('P');
    p.innerText = todo.title;
    if(todo.completed === true) {
        p.classList.add('line')
    }
    item.addEventListener('click', async(e) => {
        e.preventDefault();
        console.log('div clicked')
        await putTodo(todo._id)
        listTodos()
    })

    //skapa button
    const button = document.createElement('BUTTON');
    button.innerText = 'delete';

    button.addEventListener('click', async (e) => {
        e.preventDefault()
        e.stopPropagation()

        await deleteTodo(todo._id)
            // e.target.parentElement.remove()
            
    })


    //Slå ihop grejerna

    item.append(p, button);
    output.appendChild(item);

    })

}

//POSTar till databasens
const postTodo = async (todo) => {
    const res = await fetch('./api/todos', {
        method: 'POST', 
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(todo)
    })
    const data = await res.json()
    // console.log(data)
    todos.push(data)
}

//PUTar till databasens
const putTodo = async (id) => {

    try {
        const index = todos.findIndex(todo => todo._id === id)
        const todoToUpdate = todos[index];

        // Toggle the "completed" property
        const updatedTodo = {
        ...todoToUpdate,
        completed: !todoToUpdate.completed
        };


    const res = await fetch('./api/todos/' + id, {
        method: 'PUT',
            body: JSON.stringify(updatedTodo),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
    })
    const data = await res.json()
    // console.log(data)
    todos[index] = data

    } catch(error) {
        console.log(error)
    }
}

//DELETEar mot databasens
const deleteTodo = async (id) => {

    //Om den inte är completed, ta inte bort
    const index = todos.findIndex(todo => todo._id === id)
    if(todos[index].completed === false) {
        const modalText = `You have to mark the task as completed before you can delete it!`
        modalHandler(modalText)
        return
    }

    try {
        const res = await fetch('./api/todos/' + id, {
            method: 'DELETE'        
            })
            if(res.ok) {
                const index = todos.findIndex(todo => todo._id === id)
                todos.splice(index, 1) 
                listTodos()
            }

    } catch(error) {
        console.log(error)
    }
}


//Skickar ny input till en POST, NÄR det är KLART, körs listtodos som gör HTML av den nya todoslista
addBtn.addEventListener('click', async (e) => {
    e.preventDefault();


    const todo = {
        title: input.value
    }

    //kör den här och väntar på att den blir klar innan vi kör listtodos, 
    // på det viset kommer todos att vara uppdaterad när vi skapar HTML innehållet.
    await postTodo(todo)
    listTodos()
    input.value = '';

})

//För att stänga modal
document.addEventListener('click', e => {
    
    if(e.target === document.querySelector('.modalWrapper') || e.target === document.querySelector('.modal button')){
        document.querySelector('.modalWrapper').classList.toggle('hidden');
    }
})










