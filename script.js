function getLocation()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            console.log("lat : " + lat + "long: " + long);
            
            //https://pastebin.com/TdQhhgTA

            const data = await getWeatherData(lat,long);
            renderWeatherData(data);

            var map = L.map('map').setView([20.9716, 80.5946], 5);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            let marker = L.marker([lat,long]).addTo(map);
            marker.bindPopup(data.name).openPopup();

            map.on('click',async function(e){
                console.log("Lat: " + e.latlng.lat + " Long: " + e.latlng.lng);

                const data = await getWeatherData(e.latlng.lat,e.latlng.lng);
                renderWeatherData(data);

            })


           /*  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ddfaba4398b491fa4ef3e29a5e934c6e`;
            //line 12 to 14, making an ajax call to the api that is sending us the data , asynchronous
            let response = await fetch(api);
            let data = await response.json();
            

            //fetch(url)
            //  .then(=>)
            //instead of going deeper and deeper
            // to make your code look like synchronous calls for synchronous requests
            
            */

            console.log(data);

        })
    }
}


getLocation();



async function getWeatherData(lat,long){
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ddfaba4398b491fa4ef3e29a5e934c6e`;
    //line 12 to 14, making an ajax call to the api that is sending us the data , asynchronous
    let response = await fetch(api);
    let data = await response.json();
    console.log(data);
    return data ;


}

function renderWeatherData(data){
    document.getElementById("name").innerHTML = data.name;
    document.getElementById("temp").innerHTML = data.main.temp;
    document.getElementById("temp_min").innerHTML = data.main.temp_min;
    document.getElementById("humidity").innerHTML = data.main.humidity;
    document.getElementById("pressure").innerHTML = data.main.pressure;
}






/*
    ecmascript is same,

    fetch method is used to make an ajax call that is asynchronous in nature to the api  :  when the call is happening , until then browser does some other operations 

    javascript is asynchronous in nature , identifies wht it has to do and delegates tasks to other respective things

    async function - async keyword
*/

