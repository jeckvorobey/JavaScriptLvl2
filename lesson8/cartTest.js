describe('Тест корзины', () => {
    it('Тест полученного от пользователя количества удаляемого товара', () => {
        let countRemove = +$(`.countRemove[data-id="${productId}"]`).val();
        expect (countRemove).toMatch(/\d/g);
    })
})