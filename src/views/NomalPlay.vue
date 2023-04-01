<template>
    <div id = "table">
        <div v-for = "row in 8" :key = "row" style = "float: right;">
            <button 
                v-for = "column in 8" :key="column"
                v-bind:class = squareImg[row-1][column-1]
                v-bind:id = squareId[row-1][column-1]
                @click = "controlPiece($event, row-1, column-1)"
            />
        </div>
    </div>

    <div id="inform">
        Turn => {{ nowPlayer }}        <br>
        Black Score : {{ blackScore }} <br>
        White Cvore : {{ whiteScore }} <br>
        <div v-if = "blackScore >= 15">Winner Black</div>
        <div v-if = "whiteScore >= 15">Winner White</div>
    </div>

    <button  
        v-if = "!gameFlag" id = "btn" class = "game-again" @click = "gameAgain()">One More</button>
    <button id = "btn" class = "move-home" @click = "moveHome()">Home</button>
    <button id = "btn" class = "game-resign" @click = "gameResign()">Resign</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GameInform from '../assets/game.json'

const router = useRouter()

const squareImg = ref(
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""]
)

const squareId = ref(
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""]
)

const gameboard = ref( GameInform.game )

const moveOK = ref([])

const moveAfterData = ref()

const whiteScore = ref(0)

const blackScore = ref(0)

const nowPlayer = ref("white")

const gameFlag = ref(true)

// ページ読み込み時に実行
/* 
    関数名：
    引数　：
    返り値：
    説明　：ゲームボードの各マスにclassとidの付与
*/
onMounted(() => {
    let arr1 = new Array(8);
    let arr2 = new Array(8);
    for (var x = 0; x <= 7; x++) {
        arr1[x] = new Array(8);
        arr2[x] = new Array(8);
        for (var y = 0; y <= 7; y++) {
            arr1[x][y] = "squareId-" + x.toString() + y.toString()
            arr2[x][y] = "square"
        }
    }
    squareId.value = arr1
    squareImg.value = arr2
    setImage()
    console.log("[succeed] Set square id")
})

// 画面遷移
/* 
    関数名：moveHome
    引数　：
    返り値：
    説明　：Homeに戻る
*/
const moveHome = () => {
    router.push('/')
}

// ゲーム関係
/* 
    関数名：controlPiece
    引数　：event, row, column
    返り値：
    説明　：コマの制御に関するmain関数
*/
const controlPiece = (event, row, column) => {
    // console.log(event.target.id);
    ruler()

    if(gameFlag.value) {
        var now = nowPlayer.value[0]

        if (moveAfterData.value == null) {
            if (squareImg.value[row][column].indexOf(now) > 0) {
                var move = searchMoveOK(row, column)
                if (move.length != 0) {
                    displayMoveOK(move)
                    moveAfterData.value = [gameboard.value[row][column], row, column]
                }
            }
        }

        else {
            movePiece(event.target.id, row, column)
            moveAfterData.value = null
            forgetMoveOK()
            setImage()
        }
    }
}

