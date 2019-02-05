document.querySelector('nav').addEventListener('click', (event) => {
    if (event.target.text === 'Шкафы') {
        let block = document.getElementById('gallery');

        fetch('cupboard.json')
            .then(result => result.json())
            .then(data => {
                data.forEach(el => {
                    block.innerHTML += `<a href="${el.src}" target="_blank"><img src="${el.src}" alt="${el.alt}"></a>`
                });
            })
            .catch (alert('Файл cupboard.json не найден')); 
    }

})