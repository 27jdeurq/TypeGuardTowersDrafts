
// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Function to resize the canvas

const margin = 50; // Set a margin so the canvas doesn't take the whole screen
canvas.width = window.innerWidth - margin;
canvas.height = window.innerHeight - margin;

class ogre {
    constructor(letter, speed) {
        this.height = 100
        this.width = 100
        this.letter = letter
        this.speed = speed
    }
}

var knight = {//Knight Data
    height: 100,
    width: 100,
    x: canvas.width - 150,
    y: canvas.height - 100,
    speed: 5,
    image: new Image(),
}

var num = {
    height: 50,
    width: 50,
    x: knight.x + 25,
    y: knight.y - 40,
    image: new Image()
}

var points = 0

knight.image.src = 'knight.png';

num.image.src = "number1.jpg";

knight.image.onload = function() {
    context.drawImage(knight.image, knight.x, knight.y, knight.width, knight.height);
};

var randomNumber = 0

function changeNumber (){
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber == 1){
        num.image.src = "number1.jpg"
        context.drawImage(num.image,num.x,num.y,num.width,num.height);
    }else if (randomNumber == 2){
        num.image.src = "number2.png"
        context.drawImage(num.image,num.x,num.y,num.width,num.height);
    }else{
        num.image.src = "number3.png"
        context.drawImage(num.image,num.x,num.y,num.width,num.height);
    }
    return(randomNumber)
}

const keys = {}

window.addEventListener('keydown', function(e) {
    keys[e.key] = true; // Store the pressed key
});

function updatePlayerPosition (){
    let x = randomNumber.toString();

    if (knight.x < 50){
        keys[x] = false;
        knight.x += Math.round(Math.random()*1000);
        randomNumber = changeNumber();
        num.x = knight.x + 20
    }else if (keys[x]){
        keys[x] = false;
        knight.x += Math.round(Math.random()*1000);
        randomNumber = changeNumber();
        num.x = knight.x + 20
        points += 1
        console.log(points)
    }else{
        knight.x -= knight.speed
        num.x = knight.x + 20
    }
}

function gameloop(){
    context.clearRect(0,0,canvas.width,canvas.height);

    updatePlayerPosition();

    context.drawImage(knight.image, knight.x, knight.y, knight.width, knight.height);

    context.drawImage(num.image,num.x,num.y,num.width,num.height);

    requestAnimationFrame(gameloop);
}

gameloop();