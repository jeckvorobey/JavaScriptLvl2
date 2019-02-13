$(document).ready(() => {
    //Товары
    let product1 = new Product(123, 'Ноутбук', 45600);
    let product2 = new Product(456, 'Мышка', 1200);
    let product3 = new Product(131, 'Клавиатура', 1600);

    //Инициализируем новую корзину
    let cart = new Cart('getCart.json');

    //добавление товара
    $('.buy-btn').click(e => {
        cart.addProduct(e.target);
		// console.log('TCL: e.target', e.target)
    });
    
});