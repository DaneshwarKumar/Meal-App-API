let shop = document.getElementById("shop");

// getting the data from local storage 
let basket = JSON.parse(localStorage.getItem("data")) || [];


// getting all the data displaying on the page 
let generateShop = (e) => {
  e.preventDefault();

  let searchInputTxt = document.getElementById('input').value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
  .then( respData => respData.json())
  .then((data) => {
    let html = "";
    if(data.meals){
        data.meals.forEach(meal => {
            html += `
            <div id=product-id-${meal.idMeal} class="item">
                         <img width="220" src=${meal.strMealThumb} alt="">
                               <div class="details">
                                <h3>${meal.strMeal}</h3>
                               <p>${meal.idMeal}</p>
                              
                              <div class="price-quantity">
                               <h2 onclick="getRecipe()"> Get Recipe </h2>
                                    <div class="buttons">
                                       <div id ='fav' onclick = bgChange(this)>  <i class="bi bi-suit-heart" id=${meal.idMeal}  onclick="increment(${meal.idMeal})"></i>  </div>
                                    </div>
                                  </div>
                                </div>
                           </div>
            `;
        });
    } else{
        html = "Sorry, we didn't find any meal!";
    }
    shop.innerHTML = html;  
  })
}





const searchBtn = document.getElementById('submit');
searchBtn.addEventListener('click' , generateShop)


// function for change background color of like Button 

function bgChange(ele){
  ele = ele.firstElementChild;
  console.log(ele.style);
  if(ele.style.background == 'red')
  {
    ele.style.background = 'white'
  }
  else{
    ele.style.background = 'red';
  }
}




// function for check the element is present or not in local storage if not present then push element 
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);
  
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1
    });
  } 
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
  } ;
  
// function to update counting of favourates 
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  calculation();
};

// function for count the favourates 
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
