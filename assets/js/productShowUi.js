import selectors from "./selector.js";

const productUi = {
    showInuI(elem){
        const {
            tabProductSummElm
        } = selectors.allSelectors()

        
        const htmlElm = `
            <div class="id-${elem.id} productBox">
                <div class="prodImg">
                    <img src="${elem.ProductsImage}">
                </div>
                <div class="prod-details">
                    <p id="prodName">${elem.ProductsName}</p>
                    <p id="prodType">${elem.ProductsType}</p>
                    <p id="prodPice">${elem.ProductsPrice}</p>
                </div>
                <button class="id-${elem.id} getBtn">Get it now</button>
            </div>
        `

        tabProductSummElm.insertAdjacentHTML('beforeend', htmlElm)


        // console.log(elem);
    }
}

export {
    productUi
}
