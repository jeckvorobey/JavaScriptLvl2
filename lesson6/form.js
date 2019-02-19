Vue.component('form-item', {
    props: ['form'],
    data: function() {
        return {
            author: '',
            text: '',
            approved: false,
            id: ''
        }
    },
    template: `
    <div class="form">
    <label for="name">Ваше имя: </label>
    <input class="nameAuthor" id="name" type="text" v-model="author">
    <label for="textComment">Текст комментария: </label>
    <textarea name="textComment" id="textComment" v-model="text" cols="30" rows="10"></textarea>
    <button class="submit-btn" v-on:click.stop="$emit('addComment', $event.target)" type="submit">Отправить</button>
    </div>
    ` 
});