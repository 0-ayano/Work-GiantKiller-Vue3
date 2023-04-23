<template>
    <h1 id="title">ルール</h1>

    <div class="sentence">
        <h2>1. 基礎ルール</h2>
        <div>
            このゲームは、それぞれ特徴的な動きをするコマを一手ずつ交互に動かし、移動先のマスにあるコマを取り合うゲームで、最初に15ポイント先取した人が勝利者となります。ポイントは、相手の駒を獲ったると獲ったコマの数字がポイントとして加算されます。またポイントは、特殊ルールによっても変動します。<br><br>

            ゲームの盤面は以下のようになっており、白のプレイヤーから始まります。
            <div style="text-align: center;">
                <img src="../assets/img/gameboard.png" style="width: 50%;">
            </div>
        </div>
        <br><br>

        <h2>2. コマの動かし方</h2>
        <div>
            コマは全部で4種類あり、それぞれ以下のような動きをします。<br>
            ※ピンクのマスに動きます。
            <div style="text-align: center;">
                <img src="../assets/img/move.png" style="width: 100%;">
            </div>
        </div>
        <br><br>

        <h2>3. 勝敗</h2>
        <div>
            ①15ポイント先取する<br>
            ②相手が降参する
        </div>
        <br><br>

        <h2>4. 特殊ルール</h2>
        <div>
            <h3>1-裏切りには死の制裁を</h3>
            <div>
                味方のコマを獲ると、獲ったコマも獲られたコマも消えます。さらに相手のスコアに「獲ったコマと獲られたコマのポイント」が入ります。
            </div><br>

            <h3>2-自軍の戦意向上</h3>
            <div>
                相手の駒を獲ると、自身のTurnが続く。<br>
                ※最大連続ターン数：3回
            </div><br>

            <h3>3-同格を討ったなら昇格</h3>
            <div>
                同格の相手のコマを獲ると、獲ったコマの数字が大きくなる。最大値は4。
            </div><br>

            <h3>4-白旗を上げる</h3>
            <div>
                降参をすると、相手のスコアに+20され、ゲームが終了する
            </div> 
        </div><br><br>
    </div>

    <button id="btn"  class="move-home" @click="moveHome()">Home</button>

    <div class="space">　</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const moveHome = () => {
    router.push('/')
}
</script>

<style scoped>
.move-home {
    position: relative;
	left: 50%;
	transform: translateX(-50%);
}

.space {
    position: absolute;
    top: 290%;
    width: 90%;
    height: 15%;
}

.sentence {
    position: relative;
    left: 50%;
    width: 70%;
    color: var(--color-black);
    transform: translateX(-50%);
}
</style>