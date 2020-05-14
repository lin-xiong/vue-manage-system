<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 地址
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.Courier" placeholder="快递员" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-add" @click="handleAdd">添加</el-button>
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量失效</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
                :stripe="true"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="40" align="center"></el-table-column>
                <el-table-column prop="region" width="80" label="区域" align="center"></el-table-column>
                <el-table-column prop="city" width="80" label="城市" align="center"></el-table-column>
                <el-table-column prop="addr" label="地址" align="center"></el-table-column>
                <el-table-column prop="Courier" label="快递员" width="80" align="center"></el-table-column>
                <el-table-column prop="addrid" label="区域编号" width="80" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" width="70" align="center">
                    <template slot-scope="scope"> 
                        <span v-if="scope.row.status==1">使用中</span>
                        <span v-if="scope.row.status==0">失效</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="70" align="center" prop="status">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="editAddrform" :model="editAddrform" label-width="70px">
                <el-input v-model="editAddrform.id" type="hidden"></el-input>
                <el-form-item label="区域">
                    <el-input v-model="editAddrform.region"></el-input>
                </el-form-item>
                <el-form-item label="城市">
                    <el-input v-model="editAddrform.city"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="editAddrform.addr"></el-input>
                </el-form-item>
                <el-form-item label="快递员">
                    <el-input v-model="editAddrform.Courier"></el-input>
                </el-form-item>
                <el-form-item label="区域编号">
                    <el-input v-model="editAddrform.addrid"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="editAddrform.status"></el-input>
                </el-form-item>
                <!-- <el-radio v-for="(user, index) in users" :key="index" :label="user" :value="user">{{ `${user.name}(${user.age}岁)` }}
                </el-radio > -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 增加Addr弹出框 -->
        <el-dialog title="增加Addr" :visible.sync="addVisible" width="30%">
            <el-form ref="addAddrform" :model="addAddrform" label-width="70px">
                <el-form-item label="区域">
                    <el-input v-model="addAddrform.region"></el-input>
                </el-form-item>
                <el-form-item label="城市">
                    <el-input v-model="addAddrform.city"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="addAddrform.addr"></el-input>
                </el-form-item>
                <el-form-item label="快递员">
                    <el-input v-model="addAddrform.Courier"></el-input>
                </el-form-item>
                <el-form-item label="区域编号">
                    <el-input v-model="addAddrform.addrid"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { addrListData } from '../../api/index';
import { addrEditData } from '../../api/index';
import { addrSearchData } from '../../api/index';
import { addrAddData } from '../../api/index';

export default {
    name: 'shopList',
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
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            addrListData(this.query).then(res => {
                console.log(res);
                this.tableData = res.data;
                this.pageTotal = res.pageTotal ;
            });
            
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
            //this.delList = this.delList.concat(this.multipleSelection);
            //console.log(this.delList);
            for (let i = 0; i < length; i++) {
                this.multipleSelection[i].status=0;
                addrEditData(this.multipleSelection[i]).then(res => {
                //console.log(res);
                if(res==1)
                 {  
                    //this.$message.error(`删除了${str}`);
                 }
            });
            }
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
