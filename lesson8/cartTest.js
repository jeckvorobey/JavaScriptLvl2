describe('Тест корзины', () => {
    it('Получение данных из Json файла', async () => {
        let newCart = await Cart.create('getCart.json');
        expect(newCart.cartItems[0]).toEqual({
            "id_product": 123,
            "product_name": "Ноутбук",
            "price": 45600,
            "quantity": 1
        });
    });

    it('Тест полученного от пользователя количества удаляемого товара(ноутбук) по умолчанию', async () => {
        let item = await +$('input[data-id="123"]').val();
        expect (item).toBe(1)
    });

    it('Тест стоимости мышки в корзине', 
    async () => {
        let mouse = await $('[data-product="456"].product-price').text();
        // console.log(mouse);
        expect(mouse).toBe('1200 руб.')
    })
})