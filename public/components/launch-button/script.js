(function (window, document) {
    console.log('launching component');
    var thatDoc = document;

    var thisDoc = thatDoc.currentScript.ownerDocument;

    var template = thisDoc.querySelector('template').content;

    var MyElementProto = Object.create(HTMLElement.prototype);

    MyElementProto.createdCallback = function () {
        var shadowRoot = this.createShadowRoot();

        clone = thatDoc.importNode(template, true);
        shadowRoot.appendChild(clone);

        this.div = shadowRoot.querySelector('div');

        console.log('element created');
    }

    MyElementProto.attributeChangedCallback = function(attr, oldVal, newVal){
        if(attr === 'id')
            this.addEventListener('mousedown',function(event){
                console.log('onmousedown!' + this);
                var audio = audioChannels.get(this.id);
                if (audio.paused) {
                    audio.play();
                }else{
                    audio.currentTime = 0
                }
                this.div.classList.add('bg-blue');
                console.log(this.div,"added");
            });
        this.addEventListener('touchstart',function(event){
            event.preventDefault();
            console.log('onmousedown!' + this);
            var audio = audioChannels.get(this.id);
            if (audio.paused) {
                audio.play();
            }else{
                audio.currentTime = 0
            }
            this.div.classList.add('bg-blue');
            console.log(this.div,"added");
        });
        this.addEventListener('mouseup',function(event){
            console.log('onmouseup!');
            this.div.classList.remove('bg-blue');
            console.log(this.div,"removed");

        });
        this.addEventListener('touchend',function(event){
            console.log('onmouseup!');
            this.div.classList.remove('bg-blue');
            console.log(this.div,"removed");

        });

        this.addEventListener('mouseout',function(event){
            this.div.classList.remove('bg-blue');
        });
    };
    window.MyElement = thatDoc.registerElement('launch-button', {
        prototype: MyElementProto
    });
})(window, document);