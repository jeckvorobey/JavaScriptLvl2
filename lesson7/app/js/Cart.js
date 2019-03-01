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
        let $removeBtn = $('<img/>', {
            'class': 'removeIcon',
            'alt': 'del',
            'src': './images/icon/garbage.svg',
            'title': 'Удалить',
            'data-id': product.id_product,
        });
        $product.append($(`<p class="product-name">${product.product_name}</p>`));
        $product.append($(`<p class="product-quantity">${product.quantity}</p>`));
        $product.append($(`<p class="product-price">${product.price} руб.</p>`));
        $product.append($(`<input type="text" class="countRemove" data-id="${product.id_product}" value="1">`));
        $product.append($removeBtn);
        $removeBtn.click(e => {
            this.removeProduct(e.target);
        });
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
                price: +$(element).data('price'),
                product_name: $(element).data('title'),
                quantity: 1
            }

            this.cartItems.push(product);
            this.amount += product.price;
            this.countGoods += product.quantity;
            this._renderProduct(product);
        }
        this._renderSum();
    }

    //удаляем товар из корзины
    removeProduct(element) {
        let productId = +$(element).data('id');
        let countRemove = +$(`.countRemove[data-id="${productId}"]`).val();
        // console.log(countRemove);
        let find = this.cartItems.find(product => product.id_product === productId);
        if (countRemove === 0 || countRemove > find.quantity) {
            $(`.countRemove[data-id="${productId}"]`).addClass('removeError');
        } else if (countRemove < find.quantity) {
            $(`.countRemove[data-id="${productId}"]`).removeClass('removeError');
            find.quantity -= countRemove;
            this.countGoods -= countRemove;
            this.amount -= find.price * countRemove;
            this._updateCart(find);
        } else {
            $(`.countRemove[data-id="${productId}"]`).removeClass('removeError');
            $(`div[data-product="${productId}"]`).remove();
            this.countGoods -= countRemove;
            this.amount -= find.price * countRemove;
            //Удаляем из массива продукт
            this.cartItems.splice(this.cartItems.indexOf(find), 1);
            // console.log(this.cartItems);

        }
        this._updateCart(find);

        this._renderSum();
    }
}