/* 共用模拟数据：排污口 / 问题线索 / 延期申请（挂在线索上）/ 短信通知记录 */
const CITIES = ["武汉市", "黄石市", "十堰市", "宜昌市", "襄阳市", "鄂州市", "荆门市", "孝感市", "荆州市", "黄冈市", "咸宁市", "随州市", "恩施州", "仙桃市", "潜江市", "天门市", "神农架林区"];

const CLUE_TYPES = ["重大问题", "突出问题", "一般问题", "其他问题"];

const TYPE_RULES = {
    "重大问题": "重大问题：自交办之日起6个月内完成整改及查处。",
    "突出问题": "突出问题：自交办之日起3个月内完成全面整改。",
    "一般问题": "一般问题：自交办之日起1个月内须首次报送立行立改完成情况。",
    "其他问题": "其他问题：按交办要求在规定时限内完成整改。"
};

const OUTLETS = [
    { id: 1, code: "HB-PK-0001", name: "武汉市青山区化工区中法水务污水处理厂生产废水排污口", type: "工业园区污水处理厂排污口", level: "A类", city: "武汉市", river: "长江", lng: 114.552236, lat: 30.623064 },
    { id: 2, code: "HB-PK-0002", name: "武汉市中韩石化乙烯厂区入河排污口", type: "工业企业排污口", level: "B类", city: "武汉市", river: "长江", lng: 114.548620, lat: 30.618720 },
    { id: 3, code: "HB-PK-0003", name: "宜昌市猇亭区红溪港入江其他排口", type: "其他排口", level: "C类", city: "宜昌市", river: "长江", lng: 111.427390, lat: 30.505461 },
    { id: 4, code: "HB-PK-0004", name: "宜昌市宜都市三板湖污水处理厂排污口", type: "城镇污水处理厂排污口", level: "B类", city: "宜昌市", river: "长江", lng: 111.531599, lat: 30.260011 },
    { id: 5, code: "HB-PK-0005", name: "襄阳市谷城化工园区污水处理厂排污口", type: "工业园区污水处理厂排污口", level: "A类", city: "襄阳市", river: "汉江", lng: 111.553566, lat: 32.280278 },
    { id: 6, code: "HB-PK-0006", name: "襄阳市枣阳市第二污水处理厂排污口", type: "城镇污水处理厂排污口", level: "C类", city: "襄阳市", river: "沙河", lng: 112.711161, lat: 32.087829 },
    { id: 7, code: "HB-PK-0007", name: "黄石市阳新县富池水务公司3号工业污水处理厂排污口", type: "工业园区污水处理厂排污口", level: "B类", city: "黄石市", river: "长江", lng: 115.450582, lat: 29.848732 },
    { id: 8, code: "HB-PK-0008", name: "黄石市新港园区棋盘洲大桥下游污水处理厂排污口", type: "工业园区污水处理厂排污口", level: "A类", city: "黄石市", river: "长江", lng: 115.269313, lat: 30.143619 },
    { id: 9, code: "HB-PK-0009", name: "荆州市石首市威德水务污水处理厂排污口", type: "城镇污水处理厂排污口", level: "C类", city: "荆州市", river: "长江", lng: 112.231640, lat: 29.403623 },
    { id: 10, code: "HB-PK-0010", name: "荆州市公安县青吉佳源水务处理厂入江排污口", type: "工业园区污水处理厂排污口", level: "B类", city: "荆州市", river: "长江", lng: 112.304163, lat: 30.048119 },
    { id: 11, code: "HB-PK-0011", name: "孝感市应城市东城工业园污水处理厂排污口", type: "工业园区污水处理厂排污口", level: "D类", city: "孝感市", river: "老府河", lng: 113.684526, lat: 30.913286 },
    { id: 12, code: "HB-PK-0012", name: "荆门市化工循环产业园污水处理厂排污口", type: "工业园区污水处理厂排污口", level: "A类", city: "荆门市", river: "汉江", lng: 112.265883, lat: 31.022843 },
    { id: 13, code: "HB-PK-0013", name: "黄冈市武穴市田家镇污水处理厂排污口", type: "工业园区污水处理厂排污口", level: "B类", city: "黄冈市", river: "长江", lng: 115.605113, lat: 29.850757 },
    { id: 14, code: "HB-PK-0014", name: "咸宁市嘉鱼县潘湾畈湖污水处理厂入江排污口", type: "工业园区污水处理厂排污口", level: "C类", city: "咸宁市", river: "长江", lng: 114.024985, lat: 30.228041 },
    { id: 15, code: "HB-PK-0015", name: "十堰市丹江口市化工园区污水处理厂排污口", type: "工业园区污水处理厂排污口", level: "B类", city: "十堰市", river: "汉江", lng: 111.472460, lat: 32.502611 },
    { id: 16, code: "HB-PK-0016", name: "潜江市江汉盐化工业园污水处理厂总排污口", type: "工业园区污水处理厂排污口", level: "C类", city: "潜江市", river: "汉南河", lng: 112.729722, lat: 30.500007 },
    { id: 17, code: "HB-PK-0017", name: "仙桃市高新区钛工业园工业污水处理厂入河排污口", type: "工业园区污水处理厂排污口", level: "D类", city: "仙桃市", river: "通顺河", lng: 113.666111, lat: 30.165000 },
    { id: 18, code: "HB-PK-0018", name: "鄂州市樊口电排站二站混合废污水排污口", type: "混合废污水排污口", level: "C类", city: "鄂州市", river: "长江", lng: 114.888000, lat: 30.397000 }
];

