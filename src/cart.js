let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

// getting the data from local storage 
let basket = JSON.parse(localStorage.getItem("data")) || [];

// function for count number of item present in local storage
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

// generating the fav items and displaying the fav page 
let generateCartItems = (e) => {
  if (basket.length !== 0) {
    var html = "";
    return (basket.map((x) => {
       let { id, item } = x; 
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then( respData => respData.json())
        .then((data) => { 
          console.log(data);
        html += `
        <div class="cart-item">
        <img width="100" src = ${data.meals[0].strMealThumb} alt=""/>
        <div class="details">

          <div class="title-price-x">
              <h4 class="title-price">
                <p>${data.meals[0].strMeal}</p>
                <p class="cart-item-price"> ${data.meals[0].strCategory} </p>
              </h4>
              <i onclick="removeItem(${data.meals[0].idMeal})" class="bi bi-x-lg"></i>
          </div>

          <div class="buttons">
              <i onclick="decrement(${data.meals[0].idMeal})"></i>
              <div id=${data.meals[0].idMeal} >${item}</div>
              <i onclick="increment(${data.meals[0].idMeal})"></i>
          </div>

        </div>
      </div>
         `

         ShoppingCart.innerHTML = html;

        });
     
       
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Favourate List is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCartItems();

// function to increment fav items 
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

// function for updating the fav numbers 
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

// function to remove fav items 
let removeItem = (id) => {
  let selectedItem = id;
  console.log(id);
  basket = basket.filter((x) => x.id !== selectedItem);
  console.log(basket);
  generateCartItems();
  TotalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};


// function to crear all the fav items 
let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};


// function to display items 
let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
    <h2>List Of Favourate Items</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Favourates</button>
    `;
  } else return;
};

TotalAmount();
