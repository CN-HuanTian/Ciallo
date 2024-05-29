console.log("version:1.2")
//获取背景
var bg = document.getElementById("body")
//获取屏幕尺寸
var width = window.innerWidth;
var height = window.innerHeight;
console.log('窗口宽度：' + width);
console.log('窗口高度：' + height);
//判断是否为移动设备并限制ciallo数量
let u = navigator.userAgent
let mobile = !!u.match(/AppleWebKit.*Mobile.*/)
console.log("设备："+mobile)
var maxciallo=0
if(mobile){maxciallo=25}
else{maxciallo=100}
console.log("Ciallo数量："+maxciallo)
//十六进制列表
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
    // 初始化
    let v = document.createElement("p")
    v.innerText = "Ciallo～(∠・ω - )⌒★"
    // 初始大小
    v.style.fontSize = randomInt(20, 40) + "px"
    // 颜色
    v.style.color = randomColor()
    bg.appendChild(v)
    // 初始位置
    v.style.left = -100 - v.offsetWidth + "px"
    v.style.top = randomInt(0, height) + "px"
    

    // 移动速度
    time = randomInt(5, 15)
    v.style.transition = `all ${time}s linear`

    // 点击事件
    v.onclick = () => {
        let music = new Audio('./assets/ciallo.mp3');
        music.play();
        v.style.left = v.offsetLeft+"px"
        clearTimeout(removemove)
        clearTimeout(startmove)
        v.style.transition = "none";
        v.style.transition = `all 0.5s linear`
        v.style.opacity=0
        v.style.fontSize =Number(v.style.fontSize.slice(0, v.style.fontSize.length - 2))+5+"px"
        setTimeout(() => {
            v.remove()
        },600)
        // v.style.textShadow = `text-shadow: 10px 10px 10px ${randomColor};`
    }


    // 开始移动
    let startmove = setTimeout(() => {
        v.style.left = width + v.offsetWidth + "px"
    }, 1000)

    let removemove = setTimeout(() => {
        v.remove()
    }, time * 1000 + 1000)

}
console.log("Ciallo~")

//启动器
let startciallo = setInterval(() => {
    if(maxciallo>document.getElementsByTagName("p").length){
        keepciallo()
        clearTimeout(startciallo) 
    }
        ciallo()
}, 500)
function keepciallo(){
//循环器
setInterval(() => {
    while(maxciallo>document.getElementsByTagName("p").length){
        ciallo()
    }
}, 500)
}
// ciallo()