const BEFORE_PHOTO_PROMPTS = [
    "环境执法现场取证照片：长江岸边混凝土排水管口正在排放灰黑色废水，管口周围水体发黑并有泡沫，河岸为碎石护坡，阴天，写实纪实风格",
    "环境执法现场取证照片：工业园区雨水排口混排污水，排水沟内水体呈黄褐色，旁边堆有工业废料，环境监管排查取证，阴天，写实纪实风格",
    "环境执法现场取证照片：污水处理厂总排口超标排放，出水浑浊发绿，排污口标识牌锈蚀，岸边有油污痕迹，写实纪实风格"
];

const AFTER_PHOTO_PROMPTS = [
    "排污口整治后现场照片：规范化整治后的入河排污口，新建整齐的跌水消能池和出水水质清澈，岸边绿化恢复，设有排污口标识牌，晴天，写实纪实风格",
    "排污口整治后现场照片：完成雨污分流改造的工业园区排口，管网整齐、检查井规范，周边场地干净整洁，晴天，写实纪实风格",
    "排污口整治后现场照片：污水处理厂提标改造后总排口出水清澈，在线监测站房整洁，标准化排放口，晴天，写实纪实风格"
];

const CLUES = [
    {
        id: 1, code: "WT2026-018", title: "青山区化工园区雨污混排直入长江问题", type: "突出问题", city: "武汉市", district: "青山区",
        desc: "现场核查发现，武汉化学工业区沿江路段存在雨污混接问题，园区雨水排口晴天时有灰黑色废水排出，采样监测化学需氧量、氨氮浓度超标，污水经雨水管网直排长江。",
        assignDate: "2026-07-10", startDate: "2026-07-10", dueDate: "2026-10-10", status: "待办",
        outlets: [1, 2], lng: 114.550400, lat: 30.620900,
        files: [{ name: "现场核查记录.docx", size: "588KB" }, { name: "监督性监测报告.pdf", size: "1.2MB" }],
        reports: [
            { date: "2026-08-10", person: "武汉市生态环境局青山区分局",
              source: "经溯源排查，问题成因为园区建设初期雨污管网混接，沿江路3处企业厂区雨水口与园区5条支管存在混接，另有个别企业私接市政雨水管。已委托第三方完成园区管网普查并形成混接点台账。",
              measures: "已封堵混接点8处，剩余4处正在施工；对沿线12家企业下达责令整改通知书；在园区雨水总排口加装在线监控与视频监控，实行晴天排水预警。",
              plan: "9月底前完成全部混接点截污改造；10月完成园区5条支管雨污分流改造工程；同步建立园区管网数字化台账，落实常态化巡查管护机制。",
              note: "已完成园区雨污管网全面普查，排查混接点12处，已完成截污改造8处，剩余4处正在施工，预计9月底前完工。",
              done: false, beforePhotos: [0, 1], afterPhotos: [1],
              files: [{ name: "混接点排查台账.xlsx", size: "286KB" }, { name: "截污改造施工情况说明.docx", size: "1.6MB" }] }
        ],
        defer: null, extendedDue: "", deferDays: 0
    },
    {
        id: 2, code: "WT2026-017", title: "石首市威德水务污水处理厂超标排放问题", type: "突出问题", city: "荆州市", district: "石首市",
        desc: "金平化工园区威德水务污水处理厂总排口总磷、氨氮连续多日超标排放，超标期间未启动应急预案，对长江水质造成风险。",
        assignDate: "2026-07-09", startDate: "2026-07-09", dueDate: "2026-10-09", status: "待办",
        outlets: [9], lng: 112.231640, lat: 29.403623,
        files: [{ name: "超标数据明细.xlsx", size: "216KB" }],
        reports: [
            { date: "2026-08-20", person: "荆州市生态环境局石首市分局",
              source: "经排查，超标成因为进水总磷负荷突增，叠加除磷药剂投加不足、生化系统除磷效率下降，超标期间企业未及时启动应急预案。",
              measures: "已责令企业降低处理负荷并开展工艺调试；增设除磷药剂投加装置，对进水水质实施加密监测；超标时段启用应急调蓄池暂存尾水。",
              plan: "9月中旬前完成除磷系统改造并实现稳定达标；同步追查上游涉磷企业排水情况，对超标排放行为依法立案查处。",
              note: "已责令企业降低处理负荷并开展工艺调试，增设除磷药剂投加装置，出水指标逐步接近限值。",
              done: false, beforePhotos: [2], afterPhotos: [0],
              files: [{ name: "超标期间运行记录.xlsx", size: "312KB" }] }
        ],
        defer: null, extendedDue: "", deferDays: 0
    },
    {
        id: 3, code: "WT2026-021", title: "富池工业园3号污水处理厂氨氮超标问题", type: "一般问题", city: "黄石市", district: "阳新县",
        desc: "阳新县滨江工业园富池水务3号工业污水处理厂出水氨氮日均值连续超标，涉嫌生化系统运行不正常。",
        assignDate: "2026-09-12", startDate: "2026-09-12", dueDate: "2026-10-12", status: "待办",
        outlets: [7], lng: 115.450582, lat: 29.848732,
        files: [{ name: "在线监控数据截图.png", size: "324KB" }],
        reports: [],
        defer: null, extendedDue: "", deferDays: 0
    },
    {
        id: 4, code: "WT2026-022", title: "鄂州樊口电排站混合废污水直排长江问题", type: "一般问题", city: "鄂州市", district: "鄂城区",
        desc: "樊口电排站二站混合废污水排污口旱季有污水直排迹象，沿线存在生活污水混入问题。",
        assignDate: "2026-09-14", startDate: "2026-09-14", dueDate: "2026-10-14", status: "待办",
        outlets: [18], lng: 114.888000, lat: 30.397000,
        files: [{ name: "现场照片说明材料.docx", size: "756KB" }],
        reports: [],
        defer: null, extendedDue: "", deferDays: 0
    },
    {
        id: 5, code: "WT2026-015", title: "谷城化工园区暗管偷排及管网破损问题", type: "重大问题", city: "襄阳市", district: "谷城县",
        desc: "谷城化工园区存在疑似暗管偷排问题，同时园区主管网多处破损导致污水外渗，需整体改造园区雨水、污水管网并依法查处违法行为。",
        assignDate: "2026-05-08", startDate: "2026-05-08", dueDate: "2026-11-08", status: "待办",
        outlets: [5], lng: 111.553566, lat: 32.280278,
        files: [{ name: "立案查处决定书.pdf", size: "890KB" }, { name: "管网排查报告.pdf", size: "3.4MB" }],
        reports: [
            { date: "2026-09-28", person: "襄阳市生态环境局谷城县分局",
              source: "经联合执法排查，确认园区存在1处暗管偷排，同时2.6公里雨污主管网多处破损导致污水外渗。问题成因为管网建设标准偏低、日常维护缺位。",
              measures: "已封堵偷排暗管并对涉事企业立案查处，处罚款45万元；管网改造工程完成招标并开始分段施工；同步开展园区企业雨污分流排查。",
              plan: "2027年1月8日前完成2.6公里主管网重建及园区企业雨污分流改造；建立园区管网定期检测制度，每季度开展一次CCTV检测。",
              note: "偷排暗管已封堵并立案查处，处罚款45万元；管网改造工程已完成招标，开始分段施工。",
              done: false, beforePhotos: [1, 2], afterPhotos: [1],
              files: [{ name: "行政处罚决定书.pdf", size: "890KB" }, { name: "管网改造施工进度表.xlsx", size: "156KB" }] }
        ],
        defer: {
            status: "已通过", category: "管网改造", appliedDue: "2027-01-08", reason: "园区雨水、污水主管网改造工程量大，需对2.6公里主管网整体开挖重建，并同步实施园区企业雨污分流改造，原期限内无法完工。",
            planFile: { name: "谷城化工园区管网改造工程可行性方案.pdf", size: "5.8MB" },
            applyDate: "2026-09-22", reviewDate: "2026-09-26", reviewNote: "同意延期。请按月报送工程进度，确保2027年1月8日前完成整改。", reviewer: "省生态环境厅水处"
        },
        extendedDue: "2027-01-08", deferDays: 61
    },
    {
        id: 6, code: "WT2026-013", title: "丹江口库区消落带建筑垃圾堆存问题", type: "一般问题", city: "十堰市", district: "丹江口市",
        desc: "丹江口库区某消落带存在建筑垃圾违规堆存问题，雨季可能冲刷入库影响水质。",
        assignDate: "2026-08-05", startDate: "2026-08-05", dueDate: "2026-09-05", status: "过期未办",
        outlets: [], lng: 111.482000, lat: 32.510000,
        files: [{ name: "现场核查影像.pdf", size: "2.1MB" }],
        reports: [],
        defer: null, extendedDue: "", deferDays: 0
    },
    {
        id: 7, code: "WT2026-009", title: "应城东城工业园污水处理厂废水渗漏问题", type: "突出问题", city: "孝感市", district: "应城市",
        desc: "东城工业园污水处理厂调节池底部防渗层破损，废水渗漏污染周边浅层地下水，需实施分区防渗改造。",
        assignDate: "2026-06-18", startDate: "2026-06-18", dueDate: "2026-09-18", status: "待办",
        outlets: [11], lng: 113.684526, lat: 30.913286,
        files: [{ name: "地下水监测报告.pdf", size: "1.8MB" }],
        reports: [
            { date: "2026-08-05", person: "孝感市生态环境局应城市分局",
              source: "经现场勘查与地下水监测，确认调节池底部防渗层破损导致废水渗漏，渗漏影响范围约1200平方米，已对周边浅层地下水造成影响。",
              measures: "已对调节池实施应急清空和临时防渗处理；设置地下水监测井3口并加密监测频次；编制完成分区防渗改造工程设计方案。",
              plan: "按分区防渗方案分两期实施改造，11月18日前完成全部防渗工程并通过验收，同步开展地下水修复效果评估。",
              note: "已对调节池实施应急清空和临时防渗处理，编制完成分区防渗改造工程设计方案。",
              done: false, beforePhotos: [2], afterPhotos: [2],
              files: [{ name: "地下水监测报告（8月）.pdf", size: "1.9MB" }] }
        ],
        defer: {
            status: "待省级审核", category: "工程施工", appliedDue: "2026-11-18", reason: "渗漏点防渗工程需结合地下水位观测结果分区实施，施工窗口期受汛期影响，申请延期2个月完成。",
            planFile: { name: "东城工业园防渗治理工程可行性方案.pdf", size: "4.2MB" },
            applyDate: "2026-09-20", reviewDate: "", reviewNote: "", reviewer: ""
        },
        extendedDue: "", deferDays: 0
    },
    {
        id: 8, code: "WT2026-005", title: "武穴田家镇污水处理厂总磷持续超标问题", type: "重大问题", city: "黄冈市", district: "武穴市",
        desc: "田家镇污水处理厂总磷长期超标，需实施提标改造并追查上游企业磷源管控责任，依法查处超标排放行为。",
        assignDate: "2026-04-20", startDate: "2026-04-20", dueDate: "2026-10-20", status: "待办",
        outlets: [13], lng: 115.605113, lat: 29.850757,
        files: [{ name: "责令改正违法行为决定书.pdf", size: "654KB" }],
        reports: [
            { date: "2026-08-15", person: "黄冈市生态环境局",
              source: "经溯源排查，总磷长期超标主因是上游2家涉磷企业废水预处理不到位，叠加提标改造尚未完成、深度除磷能力不足。",
              measures: "已完成提标改造工程主体设计，深度除磷单元土建施工中；对2家涉磷企业立案查处并责令限期完成预处理改造；加密总排口监测频次。",
              plan: "12月20日前完成提标改造并实现稳定达标；同步完成涉磷企业整治验收，建立上游企业磷排放总量管控机制。",
              note: "已完成提标改造工程主体设计，深度除磷单元土建施工中，同步对2家涉磷企业立案查处。",
              done: false, beforePhotos: [0], afterPhotos: [2],
              files: [{ name: "提标改造施工进度表.xlsx", size: "204KB" }] }
        ],
        defer: {
            status: "待省级审核", category: "工程施工", appliedDue: "2026-12-20", reason: "提标改造工程土建尚未完工，设备采购受供货周期影响，申请延期2个月完成整改及查处。",
            planFile: { name: "田家镇污水处理厂提标改造可行性方案.pdf", size: "6.5MB" },
            applyDate: "2026-09-30", reviewDate: "", reviewNote: "", reviewer: ""
        },
        extendedDue: "", deferDays: 0
    },
    {
        id: 9, code: "WT2026-003", title: "宜都三板湖污水处理厂汛期溢流问题", type: "突出问题", city: "宜昌市", district: "宜都市",
        desc: "三板湖污水处理厂汛期超负荷溢流，尾水经排口进入长江，需建设应急调蓄池并扩容改造。",
        assignDate: "2026-06-25", startDate: "2026-06-25", dueDate: "2026-09-25", status: "待办",
        outlets: [4], lng: 111.531599, lat: 30.260011,
        files: [{ name: "溢流事件调查报告.pdf", size: "2.7MB" }],
        reports: [
            { date: "2026-08-30", person: "宜昌市生态环境局宜都市分局",
              source: "经调查，汛期溢流主因是污水处理厂处理能力不足，缺少应急调蓄设施，汛期雨污混合水量超过处理负荷导致溢流。",
              measures: "已启动应急调蓄池建设，基坑开挖完成，受强降雨影响暂停施工；优化施工组织设计，安排汛后恢复连续施工；汛期加强厂区调度。",
              plan: "11月25日前完成调蓄池建设并投入使用；同步实施污水处理厂扩容改造，完善汛期应急调度方案。",
              note: "调蓄池基坑开挖完成，受强降雨影响暂停施工，已优化施工组织设计。",
              done: false, beforePhotos: [1], afterPhotos: [0],
              files: [{ name: "调蓄池施工组织设计.pdf", size: "2.3MB" }] }
        ],
        defer: {
            status: "已通过", category: "工程施工", appliedDue: "2026-11-25", reason: "调蓄池建设工程受汛期影响无法连续施工，基坑降水及土建作业需避开主汛期，申请延期2个月。",
            planFile: { name: "三板湖调蓄池建设工程可行性方案.pdf", size: "5.1MB" },
            applyDate: "2026-09-10", reviewDate: "2026-09-13", reviewNote: "同意延期至2026年11月25日，请在汛后加快施工进度。", reviewer: "省生态环境厅水处"
        },
        extendedDue: "2026-11-25", deferDays: 61
    },
    {
        id: 10, code: "WT2026-001", title: "嘉鱼潘湾畈湖污水处理厂进水浓度异常问题", type: "一般问题", city: "咸宁市", district: "嘉鱼县",
        desc: "潘湾畈湖污水处理厂进水COD长期偏低，园区存在清水入管网问题，纳污效率不高。",
        assignDate: "2026-08-20", startDate: "2026-08-20", dueDate: "2026-09-20", status: "已办",
        outlets: [14], lng: 114.024985, lat: 30.228041,
        files: [{ name: "园区管网排查台账.xlsx", size: "430KB" }],
        reports: [
            { date: "2026-09-18", person: "咸宁市生态环境局嘉鱼县分局", note: "立行立改已完成：排查封堵清水混入点6处，进水COD浓度由85mg/L提升至168mg/L，纳污效率恢复正常。", done: true, beforePhotos: [1], afterPhotos: [1, 2],
              files: [{ name: "清水混入点封堵台账.xlsx", size: "168KB" }, { name: "进水水质对比监测报告.pdf", size: "924KB" }] }
        ],
        defer: null, extendedDue: "", deferDays: 0
    },
    {
        id: 11, code: "WT2026-023", title: "白杨坪产业园废水收集池渗漏隐患", type: "其他问题", city: "恩施州", district: "恩施市",
        desc: "白杨坪产业园废水收集池墙体存在裂缝渗漏隐患，需限期整修并完善防渗措施。",
        assignDate: "2026-09-25", startDate: "2026-09-25", dueDate: "2026-12-25", status: "待办",
        outlets: [], lng: 109.654015, lat: 30.525283,
        files: [],
        reports: [],
        defer: null, extendedDue: "", deferDays: 0
    },
    {
        id: 12, code: "WT2026-016", title: "广水化工园区总排口总氮偏高问题", type: "一般问题", city: "随州市", district: "广水市",
        desc: "广水市化工园区污水处理厂总排口总氮浓度偏高，反硝化单元运行效率不足。",
        assignDate: "2026-09-08", startDate: "2026-09-08", dueDate: "2026-10-08", status: "过期未办",
        outlets: [], lng: 113.879101, lat: 31.579236,
        files: [{ name: "在线数据异常说明.pdf", size: "372KB" }],
        reports: [],
        defer: null, extendedDue: "", deferDays: 0
    },
    {
        id: 13, code: "WT2026-012", title: "仙桃钛工业园污水处理厂进水异常致出水超标问题", type: "突出问题", city: "仙桃市", district: "仙桃高新技术产业开发区",
        desc: "钛工业园工业污水处理厂因园区企业高盐废水冲击导致生化系统受抑制，出水多项指标超标，需溯源整治纳管企业排水。",
        assignDate: "2026-07-25", startDate: "2026-07-25", dueDate: "2026-10-28", status: "待办",
        outlets: [17], lng: 113.666111, lat: 30.165000,
        files: [{ name: "进水异常溯源报告.pdf", size: "3.9MB" }],
        reports: [
            { date: "2026-09-05", person: "仙桃市生态环境局",
              source: "经溯源监测，确认2家钛白粉企业高盐废水未经预处理直接纳管，导致污水处理厂生化系统受抑制，出水多项指标超标。",
              measures: "已锁定2家高盐废水排放企业并责令限期完成预处理改造；污水处理厂增加调节池容积以缓冲水质冲击；对园区排水实施加密监测与预警。",
              plan: "10月底前完成企业预处理设施改造并通过验收；同步完成污水处理厂调节池扩容，建立园区排水水质预警机制。",
              note: "已锁定2家高盐废水排放企业并责令预处理改造，污水处理厂增加调节池容积缓冲水质冲击。",
              done: false, beforePhotos: [2], afterPhotos: [1],
              files: [{ name: "进水异常溯源分析报告.pdf", size: "3.2MB" }] }
        ],
        defer: null, extendedDue: "", deferDays: 0
    },
    {
        id: 14, code: "WT2026-014", title: "潜江江汉盐化工业园雨水排口pH异常问题", type: "一般问题", city: "潜江市", district: "潜江经济开发区",
        desc: "江汉盐化工业园雨水总排口pH间歇性异常，疑似园区企业雨水管网串排生产废水，需改造pH在线监控及自动切断系统。",
        assignDate: "2026-09-10", startDate: "2026-09-10", dueDate: "2026-10-10", status: "待办",
        outlets: [16], lng: 112.729722, lat: 30.500007,
        files: [{ name: "pH异常时段数据表.xlsx", size: "198KB" }],
        reports: [],
        defer: {
            status: "待省级审核", category: "其他", appliedDue: "2026-11-10", reason: "pH在线监控及自动切断系统为进口设备，供货周期约45天，安装调试需在设备到货后实施，申请延期1个月。",
            planFile: { name: "pH调理系统改造方案.pdf", size: "2.6MB" },
            applyDate: "2026-10-08", reviewDate: "", reviewNote: "", reviewer: ""
        },
        extendedDue: "", deferDays: 0
    },
    {
        id: 15, code: "WT2026-010", title: "荆门化工循环产业园雨污管网破损废水外渗问题", type: "突出问题", city: "荆门市", district: "荆门化工循环产业园",
        desc: "园区雨污管网多处破损，污水外渗至周边坑塘，需实施雨污分流改造并修复破损管网。",
        assignDate: "2026-06-30", startDate: "2026-06-30", dueDate: "2026-09-30", status: "过期未办",
        outlets: [12], lng: 112.265883, lat: 31.022843,
        files: [{ name: "管网CCTV检测报告.pdf", size: "7.3MB" }],
        reports: [
            { date: "2026-09-05", person: "荆门市生态环境局",
              source: "经CCTV检测，查明园区雨污管网存在9处破损点，污水外渗至周边3处坑塘。问题成因为管网老化及周边施工扰动。",
              measures: "已完成破损点CCTV检测定位；改造工程正在履行招标程序；对周边坑塘积水实施应急处置并跟踪监测水质。",
              plan: "招标完成后立即开工，11月底前完成破损管网修复及雨污分流改造；同步开展坑塘水质跟踪监测。",
              note: "已完成破损点CCTV检测定位，改造工程正在履行招标程序。",
              done: false, beforePhotos: [1], afterPhotos: [0],
              files: [{ name: "管网CCTV检测报告.pdf", size: "7.1MB" }] }
        ],
        defer: {
            status: "已驳回", category: "管网改造", appliedDue: "2026-11-30", reason: "园区雨污分流改造工程招标延迟，原整改期限内无法完工，申请延期2个月。",
            planFile: { name: "雨污分流改造工程可行性方案.pdf", size: "4.8MB" },
            applyDate: "2026-09-22", reviewDate: "2026-09-25", reviewNote: "可行性方案内容不完整，未附工程进度证明及招标时间安排，请补正材料后重新申请。", reviewer: "省生态环境厅水处"
        },
        extendedDue: "", deferDays: 0
    },
    {
        id: 16, code: "WT2026-024", title: "汉阳区南太子湖截污管道溢流污染问题", type: "一般问题", city: "武汉市", district: "汉阳区",
        desc: "汉阳区南太子湖周边截污管道在雨天存在溢流现象，混流污水经雨水排口进入湖泊，需实施截污管道扩容及溢流口改造。",
        assignDate: "2026-09-20", startDate: "2026-09-20", dueDate: "2026-10-20", status: "待办",
        outlets: [1], lng: 114.218600, lat: 30.512800,
        files: [{ name: "溢流口现场影像.pdf", size: "2.4MB" }],
        reports: [
            { date: "2026-10-08", person: "武汉市生态环境局汉阳区分局", note: "已完成溢流口普查3处，编制截污管道扩容改造方案，正在进行工程预算评审。", done: false, afterPhotos: [0] }
        ],
        defer: null, extendedDue: "", deferDays: 0
    },
    {
        id: 17, code: "WT2026-025", title: "洪山区巡司河沿线排口旱季污水直排问题", type: "突出问题", city: "武汉市", district: "洪山区",
        desc: "巡司河沿线3处排口旱季有污水排出，经排查为周边老旧小区雨污混接所致，需实施小区雨污分流改造并同步整治排口。",
        assignDate: "2026-09-15", startDate: "2026-09-15", dueDate: "2026-10-26", status: "待办",
        outlets: [], lng: 114.352100, lat: 30.499300,
        files: [{ name: "排口排查台账.xlsx", size: "486KB" }],
        reports: [],
        defer: null, extendedDue: "", deferDays: 0
    },
    {
        id: 18, code: "WT2026-026", title: "江夏区纸坊污水处理厂进水浓度偏低问题", type: "一般问题", city: "武汉市", district: "江夏区",
        desc: "纸坊污水处理厂进水COD、氨氮浓度长期偏低，管网清污分流不彻底，需排查封堵清水入网点并完善管网改造。",
        assignDate: "2026-08-28", startDate: "2026-08-28", dueDate: "2026-11-10", status: "待办",
        outlets: [], lng: 114.320500, lat: 30.376200,
        files: [{ name: "进水水质监测数据.xlsx", size: "312KB" }],
        reports: [
            { date: "2026-09-26", person: "武汉市生态环境局江夏区分局", note: "已完成主干管网QV检测12公里，排查清水入网点5处，封堵完成3处。", done: false, afterPhotos: [] }
        ],
        defer: {
            status: "待省级审核", category: "管网改造", appliedDue: "2026-12-10", reason: "清水入网点排查需结合管网CCTV检测同步实施，剩余2处封堵作业需破除路面并恢复交通，申请延期1个月。",
            planFile: { name: "纸坊污水处理厂管网改造可行性方案.pdf", size: "3.6MB" },
            applyDate: "2026-10-06", reviewDate: "", reviewNote: "", reviewer: ""
        },
        extendedDue: "", deferDays: 0
    },
    {
        id: 19, code: "WT2026-027", title: "东湖高新区污水干管破损渗漏问题", type: "突出问题", city: "武汉市", district: "东湖新技术开发区",
        desc: "光谷大道沿线污水干管存在破损渗漏，污水外渗影响周边水体，需实施管道整体修复及检查井整治。",
        assignDate: "2026-07-25", startDate: "2026-07-25", dueDate: "2026-10-25", status: "待办",
        outlets: [], lng: 114.420300, lat: 30.475600,
        files: [{ name: "管道CCTV检测报告.pdf", size: "6.2MB" }],
        reports: [
            { date: "2026-09-30", person: "武汉市生态环境局东湖高新区分局",
              source: "经CCTV检测与现场开挖核查，污水干管破损系管道老化沉降导致接口错位破裂，污水沿破损点外渗至周边雨水管网及低洼绿地，影响范围约300米路段。",
              measures: "已完成破损点定位9处并设置警示围挡；对渗漏严重段实施临时封堵导排；启动紫外光固化整体修复施工，累计完成5处。",
              plan: "11月底前完成剩余4处破损点整体修复及检查井整治；修复后开展闭水试验与CCTV复检，建立管网定期巡查养护机制。",
              note: "已完成破损点定位9处，紫外光固化整体修复施工中，累计完成5处。", done: false, afterPhotos: [1] }
        ],
        defer: {
            status: "已通过", category: "工程施工", appliedDue: "2026-12-05", reason: "干管修复需夜间分段作业并配合交通导改，地下管线交叉复杂，施工周期较长，申请延期至12月5日。",
            planFile: { name: "污水干管修复工程可行性方案.pdf", size: "4.4MB" },
            applyDate: "2026-09-25", reviewDate: "2026-09-28", reviewNote: "同意延期至2026年12月5日，请按周报送施工进度并做好交通导改安全措施。", reviewer: "省生态环境厅水处"
        },
        extendedDue: "2026-12-05", deferDays: 41
    },
    {
        id: 20, code: "WT2026-028", title: "东西湖区径河沿线企业雨水口串排问题", type: "一般问题", city: "武汉市", district: "东西湖区",
        desc: "径河沿线2家企业雨水排口存在生产废水串排迹象，需督促企业实施雨污分流改造并加装排口在线监控。",
        assignDate: "2026-08-18", startDate: "2026-08-18", dueDate: "2026-10-15", status: "待办",
        outlets: [], lng: 114.135700, lat: 30.628900,
        files: [{ name: "现场检查笔录.docx", size: "268KB" }],
        reports: [],
        defer: {
            status: "已驳回", category: "管网改造", appliedDue: "2026-11-15", reason: "企业雨污分流改造需停产配合，生产计划调整周期较长，申请延期1个月完成整改。",
            planFile: { name: "企业雨污分流改造方案.pdf", size: "2.8MB" },
            applyDate: "2026-09-28", reviewDate: "2026-09-30", reviewNote: "整改计划未明确分阶段完成时限与责任人，未附排口在线监控安装方案，请补正材料后重新申请。", reviewer: "省生态环境厅水处"
        },
        extendedDue: "", deferDays: 0
    },
    {
        id: 21, code: "WT2026-029", title: "襄州区唐白河沿岸养殖废水直排问题", type: "突出问题", city: "襄阳市", district: "襄州区",
        desc: "唐白河沿岸2处养殖场废水未经处理直排入河，需督促建设粪污处理设施并实施退养或搬迁。",
        assignDate: "2026-09-01", startDate: "2026-09-01", dueDate: "2026-10-22", status: "待办",
        outlets: [], lng: 112.221300, lat: 32.085100,
        files: [{ name: "养殖废水监测报告.pdf", size: "1.6MB" }],
        reports: [
            { date: "2026-10-07", person: "襄阳市生态环境局襄州区分局",
              source: "经现场勘查溯源，2处养殖场粪污收集设施不完善，废水未经处理沿沟渠直排唐白河，责任主体为2家养殖场经营户。",
              measures: "已对2家养殖场下达责令改正违法行为决定书并停止排污；对排放沟渠实施封堵，同步开展下游水体水质监测。",
              plan: "12月底前完成2家养殖场粪污处理设施建设并通过验收；对不符合防疫和环保要求的养殖户实施退养或搬迁。",
              note: "已责令2家养殖场停止排污，粪污处理设施建设方案已编制完成。", done: false, afterPhotos: [] }
        ],
        defer: null, extendedDue: "", deferDays: 0
    },
    {
        id: 22, code: "WT2026-030", title: "公安县杨家厂镇污水处理站运行不正常问题", type: "一般问题", city: "荆州市", district: "公安县",
        desc: "杨家厂镇污水处理站生化系统运行不正常，出水水质波动较大，需整改工艺运行并规范运维台账。",
        assignDate: "2026-09-05", startDate: "2026-09-05", dueDate: "2026-10-12", status: "待办",
        outlets: [10], lng: 112.294700, lat: 30.061900,
        files: [{ name: "运行数据核查表.xlsx", size: "204KB" }],
        reports: [],
        defer: null, extendedDue: "", deferDays: 0
    }
];

