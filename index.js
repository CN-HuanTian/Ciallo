console.log("version:1.63")
console.log("BY 幻天")
console.log("QQ:3365543554")
console.log("开源，使用/引用时标明出处")

// 获取背景
var bg = document.getElementById("body")

// 获取屏幕尺寸
var width = window.innerWidth;
var height = window.innerHeight;
console.log('窗口宽度：' + width);
console.log('窗口高度：' + height);

// 判断是否为移动设备并限制ciallo数量
let u = navigator.userAgent
let mobile = !!u.match(/AppleWebKit.*Mobile.*/)
console.log("pc设备：" + !mobile)

// 允许用户自定义最大显示数量
var maxciallo = 0
var ciallosleep = 500
if (mobile) {
    maxciallo = 25
} else {
    maxciallo = 75
    ciallosleep = 100
}

// 可以通过URL参数或用户设置自定义数量
const urlParams = new URLSearchParams(window.location.search);
const customMax = urlParams.get('max');
if (customMax && !isNaN(customMax)) {
    maxciallo = parseInt(customMax);
    console.log("自定义Ciallo数量：" + maxciallo);
} else {
    console.log("Ciallo数量：" + maxciallo)
}

// 也可以通过弹窗让用户输入自定义数量
let userMax = localStorage.getItem('userMaxCiallo');
if (userMax !== null) {
    userMax = parseInt(userMax);
    if (!isNaN(userMax) && userMax > 0) {
        maxciallo = userMax;
        console.log("用户自定义Ciallo数量：" + maxciallo);
    }
} else {
    // 首次访问可以提示用户设置自定义数量
    // const userInput = prompt("请输入最大Ciallo数量 (默认" + maxciallo + "):", maxciallo);
    // if (userInput !== null && !isNaN(userInput) && parseInt(userInput) > 0) {
        // maxciallo = parseInt(userInput);
        // localStorage.setItem('userMaxCiallo', maxciallo);
        // console.log("用户自定义Ciallo数量：" + maxciallo);
    // }
}

// 测试：刷新音频
let audio = new Audio('./assets/ciallo.mp3')

// 十六进制列表
var colorlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "A", "B", "C", "D", "E", "F"]

// 随机字母
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// 键盘事件统计
let stats = {
    totalPresses: 0,
    correctPresses: 0,
    wrongPresses: 0,
    accuracy: 0
};

// 创建数量控制元素
const maxControlDiv = document.createElement('div');
maxControlDiv.id = 'max-control';
maxControlDiv.innerHTML = `
    <div>最大数量: <input type="number" id="max-input" min="1" max="200" value="${maxciallo}"> 
    <button id="set-max-btn">设置</button>
    <button id="reset-btn">重置</button></div>
`;
document.body.appendChild(maxControlDiv);

// 设置按钮事件
document.getElementById('set-max-btn').addEventListener('click', function() {
    const newMax = parseInt(document.getElementById('max-input').value);
    if (!isNaN(newMax) && newMax > 0 && newMax <= 200) {
        maxciallo = newMax;
        localStorage.setItem('userMaxCiallo', newMax);
        console.log("用户自定义Ciallo数量：" + maxciallo);
    } else {
        alert('请输入1-200之间的有效数字');
    }
});

// 重置按钮事件
document.getElementById('reset-btn').addEventListener('click', function() {
    document.getElementById('max-input').value = mobile ? 25 : 75;
    maxciallo = mobile ? 25 : 75;
    localStorage.removeItem('userMaxCiallo');
    console.log("已重置Ciallo数量：" + maxciallo);
});

// 创建统计显示元素
const statsDiv = document.createElement('div');
statsDiv.id = 'stats';
statsDiv.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    color: white;
    font-family: monospace;
    font-size: 16px;
    z-index: 1000;
    background-color: rgba(0,0,0,0.6);
    padding: 10px;
    border-radius: 5px;
`;
statsDiv.innerHTML = `
    <div>总按键: <span id="total-presses">0</span></div>
    <div>正确: <span id="correct-presses">0</span></div>
    <div>错误: <span id="wrong-presses">0</span></div>
    <div>正确率: <span id="accuracy">0%</span></div>
    <div>当前数量: <span id="current-count">0</span></div>
