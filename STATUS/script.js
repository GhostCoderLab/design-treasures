document.addEventListener('DOMContentLoaded', () => {
    const statusWindows = document.querySelectorAll('.status-window');

    statusWindows.forEach(statusWindow => {
        const stats = statusWindow.querySelectorAll('.stat');

        stats.forEach(stat => {
            const value = parseInt(stat.getAttribute('data-value'));
            const color = stat.getAttribute('data-color');
            const bar = stat.querySelector('.stat-bar');

            const attributes = [
                'hp', 'mp', 'atk', 'dex', 'def', 'matk', 'mdef', 'agi', 'int', 'eva',
                'faith', 'mys', 'charm', 'luk', 'pot'
            ];

            attributes.forEach(attr => {
                const attrValue = stat.getAttribute(`data-${attr}`);
                if (attrValue) {
                    const currentValue = parseInt(attrValue);
                    const { min, max, imgSrc } = getRarityImage(attr, currentValue);
                    const statColor = getColor(currentValue, attr);
                    const percentage = calculatePercentage(currentValue, min, max);

                    // data-value の設定
                    stat.setAttribute('data-value', percentage.toFixed(2));
                    stat.querySelector('.stat-number').innerText = `${currentValue}`;

                    // 画像の更新
                    if (imgSrc) {
                        const rarityImage = stat.querySelector('.rarity-image');
                        rarityImage.src = imgSrc;
                    }

                    // スタットバーの設定
                    const squares = Math.floor(percentage / 10);
                    bar.innerHTML = ''; // 既存のバーをクリア
                    for (let i = 0; i < 10; i++) {
                        const square = document.createElement('div');
                        square.style.backgroundColor = i < squares ? statColor : '#444';
                        bar.appendChild(square);
                    }
                }
            });
        });

        // 経験値と好感度バーの計算
        const expBar = statusWindow.querySelector('.exp-bar');
        const affinityBar = statusWindow.querySelector('.affinity-bar');

        const currentExp = parseInt(expBar.getAttribute('data-current-exp'));
        const maxExp = parseInt(expBar.getAttribute('data-max-exp'));
        expBar.style.width = (currentExp / maxExp * 100) + '%';
        expBar.innerText = `${currentExp}/${maxExp}`;

        const currentAffinity = parseInt(affinityBar.getAttribute('data-current-affinity'));
        const maxAffinity = parseInt(affinityBar.getAttribute('data-max-affinity'));
        affinityBar.style.width = (currentAffinity / maxAffinity * 100) + '%';
        affinityBar.innerText = `${currentAffinity}/${maxAffinity}`;

        // Level and Affinity Update
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
            { min: 0, max: 0, src: '/rare/NA.jpg' },
            { min: 1, max: 1000, src: '/rare/F.jpg' },
            { min: 1001, max: 2000, src: '/rare/E.jpg' },
            { min: 2001, max: 3000, src: '/rare/D.jpg' },
            { min: 3001, max: 4000, src: '/rare/C.jpg' },
            { min: 4001, max: 5000, src: '/rare/B.jpg' },
            { min: 5001, max: 6000, src: '/rare/A.jpg' },
            { min: 6001, max: 7000, src: '/rare/S.jpg' },
            { min: 7001, max: 8000, src: '/rare/SS.jpg' },
            { min: 8001, max: 9000, src: '/rare/SSS.jpg' },
            { min: 9001, max: 10000, src: '/rare/SR.jpg' },
            { min: 10001, max: 11000, src: '/rare/SSR.jpg' },
            { min: 11001, max: 12000, src: '/rare/UR.jpg' },
            { min: 12001, max: 13000, src: '/rare/LR.jpg' },
            { min: 13001, max: 14000, src: '/rare/MR.jpg' },
            { min: 14001, max: 15000, src: '/rare/X.jpg' },
            { min: 15001, max: 16000, src: '/rare/XX.jpg' },
            { min: 16001, max: 17000, src: '/rare/XXX.jpg' },
            { min: 17001, max: 18000, src: '/rare/EX.jpg' },
            { min: 18001, max: 19000, src: '/rare/DX.jpg' },
            { min: 19001, max: 20000, src: '/rare/CX.jpg' },
            { min: 20001, max: 21000, src: '/rare/BX.jpg' },
            { min: 21001, max: 22000, src: '/rare/AX.jpg' },
            { min: 22001, max: 23000, src: '/rare/SX.jpg' },
            { min: 23001, max: 24000, src: '/rare/XR.jpg' },
            { min: 24001, max: 25000, src: '/rare/XXR.jpg' },
            { min: 25001, max: 26000, src: '/rare/EXR.jpg' },
            { min: 26001, max: 27000, src: '/rare/DXR.jpg' },
            { min: 27001, max: 28000, src: '/rare/CXR.jpg' },
            { min: 28001, max: 29000, src: '/rare/BXR.jpg' },
            { min: 29001, max: 30000, src: '/rare/AXR.jpg' },
            { min: 30001, max: 31000, src: '/rare/SXR.jpg' },
            { min: 31001, max: 32000, src: '/rare/Y.jpg' },
            { min: 32001, max: 33000, src: '/rare/YY.jpg' },
            { min: 33001, max: 34000, src: '/rare/YYY.jpg' },
            { min: 34001, max: 35000, src: '/rare/Z.jpg' },
            { min: 35001, max: 36000, src: '/rare/ZZ.jpg' },
            { min: 36001, max: 37000, src: '/rare/ZZZ.jpg' },
            { min: 37001, max: 38000, src: '/rare/ZR.jpg' },
            { min: 38001, max: 39000, src: '/rare/ZZR.jpg' },
            { min: 39001, max: 40000, src: '/rare/MASTER.jpg' },
            { min: 40001, max: 50000, src: '/rare/ERROR.jpg' },
            { min: 50001, max: 100000, src: '/rare/ERROR2.jpg' },
            { min: 100001, max: 999998, src: '/rare/HATENA.jpg' },
            { min: 999999, max: 999999, src: '/rare/MUGEN.jpg' }
        ];
    }
    else if (type === 'mp') {
        specificRanges = [
            { min: 0, max: 0, src: '/rare/NA.jpg' },
            { min: 1, max: 1000, src: '/rare/F.jpg' },
            { min: 1001, max: 2000, src: '/rare/E.jpg' },
            { min: 2001, max: 3000, src: '/rare/D.jpg' },
            { min: 3001, max: 4000, src: '/rare/C.jpg' },
            { min: 4001, max: 5000, src: '/rare/B.jpg' },
            { min: 5001, max: 6000, src: '/rare/A.jpg' },
            { min: 6001, max: 7000, src: '/rare/S.jpg' },
            { min: 7001, max: 8000, src: '/rare/SS.jpg' },
            { min: 8001, max: 9000, src: '/rare/SSS.jpg' },
            { min: 9001, max: 10000, src: '/rare/SR.jpg' },
            { min: 10001, max: 11000, src: '/rare/SSR.jpg' },
            { min: 11001, max: 12000, src: '/rare/UR.jpg' },
            { min: 12001, max: 13000, src: '/rare/LR.jpg' },
            { min: 13001, max: 14000, src: '/rare/MR.jpg' },
            { min: 14001, max: 15000, src: '/rare/X.jpg' },
            { min: 15001, max: 16000, src: '/rare/XX.jpg' },
            { min: 16001, max: 17000, src: '/rare/XXX.jpg' },
            { min: 17001, max: 18000, src: '/rare/EX.jpg' },
            { min: 18001, max: 19000, src: '/rare/DX.jpg' },
            { min: 19001, max: 20000, src: '/rare/CX.jpg' },
            { min: 20001, max: 21000, src: '/rare/BX.jpg' },
            { min: 21001, max: 22000, src: '/rare/AX.jpg' },
            { min: 22001, max: 23000, src: '/rare/SX.jpg' },
            { min: 23001, max: 24000, src: '/rare/XR.jpg' },
            { min: 24001, max: 25000, src: '/rare/XXR.jpg' },
            { min: 25001, max: 26000, src: '/rare/EXR.jpg' },
            { min: 26001, max: 27000, src: '/rare/DXR.jpg' },
            { min: 27001, max: 28000, src: '/rare/CXR.jpg' },
            { min: 28001, max: 29000, src: '/rare/BXR.jpg' },
            { min: 29001, max: 30000, src: '/rare/AXR.jpg' },
            { min: 30001, max: 31000, src: '/rare/SXR.jpg' },
            { min: 31001, max: 32000, src: '/rare/Y.jpg' },
            { min: 32001, max: 33000, src: '/rare/YY.jpg' },
            { min: 33001, max: 34000, src: '/rare/YYY.jpg' },
            { min: 34001, max: 35000, src: '/rare/Z.jpg' },
            { min: 35001, max: 36000, src: '/rare/ZZ.jpg' },
            { min: 36001, max: 37000, src: '/rare/ZZZ.jpg' },
            { min: 37001, max: 38000, src: '/rare/ZR.jpg' },
            { min: 38001, max: 39000, src: '/rare/ZZR.jpg' },
            { min: 39001, max: 40000, src: '/rare/MASTER.jpg' },
            { min: 40001, max: 50000, src: '/rare/ERROR.jpg' },
            { min: 50001, max: 100000, src: '/rare/ERROR2.jpg' },
            { min: 100001, max: 999998, src: '/rare/HATENA.jpg' },
            { min: 999999, max: 999999, src: '/rare/MUGEN.jpg' }
        ];
    }
    else if (type === 'atk') {
        specificRanges = [
            { min: 0, max: 0, src: '/rare/NA.jpg' },
            { min: 1, max: 1000, src: '/rare/F.jpg' },
            { min: 1001, max: 2000, src: '/rare/E.jpg' },
            { min: 2001, max: 3000, src: '/rare/D.jpg' },
            { min: 3001, max: 4000, src: '/rare/C.jpg' },
            { min: 4001, max: 5000, src: '/rare/B.jpg' },
            { min: 5001, max: 6000, src: '/rare/A.jpg' },
            { min: 6001, max: 7000, src: '/rare/S.jpg' },
            { min: 7001, max: 8000, src: '/rare/SS.jpg' },
            { min: 8001, max: 9000, src: '/rare/SSS.jpg' },
            { min: 9001, max: 10000, src: '/rare/SR.jpg' },
            { min: 10001, max: 11000, src: '/rare/SSR.jpg' },
            { min: 11001, max: 12000, src: '/rare/UR.jpg' },
            { min: 12001, max: 13000, src: '/rare/LR.jpg' },
            { min: 13001, max: 14000, src: '/rare/MR.jpg' },
            { min: 14001, max: 15000, src: '/rare/X.jpg' },
            { min: 15001, max: 16000, src: '/rare/XX.jpg' },
            { min: 16001, max: 17000, src: '/rare/XXX.jpg' },
            { min: 17001, max: 18000, src: '/rare/EX.jpg' },
            { min: 18001, max: 19000, src: '/rare/DX.jpg' },
            { min: 19001, max: 20000, src: '/rare/CX.jpg' },
            { min: 20001, max: 21000, src: '/rare/BX.jpg' },
            { min: 21001, max: 22000, src: '/rare/AX.jpg' },
            { min: 22001, max: 23000, src: '/rare/SX.jpg' },
            { min: 23001, max: 24000, src: '/rare/XR.jpg' },
            { min: 24001, max: 25000, src: '/rare/XXR.jpg' },
            { min: 25001, max: 26000, src: '/rare/EXR.jpg' },
            { min: 26001, max: 27000, src: '/rare/DXR.jpg' },
            { min: 27001, max: 28000, src: '/rare/CXR.jpg' },
            { min: 28001, max: 29000, src: '/rare/BXR.jpg' },
            { min: 29001, max: 30000, src: '/rare/AXR.jpg' },
            { min: 30001, max: 31000, src: '/rare/SXR.jpg' },
            { min: 31001, max: 32000, src: '/rare/Y.jpg' },
            { min: 32001, max: 33000, src: '/rare/YY.jpg' },
            { min: 33001, max: 34000, src: '/rare/YYY.jpg' },
            { min: 34001, max: 35000, src: '/rare/Z.jpg' },
            { min: 35001, max: 36000, src: '/rare/ZZ.jpg' },
            { min: 36001, max: 37000, src: '/rare/ZZZ.jpg' },
            { min: 37001, max: 38000, src: '/rare/ZR.jpg' },
            { min: 38001, max: 39000, src: '/rare/ZZR.jpg' },
            { min: 39001, max: 40000, src: '/rare/MASTER.jpg' },
            { min: 40001, max: 50000, src: '/rare/ERROR.jpg' },
            { min: 50001, max: 100000, src: '/rare/ERROR2.jpg' },
            { min: 100001, max: 999998, src: '/rare/HATENA.jpg' },
            { min: 999999, max: 999999, src: '/rare/MUGEN.jpg' }
        ];
    }
    else if (type === 'dex') {
        specificRanges = [
            { min: 0, max: 0, src: '/rare/NA.jpg' },
            { min: 1, max: 1000, src: '/rare/F.jpg' },
            { min: 1001, max: 2000, src: '/rare/E.jpg' },
            { min: 2001, max: 3000, src: '/rare/D.jpg' },
            { min: 3001, max: 4000, src: '/rare/C.jpg' },
            { min: 4001, max: 5000, src: '/rare/B.jpg' },
            { min: 5001, max: 6000, src: '/rare/A.jpg' },
            { min: 6001, max: 7000, src: '/rare/S.jpg' },
            { min: 7001, max: 8000, src: '/rare/SS.jpg' },
            { min: 8001, max: 9000, src: '/rare/SSS.jpg' },
            { min: 9001, max: 10000, src: '/rare/SR.jpg' },
            { min: 10001, max: 11000, src: '/rare/SSR.jpg' },
            { min: 11001, max: 12000, src: '/rare/UR.jpg' },
            { min: 12001, max: 13000, src: '/rare/LR.jpg' },
            { min: 13001, max: 14000, src: '/rare/MR.jpg' },
            { min: 14001, max: 15000, src: '/rare/X.jpg' },
            { min: 15001, max: 16000, src: '/rare/XX.jpg' },
            { min: 16001, max: 17000, src: '/rare/XXX.jpg' },
            { min: 17001, max: 18000, src: '/rare/EX.jpg' },
            { min: 18001, max: 19000, src: '/rare/DX.jpg' },
            { min: 19001, max: 20000, src: '/rare/CX.jpg' },
            { min: 20001, max: 21000, src: '/rare/BX.jpg' },
            { min: 21001, max: 22000, src: '/rare/AX.jpg' },
            { min: 22001, max: 23000, src: '/rare/SX.jpg' },
            { min: 23001, max: 24000, src: '/rare/XR.jpg' },
            { min: 24001, max: 25000, src: '/rare/XXR.jpg' },
            { min: 25001, max: 26000, src: '/rare/EXR.jpg' },
            { min: 26001, max: 27000, src: '/rare/DXR.jpg' },
            { min: 27001, max: 28000, src: '/rare/CXR.jpg' },
            { min: 28001, max: 29000, src: '/rare/BXR.jpg' },
            { min: 29001, max: 30000, src: '/rare/AXR.jpg' },
            { min: 30001, max: 31000, src: '/rare/SXR.jpg' },
            { min: 31001, max: 32000, src: '/rare/Y.jpg' },
            { min: 32001, max: 33000, src: '/rare/YY.jpg' },
            { min: 33001, max: 34000, src: '/rare/YYY.jpg' },
            { min: 34001, max: 35000, src: '/rare/Z.jpg' },
            { min: 35001, max: 36000, src: '/rare/ZZ.jpg' },
            { min: 36001, max: 37000, src: '/rare/ZZZ.jpg' },
            { min: 37001, max: 38000, src: '/rare/ZR.jpg' },
            { min: 38001, max: 39000, src: '/rare/ZZR.jpg' },
            { min: 39001, max: 40000, src: '/rare/MASTER.jpg' },
            { min: 40001, max: 50000, src: '/rare/ERROR.jpg' },
            { min: 50001, max: 100000, src: '/rare/ERROR2.jpg' },
            { min: 100001, max: 999998, src: '/rare/HATENA.jpg' },
            { min: 999999, max: 999999, src: '/rare/MUGEN.jpg' }
        ];
    }
    else if (type === 'def') {
        specificRanges = [
            { min: 0, max: 0, src: '/rare/NA.jpg' },
            { min: 1, max: 1000, src: '/rare/F.jpg' },
            { min: 1001, max: 2000, src: '/rare/E.jpg' },
            { min: 2001, max: 3000, src: '/rare/D.jpg' },
            { min: 3001, max: 4000, src: '/rare/C.jpg' },
            { min: 4001, max: 5000, src: '/rare/B.jpg' },
            { min: 5001, max: 6000, src: '/rare/A.jpg' },
            { min: 6001, max: 7000, src: '/rare/S.jpg' },
            { min: 7001, max: 8000, src: '/rare/SS.jpg' },
            { min: 8001, max: 9000, src: '/rare/SSS.jpg' },
            { min: 9001, max: 10000, src: '/rare/SR.jpg' },
            { min: 10001, max: 11000, src: '/rare/SSR.jpg' },
            { min: 11001, max: 12000, src: '/rare/UR.jpg' },
            { min: 12001, max: 13000, src: '/rare/LR.jpg' },
            { min: 13001, max: 14000, src: '/rare/MR.jpg' },
            { min: 14001, max: 15000, src: '/rare/X.jpg' },
            { min: 15001, max: 16000, src: '/rare/XX.jpg' },
            { min: 16001, max: 17000, src: '/rare/XXX.jpg' },
            { min: 17001, max: 18000, src: '/rare/EX.jpg' },
            { min: 18001, max: 19000, src: '/rare/DX.jpg' },
            { min: 19001, max: 20000, src: '/rare/CX.jpg' },
            { min: 20001, max: 21000, src: '/rare/BX.jpg' },
            { min: 21001, max: 22000, src: '/rare/AX.jpg' },
            { min: 22001, max: 23000, src: '/rare/SX.jpg' },
            { min: 23001, max: 24000, src: '/rare/XR.jpg' },
            { min: 24001, max: 25000, src: '/rare/XXR.jpg' },
            { min: 25001, max: 26000, src: '/rare/EXR.jpg' },
            { min: 26001, max: 27000, src: '/rare/DXR.jpg' },
            { min: 27001, max: 28000, src: '/rare/CXR.jpg' },
            { min: 28001, max: 29000, src: '/rare/BXR.jpg' },
            { min: 29001, max: 30000, src: '/rare/AXR.jpg' },
            { min: 30001, max: 31000, src: '/rare/SXR.jpg' },
            { min: 31001, max: 32000, src: '/rare/Y.jpg' },
            { min: 32001, max: 33000, src: '/rare/YY.jpg' },
            { min: 33001, max: 34000, src: '/rare/YYY.jpg' },
            { min: 34001, max: 35000, src: '/rare/Z.jpg' },
            { min: 35001, max: 36000, src: '/rare/ZZ.jpg' },
            { min: 36001, max: 37000, src: '/rare/ZZZ.jpg' },
            { min: 37001, max: 38000, src: '/rare/ZR.jpg' },
            { min: 38001, max: 39000, src: '/rare/ZZR.jpg' },
            { min: 39001, max: 40000, src: '/rare/MASTER.jpg' },
            { min: 40001, max: 50000, src: '/rare/ERROR.jpg' },
            { min: 50001, max: 100000, src: '/rare/ERROR2.jpg' },
            { min: 100001, max: 999998, src: '/rare/HATENA.jpg' },
            { min: 999999, max: 999999, src: '/rare/MUGEN.jpg' }
        ];
    }
    else if (type === 'matk') {
        specificRanges = [
            { min: 0, max: 0, src: '/rare/NA.jpg' },
            { min: 1, max: 1000, src: '/rare/F.jpg' },
            { min: 1001, max: 2000, src: '/rare/E.jpg' },
            { min: 2001, max: 3000, src: '/rare/D.jpg' },
            { min: 3001, max: 4000, src: '/rare/C.jpg' },
            { min: 4001, max: 5000, src: '/rare/B.jpg' },
            { min: 5001, max: 6000, src: '/rare/A.jpg' },
            { min: 6001, max: 7000, src: '/rare/S.jpg' },
            { min: 7001, max: 8000, src: '/rare/SS.jpg' },
            { min: 8001, max: 9000, src: '/rare/SSS.jpg' },
            { min: 9001, max: 10000, src: '/rare/SR.jpg' },
            { min: 10001, max: 11000, src: '/rare/SSR.jpg' },
            { min: 11001, max: 12000, src: '/rare/UR.jpg' },
            { min: 12001, max: 13000, src: '/rare/LR.jpg' },
            { min: 13001, max: 14000, src: '/rare/MR.jpg' },
            { min: 14001, max: 15000, src: '/rare/X.jpg' },
            { min: 15001, max: 16000, src: '/rare/XX.jpg' },
            { min: 16001, max: 17000, src: '/rare/XXX.jpg' },
            { min: 17001, max: 18000, src: '/rare/EX.jpg' },
            { min: 18001, max: 19000, src: '/rare/DX.jpg' },
            { min: 19001, max: 20000, src: '/rare/CX.jpg' },
            { min: 20001, max: 21000, src: '/rare/BX.jpg' },
            { min: 21001, max: 22000, src: '/rare/AX.jpg' },
            { min: 22001, max: 23000, src: '/rare/SX.jpg' },
            { min: 23001, max: 24000, src: '/rare/XR.jpg' },
            { min: 24001, max: 25000, src: '/rare/XXR.jpg' },
            { min: 25001, max: 26000, src: '/rare/EXR.jpg' },
            { min: 26001, max: 27000, src: '/rare/DXR.jpg' },
            { min: 27001, max: 28000, src: '/rare/CXR.jpg' },
            { min: 28001, max: 29000, src: '/rare/BXR.jpg' },
            { min: 29001, max: 30000, src: '/rare/AXR.jpg' },
            { min: 30001, max: 31000, src: '/rare/SXR.jpg' },
            { min: 31001, max: 32000, src: '/rare/Y.jpg' },
            { min: 32001, max: 33000, src: '/rare/YY.jpg' },
            { min: 33001, max: 34000, src: '/rare/YYY.jpg' },
            { min: 34001, max: 35000, src: '/rare/Z.jpg' },
            { min: 35001, max: 36000, src: '/rare/ZZ.jpg' },
            { min: 36001, max: 37000, src: '/rare/ZZZ.jpg' },
            { min: 37001, max: 38000, src: '/rare/ZR.jpg' },
            { min: 38001, max: 39000, src: '/rare/ZZR.jpg' },
            { min: 39001, max: 40000, src: '/rare/MASTER.jpg' },
            { min: 40001, max: 50000, src: '/rare/ERROR.jpg' },
            { min: 50001, max: 100000, src: '/rare/ERROR2.jpg' },
            { min: 100001, max: 999998, src: '/rare/HATENA.jpg' },
            { min: 999999, max: 999999, src: '/rare/MUGEN.jpg' }
        ];
    }
    else if (type === 'mdef') {
        specificRanges = [
            { min: 0, max: 0, src: '/rare/NA.jpg' },
            { min: 1, max: 1000, src: '/rare/F.jpg' },
            { min: 1001, max: 2000, src: '/rare/E.jpg' },
            { min: 2001, max: 3000, src: '/rare/D.jpg' },
            { min: 3001, max: 4000, src: '/rare/C.jpg' },
            { min: 4001, max: 5000, src: '/rare/B.jpg' },
            { min: 5001, max: 6000, src: '/rare/A.jpg' },
            { min: 6001, max: 7000, src: '/rare/S.jpg' },
            { min: 7001, max: 8000, src: '/rare/SS.jpg' },
            { min: 8001, max: 9000, src: '/rare/SSS.jpg' },
            { min: 9001, max: 10000, src: '/rare/SR.jpg' },
            { min: 10001, max: 11000, src: '/rare/SSR.jpg' },
            { min: 11001, max: 12000, src: '/rare/UR.jpg' },
            { min: 12001, max: 13000, src: '/rare/LR.jpg' },
            { min: 13001, max: 14000, src: '/rare/MR.jpg' },
            { min: 14001, max: 15000, src: '/rare/X.jpg' },
            { min: 15001, max: 16000, src: '/rare/XX.jpg' },
            { min: 16001, max: 17000, src: '/rare/XXX.jpg' },
            { min: 17001, max: 18000, src: '/rare/EX.jpg' },
            { min: 18001, max: 19000, src: '/rare/DX.jpg' },
            { min: 19001, max: 20000, src: '/rare/CX.jpg' },
            { min: 20001, max: 21000, src: '/rare/BX.jpg' },
            { min: 21001, max: 22000, src: '/rare/AX.jpg' },
            { min: 22001, max: 23000, src: '/rare/SX.jpg' },
            { min: 23001, max: 24000, src: '/rare/XR.jpg' },
            { min: 24001, max: 25000, src: '/rare/XXR.jpg' },
            { min: 25001, max: 26000, src: '/rare/EXR.jpg' },
            { min: 26001, max: 27000, src: '/rare/DXR.jpg' },
            { min: 27001, max: 28000, src: '/rare/CXR.jpg' },
            { min: 28001, max: 29000, src: '/rare/BXR.jpg' },
            { min: 29001, max: 30000, src: '/rare/AXR.jpg' },
            { min: 30001, max: 31000, src: '/rare/SXR.jpg' },
            { min: 31001, max: 32000, src: '/rare/Y.jpg' },
            { min: 32001, max: 33000, src: '/rare/YY.jpg' },
            { min: 33001, max: 34000, src: '/rare/YYY.jpg' },
            { min: 34001, max: 35000, src: '/rare/Z.jpg' },
            { min: 35001, max: 36000, src: '/rare/ZZ.jpg' },
            { min: 36001, max: 37000, src: '/rare/ZZZ.jpg' },
            { min: 37001, max: 38000, src: '/rare/ZR.jpg' },
            { min: 38001, max: 39000, src: '/rare/ZZR.jpg' },
            { min: 39001, max: 40000, src: '/rare/MASTER.jpg' },
            { min: 40001, max: 50000, src: '/rare/ERROR.jpg' },
            { min: 50001, max: 100000, src: '/rare/ERROR2.jpg' },
            { min: 100001, max: 999998, src: '/rare/HATENA.jpg' },
            { min: 999999, max: 999999, src: '/rare/MUGEN.jpg' }
        ];
    }
    else if (type === 'agi') {
        specificRanges = [
            { min: 0, max: 0, src: '/rare/NA.jpg' },
            { min: 1, max: 1000, src: '/rare/F.jpg' },
            { min: 1001, max: 2000, src: '/rare/E.jpg' },
            { min: 2001, max: 3000, src: '/rare/D.jpg' },
            { min: 3001, max: 4000, src: '/rare/C.jpg' },
            { min: 4001, max: 5000, src: '/rare/B.jpg' },
            { min: 5001, max: 6000, src: '/rare/A.jpg' },
            { min: 6001, max: 7000, src: '/rare/S.jpg' },
            { min: 7001, max: 8000, src: '/rare/SS.jpg' },
            { min: 8001, max: 9000, src: '/rare/SSS.jpg' },
            { min: 9001, max: 10000, src: '/rare/SR.jpg' },
            { min: 10001, max: 11000, src: '/rare/SSR.jpg' },
            { min: 11001, max: 12000, src: '/rare/UR.jpg' },
            { min: 12001, max: 13000, src: '/rare/LR.jpg' },
            { min: 13001, max: 14000, src: '/rare/MR.jpg' },
            { min: 14001, max: 15000, src: '/rare/X.jpg' },
            { min: 15001, max: 16000, src: '/rare/XX.jpg' },
            { min: 16001, max: 17000, src: '/rare/XXX.jpg' },
            { min: 17001, max: 18000, src: '/rare/EX.jpg' },
            { min: 18001, max: 19000, src: '/rare/DX.jpg' },
            { min: 19001, max: 20000, src: '/rare/CX.jpg' },
            { min: 20001, max: 21000, src: '/rare/BX.jpg' },
            { min: 21001, max: 22000, src: '/rare/AX.jpg' },
            { min: 22001, max: 23000, src: '/rare/SX.jpg' },
            { min: 23001, max: 24000, src: '/rare/XR.jpg' },
            { min: 24001, max: 25000, src: '/rare/XXR.jpg' },
            { min: 25001, max: 26000, src: '/rare/EXR.jpg' },
            { min: 26001, max: 27000, src: '/rare/DXR.jpg' },
            { min: 27001, max: 28000, src: '/rare/CXR.jpg' },
            { min: 28001, max: 29000, src: '/rare/BXR.jpg' },
            { min: 29001, max: 30000, src: '/rare/AXR.jpg' },
            { min: 30001, max: 31000, src: '/rare/SXR.jpg' },
            { min: 31001, max: 32000, src: '/rare/Y.jpg' },
            { min: 32001, max: 33000, src: '/rare/YY.jpg' },
            { min: 33001, max: 34000, src: '/rare/YYY.jpg' },
            { min: 34001, max: 35000, src: '/rare/Z.jpg' },
            { min: 35001, max: 36000, src: '/rare/ZZ.jpg' },
            { min: 36001, max: 37000, src: '/rare/ZZZ.jpg' },
            { min: 37001, max: 38000, src: '/rare/ZR.jpg' },
            { min: 38001, max: 39000, src: '/rare/ZZR.jpg' },
            { min: 39001, max: 40000, src: '/rare/MASTER.jpg' },
            { min: 40001, max: 50000, src: '/rare/ERROR.jpg' },
            { min: 50001, max: 100000, src: '/rare/ERROR2.jpg' },
            { min: 100001, max: 999998, src: '/rare/HATENA.jpg' },
            { min: 999999, max: 999999, src: '/rare/MUGEN.jpg' }
        ];
    }
    else if (type === 'int') {
        specificRanges = [
            { min: 0, max: 0, src: '/rare/NA.jpg' },
            { min: 1, max: 1000, src: '/rare/F.jpg' },
            { min: 1001, max: 2000, src: '/rare/E.jpg' },
            { min: 2001, max: 3000, src: '/rare/D.jpg' },
            { min: 3001, max: 4000, src: '/rare/C.jpg' },
            { min: 4001, max: 5000, src: '/rare/B.jpg' },
            { min: 5001, max: 6000, src: '/rare/A.jpg' },
            { min: 6001, max: 7000, src: '/rare/S.jpg' },
            { min: 7001, max: 8000, src: '/rare/SS.jpg' },
            { min: 8001, max: 9000, src: '/rare/SSS.jpg' },
            { min: 9001, max: 10000, src: '/rare/SR.jpg' },
            { min: 10001, max: 11000, src: '/rare/SSR.jpg' },
            { min: 11001, max: 12000, src: '/rare/UR.jpg' },
            { min: 12001, max: 13000, src: '/rare/LR.jpg' },
            { min: 13001, max: 14000, src: '/rare/MR.jpg' },
            { min: 14001, max: 15000, src: '/rare/X.jpg' },
            { min: 15001, max: 16000, src: '/rare/XX.jpg' },
            { min: 16001, max: 17000, src: '/rare/XXX.jpg' },
            { min: 17001, max: 18000, src: '/rare/EX.jpg' },
            { min: 18001, max: 19000, src: '/rare/DX.jpg' },
            { min: 19001, max: 20000, src: '/rare/CX.jpg' },
            { min: 20001, max: 21000, src: '/rare/BX.jpg' },
            { min: 21001, max: 22000, src: '/rare/AX.jpg' },
            { min: 22001, max: 23000, src: '/rare/SX.jpg' },
            { min: 23001, max: 24000, src: '/rare/XR.jpg' },
            { min: 24001, max: 25000, src: '/rare/XXR.jpg' },
            { min: 25001, max: 26000, src: '/rare/EXR.jpg' },
            { min: 26001, max: 27000, src: '/rare/DXR.jpg' },
            { min: 27001, max: 28000, src: '/rare/CXR.jpg' },
            { min: 28001, max: 29000, src: '/rare/BXR.jpg' },
            { min: 29001, max: 30000, src: '/rare/AXR.jpg' },
            { min: 30001, max: 31000, src: '/rare/SXR.jpg' },
            { min: 31001, max: 32000, src: '/rare/Y.jpg' },
            { min: 32001, max: 33000, src: '/rare/YY.jpg' },
            { min: 33001, max: 34000, src: '/rare/YYY.jpg' },
            { min: 34001, max: 35000, src: '/rare/Z.jpg' },
            { min: 35001, max: 36000, src: '/rare/ZZ.jpg' },
            { min: 36001, max: 37000, src: '/rare/ZZZ.jpg' },
            { min: 37001, max: 38000, src: '/rare/ZR.jpg' },
            { min: 38001, max: 39000, src: '/rare/ZZR.jpg' },
            { min: 39001, max: 40000, src: '/rare/MASTER.jpg' },
            { min: 40001, max: 50000, src: '/rare/ERROR.jpg' },
            { min: 50001, max: 100000, src: '/rare/ERROR2.jpg' },
            { min: 100001, max: 999998, src: '/rare/HATENA.jpg' },
            { min: 999999, max: 999999, src: '/rare/MUGEN.jpg' }
        ];
    }
    else if (type === 'eva') {
        specificRanges = [
            { min: 0, max: 0, src: '/rare/NA.jpg' },
            { min: 1, max: 1000, src: '/rare/F.jpg' },
            { min: 1001, max: 2000, src: '/rare/E.jpg' },
            { min: 2001, max: 3000, src: '/rare/D.jpg' },
            { min: 3001, max: 4000, src: '/rare/C.jpg' },
            { min: 4001, max: 5000, src: '/rare/B.jpg' },
            { min: 5001, max: 6000, src: '/rare/A.jpg' },
            { min: 6001, max: 7000, src: '/rare/S.jpg' },
            { min: 7001, max: 8000, src: '/rare/SS.jpg' },
            { min: 8001, max: 9000, src: '/rare/SSS.jpg' },
            { min: 9001, max: 10000, src: '/rare/SR.jpg' },
            { min: 10001, max: 11000, src: '/rare/SSR.jpg' },
            { min: 11001, max: 12000, src: '/rare/UR.jpg' },
            { min: 12001, max: 13000, src: '/rare/LR.jpg' },
            { min: 13001, max: 14000, src: '/rare/MR.jpg' },
            { min: 14001, max: 15000, src: '/rare/X.jpg' },
            { min: 15001, max: 16000, src: '/rare/XX.jpg' },
            { min: 16001, max: 17000, src: '/rare/XXX.jpg' },
            { min: 17001, max: 18000, src: '/rare/EX.jpg' },
            { min: 18001, max: 19000, src: '/rare/DX.jpg' },
            { min: 19001, max: 20000, src: '/rare/CX.jpg' },
            { min: 20001, max: 21000, src: '/rare/BX.jpg' },
            { min: 21001, max: 22000, src: '/rare/AX.jpg' },
            { min: 22001, max: 23000, src: '/rare/SX.jpg' },
            { min: 23001, max: 24000, src: '/rare/XR.jpg' },
            { min: 24001, max: 25000, src: '/rare/XXR.jpg' },
            { min: 25001, max: 26000, src: '/rare/EXR.jpg' },
            { min: 26001, max: 27000, src: '/rare/DXR.jpg' },
            { min: 27001, max: 28000, src: '/rare/CXR.jpg' },
            { min: 28001, max: 29000, src: '/rare/BXR.jpg' },
            { min: 29001, max: 30000, src: '/rare/AXR.jpg' },
            { min: 30001, max: 31000, src: '/rare/SXR.jpg' },
            { min: 31001, max: 32000, src: '/rare/Y.jpg' },
            { min: 32001, max: 33000, src: '/rare/YY.jpg' },
            { min: 33001, max: 34000, src: '/rare/YYY.jpg' },
            { min: 34001, max: 35000, src: '/rare/Z.jpg' },
            { min: 35001, max: 36000, src: '/rare/ZZ.jpg' },
            { min: 36001, max: 37000, src: '/rare/ZZZ.jpg' },
            { min: 37001, max: 38000, src: '/rare/ZR.jpg' },
            { min: 38001, max: 39000, src: '/rare/ZZR.jpg' },
            { min: 39001, max: 40000, src: '/rare/MASTER.jpg' },
            { min: 40001, max: 50000, src: '/rare/ERROR.jpg' },
            { min: 50001, max: 100000, src: '/rare/ERROR2.jpg' },
            { min: 100001, max: 999998, src: '/rare/HATENA.jpg' },
            { min: 999999, max: 999999, src: '/rare/MUGEN.jpg' }
        ];
    }
    else if (type === 'faith') {
        specificRanges = [
            { min: 0, max: 0, src: '/rare/NA.jpg' },
            { min: 1, max: 1000, src: '/rare/F.jpg' },
            { min: 1001, max: 2000, src: '/rare/E.jpg' },
            { min: 2001, max: 3000, src: '/rare/D.jpg' },
            { min: 3001, max: 4000, src: '/rare/C.jpg' },
            { min: 4001, max: 5000, src: '/rare/B.jpg' },
            { min: 5001, max: 6000, src: '/rare/A.jpg' },
            { min: 6001, max: 7000, src: '/rare/S.jpg' },
            { min: 7001, max: 8000, src: '/rare/SS.jpg' },
            { min: 8001, max: 9000, src: '/rare/SSS.jpg' },
            { min: 9001, max: 10000, src: '/rare/SR.jpg' },
            { min: 10001, max: 11000, src: '/rare/SSR.jpg' },
            { min: 11001, max: 12000, src: '/rare/UR.jpg' },
            { min: 12001, max: 13000, src: '/rare/LR.jpg' },
            { min: 13001, max: 14000, src: '/rare/MR.jpg' },
            { min: 14001, max: 15000, src: '/rare/X.jpg' },
            { min: 15001, max: 16000, src: '/rare/XX.jpg' },
            { min: 16001, max: 17000, src: '/rare/XXX.jpg' },
            { min: 17001, max: 18000, src: '/rare/EX.jpg' },
            { min: 18001, max: 19000, src: '/rare/DX.jpg' },
            { min: 19001, max: 20000, src: '/rare/CX.jpg' },
            { min: 20001, max: 21000, src: '/rare/BX.jpg' },
            { min: 21001, max: 22000, src: '/rare/AX.jpg' },
            { min: 22001, max: 23000, src: '/rare/SX.jpg' },
            { min: 23001, max: 24000, src: '/rare/XR.jpg' },
            { min: 24001, max: 25000, src: '/rare/XXR.jpg' },
            { min: 25001, max: 26000, src: '/rare/EXR.jpg' },
            { min: 26001, max: 27000, src: '/rare/DXR.jpg' },
            { min: 27001, max: 28000, src: '/rare/CXR.jpg' },
            { min: 28001, max: 29000, src: '/rare/BXR.jpg' },
            { min: 29001, max: 30000, src: '/rare/AXR.jpg' },
            { min: 30001, max: 31000, src: '/rare/SXR.jpg' },
            { min: 31001, max: 32000, src: '/rare/Y.jpg' },
            { min: 32001, max: 33000, src: '/rare/YY.jpg' },
            { min: 33001, max: 34000, src: '/rare/YYY.jpg' },
            { min: 34001, max: 35000, src: '/rare/Z.jpg' },
            { min: 35001, max: 36000, src: '/rare/ZZ.jpg' },
            { min: 36001, max: 37000, src: '/rare/ZZZ.jpg' },
            { min: 37001, max: 38000, src: '/rare/ZR.jpg' },
            { min: 38001, max: 39000, src: '/rare/ZZR.jpg' },
            { min: 39001, max: 40000, src: '/rare/MASTER.jpg' },
            { min: 40001, max: 50000, src: '/rare/ERROR.jpg' },
            { min: 50001, max: 100000, src: '/rare/ERROR2.jpg' },
            { min: 100001, max: 999998, src: '/rare/HATENA.jpg' },
            { min: 999999, max: 999999, src: '/rare/MUGEN.jpg' }
        ];
    }
    else if (type === 'mys') {
        specificRanges = [
            { min: 0, max: 0, src: '/rare/NA.jpg' },
            { min: 1, max: 1000, src: '/rare/F.jpg' },
            { min: 1001, max: 2000, src: '/rare/E.jpg' },
            { min: 2001, max: 3000, src: '/rare/D.jpg' },
            { min: 3001, max: 4000, src: '/rare/C.jpg' },
            { min: 4001, max: 5000, src: '/rare/B.jpg' },
            { min: 5001, max: 6000, src: '/rare/A.jpg' },
            { min: 6001, max: 7000, src: '/rare/S.jpg' },
            { min: 7001, max: 8000, src: '/rare/SS.jpg' },
            { min: 8001, max: 9000, src: '/rare/SSS.jpg' },
            { min: 9001, max: 10000, src: '/rare/SR.jpg' },
            { min: 10001, max: 11000, src: '/rare/SSR.jpg' },
            { min: 11001, max: 12000, src: '/rare/UR.jpg' },
            { min: 12001, max: 13000, src: '/rare/LR.jpg' },
            { min: 13001, max: 14000, src: '/rare/MR.jpg' },
            { min: 14001, max: 15000, src: '/rare/X.jpg' },
            { min: 15001, max: 16000, src: '/rare/XX.jpg' },
            { min: 16001, max: 17000, src: '/rare/XXX.jpg' },
            { min: 17001, max: 18000, src: '/rare/EX.jpg' },
            { min: 18001, max: 19000, src: '/rare/DX.jpg' },
            { min: 19001, max: 20000, src: '/rare/CX.jpg' },
            { min: 20001, max: 21000, src: '/rare/BX.jpg' },
            { min: 21001, max: 22000, src: '/rare/AX.jpg' },
            { min: 22001, max: 23000, src: '/rare/SX.jpg' },
            { min: 23001, max: 24000, src: '/rare/XR.jpg' },
            { min: 24001, max: 25000, src: '/rare/XXR.jpg' },
            { min: 25001, max: 26000, src: '/rare/EXR.jpg' },
            { min: 26001, max: 27000, src: '/rare/DXR.jpg' },
            { min: 27001, max: 28000, src: '/rare/CXR.jpg' },
            { min: 28001, max: 29000, src: '/rare/BXR.jpg' },
            { min: 29001, max: 30000, src: '/rare/AXR.jpg' },
            { min: 30001, max: 31000, src: '/rare/SXR.jpg' },
            { min: 31001, max: 32000, src: '/rare/Y.jpg' },
            { min: 32001, max: 33000, src: '/rare/YY.jpg' },
            { min: 33001, max: 34000, src: '/rare/YYY.jpg' },
            { min: 34001, max: 35000, src: '/rare/Z.jpg' },
            { min: 35001, max: 36000, src: '/rare/ZZ.jpg' },
            { min: 36001, max: 37000, src: '/rare/ZZZ.jpg' },
            { min: 37001, max: 38000, src: '/rare/ZR.jpg' },
            { min: 38001, max: 39000, src: '/rare/ZZR.jpg' },
            { min: 39001, max: 40000, src: '/rare/MASTER.jpg' },
            { min: 40001, max: 50000, src: '/rare/ERROR.jpg' },
            { min: 50001, max: 100000, src: '/rare/ERROR2.jpg' },
            { min: 100001, max: 999998, src: '/rare/HATENA.jpg' },
            { min: 999999, max: 999999, src: '/rare/MUGEN.jpg' }
        ];
    }
    else if (type === 'charm') {
        specificRanges = [
            { min: 0, max: 0, src: '/rare/NA.jpg' },
            { min: 1, max: 1000, src: '/rare/F.jpg' },
            { min: 1001, max: 2000, src: '/rare/E.jpg' },
            { min: 2001, max: 3000, src: '/rare/D.jpg' },
            { min: 3001, max: 4000, src: '/rare/C.jpg' },
            { min: 4001, max: 5000, src: '/rare/B.jpg' },
            { min: 5001, max: 6000, src: '/rare/A.jpg' },
            { min: 6001, max: 7000, src: '/rare/S.jpg' },
            { min: 7001, max: 8000, src: '/rare/SS.jpg' },
            { min: 8001, max: 9000, src: '/rare/SSS.jpg' },
            { min: 9001, max: 10000, src: '/rare/SR.jpg' },
            { min: 10001, max: 11000, src: '/rare/SSR.jpg' },
            { min: 11001, max: 12000, src: '/rare/UR.jpg' },
            { min: 12001, max: 13000, src: '/rare/LR.jpg' },
            { min: 13001, max: 14000, src: '/rare/MR.jpg' },
            { min: 14001, max: 15000, src: '/rare/X.jpg' },
            { min: 15001, max: 16000, src: '/rare/XX.jpg' },
            { min: 16001, max: 17000, src: '/rare/XXX.jpg' },
            { min: 17001, max: 18000, src: '/rare/EX.jpg' },
            { min: 18001, max: 19000, src: '/rare/DX.jpg' },
            { min: 19001, max: 20000, src: '/rare/CX.jpg' },
            { min: 20001, max: 21000, src: '/rare/BX.jpg' },
            { min: 21001, max: 22000, src: '/rare/AX.jpg' },
            { min: 22001, max: 23000, src: '/rare/SX.jpg' },
            { min: 23001, max: 24000, src: '/rare/XR.jpg' },
            { min: 24001, max: 25000, src: '/rare/XXR.jpg' },
            { min: 25001, max: 26000, src: '/rare/EXR.jpg' },
            { min: 26001, max: 27000, src: '/rare/DXR.jpg' },
            { min: 27001, max: 28000, src: '/rare/CXR.jpg' },
            { min: 28001, max: 29000, src: '/rare/BXR.jpg' },
            { min: 29001, max: 30000, src: '/rare/AXR.jpg' },
            { min: 30001, max: 31000, src: '/rare/SXR.jpg' },
            { min: 31001, max: 32000, src: '/rare/Y.jpg' },
            { min: 32001, max: 33000, src: '/rare/YY.jpg' },
            { min: 33001, max: 34000, src: '/rare/YYY.jpg' },
            { min: 34001, max: 35000, src: '/rare/Z.jpg' },
            { min: 35001, max: 36000, src: '/rare/ZZ.jpg' },
            { min: 36001, max: 37000, src: '/rare/ZZZ.jpg' },
            { min: 37001, max: 38000, src: '/rare/ZR.jpg' },
            { min: 38001, max: 39000, src: '/rare/ZZR.jpg' },
            { min: 39001, max: 40000, src: '/rare/MASTER.jpg' },
            { min: 40001, max: 50000, src: '/rare/ERROR.jpg' },
            { min: 50001, max: 100000, src: '/rare/ERROR2.jpg' },
            { min: 100001, max: 999998, src: '/rare/HATENA.jpg' },
            { min: 999999, max: 999999, src: '/rare/MUGEN.jpg' }
        ];
    }
    else if (type === 'luk') {
        specificRanges = [
            { min: 0, max: 0, src: '/rare/NA.jpg' },
            { min: 1, max: 1000, src: '/rare/F.jpg' },
            { min: 1001, max: 2000, src: '/rare/E.jpg' },
            { min: 2001, max: 3000, src: '/rare/D.jpg' },
            { min: 3001, max: 4000, src: '/rare/C.jpg' },
            { min: 4001, max: 5000, src: '/rare/B.jpg' },
            { min: 5001, max: 6000, src: '/rare/A.jpg' },
            { min: 6001, max: 7000, src: '/rare/S.jpg' },
            { min: 7001, max: 8000, src: '/rare/SS.jpg' },
            { min: 8001, max: 9000, src: '/rare/SSS.jpg' },
            { min: 9001, max: 10000, src: '/rare/SR.jpg' },
            { min: 10001, max: 11000, src: '/rare/SSR.jpg' },
            { min: 11001, max: 12000, src: '/rare/UR.jpg' },
            { min: 12001, max: 13000, src: '/rare/LR.jpg' },
            { min: 13001, max: 14000, src: '/rare/MR.jpg' },
            { min: 14001, max: 15000, src: '/rare/X.jpg' },
            { min: 15001, max: 16000, src: '/rare/XX.jpg' },
            { min: 16001, max: 17000, src: '/rare/XXX.jpg' },
            { min: 17001, max: 18000, src: '/rare/EX.jpg' },
            { min: 18001, max: 19000, src: '/rare/DX.jpg' },
            { min: 19001, max: 20000, src: '/rare/CX.jpg' },
            { min: 20001, max: 21000, src: '/rare/BX.jpg' },
            { min: 21001, max: 22000, src: '/rare/AX.jpg' },
            { min: 22001, max: 23000, src: '/rare/SX.jpg' },
            { min: 23001, max: 24000, src: '/rare/XR.jpg' },
            { min: 24001, max: 25000, src: '/rare/XXR.jpg' },
            { min: 25001, max: 26000, src: '/rare/EXR.jpg' },
            { min: 26001, max: 27000, src: '/rare/DXR.jpg' },
            { min: 27001, max: 28000, src: '/rare/CXR.jpg' },
            { min: 28001, max: 29000, src: '/rare/BXR.jpg' },
            { min: 29001, max: 30000, src: '/rare/AXR.jpg' },
            { min: 30001, max: 31000, src: '/rare/SXR.jpg' },
            { min: 31001, max: 32000, src: '/rare/Y.jpg' },
            { min: 32001, max: 33000, src: '/rare/YY.jpg' },
            { min: 33001, max: 34000, src: '/rare/YYY.jpg' },
            { min: 34001, max: 35000, src: '/rare/Z.jpg' },
            { min: 35001, max: 36000, src: '/rare/ZZ.jpg' },
            { min: 36001, max: 37000, src: '/rare/ZZZ.jpg' },
            { min: 37001, max: 38000, src: '/rare/ZR.jpg' },
            { min: 38001, max: 39000, src: '/rare/ZZR.jpg' },
            { min: 39001, max: 40000, src: '/rare/MASTER.jpg' },
            { min: 40001, max: 50000, src: '/rare/ERROR.jpg' },
            { min: 50001, max: 100000, src: '/rare/ERROR2.jpg' },
            { min: 100001, max: 999998, src: '/rare/HATENA.jpg' },
            { min: 999999, max: 999999, src: '/rare/MUGEN.jpg' }
        ];
    }
    else if (type === 'pot') {
        specificRanges = [
            { min: 0, max: 0, src: '/rare/NA.jpg' },
            { min: 1, max: 1000, src: '/rare/F.jpg' },
            { min: 1001, max: 2000, src: '/rare/E.jpg' },
            { min: 2001, max: 3000, src: '/rare/D.jpg' },
            { min: 3001, max: 4000, src: '/rare/C.jpg' },
            { min: 4001, max: 5000, src: '/rare/B.jpg' },
            { min: 5001, max: 6000, src: '/rare/A.jpg' },
            { min: 6001, max: 7000, src: '/rare/S.jpg' },
            { min: 7001, max: 8000, src: '/rare/SS.jpg' },
            { min: 8001, max: 9000, src: '/rare/SSS.jpg' },
            { min: 9001, max: 10000, src: '/rare/SR.jpg' },
            { min: 10001, max: 11000, src: '/rare/SSR.jpg' },
            { min: 11001, max: 12000, src: '/rare/UR.jpg' },
            { min: 12001, max: 13000, src: '/rare/LR.jpg' },
            { min: 13001, max: 14000, src: '/rare/MR.jpg' },
            { min: 14001, max: 15000, src: '/rare/X.jpg' },
            { min: 15001, max: 16000, src: '/rare/XX.jpg' },
            { min: 16001, max: 17000, src: '/rare/XXX.jpg' },
            { min: 17001, max: 18000, src: '/rare/EX.jpg' },
            { min: 18001, max: 19000, src: '/rare/DX.jpg' },
            { min: 19001, max: 20000, src: '/rare/CX.jpg' },
            { min: 20001, max: 21000, src: '/rare/BX.jpg' },
            { min: 21001, max: 22000, src: '/rare/AX.jpg' },
            { min: 22001, max: 23000, src: '/rare/SX.jpg' },
            { min: 23001, max: 24000, src: '/rare/XR.jpg' },
            { min: 24001, max: 25000, src: '/rare/XXR.jpg' },
            { min: 25001, max: 26000, src: '/rare/EXR.jpg' },
            { min: 26001, max: 27000, src: '/rare/DXR.jpg' },
            { min: 27001, max: 28000, src: '/rare/CXR.jpg' },
            { min: 28001, max: 29000, src: '/rare/BXR.jpg' },
            { min: 29001, max: 30000, src: '/rare/AXR.jpg' },
            { min: 30001, max: 31000, src: '/rare/SXR.jpg' },
            { min: 31001, max: 32000, src: '/rare/Y.jpg' },
            { min: 32001, max: 33000, src: '/rare/YY.jpg' },
            { min: 33001, max: 34000, src: '/rare/YYY.jpg' },
            { min: 34001, max: 35000, src: '/rare/Z.jpg' },
            { min: 35001, max: 36000, src: '/rare/ZZ.jpg' },
            { min: 36001, max: 37000, src: '/rare/ZZZ.jpg' },
            { min: 37001, max: 38000, src: '/rare/ZR.jpg' },
            { min: 38001, max: 39000, src: '/rare/ZZR.jpg' },
            { min: 39001, max: 40000, src: '/rare/MASTER.jpg' },
            { min: 40001, max: 50000, src: '/rare/ERROR.jpg' },
            { min: 50001, max: 100000, src: '/rare/ERROR2.jpg' },
            { min: 100001, max: 999998, src: '/rare/HATENA.jpg' },
            { min: 999999, max: 999999, src: '/rare/MUGEN.jpg' }
        ];
    }

    const range = specificRanges.find(r => value >= r.min && value <= r.max);
    return range ? { min: range.min, max: range.max, imgSrc: range.src } : { min: 0, max: 10000, imgSrc: '' };
}

function getColor(value, type) {
    if (type === 'hp') {
        if (value === 0) return '#FFFFFF';
        if (value >= 1 && value <= 1000) return '#cccccc';
        if (value >= 1001 && value <= 2000) return '#B6BC7B';
        if (value >= 2001 && value <= 3000) return '#949593';
        if (value >= 3001 && value <= 4000) return '#CEE6C1';
        if (value >= 4001 && value <= 5000) return '#3155A6';
        if (value >= 5001 && value <= 6000) return '#F3A66B';
        if (value >= 6001 && value <= 7000) return '#BC011E';
        if (value >= 7001 && value <= 8000) return '#BC011E';
        if (value >= 8001 && value <= 9000) return '#BC011E';
        if (value >= 9001 && value <= 10000) return '#c1ab05';
        if (value >= 10001 && value <= 11000) return '#7a0099';
        if (value >= 11001 && value <= 12000) return '#00ffff';
        if (value >= 12001 && value <= 13000) return '#ff0055';
        if (value >= 13001 && value <= 14000) return '#ff99ff';
        if (value >= 14001 && value <= 15000) return '#890116';
        if (value >= 15001 && value <= 16000) return '#890116';
        if (value >= 16001 && value <= 17000) return '#890116';
        if (value >= 17001 && value <= 18000) return '#54000D';
        if (value >= 18001 && value <= 19000) return '#54000D';
        if (value >= 19001 && value <= 20000) return '#54000D';
        if (value >= 20001 && value <= 21000) return '#54000D';
        if (value >= 21001 && value <= 22000) return '#54000D';
        if (value >= 22001 && value <= 23000) return '#54000D';
        if (value >= 23001 && value <= 24000) return '#ffff00';
        if (value >= 24001 && value <= 25000) return '#aa00cc';
        if (value >= 25001 && value <= 26000) return '#ccffff';
        if (value >= 26001 && value <= 27000) return '#ccffff';
        if (value >= 27001 && value <= 28000) return '#ccffff';
        if (value >= 28001 && value <= 29000) return '#ccffff';
        if (value >= 29001 && value <= 30000) return '#ccffff';
        if (value >= 30001 && value <= 31000) return '#ccffff';
        if (value >= 31001 && value <= 32000) return '#0000ff';
        if (value >= 32001 && value <= 33000) return '#0000ff';
        if (value >= 33001 && value <= 34000) return '#0000ff';
        if (value >= 34001 && value <= 35000) return '#62CD5A';
        if (value >= 35001 && value <= 36000) return '#62CD5A';
        if (value >= 36001 && value <= 37000) return '#62CD5A';
        if (value >= 37001 && value <= 38000) return '#ffff66';
        if (value >= 38001 && value <= 39000) return '#d500ff';
        if (value >= 39001 && value <= 40000) return '#f2b3ff';
        if (value >= 40001 && value <= 50000) return '#54000D';
        if (value >= 50001 && value <= 100000) return '#aa00cc';
        if (value >= 100001 && value <= 999998) return '#54000D';
        if (value === 999999) return '';
    }
    else if (type === 'mp') {
        if (value === 0) return '#FFFFFF';
        if (value >= 1 && value <= 1000) return '#cccccc';
        if (value >= 1001 && value <= 2000) return '#B6BC7B';
        if (value >= 2001 && value <= 3000) return '#949593';
        if (value >= 3001 && value <= 4000) return '#CEE6C1';
        if (value >= 4001 && value <= 5000) return '#3155A6';
        if (value >= 5001 && value <= 6000) return '#F3A66B';
        if (value >= 6001 && value <= 7000) return '#BC011E';
        if (value >= 7001 && value <= 8000) return '#BC011E';
        if (value >= 8001 && value <= 9000) return '#BC011E';
        if (value >= 9001 && value <= 10000) return '#c1ab05';
        if (value >= 10001 && value <= 11000) return '#7a0099';
        if (value >= 11001 && value <= 12000) return '#00ffff';
        if (value >= 12001 && value <= 13000) return '#ff0055';
        if (value >= 13001 && value <= 14000) return '#ff99ff';
        if (value >= 14001 && value <= 15000) return '#890116';
        if (value >= 15001 && value <= 16000) return '#890116';
        if (value >= 16001 && value <= 17000) return '#890116';
        if (value >= 17001 && value <= 18000) return '#54000D';
        if (value >= 18001 && value <= 19000) return '#54000D';
        if (value >= 19001 && value <= 20000) return '#54000D';
        if (value >= 20001 && value <= 21000) return '#54000D';
        if (value >= 21001 && value <= 22000) return '#54000D';
        if (value >= 22001 && value <= 23000) return '#54000D';
        if (value >= 23001 && value <= 24000) return '#ffff00';
        if (value >= 24001 && value <= 25000) return '#aa00cc';
        if (value >= 25001 && value <= 26000) return '#ccffff';
        if (value >= 26001 && value <= 27000) return '#ccffff';
        if (value >= 27001 && value <= 28000) return '#ccffff';
        if (value >= 28001 && value <= 29000) return '#ccffff';
        if (value >= 29001 && value <= 30000) return '#ccffff';
        if (value >= 30001 && value <= 31000) return '#ccffff';
        if (value >= 31001 && value <= 32000) return '#0000ff';
        if (value >= 32001 && value <= 33000) return '#0000ff';
        if (value >= 33001 && value <= 34000) return '#0000ff';
        if (value >= 34001 && value <= 35000) return '#62CD5A';
        if (value >= 35001 && value <= 36000) return '#62CD5A';
        if (value >= 36001 && value <= 37000) return '#62CD5A';
        if (value >= 37001 && value <= 38000) return '#ffff66';
        if (value >= 38001 && value <= 39000) return '#d500ff';
        if (value >= 39001 && value <= 40000) return '#f2b3ff';
        if (value >= 40001 && value <= 50000) return '#54000D';
        if (value >= 50001 && value <= 100000) return '#aa00cc';
        if (value >= 100001 && value <= 999998) return '#54000D';
    }
    else if (type === 'atk') {
        if (value === 0) return '#FFFFFF';
        if (value >= 1 && value <= 1000) return '#cccccc';
        if (value >= 1001 && value <= 2000) return '#B6BC7B';
        if (value >= 2001 && value <= 3000) return '#949593';
        if (value >= 3001 && value <= 4000) return '#CEE6C1';
        if (value >= 4001 && value <= 5000) return '#3155A6';
        if (value >= 5001 && value <= 6000) return '#F3A66B';
        if (value >= 6001 && value <= 7000) return '#BC011E';
        if (value >= 7001 && value <= 8000) return '#BC011E';
        if (value >= 8001 && value <= 9000) return '#BC011E';
        if (value >= 9001 && value <= 10000) return '#c1ab05';
        if (value >= 10001 && value <= 11000) return '#7a0099';
        if (value >= 11001 && value <= 12000) return '#00ffff';
        if (value >= 12001 && value <= 13000) return '#ff0055';
        if (value >= 13001 && value <= 14000) return '#ff99ff';
        if (value >= 14001 && value <= 15000) return '#890116';
        if (value >= 15001 && value <= 16000) return '#890116';
        if (value >= 16001 && value <= 17000) return '#890116';
        if (value >= 17001 && value <= 18000) return '#54000D';
        if (value >= 18001 && value <= 19000) return '#54000D';
        if (value >= 19001 && value <= 20000) return '#54000D';
        if (value >= 20001 && value <= 21000) return '#54000D';
        if (value >= 21001 && value <= 22000) return '#54000D';
        if (value >= 22001 && value <= 23000) return '#54000D';
        if (value >= 23001 && value <= 24000) return '#ffff00';
        if (value >= 24001 && value <= 25000) return '#aa00cc';
        if (value >= 25001 && value <= 26000) return '#ccffff';
        if (value >= 26001 && value <= 27000) return '#ccffff';
        if (value >= 27001 && value <= 28000) return '#ccffff';
        if (value >= 28001 && value <= 29000) return '#ccffff';
        if (value >= 29001 && value <= 30000) return '#ccffff';
        if (value >= 30001 && value <= 31000) return '#ccffff';
        if (value >= 31001 && value <= 32000) return '#0000ff';
        if (value >= 32001 && value <= 33000) return '#0000ff';
        if (value >= 33001 && value <= 34000) return '#0000ff';
        if (value >= 34001 && value <= 35000) return '#62CD5A';
        if (value >= 35001 && value <= 36000) return '#62CD5A';
        if (value >= 36001 && value <= 37000) return '#62CD5A';
        if (value >= 37001 && value <= 38000) return '#ffff66';
        if (value >= 38001 && value <= 39000) return '#d500ff';
        if (value >= 39001 && value <= 40000) return '#f2b3ff';
        if (value >= 40001 && value <= 50000) return '#54000D';
        if (value >= 50001 && value <= 100000) return '#aa00cc';
        if (value >= 100001 && value <= 999998) return '#54000D';
    }
    else if (type === 'dex') {
        if (value === 0) return '#FFFFFF';
        if (value >= 1 && value <= 1000) return '#cccccc';
        if (value >= 1001 && value <= 2000) return '#B6BC7B';
        if (value >= 2001 && value <= 3000) return '#949593';
        if (value >= 3001 && value <= 4000) return '#CEE6C1';
        if (value >= 4001 && value <= 5000) return '#3155A6';
        if (value >= 5001 && value <= 6000) return '#F3A66B';
        if (value >= 6001 && value <= 7000) return '#BC011E';
        if (value >= 7001 && value <= 8000) return '#BC011E';
        if (value >= 8001 && value <= 9000) return '#BC011E';
        if (value >= 9001 && value <= 10000) return '#c1ab05';
        if (value >= 10001 && value <= 11000) return '#7a0099';
        if (value >= 11001 && value <= 12000) return '#00ffff';
        if (value >= 12001 && value <= 13000) return '#ff0055';
        if (value >= 13001 && value <= 14000) return '#ff99ff';
        if (value >= 14001 && value <= 15000) return '#890116';
        if (value >= 15001 && value <= 16000) return '#890116';
        if (value >= 16001 && value <= 17000) return '#890116';
        if (value >= 17001 && value <= 18000) return '#54000D';
        if (value >= 18001 && value <= 19000) return '#54000D';
        if (value >= 19001 && value <= 20000) return '#54000D';
        if (value >= 20001 && value <= 21000) return '#54000D';
        if (value >= 21001 && value <= 22000) return '#54000D';
        if (value >= 22001 && value <= 23000) return '#54000D';
        if (value >= 23001 && value <= 24000) return '#ffff00';
        if (value >= 24001 && value <= 25000) return '#aa00cc';
        if (value >= 25001 && value <= 26000) return '#ccffff';
        if (value >= 26001 && value <= 27000) return '#ccffff';
        if (value >= 27001 && value <= 28000) return '#ccffff';
        if (value >= 28001 && value <= 29000) return '#ccffff';
        if (value >= 29001 && value <= 30000) return '#ccffff';
        if (value >= 30001 && value <= 31000) return '#ccffff';
        if (value >= 31001 && value <= 32000) return '#0000ff';
        if (value >= 32001 && value <= 33000) return '#0000ff';
        if (value >= 33001 && value <= 34000) return '#0000ff';
        if (value >= 34001 && value <= 35000) return '#62CD5A';
        if (value >= 35001 && value <= 36000) return '#62CD5A';
        if (value >= 36001 && value <= 37000) return '#62CD5A';
        if (value >= 37001 && value <= 38000) return '#ffff66';
        if (value >= 38001 && value <= 39000) return '#d500ff';
        if (value >= 39001 && value <= 40000) return '#f2b3ff';
        if (value >= 40001 && value <= 50000) return '#54000D';
        if (value >= 50001 && value <= 100000) return '#aa00cc';
        if (value >= 100001 && value <= 999998) return '#54000D';
    }
    else if (type === 'def') {
        if (value === 0) return '#FFFFFF';
        if (value >= 1 && value <= 1000) return '#cccccc';
        if (value >= 1001 && value <= 2000) return '#B6BC7B';
        if (value >= 2001 && value <= 3000) return '#949593';
        if (value >= 3001 && value <= 4000) return '#CEE6C1';
        if (value >= 4001 && value <= 5000) return '#3155A6';
        if (value >= 5001 && value <= 6000) return '#F3A66B';
        if (value >= 6001 && value <= 7000) return '#BC011E';
        if (value >= 7001 && value <= 8000) return '#BC011E';
        if (value >= 8001 && value <= 9000) return '#BC011E';
        if (value >= 9001 && value <= 10000) return '#c1ab05';
        if (value >= 10001 && value <= 11000) return '#7a0099';
        if (value >= 11001 && value <= 12000) return '#00ffff';
        if (value >= 12001 && value <= 13000) return '#ff0055';
        if (value >= 13001 && value <= 14000) return '#ff99ff';
        if (value >= 14001 && value <= 15000) return '#890116';
        if (value >= 15001 && value <= 16000) return '#890116';
        if (value >= 16001 && value <= 17000) return '#890116';
        if (value >= 17001 && value <= 18000) return '#54000D';
        if (value >= 18001 && value <= 19000) return '#54000D';
        if (value >= 19001 && value <= 20000) return '#54000D';
        if (value >= 20001 && value <= 21000) return '#54000D';
        if (value >= 21001 && value <= 22000) return '#54000D';
        if (value >= 22001 && value <= 23000) return '#54000D';
        if (value >= 23001 && value <= 24000) return '#ffff00';
        if (value >= 24001 && value <= 25000) return '#aa00cc';
        if (value >= 25001 && value <= 26000) return '#ccffff';
        if (value >= 26001 && value <= 27000) return '#ccffff';
        if (value >= 27001 && value <= 28000) return '#ccffff';
        if (value >= 28001 && value <= 29000) return '#ccffff';
        if (value >= 29001 && value <= 30000) return '#ccffff';
        if (value >= 30001 && value <= 31000) return '#ccffff';
        if (value >= 31001 && value <= 32000) return '#0000ff';
        if (value >= 32001 && value <= 33000) return '#0000ff';
        if (value >= 33001 && value <= 34000) return '#0000ff';
        if (value >= 34001 && value <= 35000) return '#62CD5A';
        if (value >= 35001 && value <= 36000) return '#62CD5A';
        if (value >= 36001 && value <= 37000) return '#62CD5A';
        if (value >= 37001 && value <= 38000) return '#ffff66';
        if (value >= 38001 && value <= 39000) return '#d500ff';
        if (value >= 39001 && value <= 40000) return '#f2b3ff';
        if (value >= 40001 && value <= 50000) return '#54000D';
        if (value >= 50001 && value <= 100000) return '#aa00cc';
        if (value >= 100001 && value <= 999998) return '#54000D';
    }
    else if (type === 'matk') {
        if (value === 0) return '#FFFFFF';
        if (value >= 1 && value <= 1000) return '#cccccc';
        if (value >= 1001 && value <= 2000) return '#B6BC7B';
        if (value >= 2001 && value <= 3000) return '#949593';
        if (value >= 3001 && value <= 4000) return '#CEE6C1';
        if (value >= 4001 && value <= 5000) return '#3155A6';
        if (value >= 5001 && value <= 6000) return '#F3A66B';
        if (value >= 6001 && value <= 7000) return '#BC011E';
        if (value >= 7001 && value <= 8000) return '#BC011E';
        if (value >= 8001 && value <= 9000) return '#BC011E';
        if (value >= 9001 && value <= 10000) return '#c1ab05';
        if (value >= 10001 && value <= 11000) return '#7a0099';
        if (value >= 11001 && value <= 12000) return '#00ffff';
        if (value >= 12001 && value <= 13000) return '#ff0055';
        if (value >= 13001 && value <= 14000) return '#ff99ff';
        if (value >= 14001 && value <= 15000) return '#890116';
        if (value >= 15001 && value <= 16000) return '#890116';
        if (value >= 16001 && value <= 17000) return '#890116';
        if (value >= 17001 && value <= 18000) return '#54000D';
        if (value >= 18001 && value <= 19000) return '#54000D';
        if (value >= 19001 && value <= 20000) return '#54000D';
        if (value >= 20001 && value <= 21000) return '#54000D';
        if (value >= 21001 && value <= 22000) return '#54000D';
        if (value >= 22001 && value <= 23000) return '#54000D';
        if (value >= 23001 && value <= 24000) return '#ffff00';
        if (value >= 24001 && value <= 25000) return '#aa00cc';
        if (value >= 25001 && value <= 26000) return '#ccffff';
        if (value >= 26001 && value <= 27000) return '#ccffff';
        if (value >= 27001 && value <= 28000) return '#ccffff';
        if (value >= 28001 && value <= 29000) return '#ccffff';
        if (value >= 29001 && value <= 30000) return '#ccffff';
        if (value >= 30001 && value <= 31000) return '#ccffff';
        if (value >= 31001 && value <= 32000) return '#0000ff';
        if (value >= 32001 && value <= 33000) return '#0000ff';
        if (value >= 33001 && value <= 34000) return '#0000ff';
        if (value >= 34001 && value <= 35000) return '#62CD5A';
        if (value >= 35001 && value <= 36000) return '#62CD5A';
        if (value >= 36001 && value <= 37000) return '#62CD5A';
        if (value >= 37001 && value <= 38000) return '#ffff66';
        if (value >= 38001 && value <= 39000) return '#d500ff';
        if (value >= 39001 && value <= 40000) return '#f2b3ff';
        if (value >= 40001 && value <= 50000) return '#54000D';
        if (value >= 50001 && value <= 100000) return '#aa00cc';
        if (value >= 100001 && value <= 999998) return '#54000D';
    }
    else if (type === 'mdef') {
        if (value === 0) return '#FFFFFF';
        if (value >= 1 && value <= 1000) return '#cccccc';
        if (value >= 1001 && value <= 2000) return '#B6BC7B';
        if (value >= 2001 && value <= 3000) return '#949593';
        if (value >= 3001 && value <= 4000) return '#CEE6C1';
        if (value >= 4001 && value <= 5000) return '#3155A6';
        if (value >= 5001 && value <= 6000) return '#F3A66B';
        if (value >= 6001 && value <= 7000) return '#BC011E';
        if (value >= 7001 && value <= 8000) return '#BC011E';
        if (value >= 8001 && value <= 9000) return '#BC011E';
        if (value >= 9001 && value <= 10000) return '#c1ab05';
        if (value >= 10001 && value <= 11000) return '#7a0099';
        if (value >= 11001 && value <= 12000) return '#00ffff';
        if (value >= 12001 && value <= 13000) return '#ff0055';
        if (value >= 13001 && value <= 14000) return '#ff99ff';
        if (value >= 14001 && value <= 15000) return '#890116';
        if (value >= 15001 && value <= 16000) return '#890116';
        if (value >= 16001 && value <= 17000) return '#890116';
        if (value >= 17001 && value <= 18000) return '#54000D';
        if (value >= 18001 && value <= 19000) return '#54000D';
        if (value >= 19001 && value <= 20000) return '#54000D';
        if (value >= 20001 && value <= 21000) return '#54000D';
        if (value >= 21001 && value <= 22000) return '#54000D';
        if (value >= 22001 && value <= 23000) return '#54000D';
        if (value >= 23001 && value <= 24000) return '#ffff00';
        if (value >= 24001 && value <= 25000) return '#aa00cc';
        if (value >= 25001 && value <= 26000) return '#ccffff';
        if (value >= 26001 && value <= 27000) return '#ccffff';
        if (value >= 27001 && value <= 28000) return '#ccffff';
        if (value >= 28001 && value <= 29000) return '#ccffff';
        if (value >= 29001 && value <= 30000) return '#ccffff';
        if (value >= 30001 && value <= 31000) return '#ccffff';
        if (value >= 31001 && value <= 32000) return '#0000ff';
        if (value >= 32001 && value <= 33000) return '#0000ff';
        if (value >= 33001 && value <= 34000) return '#0000ff';
        if (value >= 34001 && value <= 35000) return '#62CD5A';
        if (value >= 35001 && value <= 36000) return '#62CD5A';
        if (value >= 36001 && value <= 37000) return '#62CD5A';
        if (value >= 37001 && value <= 38000) return '#ffff66';
        if (value >= 38001 && value <= 39000) return '#d500ff';
        if (value >= 39001 && value <= 40000) return '#f2b3ff';
        if (value >= 40001 && value <= 50000) return '#54000D';
        if (value >= 50001 && value <= 100000) return '#aa00cc';
        if (value >= 100001 && value <= 999998) return '#54000D';
    }
    else if (type === 'agi') {
        if (value === 0) return '#FFFFFF';
        if (value >= 1 && value <= 1000) return '#cccccc';
        if (value >= 1001 && value <= 2000) return '#B6BC7B';
        if (value >= 2001 && value <= 3000) return '#949593';
        if (value >= 3001 && value <= 4000) return '#CEE6C1';
        if (value >= 4001 && value <= 5000) return '#3155A6';
        if (value >= 5001 && value <= 6000) return '#F3A66B';
        if (value >= 6001 && value <= 7000) return '#BC011E';
        if (value >= 7001 && value <= 8000) return '#BC011E';
        if (value >= 8001 && value <= 9000) return '#BC011E';
        if (value >= 9001 && value <= 10000) return '#c1ab05';
        if (value >= 10001 && value <= 11000) return '#7a0099';
        if (value >= 11001 && value <= 12000) return '#00ffff';
        if (value >= 12001 && value <= 13000) return '#ff0055';
        if (value >= 13001 && value <= 14000) return '#ff99ff';
        if (value >= 14001 && value <= 15000) return '#890116';
        if (value >= 15001 && value <= 16000) return '#890116';
        if (value >= 16001 && value <= 17000) return '#890116';
        if (value >= 17001 && value <= 18000) return '#54000D';
        if (value >= 18001 && value <= 19000) return '#54000D';
        if (value >= 19001 && value <= 20000) return '#54000D';
        if (value >= 20001 && value <= 21000) return '#54000D';
        if (value >= 21001 && value <= 22000) return '#54000D';
        if (value >= 22001 && value <= 23000) return '#54000D';
        if (value >= 23001 && value <= 24000) return '#ffff00';
        if (value >= 24001 && value <= 25000) return '#aa00cc';
        if (value >= 25001 && value <= 26000) return '#ccffff';
        if (value >= 26001 && value <= 27000) return '#ccffff';
        if (value >= 27001 && value <= 28000) return '#ccffff';
        if (value >= 28001 && value <= 29000) return '#ccffff';
        if (value >= 29001 && value <= 30000) return '#ccffff';
        if (value >= 30001 && value <= 31000) return '#ccffff';
        if (value >= 31001 && value <= 32000) return '#0000ff';
        if (value >= 32001 && value <= 33000) return '#0000ff';
        if (value >= 33001 && value <= 34000) return '#0000ff';
        if (value >= 34001 && value <= 35000) return '#62CD5A';
        if (value >= 35001 && value <= 36000) return '#62CD5A';
        if (value >= 36001 && value <= 37000) return '#62CD5A';
        if (value >= 37001 && value <= 38000) return '#ffff66';
        if (value >= 38001 && value <= 39000) return '#d500ff';
        if (value >= 39001 && value <= 40000) return '#f2b3ff';
        if (value >= 40001 && value <= 50000) return '#54000D';
        if (value >= 50001 && value <= 100000) return '#aa00cc';
        if (value >= 100001 && value <= 999998) return '#54000D';
    }
    else if (type === 'int') {
        if (value === 0) return '#FFFFFF';
        if (value >= 1 && value <= 1000) return '#cccccc';
        if (value >= 1001 && value <= 2000) return '#B6BC7B';
        if (value >= 2001 && value <= 3000) return '#949593';
        if (value >= 3001 && value <= 4000) return '#CEE6C1';
        if (value >= 4001 && value <= 5000) return '#3155A6';
        if (value >= 5001 && value <= 6000) return '#F3A66B';
        if (value >= 6001 && value <= 7000) return '#BC011E';
        if (value >= 7001 && value <= 8000) return '#BC011E';
        if (value >= 8001 && value <= 9000) return '#BC011E';
        if (value >= 9001 && value <= 10000) return '#c1ab05';
        if (value >= 10001 && value <= 11000) return '#7a0099';
        if (value >= 11001 && value <= 12000) return '#00ffff';
        if (value >= 12001 && value <= 13000) return '#ff0055';
        if (value >= 13001 && value <= 14000) return '#ff99ff';
        if (value >= 14001 && value <= 15000) return '#890116';
        if (value >= 15001 && value <= 16000) return '#890116';
        if (value >= 16001 && value <= 17000) return '#890116';
        if (value >= 17001 && value <= 18000) return '#54000D';
        if (value >= 18001 && value <= 19000) return '#54000D';
        if (value >= 19001 && value <= 20000) return '#54000D';
        if (value >= 20001 && value <= 21000) return '#54000D';
        if (value >= 21001 && value <= 22000) return '#54000D';
        if (value >= 22001 && value <= 23000) return '#54000D';
        if (value >= 23001 && value <= 24000) return '#ffff00';
        if (value >= 24001 && value <= 25000) return '#aa00cc';
        if (value >= 25001 && value <= 26000) return '#ccffff';
        if (value >= 26001 && value <= 27000) return '#ccffff';
        if (value >= 27001 && value <= 28000) return '#ccffff';
        if (value >= 28001 && value <= 29000) return '#ccffff';
        if (value >= 29001 && value <= 30000) return '#ccffff';
        if (value >= 30001 && value <= 31000) return '#ccffff';
        if (value >= 31001 && value <= 32000) return '#0000ff';
        if (value >= 32001 && value <= 33000) return '#0000ff';
        if (value >= 33001 && value <= 34000) return '#0000ff';
        if (value >= 34001 && value <= 35000) return '#62CD5A';
        if (value >= 35001 && value <= 36000) return '#62CD5A';
        if (value >= 36001 && value <= 37000) return '#62CD5A';
        if (value >= 37001 && value <= 38000) return '#ffff66';
        if (value >= 38001 && value <= 39000) return '#d500ff';
        if (value >= 39001 && value <= 40000) return '#f2b3ff';
        if (value >= 40001 && value <= 50000) return '#54000D';
        if (value >= 50001 && value <= 100000) return '#aa00cc';
        if (value >= 100001 && value <= 999998) return '#54000D';
    }
    else if (type === 'eva') {
        if (value === 0) return '#FFFFFF';
        if (value >= 1 && value <= 1000) return '#cccccc';
        if (value >= 1001 && value <= 2000) return '#B6BC7B';
        if (value >= 2001 && value <= 3000) return '#949593';
        if (value >= 3001 && value <= 4000) return '#CEE6C1';
        if (value >= 4001 && value <= 5000) return '#3155A6';
        if (value >= 5001 && value <= 6000) return '#F3A66B';
        if (value >= 6001 && value <= 7000) return '#BC011E';
        if (value >= 7001 && value <= 8000) return '#BC011E';
        if (value >= 8001 && value <= 9000) return '#BC011E';
        if (value >= 9001 && value <= 10000) return '#c1ab05';
        if (value >= 10001 && value <= 11000) return '#7a0099';
        if (value >= 11001 && value <= 12000) return '#00ffff';
        if (value >= 12001 && value <= 13000) return '#ff0055';
        if (value >= 13001 && value <= 14000) return '#ff99ff';
        if (value >= 14001 && value <= 15000) return '#890116';
        if (value >= 15001 && value <= 16000) return '#890116';
        if (value >= 16001 && value <= 17000) return '#890116';
        if (value >= 17001 && value <= 18000) return '#54000D';
        if (value >= 18001 && value <= 19000) return '#54000D';
        if (value >= 19001 && value <= 20000) return '#54000D';
        if (value >= 20001 && value <= 21000) return '#54000D';
        if (value >= 21001 && value <= 22000) return '#54000D';
        if (value >= 22001 && value <= 23000) return '#54000D';
        if (value >= 23001 && value <= 24000) return '#ffff00';
        if (value >= 24001 && value <= 25000) return '#aa00cc';
        if (value >= 25001 && value <= 26000) return '#ccffff';
        if (value >= 26001 && value <= 27000) return '#ccffff';
        if (value >= 27001 && value <= 28000) return '#ccffff';
        if (value >= 28001 && value <= 29000) return '#ccffff';
        if (value >= 29001 && value <= 30000) return '#ccffff';
        if (value >= 30001 && value <= 31000) return '#ccffff';
        if (value >= 31001 && value <= 32000) return '#0000ff';
        if (value >= 32001 && value <= 33000) return '#0000ff';
        if (value >= 33001 && value <= 34000) return '#0000ff';
        if (value >= 34001 && value <= 35000) return '#62CD5A';
        if (value >= 35001 && value <= 36000) return '#62CD5A';
        if (value >= 36001 && value <= 37000) return '#62CD5A';
        if (value >= 37001 && value <= 38000) return '#ffff66';
        if (value >= 38001 && value <= 39000) return '#d500ff';
        if (value >= 39001 && value <= 40000) return '#f2b3ff';
        if (value >= 40001 && value <= 50000) return '#54000D';
        if (value >= 50001 && value <= 100000) return '#aa00cc';
        if (value >= 100001 && value <= 999998) return '#54000D';
    }
    else if (type === 'faith') {
        if (value === 0) return '#FFFFFF';
        if (value >= 1 && value <= 1000) return '#cccccc';
        if (value >= 1001 && value <= 2000) return '#B6BC7B';
        if (value >= 2001 && value <= 3000) return '#949593';
        if (value >= 3001 && value <= 4000) return '#CEE6C1';
        if (value >= 4001 && value <= 5000) return '#3155A6';
        if (value >= 5001 && value <= 6000) return '#F3A66B';
        if (value >= 6001 && value <= 7000) return '#BC011E';
        if (value >= 7001 && value <= 8000) return '#BC011E';
        if (value >= 8001 && value <= 9000) return '#BC011E';
        if (value >= 9001 && value <= 10000) return '#c1ab05';
        if (value >= 10001 && value <= 11000) return '#7a0099';
        if (value >= 11001 && value <= 12000) return '#00ffff';
        if (value >= 12001 && value <= 13000) return '#ff0055';
        if (value >= 13001 && value <= 14000) return '#ff99ff';
        if (value >= 14001 && value <= 15000) return '#890116';
        if (value >= 15001 && value <= 16000) return '#890116';
        if (value >= 16001 && value <= 17000) return '#890116';
        if (value >= 17001 && value <= 18000) return '#54000D';
        if (value >= 18001 && value <= 19000) return '#54000D';
        if (value >= 19001 && value <= 20000) return '#54000D';
        if (value >= 20001 && value <= 21000) return '#54000D';
        if (value >= 21001 && value <= 22000) return '#54000D';
        if (value >= 22001 && value <= 23000) return '#54000D';
        if (value >= 23001 && value <= 24000) return '#ffff00';
        if (value >= 24001 && value <= 25000) return '#aa00cc';
        if (value >= 25001 && value <= 26000) return '#ccffff';
        if (value >= 26001 && value <= 27000) return '#ccffff';
        if (value >= 27001 && value <= 28000) return '#ccffff';
        if (value >= 28001 && value <= 29000) return '#ccffff';
        if (value >= 29001 && value <= 30000) return '#ccffff';
        if (value >= 30001 && value <= 31000) return '#ccffff';
        if (value >= 31001 && value <= 32000) return '#0000ff';
        if (value >= 32001 && value <= 33000) return '#0000ff';
        if (value >= 33001 && value <= 34000) return '#0000ff';
        if (value >= 34001 && value <= 35000) return '#62CD5A';
        if (value >= 35001 && value <= 36000) return '#62CD5A';
        if (value >= 36001 && value <= 37000) return '#62CD5A';
        if (value >= 37001 && value <= 38000) return '#ffff66';
        if (value >= 38001 && value <= 39000) return '#d500ff';
        if (value >= 39001 && value <= 40000) return '#f2b3ff';
        if (value >= 40001 && value <= 50000) return '#54000D';
        if (value >= 50001 && value <= 100000) return '#aa00cc';
        if (value >= 100001 && value <= 999998) return '#54000D';
    }
    else if (type === 'mys') {
        if (value === 0) return '#FFFFFF';
        if (value >= 1 && value <= 1000) return '#cccccc';
        if (value >= 1001 && value <= 2000) return '#B6BC7B';
        if (value >= 2001 && value <= 3000) return '#949593';
        if (value >= 3001 && value <= 4000) return '#CEE6C1';
        if (value >= 4001 && value <= 5000) return '#3155A6';
        if (value >= 5001 && value <= 6000) return '#F3A66B';
        if (value >= 6001 && value <= 7000) return '#BC011E';
        if (value >= 7001 && value <= 8000) return '#BC011E';
        if (value >= 8001 && value <= 9000) return '#BC011E';
        if (value >= 9001 && value <= 10000) return '#c1ab05';
        if (value >= 10001 && value <= 11000) return '#7a0099';
        if (value >= 11001 && value <= 12000) return '#00ffff';
        if (value >= 12001 && value <= 13000) return '#ff0055';
        if (value >= 13001 && value <= 14000) return '#ff99ff';
        if (value >= 14001 && value <= 15000) return '#890116';
        if (value >= 15001 && value <= 16000) return '#890116';
        if (value >= 16001 && value <= 17000) return '#890116';
        if (value >= 17001 && value <= 18000) return '#54000D';
        if (value >= 18001 && value <= 19000) return '#54000D';
        if (value >= 19001 && value <= 20000) return '#54000D';
        if (value >= 20001 && value <= 21000) return '#54000D';
        if (value >= 21001 && value <= 22000) return '#54000D';
        if (value >= 22001 && value <= 23000) return '#54000D';
        if (value >= 23001 && value <= 24000) return '#ffff00';
        if (value >= 24001 && value <= 25000) return '#aa00cc';
        if (value >= 25001 && value <= 26000) return '#ccffff';
        if (value >= 26001 && value <= 27000) return '#ccffff';
        if (value >= 27001 && value <= 28000) return '#ccffff';
        if (value >= 28001 && value <= 29000) return '#ccffff';
        if (value >= 29001 && value <= 30000) return '#ccffff';
        if (value >= 30001 && value <= 31000) return '#ccffff';
        if (value >= 31001 && value <= 32000) return '#0000ff';
        if (value >= 32001 && value <= 33000) return '#0000ff';
        if (value >= 33001 && value <= 34000) return '#0000ff';
        if (value >= 34001 && value <= 35000) return '#62CD5A';
        if (value >= 35001 && value <= 36000) return '#62CD5A';
        if (value >= 36001 && value <= 37000) return '#62CD5A';
        if (value >= 37001 && value <= 38000) return '#ffff66';
        if (value >= 38001 && value <= 39000) return '#d500ff';
        if (value >= 39001 && value <= 40000) return '#f2b3ff';
        if (value >= 40001 && value <= 50000) return '#54000D';
        if (value >= 50001 && value <= 100000) return '#aa00cc';
        if (value >= 100001 && value <= 999998) return '#54000D';
    }
    else if (type === 'charm') {
        if (value === 0) return '#FFFFFF';
        if (value >= 1 && value <= 1000) return '#cccccc';
        if (value >= 1001 && value <= 2000) return '#B6BC7B';
        if (value >= 2001 && value <= 3000) return '#949593';
        if (value >= 3001 && value <= 4000) return '#CEE6C1';
        if (value >= 4001 && value <= 5000) return '#3155A6';
        if (value >= 5001 && value <= 6000) return '#F3A66B';
        if (value >= 6001 && value <= 7000) return '#BC011E';
        if (value >= 7001 && value <= 8000) return '#BC011E';
        if (value >= 8001 && value <= 9000) return '#BC011E';
        if (value >= 9001 && value <= 10000) return '#c1ab05';
        if (value >= 10001 && value <= 11000) return '#7a0099';
        if (value >= 11001 && value <= 12000) return '#00ffff';
        if (value >= 12001 && value <= 13000) return '#ff0055';
        if (value >= 13001 && value <= 14000) return '#ff99ff';
        if (value >= 14001 && value <= 15000) return '#890116';
        if (value >= 15001 && value <= 16000) return '#890116';
        if (value >= 16001 && value <= 17000) return '#890116';
        if (value >= 17001 && value <= 18000) return '#54000D';
        if (value >= 18001 && value <= 19000) return '#54000D';
        if (value >= 19001 && value <= 20000) return '#54000D';
        if (value >= 20001 && value <= 21000) return '#54000D';
        if (value >= 21001 && value <= 22000) return '#54000D';
        if (value >= 22001 && value <= 23000) return '#54000D';
        if (value >= 23001 && value <= 24000) return '#ffff00';
        if (value >= 24001 && value <= 25000) return '#aa00cc';
        if (value >= 25001 && value <= 26000) return '#ccffff';
        if (value >= 26001 && value <= 27000) return '#ccffff';
        if (value >= 27001 && value <= 28000) return '#ccffff';
        if (value >= 28001 && value <= 29000) return '#ccffff';
        if (value >= 29001 && value <= 30000) return '#ccffff';
        if (value >= 30001 && value <= 31000) return '#ccffff';
        if (value >= 31001 && value <= 32000) return '#0000ff';
        if (value >= 32001 && value <= 33000) return '#0000ff';
        if (value >= 33001 && value <= 34000) return '#0000ff';
        if (value >= 34001 && value <= 35000) return '#62CD5A';
        if (value >= 35001 && value <= 36000) return '#62CD5A';
        if (value >= 36001 && value <= 37000) return '#62CD5A';
        if (value >= 37001 && value <= 38000) return '#ffff66';
        if (value >= 38001 && value <= 39000) return '#d500ff';
        if (value >= 39001 && value <= 40000) return '#f2b3ff';
        if (value >= 40001 && value <= 50000) return '#54000D';
        if (value >= 50001 && value <= 100000) return '#aa00cc';
        if (value >= 100001 && value <= 999998) return '#54000D';
    }
    else if (type === 'luk') {
        if (value === 0) return '#FFFFFF';
        if (value >= 1 && value <= 1000) return '#cccccc';
        if (value >= 1001 && value <= 2000) return '#B6BC7B';
        if (value >= 2001 && value <= 3000) return '#949593';
        if (value >= 3001 && value <= 4000) return '#CEE6C1';
        if (value >= 4001 && value <= 5000) return '#3155A6';
        if (value >= 5001 && value <= 6000) return '#F3A66B';
        if (value >= 6001 && value <= 7000) return '#BC011E';
        if (value >= 7001 && value <= 8000) return '#BC011E';
        if (value >= 8001 && value <= 9000) return '#BC011E';
        if (value >= 9001 && value <= 10000) return '#c1ab05';
        if (value >= 10001 && value <= 11000) return '#7a0099';
        if (value >= 11001 && value <= 12000) return '#00ffff';
        if (value >= 12001 && value <= 13000) return '#ff0055';
        if (value >= 13001 && value <= 14000) return '#ff99ff';
        if (value >= 14001 && value <= 15000) return '#890116';
        if (value >= 15001 && value <= 16000) return '#890116';
        if (value >= 16001 && value <= 17000) return '#890116';
        if (value >= 17001 && value <= 18000) return '#54000D';
        if (value >= 18001 && value <= 19000) return '#54000D';
        if (value >= 19001 && value <= 20000) return '#54000D';
        if (value >= 20001 && value <= 21000) return '#54000D';
        if (value >= 21001 && value <= 22000) return '#54000D';
        if (value >= 22001 && value <= 23000) return '#54000D';
        if (value >= 23001 && value <= 24000) return '#ffff00';
        if (value >= 24001 && value <= 25000) return '#aa00cc';
        if (value >= 25001 && value <= 26000) return '#ccffff';
        if (value >= 26001 && value <= 27000) return '#ccffff';
        if (value >= 27001 && value <= 28000) return '#ccffff';
        if (value >= 28001 && value <= 29000) return '#ccffff';
        if (value >= 29001 && value <= 30000) return '#ccffff';
        if (value >= 30001 && value <= 31000) return '#ccffff';
        if (value >= 31001 && value <= 32000) return '#0000ff';
        if (value >= 32001 && value <= 33000) return '#0000ff';
        if (value >= 33001 && value <= 34000) return '#0000ff';
        if (value >= 34001 && value <= 35000) return '#62CD5A';
        if (value >= 35001 && value <= 36000) return '#62CD5A';
        if (value >= 36001 && value <= 37000) return '#62CD5A';
        if (value >= 37001 && value <= 38000) return '#ffff66';
        if (value >= 38001 && value <= 39000) return '#d500ff';
        if (value >= 39001 && value <= 40000) return '#f2b3ff';
        if (value >= 40001 && value <= 50000) return '#54000D';
        if (value >= 50001 && value <= 100000) return '#aa00cc';
        if (value >= 100001 && value <= 999998) return '#54000D';
    }
    else if (type === 'pot') {
        if (value === 0) return '#FFFFFF';
        if (value >= 1 && value <= 1000) return '#cccccc';
        if (value >= 1001 && value <= 2000) return '#B6BC7B';
        if (value >= 2001 && value <= 3000) return '#949593';
        if (value >= 3001 && value <= 4000) return '#CEE6C1';
        if (value >= 4001 && value <= 5000) return '#3155A6';
        if (value >= 5001 && value <= 6000) return '#F3A66B';
        if (value >= 6001 && value <= 7000) return '#BC011E';
        if (value >= 7001 && value <= 8000) return '#BC011E';
        if (value >= 8001 && value <= 9000) return '#BC011E';
        if (value >= 9001 && value <= 10000) return '#c1ab05';
        if (value >= 10001 && value <= 11000) return '#7a0099';
        if (value >= 11001 && value <= 12000) return '#00ffff';
        if (value >= 12001 && value <= 13000) return '#ff0055';
        if (value >= 13001 && value <= 14000) return '#ff99ff';
        if (value >= 14001 && value <= 15000) return '#890116';
        if (value >= 15001 && value <= 16000) return '#890116';
        if (value >= 16001 && value <= 17000) return '#890116';
        if (value >= 17001 && value <= 18000) return '#54000D';
        if (value >= 18001 && value <= 19000) return '#54000D';
        if (value >= 19001 && value <= 20000) return '#54000D';
        if (value >= 20001 && value <= 21000) return '#54000D';
        if (value >= 21001 && value <= 22000) return '#54000D';
        if (value >= 22001 && value <= 23000) return '#54000D';
        if (value >= 23001 && value <= 24000) return '#ffff00';
        if (value >= 24001 && value <= 25000) return '#aa00cc';
        if (value >= 25001 && value <= 26000) return '#ccffff';
        if (value >= 26001 && value <= 27000) return '#ccffff';
        if (value >= 27001 && value <= 28000) return '#ccffff';
        if (value >= 28001 && value <= 29000) return '#ccffff';
        if (value >= 29001 && value <= 30000) return '#ccffff';
        if (value >= 30001 && value <= 31000) return '#ccffff';
        if (value >= 31001 && value <= 32000) return '#0000ff';
        if (value >= 32001 && value <= 33000) return '#0000ff';
        if (value >= 33001 && value <= 34000) return '#0000ff';
        if (value >= 34001 && value <= 35000) return '#62CD5A';
        if (value >= 35001 && value <= 36000) return '#62CD5A';
        if (value >= 36001 && value <= 37000) return '#62CD5A';
        if (value >= 37001 && value <= 38000) return '#ffff66';
        if (value >= 38001 && value <= 39000) return '#d500ff';
        if (value >= 39001 && value <= 40000) return '#f2b3ff';
        if (value >= 40001 && value <= 50000) return '#54000D';
        if (value >= 50001 && value <= 100000) return '#aa00cc';
        if (value >= 100001 && value <= 999998) return '#54000D';
    }
    return '#ffffff';
}



