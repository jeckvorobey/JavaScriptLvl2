
let $citySelect = $('#city');
let $searchSity = $('#cityList')

$(document).ready(() => {
    $.ajax({
        type: "get",
        url: "../lesson4/Cities.json",
        dataType: "json",
        success: (data) => {
            for (let i of data) {
                let city = $(`<option value="${i.City}">${i.City} \(${i.Region}\)</option>`);
                let searchSity = $(`<option value="${i.City} \(${i.Region}\)"></option>`);
                $citySelect.append(city);
                $searchSity.append(searchSity);
            }
        },
        error: () => {
            alert('файл Cities.json не найден');
        }
    });

    //маска телефона 
    $('#phone').mask('+7(000)000-00-00', {
        translation: {
            '+7': {
                pattern: /\+[0-9]{1,3}/,
                optional: true
            }
        }
    })


    //Переключатели Тав
    $('.tabContent').hide();
    $('.tabContent:first').show();
    $('.wrapper div').click( (e) => { 
        $('.tab').removeClass('whiteBorder');
        $(e.target).addClass('whiteBorder');
        $('.tabContent').hide();
        let selectTab = $(e.target).find('a').attr("href");
        $(selectTab).fadeIn();
        
    });
});
