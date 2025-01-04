document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".tab");
    const codeBlocks = document.querySelectorAll(".code");
    const buttons = document.querySelectorAll(".design-grid button");
    const codeContentHTML = document.getElementById("html");
    const codeContentCSS = document.getElementById("css");

    const buttonData = {
        btn1: {
            html: '&lt;button class="btn1"&gt;Button 1&lt;/button&gt;',
            css: `.btn1 {\n    background-color: #FF5733;\n    color: white;\n}`
        },
        btn2: {
            html: '&lt;button class="btn2"&gt;Button 2&lt;/button&gt;',
            css: `.btn2 {\n    background-color: #33FF57;\n    color: white;\n}`
        },
        btn3: {
            html: '&lt;button class="btn3"&gt;Button 3&lt;/button&gt;',
            css: `.btn3 {\n    background-color: #3357FF;\n    color: white;\n}`
        },
        btn4: {
            html: '&lt;button class="btn4"&gt;Button 4&lt;/button&gt;',
            css: `.btn4 {\n    background-color: #FFC300;\n    color: black;\n}`
        },
        btn5: {
            html: '&lt;button class="btn5"&gt;Button 5&lt;/button&gt;',
            css: `.btn5 {\n    background-color: #DAF7A6;\n    color: black;\n}`
        },
        btn6: {
            html: '&lt;button class="btn6"&gt;Button 6&lt;/button&gt;',
            css: `.btn6 {\n    background-color: #581845;\n    color: white;\n}`
        },
        btn7: {
            html: '&lt;button class="btn7"&gt;Button 7&lt;/button&gt;',
            css: `.btn7 {\n    background-color: #C70039;\n    color: white;\n}`
        },
        btn8: {
            html: '&lt;button class="btn8"&gt;Button 8&lt;/button&gt;',
            css: `.btn8 {\n    background-color: #900C3F;\n    color: white;\n}`
        },
        btn9: {
            html: '&lt;button class="btn9"&gt;Button 9&lt;/button&gt;',
            css: `.btn9 {\n    background-color: #FF5733;\n    border: 2px solid black;\n}`
        },
        btn10: {
            html: '&lt;button class="btn10"&gt;Button 10&lt;/button&gt;',
            css: `.btn10 {\n    background-color: #581845;\n    border-radius: 15px;\n}`
        },
        btn11: {
            html: '&lt;button class="btn11"&gt;Button 11&lt;/button&gt;',
            css: `.btn11 {\n    background-color: #FFBD33;\n    font-weight: bold;\n}`
        },
        btn12: {
            html: '&lt;button class="btn12"&gt;Button 12&lt;/button&gt;',
            css: `.btn12 {\n    background-color: #DFFF00;\n    color: black;\n}`
        },
        btn13: {
            html: '&lt;button class="btn13"&gt;Button 13&lt;/button&gt;',
            css: `.btn13 {\n    background-color: #40E0D0;\n    color: black;\n}`
        },
        btn14: {
            html: '&lt;button class="btn14"&gt;Button 14&lt;/button&gt;',
            css: `.btn14 {\n    background-color: #FF1493;\n    color: white;\n}`
        },
        btn15: {
            html: '&lt;button class="btn15"&gt;Button 15&lt;/button&gt;',
            css: `.btn15 {\n    background-color: #6A5ACD;\n    color: white;\n}`
        },
        btn16: {
            html: '&lt;button class="btn16"&gt;Button 16&lt;/button&gt;',
            css: `.btn16 {\n    background-color: #7FFF00;\n    color: black;\n}`
        }
    };

    // タブ切り替え機能
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(tab => tab.classList.remove("active"));
            codeBlocks.forEach(code => code.classList.remove("active"));

            tab.classList.add("active");
            const targetCode = document.getElementById(tab.dataset.target);
            targetCode.classList.add("active");
        });
    });

    // ボタンクリックでコードを更新
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonClass = button.classList[0];
            if (buttonData[buttonClass]) {
                codeContentHTML.innerHTML = buttonData[buttonClass].html;
                codeContentCSS.innerText = buttonData[buttonClass].css;
            }
        });
    });
});
