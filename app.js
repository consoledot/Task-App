const todos =[]
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
    array.push({
        value, 
        completed:false
    })
}

const toggleCompleted = (e, array, currentNode, nextNode)=>{
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
             getNumberOfCompleted(numberOfCompleted, todos) 
    }
}
const getNumberOfCompleted = (displayNum, array)=>{
    let number = array.filter(todo => {
        if(todo.completed) return todo
    }).length
    displayNum.textContent = number
}

const deleteTodo = (e, array, Node)=>{
    const item = e.path[0]
        if([...item.classList].includes("fa-trash")){
                Node.removeChild(e.path[1])
                const text = e.path[1].textContent.trim()
                const index = array.findIndex(todo => todo.value === text)
                array.splice(index, 1)
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
        deleteTodo(e, todos, CurrentTodoList, CompletedTodoList)
        toggleCompleted(e, todos, CurrentTodoList, CompletedTodoList)
})
CompletedTodoList.addEventListener("click", e=>{
    deleteTodo(e,todos, CompletedTodoList, CurrentTodoList)
    toggleCompleted(e, todos, CompletedTodoList, CurrentTodoList)
})