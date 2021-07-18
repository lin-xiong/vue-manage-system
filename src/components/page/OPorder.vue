<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 手工补单
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.shopName" placeholder="商铺名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                :stripe="true"
                @row-click="editOrderList"
            >
                <el-table-column prop="id" label="ID" width="55" align="center" height="50"></el-table-column>
                <el-table-column prop="shopName" label="店铺名" align="center"></el-table-column>
                <el-table-column prop="sku" label="sku" align="center"></el-table-column>
                <el-table-column prop="keyword" label="关键词" align="center"></el-table-column>
                <el-table-column prop="telNo" label="操作手机" width="80" align="center"></el-table-column>
                <el-table-column prop="tel" label="手机号" width="120" align="center"></el-table-column>
                <el-table-column prop="orderid" label="订单号" width="120" align="center"></el-table-column>
                <el-table-column prop="price" label="价格" width="80" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" width="120" align="center" :formatter="formatStatus" ></el-table-column>
            </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="editOrderform" :model="editOrderform" label-width="70px">
                <el-input v-model="editOrderform.id" type="hidden"></el-input>
                <el-input v-model="editOrderform.status" value="1000" type="hidden"></el-input>
                <el-form-item label="表单名称" v-model="editOrderform.sku">
                   
                </el-form-item>
                <el-badg v-model="editOrderform.keyword" ></el-badg>
                
                <!-- <el-row v-model="editOrderform.addr" label="地址"></el-row>
                <el-table-row v-model="editOrderform.sku" label="sku"></el-table-row>
                <el-table-row v-model="editOrderform.keyword" label="关键词"></el-table-row> -->
                <el-form-item label="手机号">
                    <el-input v-model="editOrderform.tel" change="getAddr"></el-input>
                </el-form-item>
                <el-form-item label="订单号">
                    <el-input v-model="editOrderform.orderid"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="editOrderform.price"></el-input>
                </el-form-item>
                 <el-form-item label="手机编号">
                    <el-input v-model="editOrderform.telNo"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { OPorderListData } from '../../api/index';

export default {
    name: 'taskList',
    data() {
        return {
            query: {
            },
            tableData: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            editOrderform:{},
            multiShop: [],
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            OPorderListData(this.query).then(res => {
                console.log(res);
                this.tableData = res.data;
                this.pageTotal = res.pageTotal ;
            });

        },
        // 触发搜索按钮
        handleSearch() {
            this.getData();
        },
        editOrderList(row, event, column) {
            let oQuery={};
           // this.$set(oQuery, 'oids', row.oids);
// 　　　　　　 getOrderListData(oQuery).then(res => {
//                  console.log(res);
//                  this.orderListData=res.data;
//                  this.orderListVisible=true;
//             }).catch(() => {});
            this.editOrderform = row;
            this.editVisible = true;
        },
        getAddr(val) {
           if (val.length==11){}
        },
        // 保存编辑
        saveEdit() {
            taskEditData(this.editTaskform).then(res => {
                console.log(res);
                if(res==1)
                 {  
                    this.editVisible = false;
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    this.$set(this.tableData, this.idx, this.editTaskform);
                 }
                else {
                    this.$message.error('修改出错！');
                    console.log('error edit shop!!');
                    return false;
                }
            });
            
        }, 
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            taskSearchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.data;
                this.pageTotal = res.pageTotal ;
            });
        },
        formatDate(row, column) {
            // 获取单元格数据
                let data = row[column.property]
                if(data == null) {
                    return null
                }
                let dt = new Date(data)
                 return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
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
        formatStatus(row, column) {
            // 获取单元格数据
                let data = row[column.property];
                if(data == 2) return "任务被拉取";
                if(data==200) return "开始执行";
                if(data>=300 && data<400) return "执行第"+(data-300)+"个SKU";
                if(data==400) return "进入结算";
                if(data==401) return "已提交地址";
                if(data==800) return "进入付款";
                if(data==811) return "支付异常";
                if(data==500) return "已生成订单";
                if(data==1000) return "完成";
        },
        formatTaskType(row, column) {
            // 获取单元格数据
                let data = row[column.property];
                return this.taskTypes.find(x=>x.key==data).label;
        }
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
