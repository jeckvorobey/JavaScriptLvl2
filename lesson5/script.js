class Product {
    constructor(id, title, price, img = 'https://placehold.it/200x150', container = '#products'){
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
        this.container - container;
        this._render();
    }
    _render(){
        let $wrapper = $('<div/>', {
            class: 'product'
        });
        let $desc = $('<div/>', {
            class: 'desc'
        });
        let $img = $();
    }

}