const SMS_RECORDS = [
    { id: 1, code: "DX20261009-001", receiver: "张建国", phone: "139****2871", city: "荆州市", category: "问题临期提醒", clueCode: "WT2026-017", sendTime: "2026-10-09 08:30:12", status: "成功" },
    { id: 2, code: "DX20261009-002", receiver: "李文涛", phone: "137****6512", city: "武汉市", category: "问题临期提醒", clueCode: "WT2026-018", sendTime: "2026-10-09 08:30:15", status: "成功" },
    { id: 3, code: "DX20261009-003", receiver: "王海燕", phone: "158****3904", city: "黄石市", category: "问题临期提醒", clueCode: "WT2026-021", sendTime: "2026-10-09 08:30:18", status: "成功" },
    { id: 4, code: "DX20261009-004", receiver: "陈志强", phone: "186****2210", city: "鄂州市", category: "问题临期提醒", clueCode: "WT2026-022", sendTime: "2026-10-09 08:30:21", status: "成功" },
    { id: 5, code: "DX20261009-005", receiver: "刘芳", phone: "135****7748", city: "潜江市", category: "问题临期提醒", clueCode: "WT2026-014", sendTime: "2026-10-09 08:30:24", status: "成功" },
    { id: 6, code: "DX20261008-001", receiver: "张建国", phone: "139****2871", city: "荆州市", category: "问题临期提醒", clueCode: "WT2026-017", sendTime: "2026-10-08 08:30:11", status: "成功" },
    { id: 7, code: "DX20261007-001", receiver: "赵鹏飞", phone: "150****9135", city: "随州市", category: "问题过期提醒", clueCode: "WT2026-016", sendTime: "2026-10-07 09:00:32", status: "成功" },
    { id: 8, code: "DX20261006-001", receiver: "孙晓梅", phone: "188****4502", city: "十堰市", category: "问题过期提醒", clueCode: "WT2026-013", sendTime: "2026-10-06 09:00:28", status: "失败" },
    { id: 9, code: "DX20261006-002", receiver: "孙晓梅", phone: "139****1188", city: "十堰市", category: "问题过期提醒", clueCode: "WT2026-013", sendTime: "2026-10-06 14:20:09", status: "成功" },
    { id: 10, code: "DX20261003-001", receiver: "周伟", phone: "136****8867", city: "孝感市", category: "延期成功提醒", clueCode: "WT2026-009", sendTime: "2026-10-03 15:12:40", status: "成功" },
    { id: 11, code: "DX20261003-002", receiver: "吴倩", phone: "182****3061", city: "黄冈市", category: "延期成功提醒", clueCode: "WT2026-005", sendTime: "2026-10-03 15:12:44", status: "成功" },
    { id: 12, code: "DX20260926-001", receiver: "马俊杰", phone: "159****5177", city: "襄阳市", category: "延期成功提醒", clueCode: "WT2026-015", sendTime: "2026-09-26 10:05:18", status: "成功" },
    { id: 13, code: "DX20260925-001", receiver: "郑立新", phone: "133****9246", city: "荆门市", category: "延期成功提醒", clueCode: "WT2026-010", sendTime: "2026-09-25 10:05:22", status: "成功" },
    { id: 14, code: "DX20260913-001", receiver: "许云峰", phone: "187****6308", city: "宜昌市", category: "延期成功提醒", clueCode: "WT2026-003", sendTime: "2026-09-13 09:41:55", status: "成功" },
    { id: 15, code: "DX20260912-001", receiver: "黄丽", phone: "139****8053", city: "武汉市", category: "问题临期提醒", clueCode: "WT2026-011", sendTime: "2026-09-12 08:30:16", status: "成功" },
    { id: 16, code: "DX20260901-001", receiver: "秦浩", phone: "158****2719", city: "咸宁市", category: "问题临期提醒", clueCode: "WT2026-001", sendTime: "2026-09-01 08:30:20", status: "成功" }
];

