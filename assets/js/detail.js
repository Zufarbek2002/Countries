const countryBox = document.querySelector('.content__boxes')
const backBtn = document.querySelector('.back_btn')
const loading = document.querySelector('.loading_box')

const darkBtn = document.querySelector('.dark_mode__btn')

const header = document.querySelector('.header')
const headerLogo = document.querySelector('.header__logo')
const body = document.querySelector('.body')
const icon = document.querySelector('.header__icon')

function displayCountry(data) {
    let str = "";
    data.forEach(e => {
        str += `
            <div class="detail_content__box">
                <img src='${e.flags.png}' alt='${e.flags.alt}' class='detail_content__img'/>
                <div class='detail_content__text'>
                    <h2 class='detail__title'>${e.name.common}</h2>
                    <div class='detail_content__info'>
                        <h3 class='info__text'>Native Name: <span class='info__text_span'>${e.name.official}</span></h3>
                        <h3 class='info__text'>Population: <span class='info__text_span'>${e.population}</span></h3>
                        <h3 class='info__text'>Region: <span class='info__text_span'>${e.region}</span></h3>
                        <h3 class='info__text'>Sub Region: <span class='info__text_span'>${e.subregion}</span></h3>
                        <h3 class='info__text'>Capital: <span class='info__text_span'>${e.capital}</span></h3>
                        <h3 class='info__text'>Top Level Domain: <span class='info__text_span'>${e.tld}</span></h3>
                    </div>
                </div>
            </div>
        `
    });
    countryBox.innerHTML = str;
}

let id = location.search.slice(4, location.search.length)

function api(page) {
    fetch(`https://countries-restapi.vercel.app/all`)
        .then(res => res.json())
        .then(data => data.data.forEach(e => {
            if (+e.ccn3 == id) {
                loading.style.display = 'none'
                displayCountry([e])
                const detailTitle = document.querySelector('.detail__title')
                const detailInfoText = document.querySelectorAll('.info__text')

                darkBtn.addEventListener('click', (e) => {
                    body.classList.toggle('body_dark')
                    header.classList.toggle('header_dark')
                    headerLogo.classList.toggle('header__logo_dark')
                    darkBtn.classList.toggle('header__logo_dark')
                    detailTitle.classList.toggle('title_dark')
                    backBtn.classList.toggle('btn_style_dark')
                    detailInfoText.forEach(e => {
                        e.classList.toggle('title_dark')
                    })
                })
            }
        }))
        .catch(err => console.log(err))
}
api(page = 1)

backBtn.addEventListener('click', e => {
    location.href = '/index.html'
})
