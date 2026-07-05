/**
 * 湖北省地表水水质自动站实时形势分析日报 — 数据文件
 * 将本文件与 智能报告-自动站.html 放在同一目录即可。
 * 更新数据时只需修改本文件中的值，HTML 模板无需改动。
 */
window.__REPORT_DATA__ = (function() {
  var D = {};

  /* ========================= 元信息 ========================= */
  D.meta = {
    reportDate: "2026年06月10日",
    dateISO: "2026-06-10"
  };

  /* ========================= 一、总体情况 ========================= */
  D.summary = {
    totalValid: 203,
    noData: 0,
    dailyExceed: 79,
    monthlyExceed: 82,
    national: {
      total: 130,
      compliant: 79,
      nonCompliant: 51,
      class1to3: 103,
      ratio1to3: "79.23",
      declined: 35,
      improved: 41,
      mainPollutants: "总磷、溶解氧、高锰酸盐指数"
    },
    provincial: {
      total: 203,
      compliant: 124,
      nonCompliant: 79,
      class1to3: 167,
      ratio1to3: "82.27",
      declined: 54,
      improved: 62,
      mainPollutants: "溶解氧、总磷"
    }
  };

  /* 水质分布条 */
  D.qualityDist = {
    national: [
      { cls: "Ⅰ类", level: 1, count: 30 },
      { cls: "Ⅱ类", level: 2, count: 47 },
      { cls: "Ⅲ类", level: 3, count: 26 },
      { cls: "Ⅳ类", level: 4, count: 13 },
      { cls: "Ⅴ类", level: 5, count: 10 },
      { cls: "劣Ⅴ类", level: "bad-5", count: 4 }
    ],
    provincial: [
      { cls: "Ⅰ类", level: 1, count: 49 },
      { cls: "Ⅱ类", level: 2, count: 73 },
      { cls: "Ⅲ类", level: 3, count: 45 },
      { cls: "Ⅳ类", level: 4, count: 22 },
      { cls: "Ⅴ类", level: 5, count: 10 },
      { cls: "劣Ⅴ类", level: "bad-5", count: 4 }
    ]
  };

  /* 污染因子图 */
  D.pollutionFactors = {
    description: "省控自动站超标因子主要集中在溶解氧（29次）、总磷（26次）、高锰酸盐指数（22次）。",
    factors: [
      { name: "溶解氧", count: 29 },
      { name: "总磷", count: 26 },
      { name: "高锰酸盐指数", count: 22 },
      { name: "氨氮", count: 16 },
      { name: "化学需氧量", count: 14 }
    ]
  };

  /* ========================= 二、需重点关注自动站 ========================= */
  /* 2.1 Ⅴ类及劣Ⅴ类 */
  D.focusClass5 = {
    count: 14,
    stations: [
      { name: "五龙泉", city: "十堰市", cls: "Ⅴ类", level: 5, target: "Ⅲ类", targetLevel: 3, factors: "溶解氧、高锰酸盐指数" },
      { name: "坝上中", city: "十堰市", cls: "Ⅴ类", level: 5, target: "Ⅲ类", targetLevel: 3, factors: "总磷、氨氮" },
      { name: "夹河口", city: "十堰市", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, factors: "氨氮、总磷" },
      { name: "泗河口", city: "十堰市", cls: "劣Ⅴ类", level: "bad-5", target: "Ⅱ类", targetLevel: 2, factors: "化学需氧量、总磷" },
      { name: "黄龙滩水库", city: "十堰市", cls: "劣Ⅴ类", level: "bad-5", target: "Ⅲ类", targetLevel: 3, factors: "溶解氧" },
      { name: "两河口(草埠湖）", city: "宜昌市", cls: "劣Ⅴ类", level: "bad-5", target: "Ⅱ类", targetLevel: 2, factors: "溶解氧、总磷" },
      { name: "周家坝", city: "恩施州", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, factors: "溶解氧" },
      { name: "清水湖渡口", city: "恩施州", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, factors: "氨氮、高锰酸盐指数" },
      { name: "雪照河", city: "恩施州", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, factors: "高锰酸盐指数、氨氮" },
      { name: "牛山湖湖心", city: "武汉市", cls: "Ⅴ类", level: 5, target: "Ⅲ类", targetLevel: 3, factors: "氨氮" },
      { name: "排水闸", city: "荆州市", cls: "劣Ⅴ类", level: "bad-5", target: "Ⅲ类", targetLevel: 3, factors: "高锰酸盐指数、总磷" },
      { name: "荆州河口", city: "荆州市", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, factors: "溶解氧、总磷" },
      { name: "余家湖", city: "襄阳市", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, factors: "总磷" },
      { name: "白浒山", city: "鄂州市", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, factors: "氨氮、溶解氧" }
    ]
  };

  /* 2.2 近30日超标超过5天自动站（月历） */
  D.calendarExceed = [
    {
      name: "泗河口", city: "十堰市", exceedDays: 11,
      calendar: [
        { day: 1, cls: "", level: "" }, { day: 2, cls: "", level: "" }, { day: 3, cls: "", level: "" },
        { day: 4, cls: "Ⅳ类", level: 4 }, { day: 5, cls: "Ⅴ类", level: 5 }, { day: 6, cls: "Ⅴ类", level: 5 },
        { day: 7, cls: "劣Ⅴ类", level: "bad-5" }, { day: 8, cls: "Ⅳ类", level: 4 }, { day: 9, cls: "Ⅴ类", level: 5 },
        { day: 10, cls: "劣Ⅴ类", level: "bad-5" }, { day: 11, cls: "", level: "" }, { day: 12, cls: "", level: "" },
        { day: 13, cls: "", level: "" }, { day: 14, cls: "", level: "" }, { day: 15, cls: "", level: "" },
        { day: 16, cls: "", level: "" }, { day: 17, cls: "", level: "" }, { day: 18, cls: "Ⅳ类", level: 4 },
        { day: 19, cls: "Ⅴ类", level: 5 }, { day: 20, cls: "", level: "" }, { day: 21, cls: "", level: "" },
        { day: 22, cls: "", level: "" }, { day: 23, cls: "", level: "" }, { day: 24, cls: "", level: "" },
        { day: 25, cls: "", level: "" }, { day: 26, cls: "", level: "" }, { day: 27, cls: "", level: "" },
        { day: 28, cls: "", level: "" }, { day: 29, cls: "Ⅳ类", level: 4 }, { day: 30, cls: "劣Ⅴ类", level: "bad-5" }
      ]
    },
    {
      name: "黄龙滩水库", city: "十堰市", exceedDays: 9,
      calendar: [
        { day: 1, cls: "", level: "" }, { day: 2, cls: "", level: "" }, { day: 3, cls: "", level: "" },
        { day: 4, cls: "", level: "" }, { day: 5, cls: "", level: "" }, { day: 6, cls: "", level: "" },
        { day: 7, cls: "Ⅳ类", level: 4 }, { day: 8, cls: "Ⅴ类", level: 5 }, { day: 9, cls: "劣Ⅴ类", level: "bad-5" },
        { day: 10, cls: "Ⅴ类", level: 5 }, { day: 11, cls: "", level: "" }, { day: 12, cls: "", level: "" },
        { day: 13, cls: "", level: "" }, { day: 14, cls: "Ⅳ类", level: 4 }, { day: 15, cls: "Ⅴ类", level: 5 },
        { day: 16, cls: "", level: "" }, { day: 17, cls: "", level: "" }, { day: 18, cls: "", level: "" },
        { day: 19, cls: "", level: "" }, { day: 20, cls: "", level: "" }, { day: 21, cls: "", level: "" },
        { day: 22, cls: "Ⅳ类", level: 4 }, { day: 23, cls: "Ⅴ类", level: 5 }, { day: 24, cls: "劣Ⅴ类", level: "bad-5" },
        { day: 25, cls: "", level: "" }, { day: 26, cls: "", level: "" }, { day: 27, cls: "", level: "" },
        { day: 28, cls: "", level: "" }, { day: 29, cls: "", level: "" }, { day: 30, cls: "", level: "" }
      ]
    },
    {
      name: "两河口(草埠湖）", city: "宜昌市", exceedDays: 8,
      calendar: [
        { day: 1, cls: "", level: "" }, { day: 2, cls: "", level: "" }, { day: 3, cls: "", level: "" },
        { day: 4, cls: "", level: "" }, { day: 5, cls: "", level: "" }, { day: 6, cls: "", level: "" },
        { day: 7, cls: "Ⅳ类", level: 4 }, { day: 8, cls: "Ⅴ类", level: 5 }, { day: 9, cls: "Ⅴ类", level: 5 },
        { day: 10, cls: "劣Ⅴ类", level: "bad-5" }, { day: 11, cls: "", level: "" }, { day: 12, cls: "", level: "" },
        { day: 13, cls: "", level: "" }, { day: 14, cls: "", level: "" }, { day: 15, cls: "", level: "" },
        { day: 16, cls: "", level: "" }, { day: 17, cls: "Ⅳ类", level: 4 }, { day: 18, cls: "Ⅴ类", level: 5 },
        { day: 19, cls: "", level: "" }, { day: 20, cls: "", level: "" }, { day: 21, cls: "", level: "" },
        { day: 22, cls: "", level: "" }, { day: 23, cls: "", level: "" }, { day: 24, cls: "", level: "" },
        { day: 25, cls: "Ⅴ类", level: 5 }, { day: 26, cls: "Ⅳ类", level: 4 }, { day: 27, cls: "", level: "" },
        { day: 28, cls: "", level: "" }, { day: 29, cls: "", level: "" }, { day: 30, cls: "", level: "" }
      ]
    },
    {
      name: "排水闸", city: "荆州市", exceedDays: 7,
      calendar: [
        { day: 1, cls: "", level: "" }, { day: 2, cls: "", level: "" }, { day: 3, cls: "", level: "" },
        { day: 4, cls: "", level: "" }, { day: 5, cls: "", level: "" }, { day: 6, cls: "", level: "" },
        { day: 7, cls: "", level: "" }, { day: 8, cls: "Ⅳ类", level: 4 }, { day: 9, cls: "Ⅴ类", level: 5 },
        { day: 10, cls: "劣Ⅴ类", level: "bad-5" }, { day: 11, cls: "", level: "" }, { day: 12, cls: "", level: "" },
        { day: 13, cls: "", level: "" }, { day: 14, cls: "Ⅳ类", level: 4 }, { day: 15, cls: "Ⅴ类", level: 5 },
        { day: 16, cls: "", level: "" }, { day: 17, cls: "", level: "" }, { day: 18, cls: "", level: "" },
        { day: 19, cls: "", level: "" }, { day: 20, cls: "", level: "" }, { day: 21, cls: "Ⅳ类", level: 4 },
        { day: 22, cls: "劣Ⅴ类", level: "bad-5" }, { day: 23, cls: "", level: "" }, { day: 24, cls: "", level: "" },
        { day: 25, cls: "", level: "" }, { day: 26, cls: "", level: "" }, { day: 27, cls: "", level: "" },
        { day: 28, cls: "", level: "" }, { day: 29, cls: "", level: "" }, { day: 30, cls: "", level: "" }
      ]
    },
    {
      name: "五龙泉", city: "十堰市", exceedDays: 6,
      calendar: [
        { day: 1, cls: "", level: "" }, { day: 2, cls: "", level: "" }, { day: 3, cls: "", level: "" },
        { day: 4, cls: "", level: "" }, { day: 5, cls: "", level: "" }, { day: 6, cls: "", level: "" },
        { day: 7, cls: "", level: "" }, { day: 8, cls: "Ⅳ类", level: 4 }, { day: 9, cls: "Ⅴ类", level: 5 },
        { day: 10, cls: "Ⅴ类", level: 5 }, { day: 11, cls: "", level: "" }, { day: 12, cls: "", level: "" },
        { day: 13, cls: "", level: "" }, { day: 14, cls: "", level: "" }, { day: 15, cls: "", level: "" },
        { day: 16, cls: "Ⅳ类", level: 4 }, { day: 17, cls: "Ⅴ类", level: 5 }, { day: 18, cls: "", level: "" },
        { day: 19, cls: "", level: "" }, { day: 20, cls: "", level: "" }, { day: 21, cls: "", level: "" },
        { day: 22, cls: "", level: "" }, { day: 23, cls: "", level: "" }, { day: 24, cls: "Ⅴ类", level: 5 },
        { day: 25, cls: "", level: "" }, { day: 26, cls: "", level: "" }, { day: 27, cls: "", level: "" },
        { day: 28, cls: "", level: "" }, { day: 29, cls: "", level: "" }, { day: 30, cls: "", level: "" }
      ]
    }
  ];

  /* 2.3 连续不达标断面 */
  D.continuousNonCompliance = [
    {
      name: "泗河口", city: "十堰市", days: 5,
      detail: [
        { date: "2026-06-06", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, compliant: "否", pollutant: "化学需氧量(0.32)、总磷(0.18)" },
        { date: "2026-06-07", cls: "劣Ⅴ类", level: "bad-5", target: "Ⅱ类", targetLevel: 2, compliant: "否", pollutant: "化学需氧量(0.49)" },
        { date: "2026-06-08", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", pollutant: "总磷(0.16)" },
        { date: "2026-06-09-PPT", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, compliant: "否", pollutant: "溶解氧(0.21)、化学需氧量(0.28)" },
        { date: "2026-06-10", cls: "劣Ⅴ类", level: "bad-5", target: "Ⅱ类", targetLevel: 2, compliant: "否", pollutant: "化学需氧量(0.49)" }
      ]
    },
    {
      name: "黄龙滩水库", city: "十堰市", days: 4,
      detail: [
        { date: "2026-06-07", cls: "Ⅳ类", level: 4, target: "Ⅲ类", targetLevel: 3, compliant: "否", pollutant: "总磷(0.11)" },
        { date: "2026-06-08", cls: "Ⅴ类", level: 5, target: "Ⅲ类", targetLevel: 3, compliant: "否", pollutant: "溶解氧(0.26)" },
        { date: "2026-06-09-PPT", cls: "劣Ⅴ类", level: "bad-5", target: "Ⅲ类", targetLevel: 3, compliant: "否", pollutant: "溶解氧(0.47)" },
        { date: "2026-06-10", cls: "Ⅴ类", level: 5, target: "Ⅲ类", targetLevel: 3, compliant: "否", pollutant: "溶解氧(0.52)" }
      ]
    },
    {
      name: "两河口(草埠湖）", city: "宜昌市", days: 4,
      detail: [
        { date: "2026-06-07", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", pollutant: "总磷(0.12)" },
        { date: "2026-06-08", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, compliant: "否", pollutant: "溶解氧(0.22)" },
        { date: "2026-06-09-PPT", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, compliant: "否", pollutant: "溶解氧(0.27)、氨氮(0.19)" },
        { date: "2026-06-10", cls: "劣Ⅴ类", level: "bad-5", target: "Ⅱ类", targetLevel: 2, compliant: "否", pollutant: "溶解氧(0.34)" }
      ]
    },
    {
      name: "排水闸", city: "荆州市", days: 3,
      detail: [
        { date: "2026-06-08", cls: "Ⅳ类", level: 4, target: "Ⅲ类", targetLevel: 3, compliant: "否", pollutant: "总磷(0.10)" },
        { date: "2026-06-09-PPT", cls: "Ⅴ类", level: 5, target: "Ⅲ类", targetLevel: 3, compliant: "否", pollutant: "高锰酸盐指数(0.31)" },
        { date: "2026-06-10", cls: "劣Ⅴ类", level: "bad-5", target: "Ⅲ类", targetLevel: 3, compliant: "否", pollutant: "高锰酸盐指数(0.44)" }
      ]
    },
    {
      name: "五龙泉", city: "十堰市", days: 3,
      detail: [
        { date: "2026-06-08", cls: "Ⅳ类", level: 4, target: "Ⅲ类", targetLevel: 3, compliant: "否", pollutant: "高锰酸盐指数(0.12)" },
        { date: "2026-06-09-PPT", cls: "Ⅴ类", level: 5, target: "Ⅲ类", targetLevel: 3, compliant: "否", pollutant: "溶解氧(0.19)" },
        { date: "2026-06-10", cls: "Ⅴ类", level: 5, target: "Ⅲ类", targetLevel: 3, compliant: "否", pollutant: "溶解氧(0.26)" }
      ]
    }
  ];

  /* ========================= 三、各地市水质情况 ========================= */
  D.cities = [
    {
      name: "武汉市", nationalCount: 16, provincialCount: 20, goodCount: 18, nonCompliantCount: 6, class5Count: 1, class5Desc: "Ⅴ类",
      stations: [
        { name: "冯集", cls: "Ⅲ类", level: 3 }, { name: "杨泗港", cls: "Ⅲ类", level: 3 },
        { name: "港洲村", cls: "Ⅲ类", level: 3 }, { name: "牛山湖湖心", cls: "Ⅴ类", level: 5, highlight: true },
        { name: "金水闸", cls: "Ⅳ类", level: 4 }, { name: "黄陵大桥", cls: "Ⅲ类", level: 3 }
      ]
    },
    {
      name: "黄石市", nationalCount: 3, provincialCount: 7, goodCount: 7, nonCompliantCount: 3, class5Count: 0, class5Desc: "",
      stations: [
        { name: "富水镇", cls: "Ⅲ类", level: 3 }, { name: "隧洞村", cls: "Ⅲ类", level: 3 }, { name: "龙潭村", cls: "Ⅲ类", level: 3 }
      ]
    },
    {
      name: "十堰市", nationalCount: 16, provincialCount: 20, goodCount: 14, nonCompliantCount: 10, class5Count: 5, class5Desc: "Ⅴ类/劣Ⅴ类",
      stations: [
        { name: "五龙泉", cls: "Ⅴ类", level: 5, highlight: true }, { name: "剑河口", cls: "Ⅲ类", level: 3 },
        { name: "坝上中", cls: "Ⅴ类", level: 5, highlight: true }, { name: "夹河口", cls: "Ⅴ类", level: 5, highlight: true },
        { name: "泗河口", cls: "劣Ⅴ类", level: "bad-5", highlight: true }, { name: "潘口水库坝上", cls: "Ⅲ类", level: 3 },
        { name: "焦家院", cls: "Ⅲ类", level: 3 }, { name: "王河电站", cls: "Ⅳ类", level: 4 },
        { name: "陈家坡", cls: "Ⅲ类", level: 3 }, { name: "黄龙滩水库", cls: "劣Ⅴ类", level: "bad-5", highlight: true }
      ]
    },
    {
      name: "宜昌市", nationalCount: 10, provincialCount: 18, goodCount: 16, nonCompliantCount: 5, class5Count: 1, class5Desc: "劣Ⅴ类",
      stations: [
        { name: "两河口(草埠湖）", cls: "劣Ⅴ类", level: "bad-5", highlight: true }, { name: "清江大桥", cls: "Ⅲ类", level: 3 },
        { name: "铁路大桥（小桂林）", cls: "Ⅳ类", level: 4 }, { name: "木鱼镇", cls: "Ⅲ类", level: 3 },
        { name: "黄柏河大桥", cls: "Ⅲ类", level: 3 }
      ]
    },
    {
      name: "襄阳市", nationalCount: 11, provincialCount: 17, goodCount: 13, nonCompliantCount: 6, class5Count: 1, class5Desc: "Ⅴ类",
      stations: [
        { name: "余家湖", cls: "Ⅴ类", level: 5, highlight: true }, { name: "埠口", cls: "Ⅳ类", level: 4 },
        { name: "张湾", cls: "Ⅳ类", level: 4 }, { name: "马兰河口", cls: "Ⅲ类", level: 3 },
        { name: "仙人渡", cls: "Ⅲ类", level: 3 }, { name: "玛瑙观", cls: "Ⅳ类", level: 4 }
      ]
    },
    {
      name: "鄂州市", nationalCount: 3, provincialCount: 8, goodCount: 6, nonCompliantCount: 4, class5Count: 1, class5Desc: "Ⅴ类",
      stations: [
        { name: "燕矶", cls: "Ⅲ类", level: 3 }, { name: "白浒山", cls: "Ⅴ类", level: 5, highlight: true },
        { name: "三峡村", cls: "Ⅲ类", level: 3 }, { name: "薛家沟桥", cls: "Ⅳ类", level: 4 }
      ]
    },
    {
      name: "荆门市", nationalCount: 5, provincialCount: 9, goodCount: 9, nonCompliantCount: 1, class5Count: 0, class5Desc: "",
      stations: [
        { name: "彭墩桥", cls: "Ⅲ类", level: 3 }
      ]
    },
    {
      name: "孝感市", nationalCount: 12, provincialCount: 20, goodCount: 19, nonCompliantCount: 7, class5Count: 0, class5Desc: "",
      stations: [
        { name: "垌冢桥", cls: "Ⅲ类", level: 3 }, { name: "安陆桑树", cls: "Ⅲ类", level: 3 },
        { name: "平林", cls: "Ⅲ类", level: 3 }, { name: "南垸良种场", cls: "Ⅳ类", level: 4 },
        { name: "夏庙村", cls: "Ⅲ类", level: 3 }, { name: "汉川新堰", cls: "Ⅲ类", level: 3 },
        { name: "蔡河村", cls: "Ⅲ类", level: 3 }
      ]
    },
    {
      name: "荆州市", nationalCount: 22, provincialCount: 29, goodCount: 22, nonCompliantCount: 13, class5Count: 2, class5Desc: "Ⅴ类/劣Ⅴ类",
      stations: [
        { name: "官垱", cls: "Ⅳ类", level: 4 }, { name: "康家岗", cls: "Ⅳ类", level: 4 },
        { name: "排水闸", cls: "劣Ⅴ类", level: "bad-5", highlight: true }, { name: "新刘家台", cls: "Ⅳ类", level: 4 },
        { name: "新河村", cls: "Ⅲ类", level: 3 }, { name: "杨家垱", cls: "Ⅳ类", level: 4 },
        { name: "汉洪大桥", cls: "Ⅲ类", level: 3 }, { name: "淤泥湖", cls: "Ⅲ类", level: 3 },
        { name: "砖瓦厂", cls: "Ⅲ类", level: 3 }, { name: "荆州河口", cls: "Ⅴ类", level: 5, highlight: true },
        { name: "东关桥", cls: "Ⅳ类", level: 4 }, { name: "五岭子", cls: "Ⅲ类", level: 3 },
        { name: "滨湖", cls: "Ⅲ类", level: 3 }
      ]
    },
    {
      name: "黄冈市", nationalCount: 7, provincialCount: 11, goodCount: 10, nonCompliantCount: 4, class5Count: 0, class5Desc: "",
      stations: [
        { name: "兰溪大桥", cls: "Ⅳ类", level: 4 }, { name: "姚港", cls: "Ⅲ类", level: 3 },
        { name: "周八家", cls: "Ⅲ类", level: 3 }, { name: "蕲春县八里湖", cls: "Ⅲ类", level: 3 }
      ]
    },
    {
      name: "咸宁市", nationalCount: 5, provincialCount: 7, goodCount: 5, nonCompliantCount: 3, class5Count: 0, class5Desc: "",
      stations: [
        { name: "窑嘴大桥", cls: "Ⅳ类", level: 4 }, { name: "陆溪口", cls: "Ⅲ类", level: 3 },
        { name: "黄盖湖镇（右）", cls: "Ⅳ类", level: 4 }
      ]
    },
    {
      name: "随州市", nationalCount: 2, provincialCount: 3, goodCount: 2, nonCompliantCount: 2, class5Count: 0, class5Desc: "",
      stations: [
        { name: "厉山", cls: "Ⅲ类", level: 3 }, { name: "涢水大桥", cls: "Ⅳ类", level: 4 }
      ]
    },
    {
      name: "恩施州", nationalCount: 11, provincialCount: 19, goodCount: 13, nonCompliantCount: 9, class5Count: 3, class5Desc: "Ⅴ类",
      stations: [
        { name: "周家坝", cls: "Ⅴ类", level: 5, highlight: true }, { name: "清水湖渡口", cls: "Ⅴ类", level: 5, highlight: true },
        { name: "百福司镇", cls: "Ⅲ类", level: 3 }, { name: "雪照河", cls: "Ⅴ类", level: 5, highlight: true },
        { name: "黄腊石", cls: "Ⅳ类", level: 4 }, { name: "巫峡口", cls: "Ⅳ类", level: 4 },
        { name: "景阳河", cls: "Ⅲ类", level: 3 }, { name: "长沙河", cls: "Ⅲ类", level: 3 },
        { name: "龙坪", cls: "Ⅳ类", level: 4 }
      ]
    },
    {
      name: "省直管县市及林区",
      isSpecial: true,
      subCities: [
        { name: "仙桃市", provincialCount: 5, nonCompliantCount: 1, stations: [{ name: "姚嘴王岭村", cls: "Ⅲ类" }] },
        { name: "潜江市", provincialCount: 5, nonCompliantCount: 3, stations: [{ name: "潜江大桥", cls: "Ⅲ类" }, { name: "丫角桥", cls: "Ⅳ类" }, { name: "积玉口荷花村", cls: "Ⅲ类" }] },
        { name: "天门市", provincialCount: 3, nonCompliantCount: 0, stations: [] },
        { name: "神农架", provincialCount: 1, nonCompliantCount: 1, stations: [{ name: "阳日湾", cls: "Ⅲ类" }] },
        { name: "其他/未明确地市", provincialCount: 1, nonCompliantCount: 1, stations: [{ name: "湖北省水质监测船", cls: "Ⅳ类" }] }
      ]
    }
  ];

  /* ========================= 附表数据 ========================= */

  /* 附表1：超标自动站报表 */
  /* 字段: seq, river, attr, name, city, dailyClass, dailyChange, dailyFactors, monthlyClass, monthlyFactors, target */
  D.exceedReport = [
    { seq: 3, river: "丹江口水库", attr: "国控", name: "五龙泉", city: "十堰市", dailyClass: "Ⅴ类", dailyLevel: 5, dailyChange: "有所下降", dailyFactors: "溶解氧(0.26)", monthlyClass: "Ⅴ类", monthlyLevel: 5, monthlyFactors: "溶解氧(0.33)", target: "Ⅲ类", targetLevel: 3 },
    { seq: 4, river: "剑河", attr: "国控", name: "剑河口", city: "十堰市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所好转", dailyFactors: "化学需氧量(0.08)", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "氨氮(0.14)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 5, river: "丹江口水库", attr: "国控", name: "坝上中", city: "十堰市", dailyClass: "Ⅴ类", dailyLevel: 5, dailyChange: "有所下降", dailyFactors: "总磷(0.36)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "氨氮(0.21)", target: "Ⅲ类", targetLevel: 3 },
    { seq: 7, river: "金钱河", attr: "国控", name: "夹河口", city: "十堰市", dailyClass: "Ⅴ类", dailyLevel: 5, dailyChange: "-", dailyFactors: "氨氮(0.24)", monthlyClass: "Ⅴ类", monthlyLevel: 5, monthlyFactors: "溶解氧(0.25)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 9, river: "泗河", attr: "国控", name: "泗河口", city: "十堰市", dailyClass: "劣Ⅴ类", dailyLevel: "bad-5", dailyChange: "有所下降", dailyFactors: "化学需氧量(0.49)", monthlyClass: "Ⅴ类", monthlyLevel: 5, monthlyFactors: "溶解氧(0.23)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 11, river: "堵河", attr: "国控", name: "潘口水库坝上", city: "十堰市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 12, river: "堵河", attr: "国控", name: "焦家院", city: "十堰市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 14, river: "滔河", attr: "国控", name: "王河电站", city: "十堰市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "有所好转", dailyFactors: "化学需氧量(0.26)", monthlyClass: "Ⅴ类", monthlyLevel: 5, monthlyFactors: "氨氮(0.36)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 16, river: "汉江干流", attr: "国控", name: "陈家坡", city: "十堰市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所好转", dailyFactors: "高锰酸盐指数(0.08)", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "总磷(0.13)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 17, river: "黄龙滩水库", attr: "国控", name: "黄龙滩水库", city: "十堰市", dailyClass: "劣Ⅴ类", dailyLevel: "bad-5", dailyChange: "-", dailyFactors: "溶解氧(0.52)", monthlyClass: "劣Ⅴ类", monthlyLevel: "bad-5", monthlyFactors: "溶解氧(0.31)", target: "Ⅲ类", targetLevel: 3 },
    { seq: 21, river: "淦水", attr: "国控", name: "窑嘴大桥", city: "咸宁市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "有所下降", dailyFactors: "化学需氧量(0.18)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "化学需氧量(0.21)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 22, river: "陆水", attr: "国控", name: "陆溪口", city: "咸宁市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 26, river: "汉北河", attr: "国控", name: "垌冢桥", city: "孝感市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所下降", dailyFactors: "高锰酸盐指数(0.12)", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "溶解氧(0.16)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 30, river: "涢水（漳水西支）", attr: "国控", name: "安陆桑树", city: "孝感市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 32, river: "涢水", attr: "国控", name: "平林", city: "孝感市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "氨氮(0.15)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 38, river: "沮漳河", attr: "国控", name: "两河口(草埠湖）", city: "宜昌市", dailyClass: "劣Ⅴ类", dailyLevel: "bad-5", dailyChange: "-", dailyFactors: "溶解氧(0.34)", monthlyClass: "劣Ⅴ类", monthlyLevel: "bad-5", monthlyFactors: "化学需氧量(0.40)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 42, river: "清江", attr: "国控", name: "清江大桥", city: "宜昌市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 44, river: "沮河", attr: "国控", name: "铁路大桥（小桂林）", city: "宜昌市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "-", dailyFactors: "总磷(0.25)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "氨氮(0.26)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 49, river: "唐岩河", attr: "国控", name: "周家坝", city: "恩施州", dailyClass: "Ⅴ类", dailyLevel: 5, dailyChange: "有所下降", dailyFactors: "溶解氧(0.20)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "氨氮(0.16)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 53, river: "长滩", attr: "国控", name: "清水湖渡口", city: "恩施州", dailyClass: "Ⅴ类", dailyLevel: 5, dailyChange: "-", dailyFactors: "氨氮(0.24)", monthlyClass: "Ⅴ类", monthlyLevel: 5, monthlyFactors: "溶解氧(0.20)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 54, river: "酉水", attr: "国控", name: "百福司镇", city: "恩施州", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 57, river: "清江", attr: "国控", name: "雪照河", city: "恩施州", dailyClass: "Ⅴ类", dailyLevel: 5, dailyChange: "-", dailyFactors: "高锰酸盐指数(0.35)", monthlyClass: "Ⅴ类", monthlyLevel: 5, monthlyFactors: "溶解氧(0.26)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 58, river: "长江干流", attr: "国控", name: "黄腊石", city: "恩施州", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "-", dailyFactors: "总磷(0.29)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "溶解氧(0.17)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 59, river: "倒水", attr: "国控", name: "冯集", city: "武汉市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "溶解氧(0.27)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 63, river: "长江干流", attr: "国控", name: "杨泗港", city: "武汉市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所下降", dailyFactors: "高锰酸盐指数(0.08)", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 65, river: "通顺河", attr: "国控", name: "港洲村", city: "武汉市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 67, river: "梁子湖武汉水域", attr: "国控", name: "牛山湖湖心", city: "武汉市", dailyClass: "Ⅴ类", dailyLevel: 5, dailyChange: "-", dailyFactors: "氨氮(0.23)", monthlyClass: "Ⅴ类", monthlyLevel: 5, monthlyFactors: "溶解氧(0.20)", target: "Ⅲ类", targetLevel: 3 },
    { seq: 72, river: "金水", attr: "国控", name: "金水闸", city: "武汉市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "有所好转", dailyFactors: "化学需氧量(0.14)", monthlyClass: "Ⅴ类", monthlyLevel: 5, monthlyFactors: "总磷(0.20)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 73, river: "通顺河", attr: "国控", name: "黄陵大桥", city: "武汉市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 75, river: "东荆河", attr: "国控", name: "潜江大桥", city: "潜江市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所好转", dailyFactors: "化学需氧量(0.09-PPT)", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "氨氮(0.14)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 77, river: "南河", attr: "国控", name: "阳日湾", city: "神农架", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "氨氮(0.12)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 79, river: "藕池河西支", attr: "国控", name: "官垱", city: "荆州市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "有所好转", dailyFactors: "化学需氧量(0.13)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "总磷(0.25)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 80, river: "藕池河", attr: "国控", name: "康家岗", city: "荆州市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "有所下降", dailyFactors: "溶解氧(0.17)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "高锰酸盐指数(0.22)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 81, river: "洪湖", attr: "国控", name: "排水闸", city: "荆州市", dailyClass: "劣Ⅴ类", dailyLevel: "bad-5", dailyChange: "有所好转", dailyFactors: "高锰酸盐指数(0.44)", monthlyClass: "劣Ⅴ类", monthlyLevel: "bad-5", monthlyFactors: "氨氮(0.46)", target: "Ⅲ类", targetLevel: 3 },
    { seq: 82, river: "东荆河", attr: "国控", name: "新刘家台", city: "荆州市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "-", dailyFactors: "氨氮(0.16)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "高锰酸盐指数(0.16)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 83, river: "四湖总干渠", attr: "国控", name: "新河村", city: "荆州市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所好转", dailyFactors: "溶解氧(0.05)", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "溶解氧(0.15)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 85, river: "松滋河", attr: "国控", name: "杨家垱", city: "荆州市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "有所好转", dailyFactors: "氨氮(0.28)", monthlyClass: "Ⅴ类", monthlyLevel: 5, monthlyFactors: "总磷(0.23)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 88, river: "东荆河", attr: "国控", name: "汉洪大桥", city: "荆州市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "氨氮(0.22)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 89, river: "松滋东河", attr: "国控", name: "淤泥湖", city: "荆州市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所下降", dailyFactors: "高锰酸盐指数(0.12)", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 92, river: "长江干流", attr: "国控", name: "砖瓦厂", city: "荆州市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 93, river: "沮漳河", attr: "国控", name: "荆州河口", city: "荆州市", dailyClass: "Ⅴ类", dailyLevel: 5, dailyChange: "-", dailyFactors: "溶解氧(0.27)", monthlyClass: "Ⅴ类", monthlyLevel: 5, monthlyFactors: "溶解氧(0.20)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 105, river: "汉江干流", attr: "国控", name: "余家湖", city: "襄阳市", dailyClass: "Ⅴ类", dailyLevel: 5, dailyChange: "-", dailyFactors: "总磷(0.23)", monthlyClass: "Ⅴ类", monthlyLevel: 5, monthlyFactors: "氨氮(0.34)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 106, river: "唐河", attr: "国控", name: "埠口", city: "襄阳市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "-", dailyFactors: "化学需氧量(0.19)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "化学需氧量(0.13)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 107, river: "唐白河", attr: "国控", name: "张湾", city: "襄阳市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "有所下降", dailyFactors: "高锰酸盐指数(0.13)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "溶解氧(0.16)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 115, river: "马兰河", attr: "国控", name: "马兰河口", city: "襄阳市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所好转", dailyFactors: "总磷(0.05)", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 117, river: "长江干流", attr: "国控", name: "燕矶", city: "鄂州市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "总磷(0.12)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 118, river: "长江干流", attr: "国控", name: "白浒山", city: "鄂州市", dailyClass: "Ⅴ类", dailyLevel: 5, dailyChange: "有所下降", dailyFactors: "氨氮(0.36)", monthlyClass: "Ⅴ类", monthlyLevel: 5, monthlyFactors: "高锰酸盐指数(0.26)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 119, river: "厥水", attr: "国控", name: "厉山", city: "随州市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 120, river: "涢水", attr: "国控", name: "涢水大桥", city: "随州市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "有所下降", dailyFactors: "总磷(0.15)", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 121, river: "浠水", attr: "国控", name: "兰溪大桥", city: "黄冈市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "-", dailyFactors: "氨氮(0.27)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "氨氮(0.16)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 122, river: "长江干流", attr: "国控", name: "姚港", city: "黄冈市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 131, river: "东荆河", attr: "省控", name: "姚嘴王岭村", city: "仙桃市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 140, river: "长江干流", attr: "省控", name: "黄盖湖镇（右）", city: "咸宁市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "有所好转", dailyFactors: "化学需氧量(0.28)", monthlyClass: "Ⅴ类", monthlyLevel: 5, monthlyFactors: "溶解氧(0.22)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 143, river: "汉北河", attr: "省控", name: "南垸良种场", city: "孝感市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "-", dailyFactors: "溶解氧(0.12)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "溶解氧(0.14)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 144, river: "涢水", attr: "省控", name: "夏庙村", city: "孝感市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 145, river: "天门河", attr: "省控", name: "汉川新堰", city: "孝感市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "氨氮(0.05)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 147, river: "涢水", attr: "省控", name: "蔡河村", city: "孝感市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所好转", dailyFactors: "总磷(0.06)", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 152, river: "香溪河", attr: "省控", name: "木鱼镇", city: "宜昌市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 156, river: "黄柏河", attr: "省控", name: "黄柏河大桥", city: "宜昌市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "化学需氧量(0.16)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 158, river: "长江干流", attr: "省控", name: "巫峡口", city: "恩施州", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "有所好转", dailyFactors: "氨氮(0.12)", monthlyClass: "Ⅴ类", monthlyLevel: 5, monthlyFactors: "高锰酸盐指数(0.38)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 159, river: "清江", attr: "省控", name: "景阳河", city: "恩施州", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 163, river: "清江", attr: "省控", name: "长沙河", city: "恩施州", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "氨氮(0.05)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 164, river: "忠建河", attr: "省控", name: "龙坪", city: "恩施州", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "有所下降", dailyFactors: "化学需氧量(0.19)", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 169, river: "长江巡测", attr: "省控", name: "湖北省水质监测船", city: "湖北省", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "-", dailyFactors: "溶解氧(0.19)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "高锰酸盐指数(0.24)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 170, river: "四湖总干渠", attr: "省控", name: "丫角桥", city: "潜江市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "-", dailyFactors: "溶解氧(0.21)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "溶解氧(0.14)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 171, river: "上西荆河", attr: "省控", name: "积玉口荷花村", city: "潜江市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "总磷(0.10)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 173, river: "太湖港渠", attr: "省控", name: "东关桥", city: "荆州市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "-", dailyFactors: "溶解氧(0.16)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "高锰酸盐指数(0.14)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 174, river: "长江干流", attr: "省控", name: "五岭子", city: "荆州市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所好转", dailyFactors: "溶解氧(0.10)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "溶解氧(0.19)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 178, river: "洪湖", attr: "省控", name: "滨湖", city: "荆州市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "氨氮(0.11)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 182, river: "竹皮河", attr: "省控", name: "彭墩桥", city: "荆门市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "-", dailyFactors: "化学需氧量(0.12)", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 184, river: "汉江干流", attr: "省控", name: "仙人渡", city: "襄阳市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 186, river: "南河", attr: "省控", name: "玛瑙观", city: "襄阳市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "-", dailyFactors: "氨氮(0.16)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "溶解氧(0.26)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 190, river: "长江干流", attr: "省控", name: "三峡村", city: "鄂州市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 194, river: "薛家沟", attr: "省控", name: "薛家沟桥", city: "鄂州市", dailyClass: "Ⅳ类", dailyLevel: 4, dailyChange: "有所下降", dailyFactors: "化学需氧量(0.14)", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "化学需氧量(0.15)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 196, river: "倒水", attr: "省控", name: "周八家", city: "黄冈市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 198, river: "蕲水", attr: "省控", name: "蕲春县八里湖", city: "黄冈市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所好转", dailyFactors: "化学需氧量(0.13)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "氨氮(0.12)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 200, river: "富水", attr: "省控", name: "富水镇", city: "黄石市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所下降", dailyFactors: "溶解氧(0.05)", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "化学需氧量(0.14)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 202, river: "隧洞河", attr: "省控", name: "隧洞村", city: "黄石市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所好转", dailyFactors: "化学需氧量(0.12)", monthlyClass: "Ⅳ类", monthlyLevel: 4, monthlyFactors: "化学需氧量(0.26)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 203, river: "高桥河", attr: "省控", name: "龙潭村", city: "黄石市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所下降", dailyFactors: "高锰酸盐指数(0.15)", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 }
  ];

  /* 附表2：超标自动站数据表 */
  /* 字段: seq, name, city, cls, level, target, targetLevel, compliant, do, tn, cond, tp, temp, codmn, ph, turb, nh3n, factors */
  D.exceedData = [
    { seq: 1, name: "五龙泉", city: "十堰市", cls: "Ⅴ类", level: 5, target: "Ⅲ类", targetLevel: 3, compliant: "否", do: "1.2", tn: "3.32", cond: "385.4", tp: "0.374", temp: "26.7", codmn: "11", ph: "8.6", turb: "140.1", nh3n: "1.087", factors: "溶解氧、高锰酸盐指数" },
    { seq: 2, name: "剑河口", city: "十堰市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "6.1", tn: "1.13", cond: "320.4", tp: "0.098", temp: "26.9", codmn: "6", ph: "8", turb: "17", nh3n: "0.594", factors: "化学需氧量" },
    { seq: 3, name: "坝上中", city: "十堰市", cls: "Ⅴ类", level: 5, target: "Ⅲ类", targetLevel: 3, compliant: "否", do: "2.9", tn: "3.4", cond: "542.6", tp: "0.48", temp: "25.6", codmn: "6.9", ph: "7.2", turb: "135.9", nh3n: "2.2", factors: "总磷、氨氮" },
    { seq: 4, name: "夹河口", city: "十堰市", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "3.4", tn: "2.73", cond: "631.3", tp: "0.48", temp: "24.9", codmn: "8.8", ph: "8.2", turb: "136.3", nh3n: "2.2", factors: "氨氮、总磷" },
    { seq: 5, name: "泗河口", city: "十堰市", cls: "劣Ⅴ类", level: "bad-5", target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "2.5", tn: "6.26", cond: "817", tp: "0.8", temp: "26.6", codmn: "14", ph: "7.1", turb: "157.2", nh3n: "2.397", factors: "化学需氧量、总磷" },
    { seq: 6, name: "潘口水库坝上", city: "十堰市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.8", tn: "1.29", cond: "292.1", tp: "0.154", temp: "26.5", codmn: "6", ph: "7.2", turb: "21.5", nh3n: "0.118", factors: "高锰酸盐指数" },
    { seq: 7, name: "焦家院", city: "十堰市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.7", tn: "1.11", cond: "364.9", tp: "0.113", temp: "25", codmn: "6", ph: "8.2", turb: "18.5", nh3n: "0.229", factors: "高锰酸盐指数" },
    { seq: 8, name: "王河电站", city: "十堰市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "4.4", tn: "1.62", cond: "405.9", tp: "0.32", temp: "25.5", codmn: "8.5", ph: "7.8", turb: "40.9", nh3n: "0.878", factors: "化学需氧量、总磷" },
    { seq: 9, name: "陈家坡", city: "十堰市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.3", tn: "1.18", cond: "337.2", tp: "0.179", temp: "25", codmn: "6", ph: "7.6", turb: "9.3", nh3n: "0.319", factors: "高锰酸盐指数" },
    { seq: 10, name: "黄龙滩水库", city: "十堰市", cls: "劣Ⅴ类", level: "bad-5", target: "Ⅲ类", targetLevel: 3, compliant: "否", do: "0.3", tn: "5.14", cond: "587.9", tp: "0.623", temp: "25.2", codmn: "8.1", ph: "7.6", turb: "172.4", nh3n: "2.37", factors: "溶解氧" },
    { seq: 11, name: "窑嘴大桥", city: "咸宁市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.3", tn: "1.82", cond: "438.1", tp: "0.32", temp: "27.1", codmn: "8.5", ph: "7.1", turb: "63.7", nh3n: "0.588", factors: "化学需氧量、总磷" },
    { seq: 12, name: "陆溪口", city: "咸宁市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "4.4", tn: "1.07", cond: "230.8", tp: "0.132", temp: "23.7", codmn: "5.7", ph: "7.1", turb: "24.7", nh3n: "0.358", factors: "溶解氧" },
    { seq: 13, name: "垌冢桥", city: "孝感市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.9", tn: "1.68", cond: "278.2", tp: "0.163", temp: "26.5", codmn: "6", ph: "7.1", turb: "31.7", nh3n: "0.219", factors: "高锰酸盐指数" },
    { seq: 14, name: "安陆桑树", city: "孝感市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.3", tn: "1.55", cond: "374.4", tp: "0.2", temp: "25.7", codmn: "5.4", ph: "7.9", turb: "31.5", nh3n: "0.247", factors: "总磷" },
    { seq: 15, name: "平林", city: "孝感市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.9", tn: "1.75", cond: "328.9", tp: "0.061", temp: "24.8", codmn: "6", ph: "7.6", turb: "25.2", nh3n: "0.314", factors: "高锰酸盐指数" },
    { seq: 16, name: "两河口(草埠湖）", city: "宜昌市", cls: "劣Ⅴ类", level: "bad-5", target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "0.3", tn: "5.3", cond: "741.4", tp: "0.8", temp: "25.3", codmn: "12.9", ph: "7.6", turb: "93.4", nh3n: "1.697", factors: "溶解氧、总磷" },
    { seq: 17, name: "清江大桥", city: "宜昌市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.2", tn: "0.91", cond: "238.6", tp: "0.2", temp: "25.2", codmn: "5.6", ph: "7.4", turb: "14.3", nh3n: "0.224", factors: "总磷" },
    { seq: 18, name: "铁路大桥（小桂林）", city: "宜昌市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "2.4", tn: "2.71", cond: "351.6", tp: "0.32", temp: "27.1", codmn: "6.8", ph: "7", turb: "38", nh3n: "0.482", factors: "总磷、溶解氧" },
    { seq: 19, name: "周家坝", city: "恩施州", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "1.2", tn: "3.83", cond: "474.1", tp: "0.229", temp: "28.7", codmn: "8.2", ph: "8.8", turb: "141.1", nh3n: "1.694", factors: "溶解氧" },
    { seq: 20, name: "清水湖渡口", city: "恩施州", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "3.5", tn: "3.9", cond: "590.3", tp: "0.235", temp: "26.4", codmn: "11", ph: "7.6", turb: "62.6", nh3n: "2.2", factors: "氨氮、高锰酸盐指数" },
    { seq: 21, name: "百福司镇", city: "恩施州", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "6.1", tn: "1.01", cond: "341.1", tp: "0.2", temp: "25.1", codmn: "5.2", ph: "7.5", turb: "31.1", nh3n: "0.344", factors: "总磷" },
    { seq: 22, name: "雪照河", city: "恩施州", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "2.8", tn: "3.51", cond: "490.7", tp: "0.303", temp: "26.7", codmn: "11", ph: "7.1", turb: "139.7", nh3n: "2.2", factors: "高锰酸盐指数、氨氮" },
    { seq: 23, name: "黄腊石", city: "恩施州", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "3.8", tn: "2.73", cond: "327.5", tp: "0.32", temp: "27", codmn: "5.6", ph: "7.9", turb: "79.6", nh3n: "1.179", factors: "总磷" },
    { seq: 24, name: "冯集", city: "武汉市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.8", tn: "1.53", cond: "311.9", tp: "0.2", temp: "25", codmn: "5.8", ph: "7.6", turb: "15.9", nh3n: "0.108", factors: "总磷" },
    { seq: 25, name: "杨泗港", city: "武汉市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "6.4", tn: "1.18", cond: "359.1", tp: "0.059", temp: "25.8", codmn: "6", ph: "8.5", turb: "22.5", nh3n: "0.247", factors: "高锰酸盐指数" },
    { seq: 26, name: "港洲村", city: "武汉市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "6.2", tn: "1.5", cond: "281.2", tp: "0.2", temp: "25.5", codmn: "3.6", ph: "7.1", turb: "30.3", nh3n: "0.168", factors: "总磷" },
    { seq: 27, name: "牛山湖湖心", city: "武汉市", cls: "Ⅴ类", level: 5, target: "Ⅲ类", targetLevel: 3, compliant: "否", do: "3.9", tn: "2.64", cond: "602.7", tp: "0.262", temp: "27.3", codmn: "9.8", ph: "6.8", turb: "147.2", nh3n: "2.2", factors: "氨氮" },
    { seq: 28, name: "金水闸", city: "武汉市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "2.4", tn: "2.85", cond: "274", tp: "0.123", temp: "24.3", codmn: "8.5", ph: "8.2", turb: "33.3", nh3n: "0.839", factors: "化学需氧量、溶解氧" },
    { seq: 29, name: "黄陵大桥", city: "武汉市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.7", tn: "1.42", cond: "322.6", tp: "0.127", temp: "26.4", codmn: "6", ph: "7.4", turb: "29.2", nh3n: "0.555", factors: "高锰酸盐指数" },
    { seq: 30, name: "潜江大桥", city: "潜江市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "6.4", tn: "1.18", cond: "255", tp: "0.158", temp: "25.9", codmn: "6", ph: "7.5", turb: "25.7", nh3n: "0.39", factors: "化学需氧量" },
    { seq: 31, name: "阳日湾", city: "神农架", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "6.4", tn: "1.39", cond: "309.4", tp: "0.17", temp: "25.4", codmn: "4.2", ph: "7.9", turb: "31.9", nh3n: "0.8", factors: "氨氮" },
    { seq: 32, name: "官垱", city: "荆州市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "4.4", tn: "2.31", cond: "291.9", tp: "0.237", temp: "27.3", codmn: "8.5", ph: "7.3", turb: "59.2", nh3n: "1.033", factors: "化学需氧量、高锰酸盐指数" },
    { seq: 33, name: "康家岗", city: "荆州市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "2.4", tn: "2.2", cond: "374", tp: "0.32", temp: "27.6", codmn: "6.5", ph: "8.1", turb: "43.9", nh3n: "0.644", factors: "溶解氧、总磷" },
    { seq: 34, name: "排水闸", city: "荆州市", cls: "劣Ⅴ类", level: "bad-5", target: "Ⅲ类", targetLevel: 3, compliant: "否", do: "2.3", tn: "7", cond: "896.5", tp: "0.8", temp: "29.6", codmn: "14", ph: "7.8", turb: "153.6", nh3n: "3.314", factors: "高锰酸盐指数、总磷" },
    { seq: 35, name: "新刘家台", city: "荆州市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "4", tn: "2.82", cond: "383", tp: "0.32", temp: "25.6", codmn: "5.8", ph: "7.1", turb: "78.8", nh3n: "1.3", factors: "氨氮、总磷" },
    { seq: 36, name: "新河村", city: "荆州市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "4.4", tn: "1.31", cond: "359", tp: "0.131", temp: "24", codmn: "3.7", ph: "8.4", turb: "10.7", nh3n: "0.308", factors: "溶解氧" },
    { seq: 37, name: "杨家垱", city: "荆州市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "2.4", tn: "1.65", cond: "294.9", tp: "0.108", temp: "25.5", codmn: "6.7", ph: "7", turb: "75", nh3n: "1.3", factors: "氨氮、溶解氧" },
    { seq: 38, name: "汉洪大桥", city: "荆州市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "4.4", tn: "0.98", cond: "323.6", tp: "0.104", temp: "26", codmn: "4.4", ph: "8.5", turb: "25.5", nh3n: "0.485", factors: "溶解氧" },
    { seq: 39, name: "淤泥湖", city: "荆州市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "6.5", tn: "1.62", cond: "332.8", tp: "0.14", temp: "25.5", codmn: "6", ph: "7.8", turb: "10.1", nh3n: "0.28", factors: "高锰酸盐指数" },
    { seq: 40, name: "砖瓦厂", city: "荆州市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "4.4", tn: "1.08", cond: "252.1", tp: "0.113", temp: "25.1", codmn: "5.4", ph: "7.4", turb: "24.8", nh3n: "0.27", factors: "溶解氧" },
    { seq: 41, name: "荆州河口", city: "荆州市", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "1.2", tn: "3.23", cond: "408", tp: "0.48", temp: "25", codmn: "6.5", ph: "7.9", turb: "46.1", nh3n: "1.749", factors: "溶解氧、总磷" },
    { seq: 42, name: "余家湖", city: "襄阳市", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "3.1", tn: "3.75", cond: "567.1", tp: "0.48", temp: "26.7", codmn: "8.4", ph: "8.6", turb: "104", nh3n: "1.744", factors: "总磷" },
    { seq: 43, name: "埠口", city: "襄阳市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "2.4", tn: "2.76", cond: "385.1", tp: "0.13", temp: "26.8", codmn: "8.5", ph: "8.2", turb: "68", nh3n: "0.657", factors: "化学需氧量、溶解氧" },
    { seq: 44, name: "张湾", city: "襄阳市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "4.9", tn: "2.64", cond: "454", tp: "0.234", temp: "27.4", codmn: "8.5", ph: "7.8", turb: "48.3", nh3n: "0.957", factors: "高锰酸盐指数" },
    { seq: 45, name: "马兰河口", city: "襄阳市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.3", tn: "1.23", cond: "310.7", tp: "0.2", temp: "25", codmn: "5.4", ph: "7.7", turb: "17.4", nh3n: "0.317", factors: "总磷" },
    { seq: 46, name: "燕矶", city: "鄂州市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.7", tn: "1.36", cond: "319", tp: "0.2", temp: "24.1", codmn: "3.3", ph: "7.9", turb: "23", nh3n: "0.305", factors: "总磷" },
    { seq: 47, name: "白浒山", city: "鄂州市", cls: "Ⅴ类", level: 5, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "1.2", tn: "3.82", cond: "364.5", tp: "0.238", temp: "24.8", codmn: "7.3", ph: "8.4", turb: "108.3", nh3n: "2.2", factors: "氨氮、溶解氧" },
    { seq: 48, name: "厉山", city: "随州市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "6.8", tn: "1.67", cond: "239.7", tp: "0.2", temp: "25.1", codmn: "2.9", ph: "7.6", turb: "14.7", nh3n: "0.338", factors: "总磷" },
    { seq: 49, name: "涢水大桥", city: "随州市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "2.4", tn: "1.83", cond: "397.9", tp: "0.32", temp: "27.8", codmn: "5.1", ph: "7.2", turb: "54.5", nh3n: "0.415", factors: "总磷、溶解氧" },
    { seq: 50, name: "兰溪大桥", city: "黄冈市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "2.4", tn: "2.66", cond: "479.7", tp: "0.211", temp: "25.8", codmn: "5.5", ph: "6.8", turb: "63.2", nh3n: "1.3", factors: "氨氮、溶解氧" },
    { seq: 51, name: "姚港", city: "黄冈市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.3", tn: "1.77", cond: "377.4", tp: "0.157", temp: "27", codmn: "6", ph: "8.3", turb: "30.9", nh3n: "0.431", factors: "高锰酸盐指数" },
    { seq: 52, name: "姚嘴王岭村", city: "仙桃市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "6.1", tn: "1.13", cond: "302.5", tp: "0.2", temp: "26.6", codmn: "3.6", ph: "7.8", turb: "24.6", nh3n: "0.552", factors: "总磷" },
    { seq: 53, name: "黄盖湖镇（右）", city: "咸宁市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "3.6", tn: "2.11", cond: "445.9", tp: "0.179", temp: "24.6", codmn: "8.5", ph: "8.7", turb: "25.7", nh3n: "1.3", factors: "化学需氧量、氨氮" },
    { seq: 54, name: "南垸良种场", city: "孝感市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "2.4", tn: "2.48", cond: "406.9", tp: "0.221", temp: "24.3", codmn: "8.5", ph: "7.6", turb: "38.9", nh3n: "0.429", factors: "溶解氧、高锰酸盐指数" },
    { seq: 55, name: "夏庙村", city: "孝感市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "4.4", tn: "0.96", cond: "319.6", tp: "0.066", temp: "23.8", codmn: "2.7", ph: "8.3", turb: "19.9", nh3n: "0.266", factors: "溶解氧" },
    { seq: 56, name: "汉川新堰", city: "孝感市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "4.4", tn: "1.12", cond: "357.9", tp: "0.134", temp: "23.8", codmn: "4.8", ph: "8.6", turb: "30.1", nh3n: "0.243", factors: "溶解氧" },
    { seq: 57, name: "蔡河村", city: "孝感市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "6.2", tn: "1.33", cond: "371", tp: "0.2", temp: "25.7", codmn: "5.4", ph: "8.2", turb: "22.9", nh3n: "0.144", factors: "总磷" },
    { seq: 58, name: "木鱼镇", city: "宜昌市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "4.4", tn: "1.64", cond: "312.7", tp: "0.167", temp: "25.9", codmn: "4.7", ph: "7.8", turb: "20.8", nh3n: "0.562", factors: "溶解氧" },
    { seq: 59, name: "黄柏河大桥", city: "宜昌市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.9", tn: "1.02", cond: "368.8", tp: "0.104", temp: "24.3", codmn: "5.4", ph: "7.9", turb: "27.7", nh3n: "0.8", factors: "氨氮" },
    { seq: 60, name: "巫峡口", city: "恩施州", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "4.7", tn: "2.9", cond: "461.3", tp: "0.132", temp: "26.4", codmn: "7.2", ph: "8.3", turb: "31.5", nh3n: "1.3", factors: "氨氮" },
    { seq: 61, name: "景阳河", city: "恩施州", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "4.4", tn: "1.03", cond: "354.1", tp: "0.131", temp: "23.9", codmn: "4", ph: "7.3", turb: "10.4", nh3n: "0.429", factors: "溶解氧" },
    { seq: 62, name: "长沙河", city: "恩施州", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.1", tn: "1.3", cond: "313.5", tp: "0.143", temp: "25.7", codmn: "6", ph: "7.7", turb: "34.5", nh3n: "0.482", factors: "高锰酸盐指数" },
    { seq: 63, name: "龙坪", city: "恩施州", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "2.4", tn: "2.19", cond: "309.5", tp: "0.274", temp: "24.8", codmn: "8.5", ph: "7.5", turb: "65.7", nh3n: "1.015", factors: "化学需氧量、溶解氧" },
    { seq: 64, name: "湖北省水质监测船", city: "湖北省", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "2.4", tn: "1.87", cond: "375.6", tp: "0.141", temp: "25.5", codmn: "8.5", ph: "6.9", turb: "54.2", nh3n: "0.831", factors: "溶解氧、高锰酸盐指数" },
    { seq: 65, name: "丫角桥", city: "潜江市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "2.4", tn: "1.77", cond: "373.5", tp: "0.32", temp: "26.6", codmn: "4.1", ph: "8.6", turb: "41.5", nh3n: "1.123", factors: "溶解氧、总磷" },
    { seq: 66, name: "积玉口荷花村", city: "潜江市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5", tn: "0.92", cond: "344.3", tp: "0.107", temp: "24.6", codmn: "5.7", ph: "8.5", turb: "24.6", nh3n: "0.8", factors: "氨氮" },
    { seq: 67, name: "东关桥", city: "荆州市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "2.4", tn: "2.74", cond: "476.3", tp: "0.276", temp: "26", codmn: "6.8", ph: "7.2", turb: "40.3", nh3n: "0.686", factors: "溶解氧" },
    { seq: 68, name: "五岭子", city: "荆州市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "4.4", tn: "1.33", cond: "329.9", tp: "0.116", temp: "26.9", codmn: "3.3", ph: "7.1", turb: "18.8", nh3n: "0.469", factors: "溶解氧" },
    { seq: 69, name: "滨湖", city: "荆州市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.5", tn: "1.37", cond: "297.4", tp: "0.07", temp: "24.6", codmn: "6", ph: "8.3", turb: "19.7", nh3n: "0.114", factors: "高锰酸盐指数" },
    { seq: 70, name: "彭墩桥", city: "荆门市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.8", tn: "1.51", cond: "379.2", tp: "0.153", temp: "25.1", codmn: "6", ph: "7.2", turb: "16.9", nh3n: "0.15", factors: "化学需氧量" },
    { seq: 71, name: "仙人渡", city: "襄阳市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.5", tn: "1.36", cond: "289.6", tp: "0.078", temp: "26.5", codmn: "5", ph: "7", turb: "30.5", nh3n: "0.8", factors: "氨氮" },
    { seq: 72, name: "玛瑙观", city: "襄阳市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "2.4", tn: "2.2", cond: "394.6", tp: "0.121", temp: "25.4", codmn: "4.3", ph: "7.3", turb: "28.3", nh3n: "1.3", factors: "氨氮、溶解氧" },
    { seq: 73, name: "三峡村", city: "鄂州市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.7", tn: "1.27", cond: "278", tp: "0.125", temp: "26", codmn: "6", ph: "8.3", turb: "26.7", nh3n: "0.392", factors: "高锰酸盐指数" },
    { seq: 74, name: "薛家沟桥", city: "鄂州市", cls: "Ⅳ类", level: 4, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "4.7", tn: "2.16", cond: "330.3", tp: "0.32", temp: "25.8", codmn: "8.5", ph: "8.6", turb: "45.9", nh3n: "0.414", factors: "化学需氧量、总磷" },
    { seq: 75, name: "周八家", city: "黄冈市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "6.7", tn: "1.37", cond: "263.9", tp: "0.168", temp: "25.8", codmn: "6", ph: "7.9", turb: "19.2", nh3n: "0.303", factors: "高锰酸盐指数" },
    { seq: 76, name: "蕲春县八里湖", city: "黄冈市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "6.5", tn: "1.55", cond: "278.1", tp: "0.129", temp: "24.4", codmn: "6", ph: "8", turb: "28.8", nh3n: "0.269", factors: "化学需氧量" },
    { seq: 77, name: "富水镇", city: "黄石市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "4.4", tn: "1.75", cond: "355.1", tp: "0.147", temp: "25.5", codmn: "5.1", ph: "8.1", turb: "22", nh3n: "0.32", factors: "溶解氧" },
    { seq: 78, name: "隧洞村", city: "黄石市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "6.6", tn: "1.14", cond: "232.6", tp: "0.118", temp: "26.4", codmn: "6", ph: "7.8", turb: "23", nh3n: "0.598", factors: "化学需氧量" },
    { seq: 79, name: "龙潭村", city: "黄石市", cls: "Ⅲ类", level: 3, target: "Ⅱ类", targetLevel: 2, compliant: "否", do: "5.9", tn: "1.23", cond: "346.1", tp: "0.077", temp: "24.4", codmn: "6", ph: "8.4", turb: "9.1", nh3n: "0.503", factors: "高锰酸盐指数" }
  ];

  /* 附表3：未超标自动站报表 */
  /* 字段: seq, river, attr, name, city, dailyClass, dailyChange, dailyFactors, monthlyClass, monthlyFactors, target */
  D.compliantReport = [
    { seq: 1, river: "汉江干流", attr: "国控", name: "汉南村", city: "仙桃市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 2, river: "犟河", attr: "国控", name: "东湾桥", city: "十堰市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 6, river: "天河", attr: "国控", name: "天河口", city: "十堰市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 8, river: "官山河", attr: "国控", name: "孙家湾", city: "十堰市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 10, river: "浪河", attr: "国控", name: "浪河口", city: "十堰市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 13, river: "金钱河", attr: "国控", name: "玉皇滩", city: "十堰市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 15, river: "神定河", attr: "国控", name: "神定河口", city: "十堰市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 18, river: "斧头湖咸宁水域", attr: "国控", name: "咸宁湖心", city: "咸宁市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅲ类", targetLevel: 3 },
    { seq: 19, river: "富水水库", attr: "国控", name: "富水水库", city: "咸宁市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅲ类", targetLevel: 3 },
    { seq: 20, river: "陆水", attr: "国控", name: "洪下水文站", city: "咸宁市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 23, river: "汉江干流", attr: "国控", name: "岳口", city: "天门市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 24, river: "天门河", attr: "国控", name: "拖市", city: "天门市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 25, river: "汉江干流", attr: "国控", name: "罗汉闸", city: "天门市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 27, river: "滠水", attr: "国控", name: "大悟河口", city: "孝感市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 28, river: "澴水", attr: "国控", name: "孝感河口大桥", city: "孝感市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 29, river: "应山河", attr: "国控", name: "孝昌王店", city: "孝感市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 31, river: "汉江干流", attr: "国控", name: "小河", city: "孝感市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 33, river: "大富水", attr: "国控", name: "应城公路桥", city: "孝感市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 34, river: "汉北河", attr: "国控", name: "新沟闸", city: "孝感市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 35, river: "大富水", attr: "国控", name: "田店泵站", city: "孝感市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 36, river: "涢水", attr: "国控", name: "隔蒲桥", city: "孝感市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 37, river: "涢水", attr: "国控", name: "鲢鱼地泵站", city: "孝感市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 39, river: "长江干流", attr: "国控", name: "云池（白洋）", city: "宜昌市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 40, river: "长江干流", attr: "国控", name: "南津关", city: "宜昌市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 41, river: "清江", attr: "国控", name: "桅杆坪", city: "宜昌市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 43, river: "漳河", attr: "国控", name: "白石港", city: "宜昌市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 45, river: "香溪河", attr: "国控", name: "长沙坝", city: "宜昌市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 46, river: "隔河岩水库", attr: "国控", name: "隔河岩水库坝上", city: "宜昌市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "溶解氧(0.09-PPT)", target: "Ⅲ类", targetLevel: 3 },
    { seq: 47, river: "沮河", attr: "国控", name: "马渡河", city: "宜昌市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 48, river: "酉水", attr: "国控", name: "乐坪桥", city: "恩施州", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 50, river: "长江干流", attr: "国控", name: "培石", city: "恩施州", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 51, river: "清江", attr: "国控", name: "恩施大沙坝", city: "恩施州", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 52, river: "溇水", attr: "国控", name: "江口村", city: "恩施州", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 55, river: "磨刀溪", attr: "国控", name: "长滩", city: "恩施州", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 56, river: "郁江", attr: "国控", name: "长顺乡", city: "恩施州", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 60, river: "涢水", attr: "国控", name: "太平沙", city: "武汉市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 61, river: "汉江干流", attr: "国控", name: "宗关", city: "武汉市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 62, river: "涢水", attr: "国控", name: "朱家河口", city: "武汉市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 64, river: "斧头湖武汉水域", attr: "国控", name: "江夏湖心", city: "武汉市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅲ类", targetLevel: 3 },
    { seq: 66, river: "滠水", attr: "国控", name: "滠口", city: "武汉市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 68, river: "梁子湖武汉水域", attr: "国控", name: "西梁子湖南北嘴", city: "武汉市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅲ类", targetLevel: 3 },
    { seq: 69, river: "梁子湖武汉水域", attr: "国控", name: "西梁子湖湖北", city: "武汉市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅲ类", targetLevel: 3 },
    { seq: 70, river: "梁子湖武汉水域", attr: "国控", name: "西梁子湖湖南", city: "武汉市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅲ类", targetLevel: 3 },
    { seq: 71, river: "举水", attr: "国控", name: "郭玉", city: "武汉市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 74, river: "倒水", attr: "国控", name: "龙口", city: "武汉市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 76, river: "四湖总干渠", attr: "国控", name: "运粮湖同心队", city: "潜江市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 78, river: "洈水", attr: "国控", name: "乌溪沟", city: "荆州市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "总磷(0.05)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 84, river: "四湖总干渠", attr: "国控", name: "新滩", city: "荆州市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 86, river: "洪湖", attr: "国控", name: "杨柴湖", city: "荆州市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅲ类", targetLevel: 3 },
    { seq: 87, river: "长江干流", attr: "国控", name: "柳口", city: "荆州市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 90, river: "洪湖", attr: "国控", name: "湖心A", city: "荆州市", dailyClass: "Ⅲ类", dailyLevel: 3, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅲ类", targetLevel: 3 },
    { seq: 91, river: "洪湖", attr: "国控", name: "湖心B", city: "荆州市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅲ类", targetLevel: 3 },
    { seq: 94, river: "长江干流", attr: "国控", name: "荆江口", city: "荆州市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 95, river: "藕池河东支", attr: "国控", name: "藕池河东支入境", city: "荆州市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 96, river: "藕池河中支", attr: "国控", name: "藕池河中支入境", city: "荆州市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 97, river: "长江干流", attr: "国控", name: "观音寺", city: "荆州市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 98, river: "长江干流", attr: "国控", name: "调关", city: "荆州市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 99, river: "松滋东河", attr: "国控", name: "马坡湖", city: "荆州市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 100, river: "京山河", attr: "国控", name: "京山河邓李港", city: "荆门市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 101, river: "漳河水库", attr: "国控", name: "漳河水库库心", city: "荆门市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅲ类", targetLevel: 3 },
    { seq: 102, river: "汉江干流", attr: "国控", name: "皇庄", city: "荆门市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 103, river: "汉江干流", attr: "国控", name: "转斗", city: "荆门市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 104, river: "竹皮河", attr: "国控", name: "马良龚家湾", city: "荆门市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 108, river: "蛮河", attr: "国控", name: "朱市", city: "襄阳市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 109, river: "滚河", attr: "国控", name: "汤店", city: "襄阳市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 110, river: "汉江干流", attr: "国控", name: "沈湾", city: "襄阳市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "高锰酸盐指数(0.06)", target: "Ⅱ类", targetLevel: 2 },
    { seq: 111, river: "汉江干流", attr: "国控", name: "白家湾", city: "襄阳市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 112, river: "白河", attr: "国控", name: "翟湾", city: "襄阳市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 113, river: "北河", attr: "国控", name: "聂家滩", city: "襄阳市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 114, river: "南河", attr: "国控", name: "茶庵", city: "襄阳市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 116, river: "梁子湖鄂州水域", attr: "国控", name: "七星（梁子岛水源）", city: "鄂州市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅲ类", targetLevel: 3 },
    { seq: 123, river: "巴河", attr: "国控", name: "巴河镇河口", city: "黄冈市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 124, river: "白莲河水库", attr: "国控", name: "库坝上", city: "黄冈市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅲ类", targetLevel: 3 },
    { seq: 125, river: "举水", attr: "国控", name: "沐家泾", city: "黄冈市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 126, river: "蕲水", attr: "国控", name: "西河驿", city: "黄冈市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 127, river: "举水", attr: "国控", name: "麻城许家湾", city: "黄冈市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 128, river: "长江干流", attr: "国控", name: "中官铺", city: "黄石市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 129, river: "大冶湖", attr: "国控", name: "大冶湖闸", city: "黄石市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 130, river: "富水", attr: "国控", name: "富池闸", city: "黄石市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 132, river: "汉江干流", attr: "省控", name: "石剅（右）", city: "仙桃市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 133, river: "通顺河", attr: "省控", name: "郑场游潭村", city: "仙桃市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 134, river: "汉江干流", attr: "省控", name: "黄家村（右）", city: "仙桃市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 135, river: "堵河", attr: "省控", name: "化口", city: "十堰市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 136, river: "天河", attr: "省控", name: "水石门", city: "十堰市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 137, river: "汉江干流", attr: "省控", name: "羊尾", city: "十堰市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 138, river: "鄂坪水库", attr: "省控", name: "鄂坪水库库心", city: "十堰市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅲ类", targetLevel: 3 },
    { seq: 139, river: "陆水", attr: "省控", name: "石矶头大桥上", city: "咸宁市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 141, river: "澴水", attr: "省控", name: "万安闸", city: "孝感市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 142, river: "澴水", attr: "省控", name: "余家坡", city: "孝感市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 146, river: "汉江干流", attr: "省控", name: "石剅（左）", city: "孝感市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 148, river: "涢水", attr: "省控", name: "雷福闸", city: "孝感市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 149, river: "黄柏河", attr: "省控", name: "东支(天府庙)", city: "宜昌市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 150, river: "九畹溪", attr: "省控", name: "九畹溪河口", city: "宜昌市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 151, river: "柏临河", attr: "省控", name: "土门大桥", city: "宜昌市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 153, river: "清江", attr: "省控", name: "朱津滩(天龙湾)", city: "宜昌市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 154, river: "天池河", attr: "省控", name: "纸坊头", city: "宜昌市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 155, river: "渔洋河", attr: "省控", name: "马勒坡", city: "宜昌市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 157, river: "马水河", attr: "省控", name: "南里渡桥", city: "恩施州", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 160, river: "忠建河", attr: "省控", name: "洞坪", city: "恩施州", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 161, river: "神农溪", attr: "省控", name: "神农洞", city: "恩施州", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 162, river: "冷水河", attr: "省控", name: "落坡坝", city: "恩施州", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 165, river: "滠水", attr: "省控", name: "北门港", city: "武汉市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 166, river: "黄丝河", attr: "省控", name: "挖沟泵站", city: "武汉市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 167, river: "金水", attr: "省控", name: "新河口", city: "武汉市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 168, river: "长江干流", attr: "省控", name: "纱帽（右）", city: "武汉市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 172, river: "引江济汉渠", attr: "省控", name: "高石碑", city: "潜江市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 175, river: "洪湖", attr: "省控", name: "夜谋沟", city: "荆州市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 176, river: "西干渠", attr: "省控", name: "姚集", city: "荆州市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 177, river: "洈水", attr: "省控", name: "桂花树", city: "荆州市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 179, river: "四湖总干渠", attr: "省控", name: "瞿家湾", city: "荆州市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 180, river: "新埠河", attr: "省控", name: "山河电站", city: "荆门市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 181, river: "漳河", attr: "省控", name: "康家沟", city: "荆门市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 183, river: "汉江干流", attr: "省控", name: "石牌港", city: "荆门市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 185, river: "小清河", attr: "省控", name: "王湾村", city: "襄阳市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 187, river: "滚河", attr: "省控", name: "琚湾", city: "襄阳市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 188, river: "西排子河水库", attr: "省控", name: "西排子河水库库心", city: "襄阳市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅲ类", targetLevel: 3 },
    { seq: 189, river: "沮河", attr: "省控", name: "重阳", city: "襄阳市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 191, river: "长港", attr: "省控", name: "梁子湖长港出口", city: "鄂州市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 192, river: "长港", attr: "省控", name: "樊口", city: "鄂州市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 193, river: "高桥河", attr: "省控", name: "港口桥", city: "鄂州市", dailyClass: "Ⅰ类", dailyLevel: 1, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅰ类", monthlyLevel: 1, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 195, river: "涢水", attr: "省控", name: "随应桥", city: "随州市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所好转", dailyFactors: "-", monthlyClass: "Ⅲ类", monthlyLevel: 3, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 197, river: "长江干流", attr: "省控", name: "汪洲村", city: "黄冈市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 199, river: "举水", attr: "省控", name: "陶冲村", city: "黄冈市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "-", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅱ类", targetLevel: 2 },
    { seq: 201, river: "大冶湖", attr: "省控", name: "磊山湖心", city: "黄石市", dailyClass: "Ⅱ类", dailyLevel: 2, dailyChange: "有所下降", dailyFactors: "-", monthlyClass: "Ⅱ类", monthlyLevel: 2, monthlyFactors: "-", target: "Ⅲ类", targetLevel: 3 }
  ];

  /* 附表4：未超标自动站数据表 */
  /* 字段: seq, name, city, date, cls, level, target, targetLevel, compliant, do, tn, cond, tp, temp, codmn, ph, turb, nh3n, factors */
  D.compliantData = [
    { seq: 1, name: "汉南村", city: "仙桃市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.6", tn: "0.48", cond: "251.8", tp: "0.016", temp: "24.8", codmn: "1.8", ph: "7.7", turb: "8", nh3n: "0.016", factors: "不超标" },
    { seq: 2, name: "东湾桥", city: "十堰市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.7", tn: "1", cond: "257.6", tp: "0.045", temp: "24.8", codmn: "3.5", ph: "7.7", turb: "18.5", nh3n: "0.075", factors: "不超标" },
    { seq: 3, name: "天河口", city: "十堰市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.2", tn: "1.18", cond: "280.2", tp: "0.08", temp: "25.9", codmn: "2.6", ph: "8", turb: "9.1", nh3n: "0.128", factors: "不超标" },
    { seq: 4, name: "孙家湾", city: "十堰市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.1", tn: "0.58", cond: "198.6", tp: "0.087", temp: "24", codmn: "2.2", ph: "7", turb: "16.6", nh3n: "0.092", factors: "不超标" },
    { seq: 5, name: "浪河口", city: "十堰市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8.6", tn: "0.28", cond: "229.3", tp: "0.011", temp: "22.6", codmn: "2.1", ph: "8.1", turb: "3.7", nh3n: "0.058", factors: "不超标" },
    { seq: 6, name: "玉皇滩", city: "十堰市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6", tn: "1.13", cond: "181.8", tp: "0.064", temp: "23.9", codmn: "3.1", ph: "7.6", turb: "4.9", nh3n: "0.067", factors: "不超标" },
    { seq: 7, name: "神定河口", city: "十堰市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.3", tn: "0.61", cond: "307.1", tp: "0.054", temp: "25.3", codmn: "3.3", ph: "7.9", turb: "8.6", nh3n: "0.182", factors: "不超标" },
    { seq: 8, name: "咸宁湖心", city: "咸宁市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅲ类", targetLevel: 3, compliant: "是", do: "8.2", tn: "0.25", cond: "203.8", tp: "0.025", temp: "23.5", codmn: "1.9", ph: "7.8", turb: "1.1", nh3n: "0.054", factors: "不超标" },
    { seq: 9, name: "富水水库", city: "咸宁市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅲ类", targetLevel: 3, compliant: "是", do: "8.1", tn: "0.23", cond: "158.6", tp: "0.039", temp: "23.5", codmn: "1.5", ph: "7.9", turb: "1.8", nh3n: "0.075", factors: "不超标" },
    { seq: 10, name: "洪下水文站", city: "咸宁市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.5", tn: "0.68", cond: "275.6", tp: "0.085", temp: "24.6", codmn: "2", ph: "7.5", turb: "7.1", nh3n: "0.074", factors: "不超标" },
    { seq: 11, name: "岳口", city: "天门市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8.3", tn: "0.5", cond: "220.3", tp: "0.036", temp: "23.9", codmn: "2.7", ph: "7.9", turb: "4.4", nh3n: "0.041", factors: "不超标" },
    { seq: 12, name: "拖市", city: "天门市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.1", tn: "0.96", cond: "262.8", tp: "0.068", temp: "25.3", codmn: "3.7", ph: "7.8", turb: "14.1", nh3n: "0.115", factors: "不超标" },
    { seq: 13, name: "罗汉闸", city: "天门市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.9", tn: "0.21", cond: "205.4", tp: "0.026", temp: "23.8", codmn: "1.9", ph: "7.2", turb: "4.1", nh3n: "0.077", factors: "不超标" },
    { seq: 14, name: "大悟河口", city: "孝感市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.1", tn: "0.9", cond: "276.7", tp: "0.07", temp: "24.3", codmn: "1.9", ph: "8.3", turb: "18.6", nh3n: "0.214", factors: "不超标" },
    { seq: 15, name: "孝感河口大桥", city: "孝感市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.8", tn: "0.44", cond: "162.9", tp: "0.037", temp: "25", codmn: "2.3", ph: "7.4", turb: "8.6", nh3n: "0.04", factors: "不超标" },
    { seq: 16, name: "孝昌王店", city: "孝感市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6", tn: "0.86", cond: "194.2", tp: "0.03", temp: "26", codmn: "1.9", ph: "7.6", turb: "8", nh3n: "0.223", factors: "不超标" },
    { seq: 17, name: "小河", city: "孝感市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.4", tn: "1.19", cond: "292.2", tp: "0.048", temp: "25.5", codmn: "3.4", ph: "8", turb: "15.7", nh3n: "0.046", factors: "不超标" },
    { seq: 18, name: "应城公路桥", city: "孝感市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8.8", tn: "0.49", cond: "232.8", tp: "0.03", temp: "22.7", codmn: "1.6", ph: "7.2", turb: "8.1", nh3n: "0.038", factors: "不超标" },
    { seq: 19, name: "新沟闸", city: "孝感市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.4", tn: "0.53", cond: "171", tp: "0.029", temp: "23.3", codmn: "1.7", ph: "7", turb: "11.2", nh3n: "0.05", factors: "不超标" },
    { seq: 20, name: "田店泵站", city: "孝感市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.6", tn: "1.09-PPT", cond: "288.9", tp: "0.032", temp: "24.3", codmn: "3.5", ph: "8.2", turb: "10.5", nh3n: "0.038", factors: "不超标" },
    { seq: 21, name: "隔蒲桥", city: "孝感市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.6", tn: "0.8", cond: "229", tp: "0.052", temp: "24.2", codmn: "3.6", ph: "7.3", turb: "10.8", nh3n: "0.133", factors: "不超标" },
    { seq: 22, name: "鲢鱼地泵站", city: "孝感市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.7", tn: "0.4", cond: "174", tp: "0.025", temp: "23.7", codmn: "1.8", ph: "8.1", turb: "3.7", nh3n: "0.05", factors: "不超标" },
    { seq: 23, name: "云池（白洋）", city: "宜昌市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.4", tn: "0.9", cond: "303.6", tp: "0.041", temp: "24.7", codmn: "3", ph: "8.4", turb: "15.7", nh3n: "0.043", factors: "不超标" },
    { seq: 24, name: "南津关", city: "宜昌市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.6", tn: "0.36", cond: "248.4", tp: "0.034", temp: "23.5", codmn: "1.2", ph: "8.2", turb: "4.9", nh3n: "0.055", factors: "不超标" },
    { seq: 25, name: "桅杆坪", city: "宜昌市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.3", tn: "0.93", cond: "246.1", tp: "0.076", temp: "25.2", codmn: "2", ph: "8.3", turb: "14.4", nh3n: "0.079", factors: "不超标" },
    { seq: 26, name: "白石港", city: "宜昌市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.8", tn: "0.31", cond: "168.4", tp: "0.016", temp: "22.5", codmn: "1.2", ph: "7.2", turb: "6.3", nh3n: "0.012", factors: "不超标" },
    { seq: 27, name: "长沙坝", city: "宜昌市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.7", tn: "0.33", cond: "213.5", tp: "0.025", temp: "24.1", codmn: "1.2", ph: "7.9", turb: "3.8", nh3n: "0.056", factors: "不超标" },
    { seq: 28, name: "隔河岩水库坝上", city: "宜昌市", date: "2026-06-10", cls: "Ⅲ类", level: 3, target: "Ⅲ类", targetLevel: 3, compliant: "是", do: "6.4", tn: "1.32", cond: "344.5", tp: "0.08", temp: "24.9", codmn: "5.7", ph: "8", turb: "33.3", nh3n: "0.465", factors: "不超标" },
    { seq: 29, name: "马渡河", city: "宜昌市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.9", tn: "1.18", cond: "313.4", tp: "0.086", temp: "24.8", codmn: "2.6", ph: "7.1", turb: "8.2", nh3n: "0.192", factors: "不超标" },
    { seq: 30, name: "乐坪桥", city: "恩施州", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.5", tn: "0.5", cond: "300.3", tp: "0.048", temp: "23.6", codmn: "2", ph: "8.4", turb: "10.3", nh3n: "0.091", factors: "不超标" },
    { seq: 31, name: "培石", city: "恩施州", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.1", tn: "0.67", cond: "277.7", tp: "0.048", temp: "23.2", codmn: "1.6", ph: "8.2", turb: "7.4", nh3n: "0.195", factors: "不超标" },
    { seq: 32, name: "恩施大沙坝", city: "恩施州", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.7", tn: "0.89", cond: "228.9", tp: "0.034", temp: "24.9", codmn: "2.3", ph: "7.5", turb: "8.3", nh3n: "0.154", factors: "不超标" },
    { seq: 33, name: "江口村", city: "恩施州", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.1", tn: "0.56", cond: "304.2", tp: "0.031", temp: "24", codmn: "3.2", ph: "7.9", turb: "5.1", nh3n: "0.228", factors: "不超标" },
    { seq: 34, name: "长滩", city: "恩施州", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8.1", tn: "0.38", cond: "207.6", tp: "0.011", temp: "24.2", codmn: "2.5", ph: "8.1", turb: "8.2", nh3n: "0.01", factors: "不超标" },
    { seq: 35, name: "长顺乡", city: "恩施州", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.3", tn: "1.14", cond: "271.1", tp: "0.035", temp: "25", codmn: "2", ph: "7.3", turb: "13.5", nh3n: "0.245", factors: "不超标" },
    { seq: 36, name: "太平沙", city: "武汉市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8.1", tn: "0.42", cond: "241.2", tp: "0.024", temp: "23.7", codmn: "2.4", ph: "7.2", turb: "5.6", nh3n: "0.037", factors: "不超标" },
    { seq: 37, name: "宗关", city: "武汉市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.8", tn: "0.9", cond: "304.4", tp: "0.072", temp: "25.1", codmn: "1.7", ph: "7.9", turb: "14", nh3n: "0.193", factors: "不超标" },
    { seq: 38, name: "朱家河口", city: "武汉市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8.8", tn: "0.56", cond: "165.7", tp: "0.038", temp: "24", codmn: "2", ph: "7.5", turb: "5.4", nh3n: "0.079", factors: "不超标" },
    { seq: 39, name: "江夏湖心", city: "武汉市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅲ类", targetLevel: 3, compliant: "是", do: "6.8", tn: "0.75", cond: "311.3", tp: "0.023", temp: "24.6", codmn: "2.5", ph: "8.3", turb: "4.4", nh3n: "0.04", factors: "不超标" },
    { seq: 40, name: "滠口", city: "武汉市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.4", tn: "0.49", cond: "219.1", tp: "0.034", temp: "23.3", codmn: "2.6", ph: "7.9", turb: "5.7", nh3n: "0.052", factors: "不超标" },
    { seq: 41, name: "西梁子湖南北嘴", city: "武汉市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅲ类", targetLevel: 3, compliant: "是", do: "7.9", tn: "0.55", cond: "174.3", tp: "0.035", temp: "23.1", codmn: "1.1", ph: "8.1", turb: "1.8", nh3n: "0.012", factors: "不超标" },
    { seq: 42, name: "西梁子湖湖北", city: "武汉市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅲ类", targetLevel: 3, compliant: "是", do: "6.5", tn: "1.03", cond: "218.8", tp: "0.047", temp: "25.7", codmn: "3.6", ph: "7.1", turb: "9.5", nh3n: "0.065", factors: "不超标" },
    { seq: 43, name: "西梁子湖湖南", city: "武汉市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅲ类", targetLevel: 3, compliant: "是", do: "6", tn: "0.72", cond: "255.8", tp: "0.029", temp: "25.9", codmn: "2.4", ph: "8", turb: "18.7", nh3n: "0.219", factors: "不超标" },
    { seq: 44, name: "郭玉", city: "武汉市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.2", tn: "0.85", cond: "222.1", tp: "0.042", temp: "25.5", codmn: "2.6", ph: "7.7", turb: "7.3", nh3n: "0.128", factors: "不超标" },
    { seq: 45, name: "龙口", city: "武汉市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.4", tn: "0.52", cond: "215.7", tp: "0.074", temp: "26", codmn: "3", ph: "7.8", turb: "10.9", nh3n: "0.25", factors: "不超标" },
    { seq: 46, name: "运粮湖同心队", city: "潜江市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7", tn: "0.71", cond: "192.3", tp: "0.049", temp: "24.5", codmn: "3.4", ph: "7.5", turb: "19.9", nh3n: "0.235", factors: "不超标" },
    { seq: 47, name: "乌溪沟", city: "荆州市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.4", tn: "0.96", cond: "195.6", tp: "0.063", temp: "23.1", codmn: "1.8", ph: "8.1", turb: "15", nh3n: "0.107", factors: "不超标" },
    { seq: 48, name: "新滩", city: "荆州市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8", tn: "0.52", cond: "207.7", tp: "0.015", temp: "22.9", codmn: "1.7", ph: "7.7", turb: "12", nh3n: "0.045", factors: "不超标" },
    { seq: 49, name: "杨柴湖", city: "荆州市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅲ类", targetLevel: 3, compliant: "是", do: "7.6", tn: "0.89", cond: "306.7", tp: "0.07", temp: "25.9", codmn: "3.1", ph: "8.3", turb: "19.6", nh3n: "0.114", factors: "不超标" },
    { seq: 50, name: "柳口", city: "荆州市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.1", tn: "0.67", cond: "236.2", tp: "0.089", temp: "24.3", codmn: "2.5", ph: "7.5", turb: "19.1", nh3n: "0.154", factors: "不超标" },
    { seq: 51, name: "湖心A", city: "荆州市", date: "2026-06-10", cls: "Ⅲ类", level: 3, target: "Ⅲ类", targetLevel: 3, compliant: "是", do: "5.6", tn: "1.19", cond: "315.8", tp: "0.062", temp: "23.6", codmn: "5.5", ph: "8.4", turb: "33", nh3n: "0.249", factors: "不超标" },
    { seq: 52, name: "湖心B", city: "荆州市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅲ类", targetLevel: 3, compliant: "是", do: "6.6", tn: "1", cond: "264.8", tp: "0.02", temp: "25.8", codmn: "3.5", ph: "7.2", turb: "19.9", nh3n: "0.194", factors: "不超标" },
    { seq: 53, name: "荆江口", city: "荆州市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.6", tn: "0.29", cond: "236.3", tp: "0.025", temp: "23", codmn: "1.4", ph: "8.1", turb: "6.6", nh3n: "0.024", factors: "不超标" },
    { seq: 54, name: "藕池河东支入境", city: "荆州市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.8", tn: "0.82", cond: "244.5", tp: "0.022", temp: "24.6", codmn: "2.4", ph: "7.6", turb: "6.8", nh3n: "0.239", factors: "不超标" },
    { seq: 55, name: "藕池河中支入境", city: "荆州市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.3", tn: "1.2", cond: "297.8", tp: "0.025", temp: "23.8", codmn: "2.3", ph: "7.9", turb: "17.3", nh3n: "0.221", factors: "不超标" },
    { seq: 56, name: "观音寺", city: "荆州市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.8", tn: "0.9", cond: "237.1", tp: "0.065", temp: "25.6", codmn: "2.3", ph: "7.9", turb: "13.5", nh3n: "0.088", factors: "不超标" },
    { seq: 57, name: "调关", city: "荆州市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8", tn: "0.5", cond: "246.2", tp: "0.031", temp: "22.8", codmn: "2.1", ph: "7.6", turb: "10.8", nh3n: "0.02", factors: "不超标" },
    { seq: 58, name: "马坡湖", city: "荆州市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.4", tn: "0.73", cond: "241.6", tp: "0.073", temp: "24.3", codmn: "3.5", ph: "7.4", turb: "10", nh3n: "0.08", factors: "不超标" },
    { seq: 59, name: "京山河邓李港", city: "荆门市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.3", tn: "0.88", cond: "207.7", tp: "0.052", temp: "25.4", codmn: "2.9", ph: "7.9", turb: "4.2", nh3n: "0.205", factors: "不超标" },
    { seq: 60, name: "漳河水库库心", city: "荆门市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅲ类", targetLevel: 3, compliant: "是", do: "8.8", tn: "0.27", cond: "185.5", tp: "0.031", temp: "25.2", codmn: "1.6", ph: "7.8", turb: "9.7", nh3n: "0.057", factors: "不超标" },
    { seq: 61, name: "皇庄", city: "荆门市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.6", tn: "0.32", cond: "230.4", tp: "0.012", temp: "25.1", codmn: "2", ph: "7.9", turb: "8.4", nh3n: "0.075", factors: "不超标" },
    { seq: 62, name: "转斗", city: "荆门市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8.1", tn: "0.22", cond: "224.5", tp: "0.01", temp: "24.6", codmn: "2.6", ph: "8.1", turb: "5.6", nh3n: "0.071", factors: "不超标" },
    { seq: 63, name: "马良龚家湾", city: "荆门市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.8", tn: "1.15", cond: "311.4", tp: "0.036", temp: "24.9", codmn: "3.9", ph: "8.4", turb: "16.6", nh3n: "0.039", factors: "不超标" },
    { seq: 64, name: "朱市", city: "襄阳市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.1", tn: "0.62", cond: "244.9", tp: "0.044", temp: "25.8", codmn: "1.7", ph: "7.5", turb: "4.6", nh3n: "0.207", factors: "不超标" },
    { seq: 65, name: "汤店", city: "襄阳市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8.1", tn: "0.36", cond: "247.1", tp: "0.021", temp: "25.1", codmn: "2.5", ph: "7.2", turb: "8.2", nh3n: "0.059", factors: "不超标" },
    { seq: 66, name: "沈湾", city: "襄阳市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6", tn: "0.97", cond: "265.4", tp: "0.079", temp: "25.7", codmn: "2.6", ph: "8.1", turb: "13.5", nh3n: "0.172", factors: "不超标" },
    { seq: 67, name: "白家湾", city: "襄阳市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.8", tn: "1.19", cond: "242.4", tp: "0.035", temp: "23.7", codmn: "2.3", ph: "7.8", turb: "18.9", nh3n: "0.247", factors: "不超标" },
    { seq: 68, name: "翟湾", city: "襄阳市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.5", tn: "0.43", cond: "224.6", tp: "0.037", temp: "25", codmn: "2.4", ph: "7.3", turb: "5.5", nh3n: "0.062", factors: "不超标" },
    { seq: 69, name: "聂家滩", city: "襄阳市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.6", tn: "0.91", cond: "312.2", tp: "0.043", temp: "24.3", codmn: "1.8", ph: "8.3", turb: "7.3", nh3n: "0.065", factors: "不超标" },
    { seq: 70, name: "茶庵", city: "襄阳市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8.6", tn: "0.28", cond: "190.4", tp: "0.023", temp: "22.6", codmn: "1.4", ph: "8.1", turb: "5.1", nh3n: "0.034", factors: "不超标" },
    { seq: 71, name: "七星（梁子岛水源）", city: "鄂州市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅲ类", targetLevel: 3, compliant: "是", do: "7", tn: "0.86", cond: "317.7", tp: "0.048", temp: "23.1", codmn: "2.7", ph: "7.7", turb: "12.8", nh3n: "0.129", factors: "不超标" },
    { seq: 72, name: "巴河镇河口", city: "黄冈市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.8", tn: "0.77", cond: "241.1", tp: "0.077", temp: "23.9", codmn: "3.7", ph: "7.1", turb: "6.4", nh3n: "0.076", factors: "不超标" },
    { seq: 73, name: "库坝上", city: "黄冈市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅲ类", targetLevel: 3, compliant: "是", do: "7.3", tn: "0.9", cond: "287.8", tp: "0.053", temp: "24.5", codmn: "1.9", ph: "8.3", turb: "9.9", nh3n: "0.117", factors: "不超标" },
    { seq: 74, name: "沐家泾", city: "黄冈市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.3", tn: "0.63", cond: "188.5", tp: "0.03", temp: "24.7", codmn: "3.6", ph: "7.5", turb: "15.5", nh3n: "0.071", factors: "不超标" },
    { seq: 75, name: "西河驿", city: "黄冈市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.5", tn: "0.58", cond: "285.3", tp: "0.037", temp: "25.2", codmn: "3.9", ph: "8.3", turb: "4", nh3n: "0.23", factors: "不超标" },
    { seq: 76, name: "麻城许家湾", city: "黄冈市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8.5", tn: "0.34", cond: "170.3", tp: "0.024", temp: "25.2", codmn: "2.8", ph: "7.7", turb: "8.5", nh3n: "0.011", factors: "不超标" },
    { seq: 77, name: "中官铺", city: "黄石市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.4", tn: "0.5", cond: "251.6", tp: "0.013", temp: "23.3", codmn: "2", ph: "7.6", turb: "8.4", nh3n: "0.034", factors: "不超标" },
    { seq: 78, name: "大冶湖闸", city: "黄石市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.4", tn: "0.26", cond: "213.9", tp: "0.021", temp: "24", codmn: "1.3", ph: "7.6", turb: "6.2", nh3n: "0.048", factors: "不超标" },
    { seq: 79, name: "富池闸", city: "黄石市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.1", tn: "0.61", cond: "268.1", tp: "0.062", temp: "24.2", codmn: "1.7", ph: "7.8", turb: "18.4", nh3n: "0.199", factors: "不超标" },
    { seq: 80, name: "石剅（右）", city: "仙桃市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.1", tn: "0.97", cond: "277.1", tp: "0.038", temp: "24.5", codmn: "2.5", ph: "7.4", turb: "13.2", nh3n: "0.237", factors: "不超标" },
    { seq: 81, name: "郑场游潭村", city: "仙桃市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.7", tn: "0.44", cond: "243.3", tp: "0.027", temp: "22.8", codmn: "1.8", ph: "7.9", turb: "5.8", nh3n: "0.051", factors: "不超标" },
    { seq: 82, name: "黄家村（右）", city: "仙桃市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.5", tn: "0.56", cond: "292.9", tp: "0.079", temp: "23.1", codmn: "1.8", ph: "7.2", turb: "11.1", nh3n: "0.161", factors: "不超标" },
    { seq: 83, name: "化口", city: "十堰市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8", tn: "0.31", cond: "151.2", tp: "0.032", temp: "23.5", codmn: "2", ph: "8", turb: "4.4", nh3n: "0.045", factors: "不超标" },
    { seq: 84, name: "水石门", city: "十堰市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.5", tn: "1.13", cond: "278.1", tp: "0.088", temp: "24.6", codmn: "2.5", ph: "7.7", turb: "4.8", nh3n: "0.219", factors: "不超标" },
    { seq: 85, name: "羊尾", city: "十堰市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6", tn: "0.69", cond: "280.8", tp: "0.064", temp: "24.2", codmn: "2.2", ph: "8.2", turb: "3.3", nh3n: "0.192", factors: "不超标" },
    { seq: 86, name: "鄂坪水库库心", city: "十堰市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅲ类", targetLevel: 3, compliant: "是", do: "8.2", tn: "0.33", cond: "193.6", tp: "0.02", temp: "24.7", codmn: "2.1", ph: "7.7", turb: "3.7", nh3n: "0.055", factors: "不超标" },
    { seq: 87, name: "石矶头大桥上", city: "咸宁市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8.5", tn: "0.36", cond: "202.1", tp: "0.039", temp: "24.1", codmn: "2", ph: "7.7", turb: "9.4", nh3n: "0.07", factors: "不超标" },
    { seq: 88, name: "万安闸", city: "孝感市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.6", tn: "0.44", cond: "221.2", tp: "0.023", temp: "25.2", codmn: "1", ph: "7.1", turb: "3.7", nh3n: "0.077", factors: "不超标" },
    { seq: 89, name: "余家坡", city: "孝感市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8.2", tn: "0.37", cond: "210.8", tp: "0.027", temp: "23.5", codmn: "2.1", ph: "8.1", turb: "3.8", nh3n: "0.042", factors: "不超标" },
    { seq: 90, name: "石剅（左）", city: "孝感市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.3", tn: "1.14", cond: "240.7", tp: "0.089", temp: "25", codmn: "3.7", ph: "8.1", turb: "16.8", nh3n: "0.148", factors: "不超标" },
    { seq: 91, name: "雷福闸", city: "孝感市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.2", tn: "0.98", cond: "254", tp: "0.07", temp: "25.6", codmn: "2.3", ph: "8.1", turb: "13.4", nh3n: "0.113", factors: "不超标" },
    { seq: 92, name: "东支(天府庙)", city: "宜昌市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.8", tn: "0.85", cond: "319.5", tp: "0.05", temp: "24.5", codmn: "1.7", ph: "7.6", turb: "20", nh3n: "0.226", factors: "不超标" },
    { seq: 93, name: "九畹溪河口", city: "宜昌市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.1", tn: "1.15", cond: "207.4", tp: "0.086", temp: "23.9", codmn: "2.5", ph: "7.4", turb: "5.5", nh3n: "0.19", factors: "不超标" },
    { seq: 94, name: "土门大桥", city: "宜昌市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.7", tn: "0.55", cond: "170.2", tp: "0.021", temp: "24.5", codmn: "1.2", ph: "7.9", turb: "2.1", nh3n: "0.043", factors: "不超标" },
    { seq: 95, name: "朱津滩(天龙湾)", city: "宜昌市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.7", tn: "0.82", cond: "219.1", tp: "0.049", temp: "25.4", codmn: "3.1", ph: "7.4", turb: "4.8", nh3n: "0.204", factors: "不超标" },
    { seq: 96, name: "纸坊头", city: "宜昌市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.7", tn: "1.06", cond: "312.4", tp: "0.029", temp: "23.9", codmn: "1.8", ph: "7.2", turb: "18.4", nh3n: "0.168", factors: "不超标" },
    { seq: 97, name: "马勒坡", city: "宜昌市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.8", tn: "0.87", cond: "283.9", tp: "0.068", temp: "25.7", codmn: "4", ph: "7.5", turb: "12.7", nh3n: "0.181", factors: "不超标" },
    { seq: 98, name: "南里渡桥", city: "恩施州", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.7", tn: "0.31", cond: "198", tp: "0.038", temp: "25.2", codmn: "1.9", ph: "7.9", turb: "8.6", nh3n: "0.015", factors: "不超标" },
    { seq: 99, name: "洞坪", city: "恩施州", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.1", tn: "0.98", cond: "246.5", tp: "0.066", temp: "23.5", codmn: "3", ph: "7.2", turb: "7.2", nh3n: "0.23", factors: "不超标" },
    { seq: 100, name: "神农洞", city: "恩施州", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8.2", tn: "0.4", cond: "171.1", tp: "0.011", temp: "24.6", codmn: "1.5", ph: "7.8", turb: "1.8", nh3n: "0.08", factors: "不超标" },
    { seq: 101, name: "落坡坝", city: "恩施州", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8", tn: "0.45", cond: "251.6", tp: "0.027", temp: "23.8", codmn: "1.5", ph: "7.5", turb: "5.1", nh3n: "0.013", factors: "不超标" },
    { seq: 102, name: "北门港", city: "武汉市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.4", tn: "0.33", cond: "219.1", tp: "0.023", temp: "24.5", codmn: "2.4", ph: "7", turb: "4.6", nh3n: "0.074", factors: "不超标" },
    { seq: 103, name: "挖沟泵站", city: "武汉市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.1", tn: "0.97", cond: "220.3", tp: "0.036", temp: "25.1", codmn: "3.6", ph: "7.9", turb: "6.6", nh3n: "0.239", factors: "不超标" },
    { seq: 104, name: "新河口", city: "武汉市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.7", tn: "0.77", cond: "235.9", tp: "0.039", temp: "24.1", codmn: "2.5", ph: "7.9", turb: "13.2", nh3n: "0.072", factors: "不超标" },
    { seq: 105, name: "纱帽（右）", city: "武汉市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.7", tn: "0.38", cond: "158.4", tp: "0.038", temp: "23", codmn: "2.7", ph: "7.7", turb: "4", nh3n: "0.071", factors: "不超标" },
    { seq: 106, name: "高石碑", city: "潜江市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.4", tn: "0.63", cond: "211.7", tp: "0.075", temp: "24.3", codmn: "2.2", ph: "7.6", turb: "12.8", nh3n: "0.077", factors: "不超标" },
    { seq: 107, name: "夜谋沟", city: "荆州市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.8", tn: "0.85", cond: "262.7", tp: "0.085", temp: "23.1", codmn: "3.2", ph: "7.5", turb: "19.2", nh3n: "0.072", factors: "不超标" },
    { seq: 108, name: "姚集", city: "荆州市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.6", tn: "0.88", cond: "306", tp: "0.08", temp: "23.5", codmn: "4", ph: "7.3", turb: "11.5", nh3n: "0.06", factors: "不超标" },
    { seq: 109, name: "桂花树", city: "荆州市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8.8", tn: "0.43", cond: "219.6", tp: "0.033", temp: "24.5", codmn: "2.1", ph: "7.4", turb: "9", nh3n: "0.031", factors: "不超标" },
    { seq: 110, name: "瞿家湾", city: "荆州市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8.7", tn: "0.45", cond: "233.6", tp: "0.034", temp: "25.3", codmn: "1.7", ph: "8", turb: "8.5", nh3n: "0.05", factors: "不超标" },
    { seq: 111, name: "山河电站", city: "荆门市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6", tn: "1.09-PPT", cond: "238.3", tp: "0.055", temp: "24.1", codmn: "2.2", ph: "8", turb: "10.7", nh3n: "0.188", factors: "不超标" },
    { seq: 112, name: "康家沟", city: "荆门市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7", tn: "0.66", cond: "299.4", tp: "0.051", temp: "24.1", codmn: "1.7", ph: "7.3", turb: "19.4", nh3n: "0.064", factors: "不超标" },
    { seq: 113, name: "石牌港", city: "荆门市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.4", tn: "1.19", cond: "292.4", tp: "0.058", temp: "25.1", codmn: "2.9", ph: "7.8", turb: "5.5", nh3n: "0.225", factors: "不超标" },
    { seq: 114, name: "王湾村", city: "襄阳市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8.5", tn: "0.45", cond: "229.9", tp: "0.03", temp: "22.6", codmn: "1.7", ph: "7.2", turb: "1.5", nh3n: "0.014", factors: "不超标" },
    { seq: 115, name: "琚湾", city: "襄阳市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.9", tn: "1.18", cond: "297.6", tp: "0.026", temp: "24.8", codmn: "1.9", ph: "7.8", turb: "14.9", nh3n: "0.233", factors: "不超标" },
    { seq: 116, name: "西排子河水库库心", city: "襄阳市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅲ类", targetLevel: 3, compliant: "是", do: "7.9", tn: "0.23", cond: "181.5", tp: "0.012", temp: "24.5", codmn: "1.8", ph: "8.1", turb: "3.2", nh3n: "0.039", factors: "不超标" },
    { seq: 117, name: "重阳", city: "襄阳市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8", tn: "0.59", cond: "190.6", tp: "0.04", temp: "22.6", codmn: "2.3", ph: "7.7", turb: "5.6", nh3n: "0.047", factors: "不超标" },
    { seq: 118, name: "梁子湖长港出口", city: "鄂州市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.3", tn: "1.09-PPT", cond: "188.8", tp: "0.067", temp: "24.1", codmn: "2", ph: "8.2", turb: "8.5", nh3n: "0.077", factors: "不超标" },
    { seq: 119, name: "樊口", city: "鄂州市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8.2", tn: "0.5", cond: "236.2", tp: "0.016", temp: "22.8", codmn: "1.7", ph: "7.5", turb: "10.8", nh3n: "0.072", factors: "不超标" },
    { seq: 120, name: "港口桥", city: "鄂州市", date: "2026-06-10", cls: "Ⅰ类", level: 1, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "8", tn: "0.54", cond: "247.2", tp: "0.031", temp: "23.8", codmn: "1.9", ph: "7.4", turb: "7.4", nh3n: "0.056", factors: "不超标" },
    { seq: 121, name: "随应桥", city: "随州市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.3", tn: "0.82", cond: "276.8", tp: "0.069", temp: "25.1", codmn: "2.4", ph: "8.1", turb: "13.3", nh3n: "0.246", factors: "不超标" },
    { seq: 122, name: "汪洲村", city: "黄冈市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "7.7", tn: "1.16", cond: "303.4", tp: "0.084", temp: "23.3", codmn: "2.6", ph: "7.3", turb: "14.4", nh3n: "0.209", factors: "不超标" },
    { seq: 123, name: "陶冲村", city: "黄冈市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅱ类", targetLevel: 2, compliant: "是", do: "6.9", tn: "0.53", cond: "257.7", tp: "0.059", temp: "23.6", codmn: "2.9", ph: "8", turb: "11.9", nh3n: "0.064", factors: "不超标" },
    { seq: 124, name: "磊山湖心", city: "黄石市", date: "2026-06-10", cls: "Ⅱ类", level: 2, target: "Ⅲ类", targetLevel: 3, compliant: "是", do: "6.7", tn: "0.59", cond: "198", tp: "0.073", temp: "24.4", codmn: "2.1", ph: "7.1", turb: "7.1", nh3n: "0.102", factors: "不超标" }
  ];

  /* 附表5：无监测数据自动站表 */
  D.noData = [
    { seq: 1, source: "-", station: "本日无记录", city: "-", target: "-", date: "-", note: "本日未识别无监测数据自动站" }
  ];



  return D;
})();