function smsContentOf(record) {
    const clue = CLUES.find(item => item.code === record.clueCode);
    const title = clue ? clue.title : "问题线索";
    if (record.category === "问题临期提醒") {
        return `【湖北省排污口综合监管系统】${record.city}生态环境局：贵市问题线索${record.clueCode}《${title}》整改期限即将届满（5日内到期），请及时登录系统查看并填报整改情况，逾期未办结将进行通报。`;
    }
    if (record.category === "问题过期提醒") {
        return `【湖北省排污口综合监管系统】${record.city}生态环境局：贵市问题线索${record.clueCode}《${title}》已超过整改期限仍未办结，请抓紧组织整改，并在系统内说明逾期原因。`;
    }
    if (record.category === "延期成功提醒") {
        const due = clue && clue.defer ? (clue.defer.appliedDue || clue.extendedDue) : "";
        if (due) {
            return `【湖北省排污口综合监管系统】${record.city}生态环境局：贵市问题线索${record.clueCode}《${title}》延期申请已审核通过，整改期限调整至${due}，请登录系统查看详情并按期完成整改。`;
        }
        return `【湖北省排污口综合监管系统】${record.city}生态环境局：贵市问题线索${record.clueCode}《${title}》延期申请已审核通过，请登录系统查看详情并按期完成整改。`;
    }
    return `【湖北省排污口综合监管系统】${record.city}生态环境局：贵市问题线索${record.clueCode}《${title}》有新的办理动态，请登录系统查看。`;
}

