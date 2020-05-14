//.....................Html element, word, wait time

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

//adding new method of the object
TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<strong class="wrap">'+this.txt+'</strong>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};


const text = document.querySelector(".fade-in");
const strText = text.textContent;
//removing text
text.textContent = "";
const arrayOfText = strText.split("");
for (let i in arrayOfText){
    text.innerHTML += "<em>"+arrayOfText[i]+"</em>";
}
//the following code will repeat for 50 ms. 
let char = 0;
let timer = setInterval(()=>{
    const span = text.querySelectorAll("em")[char];
    span.classList.add('fadeMe');
    char++;
    if(char === arrayOfText.length){
        complete();
        return;
    }
},50);

function workMe(){
    
}
//stop the setInterval executation. 
function complete(){
    clearInterval(timer);
    timer = null;
}