// api key
const apiKey = '5d89cf94d1787347cb458959d1890a54';
const forecast_apiKey = '0400ce034d5bc19aeef2111f526b203f';
//
// Input
//
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
//const timenow = document.getElementById('timenow');
//const hideElement = document.getElementById('hide');
//const Error1 = document.getElementById('error');
const apiElement = document.getElementById('apikey');
//Elements
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const minmaxtempElement = document.getElementById('minmaxtemp');
const descriptionElement = document.getElementById('description');
//const pressureElement = document.getElementById('pressure');
const visibilityElement = document.getElementById('visibility');
const windElement = document.getElementById('windspeed');
const cloudElement = document.getElementById('cloud');
//const humidityEle = document.getElementById('humidity');
const datetime = document.getElementById('time');
const rain = document.getElementById('rain');
//const snow = document.getElementById('snow');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const forecast_temp = document.getElementById('tempfc1');
//const weatherinfo_div = document.getElementById('weatherin')

//weatherinfo_div.style.visibility = 'hidden';
//apiElement.value = apiKey;
document.getElementById("wicon").style.visibility = 'hidden';
//apiElement.disabled = true;
var myVar = setInterval(myTimer, 1);
function myTimer() {
    var d = new Date();
    datetime.innerHTML = d;
}
locationInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        const location = locationInput.value;
        if (location == '') {
            alert("Please enter the city name to find the weather!");
            return false;
        }
        if (location) {
            //weatherinfo_div.style.visibility = 'visible';
            //hideElement.style.visibility = 'visible';
            fetchWeather(location);
            forecast(location);
        }
    }
})
var location_button = document.getElementById('location_button');
function locations() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Geolocation does not support in this web browser.");
    }
    function showPosition(position) {
        fetchWeather1(position.coords.longitude, position.coords.latitude);
        forecast1(position.coords.longitude, position.coords.latitude)
    }
}
location_button.onclick = 
function() {
    locations();
}

//hideElement.style.visibility = 'hidden';
searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location == '') {
        alert("Please enter the city name to find the weather!");
        return false;
    }
    if (location) {
        //weatherinfo_div.style.visibility = 'visible';
        //hideElement.style.visibility = 'visible';
        fetchWeather(location);
        forecast(location);
    }
    if (location == "suka blyat" || location == "cyka blyat" || location == "blyat") {alert(location)}
});
/*hideElement.addEventListener('click', () => {
    weatherinfo_div.style.visibility = 'hidden';
    hideElement.style.visibility = 'hidden';
})*/
/*
timenow.addEventListener('click', () => {
    const date = new Date();
    //let time = date.getTime();
    timenow.style.visibility = 'hidden';
    datetime.textContent = date;
    hideElement.style.visibility = 'visible';
})
hideElement.addEventListener('click', () => {
    datetime.style.visibility = 'hidden';
    timenow.style.visibility = 'visible';
    hideElement.style.visibility = 'hidden';
})
*/

