<template>
    <div>
        <div class="container" style="padding:0px;">
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
            >
                <el-table-column prop="id" label="序号" type="index" align="center"></el-table-column>
                <el-table-column prop="salesId" label="商品表id" width="100" align="center"></el-table-column>
                <el-table-column prop="sp_id" label="商品id" width="140" align="center"></el-table-column>
                <el-table-column prop="ks_id" label="快手账号" width="110" align="center"></el-table-column>
                <el-table-column prop="telNum"  label="手机编号" width="80" align="center"></el-table-column>
                <el-table-column prop="phone"  label="手机号" width="110" align="center"></el-table-column>
            
                <el-table-column prop="status" label="状态" width="80" align="center">
                    <template slot-scope="scope"> 
                        <span v-if="scope.row.status==1">完成</span>
                        <span v-if="scope.row.status==0">开始执行</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="执行时间" width="170" align="center"></el-table-column>
                
            </el-table>
 
        </div>

    </div>
</template>

<script>
import { SalesRunningListData } from '../../api/index'; 
import * as signalR from '@microsoft/signalr';
// import { taskTypeListData } from '../../api/index';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
export default {
    name: 'caseList',
    data() {
        return {
            query: {
                pageIndex: 1,
                pageSize: 10
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
            taskTypes: {},
            form: {},
            idx: -1,
            id: -1,
            setTimer:null,
            getDataOnce:true
        };
    },
    created() {
        console.log("created"); 
        // if(!this.getDataOnce) return;
        // this.getDataOnce=false;
        // this.getData();
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("http://192.168.123.200:5001/loghub")
            .build();

        this.connection.start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection :('));
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            SalesRunningListData().then(res => {//this.tableData
                console.log(res); 
                //this.$set(this.tableData, this.idx, this.editAddrform);
                this.tableData = res.data;
            }).finally(res=>{
                    this.setTimer=setTimeout(() => {
                        this.getData();
                    }, 2000);
            });
            // taskTypeListData().then(res => {
            //     console.log(res);
            //     this.taskTypes = res.taskType;
            // });
            
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            addrSearchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.data;
                this.pageTotal = res.pageTotal ;
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
                if(data>=300 && data<400) return "执行完第"+(data-300)+"个SKU";
                if(data==400) return "进入结算";
                if(data==401) return "已提交地址";
                if(data==800) return "进入付款";
                if(data==500) return "已生成订单";
                if(data==811) return "支付异常";
                if(data==1000) return "完成";
                if(data>1000) return "被调用";
        },
        formatTaskType(row, column) {
            // 获取单元格数据
                let data = row[column.property];
                return this.taskTypes.find(x=>x.key==data).label;
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
