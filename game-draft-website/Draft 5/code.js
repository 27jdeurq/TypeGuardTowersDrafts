
//Create Canvas:

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const margin = 50;
canvas.width = window.innerWidth - margin;
canvas.height = window.innerHeight - margin;

//Name Varaibles:

var points = 0

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
    {name: "castle", height: canvas.height / 3, width: canvas.width / 5, x: 50, y: 450, text: "None"},
    {name: "knight", height: 100,width: 100,x: canvas.width / 10,y: canvas.height -100, text: "None"}
]

const images = {}


//Pre load images:

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


//Draw images on canvas:

function drawimages(imageName, x, y, width, height){
    const img = images[imageName]
    if (img) {
        ctx.drawImage(img, x, y, width, height)
    }
}

function drawText(enemy){
    const text = enemy.text

    ctx.font = "20px Arial"
    ctx.fillStyle = "Red"

    const textX = enemy.x 
    const textY = enemy.y + (enemy.height / 2) - 50

    if (enemy.text == "None"){
    }else{
        ctx.fillText(text, textX, textY)
    }
}

function drawAllCharacter(){
    characters.forEach(character => {
        drawimages(character.name, character.x, character.y, character.width, character.height)
        drawText(character)
    })
}


//Create new enemies:

function getWord(number){
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let word = ""

    for (let x = 0; x < number; x++){
        word += letters[Math.floor(Math.random()*26)]
    }

    return (word)
}


function enemyText(enemy){
    if (enemy.name == "Ogre"){
        return(Math.floor(Math.random()*10).toString())
    }else if (enemy.name == "KingOgre"){
        return(String.fromCharCode(65 + Math.floor(Math.random() * 26)))
    }else{
        return(getWord(3))
    }
}

function createenemy(type){
    let enemy ={
        x: canvas.width - 50,
        y: canvas.height - 100,
        speed: 5,
        damage: 100,
        width: 100,
        height: 100,
        name: type,
        text: "None"
    }

    enemy.text = enemyText(enemy)

    enemies.push(enemy)

    characters.push(enemy)    
}

function getInterval(){
    //return (5-(points / spawnInterval))
    return (2000)
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


//Update positions of enemies:

function getPoints(enemy){
    let x = 0
    if (enemy.name == "Ogre"){
        x = 100
    }else if(enemy.name == "KingOgre"){
        x = 200
    }else{
        x = 300
    }

    points += x

    console.log(points);
}

function enemyDead(enemy, index){

    getPoints(enemy)

    enemies.splice(index, 1)
    characters.splice(index + 2, 1)
    
}

function castleHit(enemy, index){
    if (castle.health <= 0){
        console.log("LOST");
    }

    castle.health -= enemy.damage

    enemyDead(enemy, index)
}

function moveEnemy(enemy){
    enemy.x -= enemy.speed
    return(enemy.x)
}

function updateEnemies(){
    for (let i = enemies.length - 1; i >= 0; i--){
        let enemy = enemies[i]

        enemies[i].x = moveEnemy(enemy)

        if (enemy.x <= castle.x){
            castleHit(enemy, i)
        }
    }
}


//Game Loop:

function gameLoop(){

    updateEnemies()

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAllCharacter();
    
    requestAnimationFrame(gameLoop);
}

preDownload(imageList, function () {
    spawnEnemies();
    gameLoop();
});
