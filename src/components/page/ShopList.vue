<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 店铺
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="q.shopName" placeholder="商铺名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="nameSearch">搜索</el-button>
                <el-select v-model="q.status"  placeholder="状态">
                    <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                </el-select>    
                <el-button type="primary" icon="el-icon-search" @click="statusSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-add" @click="handleAdd">添加</el-button>
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
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="shopName" label="店铺名" align="center"></el-table-column>
                <!-- <el-table-column prop="shortName" label="备注简称" width="120" align="center"></el-table-column> -->
                <el-table-column prop="tel" label="电话" align="center" width="150" ></el-table-column>
                <el-table-column prop="ks_Id" label="对应快手号" align="center" width="150" ></el-table-column>
                <el-table-column prop="ks_SMR" label="快手实名人" align="center" width="100" ></el-table-column>
                <el-table-column prop="shop_SMR" label="店铺实名人" align="center" width="100" ></el-table-column>
                <el-table-column prop="execCountDay" label="今天已发布" align="center" width="120" sortable></el-table-column>
                <el-table-column prop="maxExecDay" label="最大执行数" align="center" width="95" ></el-table-column>
                <el-table-column prop="status" label="状态" width="80" align="center">
                    <template slot-scope="scope"> 
                        <span v-if="scope.row.status==1">生效</span>
                        <span v-if="scope.row.status==0">失效</span>
                        <span v-if="scope.row.status==-1">待激活</span>
                    </template>
                </el-table-column>
            
                <el-table-column label="操作" width="180" align="center">
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
            <el-form ref="editShopform" :model="editShopform" label-width="90px">
                <el-input v-model="editShopform.id" type="hidden"></el-input>
                <el-form-item label="店铺名称">
                    <el-input v-model="editShopform.shopName"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="editShopform.tel"></el-input>
                </el-form-item>
                <el-form-item label="对应快手号">
                    <el-input v-model="editShopform.ks_Id"></el-input>
                </el-form-item>
                <el-form-item label="快手实名人">
                    <el-input v-model="editShopform.ks_SMR"></el-input>
                </el-form-item>
                <el-form-item label="店铺实名人">
                    <el-input v-model="editShopform.shop_SMR"></el-input>
                </el-form-item>
                <el-form-item label="当日最大执行量">
                    <el-input v-model="editShopform.maxExecDay"></el-input>
                </el-form-item>
                <!-- <el-form-item label="状态">
                    <el-input v-model="editShopform.status"></el-input>
                </el-form-item> -->
                <el-form-item label="状态">
                    <el-select v-model="editShopform.status" placeholder="请选择状态">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 增加商户弹出框 -->
        <el-dialog title="增加商户" :visible.sync="addVisible" width="30%">
            <el-form ref="addShopform" :model="addShopform" label-width="90px">
                <el-form-item label="店铺名称">
                    <el-input v-model="addShopform.shopName"></el-input>
                </el-form-item>
                <!-- <el-form-item label="优惠券">
                    <el-input v-model="addShopform.youHuiQuan"></el-input>
                </el-form-item> -->
                <el-form-item label="手机">
                    <el-input v-model="addShopform.tel"></el-input>
                </el-form-item>
                <el-form-item label="对应快手号">
                    <el-input v-model="addShopform.ks_Id"></el-input>
                </el-form-item>
                <el-form-item label="快手实名人">
                    <el-input v-model="addShopform.ks_SMR"></el-input>
                </el-form-item>
                <el-form-item label="店铺实名人">
                    <el-input v-model="addShopform.shop_SMR"></el-input>
                </el-form-item>
                <el-form-item label="当日最大执行量">
                    <el-input v-model="addShopform.maxExecDay"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="addShopform.status"></el-input>
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
import { shopListData } from '../../api/index';
import { shopEditData } from '../../api/index';
import { shopSearchData } from '../../api/index';
import { shopGetStatusData } from '../../api/index';
import { shopAddData } from '../../api/index';

export default {
    name: 'shopList',
    data() {
        return {
            query: {
                pageIndex: 1,
                pageSize: 30
            },
            q:{shopName:"",
                status:{ label: '待激活', value: '-1' }
            },
            tableData: [],
            statusOptions: [ // 状态选项
                { label: '生效', value: '1' },
                { label: '待激活', value: '-1' }
                // { label: '失效', value: '-100' }
                // 更多状态...
            ],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            editShopform:{},
            addShopform:{},
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
            shopListData(this.query).then(res => {
                console.log(res);
                this.tableData = res.data;
                this.pageTotal = res.pageTotal ;
            });
        },
        // 触发搜索按钮
        nameSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.$set(this.query, 'shopName', this.q.shopName);
            shopSearchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.data;
                this.pageTotal = res.pageTotal ;
            });
        },
        // 触发搜索按钮
        statusSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.$set(this.query, 'status', this.q.status);
            shopGetStatusData(this.query).then(res => {
                console.log(res);
                this.tableData = res.data;
                this.pageTotal = res.pageTotal ;
            });
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
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
            this.editShopform = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            shopEditData(this.editShopform).then(res => {
                console.log(res);
                if(res==0)
                 {  
                    this.editVisible = false;
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    this.$set(this.tableData, this.idx, this.editShopform);
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
            shopAddData(this.addShopform).then(res => {
                console.log(res);
                if(res>=1)
                 {  
                    this.addVisible = false;
                    this.$message.success(`增加商铺成功`);
                    this.getData();
                 }
                else {
                    this.$message.error('增加商铺出错！');
                    console.log('error add shop!!');
                    return false;
                }
            });
            
        }, 
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            shopSearchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.data;
                this.pageTotal = res.pageTotal ;
            });
        },
        formatCourierCount(row, column) {
            // 获取单元格数据
                let data = row[column.property];
                if(data == 0)
                    return "全部";
                else
                    return "每区分配"+data+"个快递";
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
