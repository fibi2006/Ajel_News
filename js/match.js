// تحديد العناصر من الصفحة
const matchesSection = document.querySelector(".matches");
const searchInput = document.querySelector(".search input");

// مفتاح الـ API الخاص بك
const API_KEY = "cb146b65056245faa278fcd59ff1b055";
const API_URL = `https://newsapi.org/v2/top-headlines?country=eg&category=sports&apiKey=${API_KEY}`;

// دالة لجلب الأخبار من NewsAPI
async function getNews() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      displayNews(data.articles);
    } else {
      matchesSection.innerHTML = "<p>لا توجد أخبار حالياً.</p>";
    }
  } catch (error) {
    console.error("حدث خطأ أثناء جلب الأخبار:", error);
    matchesSection.innerHTML = "<p>حدث خطأ أثناء تحميل الأخبار.</p>";
  }
}

// دالة لعرض الأخبار في شكل كروت
function displayNews(articles) {
  matchesSection.innerHTML = articles
    .slice(0, 10) // عرض أول 10 أخبار فقط
    .map(
      (article) => `
      <div class="match-card">
        <p class="league">${article.source.name || "مصدر غير معروف"}</p>
        <div class="teams">
          <div>${article.title}</div>
        </div>
        <p class="status">${
          article.publishedAt
            ? new Date(article.publishedAt).toLocaleString("ar-EG")
            : ""
        }</p>
        <a href="${article.url}" target="_blank" class="score" style="font-size:14px;">اقرأ المزيد</a>
      </div>
    `
    )
    .join("");
}

// البحث في الأخبار
searchInput.addEventListener("input", async (e) => {
  const query = e.target.value.trim();
  if (query.length > 2) {
    const searchUrl = `https://newsapi.org/v2/everything?q=${query}&language=ar&apiKey=${API_KEY}`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    displayNews(data.articles);
  } else {
    getNews();
  }
});

//        تشغيل عند تحميل الصفحة
getNews();


//         التحكم في الفلاتر
const filterButtons = document.querySelectorAll(".filters button");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", async () => {
    //     إزالة الحالة النشطة من كل الأزرار
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    let url = API_URL;

    if (btn.textContent === "انتهت") {
      //         آخر 24 ساعة
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const from = yesterday.toISOString().split("T")[0];
      const to = new Date().toISOString().split("T")[0];
      url = `https://newsapi.org/v2/everything?q=sports&from=${from}&to=${to}&language=ar&apiKey=${API_KEY}`;
    } else if (btn.textContent === "قادمة") {
      //         أحدث الأخبار   
      url = `https://newsapi.org/v2/everything?q=sports&sortBy=publishedAt&language=ar&apiKey=${API_KEY}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      displayNews(data.articles);
    } catch (error) {
      matchesSection.innerHTML = "<p>⚠️ خطأ أثناء تحميل الأخبار.</p>";
    }
  });
});
