Vue.component('comment-item', {
    props: ['comment'],
    template: `
    <div class="comment" v-bind:data-id="comment.id">
        <h3 class="author">{{comment.author}}</h3>
        <p class="text">{{comment.text}}</p>
        <button v-on:click="$emit('remove', $event.target)" class="remove-btn" v-bind:data-id="comment.id">Удалить</button>
    </div>
    `
});