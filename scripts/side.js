const weatherCityName = 'Kafr ash Shaykh';
const weatherCountryCode = 'EG';
const weatherApiKey = 'c17dbdcb484b72f66a67f500abbcf7e7';

const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCityName},${weatherCountryCode}&appid=${weatherApiKey}&units=metric`;

fetch(weatherApiUrl)
  .then(response => response.json())
  .then(data => {
    const temp = Math.round(data.main.temp);
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.textContent = `${weatherCityName} : ${temp} °C`;
  })
  .catch(error => console.log('Error:', error));



  ////////////////////////////////////

const baseCurrency = 'EGP';
const curruncyApiKey = 'ef931570aebd76426816fc86';
const currencyApiUrl = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;


fetch(currencyApiUrl)
  .then(response => response.json())

 .then(data => {
 
    const usdRateInEGP = 1 / data.rates['USD']; 
    const sarRateInEGP = 1 / data.rates['SAR'];

    document.getElementById("usd-info").textContent = `1 USD = ${usdRateInEGP.toFixed(2)} EGP`;
    document.getElementById("sar-info").textContent = `1 SAR = ${sarRateInEGP.toFixed(2)} EGP`;
  })
  .catch(error => console.log('Error:', error));


  ////////////////////////////////////////
 const apiKey = '6bdd54e2761983407e2ae0d9fd8a2001737f1397dfbcbd4728e62ddd96d1c23a';
const apiUrl = `https://apiv2.allsportsapi.com/football/?met=Livescore&leagueId=152&APIkey=${apiKey}`;

fetch(apiUrl)
  .then(response => response.json())
.then(data => {
  const c = document.getElementById("matches-info");
  const matches = data.result || [];

  if (matches.length === 0) {
    c.textContent = "⚽ لا توجد مباريات الآن في الدوري المصري";
    return;
  }

  matches.forEach(x => {
    c.innerHTML += `
      <p><strong>${x.event_home_team}</strong> vs <strong>${x.event_away_team}</strong></p>
      <p>النتيجة: ${x.event_final_result || "جاري اللعب..."}</p>
      <p>الوقت: ${x.event_time}</p>
      <hr>
    `;
  });
})
 .catch(error => console.log("Error:", error));
