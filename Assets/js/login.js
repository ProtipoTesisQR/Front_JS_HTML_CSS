import getLocation from "./geolocation.js"
import {validateUser} from "./ApiCalls.js"

const main = (function(){
    //Variables
    const state = {
        qr_scanned: false,
        qr_token: "",
        is_docente: false,
        valid_geolocation: false,
        latitude : "",
        longitude : ""
    }

    //Dom variables
    const form = document.querySelector("#stripe-login")
    const div_error = document.querySelector("#error-message")
    const close_modal = document.getElementsByClassName("close")[0]
    const close_modal_btn = document.querySelector(".confirm")
    const success_message = document.querySelector(".modal")
    //Init
    function init(){
        clearState()
        if(window.location.search.includes("token")){
            window.localStorage.setItem("qr_token", window.location.search.split("token=")[1])
            window.location.assign(`${window.location.origin}${window.location.pathname}`)
        }
        if(Boolean(window.localStorage.getItem("qr_token"))){
            state.qr_scanned = true
            state.qr_token = String(localStorage.getItem("qr_token"))
        }
        getLocation(state)
        validateGeolocation()
    }
    
    //Events
    form.addEventListener("submit", async (event)=>{
        event.preventDefault()
        
        const email = (form.querySelector("input[type='email']")).value
        const password = (form.querySelector("input[type='password']")).value
        
        if(email.trim().length === 0 && password.trim().length === 0){
            showMessage("Ingrese un correo electrónico y una contraseña", "warning")
            return
        }
        else if(email.trim().length === 0){
            showMessage("Ingrese un correo electrónico", "warning")
            return
        }
        else if(password.trim().length === 0){
            showMessage("Ingrese una contraseña", "warning")
            return
        }
        else{
            hideMessage("warning")
        }

        /*
        const result = await validateUser({email, password})

        if(result.hasOwnProperty("validToken") && !Boolean(result.validToken)){
            showMessage("Por favor escanee el QR para registrar asistencia", "error")
            return
        }
        else if(result.hasOwnProperty("validGeolocation") && !Boolean(result.validGeolocation)){
            showMessage("No es posible registrar la asistencia. Ubicacion fuera del rango definido", "error")
            return
        }
        else if(result.hasOwnProperty("validUser") && !Boolean(result.validUser)){
            showMessage("El usuario ingresado no existe, por favor valide sus credenciales", "error")
            return
        }
        else if(result.hasOwnProperty("validUser") && Boolean(result.validUser) && !result.hasOwnProperty("idDocente")){
            //Levantar aviso de asistencia registrada
            localStorage.remove(qr_token)
        }
        else if(result.hasOwnProperty("validUser") && Boolean(result.validUser) && result.hasOwnProperty("idDocente")){
            window.sessionStorage.setItem("id_docente",result.idDocente)
            window.window.location.assign(`${window.location.origin}generateQR.html`)
        }*/

        clearLocaleStorage()
        showSuccessMessage()
        setTimeout(hideSuccessMessage, 3000)
    })
    
    close_modal.addEventListener("click", hideSuccessMessage)
    close_modal_btn.addEventListener("click", hideSuccessMessage)

    //functions
    function showMessage(message, error_type){
        const error_message_html = `<b>${message}</b>`

        div_error.innerHTML = error_message_html
        div_error.classList.add(`${error_type}`)
        div_error.classList.remove("hidden")
    }
    function hideMessage(error_type){
        div_error.innerHTML = ""
        div_error.classList.remove(`${error_type}`)
        div_error.classList.add("hidden")
    }

    function showSuccessMessage(){
        success_message.classList.remove("modal-closed")
    }
    function hideSuccessMessage(){
        success_message.classList.add("modal-closed")
    }

    function clearState(){
        state.qr_scanned = false
        state.qr_token = ""
        state.is_docente = false
        state.latitude = ""
        state.longitude = ""
        state.valid_geolocation = false
    }

    function clearLocaleStorage(){
        localStorage.removeItem("qr_token")
    }

    function validateGeolocation(){

    }

    return init()
})


main()