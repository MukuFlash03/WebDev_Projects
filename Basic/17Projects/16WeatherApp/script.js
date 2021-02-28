// https://www.youtube.com/watch?v=wPElVpR1rwA
// https://www.youtube.com/watch?v=GXrDEA3SIOQ
// https://codeburst.io/build-a-weather-website-in-30-minutes-with-node-js-express-openweather-a317f904897b
// https://openweathermap.org/weather-conditions#Icon-list

window.addEventListener('load', () => {
    let long, lat;
    let tempDesc = document.querySelector('.temperature-description');
    let tempDeg = document.querySelector('.temperature-degree');
    let locTime = document.querySelector('.location-timezone');
    let weatherIcon = document.querySelector(".weather-icon");
    let tempSec = document.querySelector(".degree-section");
    let tempSecSpan = document.querySelector(".degree-section span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&&units=metric&appid=ba2d27f85becc8f2110af87ed014c4ce`;

            fetch(api)
            .then(response => {
                // console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.main;
                const {description, icon} = data.weather[0];
                const {name} = data;
                const {country} = data.sys;
                // Set DOM Elements from API data response

                tempDeg.innerHTML = temp.toFixed(1);
                tempDesc.innerHTML = description;
                locTime.innerHTML = `${name},${country}`;
                weatherIcon.innerHTML = `<img src="icons/${icon}.png">`;

                tempSec.addEventListener("click", () => {
                    if (tempSecSpan.textContent === '°C') {
                        tempSecSpan.textContent = '°F';
                        tempDeg.innerHTML = tempFahrenheit(temp);
                    }
                    else {
                        tempSecSpan.textContent = '°C';
                        tempDeg.innerHTML = temp.toFixed(1);
                    }
                });

            })
            .catch(err => {
                SSconsole.error(err);
            })
        });
    }

    function tempFahrenheit(tempC) {
        return ((tempC*9/5) + 32).toFixed(1);
    }
});




/* XHR
onst xhr = new XMLHttpRequest();
        xhr.open('POST', 'sendEmail.php', true);
        // xhr.open('GET', 'sendEmail.php', true);
        // xhr.responseType = 'json'; // not to be used since JSON is ultimately string text data
        xhr.responseType = 'text';
        const data = {
               name: nameEl.value.trim(),
               email: emailEl.value.trim(),
               subject: subjectEl.value.trim(),
               msg: msgEl.value.trim()
        };

        console.log("Client:\n")
        console.log(data);
    

        xhr.onreadystatechange = function() { 
            if (this.readyState == 4 && this.status == 200) { 
                let myObj = JSON.parse(this.responseText); 

                // if (myObj["status"] == "success")
                // Sweet Alert popup message added on valid registration.
                    swal("Welcome Aboard!", "You have registered successfully! ", "success");
                // else
                    // swal("Oops!", "Mail server error. ", "error");

                /*
                let ff = butn.parentElement;
                let err = ff.querySelector('small');
                err.textContent = "Response: " + myObj;
                

               console.log("Server:\n");
               console.log(myObj);
           }
       };
       
       xhr.send(JSON.stringify(data));
       // xhr.send(); // for GET
   }
*/

// index.html SweetAlert
// <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>