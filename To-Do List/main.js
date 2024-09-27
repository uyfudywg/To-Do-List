const add_input = document.querySelector('.add-input');
const add_btn = document.querySelector('.btn-add');
const todoItemsList = document.querySelector('.todo-items');
const filterButtons = document.querySelectorAll('.filter-button');


let containertask;
let currentFilter = 'all'; 


if (localStorage.getItem('datastor') != null) {
    containertask = JSON.parse(localStorage.getItem('datastor'));
    displayList(); 
} else {
    containertask = [];
}

function addlist(){
    if(add_btn.innerHTML=="Add"){
        addTodo()
    }
    else{
      etidData()
    }
}

function addTodo() {
    if (add_input.value !== '') {
        const todo = {
            // id: Date.now(),
            name: add_input.value,
            completed: false
        };
        containertask.push(todo);
        localStorage.setItem('datastor', JSON.stringify( containertask)); 
        add_input.value = ''; 
        displayList(); 
    }
}


function displayList() {
    let data = '';
    let filteredTodos =  containertask; 
     
    if (currentFilter === 'remaining') {
        filteredTodos =  containertask.filter(todo => !todo.completed);
        console.log(filteredTodos)
    } else if (currentFilter === 'completed') {
        filteredTodos =  containertask.filter(todo => todo.completed);
        console.log(filteredTodos)
    }

    for (let i = 0; i < filteredTodos.length; i++) {
    data += `
     <li class="item ${filteredTodos[i].completed ? 'checked' : ''}">
     <input type="checkbox" class="checkbox" ${filteredTodos[i].completed ? 'checked' : ''}  onchange="el(${[i]})">
     ${filteredTodos[i].name}
     <div class=" mrt">
     <button class="updata-button" onclick="setdata(${i})"> <i class="fa-solid fa-pen-to-square"></i></button>
     <button class="delete-button" onclick="del(${[i]})"><i class="fa fa-trash" aria-hidden="true"></i></button>
     </div>
     </li>
    `;
    }
    todoItemsList.innerHTML = data; 
}

 
function el(i){
    containertask[i].completed = ! containertask[i].completed;
    localStorage.setItem('datastor', JSON.stringify( containertask));
    displayList();  
}

function del(index){
    containertask.splice(index,1)
    localStorage.setItem('datastor',JSON.stringify( containertask));
  displayList()
}

let currentIndex;
function setdata(index){
   currentIndex = index;
   add_input.value= containertask[index].name;
   add_btn.innerHTML="Update";
}

function etidData(){
    containertask[currentIndex].name=add_input.value
    add_btn.innerHTML="Add"
    localStorage.setItem('datastor', JSON.stringify( containertask));
    add_input.value =''
    displayList();
}

document.addEventListener('DOMContentLoaded', function() {
    // Set the first button as active on page load
    filterButtons[0].classList.add('active');
    displayList();
});

// Filter and active on buttons ()
for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('click', function() {
        currentFilter = this.id;
    for (let j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove('active');
    }
    this.classList.add('active');
     displayList();
    });
}


document.addEventListener('DOMContentLoaded', function() {
    // Set the first button as active on page load
    filterButtons[0].classList.add('active');
    displayList();

});


