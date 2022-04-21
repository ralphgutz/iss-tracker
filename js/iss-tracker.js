const iss_map = L.map("iss-map").setView([0, 0], 1)

let first = true


const aicon = L.icon({
    iconUrl: 'img/International_Space_Station.png',
    iconSize: [64, 32],
    iconAnchor: [32, 16],
})

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
L.tileLayer(tileUrl, {attribution}).addTo(iss_map)

const marker = L.marker([0,0], {icon: aicon}).addTo(iss_map)

marker.bindPopup("<b>International Space Station (ISS)</b>").openPopup()



async function getISS(){
    iss_api = "https://api.wheretheiss.at/v1/satellites/25544"
    const request = await fetch(iss_api)
    const data = await request.json()
    const {latitude, longitude} = data

    if(first){
        iss_map.setView([latitude, longitude], 3)
        first = false
    }

    marker.setLatLng([latitude, longitude])

    const circle = L.circle([latitude, longitude], {
        color: '#38adf1',
        fillColor: '#38adf1',
        fillOpacity: 0.5,
        radius: 200
    }).addTo(iss_map)

    document.getElementById("lat").textContent = latitude.toFixed(4)
    document.getElementById("lon").textContent = longitude.toFixed(4)
    document.getElementById("alt").textContent = data.altitude.toFixed(4)
    document.getElementById("vel").textContent = data.velocity.toFixed(4)
    
    console.log(latitude, longitude)

    const center = document.getElementById("center")


        if(center.checked == true){
            
            iss_map.setView([latitude, longitude], 3)
        }
        
}


const interval = setInterval(getISS, 2000)
  

function pauseFunc(){
    const pause = document.getElementById("pause")
    if(pause.checked == true){
        clearInterval(interval)
    }
    else{
        setInterval(getISS, 1500)
    }
}

