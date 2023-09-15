// Game constants and variables
let inputDir = {x: 0, y: 0};  /* when game starts as we don't
                            want see the snake in moving condition 
                             so we gave its direction of movement 0,0*/

const foodSound = new Audio('food.mp3');            //   defining sounds
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 5;
let score = 0;
// let maxScoreVal=0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];                  // initial position of head when snake starts and contains 
                   // positions of the snake head during the game
let food = {x: 6, y: 7};  // position of food

// Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();

}

function isCollide(sarr){
    // if snake bumps into itself
    for(let i=1; i<sarr.length; i++){
        if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y){
            return true;
        }
    }
    // if you bump into the wall
    if(sarr[0].x<=0 || sarr[0].x>=18 || sarr[0].y<=0 || sarr[0].y>=18){
        return true;
    }
    return false;
}

function gameEngine(){
    // Part-1 : updating the snake array and food
    if(isCollide(snakeArr)){    // if snake collides 
        gameOverSound.play();
        musicSound.pause();
        inputDir={x: 0, y: 0};
        alert("Game Over. Press any key to play again");
        // if(score>maxScoreVal){
        //     maxScoreVal=score;
        //     maxscorediv.innerHTML="Max Score: "+maxScoreVal;
        // }
        scorediv.innerHTML="Score: 0";
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score=0;
        
    }
    // If you have eaten the food,increase score and regenerate food 
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score+=1;
        if(score>maxScoreVal){
            maxScoreVal=score;
            maxscorediv.innerHTML="Max Score: " + maxScoreVal;
            localStorage.setItem("maxScore", JSON.stringify(maxScoreVal));
        }
        scorediv.innerHTML="Score: "+score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        /* here we are adding the food at the beginning of the array and using part-2
        part of this function the display of snake (head and body) will be alright */
        //unshift adds an element at the beginning of the array

        //we are generating a new food at some random location using formula
        //Math.round(a + (b-a)*Math.random()) -- to generate a random number btw a,b
        //Math.random() gives a random number btw 0 and 1
        let a=2;
        let b=16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
    }

    //Moving the snake 
    for(let i=snakeArr.length-2; i>=0; i--){
        snakeArr[i+1]={...snakeArr[i]}; /*we are dereferencing it and then assigning
         to snakeArr[i+1] to avoid referencing problem.. as if we do directly equal
          then new object wont be created but that snakeArr[i+1] will only reference
           to snakeArr[i]*/

    }
    // the 1st element will move in forward direction --- 
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Part-2 : Display the snake and Food
    // Diaplay the snake
    board.innerHTML = "";  /*we are empting the HTML inside th board as we don't 
                want that there is another snake and we are again creating a snake
            inside the board. So by this we are removing the previous snake and food */

    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snakebody');
        }
        board.appendChild(snakeElement);
    })
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement); 

        
}



// Main logic starts here

// to save max score in local storage---
let maxScore=localStorage.getItem("maxScore") //we are checking if maxScore exists in local storage
//initially it does not exist so it will return null
if(maxScore===null){
    let maxScoreVal=0;
    localStorage.setItem("maxScore",JSON.stringify(maxScoreVal)); /* we are setting a maxScore in our local storage where
     value of maxScore will be stored and even if we refresh the page that value will 
     be retained and we will retrieve this value and set in maxScore next tym our game 
     reloads. But this value will get erased if we clear our local storage*/
     /* here we need to set as string and we cannot set as an int value so we converted
      the value to strig using JSON.stringify and will then store it */
}
else{
    maxScoreVal= JSON.parse(maxScore); // converting string to int
    maxscorediv.innerHTML="Max Score: " + maxScore;
}

window.requestAnimationFrame(main);
// musicSound.play();
window.addEventListener('keydown',e=>{//we will check if any key is pressed then game will start
    musicSound.play();
    inputDir = {x: 0, y: 1};  //as player presses a key,snake will have down direction
    moveSound.play();
    switch (e.key){       // We will check which key is pressed nad do required task
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;

        default:
            break;
    }
})
