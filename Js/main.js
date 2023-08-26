const Button = document.querySelector("button[type='submit']")
const ListTask = JSON.parse(localStorage.getItem("Task")) || []

async function AddTask() {
    const Task = await document.querySelector("#Task").value
    if(!Task){
        alert("Preencha o campo")
    }
    else{
        ListTask.unshift({ text: Task })

        localStorage.setItem("Task", JSON.stringify(ListTask))
        RenderCard()
    }
}

function RenderCard() {
    const ContainerTask = document.querySelector("#Container-Task")
    const RanderTask = new Set()

    if (ListTask) {
        ContainerTask.innerHTML = ""; 
        
        ListTask.forEach(task => {

            if (!RanderTask.has(task.text)) {

                const Card = document.createElement("div")
                Card.classList.add("Card-Task")
                Card.innerHTML = `
                <div class="Task">
                <h2>${task.text} </h2>
                </div>
                <div class="Btn-Task">
                
                <button class="Btn-edit" >Editar</button>
                <button class="Btn-delete" >delete</button>
                
                </div>
                `
                return ContainerTask.appendChild(Card)
            }
        })
    }

}

Button.addEventListener("click", (e) => {
    e.preventDefault()
    AddTask()
})

RenderCard()






