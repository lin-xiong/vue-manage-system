<template>
    <div>
        <div class="container" style="padding:0px;">
            <div class="handle-box" style="padding:8px 0px 0px 5px;">
                <el-select v-model="query.shopName"  placeholder="选择店铺">
                    <el-option v-for="item in multiShop" :key="item.id" :label="item.shopName" :value="item.shopName" ></el-option>
                </el-select>
                <el-date-picker
                    type="date"
                    placeholder="开始日期"
                    v-model="query.begin"
                    value-format="yyyy-MM-dd"
                    width="10"
                ></el-date-picker><span>-</span>
                <el-date-picker
                    type="date"
                    placeholder="结束日期"
                    v-model="query.end"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
                <!-- <el-date-picker
                    v-model="pickerDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    :picker-options="pickerBeginDateBefore"
                    :default-value="timeDefaultShow"
                    end-placeholder="结束日期"
                    size="small"
                    class="margin-right-10">
                </el-date-picker>  -->
                <el-button style="margin-left:10px" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-add" @click="exportExcel">导出</el-button>
                <span style="padding:8px 0px 0px 5px;">总计:{{totalCount}}</span>
            </div>
            <el-table
                :data="tableData"
                :default-sort = "{prop: 'exeTime', order: 'descending'}"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
                :height="700"
                :stripe="true"
                id="caseListTable"
            >
                <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
                <el-table-column prop="shopName"  label="店铺名称" align="center"></el-table-column>
                <el-table-column prop="keyword" label="关键词" align="center"></el-table-column>
                <el-table-column prop="sku"  label="SKU" align="center"></el-table-column>
                <el-table-column prop="tel"  label="手机号" width="110" align="center"></el-table-column>
                <el-table-column prop="orderid"  label="订单号" width="120" align="center"></el-table-column>
                <el-table-column prop="price"  label="价格" align="center"></el-table-column>
                <el-table-column prop="telNo" label="操作手机" width="80" align="center"></el-table-column> 
                <el-table-column prop="status" label="状态" width="120" align="center" :formatter="formatStatus" ></el-table-column>
                <el-table-column prop="addr" label="收货地址" align="center" ></el-table-column>
               
            </el-table>
 
        </div>

    </div>
</template>

