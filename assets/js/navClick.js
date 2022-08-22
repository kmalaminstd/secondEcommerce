import selectors from "./selector.js";

const navClick = {
    navClickFunc(){
        const {
            dropdownMenu,
            dropSubMenu
        } = selectors.allSelectors()

        dropdownMenu.addEventListener('click', e => {
            e.preventDefault()
            dropSubMenu.classList.toggle('show')
        })
    }
}

export default navClick