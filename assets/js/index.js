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


let leadingTight = document.querySelector(".leading-tight");
let launchesGrid =document.querySelector("#launches-grid");

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


async function launches(){

    let response = await fetch(`https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10`);
    let data = await response.json();
    // console.log(data);
     let arr= data.results;
     console.log(arr);

    let launchNames =  arr.map(element=> element.name);
    leadingTight.textContent = launchNames[0];
    console.log(leadingTight);
    console.log(launchNames);
    let launches = "";
    arr.splice(0,1);
     arr.forEach((element) => {
          launches+= `  <div
          class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
        >
          <div
            class="relative h-48 bg-slate-900/50 flex items-center justify-center"
          >
          <img src="${element.image?.image_url}">
            <div class="absolute top-3 right-3">
              <span
                class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
              >
                Go
              </span>
            </div>
          </div>
          <div class="p-5"> 
            <div class="mb-3">
              <h4
                class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
              >
               ${element.name}
              </h4>
              <p class="text-sm text-slate-400 flex items-center gap-2">
                <i class="fas fa-building text-xs"></i>
                SpaceX
              </p>
            </div>
            <div class="space-y-2 mb-4">
              <div class="flex items-center gap-2 text-sm">
                <i class="fas fa-calendar text-slate-500 w-4"></i>
                <span class="text-slate-300">Mar 15, 2024</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <i class="fas fa-clock text-slate-500 w-4"></i>
                <span class="text-slate-300">23:00 UTC</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <i class="fas fa-rocket text-slate-500 w-4"></i>
                <span class="text-slate-300">Falcon 9</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                <span class="text-slate-300 line-clamp-1">KSC, LC-39A</span>
              </div>
            </div>
            <div
              class="flex items-center gap-2 pt-4 border-t border-slate-700"
            >
              <button
                class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
              >
                Details
              </button>
              <button
                class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
              >
                <i class="far fa-heart"></i>
              </button>
            </div>
          </div>
        </div>`

     });

     launchesGrid.innerHTML=launches;


   




}
launches()



