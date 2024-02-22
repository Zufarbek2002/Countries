const countryBox = document.querySelector('.content_boxes')
const nextBtn = document.querySelector('.next_btn')
const previousBtn = document.querySelector('.previous_btn')
const darkBtn = document.querySelector('.dark_mode__btn')
const loading = document.querySelector('.loading_box')

const search = document.getElementById('search')
const sort = document.getElementById('sort')
const filter = document.getElementById('filter')

const header = document.querySelector('.header')
const headerLogo = document.querySelector('.header__logo')
const body = document.querySelector('.body')
const searchBox = document.querySelector('.search_box')
const icon = document.querySelector('.header__icon')


function displayCountry(data) {
    let str = "";
    data.data.forEach(e => {
        str += `
            <div class="content__box">
                <img src='${e.flags.png}' alt='${e.flags.alt}' class='content__img'/>
                <div class='content__text'>
                    <h2 class='content__title'>${e.name.common}</h2>
                    <div class='content__info'>
                        <h3 class='info__text'>Population: <span class='info__text_span'>${e.population}</span></h3>
                        <h3 class='info__text'>Region: <span class='info__text_span'>${e.region}</span></h3>
                        <h3 class='info__text'>Capital: <span class='info__text_span'>${e.capital}</span></h3>
                    </div>
                </div>
                <button class='content__link' onclick=detail(${e.ccn3})>Details</button>
            </div>
        `
    });
    countryBox.innerHTML = str;
}


function api(page) {
    fetch(`https://countries-restapi.vercel.app/all?page=${page}&limit=12`)
    .then(res => res.json())
    .then(data => {
        loading.style.display='none'
        displayCountry(data)})
    .catch(err => console.log(err))
}
nextBtn.addEventListener('click', e=>{
    page += 1;
    api(page)
})

previousBtn.addEventListener('click', e=>{
    if (page>1) {
        page -= 1;
    }
    api(page)
})

api(page=1)

search.addEventListener('input', e=>{
    let text = e.target.value.toLowerCase()
    if (text) {
        fetch(`https://countries-restapi.vercel.app/name/${text}?page=1&limit=12`)
        .then(res => res.json())
        .then(data => displayCountry(data))
        .catch(err => console.log(err))
    }
    else{
        api(page=1)
    }
})


filter.addEventListener('click', e=>{
    let text = e.target.value;
    if (text == "All") {
        api(page=1)
    }
    else{
        function filterPage(page) {
            fetch(`https://countries-restapi.vercel.app/region/${text}?page=${page}&limit=12`)
            .then(res => res.json())
            .then(data =>
                {
                    displayCountry(data)})
                    .catch(err => console.log(err))
                }
                nextBtn.addEventListener('click', e=>{
                        page += 1;
                        filterPage(page)
                })

                previousBtn.addEventListener('click', e=>{
                    if (page>1) {
                        page -= 1;
                    }
                    filterPage(page)
                })
                filterPage(page=1)
    }
})

sort.addEventListener('click', e=>{
    let text = e.target.value;
    if (text == "All") {
        api(page)
    } else {
        function sortApi(page) {
            fetch(`https://countries-restapi.vercel.app/all?sort=${text}&order=asc&page=${page}&limit=12`)
            .then(res => res.json())
            .then(data => displayCountry(data))
            .catch(err => console.log(err))
        }
        sortApi(page=1)

        nextBtn.addEventListener('click', e=>{
            page += 1;
            sortApi(page)
        })

        previousBtn.addEventListener('click', e=>{
            if (page>1) {
                page -= 1;
            }
            sortApi(page)
        })
    }
})

function detail(id){
    location.href=`/pages/detail.html?id=${id}`
    console.log(id);
}

darkBtn.addEventListener('click', (e)=>{
    body.classList.toggle('body_dark')
    header.classList.toggle('header_dark')
    headerLogo.classList.toggle('header__logo_dark')
    darkBtn.classList.toggle('header__logo_dark')
    searchBox.classList.toggle('header_dark')
    icon.classList.toggle('fa-color')
    search.classList.toggle('search_dark')
    filter.classList.toggle('header_dark')
    sort.classList.toggle('header_dark')
})