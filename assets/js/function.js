import selectors from "./selector.js";
import navClick from "./navClick.js";
import { productUi } from "./productShowUi.js";
import allproducts from "./allProduct.js";


let productArr = []
// getting id from product button

function getId(elem){
    let prodId = elem.classList[0].split('-')[1];
    // console.log(id);
    return prodId
}

// seve products in localStorage
let localProdArr = []
function productInLocalStorage(elem){
    if(localStorage.getItem('ProductsItem')){
        let localProdArr = JSON.parse(localStorage.getItem('ProductsItem'))
        localProdArr.push(elem)
        localStorage.setItem('ProductsItem', JSON.stringify(localProdArr))
    }else{
        localProdArr = []
        localProdArr.push(elem)
        localStorage.setItem('ProductsItem', JSON.stringify(localProdArr))
    }
}

// product add in localStorage for cart page
// let productCartArr = []
let localproductCartArr = []
function cartPageLocaStorage(elem){
    if(localStorage.getItem('CartProduct')){
        localproductCartArr = JSON.parse(localStorage.getItem('ProductsItem'))
        localproductCartArr.push(elem)
        localStorage.setItem('CartProduct', JSON.stringify(localproductCartArr))
    }else{
        localproductCartArr = []
        localproductCartArr.push(elem)
        localStorage.setItem('CartProduct', JSON.stringify(localproductCartArr))
    }
}

// product button disabler

// index page function
const indexPage = {
    indexPageFunc(){
        // selecting all dom
        const {
            tabButtonsElm,
            bestSaleTabBtnElm,
            summerSaleTabBtnElm,
            newSaleTabBtnElm,
            tabProductSummElm
        } = selectors.allSelectors()

        // navClick function
        navClick.navClickFunc()

        // tab buttons function
        bestSaleTabBtnElm.addEventListener('click', () => {
            this.bestSellFunc()
        })
        summerSaleTabBtnElm.addEventListener('click', () => {
            this.summerSellFunc()
        })
        newSaleTabBtnElm.addEventListener('click', () => {
            this.newInFunc()
        })


        document.addEventListener('DOMContentLoaded', () => {
            this.bestSellFunc()
        })
    },

    bestSellFunc(){
        const {
                tabButtonsElm,
                bestSaleTabBtnElm,
                summerSaleTabBtnElm,
                newSaleTabBtnElm,
                tabProductSummElm
        } = selectors.allSelectors()

        tabProductSummElm.innerHTML = ''
        bestSaleTabBtnElm.style.fontWeight = '600'
        summerSaleTabBtnElm.style.fontWeight = 'normal'
        newSaleTabBtnElm.style.fontWeight = 'normal'

        let solitimeArr = []
        allproducts.sort( (a,b) => a-b)
        allproducts.map( elem => {
                solitimeArr.push(elem.SoldTime)
                solitimeArr.sort( (a,b) => b - a)               
        })
        const sliceSolTimeArr = solitimeArr.slice(0, 4)
        for(let i = 0 ; i < sliceSolTimeArr.length; i++){
            allproducts.map( elem => {
                if(elem.SoldTime === sliceSolTimeArr[i]){
                    productUi.showInuI(elem)
                }        
            })   
        }

        const allGetBtn = document.querySelectorAll('.getBtn')
        for(let i = 0; i < allGetBtn.length; i++){
            allGetBtn[i].addEventListener('click', e => {
                window.location.replace('productsDetails.html')
                const prodId = getId(e.target)
                allproducts.find( elem => {
                    if(elem.id === Number(prodId)){
                        productArr.push(elem)
                        // console.log(productArr);
                        productInLocalStorage(elem)
                    }
                })
            })
        }
    },

    summerSellFunc(){
        const {
            tabButtonsElm,
            bestSaleTabBtnElm,
            summerSaleTabBtnElm,
            newSaleTabBtnElm,
            tabProductSummElm
        } = selectors.allSelectors()

        tabProductSummElm.innerHTML = ''

        bestSaleTabBtnElm.style.fontWeight = 'normal'
        summerSaleTabBtnElm.style.fontWeight = '600'
        newSaleTabBtnElm.style.fontWeight = 'normal'

        allproducts.map( elem => {
            if(elem.SellsType === 'SummerSale'){
                // console.log(elem);
                productUi.showInuI(elem)
            }
        })
        const allGetBtn = document.querySelectorAll('.getBtn')
        for(let i = 0; i < allGetBtn.length; i++){
            allGetBtn[i].addEventListener('click', e => {
                window.location.replace('productsDetails.html')
                const prodId = getId(e.target)
                allproducts.find( elem => {
                    if(elem.id === Number(prodId)){
                        productArr.push(elem)
                        // console.log(productArr);
                        productInLocalStorage(elem)
                    }
                })
            })
        }
       
    },

    newInFunc(){
        const {
            tabButtonsElm,
            bestSaleTabBtnElm,
            summerSaleTabBtnElm,
            newSaleTabBtnElm,
            tabProductSummElm
        } = selectors.allSelectors()
        tabProductSummElm.innerHTML = ''
        bestSaleTabBtnElm.style.fontWeight = 'normal'
        summerSaleTabBtnElm.style.fontWeight = 'normal'
        newSaleTabBtnElm.style.fontWeight = '600'

        allproducts.map( elem => {
            if(elem.SellsType === 'new')
            productUi.showInuI(elem)
        })
        const allGetBtn = document.querySelectorAll('.getBtn')
        for(let i = 0; i < allGetBtn.length; i++){
            allGetBtn[i].addEventListener('click', e => {
                window.location.replace('productsDetails.html')
                const prodId = getId(e.target)
                allproducts.find( elem => {
                    if(elem.id === Number(prodId)){
                        productArr.push(elem)
                        // console.log(productArr);
                        productInLocalStorage(elem)
                    }
                })
            })
        }

    }
}

