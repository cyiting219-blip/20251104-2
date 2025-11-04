// 變數宣告
let menuWidth = 200; // 選單寬度
let menuOpacity = 0; // 選單透明度
let sceneBuffer; // 用來儲存靜態背景的圖形緩衝區
let iframeVisible = false; // iframe 是否顯示
let iframe; // iframe 元素

// 新增：以陣列管理選單項目
let menuItems = [
    { label: "第一單元作品", action: () => { iframe.attribute('src', 'https://cyiting219-blip.github.io/20251014-/'); iframeVisible = true; iframe.show(); } },
    { label: "第一單元筆記", action: () => { iframe.attribute('src', 'https://hackmd.io/@ITh9xKDuSoGWeaOQFpb1-w/HygtxtOJnel'); iframeVisible = true; iframe.show(); } },
    { label: "測驗系統", action: () => { iframe.attribute('src', 'https://cyiting219-blip.github.io/2025-NEW/'); iframeVisible = true; iframe.show(); } },
    { label: "測驗卷筆記", action: () => { iframe.attribute('src', 'about:blank'); iframeVisible = true; iframe.show(); } },
    { label: "淡江大學", action: () => { iframe.attribute('src', 'https://www.tku.edu.tw/'); iframeVisible = true; iframe.show(); } },
    { label: "回到頁面", action: () => { iframeVisible = false; iframe.hide(); } }
];

function setup() {
    createCanvas(windowWidth, windowHeight);
    // 建立一個與畫布等大的圖形緩衝區
    sceneBuffer = createGraphics(windowWidth, windowHeight);
    renderScene(); // 呼叫一次，將背景繪製到緩衝區

    // 建立 iframe，預設隱藏
    iframe = createElement('iframe');
    iframe.style('border', 'none');
    iframe.style('position', 'absolute');
    iframe.style('top', '0');
    iframe.style('left', `${menuWidth}px`); // 放在選單右側
    iframe.style('width', `${windowWidth - menuWidth}px`);
    iframe.style('height', `${windowHeight}px`);
    iframe.hide(); // 預設隱藏
}

function draw() {
    // 1. 將緩衝區的靜態背景貼到主畫布上 (這會清除上一幀的選單)
    image(sceneBuffer, 0, 0);

    // 2. 更新選單透明度
    updateMenuOpacity(); 
    
    // 3. 在背景之上繪製選單
    drawMenu();

    // 4. 在畫面正中間顯示文字
    drawCenteredText();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // 視窗大小改變時，重新建立緩衝區
    sceneBuffer = createGraphics(windowWidth, windowHeight);
    renderScene(); // 重新繪製背景到緩衝區

    // 更新 iframe 的大小
    iframe.style('width', `${windowWidth - menuWidth}px`);
    iframe.style('height', `${windowHeight}px`);
}

// ===== 以下函數現在會在 sceneBuffer 上繪圖 =====

function renderScene() {
    sceneBuffer.background(255); // 在緩衝區上繪製背景
    sceneBuffer.rectMode(CENTER);
    sceneBuffer.stroke(0);

    for (let i = 0; i < 1000; i++) {
        let x = randomGaussian(0.5, 0.13) * sceneBuffer.width;
        let y = randomGaussian(0.5, 0.13) * sceneBuffer.height;
        backInTheDay(x, y);
    }

    for (let i = 0; i < 100; i++) {
        let x = randomGaussian(0.5, 0.13) * sceneBuffer.width;
        let y = randomGaussian(0.5, 0.13) * sceneBuffer.height;
        let s = random(sceneBuffer.width) * random(random());
        sceneBuffer.strokeWeight(random(random()));
        if (random() < 0.5) {
            sceneBuffer.square(x, y, s);
        } else {
            sceneBuffer.circle(x, y, s);
        }
    }
}

function backInTheDay(x, y) {
    let c = int(random(10, 50));
    let scl = 0.005;
    let rnd = int(random(4));
    sceneBuffer.strokeWeight(random(random()));
    sceneBuffer.noFill();
    
    if (rnd == 0) {
        sceneBuffer.beginShape();
        for (let i = 0; i < c; i++) {
            let n = noise(x * scl, y * scl, i * 0.00001);
            let angle = int(n * 10) * (TAU / 4);
            sceneBuffer.vertex(x, y);
            x += cos(angle) * 8;
            y += sin(angle) * 8;
        }
        sceneBuffer.endShape();
    }
    else if (rnd == 1) {
        sceneBuffer.beginShape();
        for (let i = 0; i < c; i++) {
            let n = noise(x * scl, y * scl, i * 0.00001);
            let angle = 10 * n;
            sceneBuffer.vertex(x, y);
            x += cos(angle) * 8;
            y += sin(angle) * 8;
        }
        sceneBuffer.endShape();
    }

    else if (rnd == 2) {
        for (let i = 0; i < c; i++) {
            let n = noise(x * scl, y * scl, i * 0.001);
            let angle = int(n * 15) * (TAU / 4);
            sceneBuffer.strokeWeight(random(random()));
            sceneBuffer.circle(x, y, random(random(10)));
            x += cos(angle) * 8;
            y += sin(angle) * 8;
        }
    }

    else if (rnd == 3) {
        for (let i = 0; i < c; i++) {
            let n = noise(x * scl, y * scl, i * 0.001);
            let angle = 15 * n;
            sceneBuffer.strokeWeight(random(random()));
            sceneBuffer.circle(x, y, random(random(10)));
            x += cos(angle) * 8;
            y += sin(angle) * 8;
        }
    }
}

// ===== 以下函數在主畫布上繪圖 (不變) =====

function updateMenuOpacity() {
    if (mouseX < menuWidth) {
        menuOpacity = lerp(menuOpacity, 255, 0.1);
    } else {
        menuOpacity = lerp(menuOpacity, 0, 0.1);
    }
}

function drawMenu() {
    if (menuOpacity > 0) {
        fill(200, menuOpacity);
        noStroke();
        rect(0, 0, menuWidth, height);

        fill(0, menuOpacity);
        textSize(16);
        textAlign(LEFT, TOP);

        for (let i = 0; i < menuItems.length; i++) {
            let y = 10 + i * 30;
            text(menuItems[i].label, 10, y);
        }
    }
}

function drawCenteredText() {
    fill(255, 0, 0);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("414730373陳奕廷", width / 2, height / 2);
}

function mousePressed() {
    if (mouseX < menuWidth) {
        let idx = Math.floor((mouseY - 10) / 30);
        if (idx >= 0 && idx < menuItems.length) {
            menuItems[idx].action();
        }
    }
}