function outletById(id) { return OUTLETS.find(item => item.id === id); }

function clueById(id) { return CLUES.find(item => item.id === id); }

/* ===== 联系人设置（17个地市，每地市仅1名联系人） ===== */
/* 系统人员库：设置联系人时用于自动校验系统是否存在此人（姓名 + 手机号须与人员库登记一致） */
const STAFF_DIRECTORY = [
    { name: "李文涛", loginName: "liwentao", phone: "13871520031", gender: "男", dept: "武汉市生态环境局", city: "武汉市" },
    { name: "王海燕", loginName: "wanghaiyan", phone: "15927318804", gender: "女", dept: "黄石市生态环境局", city: "黄石市" },
    { name: "孙晓梅", loginName: "sunxiaomei", phone: "18772091288", gender: "女", dept: "十堰市生态环境局", city: "十堰市" },
    { name: "许云峰", loginName: "xuyunfeng", phone: "13697180333", gender: "男", dept: "宜昌市生态环境局", city: "宜昌市" },
    { name: "马俊杰", loginName: "majunjie", phone: "13907275177", gender: "男", dept: "襄阳市生态环境局", city: "襄阳市" },
    { name: "陈志强", loginName: "chenzhiqiang", phone: "13886650210", gender: "男", dept: "鄂州市生态环境局", city: "鄂州市" },
    { name: "郑立新", loginName: "zhenglixin", phone: "13307249146", gender: "男", dept: "荆门市生态环境局", city: "荆门市" },
    { name: "周伟", loginName: "zhouwei", phone: "13607298867", gender: "男", dept: "孝感市生态环境局", city: "孝感市" },
    { name: "张建国", loginName: "zhangjianguo", phone: "13907212871", gender: "男", dept: "荆州市生态环境局", city: "荆州市" },
    { name: "吴倩", loginName: "wuqian", phone: "18707253061", gender: "女", dept: "黄冈市生态环境局", city: "黄冈市" },
    { name: "黄丽", loginName: "huangli", phone: "18907248053", gender: "女", dept: "咸宁市生态环境局", city: "咸宁市" },
    { name: "赵鹏飞", loginName: "zhaopengfei", phone: "15972759135", gender: "男", dept: "随州市生态环境局", city: "随州市" },
    { name: "谭明辉", loginName: "tanminghui", phone: "13872740062", gender: "男", dept: "恩施州生态环境局", city: "恩施州" },
    { name: "秦浩", loginName: "qinhao", phone: "15827912719", gender: "男", dept: "仙桃市生态环境局", city: "仙桃市" },
    { name: "刘芳", loginName: "liufang", phone: "13507227748", gender: "女", dept: "潜江市生态环境局", city: "潜江市" },
    { name: "熊志刚", loginName: "xiongzhigang", phone: "13986950866", gender: "男", dept: "天门市生态环境局", city: "天门市" },
    { name: "田爱华", loginName: "tianaihua", phone: "13451232210", gender: "女", dept: "神农架林区生态环境局", city: "神农架林区" },
    { name: "王羽鹏", loginName: "wangyupeng", phone: "13707116688", gender: "男", dept: "省生态环境厅水生态环境处", city: "省级" },
    { name: "郭建军", loginName: "guojianjun", phone: "13871209805", gender: "男", dept: "省生态环境厅水生态环境处", city: "省级" },
    { name: "何晓东", loginName: "hexiaodong", phone: "15623019866", gender: "男", dept: "省环境执法监督局", city: "省级" },
    { name: "李姝", loginName: "lishu", phone: "13026185633", gender: "女", dept: "省生态环境厅监测处", city: "省级" },
    { name: "邓志远", loginName: "dengzhiyuan", phone: "17762513048", gender: "男", dept: "省生态环境厅信息中心", city: "省级" }
];

