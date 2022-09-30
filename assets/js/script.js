const player = document.getElementById('dinosaur');
const background = document.querySelector(".background");
let position = 0;
let jumping = false;
let cactusCount = 0;
let timer = 0;
let sprite = 0;
let gameover = false;

function jump(){
    position = 7;
    jumping = true;


    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if(position <= 7){
                    clearInterval(downInterval);
                    jumping = false;
                }else{
                    position -= 11;
                    player.style.bottom = position + 'px';
                }
            }, 16);
        }else{
            position += 30;
            player.style.bottom = position + 'px';
        }
    }, 16);
}

document.addEventListener('keyup', function (event) {
    if(event.keyCode == 32 && !jumping) jump();
});

addEventListener('keypress', function (event) {
    if(!gameover) return;
    window.location.reload();
});


function insertCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 14000;
    let timerSpawn = Math.floor(Math.random() * 6000) + 1;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    let addInterval = setInterval(() => {
        if(cactusPosition < -60){
            clearInterval(addInterval);
            background.removeChild(cactus);
            cactusCount++;
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            clearInterval(addInterval);
            document.body.innerHTML = "<h1 class='title'>GAME OVER</h1><br><br><h3 class='subtitle'>Press any key to restart</h3>";
            gameover = true;
        }else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(insertCactus, timerSpawn);
}

function start(){
    timer++;
    document.getElementById("cactusCount").innerHTML = cactusCount;
    document.getElementById("timer").innerHTML = (timer / 60).toFixed(2) + "s";
    setTimeout(start, 1);

    setInterval(() => {
        if(sprite = 1){
            sprite = 0;
            player.style.backgroundImage = "url('assets/img/dinosaur0.png')";
        }else{
            sprite = 1;
            player.style.backgroundImage = "url('assets/img/dinosaur1.png')"
        }
        console.log(sprite)
    }, 20);
}

insertCactus();
start();