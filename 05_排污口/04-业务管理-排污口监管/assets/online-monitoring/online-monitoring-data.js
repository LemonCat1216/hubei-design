    const rawData = [
        { region: "武汉", park: "武汉化学工业区", subpark: "", level: "市级", enterprise: "武汉中法水务有限公司", outlet: "武汉市青山区化工区中法水务污水处理厂生产废水排污口", lng: 114.552236, lat: 30.623064 },
        { region: "武汉", park: "武汉化学工业区", subpark: "", level: "未定级", enterprise: "武汉中韩石油化工有限公司", outlet: "武汉市青山区化工区临江大道和化工二路交叉口东侧武惠堤下北湖泵站东北侧160米中韩石油化工有限公司入河排污口（乙烯厂区）生产废水排污口", lng: 114.552215, lat: 30.623090 },
        { region: "襄阳", park: "襄城经济开发区余家湖化工园", subpark: "", level: "省级", enterprise: "襄阳浦华汉清水务有限公司", outlet: "襄阳市襄城区桑德汉清公司城镇污水集中处理设施排污口", lng: 112.198131, lat: 31.889532 },
        { region: "襄阳", park: "谷城化工园区", subpark: "", level: "省级", enterprise: "谷城化工园区污水处理厂", outlet: "谷城化工园区污水处理厂排污口", lng: 111.553566, lat: 32.280278 },
        { region: "襄阳", park: "老河口市化工园区", subpark: "", level: "省级", enterprise: "老河口市陈埠污水处理厂", outlet: "襄阳市老河口市陈埠污水处理厂污水集中处理设施排污口", lng: 111.688597, lat: 32.301657 },
        { region: "襄阳", park: "襄阳（宜城）精细化工产业园", subpark: "", level: "市级", enterprise: "大雁污水处理厂", outlet: "襄阳市宜城市大雁污水处理厂人工湿地废水排放口", lng: 112.231940, lat: 31.592697 },
        { region: "襄阳", park: "枣阳市化工工业园区", subpark: "", level: "市级", enterprise: "枣阳市第二污水处理厂", outlet: "襄阳市枣阳市第二污水处理厂排污口", lng: 112.711161, lat: 32.087829 },
        { region: "宜昌", park: "湖北宜都化工园", subpark: "", level: "省级", enterprise: "宜都市三板湖污水处理厂", outlet: "宜昌市宜都市枝城镇三板湖污水处理厂排污口", lng: 111.531599, lat: 30.260011 },
        { region: "宜昌", park: "宜昌姚家港化工园", subpark: "", level: "省级", enterprise: "枝江市木渣湖污水处理有限责任公司", outlet: "宜昌市枝江市木渣湖污水处理厂排污口", lng: 111.653402, lat: 30.382186 },
        { region: "宜昌", park: "当阳坝陵化工园", subpark: "", level: "省级", enterprise: "金桥污水处理厂", outlet: "宜昌市当阳市金桥工业及其他各类园区污水处理厂排污口", lng: 111.873957, lat: 30.764637 },
        { region: "宜昌", park: "猇亭化工园", subpark: "", level: "市级", enterprise: "猇亭污水处理厂", outlet: "宜昌市猇亭区红溪港入江其他排口", lng: 111.427390, lat: 30.505461 },
        { region: "宜昌", park: "兴山化工园", subpark: "", level: "县级", enterprise: "白沙河化工厂污水处理站", outlet: "宜昌市兴山县兴发白沙河化工厂1#工矿企业排污口", lng: 110.706462, lat: 31.265105 },
        { region: "宜昌", park: "兴山化工园", subpark: "", level: "县级", enterprise: "刘草坡化工厂污水处理站", outlet: "宜昌市兴山县兴发刘草坡化工厂排污口", lng: 110.786111, lat: 31.147611 },
        { region: "宜昌", park: "远安化工园", subpark: "航空航天化工园区", level: "省级", enterprise: "远安县工业污水处理厂", outlet: "宜昌市远安县工业污水处理厂排口", lng: 111.652169, lat: 31.041497 },
        { region: "宜昌", park: "远安化工园", subpark: "嫘祖片区", level: "省级", enterprise: "远安嫘祖工业污水处理厂", outlet: "宜昌市远安县嫘祖工业污水处理厂排污口", lng: 111.428583, lat: 31.170255 },
        { region: "黄石", park: "西塞山工业园区化工园", subpark: "", level: "省级", enterprise: "西塞山工业园区工业污水处理厂", outlet: "黄石市新港园区长江棋盘洲大桥下游750米污水处理厂排污口", lng: 115.269313, lat: 30.143619 },
        { region: "黄石", park: "阳新经济开发区滨江工业园（医药化工园区）", subpark: "", level: "省级", enterprise: "黄石市富池水务有限公司", outlet: "黄石市阳新县富池水务公司3号工业污水处理厂排污口", lng: 115.450582, lat: 29.848732 },
        { region: "荆州", park: "荆州经济技术开发区化工园区（含沙市化工园）", subpark: "荆州开发区", level: "省级", enterprise: "荆州申联环境科技有限公司", outlet: "荆州市开发区申联公司1号污水集中处理设施排污口", lng: 112.289122, lat: 30.241809 },
        { region: "荆州", park: "荆州经济技术开发区化工园区（含沙市化工园）", subpark: "荆州开发区", level: "未定级", enterprise: "安道麦股份有限公司污水处理厂", outlet: "荆州市开发区安道麦股份有限公司1号混合废污水排污口", lng: 112.289803, lat: 30.256020 },
        { region: "荆州", park: "公安县化工园区", subpark: "", level: "省级", enterprise: "湖北省青吉佳源水务有限公司", outlet: "荆州市公安县青吉佳源水务处理厂入江排污口", lng: 112.304163, lat: 30.048119 },
        { region: "荆州", park: "武汉经济技术开发区洪湖新滩经济合作区化工园区", subpark: "", level: "市级", enterprise: "洪湖市碧水源环境科技有限公司集中式污水处理厂", outlet: "荆州市洪湖市新滩镇城镇污水处理厂排污口", lng: 113.844551, lat: 30.157500 },
        { region: "荆州", park: "监利市医药化工园区", subpark: "", level: "省级", enterprise: "监利清源污水处理有限公司（监利县城东工业园区污水处理厂）", outlet: "监利市工业园新区污水处理厂（监利市医药化工园区污水处理厂）入河排污口", lng: 112.997222, lat: 29.851996 },
        { region: "荆州", park: "江陵县化工园区", subpark: "", level: "省级", enterprise: "江陵县滨江污水处理厂", outlet: "荆州市江陵县熊河镇沿江产业园滨江污水处理厂废水排口", lng: 112.343207, lat: 30.072465 },
        { region: "荆州", park: "松滋市化工园区", subpark: "", level: "省级", enterprise: "松滋市临港污水处理有限公司", outlet: "荆州市松滋市临港工业园污水处理厂入江排污口", lng: 111.575756, lat: 30.256158 },
        { region: "荆州", park: "松滋市化工园区", subpark: "", level: "未定级", enterprise: "湖北丽源科技股份有限公司污水处理厂", outlet: "荆州市松滋市湖北丽源科技股份有限公司入江总排口", lng: 111.619488, lat: 30.301707 },
        { region: "荆州", park: "石首市化工园", subpark: "金平化工园区", level: "省级", enterprise: "石首市梅思泰克水务发展有限公司污水处理厂", outlet: "荆州市石首市威德水务污水处理厂排污口", lng: 112.231640, lat: 29.403623 },
        { region: "荆州", park: "石首市化工园", subpark: "张城垸工业园区", level: "省级", enterprise: "湖北华丽染料工业有限公司污水处理厂", outlet: "荆州市石首市湖北华丽染料工业有限公司污水处理厂工业排污口", lng: 112.442762, lat: 29.750454 },
        { region: "荆州", park: "石首市化工园", subpark: "张城垸工业园区", level: "未定级", enterprise: "楚源高新科技集团股份有限公司污水处理厂", outlet: "荆州市石首市楚源高新科技集团股份有限公司污水处理厂厂外排污口", lng: 112.431068, lat: 29.762913 },
        { region: "十堰", park: "丹江口市化工园区", subpark: "", level: "县级", enterprise: "丹江口市化工园区（白果树沟）污水处理厂", outlet: "十堰市丹江口市化工园区污水处理厂排污口", lng: 111.472460, lat: 32.502611 },
        { region: "孝感", park: "湖北应城化工产业园区", subpark: "东城工业园", level: "省级", enterprise: "东城工业园黎么污水处理站", outlet: "孝感市应城市东城工业园污水处理厂排污口", lng: 113.684526, lat: 30.913286 },
        { region: "孝感", park: "湖北应城化工产业园区", subpark: "东城工业园", level: "未定级", enterprise: "湖北双环科技股份有限公司污水处理站", outlet: "孝感市应城市府河湖北双环工业企业排污口", lng: 113.709660, lat: 30.939267 },
        { region: "孝感", park: "湖北应城化工产业园区", subpark: "赛孚工业园", level: "县级", enterprise: "应城市长江埠赛孚工业园污水处理厂", outlet: "孝感市应城市长江埠工业污水处理厂排污口", lng: 113.734872, lat: 30.866230 },
        { region: "孝感", park: "湖北应城化工产业园区", subpark: "盐化工业园", level: "县级", enterprise: "四里棚盐化工业园污水处理厂", outlet: "孝感市应城市四里棚街道刘杨社区西南819米盐化产业园污水处理厂排污口", lng: 113.582108, lat: 30.929334 },
        { region: "孝感", park: "湖北应城化工产业园区", subpark: "", level: "未定级", enterprise: "开发区污水处理厂", outlet: "湖北应城经济开发区污水处理厂入河排污口", lng: 113.546729, lat: 30.904494 },
        { region: "荆门", park: "荆门化工循环产业园", subpark: "", level: "市级", enterprise: "中节能(荆门)环科水务技术发展有限公司", outlet: "荆门市化工循环产业园污水处理厂排污口", lng: 112.265883, lat: 31.022843 },
        { region: "荆门", park: "沙洋县化工集中区", subpark: "", level: "省级", enterprise: "沙洋县城市工业污水处理厂", outlet: "荆门市沙洋县城市工业污水处理厂排污口", lng: 112.545013, lat: 30.671958 },
        { region: "荆门", park: "钟祥胡集经济开发区化工园区", subpark: "", level: "市级", enterprise: "钟祥市胡集镇工业园区污水处理厂", outlet: "钟祥市胡集镇工业污水处理厂混合污水入河排污口", lng: 112.306111, lat: 31.420000 },
        { region: "荆门", park: "东宝化工循环产业园", subpark: "", level: "县级", enterprise: "东宝化工循环产业园工业污水处理厂", outlet: "东宝化工循环产业园区污水处理厂排口", lng: 112.220397, lat: 30.253442 },
        { region: "黄冈", park: "湖北黄州火车站经济开发区黄冈化工产业园", subpark: "", level: "省级", enterprise: "黄冈市保青污水处理厂", outlet: "黄冈市保青污水处理厂生产废水排污口", lng: 114.999168, lat: 30.427569 },
        { region: "黄冈", park: "武穴市马口化工产业园", subpark: "", level: "省级", enterprise: "武穴市田家镇污水处理厂", outlet: "黄冈市武穴市污水处理厂城镇污水集中处理设施排污口", lng: 115.60511256008, lat: 29.8507570294335 },
        { region: "咸宁", park: "嘉鱼县武汉新港潘湾工业园化工园区", subpark: "", level: "省级", enterprise: "咸宁市嘉鱼县潘家湾畈湖污水处理厂", outlet: "咸宁市嘉鱼县潘湾畈湖污水处理厂入江排污口", lng: 114.024985, lat: 30.228041 },
        { region: "随州", park: "随州市青春化工工业园", subpark: "", level: "市级", enterprise: "淅河片区工业污水处理厂", outlet: "随州市曾都区淅河镇光化村复旦水务（随州）城南污水处理有限公司城镇污水处理厂城镇污水处理厂排污口", lng: 113.881279, lat: 31.579961 },
        { region: "随州", park: "广水市化工园区", subpark: "", level: "未定级", enterprise: "广水市化工园区污水处理厂", outlet: "随州市广水市十里街道马都司工业及其他各类园区污水处理厂排污口", lng: 113.879101, lat: 31.579236 },
        { region: "恩施", park: "恩施市白杨坪产业园（化工区）", subpark: "", level: "县级", enterprise: "恩施市白杨坪产业园（化工区）污水处理项目", outlet: "恩施州恩施市白杨坪镇产业园工业污水排污口", lng: 109.654015, lat: 30.525283 },
        { region: "仙桃", park: "仙桃市化工园", subpark: "新材料产业园", level: "市级", enterprise: "仙桃市仙下河污水处理厂", outlet: "仙桃市仙下河污水处理厂入河排污口", lng: 113.581211, lat: 30.357403 },
        { region: "仙桃", park: "仙桃市化工园", subpark: "仙桃钛产业园区", level: "市级", enterprise: "钛工业园工业污水处理厂", outlet: "仙桃市高新技术产业开发区钛工业园工业污水处理厂入河排污口", lng: 113.666111, lat: 30.165000 },
        { region: "潜江", park: "潜江经济开发区", subpark: "", level: "国家级", enterprise: "潜江经济开发区工业污水处理厂", outlet: "潜江市工业污水处理厂东南150m废水排口", lng: 112.874241931222, lat: 30.4748890446462 },
        { region: "潜江", park: "江汉盐化工业园", subpark: "", level: "市级", enterprise: "盐化工业园污水处理厂", outlet: "潜江市江汉盐化工业园污水处理厂总排污口", lng: 112.729722, lat: 30.500007 },
        { region: "天门", park: "岳口工业园", subpark: "", level: "省级", enterprise: "岳口潭湖污水处理有限公司", outlet: "天门市岳口潭湖污水处理有限公司排污口", lng: 113.106111, lat: 30.569444 }
    ].map((item, index) => ({ ...item, id: index + 1, monitorStatus: index < 42 ? "在线" : "掉线" }));

    const feedbackMessages = [
        "经现场核查，自动监控系统采样管路内有污泥，导致水样受污染、监测数据异常；清洗采样管路及采样桶后，设备恢复正常。",
        "通过调阅在线运维记录，COD设备比色皿下端高温电磁阀无法正常工作，水样无法进入比色皿，导致数据异常；维修后数据恢复正常。",
        "经现场比对监测，仪器零点漂移造成浓度数据偏高；完成校准和数据复核后，确认本次报警不属实。"
    ];
    const alarmData = Array.from({ length: 78 }, (_, index) => {
        const itemIndex = index === rawData.length - 1 ? Math.floor(rawData.length * 0.6) : index % rawData.length;
        const item = rawData[itemIndex];
        const alarmDate = new Date(2026, 6, 23);
        alarmDate.setDate(alarmDate.getDate() - index);
        const alarmTime = `${alarmDate.getFullYear()}-${String(alarmDate.getMonth() + 1).padStart(2, "0")}-${String(alarmDate.getDate()).padStart(2, "0")}`;
        const handled = index >= 34;
        const alarmType = index % 3 === 0 ? "数据异常" : "浓度超标";
        const alarmContent = alarmType === "数据异常"
            ? `【数据异常】${item.enterprise}，${item.outlet}，${alarmTime}自动监测数据异常。`
            : `【日均值浓度超标】${item.enterprise}，${item.outlet}，${alarmTime}化学需氧量日均值超标（标准≤250.0mg/L）。`;
        const feedbackContent = handled
            ? feedbackMessages[index % feedbackMessages.length]
            : "";
        return {
            ...item,
            id: index + 1,
            alarmType,
            alarmContent,
            alarmTime,
            regulator: `${item.region}市生态环境局`,
            feedbackContent,
            handleStatus: handled ? "已处理" : "未处理"
        };
    });
