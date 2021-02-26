// https://www.youtube.com/watch?v=wPElVpR1rwA
// https://www.youtube.com/watch?v=GXrDEA3SIOQ
// 

window.addEventListener('load', () => {
    let long, lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // const proxy = 'https://cors-anywhere.herokuapp.com/';
            // const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            // const api = `https://community-open-weather-map.p.rapidapi.com/weather?q=London%2Cuk&lat=$${lat}&lon=${long}&callback=test&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html`;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ba2d27f85becc8f2110af87ed014c4ce`;

            /*
            fetch(api, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "f16378c236msh05ec3ac5c19c766p18a102jsn0384c7a71463",
                    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
                }
            })
            */
            fetch(api)
            .then(response => {
                console.log(response);
            })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.error(err);
            });
        });
    }
    else {
        h1.textContent = "Please allow Location Tracking";
    }
});