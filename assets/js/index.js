// WRITE YOUR JS CODE HERE



// https://api.nasa.gov/planetary/apod?api_key=YOUR_API_KEY_HERE

// https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10

// https://solar-system-opendata-proxy.vercel.app/api/planets


let apodImage = document.querySelector("#apod-image");
let apodTitle = document.querySelector("#apod-title");
let apodDateDetail = document.querySelector("#apod-date-detail");
let apodExplanation = document.querySelector("#apod-explanation");
let apodCopyright = document.querySelector("#apod-copyright");

let apodDateInfo = document.querySelector("#apod-date-info");

let loadDateBtn = document.querySelector("#load-date-btn");
let apodDateInput = document.querySelector("#apod-date-input");
let currentDate= document.querySelector("#current-date");

let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, "0");
let day = String(today.getDate()).padStart(2, "0");

apodDateInput.value = `${year}-${month}-${day}`;
apodDateInput.max = apodDateInput.value;
currentDate.textContent=apodDateInput.value ;
async function getTodayDetails(d){

    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=kShMRsYrMeOxvlRmeEjqO2P8QtxsRR29OAJPPapA&date=${d}`)
    let data = await response.json();
    console.log(data);
    console.log(response.status);
    apodImage.src = data.url;
    apodTitle.textContent = data.title;
    apodDateDetail.textContent = data.date;
    apodExplanation.textContent = data.explanation;
    apodCopyright.textContent = data.copyright || "";
    apodDateInfo.textContent = data.date;
    currentDate.textContent = data.date;
  
}

loadDateBtn.addEventListener("click", () => {
    getTodayDetails(apodDateInput.value);

});




