//javaScript type writer
function typeWriter(txtElement,words,period){
    this.textElement = txtElement;
    this.words= words;
    this.txt = "";
    this.index = 0;
    this.wait = parseInt(period,10) || 2000;
    this.type();
    this.isDeleting = false;
}


//type method
typeWriter.prototype.type = function(){
    //get full text of current words
    const current = 0;
    const fullText = this.words[current];
    
//check if it is deleting
    if(this.isDeleting){
        //remove our character
        this.txt = fullText.substring(0,this.txt.length -1);
    }
    else{
        //add character
        this.txt = fullText.substring(0,this.txt.length + 1);
    }
    //insert txt into element
    this.textElement.innerHTML = `<b class = "txt">${this.txt}</b>`

    //type speed
    let speed = 200 - Math.random() * 100;
    if(this.isDeleting){
        speed /= 2;
    }
    //if word is complete and if deleting
    if(!this.isDeleting && this.txt == fullText){
        //pause at the end.
        speed = this.wait;
        this.isDeleting = true;
    }
    else if(this.isDeleting && this.txt === ""){
        this.isDeleting = false;
        this.index++;
        speed = 500;
    }
    setTimeout(()=>{
        return this.type();
    }, speed)
}

//init DOM
//even when the DOM is fully loaded.
window.onload = ()=>{
    const txtElement = document.querySelector(".typewrite");
    const words = JSON.parse(txtElement.getAttribute("data-type"));
    const wait = txtElement.getAttribute("data-period");
    //const myTxt = document.querySelector(".wrap");

    //init an object
    new typeWriter(txtElement,words,wait);
}


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