<script>
import { exportOrderData } from '../../api/index';
import { shopListData } from '../../api/index';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
export default {
    name: 'exportOrderData',
    data() {
        return {
            query: {
                status:1000
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            editAddrform:{},
            addAddrform:{},
            multiShop: [],
            form: {},
            idx: -1,
            id: -1,
            setTimer:null,
            getDataOnce:true,
            multiShop: [],
            totalCount:0
            // pickerBeginDateBefore:{
            //     disabledDate(time) {
            //         return time.getTime() > Date.now();
            //     }
            // },
            // timeDefaultShow:new Date()

        };
    },
    created() {
        console.log("created"); 
        if(!this.getDataOnce) return;
        this.getDataOnce=false;
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
//this.$set(this.query, 'end', Date("yyyy-MM-dd"));
//queryBegin.timeDefaultShow= new Date();
            shopListData().then(res => {
                console.log(res);
                this.multiShop = res.data ;
                var allshop= {id:0,shopName:'全部'};
                this.multiShop.splice(0,0,allshop);
                //this.$set()multiShop.push(allshop);
                //this.multiShop.push(res.data);
            });
            //this.$set(this.query, 'end', Date("yyyy-MM-dd"));
            exportOrderData(this.query).then(res => {//this.tableData
                console.log(res); 
                //this.$set(this.tableData, this.idx, this.editAddrform);
                this.tableData = res.data;
            }).finally(res=>{
                this.totalCount=res.data.length;
            });
            
        },
        // 触发搜索按钮
        handleSearch() {
            //this.$set(this.query, 'pageIndex', 1);
            console.log(this.query); 
            if (this.query.shopName=='全部')
                this.$set(this.query, 'shopName', '');
            exportOrderData(this.query).then(res => {
                console.log(res);
                this.tableData = res.data;
                //this.pageTotal = res.pageTotal ;
                this.totalCount=res.data.length;
            });
        },
        // 执行操作
        handleExe(index, row) {
            // 二次确认执行
            this.$confirm('确定要执行吗？', '提示', {
                type: 'warning'
            }).then(res => {
                this.idx = index; 
                addrExeData(row).then(res => {
                    console.log(res);
                    if(res==1){
                        this.$message.success('执行成功');
                        row.status=2;
                    }
                });
            }).catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.editAddrform = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            addrEditData(this.editAddrform).then(res => {
                console.log(res);
                if(res==1)
                 {  
                    this.editVisible = false;
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    this.$set(this.tableData, this.idx, this.editAddrform);
                 }
                else {
                    this.$message.error('修改出错！');
                    console.log('error edit Addr!!');
                    return false;
                }
            });
            
        }, 
        handleAdd(){
            this.addVisible = true;
        },
        // 保存添加
        saveAdd() {
            addrAddData(this.addAddrform).then(res => {
                console.log(res);
                if(res==1)
                 {  
                    this.addVisible = false;
                    this.$message.success(`增加Addr成功`);
                    this.getData();
                 }
                else {
                    this.$message.error('增加Addr出错！');
                    console.log('error add shop!!');
                    return false;
                }
            });
            
        }, 
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        formatDate(row, column) {
            // 获取单元格数据
            let data = row[column.property]
            if(data == null) {
                return null
            }
            let dt = new Date(data)
            return dt.getFullYear() + '-' + (dt.getMonth() +1) + '-' + dt.getDate()+" "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
        },
        formatShopName(row, column) {
            // 获取单元格数据
                let data = row[column.property];
                if(this.multiShop == null)
                    return null;
                for (let i = 0; i < this.multiShop.length; i++) { 
                    if(data==this.multiShop[i].id)
                        return this.multiShop[i].shopName;
                }
        },
        formatAddr(row, column) {
            // 获取单元格数据
                let data = row[column.property];
                if (data)
                return data.substr(3,4);
                else
                return "";
        },
        formatStatus(row, column) {
            // 获取单元格数据
            // <template slot-scope="scope"> 
            //             <span v-if="scope.row.status==2">任务被拉取</span>
            //             <span v-if="scope.row.status>=200 && scope.row.status<300">开始执行</span>
            //             <span v-if="scope.row.status>=300">执行 "scope.row.status-300"</span>
            //             <span v-if="scope.row.status==4">开始执行</span>
            //             <span v-if="scope.row.status==5">取优惠券成功</span>
            //             <span v-if="scope.row.status==6">取优惠券失败</span>
            //             <span v-if="scope.row.status==7">设置收件人失败</span>
            //             <span v-if="scope.row.status==8">下单成功</span>
            //             <span v-if="scope.row.status==9">下单失败</span>
            //             <span v-if="scope.row.status==10">代付连接完成</span>
            //             <span v-if="scope.row.status==11">完成操作</span>
            //         </template>
                let data = row[column.property];
                if(data == 2) return "任务被拉取";
                if(data==200) return "开始执行";
                if(data>=300 && data<400) return "执行第"+(data-300)+"个SKU";
                if(data==400) return "进入结算";
                if(data==401) return "已提交地址";
                if(data==800) return "进入付款";
                if(data==811) return "支付异常";
                if(data==1000) return "完成";
        },
        //定义导出Excel表格事件
        exportExcel() {
        /* 从表生成工作簿对象 */
        var wb = XLSX.utils.table_to_book(document.querySelector("#caseListTable"));
        /* 获取二进制字符串作为输出 */
        var wbout = XLSX.write(wb, {
            bookType: "xlsx",
            bookSST: true,
            type: "array"
        });
        var fn="";
        if (this.query.shopName!=null) fn=fn+this.query.shopName+"_";
        if(this.query.begin==this.query.end) 
            fn=fn+this.query.begin;
        else
            fn=fn+this.query.begin+"到"+this.query.end;
        fn=fn+".xlsx";
        try {
            FileSaver.saveAs(
            //Blob 对象表示一个不可变、原始数据的类文件对象。
            //Blob 表示的不一定是JavaScript原生格式的数据。
            //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], { type: "application/octet-stream" }),
            //设置导出文件名称
            fn
            );
        } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
        }
    },
    deactivated()
    {
        console.log("deactivated");
        clearTimeout(this.setTimer); 
        this.setTimer=null;
        this.getDataOnce=true;
    },
    activated(){
        console.log("activated");
        if(!this.getDataOnce) return;
        this.getDataOnce=false;
        this.getData();
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
