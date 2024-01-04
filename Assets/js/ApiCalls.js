const base_url = "http://back-qr-tesis.us-east-2.elasticbeanstalk.com"

async function getClasses(docente_id){
    try {
        const response = await fetch(`${base_url}/crearQr/obtener-cursos?id_docente=${docente_id}`)
        const {cursos} = await response.json()
        return cursos
    } catch (error) {
        console.log(error);
        return error
    }
}

async function createQR(payload){
    try{
        console.log(payload);
        const response = await fetch(`${base_url}/crearQr/crear-qr`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(payload)
        })
        return await response.json()
    }
    catch (error) {
        console.log(error);
        return error
    }
}

async function validateUser(payload){
    try {
        const response = await fetch(`${base_url}/users/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(payload)
        })
        return await response.json()
    } 
    catch (error) {
        console.log(error);
        return error
    }
}


export {
    validateUser,
    getClasses,
    createQR
}