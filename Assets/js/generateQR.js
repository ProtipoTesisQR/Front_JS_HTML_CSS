const main = (function(){
     //Variables
     const state = {
        qr_token: ""
    }
    const base_url = ""

    const start_time = [
        "18:50",
        "20:15",
        "21:40"
    ]
    const finish_time = [
        "20:10",
        "21:35",
        "23:00"
    ]

    const test_cursos = [
        {name:"Base de datos", id:0},
        {name:"Programación I", id: 1},
        {name:"Programacion II", id: 2},
        {name:"Sistemas Operativos", id: 3},
        {name:"Redes", id: 4}
    ]
    //Dom variables
    const form = document.querySelector("#stripe-login")
    const select_class = document.getElementsByName("class")[0]
    const select_start_time = document.getElementsByName("start_time")[0]
    const select_finish_time = document.getElementsByName("finish_time")[0]
    const input_date = document.getElementsByName("date")[0]

    //Init
    function init(){
        input_date.value = ''
        const session_email = sessionStorage.getItem('email')
        const session_password = sessionStorage.getItem('password')
        // const classes = await getClasses({session_email, session_password})
        // renderClasses(classes)
        renderClasses(test_cursos)
    }

    //Event Handlers
    select_class.addEventListener("change", (e)=>{
        e.preventDefault()
        if((e.target.firstElementChild.value == 'default')) e.target.remove("default")
    })
    input_date.addEventListener("change", (e)=>{
        e.preventDefault()
        
        renderStartTime()
    })
    select_start_time.addEventListener("change", (e)=>{
        e.preventDefault()
        if((e.target.firstElementChild.value == 'default')) e.target.remove("default")
        const options = Array.from(e.target.children)
        options.forEach(option=>{
            if(option.selected)
                renderFinishTime(option.value)
        })
    })



    async function getClasses(payload){
        //consulta api para obtener cursos de docentes
    }

    function renderClasses(classes){
        classes.forEach((class_name) => {
            const option = document.createElement('option')
            option.value = class_name.id
            option.innerHTML = class_name.name
            select_class.appendChild(option)
        });
    }
    function renderStartTime(){
        start_time.forEach((time) => {
            const option = document.createElement('option')
            option.value = start_time.indexOf(time)
            option.innerHTML = time
            select_start_time.appendChild(option)
        });
    }
    function renderFinishTime(start_index){
        select_finish_time.remove(select_finish_time.firstElementChild.value)
        const option = document.createElement('option')
        option.value = finish_time[start_index]
        option.innerHTML = finish_time[start_index]
        select_finish_time.appendChild(option)
    }

    return init()
})


main()