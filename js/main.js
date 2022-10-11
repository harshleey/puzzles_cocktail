let input = document.querySelector('input')
document.querySelector('.submit').addEventListener('click', mixture)
let root = document.querySelector('.card-wrapper')

async function mixture() {
    let choice = input.value
    let url = `https://thecocktaildb.com/api/json/v1/1/search.php?s=${choice}`
    let res = await fetch(url)
    let data = await res.json()
    root.innerHTML = ""
    createDrinks(data.drinks)
    
}





function createDrinks(drinks) {
    let resultArray = []
    drinks.map(drink => {
        let ingredientArray = []
        for (let i = 1; i <= 10; i++) {
            if(drink[`strIngredient${i}`] && drink[`strMeasure${i}`] !== null ) {
                ingredientArray.push(`${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`)
            }
            else if(drinks[`strIngredient${i}`] && drinks[`strMeasure${i}`] === null ) {
                ingredientArray.push(`${drink[`strIngredient${i}`]}`)
            }
            else {
                break;
            }
        }
    
    
    let result = 
    `<div class="card swiper-slide">
        <div class="image-content">
            <span class="overlay"></span>

            <div class="card-image">
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" class="card-img">
            </div>
        </div>

        <div class="card-content">
            <h1 class="name">${drink.strDrink}</h1>
            <ul class="list">
                ${ingredientArray.map(item => `<li> ${item} </li>`).join('')}
            </ul>
            <h2>Instruction</h2>
            <p>${drink.strInstructions}</p>
        </div>
    </div>
    
    `
    
    resultArray.push(result)
   })
   resultArray.forEach(item => root.innerHTML += item)
}


 
let swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints:{
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
  });