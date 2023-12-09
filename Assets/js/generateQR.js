const main = (function(){
     //Variables
     const state = {
        qr_token: ""
    }
    const base_url = "http://127.0.0.1:5500"

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
        const id_docente = sessionStorage.getItem('id_docente')
        // const classes = await getClasses(id_docente)
        // renderClasses(classes)     
        renderClasses(test_cursos)
    }

    //Event Handlers
    select_class.addEventListener("change", (e)=>{
        e.preventDefault()
        const target = (e.target)
        const first_option = (target.firstElementChild)
        if((first_option).value == 'default'){
            target.remove(Number(Array.from(target.options).indexOf(first_option)))
        }
    })
    input_date.addEventListener("change", (e)=>{
        e.preventDefault()
        
        renderStartTime()
    })
    select_start_time.addEventListener("change", (e)=>{
        e.preventDefault()
        const target = (e.target)
        const first_option = (target.firstElementChild)
        if((first_option).value == 'default') {
            target.remove(Number(Array.from(target.options).indexOf(first_option)))
        }
        const options = Array.from(target.children)
        options.forEach(option=>{
            if((option).selected)
                renderFinishTime((option).value)
        })
    })

    form.addEventListener("submit", (e)=>{
        e.preventDefault()
        renderQr("token_test")
    })


    async function getClasses(payload){
        //consulta api para obtener cursos de docentes
    }

    function renderClasses(classes){
        classes.forEach((class_name) => {
            const option = document.createElement('option')
            option.value = class_name?.id
            option.innerHTML = class_name?.name
            select_class?.appendChild(option)
        });
    }
    function renderStartTime(){
        if (select_start_time.options.length > 1) return
        start_time.forEach((time) => {
            const option = document.createElement('option')
            option.value = start_time.indexOf(time)
            option.innerHTML = time
            select_start_time.appendChild(option)
        });
    }
    function renderFinishTime(start_index){
        select_finish_time.remove(Number((select_finish_time.firstElementChild).value))
        const option = document.createElement('option')
        option.value = finish_time[start_index]
        option.innerHTML = finish_time[start_index]
        select_finish_time.appendChild(option)
    }

    function renderQr(token){
        const div_qr = document.querySelector(".Qr")
        new QRCode(div_qr,`${base_url}/Login.html?token=${token}`)
    }

    return init()
})


main()