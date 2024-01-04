const div_error = document.querySelector("#error-message")

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

export {
    showMessage,
    hideMessage
}