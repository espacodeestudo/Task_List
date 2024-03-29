const Button = document.querySelector("button[type='submit']")
const ButtonSave = document.querySelector("#Save")
const ContainerTask = document.querySelector("#Container-Task")
let ListTask =  []

try {
    const storedData = localStorage.getItem("Task");
    if (storedData) {
        ListTask = JSON.parse(storedData);
    }
} catch (error) {
    console.error("Error parsing stored data:", error);
}

function RenderCard() {
    
    const RanderTask = new Set()

    if (ListTask) {
        ContainerTask.innerHTML = ""; 

        if(ListTask.length !==0) ContainerTask.style.display="flex";
        
        
        ListTask.forEach(task => {

            if (!RanderTask.has(task.text)) {

                const Card = document.createElement("div")
                Card.classList.add("Card-Task")
                Card.innerHTML = `
                <div class="Task">
                <h2>${task.text} </h2>
                </div>
                <div class="Btn-Task">
                
                <button class="Btn-edit" onclick="Edit('${task.text}')"><i class='bx bxs-edit' ></i></button>
                <button class="Btn-delete" onclick="Remove('${task.text}')"><i class='bx bxs-trash-alt' ></i></button>
                
                </div>
                `
                return ContainerTask.appendChild(Card)
            }
        })
    }

}


 function AddTask() {
    const Task =  document.querySelector("#Task")
    const value = Task.value
    if(!value){
        alert("Preencha o campo")
    }
    else{
        ListTask.unshift({ text: value })
        Task.value = ""
        localStorage.setItem("Task", JSON.stringify(ListTask))
        RenderCard()
       
    }
}



function Remove(task) {
    
    const NewListTask = ListTask.filter(item => item.text !== task);
    localStorage.setItem("Task", JSON.stringify(NewListTask));
    ListTask = NewListTask

    if(ListTask.length ==0) ContainerTask.style.display="none";
    RenderCard()
}

function Edit (task){
    document.querySelector("#Task2").value = task
    document.querySelector(".Container2").className= "Container2-Active"
    ButtonSave.onclick = () => updateList(task); 
}



function updateList(task){
    const NewValue = document.querySelector("#Task2").value.trim()

    if (NewValue) {
    const NewListTask = ListTask.map(item =>{

        if(item.text === task){
            item.text = NewValue 
        }
        return item
    })
    
     ListTask = NewListTask
     localStorage.setItem("Task", JSON.stringify(ListTask))
     RenderCard()
    }
   
}

Button.addEventListener("click", (e) => {
    e.preventDefault()
    
    
    AddTask()
})

ButtonSave.addEventListener("click", (e) =>{
    e.preventDefault()
     document.querySelector(".Container2-Active").className= "Container2"
     
})
RenderCard()






