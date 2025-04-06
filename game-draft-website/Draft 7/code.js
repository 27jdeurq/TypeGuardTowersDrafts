
//Create Canvas:

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const margin = 50;
canvas.width = window.innerWidth - margin;
canvas.height = window.innerHeight - margin;

console.log(canvas.width, canvas.height);


//Name Varaibles:

let lost = false

var points = 0

let baseSpeed = 5

const spawnInterval = 2000

let enemies = []

var castle = {
    height: canvas.height / 3,
    width: canvas.width / 5,
    x: 0,
    y: canvas.height - (canvas.height / 3),
	health: 2000
}

var player =  {
    height: canvas.height / 7,
    width: canvas.width / 13,
    x: canvas.width - 150,
    y: canvas.height - 100,
}

let characters =[
    {name: "castle", height: castle.height, width: castle.width, x: castle.x, y: castle.y},
    {name: "knight", height: canvas.height / 7 ,width: canvas.width / 13,x: canvas.width / 10,y: canvas.height -100}
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
    { name: 'castle', src: 'castle.jpeg' },
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

    ctx.font = "30px arial"
    ctx.fillStyle = "white"

    const textX = enemy.x + (enemy.width / 2) - (ctx.measureText(text).width / 2)
    const textY = enemy.y - (enemy.height / 10)
    
    ctx.fillText(text, textX, textY)
}

function drawAllCharacter(){
    characters.forEach(character => {drawimages(character.name, character.x, character.y, character.width, character.height)})

    enemies.forEach(enemy => {
        drawimages(enemy.name, enemy.x, enemy.y, enemy.width, enemy.height)
        drawText(enemy)
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

function getDamage(enemy){
    if (enemy.name == "Ogre"){
        return(100)
    }else if (enemy.name == "KingOgre"){
        return(300)
    }else{
        return(500)
    }
}

function createenemy(type){
    let enemy ={
        x: canvas.width - 50,
        y: canvas.height - 100,
        speed: Math.min(baseSpeed + (points / 1000),7.5),
        width: 100,
        height: 100,
        damage: 100,
        name: type,
        text: "None"
    }

    enemy.text = enemyText(enemy)
    enemy.damage = getDamage(enemy)

    enemies.push(enemy)  
}

function getInterval(){
    return (Math.max(spawnInterval - (points / 5),450))
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

    if (lost){
        
    }else{
        setTimeout(spawnEnemies, interval)
    }
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
}

function enemyDead(enemy, index, isHit){

    if (isHit == "Not"){
        getPoints(enemy)
    }

    enemies.splice(index, 1)
}

function castleHit(enemy, index){

    castle.health -= enemy.damage

    if (castle.health <= 0){
        lost = true
    }

    enemyDead(enemy, index, "Castle")
}

function moveEnemy(enemy){
    enemy.x -= enemy.speed
    return(enemy.x)
}

function updateEnemies(){
    for (let i = enemies.length - 1; i >= 0; i--){
        let enemy = enemies[i]

        enemies[i].x = moveEnemy(enemy)

        if (enemy.x <= castle.x + castle.width / 2){
            castleHit(enemy, i)
        }
    }
}


//Game Loop:

window.addEventListener("keydown", function(event){
    const pressedKey = event.key

    enemies.forEach((enemy, index) => {

        if (enemy.name == "Dragon"){
            const word = enemy.text.toLowerCase()

            const lengthOfWord = word.length

            if (word[0] == pressedKey)
                enemy.text = word.slice(1,lengthOfWord)

            if (enemy.text.length == 0){
                enemyDead(enemy,index,"Not")
            }
        }

        if (enemy.text.toLowerCase() == pressedKey){
            enemyDead(enemy,index,"Not")
        }

    })
})

function bigLoop(){
    function gameLoop(){

        updateEnemies()

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawAllCharacter();

        if (lost){
            console.log("Lost");
        }else{
            requestAnimationFrame(gameLoop);
        }
    }

    preDownload(imageList, function () {
        spawnEnemies();
        gameLoop();
    });
}

bigLoop()