`;
document.body.appendChild(statsDiv);

// 更新统计显示
function updateStatsDisplay() {
    document.getElementById('total-presses').textContent = stats.totalPresses;
    document.getElementById('correct-presses').textContent = stats.correctPresses;
    document.getElementById('wrong-presses').textContent = stats.wrongPresses;
    stats.accuracy = stats.totalPresses > 0 ? Math.round((stats.correctPresses / stats.totalPresses) * 100) : 0;
    document.getElementById('accuracy').textContent = stats.accuracy + '%';
    document.getElementById('current-count').textContent = document.getElementsByTagName("p").length;
}

// 随机数生成器
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 随机颜色生成器
function randomColor() {
    let code = "#"
    for (let i = 0; i < 6; i++) {
        let num = randomInt(0, 15)
        code += String(colorlist[(num)])
    }
    return code
}

// 随机字母生成器
function randomLetter() {
    const index = randomInt(0, alphabet.length - 1);
    return alphabet[index];
}

function ciallo() {
    // 初始化
    let v = document.createElement("p")
    
    // 生成随机字母并显示在文本中
    const letter = randomLetter();
    v.innerText = `Ciallo～(∠・ω - )⌒★ [${letter}]`
    v.setAttribute('data-letter', letter); // 存储字母用于键盘匹配
    
    // 初始大小
    v.style.fontSize = randomInt(20, 40) + "px"
    // 颜色
    v.style.color = randomColor()
    // 载入至页面
    bg.appendChild(v)
    
    // 确保获取元素尺寸后再设置位置
    v.style.visibility = 'hidden'; // 先隐藏元素以获取准确尺寸
    
    // 强制重排以获取准确尺寸
    v.offsetHeight;
    
    // 计算元素尺寸
    const elementWidth = v.offsetWidth;
    const elementHeight = v.offsetHeight;
    
    // 设置初始位置，确保不超出屏幕边界
    const maxTop = height - elementHeight;
    const topPosition = maxTop > 0 ? randomInt(0, maxTop) : 0;
    
    v.style.left = -100 - elementWidth + "px"
    v.style.top = topPosition + "px"
    v.style.visibility = 'visible'; // 显示元素
    
    // 移动速度
    time = randomInt(5, 15)
    v.style.transition = `all ${time}s linear`
    
    // 触发动画效果
    v.triggerEffect = () => {
        clearTimeout(removemove)
        clearTimeout(startmove)
        let music = audio.cloneNode(true);
        music.play();
        v.style.left = v.offsetLeft + "px"
        v.style.transition = "none";
        v.style.transition = `all 0.5s linear`
        v.style.opacity = 0
        v.style.fontSize = Number(v.style.fontSize.slice(0, v.style.fontSize.length - 2)) + 5 + "px"
        v.style.textShadow = `10px 10px 10px ${randomColor()};`
        v.style.pointerEvents = "none"
        setTimeout(() => {
            v.remove();
            updateStatsDisplay(); // 更新统计
        }, 600)
    }

    // 点击事件
    v.onclick = () => {
        v.triggerEffect();
    }

    // 开始移动
    let startmove = setTimeout(() => {
        v.style.left = width + elementWidth + "px"
    }, 1000)
    // 一段时间后销毁
    let removemove = setTimeout(() => {
        v.remove()
    }, time * 1000 + 1000)

    updateStatsDisplay(); // 更新统计
}

console.log("Ciallo~")

// 键盘事件监听
document.addEventListener('keydown', function(event) {
    // 忽略修饰键和其他非字母键
    if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
    }
    
    const key = event.key.toUpperCase();
    
    // 检查是否是字母键
    if (key.length === 1 && /[A-Z]/.test(key)) {
        stats.totalPresses++;
        let matched = false;
        
        // 查找对应的文本元素
        const elements = document.getElementsByTagName('p');
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (element.getAttribute('data-letter') === key) {
                element.triggerEffect();
                stats.correctPresses++;
                matched = true;
                break; // 只触发一个匹配的元素
            }
        }
        
        if (!matched) {
            stats.wrongPresses++;
        }
        
        updateStatsDisplay();
    }
});

// 启动器
let startciallo = setInterval(() => {
    if (maxciallo > document.getElementsByTagName("p").length) {
        ciallo()
    } else {
        keepciallo()
        clearTimeout(startciallo)
    }
}, ciallosleep)

function keepciallo() {
    // 循环器
    setInterval(() => {
        while (maxciallo > document.getElementsByTagName("p").length) {
            ciallo()
        }
    }, ciallosleep)
}

// ciallo()
