document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".tab");
    const codeBlocks = document.querySelectorAll(".code");
    const buttons = document.querySelectorAll(".design-grid button");

    const codeContentMapping = {
        set1: { html: document.getElementById("html1"), css: document.getElementById("css1") },
        set2: { html: document.getElementById("html2"), css: document.getElementById("css2") }
    };

    const buttonData = {
        btn1: {
            html: '&lt;button class="btn1"&gt;Button 1&lt;/button&gt;',
            css: `.btn1 {\n    background: linear-gradient(45deg, #FF5733, #FFC300);\n    color: white;\n}`
        },
        btn2: {
            html: '&lt;button class="btn2"&gt;Button 2&lt;/button&gt;',
            css: `.btn2 {\n    background: linear-gradient(45deg, #33FF57, #57FFA5);\n    color: white;\n}`
        },
        btn3: {
            html: '&lt;button class="btn3"&gt;Button 3&lt;/button&gt;',
            css: `.btn3 {\n    background: linear-gradient(45deg, #3357FF, #57A5FF);\n    color: white;\n}`
        },
        btn4: {
            html: '&lt;button class="btn4"&gt;Button 4&lt;/button&gt;',
            css: `.btn4 {\n    background: linear-gradient(45deg, #FF33A1, #FF85D1);\n    color: white;\n}`
        },
        btn5: {
            html: '&lt;button class="btn5"&gt;Button 5&lt;/button&gt;',
            css: `.btn5 {\n    background: linear-gradient(45deg, #FF8C33, #FFD933);\n    color: white;\n}`
        },
        btn6: {
            html: '&lt;button class="btn6"&gt;Button 6&lt;/button&gt;',
            css: `.btn6 {\n    background: linear-gradient(45deg, #33FFD1, #33FF85);\n    color: white;\n}`
        },
        btn7: {
            html: '&lt;button class="btn7"&gt;Button 7&lt;/button&gt;',
            css: `.btn7 {\n    background: linear-gradient(45deg, #8C33FF, #D633FF);\n    color: white;\n}`
        },
        btn8: {
            html: '&lt;button class="btn8"&gt;Button 8&lt;/button&gt;',
            css: `.btn8 {\n    background: linear-gradient(45deg, #FF33C7, #FF33FF);\n    color: white;\n}`
        },
        btn9: {
            html: '&lt;button class="btn9"&gt;Button 9&lt;/button&gt;',
            css: `.btn9 {\n    background: linear-gradient(45deg, #FFBD33, #FFD933);\n    color: white;\n}`
        },
        btn10: {
            html: '&lt;button class="btn10"&gt;Button 10&lt;/button&gt;',
            css: `.btn10 {\n    background: linear-gradient(45deg, #33FF85, #33FFD1);\n    color: white;\n}`
        },
        btn11: {
            html: '&lt;button class="btn11"&gt;Button 11&lt;/button&gt;',
            css: `.btn11 {\n    background: linear-gradient(45deg, #337BFF, #33C7FF);\n    color: white;\n}`
        },
        btn12: {
            html: '&lt;button class="btn12"&gt;Button 12&lt;/button&gt;',
            css: `.btn12 {\n    background: linear-gradient(45deg, #A833FF, #D633FF);\n    color: white;\n}`
        },
        btn13: {
            html: '&lt;button class="btn13"&gt;Button 13&lt;/button&gt;',
            css: `.btn13 {\n    background: linear-gradient(45deg, #FF3385, #FF85A1);\n    color: white;\n}`
        },
        btn14: {
            html: '&lt;button class="btn14"&gt;Button 14&lt;/button&gt;',
            css: `.btn14 {\n    background: linear-gradient(45deg, #FF6633, #FF8C33);\n    color: white;\n}`
        },
        btn15: {
            html: '&lt;button class="btn15"&gt;Button 15&lt;/button&gt;',
            css: `.btn15 {\n    background: linear-gradient(45deg, #33FFC4, #33FFA5);\n    color: white;\n}`
        },
        btn16: {
            html: '&lt;button class="btn16"&gt;Button 16&lt;/button&gt;',
            css: `.btn16 {\n    background: linear-gradient(45deg, #3333FF, #3357FF);\n    color: white;\n}`
        }
    };


    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            const target = tab.dataset.target;
            const parent = tab.closest(".code-viewer");
            const allTabs = parent.querySelectorAll(".tab");
            const allCodeBlocks = parent.querySelectorAll(".code");

            allTabs.forEach(t => t.classList.remove("active"));
            allCodeBlocks.forEach(c => c.classList.remove("active"));

            tab.classList.add("active");
            parent.querySelector(`#${target}`).classList.add("active");
        });
    });

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const className = button.classList[0];
            const section = button.closest(".section");
            const setName = section.querySelector(".copy-btn").dataset.target;
            const codeViewer = codeContentMapping[setName];

            if (buttonData[className]) {
                codeViewer.html.textContent = buttonData[className].html;
                codeViewer.css.textContent = buttonData[className].css;
            }
        });
    });

    document.querySelectorAll(".copy-btn").forEach(copyBtn => {
        copyBtn.addEventListener("click", function() {
            const setName = copyBtn.dataset.target;
            const codeViewer = codeContentMapping[setName];
            const activeTab = copyBtn.closest(".code-viewer").querySelector(".tab.active").dataset.target;

            let contentToCopy = "";
            if (activeTab.includes("html")) {
                contentToCopy = codeViewer.html.textContent.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            } else if (activeTab.includes("css")) {
                contentToCopy = codeViewer.css.textContent;
            }

            navigator.clipboard.writeText(contentToCopy).then(() => {
                alert("Code copied to clipboard!");
            }).catch(err => {
                console.error("Failed to copy: ", err);
            });
        });
    });
});