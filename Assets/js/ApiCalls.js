const base_url = ""

async function validateUser(payload){
    try{
        const response = await fetch(base_url, {
            method: 'POST',
            body: JSON.stringify(payload)
        })
        return response.json()
    }
    catch(ex){

    }
}



export {
    validateUser
}