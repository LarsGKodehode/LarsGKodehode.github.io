// -------------------------------------
//      VARIABLE AND NODE INITIALIZATION
// -------------------------------------

const todoInput = document.querySelector('input')
let allToDos = []
let totalTodos = 0

// -------------------------------------
//      CREATE OBJECT
// -------------------------------------


function makeToDoObj(id, text, date, li) {
    return {
        id,
        text,
        date,
        node: li
    }
}

// -------------------------------------
//      LOAD LOCALSTORAGE
// -------------------------------------

window.addEventListener('load', () => {
    const dataFromStorage = JSON.parse(localStorage.getItem('Todos'))
    console.log(dataFromStorage)

    dataFromStorage.forEach(liObj => {
        addToDo(liObj.text)
    })
})

// -------------------------------------
//      EVENT LISTENERS (keydown & click)
// -------------------------------------

document.querySelector('#todoSubmit').addEventListener('click', () => {
    addToDo(todoInput.value)
    todoInput.focus()
    todoInput.value = ""
})

document.querySelector('input').addEventListener('keyup', (e) => {
    if(e.code !== "Enter") return
    intializeobject()
    addToDo(todoInput.value)
    todoInput.value = ""
})

// -------------------------------------
//       ADD TODO FUNCTION
// -------------------------------------


function addToDo(text) {
    if(text.match(/^ *$/)) return
    
    // create li
    const li = createNewNode('li', document.querySelector('ul'), null, null)
    const date = new Date()

    
    const ourObj = makeToDoObj(totalTodos, text, date.toLocaleString(), li)
    totalTodos++
    allToDos.push(ourObj)

    localStorage.setItem('Todos', JSON.stringify(allToDos))
    console.log(allToDos)
    console.log(localStorage)
    
    li.id = ourObj.id
    
    
    
    // create todo text node
    const p = createNewNode('p', li, null, text)
    
    // create delete button and add functionality 
    const deleteButton = createNewNode('button', li, "delete-btn btn", 'delete')
    deleteButton.addEventListener('click', () => {
        allToDos.forEach((todo, i)=> {
            if(todo.id === parseInt(li.id)) {
                console.log('splice worked')    
                allToDos.splice(i, 1)
                localStorage.setItem('Todos', JSON.stringify(allToDos))
            }
        })
        li.remove()
        console.log(allToDos)
    })
}

// -------------------------------------
//          NEW NODE FUNCTION
// -------------------------------------

function createNewNode(nodeType, appendNodeTo, classes, text) {
    const ourNode = document.createElement(nodeType)
    appendNodeTo.append(ourNode)
    ourNode.setAttribute('class', classes)
    ourNode.textContent = text
    return ourNode
}

// -------------------------------------
//        DELETE ALL FUNCTIONALITY
// -------------------------------------

document.querySelector('#deleteAllBtn').addEventListener('click', ()=> {
    const allLiElements = document.querySelectorAll('li')
    allLiElements.forEach(li => li.remove())
    allToDos = []
})

// -------------------------------------
//         SORT FUNCTIONALITY
// -------------------------------------

let alphabetical = false 

document.querySelector('#sortBtn').addEventListener('click', () => {
    sortByNodeArray()
})

function sortTodos() {
    allToDos.sort((a, b) => a.localeCompare(b))
    
    alphabetical = !alphabetical
    alphabetical ? null : allToDos.sort((a, b) => b.localeCompare(a)) 
    
    // remove all li nodes
    const allLiElements = document.querySelectorAll('li')
    allLiElements.forEach(li => li.remove())   
    
    // rerender nodes from array
    allToDos.map(liString => addToDo(liString))
}

function sortByNodeArray() {
    let ourNodeArray = []
    
    document.querySelectorAll('li').forEach(li => ourNodeArray.push(li))

    ourNodeArray.sort((a, b) => a.textContent.localeCompare(b.textContent))

    alphabetical = !alphabetical
    alphabetical ? null : ourNodeArray.reverse()

    ourNodeArray.forEach(node => document.querySelector('ul').append(node))
}