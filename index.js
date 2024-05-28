var bg = document.getElementById("body")
var width = window.innerWidth;
var height = window.innerHeight;
console.log('窗口宽度：' + width);
console.log('窗口高度：' + height);
var colorlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "A", "B", "C", "D", "E", "F"]
// 随机数生成器
function randomInt(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
    let code = "#"
    for (let i = 0; i < 6; i++) {
        let num = randomInt(0, 15)
        code += String(colorlist[(num)])
    }
    return code
}

function ciallo() {
    console.log("ciallo")
    // 初始化
    let v = document.createElement("p")
    v.innerText = "Ciallo～(∠・ω - )⌒★"
    bg.appendChild(v)
    // 移动速度
    time = randomInt(5, 15)
    v.style.transition = `all ${time}s linear`

    // 点击事件
    v.onclick = () => {
        console.log("ciallo")
        let music = new Audio('./assets/ciallo.mp3');
        music.play();
        v.style.textShadow = `text-shadow: 10px 10px 10px ${randomColor};`
    }
    console.log(v.offsetWidth)

    // 初始位置
    v.style.right = 2 * randomInt(500, 1500) + "px"
    v.style.top = randomInt(0, height) + "px"
    // 初始大小
    v.style.fontSize = randomInt(20, 40) + "px"
    // 颜色
    v.style.color = randomColor()
    // 开始移动
    //setTimeout(() => {
        v.style.right = -width + "px"
    //}, 1)
    //setTimeout(() => { 
        v.remove 
   /// }, time * 1000)


    // let time = setInterval(() => {
    //     let right = Number(v.style.right.slice(0, v.style.right.length - 2))
    //     v.style.right = right - randomInt(1, 3) + "px"
    //     if (right < -width) {
    //         v.remove()
    //         clearInterval(time);
    //         return 0
    //     }
    // }, randomInt(5, 10))
}
setInterval(() => {
    ciallo()
}, 100)
ciallo()
ciallo()
ciallo()
ciallo()
ciallo()
ciallo()
ciallo()
ciallo()
ciallo()
ciallo()
