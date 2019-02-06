const nameRegexp = /^[a-zа-яё]{2,30}$/i;
const emailRegexp = /^([\w\.-]+)@([\w]+)\.([\w]{2,10})$/i;
const phoneRegexp = /^\+[0-9]{1,3}\((\d{3})\)(\d{3}\-\d{2}\-\d{2})$/;


// let email = new CheckForm(document.querySelector('email'), emailRegexp);
// let phone = new CheckForm(document.querySelector('phone'), phoneRegexp);

class CheckForm {
    constructor(val, regexp){
        this.val = val;
        this.regexp = regexp;
    }
    check(){
        let test = this.regexp.test(this.val.value);
        console.log(test);
    }
    formErr() {

    }
}


window.onload = () => {
    let name = new CheckForm(document.querySelector('name'), nameRegexp);

    // let btn = document.getElementById('btnSubmit');
    // btn.addEventListener('click', () => {
    //     name.check();
    // })
    

    let form = document.getElementById('form')
    form.addEventListener('submit', e => {
        name.check();
        e.preventDefault();
    })
}