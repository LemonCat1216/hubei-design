const fs = require('fs');
const turf = require('@turf/turf');

console.log('🚀 开始构建空间情报预计算数据...');

// 1. 读取所有原始基础数据
const riverData = JSON.parse(fs.readFileSync('./river.geojson', 'utf8'));
const pointsData = JSON.parse(fs.readFileSync('./processed_points.geojson', 'utf8'));
const enterprises = JSON.parse(fs.readFileSync('./enterprises.json', 'utf8'));
const emissionActual = JSON.parse(fs.readFileSync('./emission_actual.json', 'utf8'));
const emissionStd = JSON.parse(fs.readFileSync('./emission_standards.json', 'utf8'));

// 构建字典以实现 O(1) 极速查询
const weightDict = {};
enterprises.forEach(i => weightDict[i.name] = i.weight);

const actualDict = {};
emissionActual.forEach(i => actualDict[i.name] = i);

const stdDict = {};
emissionStd.forEach(i => stdDict[i.name] = i);

const riverLine = riverData.features[0];

// 2. 移植 S_scale 静态计算逻辑
function computeStaticSScale(fname) {
    const actual = actualDict[fname];
    const std = stdDict[fname];
    const baseWeights = { cod: 0.2, tn: 0.2, nh3n: 0.3, tp: 0.3 };
    let S_scale = 1.0;
    let P_max = 0;

    if (actual && std) {
        let validSum = 0;
        let pData = [];
        ['cod', 'tn', 'nh3n', 'tp'].forEach(k => {
            let a_val = actual[k];
            let stdKey = k === 'nh3n' ? 'nh3n_limit' : k + '_limit';
            let s_val = std[stdKey];
            if (a_val != null && s_val != null && s_val !== "—" && !isNaN(s_val) && s_val > 0) {
                let p = a_val / s_val;
                validSum += baseWeights[k];
                pData.push({ p, w: baseWeights[k] });
            }
        });
        if (validSum > 0) {
            let sum_P_w_prime = 0;
            pData.forEach(d => {
                let w_prime = d.w / validSum;
                sum_P_w_prime += d.p * w_prime;
                if (d.p > P_max) P_max = d.p;
            });
            let K_penalty = P_max > 1 ? Math.pow(P_max, 2) : 1;
            S_scale = sum_P_w_prime * K_penalty;
        }
    }
    return S_scale;
}

// 3. 核心：遍历排污节点，进行极其耗时的 Turf.js 空间计算
console.log(`⏳ 正在计算 ${pointsData.features.length} 个节点的空间拓扑关系...`);

pointsData.features.forEach((feature, index) => {
    const fname = feature.properties.name || '未知节点';
    let coords = feature.geometry.coordinates;

    // 1. 扁平化处理：如果你的数据嵌套了，比如 [[114.3, 30.6]]，提取最里面的数组
    if (coords && Array.isArray(coords[0])) {
        coords = coords[0];
    }

    // 2. 防御性拦截：如果坐标完全丢失或不是两个数字，直接跳过并打印警告，防止脚本崩溃
    if (!coords || coords.length < 2) {
        console.warn(`⚠️ 警告: 节点 [${fname}] 坐标数据无效 (${JSON.stringify(coords)})，已跳过计算。`);
        return;
    }

    // 生成 Turf Point
    const factoryPt = turf.point(coords);

    // 执行空间计算...
    const D_pipe = turf.pointToLineDistance(factoryPt, riverLine, { units: 'kilometers' });
    const snappedInfo = turf.nearestPointOnLine(riverLine, factoryPt, { units: 'kilometers' });

    feature.properties = {
        name: fname,
        weight: weightDict[fname] || 0.1,
        D_pipe: D_pipe,
        factoryDistFromStart: snappedInfo.properties.location,
        S_scale: computeStaticSScale(fname),
        anchorLng: snappedInfo.geometry.coordinates[0],
        anchorLat: snappedInfo.geometry.coordinates[1]
    };

    if (index % 100 === 0) process.stdout.write('.');
});

// 4. 打包为最终的单文件数据 (包含河流和处理后的点位)
const finalExportData = {
    river: riverData,
    factories: pointsData,
    // 如果前端还需要知道总长度，我们也可以在这里算好直接传过去
    riverLength: turf.length(riverLine, { units: 'kilometers' })
};

fs.writeFileSync('./app-init-data.json', JSON.stringify(finalExportData));
console.log('\n✅ 构建完成！已生成终极前端直供文件: app-init-data.json');