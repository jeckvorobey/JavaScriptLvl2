class Cart {
    constructor(source, container = '#cart') {
        this.source = source;
        this.container = container;
        this.countGoods = 0; //общее количество товаров в корзине
        this.amount = 0; //общее стоимость товаров
        this.cartItems = [] //массив товаров
        this._init(); //инициализация корзины
    }
    _render() {
        let $cartItemsDiv = $('<div/>', {
            class: 'cart-items-wrap'
        }); //блок обертка
        let $totalCount = $('<div/>', {
            class: 'cart-summary sum-count'
        }); //общая стоимость и количество
        let $totalPrice = $('<div/>', {
            class: 'cart-summary sum-price'
        }); //общая стоимость корзины
        $(this.container).text('Корзина');
        $cartItemsDiv.appendTo($(this.container));
        $totalCount.appendTo($(this.container));
        $totalPrice.appendTo($(this.container));
        // console.log('TCL: Cart -> _render -> container', this.container);
    }
    _init() {
        this._render();
        fetch(this.source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents) {
                    this.cartItems.push(product); //Добавляем товар из масива полученного файла в наш массив
                    this._renderProduct(product); //показываем товар пользователю на странице
                    // console.log('TCL: Cart -> _init -> product', product)
                }
                this.amount = data.amount;
                this.countGoods = data.countGoods;
                this._renderSum(); //отображаем итоговые данные
            })

    }
    //рендер нового товара на странице
    _renderProduct(product) {
        let $product = $('<div/>', {
            class: 'cart-item',
            'data-product': product.id_product //присваиваем индитификатор через data атрибут
        });
        $product.append($(`<p class="product-name">${product.product_name}</p>`));
        $product.append($(`<p class="product-quantity">${product.quantity}</p>`));
        $product.append($(`<p class="product-price">${product.price} руб.</p>`));
        $product.append($(`<input type="text" class="countRemove" data-product="${product.id_product}">`));
        $product.append($(`<img alt="del" src="./icon/garbage.svg" class="removeIcon" data-product="${product.id_product}" title="Удалить">`)) 
        $product.appendTo($('.cart-items-wrap'));
        // console.log('TCL: Cart -> _renderProduct -> containerProduct', $containerProduct)
    }
    //Выводим итоговую сумму
    _renderSum() {
        $('.sum-count').text(`Всего товаров в корзине: ${this.countGoods}`);
        $('.sum-price').text(`Сумма товаров в корзине: ${this.amount}`);
    }

    _updateCart(product) {
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.product-quantity').text(product.quantity);
        $container.find('.product-price').text(`${product.quantity*product.price} руб.`);
    }

    addProduct(element) {
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find) {
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                price:  +$(element).data('price'),
                product_name:  $(element).data('title'),
                quantity: 1
            }
            this.cartItems.push(product);
            this.amount += product.price;
            this.countGoods += product.quantity;
            this._renderProduct(product);
        }
        this._renderSum();
    }

    removeProduct(element) {
        let productId = +$(element).data('id');
		console.log('TCL: Cart -> removeProduct -> productId', productId)
        let countRemove = $(`.countRemove[data-product="${productId}"]`).value;
		console.log('TCL: Cart -> removeProduct -> countRemove', countRemove)
        
        // let find = this.cartItems.find(product => product.id_product === productId);
    }
}