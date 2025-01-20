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

        btn17: {
            html: '&lt;button class="btn17"&gt;Button 17&lt;/button&gt;',
            css: `.btn17 {\n    background: linear-gradient(45deg, #F39C12, #F1C40F);\n    color: white;\n}`
        },
        btn18: {
            html: '&lt;button class="btn18"&gt;Button 18&lt;/button&gt;',
            css: `.btn18 {\n    background: linear-gradient(45deg, #1ABC9C, #16A085);\n    color: white;\n}`
        },
        btn19: {
            html: '&lt;button class="btn19"&gt;Button 19&lt;/button&gt;',
            css: `.btn19 {\n    background: linear-gradient(45deg, #9B59B6, #8E44AD);\n    color: white;\n}`
        },
        btn20: {
            html: '&lt;button class="btn20"&gt;Button 20&lt;/button&gt;',
            css: `.btn20 {\n    background: linear-gradient(45deg, #E74C3C, #C0392B);\n    color: white;\n}`
        },
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