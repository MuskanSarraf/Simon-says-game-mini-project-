// Event Bubbling
// let div=document.querySelector("div");
// let ul=document.querySelector("ul");
// let lis=document.querySelectorAll("li");

// div.addEventListener("click",function(){
//     console.log("div was clicked");
// });
// ul.addEventListener("click",function(event){
//     // event.stopPropagation();
//     console.log("ul was clicked");
// });
// for(let li of lis){
// li.addEventListener("click",function(event){
//     //event.stopPropagation();
//     console.log("li was clicked");
// });
// }


//simon says game
let gameseq=[];
let userseq=[];

let btns=["yellow","red","purple","green"]

let started=false;
let level=0;

let h2=document.querySelector("h2");


document.addEventListener("keypress",function(){
    if(started==false){
    console.log("game started!!");
    started=true;

    levelup();
    }
});

function gameflash(btn){
btn.classList.add("flash");
setTimeout(function(){
    btn.classList.remove("flash");
},250);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelup(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;

    //random btn choose
    let randomidx=Math.floor(Math.random()*4);
    let randomcolor=btns[randomidx];
    let randombtn=document.querySelector(`.${randomcolor}`);
    // console.log(randomidx);
    // console.log(randomcolor);
    // console.log(randombtn);
    gameseq.push(randomcolor);
    console.log(gameseq);
    gameflash(randombtn);
}

function checkans(idx){
//console.log("curr level:",level);
//let idx=level-1;

if(userseq[idx]===gameseq[idx]){
    if(userseq.length==gameseq.length){
    setTimeout( levelup,1000);
    }
}else{
    h2.innerHTML=`Game over!! your score was <B>${level}</B> <br>Press any key to start`;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
    document.querySelector("body").style.backgroundColor="white";
    },150);
    reset();
}
}

function btnpress(){
   // console.log(this);
    let btn=this;
    userflash(btn);

    usercolor=btn.getAttribute("id");
    //console.log(usercolor);
    userseq.push(usercolor);

    checkans(userseq.length-1);
}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}