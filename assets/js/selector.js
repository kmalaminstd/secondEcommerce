const selectors = {
    allSelectors(){
        const dropdownMenu = document.querySelector('#mainMenu')
        const dropSubMenu = document.querySelector('#submenu')
        const tabButtonsElm = document.querySelector('.tab-buttons')
        const bestSaleTabBtnElm = document.querySelector('.bestSaleBtn')
        const summerSaleTabBtnElm = document.querySelector('.summerSaleBtn')
        const newSaleTabBtnElm = document.querySelector('.newInBtn')
        const tabProductSummElm = document.querySelector('.productSumm')
        const allProductShowElm = document.querySelector('.allProducts')
        const prodDetialsProdUiElm = document.querySelector('.cart-products')
        const fullCartElm = document.querySelector('.fullCart')
        const mensProductPageElm = document.querySelector('.allProducts') ;
        const womensProductPageElm = document.querySelector('.allProducts')
        const genderFilterElm = document.querySelector("#genderFilter")


        return{
            dropdownMenu,
            dropSubMenu,
            tabButtonsElm,
            bestSaleTabBtnElm,
            summerSaleTabBtnElm,
            newSaleTabBtnElm,
            tabProductSummElm,
            allProductShowElm,
            prodDetialsProdUiElm,
            fullCartElm,
            mensProductPageElm,
            womensProductPageElm,
            genderFilterElm
        }
    }
}

export default selectors