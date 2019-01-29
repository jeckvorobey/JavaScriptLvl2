class SubMenu extends MenuItem {
    constructor(href, title) {
    super (href, title);
    }
    render(){
        return `<li><a href="${this.href}">${this.title}</a></li>`;
    }
}