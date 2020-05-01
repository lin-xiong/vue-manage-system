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
                <el-input v-model="query.shopName" placeholder="商铺名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-add" @click="handleAdd">添加</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="shopId" :formatter="formatShopName" label="店铺名"></el-table-column>
                <el-table-column prop="sku" label="sku"></el-table-column>
                <el-table-column prop="keyword" label="关键词"></el-table-column>
                <el-table-column prop="count" label="单量" width="50"></el-table-column>
                <el-table-column prop="exeDate" :formatter="formatDate" label="执行日期" width="110"></el-table-column>
                <el-table-column prop="area" label="地区" width="100"></el-table-column>

                <el-table-column label="操作" width="70" align="center" prop="status">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <br />
                        <el-button
                            type="text"
                            icon="el-icon-share"
                            class="red"
                            @click="handleExe(scope.$index, scope.row)"
                            v-show="scope.row.status==1"
                        >执行</el-button>
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
            <el-form ref="editTaskform" :model="editTaskform" label-width="70px">
                <el-input v-model="editTaskform.id" type="hidden"></el-input>
                <el-form-item label="sku">
                    <el-input v-model="editTaskform.sku"></el-input>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input v-model="editTaskform.keyword"></el-input>
                </el-form-item>
                <el-form-item label="执行日期">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="执行日期"
                                v-model="editTaskform.exeDate"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                <el-form-item label="单量">
                    <el-input v-model="editTaskform.count"></el-input>
                </el-form-item>
                <el-form-item label="地区">
                    <el-input v-model="editTaskform.area"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="editTaskform.status"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 增加Task弹出框 -->
        <el-dialog title="增加Task" :visible.sync="addVisible" width="30%">
            <el-form ref="addTaskform" :model="addTaskform" label-width="70px">
                <el-form-item label="选择店铺">
                    <el-select v-model="addTaskform.shopId"  placeholder="请选择">
                        <el-option v-for="item in multiShop" :key="item.id" :label="item.shopName" :value="item.id" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="sku">
                    <el-input v-model="addTaskform.sku"></el-input>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input v-model="addTaskform.keyword"></el-input>
                </el-form-item>
                <el-form-item label="执行日期">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="执行日期"
                                v-model="addTaskform.exeDate"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                <el-form-item label="单量">
                    <el-input v-model="addTaskform.count"></el-input>
                </el-form-item>
                <el-form-item label="地区">
                    <el-input v-model="addTaskform.area"></el-input>
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
import { taskListData } from '../../api/index';
import { taskEditData } from '../../api/index';
import { taskSearchData } from '../../api/index';
import { taskAddData } from '../../api/index';
import { shopListData } from '../../api/index';

import { taskExeData } from '../../api/index';
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
            editTaskform:{},
            addTaskform:{},
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
            shopListData().then(res => {
                console.log(res);
                this.multiShop = res.data ;
            });
            taskListData(this.query).then(res => {
                console.log(res);
                this.tableData = res.data;
                this.pageTotal = res.pageTotal ;
            });
            
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            taskSearchData(this.query).then(res => {
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
                taskExeData(row).then(res => {
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
            this.editTaskform = row;
            this.editVisible = true;
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
        handleAdd(){
            this.addVisible = true;
        },
        // 保存添加
        saveAdd() {
            taskAddData(this.addTaskform).then(res => {
                console.log(res);
                if(res==1)
                 {  
                    this.addVisible = false;
                    this.$message.success(`增加Task成功`);
                    this.getData();
                 }
                else {
                    this.$message.error('增加Task出错！');
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
