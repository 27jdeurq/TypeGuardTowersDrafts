const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const margin = 50;
canvas.width = window.innerWidth - margin;
canvas.height = window.innerHeight - margin;

var points = 0

var textOnTop = []

const spawnInterval = 300

let enemies = []

var castle = {
    height: canvas.height / 3,
    width: canvas.width / 5,
    x: 50,
    y: 350,
	health: 2000
}

var player =  {
    height: 100,
    width: 100,
    x: canvas.width - 150,
    y: canvas.height - 100,
}

let characters =[
    {name: "castle", height: canvas.height / 3, width: canvas.width / 5, x: 50, y: 450},
    {name: "knight", height: 100,width: 100,x: canvas.width / 10,y: canvas.height -100}
]

const images = {}

function preDownload(imageList, callback){
    let count = 0
    const totalImages = imageList.length

    imageList.forEach(image => {
        const img = new Image()
        img.src = image.src
        img.onload = () => {
            count++
            images[image.name] = img
            if (count === totalImages){
                callback()
            }
        }
    })
}

const imageList = [
    { name: 'castle', src: 'castle.jpg' },
    { name: 'knight', src: 'knight.png' },
    { name: 'Ogre', src: 'Ogre.jpg' },
    { name: 'KingOgre', src: 'KingOgre.jpg' },
    { name: 'Dragon', src: 'Dragon.jpg' }]


function drawimages(imageName, x, y, width, height){
    const img = images[imageName]
    if (img) {
        ctx.drawImage(img, x, y, width, height)
    }else{
        console.error("OH NO")
    }
}

function drawAllCharacter(){
    characters.forEach(character => drawimages(character.name, character.x, character.y, character.width, character.height))
}

function createenemy(type){
    let enemy ={
        x: Math.random() * 100,
        y: canvas.height - 100,
        width: 100,
        height: 100,
        name: type
    }

    enemies.push(enemy)

    characters.push(enemy)    
}

function getInterval(){
    //return (5-(points / spawnInterval))
    return (5000)
}

function getEnemyType(){
    let randomValue = Math.random()

    if (randomValue < 0.6){
        return ("Ogre")
    }else if (randomValue < 0.9){
        return ("KingOgre")
    }else{
        return ("Dragon")
    }
}

function spawnEnemies(){
    let interval = getInterval()
    
    let enemyType = getEnemyType()

    createenemy(enemyType)

    setTimeout(spawnEnemies, interval)
}

function gameLoop(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAllCharacter();
    

    requestAnimationFrame(gameLoop);
}

preDownload(imageList, function () {
    spawnEnemies();
    gameLoop();
});
