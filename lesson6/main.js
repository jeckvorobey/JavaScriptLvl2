new Vue({
    el: '#app',
    data: {
        comments: [],
        curID: 0,
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
            // console.log(this.curID);
            this.comments.splice(this.comments.indexOf(elem), 1); 
        },
        addComment: function(elem) {
            // ++this.curID;
        }
    }
});