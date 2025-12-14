let products = JSON.parse(localStorage.getItem("products")) || []
let lastId = parseInt(localStorage.getItem("lastId")) || 0
const addForm = document.querySelector("#productForm")
// اولا رح جيب مكان عرض هي الداتا فانا عرفتمتغير بس سون بدي حطو وبدي تابع للقرءة يلي هيي العرض 
const tbody = document.querySelector("#table tbody")
const productName = document.querySelector("#productName")
const productCategory = document.querySelector("#productCategory")
const productPric = document.querySelector("#productPric")
const productImg = document.querySelector("#productImg")

// تابع القراءة
const read = () => {
    tbody.innerHTML = ""
    products.forEach(product =>{
        tbody.innerHTML += `
        <tr  id="productinfo${product.id}"> 
        <td>${product.id}</td>
        <td>
        <span>${product.name}</span>

            <form class="hidden" onsubmit = "editproductName(event ,${product.id}   )" >
                <input type="text" class ="productName" value="${product.name}" >
                <input type="submit" value="edite">
            </form>
        
        </td>

        <td>
            <span>${product.category}</span>
            <form class="hidden" onsubmit = "editProductCategory(event ,${product.id})">
                <input type="text" class ="productCategory" value="${product.category}" >
                <input type="submit" value="edite">
            </form>
        </td>
        
        <td> 
            <span>$ ${product.Pric}</span>
            <form class="hidden" onsubmit = "editProductPric(event ,${product.id})">
                <input type="text" class ="productPric" value="${product.Pric}" >
                <input type="submit" value="edite">
            </form>
        </td>
        <td>
        
            <span> <a href="${product.image}" target="_blank">${product.image}</a> </span>
            <form class="hidden" onsubmit = "editProductImage(event ,${product.id})">
                <input type="text" class ="productImage" value="${product.image}" >
                <input type="submit" value="edite">
            </form>
        </td>

                <td>
                    <button onclick = "editField(${product.id},2)">editname </button>
                    <button onclick = "editField(${product.id} ,3)">editcategory</button>
                    <button onclick = "editField(${product.id} ,4)">editPric</button>
                    <button onclick = "editField(${product.id} ,5)">editimage</button>
                    <button onclick = "delet(${product.id})">delet</button>
                </td>
        
        </tr>`
    })
}
read()


// تابع اضافة منتج جديد
addForm.addEventListener("submit" , (event) =>{
    event.preventDefault()
    if(productName.value) {
        let newProduct = {
            id : lastId + 1,
            name : productName.value,
            category : productCategory.value,
            Pric : productPric.value,
            image : productImg.value
        }
        lastId++
        products.push(newProduct)
        productName.value = ""
        productImg.value = ""
        productPric.value = ""
         read()
            localStorage.setItem("products" , JSON.stringify(products) )
            localStorage.setItem("lastId" , JSON.stringify(lastId) )
    }
})

// هذا تابع عام للتعديل على اي عمود بدي ياه

const editField = (id, columnNumber) => {
    const tr = document.querySelector(`#productinfo${id}`)
    const td = tr.querySelector(`td:nth-child(${columnNumber})`)
    const span = td.querySelector("span")
    const form = td.querySelector("form")
    span.classList.add("hidden")
    form.classList.remove("hidden")
}

// تابع تعديل اسم المنتج
const editproductName = (event,id) =>{
event.preventDefault()
const input = document.querySelector(`#productinfo${id} .productName `)
products = products.map(products =>{
    if(products.id == id ){
        products.name = input.value
    }
    
    return products 

})
read()
localStorage.setItem("products" , JSON.stringify(products) )
}


// تابع تعديل فئة المنتج 
const editProductCategory = (event,id) =>{
    event.preventDefault()
    const input = document.querySelector(`#productinfo${id} .productCategory`)
    products = products.map(products =>{
    if(products.id == id ){
        products.category = input.value
    }
    return products
})
read()
localStorage.setItem("products" , JSON.stringify(products) )
}


// تابع تعديل سعر المنتج
const editProductPric = (event , id) =>{
    event.preventDefault()
    const input = document.querySelector(`#productinfo${id} .productPric`)
    products = products.map(products =>{
        if(products.id == id ){
        products.Pric = input.value
    }
    return products
})
read()
localStorage.setItem("products" , JSON.stringify(products) )
}

// تابع تعديل صورة المنتج 
const editProductImage = (event , id) =>{
    event.preventDefault()
    const input = document.querySelector(`#productinfo${id} .productImage`)
    products = products.map(products =>{
        if(products.id == id ){
        products.image = input.value
    }
    return products
})
read()
localStorage.setItem("products" , JSON.stringify(products) )
}

// تابع حذف منتج 
const delet = (id) =>{
    products = products.filter(products =>{
        return  products.id != id
    })
    read()
    localStorage.setItem("products" , JSON.stringify(products) )
}