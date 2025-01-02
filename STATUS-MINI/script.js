document.addEventListener('DOMContentLoaded', () => {
    const statusWindows = document.querySelectorAll('.status-window');

    statusWindows.forEach(statusWindow => {
        const stats = statusWindow.querySelectorAll('.stat');

        stats.forEach(stat => {
            const value = parseInt(stat.getAttribute('data-value'));
            const color = stat.getAttribute('data-color');
            const bar = stat.querySelector('.stat-bar');

            const attributes = [
                'hp', 'atk',
            ];

            attributes.forEach(attr => {
                const attrValue = stat.getAttribute(`data-${attr}`);
                if (attrValue) {
                    const currentValue = parseInt(attrValue);
                    const { min, max, imgSrc } = getRarityImage(attr, currentValue);
                    const statColor = getColor(currentValue, attr);
                    const percentage = calculatePercentage(currentValue, min, max);

                    stat.setAttribute('data-value', percentage.toFixed(2));
                    stat.querySelector('.stat-number').innerText = `${currentValue}`;

                    if (imgSrc) {
                        const rarityImage = stat.querySelector('.rarity-image');
                        rarityImage.src = imgSrc;
                    }

                    const squares = Math.floor(percentage / 10);
                    bar.innerHTML = '';
                    for (let i = 0; i < 10; i++) {
                        const square = document.createElement('div');
                        square.style.backgroundColor = i < squares ? statColor : '#444';
                        bar.appendChild(square);
                    }
                }
            });
        });

        const expBar = statusWindow.querySelector('.exp-bar');
        const affinityBar = statusWindow.querySelector('.affinity-bar');

        const currentExp = parseInt(expBar.getAttribute('data-current-exp'));
        const maxExp = parseInt(expBar.getAttribute('data-max-exp'));
        expBar.style.width = (currentExp / maxExp * 100) + '%';
        expBar.querySelector('.exp-text').innerText = `${currentExp}/${maxExp}`; // 修正

        const currentAffinity = parseInt(affinityBar.getAttribute('data-current-affinity'));
        const maxAffinity = parseInt(affinityBar.getAttribute('data-max-affinity'));
        affinityBar.style.width = (currentAffinity / maxAffinity * 100) + '%';
        affinityBar.querySelector('.affinity-text').innerText = `${currentAffinity}/${maxAffinity}`; // 修正

        const levelInfo = statusWindow.querySelector('.level-info');
        const level = levelInfo.querySelector('.level');
        const affinity = levelInfo.querySelector('.affinity');

        const levelValue = level.getAttribute('data-level');
        const maxLevelValue = level.getAttribute('data-max-level');
        const affinityValue = affinity.getAttribute('data-affinity');
        const maxAffinityValue = affinity.getAttribute('data-max-affinity');

        level.innerText = `Lv.${levelValue}/${maxLevelValue}`;
        affinity.innerText = `好感度Lv.${affinityValue}/${maxAffinityValue}`;
    });
});

function calculatePercentage(value, min, max) {
    return ((value - min) / (max - min)) * 100;
}

function getRarityImage(type, value) {
    let specificRanges = [];

    if (type === 'hp') {
        specificRanges = [
            { min: 0, max: 0, src: '../rare/NA.jpg' },
            { min: 1, max: 1000, src: '../rare/F.jpg' },
        ];
    }
    else if (type === 'atk') {
        specificRanges = [
            { min: 0, max: 0, src: '../rare/NA.jpg' },
            { min: 1, max: 1000, src: '../rare/F.jpg' },
        ];
    }

    const range = specificRanges.find(r => value >= r.min && value <= r.max);
    return range ? { min: range.min, max: range.max, imgSrc: range.src } : { min: 0, max: 10000, imgSrc: '' };
}

function getColor(value, type) {
    if (type === 'hp') {
        if (value === 0) return '#FFFFFF';
        if (value >= 1 && value <= 1000) return '#cccccc';
    }
    else if (type === 'atk') {
        if (value === 0) return '#FFFFFF';
        if (value >= 1 && value <= 1000) return '#cccccc'
    }
    return '#ffffff';
}



