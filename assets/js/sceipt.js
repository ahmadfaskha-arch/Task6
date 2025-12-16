
let product = JSON.parse(localStorage.getItem("product")) 
localStorage.setItem("product" ,JSON.stringify([
    {  
      id : 1,
      name : "Redmi not8 ",
      price : 230,
      category:"phone",
      image : "https://images.pexels.com/photos/10902918/pexels-photo-10902918.jpeg"
},
    {  
      id : 2,
      name : "laptopHp ",
      price : 400,
      category:"laptop",
      image : "https://images.pexels.com/photos/17706646/pexels-photo-17706646.jpeg"
},
    {  
      id : 3,
        name : "t_shirt ",
        price : 34,
        category:"clothes",
        image : "https://images.pexels.com/photos/7671168/pexels-photo-7671168.jpeg" 
},
{
      id : 4,
      name : "t_shirt",
      price : 15 ,
      category : "clothes",
      image : " https://images.pexels.com/photos/14579191/pexels-photo-14579191.jpeg"
},
{
      id: 5,
      name :"iphone 15",
      price: 500,
      category : "phone",
      image : "https://images.pexels.com/photos/13570143/pexels-photo-13570143.jpeg"
},
{
  id :6,
  name : "laptopasus",
  price : 450,
  category : "laptop",
  image : "https://images.pexels.com/photos/14328581/pexels-photo-14328581.jpeg"
},


]))
// localStorage.clear()
// https://www.pexels.com/photo/photo-of-smartphone-near-decorative-plant-4065906/
// https://images.pexels.com/photos/10902918/pexels-photo-10902918.jpeg
// https://images.pexels.com/photos/13360476/pexels-photo-13360476.jpeg
// https://images.pexels.com/photos/13570143/pexels-photo-13570143.jpeg

// https://images.pexels.com/photos/14328581/pexels-photo-14328581.jpeg
// https://images.pexels.com/photos/17706646/pexels-photo-17706646.jpeg

// https://images.pexels.com/photos/7671168/pexels-photo-7671168.jpeg
// https://images.pexels.com/photos/14579191/pexels-photo-14579191.jpeg


const slider = document.querySelector(".slider-wrapper");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const searchInput = document.getElementById("searchInput");
const searchFilter = document.getElementById("searchFilter");
const sortByPric = document.getElementById("sortByPric")

let filteredProduct = [...product]; 

const read = () => {
 let container = document.querySelector("#productsContainer")
 container.innerHTML = "" 
 product.forEach(product =>{
    container.innerHTML += `
     <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>السعر: $${product.price}</p>
      </div> `
      
 })
  slider.innerHTML = "";
  filteredProduct.forEach(product => {
    slider.innerHTML += `<div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>السعر: $${product.price}</p>
      </div> `
  });
}
read()



let count = 0;
const numCards = 3;    

const moveslid = () => {
  const card = document.querySelector(".product-card");
  if (!card) return;

  const gap = 20; 
  const cardWidth = card.offsetWidth + gap;

  slider.style.transform = `translateX(-${count * cardWidth}px)`;
};

next.addEventListener("click", () => {
  if (count < filteredProduct.length - numCards) {
    count += numCards; 
    if (count > filteredProduct.length - numCards) {
      count = filteredProduct.length - numCards;
    }
    moveslid();
    console.log(next);
  }
});

prev.addEventListener("click", () => {
  if (count > 0) {
    count -= numCards;   
    if (count < 0) count = 0;
    moveslid();
  }
});

// تابع للبحث 
searchInput.addEventListener("input", () => {
  const text = searchInput.value.trim().toLowerCase();
  filteredProduct = product.filter(p => p.name.toLowerCase().includes(text));
  read()
  // استاذ هون في داعي احفظ بكل مرة باللوكال 
  // localStorage.setItem("product" , JSON.stringify(product))
});

// تابع للفلترة
searchFilter.addEventListener("change", () => {
  const category = searchFilter.value;
  filteredProduct = product.filter(p => category === "all" ? true : p.category === category);
  read()
  localStorage.setItem("product" , JSON.stringify(product) )
})

// تابع فلترة السعر 
sortByPric.addEventListener("change", () => {
    if (sortByPric.value === "low") {
        filteredProduct.sort((a,b) => a.price - b.price);
    } else {
        filteredProduct.sort((a,b) => b.price - a.price);
    }
localStorage.setItem("product" , JSON.stringify(product) )
    read()
})



