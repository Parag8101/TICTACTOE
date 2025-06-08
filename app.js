let boxes=document.querySelectorAll(".box")
let rstbtn=document.querySelector('#rstbtn')
let newGameBtn=document.querySelector('#newbtn')
let msgContainer=document.querySelector('.msg-container')
let msg=document.querySelector("#msg")
let turn0=true;
let count=0;
let winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame=()=>{
    turn0=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add('hide')
}

const showDraw = () => {
    msg.innerText = "🤝 It's a draw! No winner.";
    msgContainer.classList.remove('hide');
    disableBoxes();
};

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText=""
    }
}

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulation. Winner is  ${winner}`;
    msgContainer.classList.remove('hide')
    disableBoxes();
}

const checkWinner=()=>{
    for( let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val!=''&&pos2Val!=''&&pos3Val!=''){
            if(pos1Val===pos2Val&&pos2Val===pos3Val){
                showWinner(pos1Val);
                return;
            }
        }
    }
    if (count === 9) {
        showDraw();
    }
}

boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        if(turn0){
            box.innerHTML="O";
            turn0=false;
        }else{
            box.innerHTML="X";
            turn0=true;
        }
        box.disabled=true;
        count++;
        checkWinner();
    }
    );
});

newGameBtn.addEventListener("click",resetGame);
rstbtn.addEventListener("click",resetGame);