const CONTACTS = [
    { city: "武汉市", name: "李文涛", phone: "13871520031", updateTime: "2026-09-28 10:12" },
    { city: "黄石市", name: "王海燕", phone: "15927318804", updateTime: "2026-09-28 10:15" },
    { city: "十堰市", name: "", phone: "", updateTime: "" },
    { city: "宜昌市", name: "许云峰", phone: "13697180333", updateTime: "2026-09-29 09:40" },
    { city: "襄阳市", name: "马俊杰", phone: "13907275177", updateTime: "2026-09-29 09:44" },
    { city: "鄂州市", name: "", phone: "", updateTime: "" },
    { city: "荆门市", name: "郑立新", phone: "13307249146", updateTime: "2026-09-30 14:26" },
    { city: "孝感市", name: "周伟", phone: "13607298867", updateTime: "2026-09-30 14:31" },
    { city: "荆州市", name: "张建国", phone: "13907212871", updateTime: "2026-10-08 08:52" },
    { city: "黄冈市", name: "吴倩", phone: "18707253061", updateTime: "2026-10-08 08:55" },
    { city: "咸宁市", name: "黄丽", phone: "18907248053", updateTime: "2026-10-08 11:03" },
    { city: "随州市", name: "", phone: "", updateTime: "" },
    { city: "恩施州", name: "谭明辉", phone: "13872740062", updateTime: "2026-10-09 09:18" },
    { city: "仙桃市", name: "秦浩", phone: "15827912719", updateTime: "2026-10-09 09:21" },
    { city: "潜江市", name: "刘芳", phone: "13507227748", updateTime: "2026-10-09 09:25" },
    { city: "天门市", name: "", phone: "", updateTime: "" },
    { city: "神农架林区", name: "", phone: "", updateTime: "" }
];

function staffByName(name) { return STAFF_DIRECTORY.filter(item => item.name === String(name || "").trim()); }
function staffByPhone(phone) { return STAFF_DIRECTORY.filter(item => item.phone === String(phone || "").trim()); }
function contactByCity(city) { return CONTACTS.find(item => item.city === city); }
