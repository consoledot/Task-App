let todos =[]
const inputValue = document.querySelector("#input-value")
const form = document.getElementsByTagName("form")[0]
const CurrentTodoList = document.querySelector(".todos ul")
const CompletedTodoList = document.querySelector(".completed ul")
const Tasks = [...document.querySelectorAll('ul')]
let numberOfCompleted = document.getElementById("number")

const addTodoToUI =(value, element)=>{
    if(value === "") throw new Error("PLeas type something")
    let nodeValue = document.createElement("li")
    nodeValue.innerHTML = `<span><i class="fa fa-square-o"></i> <p>${value}</p></span><i class="fa fa-trash"></i>`
    element.insertBefore(nodeValue, element.childNodes[0])
}
const addTodoToArray =(value, array)=>{
    if(value.trim() == "") throw new Error("PLeas type something")
    array.push({
        value, 
        completed:false
    })
    localStorage.setItem("todos", JSON.stringify(array))
}

const toggleCompleted = (e, array, currentNode, nextNode, numOfCompleted)=>{
    const item = e.path[0]
    const itemClassArray = [...item.classList]
    if(itemClassArray.includes("fa-square-o") || itemClassArray.includes("fa-check-square-o")){
         const text = e.path[2].textContent.trim()
         const index = array.findIndex(todo => todo.value === text)
             array[index].completed = !array[index].completed
             currentNode.removeChild(e.path[2])
             nextNode.appendChild(e.path[2])
             const iconPath = e.path[2].childNodes[0].firstChild.classList
             if(array[index].completed){
                iconPath.remove("fa-square-o")
                iconPath.add("fa-check-square-o")
             }else{
                iconPath.add("fa-square-o")
                iconPath.remove("fa-check-square-o")
             } 
             getNumberOfCompleted(numOfCompleted, array)
             localStorage.setItem("todos", JSON.stringify(array))
    }
}
const getNumberOfCompleted = (displayNum, array)=>{
    let number = array.filter(todo => {
        if(todo.completed) return todo
    }).length
    displayNum.textContent = number
}

const deleteTodo = (e, array, Node, numOfCompleted)=>{
    const item = e.path[0]
        if([...item.classList].includes("fa-trash")){
                Node.removeChild(e.path[1])
                const text = e.path[1].textContent.trim()
                const index = array.findIndex(todo => todo.value === text)
                array.splice(index, 1)
                getNumberOfCompleted(numOfCompleted, array)
                localStorage.setItem("todos", JSON.stringify(array))
            } 
             
}
form.addEventListener("submit", e=>{
    e.preventDefault()
    const todo = inputValue.value.trim()
    addTodoToArray(todo, todos)
    addTodoToUI(todo, CurrentTodoList)
    inputValue.value = ""
})
CurrentTodoList.addEventListener("click", (e)=>{
        deleteTodo(e, todos, CurrentTodoList, CompletedTodoList, numberOfCompleted)
        toggleCompleted(e, todos, CurrentTodoList, CompletedTodoList, numberOfCompleted)
})
CompletedTodoList.addEventListener("click", e=>{
    deleteTodo(e,todos, CompletedTodoList, numberOfCompleted)
    toggleCompleted(e, todos, CompletedTodoList, CurrentTodoList, numberOfCompleted)
})

document.addEventListener("DOMContentLoaded", ()=>{
    todos = JSON.parse(localStorage.getItem("todos"))
    numberOfCompleted.textContent = todos.filter(todo => {
        if(todo.completed) return todo
    }).length

    todos.filter(todo=>{
        if(!todo.completed){
            let nodeValue = document.createElement('li')
            nodeValue.innerHTML = `<span><i class="fa fa-square-o"></i> <p>${todo.value}</p></span><i class="fa fa-trash"></i>`
            CurrentTodoList.insertBefore(nodeValue, CurrentTodoList.childNodes[0])
        }else{
            let nodeValue = document.createElement('li')
            nodeValue.innerHTML = `<span><i class="fa fa-check-square-o"></i> <p>${todo.value}</p></span><i class="fa fa-trash"></i>`
            CompletedTodoList.insertBefore(nodeValue, CompletedTodoList.childNodes[0])
        }
    })
})