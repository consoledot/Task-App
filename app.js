const todos =[]
const inputValue = document.querySelector("#input-value")
const form = document.getElementsByTagName("form")[0]
const CurrentTodoList = document.querySelector(".todos ul")
const CompletedTodoList = document.querySelector(".completed ul")
const currentTodos = [...document.querySelectorAll('.todos ul li')]

const addTodoToUI =(value, element)=>{
    if(value === "") throw new Error("PLeas type something")
    let nodeValue = document.createElement("li")
    nodeValue.innerHTML = `${value}<i class="fa fa-trash"></i>`
    element.insertBefore(nodeValue, element.childNodes[0])
}
const addTodoToArray =(value, array)=>{
    array.push({
        value, 
        completed:false
    })
}

form.addEventListener("submit", e=>{
    e.preventDefault()
    const todo = inputValue.value.trim()
    addTodoToArray(todo, todos)
    addTodoToUI(todo, CurrentTodoList)
    inputValue.value = ""
})

const deleteTodo = (e, array)=>{
    if(e.srcElement.localName == "i"){
        CurrentTodoList.removeChild(e.path[1])
        const text = e.path[1].textContent
        const index = array.findIndex(todo => todo.value === text)
        array.splice(index, 1)
    }
}

CurrentTodoList.addEventListener("click", (e)=> deleteTodo(e, todos))
