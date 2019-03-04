new Vue({
    el: '#app',
    data: {
        comments: [],
        curID: 0,
        newComment: '',
    },
    mounted() {
        that = this;
        fetch('feedback.json')
            .then(result => result.json())
            .then(data => {
                that.comments = data.comments;
                that.curID = data.maxID;
            });
    },
    methods: {
        remove: function (elem) {
            let elemId = +elem.dataset.id;
            let find = this.comments.find(comment => comment.id === elemId);
            this.comments.splice(this.comments.indexOf(find), 1);
            
        },
        addComment: function(elem) {
            // ++this.curID;
            // this.comments.push(this.newComment);
        }
    }
});