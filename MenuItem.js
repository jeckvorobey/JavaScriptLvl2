class MenuItem {
    constructor(href, title, subItems) {
        this.href = href;
        this.title = title;
        this.subItems = subItems;
    }
    render() {
        let result = `<li><a href="${this.href}">${this.title}</a>`;  
        result += `<ul>`;
        for (let subItem of this.subItems) {
            if (subItem instanceof SubMenu) {
                result += subItem.render();
            } 
        }
        result += `</ul></li>`;
        return result;
    }
}