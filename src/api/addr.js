import request from '../utils/request';
export const addrLevel3Data = query => {
    return request({
        url: './level3.json',
        method: 'get',
        params: query
    });
};
export const addrLevel4Data = query => {
    return request({
        url: './level4.txt',
        method: 'get',
        params: query
    });
};
export const telAddrData = query => {
    return request({
        url: '/cc/json/mobile_tel_segment.htm',
        method: 'get',
        params: query
    });
};

export const randomNum = function(size) {
    const index = Math.floor(Math.random() * size);
    return index;
};
export const randomMM = function(mi,ma) {
    return Math.floor(Math.random() * (ma - mi + 1)) + mi
};
export const getRandom = function(arr) {
    let size = arr.length || 0;
    return arr[randomNum(size)];
};

//方法返回名称可能重复，请注意判断。
export const  getAreaName = function() {
    //用于组合名称用
    const keyArr = [
      "鼎", "金", "惠", "和", "凯", "雅", "盛", "豪", "隆", "汇",
      "悦", "福", "茗", "格", "馨", "华", "君", "洲", "北", "逸", "缘"
    ];
    //常见名称
    const commonName =
      ["聚源", "佳福", "驿乐", "源达", "华邦", "凯撒", "同阳", "美乐", "华尔顿", "天胜",
        "金豪", "鹏晖", "金雅", "雅盛", "菲特", "协邦", "龙桦", "麦豪", "盛达", "荣盛",
        "格林", "汇都", "七福", "富臣", "名豪", "裕福", "元一", "宏福", "世尊", "京华",
        "城轩", "永嘉", "诚尔", "梦泰", "富华", "尔乐", "银都", "顺生", "金角", "领立",
        "鑫荣", "友荣", "鼎盛", "国鼎", "双屿", "富丽", "温沙", "亿凯", "鸿华", "星辉",
        "宏达", "博亿", "乐从", "客轩", "金锐", "天都", "君悦", "赢天", "熙和", "派高",
        "博玛", "润新", "东蒙", "利来", "国聚", "艺诺", "诚悦", "杰宏", "文华", "美特",
        "锐恒", "泰唐", "裕通", "永新", "兴源", "金旺", "舒雅", "正阳", "荣兴", "云天",
        "喜象", "天龙", "银马", "诚达", "鑫汉", "玛格", "中诺", "锦都", "晟丰", "凯豪",
        "柏菲", "华龙", "伟艺", "菲斯", "金跃", "顺冠", "铭科", "洲泰", "简艺", "诺信",
        "优嘉", "名鸿", "江恒", "蓝图", "诚栋", "家家顺", "新家园", "银地", "华瑞", "汇德",
        "易安居", "金航", "创元", "宏轩", "兴扬", "新瑞", "融居", "捷辰", "家客多", "优置客",
        "华瑞", "香河永成", "优享逸栈", "元诚", "凯丽", "世豫", "宜安家", "松鹤", "鑫鸿",
        "湖镇", "兴海", "银兴", "阳光沙滩", "温尚居", "盈盛", "兴盛", "迅杰", "金典", "兴凯",
        "吉星", "东佳", "安厦", "隆志达", "江山大地", "玉溪北苑", "博源", "锦裕达", "和诚",
        "水源丰", "境胜", "爱家立业", "华杰", "盛世恒业", "泰源", "华冠", "大溪地", "天地",
        "信地", "三得益", "房信", "东方", "派拉蒙", "深淼", "河源", "富园", "金源", "百大",
        "兴达", "恩宝", "玖月", "嘉锦鹏", "益民", "光怡", "德信", "八达", "富中", "国正",
        "奥新", "安青", "巴人", "东镜", "丰泽", "丰力", "峰岩", "飞扬", "伟峰", "城铭",
        "村田", "大富", "大商", "星渊", "信拓", "协和", "缘通", "元凌", "远志", "金地",
        "玉鸣", "西欧", "锄禾", "创坛", "住达", "众合", "永恒", "朝河源", "馨园", "鑫诚",
        "颐豪", "亿华", "驿鑫", "普瑞", "强锐", "福地", "长城", "神剑", "瑞贝卡", "日盛达",
        "瑞邦", "三盛", "荣城", "深化", "松鹤", "随缘", "思维", "圣田", "盛和", "天昊", "天晟",
        "万方", "万邦", "图腾", "泰龙", "桃园", "腾飞", "天创", "开源", "奎世", "君意", "聚缘居",
        "鲲鹏", "蓝石", "华美", "百家兴", "京御幸福", "同心", "中佳", "地球村", "居佳", "鼎盛居",
        "方大", "纵横", "青商", "文振", "豫建", "金居", "吉星", "南洋", "天地恒", "广龙", "纬凌特",
        "欧佳", "天地中", "万赢", "广通达", "玉山", "同富康", "恒威", "永辉"
      ];
    //后缀
    const suffix = ["酒店", "华庭", "苑", "湾", "府", "国际公寓", "海岸", "园", "堡"];
  
    let firstName = "";
    //随机选择获取名称的方式（随机组合还是取常见名）PS：这里用到 underscore 的方法
    //underscore 网址： http://www.bootcss.com/p/underscore/
    if (randomMM(0, 10) > 5){
      firstName = keyArr[randomMM(0, keyArr.length - 1)] + keyArr[randomMM(0, keyArr.length - 1)];
    } else{
      firstName = commonName[randomMM(0, commonName.length - 1)];
    }
    const lastName = suffix[randomMM(0, suffix.length - 1)];
    const name = firstName + lastName;
    return name;
  }

export const getAddrData= function(arr) {
    this.$set(this.telQuery, 'tel', this.$route.query.tel);
    let ar='北京';
    telAddrData(this.telQuery).then(res => {
        ar=res.substr(res.indexOf("province")+10,2);
        addrLevel3Data().then(res3 => {
            let region=res3.filter(v=>v.region.startsWith(ar));
            let city=getRandom(region[0].regionEntitys);
            //let code=region[0].code.substr(0,3);
            let code=city.code.substr(0,city.code.length-1);
            console.log(code);
            addrLevel4Data().then(res4 => {
                let level4 = res4.split('\n');
                level4 = level4.map(row => row.split(','));
                level4=level4.filter(v=>v[0].startsWith(code));
                let addr=getRandom(level4);
                console.log(addr);
                let buildNo = (randomNum(1400) + 1).toString().padStart(3, '0'); // 001 - 1400
                let room = (randomNum(8) + 1) + '0' + randomNum(9); // 101 - 909
                addr = `${region[0].region}${city.region}${addr[1]}${buildNo}号${room}室`;
                console.log(addr);
                return addr;
            });
        });
    });
}