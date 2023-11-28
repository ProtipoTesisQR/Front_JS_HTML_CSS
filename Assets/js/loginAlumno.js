import getLocation from "./geolocation.js"

const main = (function(){
    //Variables
    const state = {
        qr_scanned: false,
        qr_token: ""
    }
    const base_url = ""

    //Dom variables
    const form = document.querySelector("#stripe-login")
    const div_error = document.querySelector("#error-message")
    //Init
    function init(){
        getLocation(state)
        console.log(state);
        if(window.location.search.includes("token")){
            window.localStorage.setItem("qr_token", window.location.search.split("token=")[1])
            window.location.assign(`${window.location.origin}${window.location.pathname}`)
        }
        if(Boolean(window.localStorage.getItem("qr_token"))){
            state.qr_scanned = true
            state.qr_token = localStorage.getItem("qr_token")
        }
    }
    
    //Events
    form.addEventListener("submit", (event)=>{
        event.preventDefault()
        
        if(state.qr_scanned === false){
            showCredentialErrorMessage("Por favor escanee el QR para registrar asistencia", "error")
            console.log("hola");
            return
        }
        else{
            hideCredentialErrorMessage("error")
        }

        const email = form.querySelector("input[type='email']").value
        const password = form.querySelector("input[type='password']").value
        
        if(email.trim().length === 0 && password.trim().length === 0){
            showCredentialErrorMessage("Ingrese un correo electrónico y una contraseña", "warning")
        }
        else if(email.trim().length === 0){
            showCredentialErrorMessage("Ingrese un correo electrónico", "warning")
        }
        else if(password.trim().length === 0){
            showCredentialErrorMessage("Ingrese una contraseña", "warning")
        }
        else{
            hideCredentialErrorMessage("warning")
        }
    })

    //functions
    function showCredentialErrorMessage(message, error_type){
        const error_message_html = `<b>${message}</b>`

        div_error.innerHTML = error_message_html
        div_error.classList.add(`${error_type}`)
        div_error.classList.remove("hidden")
    }
    function hideCredentialErrorMessage(error_type){
        div_error.innerHTML = ""
        div_error.classList.remove(`${error_type}`)
        div_error.classList.add("hidden")
    }

    return init()
})


main()