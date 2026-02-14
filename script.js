window.onload = function(){
    new Slider({
        images: '.gallery .photo img',
        next: '.gallery .tabs .next',
        prev: '.gallery .tabs .prev',
        interval: '2000'
    })
    // ES5
    function Slider(obj) {
        this.images = document.querySelectorAll(obj.images)
        this.btNext = document.querySelector(obj.next)
        this.btPrev = document.querySelector(obj.prev)

        this.prev = function() {
            console.log('prev');

        }

         this.next = function() {
            console.log('next');
                }
         this.btNext.addEventListner('click', this.next)
         this.btPrev.addEventListner('click', this.prev)

    }

    //ES6

}