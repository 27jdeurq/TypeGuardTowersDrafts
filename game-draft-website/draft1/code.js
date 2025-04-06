window.onload = function(){
    // Get the canvas element
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');

    // Function to resize the canvas

    const margin = 50; // Set a margin so the canvas doesn't take the whole screen
    canvas.width = window.innerWidth - margin;
    canvas.height = window.innerHeight - margin;

    function updatePosition(pressedKey){
        console.log(pressedKey.code)
        switch (pressedKey.code){
            case 'ArrowUp':
                console.log("Hello")
        }
    }

    function playerPrint(){
        
    }


    function gameloop(){
        context.clearRect(0,0,canvas.width,canvas.height)
    }

    window.addEventListener('keydown', updatePosition)
    gameloop()

}