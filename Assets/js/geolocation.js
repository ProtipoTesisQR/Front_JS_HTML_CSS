export default function getLocation(state){
    navigator.geolocation.getCurrentPosition(position=>{
        state.latitude = position.coords.latitude
        state.longitude = position.coords.longitude
    })
}