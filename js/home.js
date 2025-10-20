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




// cards and caroussel


  const newsApiKey = '17b907263eada725a662710781d5086d';
const newsApiUrl = `https://gnews.io/api/v4/search?q=Sport OR Medical OR Art&lang=ar&max=10&country=eg&sortby=publishedAt&apikey=${newsApiKey}`;

  const carouselInner=document.querySelector(".carousel-inner");
  const cardsContainer=document.getElementById("cardsContainer");


// عشان نعمل call للداتا بتاعت ال api
fetch(newsApiUrl)
.then((response)=>{
   return response.json()
})

.then(data=>{
    console.log(data);
  const news=data.articles;



  // نضيف الأخبار للكاروسيل
    news.forEach((item, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      // العنصر الأول يكون active عشان يظهر أول حاجة
      if (index === 0) carouselItem.classList.add("active");



      // نضيف الصورة والنص واللينك للكاروسل
      carouselItem.innerHTML = `
        <img src="${item.image}" class="d-block w-100" alt="news image">
        <div class="overlay"></div>
        <div class="carousel-caption">
          <p class="onCaption">${item.title}</p>
          <a href="${item.url}" class="btn btn-danger" target="_blank">اقرأ المزيد</a>
        </div>
      `;
      // نحط العنصر جوه الكاروسيل
      carouselInner.appendChild(carouselItem);
    });

    // نضيف الأخبار للكروت
    const SixNews = news.slice(0, 6); 
    const row = document.createElement("div");
    row.classList.add("row", "mt-5");

    SixNews.forEach(item => {
      const col = document.createElement("div");
      col.classList.add("col-md-4", "mb-3");
      col.innerHTML = `
        <div class="card h-100">
          <img src="${item.image}" class="card-img-top" alt="news image">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}</p>
          </div>
          <a href="${item.url}" class="btn btn-danger" target="_blank">اقرأ المزيد</a>
        </div>
      `;
      row.appendChild(col);
    });

    cardsContainer.appendChild(row); // نحط الصف كله جوه الـ container
  })
  .catch(error => {
    // لو في مشكلة في الـ API
    console.error("Error:", error);
  });



 



