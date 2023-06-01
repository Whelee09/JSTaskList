const addButton = document.getElementById("addTask");
const allButton = document.getElementById("All");
const activeButton = document.getElementById("Active");
const completedButton = document.getElementById("Completed");
const containerLI = document.getElementById("containerLI");
const parrafo = document.createElement("p");

var remainingTask = 0;
var estado = 1;

addButton.addEventListener("click", addTask);
allButton.addEventListener("click", showAll);
activeButton.addEventListener("click", showActive);
completedButton.addEventListener("click", showCompleted);

addButton.classList.add("addButtonClass");

function addTask(){
    console.log("funciona addtask");
    renderTask(0);

    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const textoEditButton = document.createTextNode("Edit");
    const textoDeleteButton = document.createTextNode("Delete");
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const inputText = document.getElementById('texto').value;
    const textoLabel = document.createTextNode(inputText);


    checkbox.type = "checkbox";
    //la verdad esto del valor del checkbox ni idea
    checkbox.value = "valorDelCheckbox";
    checkbox.id = 'miCheckbox';

    checkbox.addEventListener("click",render);


    label.htmlFor = 'miCheckbox';
    label.appendChild(textoLabel);

    editButton.appendChild(textoEditButton);
    deleteButton.appendChild(textoDeleteButton);

    //le doy clase para que cada boton que se crea teng los mismo estilos 
    editButton.className = "editButtonClass";
    deleteButton.classList.add("deleteButtonClass");

    //antes de agregarlos al html le vamos a poner eventos escuchadores a los botones
    editButton.addEventListener("click", editTask);
    deleteButton.addEventListener("click", deleteTask);

    li.append(checkbox,label,editButton,deleteButton)
    ul.appendChild(li);

}
function renderTask(num){
    if(num == 0){
        remainingTask++;
    }
    else{
        remainingTask--;
    }
    parrafo.textContent = `tareas restantes ${remainingTask}`;
    containerLI.appendChild(parrafo);
}
function render(){
    const li = this.parentElement;
  const soyELInputCheckbox = li.querySelector("input").checked;

  if (soyELInputCheckbox && (estado == 1 || estado == 2)) {
    renderTask(1);
  } else if (soyELInputCheckbox && estado == 3) {
    renderTask(1);
  } else {
    renderTask(0);
  }

  for (const lista of document.querySelectorAll("li")) {
    const soyELInputCheckbox = lista.querySelector("input").checked;
    if (estado == 1) {
      lista.classList.remove("dontShow");
    } else if (estado == 2) {
      if (soyELInputCheckbox) {
        lista.classList.add("dontShow");
      } else {
        lista.classList.remove("dontShow");
      }
    } else if (estado == 3) {
      if (!soyELInputCheckbox) {
        lista.classList.add("dontShow");
      } else {
        lista.classList.remove("dontShow");
      }
    }
  }

    // switch (estado) {
    //     case 1:
    //         showAll();
    //         break;
    //     case 2:
    //         showActive();
    //        // remainingTask++;
    //         break;
    //     case 3:
    //         showCompleted();
    //        // remainingTask--;
    //         break;
    //     default:
    //         break;
    // }

    // const li = this.parentElement;
        
    // const soyELInputCheckbox = li.querySelector("input").checked;

    // if(soyELInputCheckbox && (estado==1||estado==2)){
    //     renderTask(1);
    //     console.log("HI bro");
    // }
    
    // console.log("HII");
    // for (const lista of document.querySelectorAll('li')) {
    //     const soyELInputCheckbox = lista.querySelector("input").checked;
    //     if(soyELInputCheckbox){
    //         lista.classList.add('dontShow');
    //     }
    //     else{
    //         lista.classList.remove('dontShow');
    //     }
    // }
}
function showAll(){

    estado = 1;

    for (const lista of document.querySelectorAll('li')) {
        lista.classList.remove('dontShow');
    }
}
function showActive(){   
    estado = 2;

    for (const lista of document.querySelectorAll('li')) {
        const soyELInputCheckbox = lista.querySelector("input").checked;
        if(soyELInputCheckbox){
            lista.classList.add('dontShow');
        }
        else{
            lista.classList.remove('dontShow');
        }
    }
}
function showCompleted(){
    estado = 3;

    for (const lista of document.querySelectorAll('li')) {
        
        const soyELInputCheckbox = lista.querySelector("input").checked;
        if(!soyELInputCheckbox){
            lista.classList.add('dontShow');
        }
        else{
            lista.classList.remove('dontShow');
        }
    }
}

function editTask(){
    const li = this.parentElement;

    const label = li.querySelector("label");
    const input = document.createElement("input");
    const saveButton = document.createElement("button"); 
    const saveButtonText = document.createTextNode("Guardar");
    input.type = "text";
    input.value = label.innerText;
    saveButton.appendChild(saveButtonText); 
    li.replaceChild(input, label);
    li.appendChild(saveButton); 
    input.focus();

    saveButton.addEventListener("click", function() { 
    const newLabel = document.createTextNode(input.value); 
    li.replaceChild(newLabel, input); 
    li.removeChild(saveButton); 
  });
}
function deleteTask(){
    console.log("funciona deleteTask");
    renderTask(1);
    const li = this.parentElement;
    li.remove();
}
