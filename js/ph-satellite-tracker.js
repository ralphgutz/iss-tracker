const diwata = document.getElementById("diwata")
const maya = document.getElementById("maya")

let satname = document.getElementById("satname")

let first = true
let onload = true

const phsat_map = L.map("map").setView([0, 0], 1)

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
L.tileLayer(tileUrl, {attribution}).addTo(phsat_map)

const marker = L.marker([0,0]).addTo(phsat_map)

if(onload){
    var satcat = "43678"
    onload = false
    marker.bindPopup("<b>DIWATA-2B</b>").openPopup()
    diwata.classList.add("hover")
    satname.textContent = "DIWATA 2B (PO-101)"
    document.getElementById("satid").textContent = satcat
}

diwata.onclick = function(){
    diwata.classList.add("hover")
    maya.classList.remove("hover")
    marker.bindPopup("<b>DIWATA-2B</b>").openPopup()
    satcat = "43678"
    sat = 0
    satname.textContent = "DIWATA 2B (PO-101)"
    document.getElementById("satid").textContent = satcat
}

maya.onclick = function(){
    maya.classList.add("hover")
    diwata.classList.remove("hover")
    marker.bindPopup("<b>MAYA-1</b>").openPopup()
    satcat = "43590"
    sat = 1
    satname.textContent = "BIRD-PH (MAYA-1)"
    document.getElementById("satid").textContent = satcat
}

async function get_position(){
    const request = await fetch(`https://www.n2yo.com/rest/v1/satellite/positions/${satcat}/14.5243/121.0792/0/1/&apiKey=U98VRQ-ZEGYY6-KC5477-4G9R`)
    const data = await request.json()
    const latitude = data.positions[0].satlatitude
    const longitude = data.positions[0].satlongitude

    console.log(latitude, longitude)

    marker.setLatLng([latitude, longitude])

    if(first){
        phsat_map.setView([latitude, longitude], 4)
        first = false
    }

    const circle = L.circle([latitude, longitude], {
        color: '#38adf1',
        fillColor: '#38adf1',
        fillOpacity: 0.5,
        radius: 200
    }).addTo(phsat_map)

    document.getElementById("lat").textContent = latitude
    document.getElementById("lon").textContent = longitude
    document.getElementById("alt").textContent = data.positions[0].sataltitude

    const center = document.getElementById("center")

    if(center.checked == true){
        
        phsat_map.setView([latitude, longitude], 3)
    }
}

const interval = setInterval(get_position, 4000)

function pauseFunc(){
    const pause = document.getElementById("pause")
    if(pause.checked == true){
        clearInterval(interval)
    }
    else{
        setInterval(get_position, 4000)
    }
}

