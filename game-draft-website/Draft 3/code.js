
// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Function to resize the canvas

const margin = 50; // Set a margin so the canvas doesn't take the whole screen
canvas.width = window.innerWidth - margin;
canvas.height = window.innerHeight - margin;

class Ogre {
    constructor(letter, speed) {
        this.height = 100
        this.width = 100
        this.letter = letter
        this.speed = speed
    }

    displayOgre(){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        //Display image
    }
}

var knight = {//Knight Data
    height: 100,
    width: 100,
    x: canvas.width - 150,
    y: canvas.height - 100,
    speed: 5,
    //image: //I dont know how to do this
}

var num = {
    height: 50,
    width: 50,
    x: knight.x + 25,
    y: knight.y - 40,
    //image: //I dont either here
}

var points = 400

function printOgres(){

    number = Math.floor(Math.random() * 10);
    console.log(`Number: ${number}`);

    velocity = Math.floor(Math.random() * (points / 100)) + 1;
    console.log(`Velocity: ${velocity}`);

    source = `number${number}.png`

    const ogre1 = new Ogre(number,velocity);
    

}

function gameloop(){
    printOgres()
}

gameloop();