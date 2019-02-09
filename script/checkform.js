const nameRegexp = /^[a-zа-яё]{2,30}$/i;
const emailRegexp = /^([\w\.-]+)@([\w]+)\.([\w]{2,10})$/i;
const phoneRegexp = /^\+[0-9]{1,3}\((\d{3})\)(\d{3}\-\d{2}\-\d{2})$/;

class CheckForm {
    constructor(val, regexp) {
        this.val = val;
        this.regexp = regexp;
    }
    check() {
        let test = this.regexp.test(this.val.value);
        console.log(test);
        if (!test) {
            document.getElementById(`${this.val.id}FormErr`).classList.add('showFormErr');
        } else if (test && document.getElementById(`${this.val.id}FormErr`).classList.contains('showFormErr')) {
            document.getElementById(`${this.val.id}FormErr`).classList.remove('showFormErr');
        }
    }
}


window.onload = () => {
    let name = new CheckForm(document.getElementById('name'), nameRegexp);
    let email = new CheckForm(document.getElementById('email'), emailRegexp);
    let phone = new CheckForm(document.getElementById('phone'), phoneRegexp);

    document.getElementById('form').addEventListener('submit', e => {
        e.preventDefault();
        name.check();
        email.check();
        phone.check();
    })
}