function timezone(unix, idname) {
    // convert unix to datenow
    var date = new Date(unix * 1000);

    var hour = ('0' + date.getHours()).slice(-2);
    var minute = ('0' + date.getMinutes()).slice(-2);
    var second = ('0' + date.getSeconds()).slice(-2);
    //month, year
    var month = ('0' + (date.getMonth()+1)).slice(-2);
    var year = date.getFullYear();
    var day = ('0' + date.getDay()).slice(-2);
    //format
    var format = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
    document.getElementById(idname).textContent = format;
}
// fetchWeather function
function fetchWeather(location) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&cnt=7`;
        //#region weatherdata
        fetch(url).then(response => response.json()) // Lấy dữ liệu từ JSON
            .then(data => { //Lấy dữ liệu
                // Đổi từ unix đến thời gian
                let sunrise_ts = data.sys.sunrise;
                let sunset_ts = data.sys.sunset;

                var sunrise_date = new Date(sunrise_ts * 1000);
                var sunset_date = new Date(sunset_ts * 1000);
                var sr_hour = "0" + sunrise_date.getHours();
                var ss_hour = "0" + sunset_date.getHours();
                var sr_min = "0" + sunrise_date.getMinutes();
                var ss_min = "0" + sunset_date.getMinutes();;
                var sr_sec = "0" + sunrise_date.getSeconds();
                var ss_sec = "0" + sunset_date.getSeconds();
                var sr_format = sr_hour.slice(-2) + ':' + sr_min.slice(-2) + ':' + sr_sec.slice(-2);
                var ss_format = ss_hour.slice(-2) + ':' + ss_min.slice(-2) + ':' + ss_sec.slice(-2);
                //variable
                document.getElementById("wicon").style.visibility = 'visible';
                //if (data.weather[0].icon == '01d') {var iconurl = "https://assets.msn.com/wxbundles/v2/weather/assets/svg/conditionsIcons/d100.svg"}
                //if (data.weather[0].icon == '02d') {var iconurl = "https://assets.msn.com/wxbundles/v2/weather/assets/svg/conditionsIcons/d200.svg"}
                if (data.weather[0].icon == '10d' || data.weather[0].icon == '10n' ||
                    data.weather[0].icon == '09d' || data.weather[0].icon == '09n'
                ) {
                    document.getElementById('weatherin').style.backgroundImage = 'url(Python/mưa.jpg)';
                    document.getElementById('weatherin').style.color = 'white';
                }
                else {
                    document.getElementById('weatherin').style.backgroundImage = null;
                    document.getElementById('weatherin').style.color = 'black';
                }
                var icon_image = data.weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + icon_image + ".png";
                //styles for urls.
                var haze1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/Haze.svg";
                var fog1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/FogV2.svg";
                var lightning1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ThunderstormsV2.svg";
                var dust1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/Dust1.svg";
                var hazesmoke1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/HazySmokeV2.svg"

                if (data.weather[0].main == 'Haze') {document.getElementById("wicon").src = haze1;}
                else if (data.weather[0].main == 'Fog') {document.getElementById('wicon').src = fog1;}
                else if (data.weather[0].main == 'Thunderstorm') {document.getElementById('wicon').src = lightning1;}
                else if (data.weather[0].main == 'Smoke') {document.getElementById('wicon').src = hazesmoke1;}
                else if (data.weather[0].main == 'Dust') {document.getElementById('wicon').src = dust1;}
                else {document.getElementById("wicon").src = iconurl;}

                document.getElementById('wicon').title = data.weather[0].description;
                //Mưa

                try{var rain1 = data.rain['1h']} 
                catch{var rain1=0}
                try{var rain3 = data.rain['3h']}
                catch{var rain3=0}
                //Tuyết
                try{var snow1 = data.snow['1h']}
                catch{var snow1=0}
                try{var snow3 = data.snow['3h']}
                catch{var snow3=0}
                //textContent
                //gió giật
                try {var gust_wind1 = data.wind.gust;}
                catch {var gust_wind1=0;}
                var date = new Date((data.dt) * 1000);
                var date1 = new Date()
            // Hours part from the timestamp
                var hours = "0" + date.getHours();

            // Minutes part from the timestamp
                var minutes = "0" + date.getMinutes();

            // Seconds part from the timestamp
                var seconds = "0" + date.getSeconds();

            // Will display time in 10:30:23 format
                var timenow = date1.getFullYear() + '-' + ("0" + (date1.getMonth()+1)).slice(-2) + '-'  + ("0" + date1.getDate()).slice(-2) + ' ' + hours.slice(-2) + ':' + minutes.slice(-2) + ':' + seconds.slice(-2);
                locationElement.textContent = `Weather in: ${data.name}, ${data.sys.country} (${data.coord.lat}, ${data.coord.lon})`;
                //Error1.textContent = '';
                temperatureElement.textContent = `Temperature: ${Math.round(data.main.temp)}°C, Feels like ${Math.round(data.main.feels_like)}°C`;
                //minmaxtempElement.textContent = `Nhiệt độ thấp nhất: ${Math.round(data.main.temp_min)}°C | Nhiệt độ cao nhất ${Math.round(data.main.temp_max)}°C`;

                document.getElementById('datetime').textContent = `Update time: ${timenow}`;
                descriptionElement.textContent = `Mô tả: ${data.weather[0].description}`;
                //pressureElement.textContent = `Áp suất không khí: ${data.main.pressure} hPa`;
                //visibilityElement.textContent = `Tầm nhìn: ${data.visibility} m (${(data.visibility) / 1000} km)`;
                //windElement.textContent = `Tốc độ gió: ${data.wind.speed} m/s`;
                cloudElement.textContent = `Cloudiness ${data.clouds.all}%, Humidity: ${data.main.humidity}%, Wind speed: ${data.wind.speed} m/s.`;
                //humidityEle.textContent =  `Độ ẩm: ${data.main.humidity}%`


                /*
                switch (rain1 && snow1) {
                    case rain1 && snow1:
                        rain.textContent = `Lượng mưa: ${rain1} mm, Lượng tuyết: ${snow1} mm, Tầm nhìn: ${data.visibility} m (${(data.visibility) / 1000} km)`;
                    case data.rain['3h'] && data.snow['3h']:
                        rain.textContent = `Lượng mưa: ${data.rain['3h']} mm, Lượng tuyết: ${data.snow['3h']} mm, Tầm nhìn: ${data.visibility} m (${(data.visibility) / 1000} km)`
                    default:
                        rain.textContent = `Lượng mưa: 0 mm, Lượng tuyết: 0 mm, Tầm nhìn: ${data.visibility} m (${(data.visibility) / 1000} km)`;
                }*/

                        
                try { rain.textContent = `Rain volume: ${rain1} mm, Snow volume: ${snow1} mm, Visibility: ${data.visibility} m (${(data.visibility) / 1000} km)`; }
                catch { rain.textContent = `Rain volume: 0 mm, Snow volume: 0 mm, Visibility: ${data.visibility} m (${(data.visibility) / 1000} km)`; }
                //sunrise.textContent = `Mặt trời mọc lúc: ${sr_format} (Giờ GMT+7)`;
                //sunset.textContent = `Mặt trời lặn lúc: ${ss_format} (Giờ GMT+7)`;
            })
            .catch (error => { //Trường hợp khi gặp lỗi
                /*locationElement.textContent = '';
                temperatureElement.textContent = '';
                //minmaxtempElement.textContent = '';
                document.getElementById("wicon").style.visibility = 'hidden';
                descriptionElement.textContent = '';
                //pressureElement.textContent = '';
                visibilityElement.textContent = '';
                windElement.textContent = '';
                cloudElement.textContent = '';
                //humidityEle.textContent = '';
                try {rain.textContent = ''} catch {rain.textContent = ''}
                try {snow.textContent = ''} catch {snow.textContent = ''}
                sunrise.textContent = '';
                sunset.textContent = '';
                document.getElementById('datetime').textContent = '';*/
                //Error1.textContent = `Không tìm thấy thời tiết của thành phố: "${locationInput.value}"`;
                // Get the snackbar DIV
                var x = document.getElementById("snackbar");
                x.textContent = `Cannot find the city name: "${locationInput.value}"
                to show the weather and weather forecast data.`;
                    // Add the "show" class to DIV
                x.className = "show";
                
                    // After 3 seconds, remove the show class from DIV
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                console.log(error);
            });
        //#endregion weatherdata
    }
    catch {
        var x = document.getElementById("snackbar");
        x.textContent = `Cannot find the internet, please connect to the internet`;
                // Add the "show" class to DIV
        x.className = "show";
              
                // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
}
function forecast(location) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${forecast_apiKey}&units=metric&cnt=7`;
    //#region forecast
    fetch(url)
        .then(res => res.json()) //Lấy dữ liệu từ JSON
        .then(forecastdata => { //Lấy dữ liệu từ dự báo
            //3h forecast

        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds
        var date = new Date((forecastdata.list[0].dt) * 1000);
        var date1 = new Date()
        // Hours part from the timestamp
        var hours = "0" + date.getHours();

        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();

        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var timenow1 = date1.getFullYear() + '-' + ("0" + (date1.getMonth()+1)).slice(-2) + '-'  + ("0" + date1.getDate()).slice(-2) + ' ' + hours.slice(-2) + ':' + minutes.slice(-2) + ':' + seconds.slice(-2);
        document.getElementById('thanhpho').textContent = `in ${forecastdata.city.name}, ${forecastdata.city.country} (${forecastdata.city.coord.lat}, ${forecastdata.city.coord.lon})`;
            try {var gust_wind = forecastdata.list[0].wind.gust}

            catch {var gust_wind=0}

            //const acc = document.getElementsByClassName("accordion");
            var i;

            //var icon_image1 = forecastdata.list[0].weather[0].icon;
            //var iconurl1 = "http://openweathermap.org/img/w/" + icon_image1 + ".png";


            /*document.getElementById('bfc1').textContent = `${timenow1}, Nhiệt độ: ${forecastdata.list[0].main.temp}°C`;
            for (i = 0; i < acc.length; i++) {
                //searchButton.addEventListener("click", () => {})
                
                acc[i].classList.toggle("active");
                acc[i].addEventListener('click',  function() {
                    var panel = this.nextElementSibling;
                    this.classList.toggle("active");
                    if (panel.style.maxHeight) {
                        panel.style.maxHeight = null;
                    } else {
                        panel.style.maxHeight = panel.scrollHeight + "px";
                    }
                    this.classList.toggle("active");
                    if (panel.style.display === "block") {
                        panel.style.display = "block";
                    } 
                    else {
                        panel.style.display = "block";
                    }
                });
            }*/
            //document.getElementById('error1').textContent = '';
            //document.getElementById('time0').textContent = `${forecastdata.list[0]['dt_txt']} (Giờ GMT+0)`;
            document.getElementById('time7').textContent = `${timenow1}`
            document.getElementById('des1').textContent = `Description: ${forecastdata.list[0].weather[0].description}`;
            document.getElementById('forecasticon').style.visibility = 'visible';
            // styles of urls.
            var haze1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/Haze.svg";
            var fog1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/FogV2.svg";
            var lightning1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ThunderstormsV2.svg";
            var dust1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/Dust1.svg";
            var hazesmoke1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/HazySmokeV2.svg"

            var icon_image = forecastdata.list[0].weather[0].icon;
            var iconurl = "https://openweathermap.org/img/w/" + icon_image + ".png";
            if (forecastdata.list[0].weather[0].main == 'Haze') {document.getElementById("forecasticon").src = haze1;}
            else if (forecastdata.list[0].weather[0].main == 'Fog') {document.getElementById('forecasticon').src = fog1;}
            else if (forecastdata.list[0].weather[0].main == 'Thunderstorm') {document.getElementById('forecasticon').src = lightning1;}
            else if (forecastdata.list[0].weather[0].main == 'Smoke') {document.getElementById('forecasticon').src = hazesmoke1;}
            else if (forecastdata.list[0].weather[0].main == 'Dust') {document.getElementById('forecasticon').src = dust1;}
            else {document.getElementById("forecasticon").src = iconurl;}

            document.getElementById('forecasticon').title = forecastdata.list[0].weather[0].description;
            forecast_temp.textContent = `Temperature: ${Math.round(forecastdata.list[0].main.temp)}°C, Feels like ${Math.round(forecastdata.list[0].main.feels_like)}°C`;
            document.getElementById('cloudy').textContent = `Cloudiness ${forecastdata.list[0].clouds.all}%, Humidity: ${forecastdata.list[0].main.humidity}%, Wind speed: ${forecastdata.list[0].wind.speed} m/s, Wind gust ${gust_wind} m/s.`;
            //thử
            try {var rain3 = forecastdata.list[0].rain['3h']}
            catch {var rain3 = 0}
            try {var snow3 = forecastdata.list[0].snow['3h']}
            catch {var snow3 = 0}
            var visiblity1 = forecastdata.list[0].visibility;
            document.getElementById('rainy').textContent = `Rain volume: ${rain3} mm, Snow volume: ${snow3} mm, Visibility: ${visiblity1} m (${visiblity1 / 1000} km).`;
        })
        .catch(error => {
            /*forecast_temp.textContent = '';
            document.getElementById('thanhpho').textContent = '';
            document.getElementById('time1').textContent = '';
            document.getElementById('des1').textContent = '';
            document.getElementById('cloudy').textContent = '';
            document.getElementById('rainy').textContent = '';*/
            //document.getElementById('error1').textContent = `Không tìm thấy tên thành phố: "${locationInput.value}" để dự báo thời tiết.`;
            
                // Get the snackbar DIV
        })
        //#endregion forecast
}
function fetchWeather1(lon, lat) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=${apiKey}&units=metric&cnt=7`;
        //#region weatherdata (lon, lat)
        fetch(url).then(response => response.json()) // Lấy dữ liệu từ JSON
            .then(data => { //Lấy dữ liệu
                // Đổi từ unix đến thời gian
                let sunrise_ts = data.sys.sunrise;
                let sunset_ts = data.sys.sunset;

                var sunrise_date = new Date(sunrise_ts * 1000);
                var sunset_date = new Date(sunset_ts * 1000);
                var sr_hour = "0" + sunrise_date.getHours();
                var ss_hour = "0" + sunset_date.getHours();
                var sr_min = "0" + sunrise_date.getMinutes();
                var ss_min = "0" + sunset_date.getMinutes();;
                var sr_sec = "0" + sunrise_date.getSeconds();
                var ss_sec = "0" + sunset_date.getSeconds();
                var sr_format = sr_hour.slice(-2) + ':' + sr_min.slice(-2) + ':' + sr_sec.slice(-2);
                var ss_format = ss_hour.slice(-2) + ':' + ss_min.slice(-2) + ':' + ss_sec.slice(-2);
                //variable
                document.getElementById("wicon").style.visibility = 'visible'
                var icon_image = data.weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + icon_image + ".png";
                //styles for urls.
                var haze1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/Haze.svg";
                var fog1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/FogV2.svg";
                var lightning1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ThunderstormsV2.svg";
                var dust1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/Dust1.svg";
                var hazesmoke1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/HazySmokeV2.svg"

                if (data.weather[0].main == 'Haze') {document.getElementById("wicon").src = haze1;}
                else if (data.weather[0].main == 'Fog') {document.getElementById('wicon').src = fog1;}
                else if (data.weather[0].main == 'Thunderstorm') {document.getElementById('wicon').src = lightning1;}
                else if (data.weather[0].main == 'Dust') {document.getElementById('wicon').src = dust1;}
                else if (data.weather[0].main == 'Smoke') {document.getElementById('wicon').src = hazesmoke1;}
                else {document.getElementById("wicon").src = iconurl;}
                document.getElementById('wicon').title = data.weather[0].description;
                //Mưa
                try{var rain1 = data.rain['1h']} 
                catch{var rain1=0}
                //try{var rain3 = data.rain['3h']}
                //catch{var rain3=0}
                //Tuyết
                try{var snow1 = data.snow['1h']}
                catch{var snow1=0}
                //try{var snow3 = data.snow['3h']}
                //catch{var snow3=0}
                //textContent
                //gió giật
                try {var gust_wind1 = data.wind.gust;}
                catch {var gust_wind1=0;}
                var date = new Date((data.dt) * 1000);
                var date1 = new Date()
            // Hours part from the timestamp
                var hours = "0" + date.getHours();

            // Minutes part from the timestamp
                var minutes = "0" + date.getMinutes();

            // Seconds part from the timestamp
                var seconds = "0" + date.getSeconds();
                
            // Will display time in 10:30:23 format
            if (data.weather[0].icon == '10d' || data.weather[0].icon == '10n' ||
                data.weather[0].icon == '09d' || data.weather[0].icon == '09n'
            ) {
                document.getElementById('weatherin').style.backgroundImage = 'url()';
                document.getElementById('weatherin').style.color = 'white';
            }
            else if (data.weather[0].icon == '13d' || data.weather[0].icon == '13n') {
                document.getElementById('weatherin').style.backgroundImage = 'url()';
                document.getElementById('weatherin').style.color = 'black';
            }
            else if (data.weather[0].icon == '11d' || data.weather[0].icon == '11n') {
                document.getElementById('weatherin').style.backgroundImage = 'url()';
                document.getElementById('weatherin').style.color = 'black';
            }
            else {
                document.getElementById('weatherin').style.backgroundImage = null;
                document.getElementById('weatherin').style.color = 'black';
            }
                var timenow = date1.getFullYear() + '-' + ("0" + (date1.getMonth()+1)).slice(-2) + '-'  + ("0" + date1.getDate()).slice(-2) + ' ' + hours.slice(-2) + ':' + minutes.slice(-2) + ':' + seconds.slice(-2);
                locationElement.textContent = `Weather in: ${data.name}, ${data.sys.country} (${data.coord.lat}, ${data.coord.lon})`;
                //Error1.textContent = '';
                temperatureElement.textContent = `Temperature: ${Math.round(data.main.temp)}°C, Feels like ${Math.round(data.main.feels_like)}°C`;
                //minmaxtempElement.textContent = `Nhiệt độ thấp nhất: ${Math.round(data.main.temp_min)}°C | Nhiệt độ cao nhất ${Math.round(data.main.temp_max)}°C`;

                document.getElementById('datetime').textContent = `Update time: ${timenow}`;
                descriptionElement.textContent = `Mô tả: ${data.weather[0].description}`;
                //pressureElement.textContent = `Áp suất không khí: ${data.main.pressure} hPa`;
                //visibilityElement.textContent = `Tầm nhìn: ${data.visibility} m (${(data.visibility) / 1000} km)`;
                //windElement.textContent = `Tốc độ gió: ${data.wind.speed} m/s`;
                cloudElement.textContent = `Cloudiness ${data.clouds.all}%, Humidity: ${data.main.humidity}%, Wind speed: ${data.wind.speed} m/s.`;
                //humidityEle.textContent =  `Độ ẩm: ${data.main.humidity}%`
                try { rain.textContent = `Rain volume: ${rain1} mm, Snow volume: ${snow1} mm, Visibility: ${data.visibility} m (${(data.visibility) / 1000} km)`; }
                catch { rain.textContent = `Rain volume: 0 mm, Snow volume: 0 mm, Visibility: ${data.visibility} m (${(data.visibility) / 1000} km)`; }
                //sunrise.textContent = `Mặt trời mọc lúc: ${sr_format} (Giờ GMT+7)`;
                //sunset.textContent = `Mặt trời lặn lúc: ${ss_format} (Giờ GMT+7)`;
            })
            .catch (error => { //Trường hợp khi gặp lỗi
                /*locationElement.textContent = '';
                temperatureElement.textContent = '';
                //minmaxtempElement.textContent = '';
                document.getElementById("wicon").style.visibility = 'hidden';
                descriptionElement.textContent = '';
                //pressureElement.textContent = '';
                visibilityElement.textContent = '';
                windElement.textContent = '';
                cloudElement.textContent = '';
                //humidityEle.textContent = '';
                try {rain.textContent = ''} catch {rain.textContent = ''}
                try {snow.textContent = ''} catch {snow.textContent = ''}
                sunrise.textContent = '';
                sunset.textContent = '';
                document.getElementById('datetime').textContent = '';*/
                // Get the snackbar DIV
                var x = document.getElementById("snackbar");
                x.textContent = `Không tìm thấy tên thành phố: "${locationInput.value}"
                để tìm kiếm thời tiết và dự báo thời tiết.`;
                    // Add the "show" class to DIV
                x.className = "show";
                
                    // After 3 seconds, remove the show class from DIV
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                console.log(error);
            });
        //#endregion weatherdata
    }
    catch {
        var x = document.getElementById("snackbar");
        x.textContent = `Can't find the internet, please connect the internet.`;
                // Add the "show" class to DIV
        x.className = "show";
              
                // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
}
function forecast1(lon, lat) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lon=${lon}&lat=${lat}&appid=${forecast_apiKey}&units=metric&cnt=7`;
    //#region forecast (lon, lat)
    fetch(url)
        .then(res => res.json()) //Lấy dữ liệu từ JSON
        .then(forecastdata => { //Lấy dữ liệu từ dự báo
            //3h forecast

        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds
        var date = new Date((forecastdata.list[0].dt) * 1000);
        var date1 = new Date()
        // Hours part from the timestamp
        var hours = "0" + date.getHours();

        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();

        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var timenow1 = date1.getFullYear() + '-' + ("0" + (date1.getMonth()+1)).slice(-2) + '-'  + ("0" + date1.getDate()).slice(-2) + ' ' + hours.slice(-2) + ':' + minutes.slice(-2) + ':' + seconds.slice(-2);
        document.getElementById('thanhpho').textContent = `in ${forecastdata.city.name}, ${forecastdata.city.country} (${forecastdata.city.coord.lat}, ${forecastdata.city.coord.lon})`;
            try {var gust_wind = forecastdata.list[0].wind.gust}

            catch {var gust_wind=0}

            const acc = document.getElementsByClassName("accordion");
            var i;

            //var icon_image1 = forecastdata.list[0].weather[0].icon;
            //var iconurl1 = "http://openweathermap.org/img/w/" + icon_image1 + ".png";


            /*document.getElementById('bfc1').textContent = `${timenow1}, Nhiệt độ: ${forecastdata.list[0].main.temp}°C`;
            for (i = 0; i < acc.length; i++) {
                //searchButton.addEventListener("click", () => {})
                
                acc[i].classList.toggle("active");
                acc[i].addEventListener('click',  function() {
                    var panel = this.nextElementSibling;
                    this.classList.toggle("active");
                    if (panel.style.maxHeight) {
                        panel.style.maxHeight = null;
                    } else {
                        panel.style.maxHeight = panel.scrollHeight + "px";
                    }
                    this.classList.toggle("active");
                    if (panel.style.display === "block") {
                        panel.style.display = "block";
                    } 
                    else {
                        panel.style.display = "block";
                    }
                });
            }*/
            //document.getElementById('error1').textContent = '';
            //document.getElementById('time0').textContent = `${forecastdata.list[0]['dt_txt']} (Giờ GMT+0)`;
            document.getElementById('time7').textContent = `${timenow1}`
            document.getElementById('des1').textContent = `Mô tả: ${forecastdata.list[0].weather[0].description}`;
            document.getElementById('forecasticon').style.visibility = 'visible';
            //styles of urls.
            var haze1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/Haze.svg";
            var fog1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/FogV2.svg";
            var lightning1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ThunderstormsV2.svg";
            var dust1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/Dust1.svg";
            var hazesmoke1 = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/HazySmokeV2.svg"

            var icon_image = forecastdata.list[0].weather[0].icon;
            var iconurl = "https://openweathermap.org/img/w/" + icon_image + ".png";
            if (forecastdata.list[0].weather[0].main == 'Haze') {document.getElementById("forecasticon").src = haze1;}
            else if (forecastdata.list[0].weather[0].main == 'Fog') {document.getElementById('forecasticon').src = fog1;}
            else if (forecastdata.list[0].weather[0].main == 'Thunderstorm') {document.getElementById('forecasticon').src = lightning1;}
            else if (forecastdata.list[0].weather[0].main == 'Smoke') {document.getElementById('forecasticon').src = hazesmoke1;}
            else if (forecastdata.list[0].weather[0].main == 'Dust') {document.getElementById('forecasticon').src = dust1;}
            else {document.getElementById("forecasticon").src = iconurl;}

            document.getElementById('forecasticon').title = forecastdata.list[0].weather[0].description;
            forecast_temp.textContent = `Temperature: ${Math.round(forecastdata.list[0].main.temp)}°C, Feels like: ${Math.round(forecastdata.list[0].main.feels_like)}°C`;
            document.getElementById('cloudy').textContent = `Cloudiness: ${forecastdata.list[0].clouds.all}%, Humidity: ${forecastdata.list[0].main.humidity}%, Wind speed: ${forecastdata.list[0].wind.speed} m/s, Wind gust ${gust_wind} m/s.`;
            //thử
            try {var rain3 = forecastdata.list[0].rain['3h']}
            catch {var rain3 = 0}
            try {var snow3 = forecastdata.list[0].snow['3h']}
            catch {var snow3 = 0}
            var visiblity1 = forecastdata.list[0].visibility;
            document.getElementById('rainy').textContent = `Rain volume: ${rain3} mm, Snow volume: ${snow3} mm, Visibility: ${visiblity1} m (${visiblity1 / 1000} km).`;
        })
        .catch(error => {
            /*forecast_temp.textContent = '';
            document.getElementById('thanhpho').textContent = '';
            document.getElementById('time1').textContent = '';
            document.getElementById('des1').textContent = '';
            document.getElementById('cloudy').textContent = '';
            document.getElementById('rainy').textContent = '';*/
            //document.getElementById('error1').textContent = `Không tìm thấy tên thành phố: "${locationInput.value}" để dự báo thời tiết.`;
            
                // Get the snackbar DIV
            console.log(error);
        })
        //#endregion forecast
}
