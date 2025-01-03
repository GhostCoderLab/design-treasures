document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".tab");
    const codeBlocks = document.querySelectorAll(".code");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove active class from all tabs and code blocks
            tabs.forEach(tab => tab.classList.remove("active"));
            codeBlocks.forEach(code => code.classList.remove("active"));

            // Add active class to the clicked tab and corresponding code block
            tab.classList.add("active");
            const targetCode = document.getElementById(tab.dataset.target);
            targetCode.classList.add("active");
        });
    });
});
