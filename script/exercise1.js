let btn = document.getElementById('btn1');
btn.addEventListener('click', () => {
    const regExp = /\s'|'$/gm;
    let text = document.getElementById('text').textContent.replace(regExp, '"');
    // console.log(text);
    document.getElementById('text').innerText = text;
})