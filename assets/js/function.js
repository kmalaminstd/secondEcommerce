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
        localproductCartArr = JSON.parse(localStorage.getItem('CartProduct'))
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
    // async fetchDataFromJson(){
    //     const res = await fetch('allProduct.json')
    //     const result = await res.json()
    //     console.log(result);
    // },
    indexPageFunc(){
        // selecting all dom
        const {
            tabButtonsElm,
            bestSaleTabBtnElm,
            summerSaleTabBtnElm,
            newSaleTabBtnElm,
            tabProductSummElm
        } = selectors.allSelectors()

        // this.fetchDataFromJson()

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
            prodDetialsProdUiElm.innerHTML = ''
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

            let productColor = ''
            let productSize = ''

            document.querySelector('#productColorSelect').addEventListener('change', e => {
                elem.ProductColor = e.target.value
                productColor = e.target.value
            })

            document.querySelector('#productSizeSelect').addEventListener('change', e => {
                elem.ProductSize = e.target.value
                productSize = e.target.value
            })

            document.querySelector('#addCartBtn').addEventListener('click', () => {
                if(!productColor && !productSize){
                    alert('Invalid field')
                }else{
                    // const prodSizeVal = document.querySelector('')
                    cartPageLocaStorage(elem)
                    window.location.replace('productCart.html')
                    localStorage.removeItem('ProductsItem')
                }
                
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
        let quantityValue = 1
        // nav click function
        navClick.navClickFunc()
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
                        <p><b>${elem.ProductsName}</b></p>
                        <p><b>${elem.ProductColor}</b></p>
                        <p><b>${elem.ProductSize}</b></p>
    
                        <div class="quantity">
                            <button id="minusQuan">-</button>
                            <input type="number" min="1" value="${quantityValue}" id="quanVal">
                            <button id="plusQuan">+</button>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="cartRightSide">
                
                <div class="cartAdd">
                    <p><b>Product Price</b> <span><b>${elem.ProductsPrice}</b></span></p>
                    <p><!--- <span>Shipping</span> <span><b>calculated</b> -->
                    </span></p>
                    
                </div>
    
                <button id="checkOutBtn">Checkout</button>
    
                <div class="extBtns">
                    <button><a href="allproducts.html">continue shopping</a></button>
                    <button id="cartCleartBtn">clear cart</button>
                </div>
            </div>
        </div>
            `
            fullCartElm.insertAdjacentHTML('beforeend', htmlElm)
            const allPlusBtn = document.querySelectorAll('#plusQuan')
            const allMinBtn =document.querySelectorAll('#minusQuan')
            const quantityValElm = document.querySelectorAll('#quanVal')
            const allClearBtn = document.querySelectorAll('#cartCleartBtn')
            const alCloseBtn = document.querySelectorAll('#close')
            const allCartElm = document.querySelectorAll('.carted')
            for(let i = 0 ; i < allPlusBtn.length; i++){
                allPlusBtn[i].addEventListener('click', () => {
                    quantityValElm[i].value++
                })
                allMinBtn[i].addEventListener('click', () => {
                    quantityValElm[i].value--
                })
                allClearBtn[i].addEventListener('click', () => {
                    localStorage.removeItem('CartProduct')
                    fullCartElm.innerHTML = ''
                })
                alCloseBtn[i].style.cursor = 'pointer'
                alCloseBtn[i].addEventListener('click', () => {
                    allCartElm[i].style.display = 'none'
                })
            }
            
        })
    }
}

// all product page function
const allProductPage = {
    allProductShow(){
        const {
            genderFilterElm,
            allProductShowElm
        } = selectors.allSelectors()
        let isTriggered = true

        // nav click function
        navClick.navClickFunc()

        genderFilterElm.addEventListener('change', e => {
           allProductShowElm.innerHTML = ''
           allproducts.map( elem => {
            if(elem.category === e.target.value){
                this.showInUi(elem)
            }
           }) 
        })

        allproducts.map(elem => {
            this.showInUi(elem)
        })
        
    },
    
    buyFunction(allBuyBtn){
        for(let i = 0; i < allBuyBtn.length; i++){
            allBuyBtn[i].addEventListener('click', e => {
                const prodId = getId(e.target)
                window.location.replace('productsDetails.html')
                allproducts.map( elem => {
                    if(elem.id === Number(prodId)){
                        productArr.push(elem)
                        console.log(productArr);
                        productInLocalStorage(elem)
                    }
                })
            })
        }
    },
    showInUi(elem){
        const {
            allProductShowElm
        } = selectors.allSelectors()
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

            const allBuyBtn =document.querySelectorAll('.getBtn')
            
                this.buyFunction(allBuyBtn)
                
    }
}

// mens product function
const mensProductPage = {
    mensProductFunc(){
        const {
            mensProductPageElm
        } = selectors.allSelectors()


        // nav click function
        navClick.navClickFunc()

        allproducts.map( elem => {
            // mensProductPageElm.innerHTML = ''
            if(elem.category === 'men'){
                const htmlElm = `
                <div class="allProBox">
                <div class="proImg">
                    <img src="${elem.ProductsImage}" alt="Product Image">
                </div>
                <div class="proDetials">
                    <p><span id="proName">${elem.ProductsName}</span> <br>
                    <span id="protype">${elem.ProductsType}</span><br>
                    <span id="proprice">${elem.ProductsPrice}</span></p>
                </div>
                <button class="${elem.id} getBtn">Buy Now</button>
                 </div>
                `
                mensProductPageElm.insertAdjacentHTML('beforeend', htmlElm)

                const allBuyBtn =document.querySelectorAll('.getBtn')
                this.buyFunction(allBuyBtn)
            }
        })
    },
    buyFunction(allBuyBtn){
        for(let i = 0; i < allBuyBtn.length; i++){
            allBuyBtn[i].addEventListener('click', e => {
                const prodId = getId(e.target)
                window.location.replace('productsDetails.html')
                allproducts.map( elem => {
                    if(elem.id === Number(prodId)){
                        productArr.push(elem)
                        console.log(productArr);
                        productInLocalStorage(elem)
                    }
                })
            })
        }
    }
}

// womens product function
const womensProductPage = {
    womensProductFunc(){
        const {
            womensProductPageElm
        } = selectors.allSelectors()


        // nav click function
        navClick.navClickFunc()

        allproducts.map( elem => {
            // mensProductPageElm.innerHTML = ''
            if(elem.category === 'women'){
                const htmlElm = `
                <div class="allProBox">

                <div class="proImg">
                    <img src="${elem.ProductsImage}" alt="">
                </div>
                <div class="proDetials">
                    <p><span id="proName">${elem.ProductsName}</span> <br>
                    <span id="protype">${elem.ProductsType}</span><br>
                    <span id="proprice">${elem.ProductsPrice}</span></p>
                </div>
                <button class="id-${elem.id} getBtn">Buy Now</button>
                </div>
                `
                womensProductPageElm.insertAdjacentHTML('beforeend', htmlElm)
                const allBuyBtn = document.querySelectorAll('.getBtn')
                this.buyFunction(allBuyBtn)
                // console.log(this.buyFunction(allBuyBtn));
            }
        })
    },
    buyFunction(allBuyBtn){
        
        for(let i = 0; i < allBuyBtn.length; i++){
            
            allBuyBtn[i].addEventListener('click', e => {
                const prodId = getId(e.target)
                window.location.replace('productsDetails.html')
                allproducts.map( elem => {
                    if(elem.id === Number(prodId)){
                        console.log(elem);
                        productArr.push(elem)
                        // console.log(productArr);
                        productInLocalStorage(elem)
                    }
                })
            })
        }
    }
}

export {
    indexPage,
    allProductPage,
    productDetailsPage,
    productCartPage,
    mensProductPage,
    womensProductPage
}