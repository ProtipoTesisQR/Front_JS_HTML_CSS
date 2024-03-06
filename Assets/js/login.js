import getLocation from "./geolocation.js"
import {validateUser} from "./ApiCalls.js"
import {hideMessage, showMessage} from "./generalFunctions.js"

const main = (function(){
    //Variables
    const state = {
        qr_scanned: false,
        qr_token: null,
        is_docente: false,
        valid_geolocation: false,
        latitude : "-33.45385760740594",
        longitude : "-70.66269158056573"
    }

    //Dom variables
    const form = document.querySelector("#stripe-login")
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
        // getLocation(state)
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
        
        // getLocation(state)
        setDefaultLocation()
        const payload = createPayload(email, password, state.qr_token, state.latitude, state.longitude)
        
        const result = await validateUser(payload)

        if(validateResponse(result, 'token')){
            showMessage("Por favor escanee el QR para registrar asistencia", "error")
            return
        }
        else if(validateResponse(result, 'geo')){
            showMessage("No es posible registrar la asistencia. Ubicacion fuera del rango definido", "error")
            return
        }
        else if(validateResponse(result, 'user')){
            showMessage("El usuario ingresado no existe, por favor valide sus credenciales", "error")
            return
        }
        else if(validateResponse(result, 'alumno')){
            clearLocaleStorage()
            clearState()
            showSuccessMessage()
            setTimeout(hideSuccessMessage, 3000)
        }
        else if(validateResponse(result, 'docente')){
            window.sessionStorage.setItem("id_docente",result.idDocente)
            window.window.location.assign(`${window.location.origin}${window.location.pathname}/generateQR.html`)
        }

    })
    
    close_modal.addEventListener("click", hideSuccessMessage)
    close_modal_btn.addEventListener("click", hideSuccessMessage)

    //functions
    function validateResponse(result, opc){

        switch (opc) {
            case 'token':
                if(result.hasOwnProperty("validToken") && !Boolean(result.validToken) &&  result.hasOwnProperty("idDocente") && result.idDocente === null) return true
                return false
            case 'geo':
                if(result.hasOwnProperty("validGeolocation") && !Boolean(result.validGeolocation)&&  result.hasOwnProperty("idDocente") && result.idDocente === null) return true
                return false
            case 'user':
                if(result.hasOwnProperty("validUser") && !Boolean(result.validUser)) return true
                return false
            case 'alumno':
                if(result.hasOwnProperty("validUser") && Boolean(result.validUser) && (!result.hasOwnProperty("idDocente") || result.hasOwnProperty("idDocente") && result.idDocente === null)) return true
                return false
            case 'docente':
                if(result.hasOwnProperty("validToken") && !Boolean(result.validToken) &&  result.hasOwnProperty("idDocente") && result.idDocente !== null && result.hasOwnProperty("validUser") && Boolean(result.validUser)) return true
                return false
        }

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

    function createPayload(email, password, token, lat, long){
        return {
            "email": `${email}`,
            "password":`${password}`,
            "token":`${token}`,
            "latitude":`${lat}`,
            "longitude":`${long}`
        }
    }

    function setDefaultLocation(){
        state.latitude = "-33.45385760740594",
        state.longitude = "-70.66269158056573"
    }
    return init()
})


main()