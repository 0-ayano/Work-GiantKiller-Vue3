<template>
    <div id="table">
        <div v-for="row in 8" :key="row" style="float: right;" >
            <button 
                v-for = "column in 8" :key="column"
                v-bind:class = img[row-1][column-1]
                v-bind:id = tile[row-1][column-1]
                @click = "getId($event, row-1, column-1)"
            />
        </div>
    </div>

    <div id="inform">
        Turn => {{ nowPlayer }}        <br>
        Black Score : {{ blackScore }} <br>
        White Cvore : {{ whiteScore }} <br>
        <div v-if="blackScore >= 15">Winner Black</div>
        <div v-if="whiteScore >= 15">Winner White</div>
    </div>

    <button  v-if="blackScore>=15 || whiteScore>=15" id="btn" class="game-again" @click="gameAgain()">One More</button>
    <button id="btn" class="move-home" @click="moveHome()">Home</button>
    <button id="btn" class="game-resign" @click="gameResign()">Resign</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GameInform from '../assets/game.json'

const router = useRouter()

const img = ref(
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""]
)

const tile = ref(
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""]
)

const game = ref( GameInform.game )

const memory = ref([])

const old = ref()

const whiteScore = ref(0)

const blackScore = ref(0)

const nowPlayer = ref("white")

const flag = ref(true)

onMounted(() => {
    let arr1 = new Array(8);
    let arr2 = new Array(8);
    for(var x=0; x<=7; x++){
        arr1[x] = new Array(8);
        arr2[x] = new Array(8);
        for(var y=0; y<=7; y++){
            arr1[x][y] = "tile-" + x.toString() + y.toString()
            arr2[x][y] = "tile"
        }
    }
    tile.value = arr1
    img.value = arr2
    setImage()
    console.log("[succeed] Set tile id")

})

const moveHome = () => {
    router.push('/')
}

const gameAgain = () => {
    location.reload()
}

const getMovement = (num) => {
    var move = 0

    switch(num){
        case 0:
            move = GameInform.movement.empty
            break;

        case -1:
            move = GameInform.movement.black1
            break;

        case -2:
            move = GameInform.movement.black2
            break;

        case -3:
            move = GameInform.movement.black3
            break;

        case -4:
            move = GameInform.movement.black4
            break;

        case 1:
            move = GameInform.movement.white1
            break;

        case 2:
            move = GameInform.movement.white2
            break;

        case 3:
            move = GameInform.movement.white3
            break;

        case 4:
            move = GameInform.movement.white4
            break;
    }
    return move
}

const searchTile = (row, column) => {
    var arr = [];
    var move = getMovement( game.value[row][column] )

    for(var x=-1; x<=1; x++){
        if(row+x>=0 && row+x<=7){
            for(var y=-1; y<=1; y++){
                if(column+y>=0 && column+y<=7){
                    if( move[x+1][y+1] == 1 ){
                        arr.push((row+x).toString() + (column+y).toString())        
                    }                    
                }
            }
        }
    }
    return arr
}

const forgetMemory = () => {
    for(var obj of memory.value){
        document.getElementById(obj).style.backgroundColor = "var(--color-alice_blue)"
    }
    memory.value = []
}

const displayMovement = (arr) => {
    for(var obj of arr){
        var objID = "tile-" + obj
        document.getElementById(objID).style.backgroundColor = "var(--color-orange)"
        memory.value.push(objID)
    }
}

const setImage = () => {
    for(var x=0; x<=7; x++){
        for (var y=0; y<=7; y++){
            var num = game.value[x][y]

            switch(num){
                case 0:
                    img.value[x][y] = "tile"
                    break;

                case -1:
                    img.value[x][y] = "tile_b1"
                    break;

                case -2:
                    img.value[x][y] = "tile_b2"
                    break;

                case -3:
                    img.value[x][y] = "tile_b3"
                    break;

                case -4:
                    img.value[x][y] = "tile_b4"
                    break;

                case 1:
                    img.value[x][y] = "tile_w1"
                    break;

                case 2:
                    img.value[x][y] = "tile_w2"
                    break;

                case 3:
                    img.value[x][y] = "tile_w3"
                    break;

                case 4:
                    img.value[x][y] = "tile_w4"
                    break;

            }
        }
    }
}

const manageScore = (who, point) => {
    if(who == "b"){
        blackScore.value = blackScore.value + point
    }

    else if(who == "w"){
        whiteScore.value = whiteScore.value + Math.abs(point)
    }
}

const movePiece = (ID, row, column) => {
    for (var obj of memory.value){
        if (ID == obj){
            console.log("[succeed] Moved")

            if (game.value[old.value[1]][old.value[2]] > 0 && game.value[row][column] > 0){
                manageScore("b", game.value[row][column]+game.value[old.value[1]][old.value[2]])
                game.value[row][column] = 0
                game.value[old.value[1]][old.value[2]] = 0
            }

            else if (game.value[old.value[1]][old.value[2]] < 0 && game.value[row][column] < 0){
                manageScore("w", game.value[row][column]+game.value[old.value[1]][old.value[2]])
                game.value[row][column] = 0
                game.value[old.value[1]][old.value[2]] = 0
            }

            else if (game.value[old.value[1]][old.value[2]] + game.value[row][column] == 0){
                if (old.value[0] == 4){
                    manageScore("w", game.value[row][column])
                    game.value[row][column] = 4
                    game.value[old.value[1]][old.value[2]] = 0
                }

                else if (old.value[0] == -4){
                    manageScore("b", game.value[row][column])
                    game.value[row][column] = -4
                    game.value[old.value[1]][old.value[2]] = 0   
                }

                else if (old.value[0] > 0){
                    manageScore("w", game.value[row][column])
                    game.value[row][column] = old.value[0] + 1
                    game.value[old.value[1]][old.value[2]] = 0
                }

                else if (old.value[0] < 0){
                    manageScore("b", game.value[row][column])
                    game.value[row][column] = old.value[0] - 1
                    game.value[old.value[1]][old.value[2]] = 0
                }
            }

            else {
                game.value[row][column] = old.value[0]
                game.value[old.value[1]][old.value[2]] = 0
            }

            if(nowPlayer.value == "white"){
                nowPlayer.value = "black"
            }
            else{
                nowPlayer.value = "white"
            }
        }
    }
}

const ruler = () => {
    if(blackScore.value>=15){
        flag.value = false
    }

    else if (whiteScore.value>=15){
        flag.value = false
    }
}

const getId = (event, row, column) => {
    // console.log(event.target.id);

    if(flag.value){
        var now = nowPlayer.value[0]

        if (old.value == null){
            if(img.value[row][column].indexOf(now) > 0){
                var arr = searchTile(row, column)
                if(arr.length != 0){
                    displayMovement( arr )
                    old.value = [game.value[row][column], row, column]
                }
            }
        }

        else{
            movePiece(event.target.id, row, column)
            old.value = null
            forgetMemory()
            setImage()
        }

        ruler()
    }
}

const gameResign = () => {
    if(nowPlayer.value == "white"){
        blackScore.value += 20
    }
    else{
        whiteScore.value += 20
    }
}
</script>

<style scoped>
.game-again{
    position: absolute;
    top: 39%;
    left: 7%;
}

.game-resign{
    position: absolute;
    top: 60%;
    left: 7%;
}

.move-home{
    position: absolute;
    top: 75%;
    left: 7%;
}
</style>