// products details page function
const productDetailsPage = {
    productDetils(){
        const {
            prodDetialsProdUiElm
        } = selectors.allSelectors()
        const productFromLocalStorage = JSON.parse(localStorage.getItem('ProductsItem'))
        // console.log(productFromLocalStorage);
        productFromLocalStorage.map( elem => {
            const htmlElm = `
            <div class="product-images">
                <img src="${elem.ProductsImage}" alt="">
                <img src="${elem.ProductsImage}" alt="">
            </div>

            <div class="product-all-types">
                <div class="prod-types">
                    <p><span id="proName">
                        ${elem.ProductsName}
                    </span><br>
                    <span id="proprice">${elem.ProductsPrice}</span></p>
                </div>

                <div class="prod-colors">
                    <p>Choose your color and
                        Size
                    </p>

                    <select name="" id="productColorSelect">
                        <option value="" selected>Select Color</option>
                        <option value="black">Black</option>
                        <option value="green">Green</option>
                        <option value="lightblue">Lightblue</option>
                        <option value="yellow">Yellow</option>
                    </select>

                    <select name="" id="productSizeSelect">
                        <option value="" selected>Select Size</option>
                        <option value="33">33</option>
                        <option value="35">35</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                    </select>
                </div>

                <div class="prod-size">

                </div>

                <button id="addCartBtn">Add to cart</button>
            </div>
            `

            prodDetialsProdUiElm.insertAdjacentHTML('beforeend', htmlElm)

            document.querySelector('#productColorSelect').addEventListener('change', e => {
                elem.ProductColor = e.target.value
            })

            document.querySelector('#productSizeSelect').addEventListener('change', e => {
                elem.ProductSize = e.target.value
                console.log(elem);

            })

            document.querySelector('#addCartBtn').addEventListener('click', () => {
                    cartPageLocaStorage(elem)
                    window.location.replace('productCart.html')
                    localStorage.removeItem('ProductsItem')
            })
            
        })

    }
}

// product cart page function
const productCartPage = {
    productCartFunc(){
        const {
            fullCartElm
        } = selectors.allSelectors()

        const cartItemFromLocalStorage = JSON.parse(localStorage.getItem('CartProduct'))

        cartItemFromLocalStorage.map( elem => {
            const htmlElm = `
            <div class="carted">
            <div class="cartLeftSide">
                <div class="addedProduct">
                    <p id="close">close</p>
                    <div class="proImage">
                        <img src="${elem.ProductsImage}" alt="">
                    </div>
                    <div class="proDetails">
                        <p><span>${elem.ProductsName}</span></p>
                        <p><span>${elem.ProductColor}</span></p>
                        <p><span>${elem.ProductSize}</span></p>
    
                        <div class="quantity">
                            <button id="minusQuan">-</button>
                            <input type="number" min="1">
                            <button id="plusQuan">+</button>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="cartRightSide">
                
                <div class="cartAdd">
                    <p><span>Subtotal</span> <span><b>${elem.ProductsPrice}</b></span></p>
                    <p><!--- <span>Shipping</span> <span><b>calculated</b> -->
                    </span></p>
                    
                </div>
    
                <button id="checkOutBtn">Checkout</button>
    
                <div class="extBtns">
                    <button><a href="allproducts.html">continue shopping</a></button>
                    <button>clear cart</button>
                </div>
            </div>
        </div>
            `
            fullCartElm.insertAdjacentHTML('beforeend', htmlElm)
        })
    }
}



// all product page function
const allProductPage = {
    allProductShow(){
        const {
            allProductShowElm
        } = selectors.allSelectors()
        allproducts.map(elem => {
            const htmlElm = `
            <div class="allProBox">
            <div class="proImg">
                <img src="${elem.ProductsImage}" alt="product image">
            </div>
            <div class="proDetials">
                <p><span id="proName">${elem.ProductsName}</span> <br>
                <span id="protype">${elem.ProductsType}</span><br>
                <span id="proprice">${elem.ProductsPrice}</span></p>
            </div>
            <button class="id-${elem.id} getBtn">Buy Now</button>
        </div>
            `

            allProductShowElm.insertAdjacentHTML('beforeend', htmlElm)
        })
    }
}

export {
    indexPage,
    allProductPage,
    productDetailsPage,
    productCartPage
}