/* 
    関数名：getMovement
    引数　：num
    返り値：move
    説明　：駒の番号から動きを取得する
*/
const getMovement = (num) => {
    var move = 0

    switch (num) {
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

/* 
    関数名：searchMoveOK
    引数　：row, column
    返り値：ret
    説明　：指定したコマの移動可能マスの取得
*/
const searchMoveOK = (row, column) => {
    var ret = [];
    var move = getMovement(gameboard.value[row][column])

    for (var x = -1; x <= 1; x++) {
        if (row+x>=0 && row+x<=7) {
            for (var y = -1; y <= 1; y++) {
                if (column+y>=0 && column+y<=7) {
                    if ( move[x+1][y+1] == 1 ) {
                        ret.push((row+x).toString() + (column+y).toString())        
                    }                    
                }
            }
        }
    }
    return ret
}

/* 
    関数名：displayMoveOK
    引数　：move
    返り値：
    説明　：移動可能マスの表示
*/
const displayMoveOK = (move) => {
    for (var obj of move) {
        var objID = "squareId-" + obj
        document.getElementById(objID).style.backgroundColor = "var(--color-orange)"
        moveOK.value.push(objID)
    }
}

/* 
    関数名：forgetMoveOK
    引数　：
    返り値：
    説明　：移動可能マスの表示クリア
*/
const forgetMoveOK = () => {
    for (var obj of moveOK.value) {
        document.getElementById(obj).style.backgroundColor = "var(--color-alice_blue)"
    }
    moveOK.value = []
}

/* 
    関数名：setImage
    引数　：
    返り値：
    説明　：ゲームボードのマスの画像の更新
*/
const setImage = () => {
    for (var x = 0; x <= 7; x++) {
        for (var y = 0; y <= 7; y++) {
            var num = gameboard.value[x][y]

            switch (num) {
                case 0:
                    squareImg.value[x][y] = "square"
                    break;

                case -1:
                    squareImg.value[x][y] = "square_b1"
                    break;

                case -2:
                    squareImg.value[x][y] = "square_b2"
                    break;

                case -3:
                    squareImg.value[x][y] = "square_b3"
                    break;

                case -4:
                    squareImg.value[x][y] = "square_b4"
                    break;

                case 1:
                    squareImg.value[x][y] = "square_w1"
                    break;

                case 2:
                    squareImg.value[x][y] = "square_w2"
                    break;

                case 3:
                    squareImg.value[x][y] = "square_w3"
                    break;

                case 4:
                    squareImg.value[x][y] = "square_w4"
                    break;
            }
        }
    }
}

/* 
    関数名：movePiece
    引数　：ID, row, column
    返り値：
    説明　：コマを移動させる
*/
const movePiece = (ID, afterX, afterY) => {
    for (var obj of moveOK.value){
        if (ID == obj){
            var beforeX = moveAfterData.value[1]
            var beforeY = moveAfterData.value[2]
            var beforeP = gameboard.value[beforeX][beforeY]
            var afterP  =  gameboard.value[afterX][afterY]

            // [同士討ち]白
            if (beforeP > 0 && afterP > 0) {
                manageScore("b", afterP+beforeP)
                gameboard.value[afterX][afterY] = 0
                gameboard.value[beforeX][beforeY] = 0
            }

            // [同士討ち]黒
            else if (beforeP < 0 && afterP < 0) {
                manageScore("w", afterP+beforeP)
                gameboard.value[afterX][afterY] = 0
                gameboard.value[beforeX][beforeY] = 0
            }

            // [獲る]進化
            else if (beforeP + afterP == 0) {
                if (moveAfterData.value[0] == 4) {
                    manageScore("w", -4)
                    gameboard.value[afterX][afterY] = 4
                    gameboard.value[beforeX][beforeY] = 0
                }

                else if (moveAfterData.value[0] == -4) {
                    manageScore("b", 4)
                    gameboard.value[afterX][afterY] = -4
                    gameboard.value[beforeX][beforeY] = 0  
                }

                else if (moveAfterData.value[0] > 0) {
                    manageScore("w", afterP)
                    gameboard.value[afterX][afterY] = moveAfterData.value[0] + 1
                    gameboard.value[beforeX][beforeY] = 0
                }

                else if (moveAfterData.value[0] < 0) {
                    manageScore("b", afterP)
                    gameboard.value[afterX][afterY] = moveAfterData.value[0] - 1
                    gameboard.value[beforeX][beforeY] = 0
                }
            }

            // [獲る]通常
            else if (beforeP + afterP != beforeP) {
                if (moveAfterData.value[0] > 0) {
                    manageScore("w", afterP)
                    gameboard.value[afterX][afterY] = moveAfterData.value[0]
                    gameboard.value[beforeX][beforeY] = 0
                }

                else if (moveAfterData.value[0] < 0) {
                    manageScore("b", afterP)
                    gameboard.value[afterX][afterY] = moveAfterData.value[0]
                    gameboard.value[beforeX][beforeY] = 0
                }
            }

            // 進行
            else {
                gameboard.value[afterX][afterY] = moveAfterData.value[0]
                gameboard.value[beforeX][beforeY] = 0
            }

            // nowPlayerの更新
            if (nowPlayer.value == "white") {
                nowPlayer.value = "black"
            }
            else {
                nowPlayer.value = "white"
            }

            console.log("[succeed] Moved")
        }
    }
}

/* 
    関数名：ruler
    引数　：
    返り値：
    説明　：勝利条件を満たしているかを調べる
*/
const ruler = () => {
    if (blackScore.value >= 15) {
        gameFlag.value = false
    }

    else if (whiteScore.value >= 15) {
        gameFlag.value = false
    }
}

/* 
    関数名：gameResign
    引数　：
    返り値：
    説明　：投降
*/
const gameResign = () => {
    if (gameFlag.value) {
        if (nowPlayer.value == "white") {
            blackScore.value += 20
        }
        else {
            whiteScore.value += 20
        }
    }

    ruler()
}

/* 
    関数名：manageScore
    引数　：who, point
    返り値：
    説明　：スコアの管理する関数
*/
const manageScore = (who, point) => {
    if (who == "b") {
        blackScore.value = blackScore.value + point
    }

    else if (who == "w") {
        whiteScore.value = whiteScore.value + Math.abs(point)
    }
}

/* 
    関数名：gameAgain
    引数　：
    返り値：
    説明　：画面のリロード
*/
const gameAgain = () => {
    location.reload()
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
