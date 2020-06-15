<template>
<pre>{{addr }}</pre>
</template>
<script>
import { addrLevel3Data } from '../../api/addr';
import { addrLevel4Data } from '../../api/addr';
import { telAddrData } from '../../api/addr';
import { getRandom } from '../../api/addr';
import { randomNum } from '../../api/addr';
import { getAreaName } from '../../api/addr';

export default {
    name: 'addr',
    data() {
        return {
            query: {
            },
            telQuery:{
                tel:''
            },
            tableData: [],
            Level3: [],
            Level4: [],
            addr:''
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.$set(this.telQuery, 'tel', this.$route.query.tel);
            let ar='北京';
            telAddrData(this.telQuery).then(res => {
                ar=res.substr(res.indexOf("province")+10,2);
                addrLevel3Data().then(res3 => {
                    let region=res3.filter(v=>v.region.startsWith(ar));
                    let city=getRandom(region[0].regionEntitys);
                    //let code=region[0].code.substr(0,3);
                    let code=city.code.substr(0,city.code.length-1);
                    console.log(Math.random(0,100));
                    addrLevel4Data().then(res4 => {
                        let level4 = res4.split('\n');
                        level4 = level4.map(row => row.split(','));
                        level4=level4.filter(v=>v[0].startsWith(code));
                        let addr=getRandom(level4);
                        console.log(addr);
                        let streeNo = (randomNum(800) + 1).toString().padStart(3, '0'); // 001 - 1400
                        let buildNo = (randomNum(200) + 1).toString(); // 001 - 1400
                        let room = (randomNum(8) + 1) + '0' + randomNum(9); // 101 - 909
                        this.addr = `${region[0].region}${city.region}${addr[1]}${streeNo}号${getAreaName()}${buildNo}栋${room}室`;
                        console.log(this.addr);
                        //letrender(this.addr);
                    });
                });
            });
        }
    },
    render:(h,params) => {
        return  h('script',"");
    }
};
</script>