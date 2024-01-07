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
            <div class="handle-box" style="padding:8px 0px 0px 5px;">
                <el-select v-model="query.shopId"  placeholder="选择店铺">
                    <el-option v-for="item in multiShop" :key="item.id" :label="item.shopName" :value="item.id" ></el-option>
                </el-select>
                <el-input v-model="query.salesSql" placeholder="商品信息" class="handle-input mr10"></el-input>
                <el-button style="margin-left:10px" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <input type="file" @change="handleFileUpload" />
                <el-button type="primary" icon="el-icon-cherry" @click="processData">导入</el-button>
                <el-button type="primary" icon="el-icon-cherry" @click="fileData">文件导入</el-button>
                <!-- <span style="padding:8px 0px 0px 5px;">总计:{{totalCount}}</span> -->
                <!-- <el-button type="primary" icon="el-icon-cold-drink" @click="chargeback">退单</el-button> -->
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
                <el-table-column prop="ks_id" label="快手号" width="110"  align="center"></el-table-column>
                <el-table-column prop="sp_id" label="商品编号" width="135"  align="center"></el-table-column>
                <el-table-column label="头像" width="120">
                    <template slot-scope="scope">
                        <img :src="scope.row.picUrl.split('\r\n')[0]" alt="avatar" style="width: 50px; height: 50px;"
                        v-tooltip="{ content: `<img src='${scope.row.picUrl.split('\r\n')[0]}' style='width: 400px;'>` }">
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="商品名" align="center"></el-table-column>
                <el-table-column prop="discription" label="简介" width="80" align="center"></el-table-column>
                <el-table-column prop="type" label="分类" width="120" align="center"></el-table-column> 
            
                <el-table-column prop="price" label="价格" align="center" width="90" ></el-table-column>
                <el-table-column prop="execCount" label="已发视频数" align="center" width="95" ></el-table-column>
                <el-table-column prop="status" label="状态" width="80" align="center">
                    <template slot-scope="scope"> 
                        <span v-if="scope.row.status==1">已执行</span>
                        <span v-if="scope.row.status==0">待执行</span>
                        <span v-if="scope.row.status==-100">不再执行</span>
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
                <el-form-item label="备注简称">
                    <el-input v-model="editShopform.shortName"></el-input>
                </el-form-item>
                <el-form-item label="佣金">
                    <el-input v-model="editShopform.commission"></el-input>
                </el-form-item>
                <el-form-item label="每区快递数">
                    <el-input v-model="editShopform.courierCount"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="editShopform.status"></el-input>
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
                <el-form-item label="备注简称">
                    <el-input v-model="addShopform.shortName"></el-input>
                </el-form-item>
                <el-form-item label="佣金">
                    <el-input v-model="addShopform.commission"></el-input>
                </el-form-item>
                <el-form-item label="每区快递数">
                    <el-input v-model="addShopform.courierCount"></el-input>
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
import { salesListData } from '../../api/index';
import { salesEditData } from '../../api/index';
import { salesSearchData } from '../../api/index';
import { salesAddData } from '../../api/index';
import { salesFileData } from '../../api/index';

import { shopListData } from '../../api/index';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';

export default {
    name: 'salesList',
    data() {
        return {
            query: {
                pageIndex: 1,
                pageSize: 20
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            editShopform:{},
            addShopform:{},
            multiShop: [],
            rowSalesform:{},
            form: {},
            idx: -1,
            id: -1,
            file:null
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            shopListData().then(res => {
                this.multiShop = res.data ;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            salesSearchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.data;
                this.pageTotal = res.pageTotal ;
            });
        },
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        processData() {
            if (!this.file) {
                alert('请先选择一个文件');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // 获取第一个工作表
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];

                // 将工作表转换为 JSON 对象数组
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                var rowcount=0;
                var rowerror=0;
                var rowright=0;
                var rows=[];
                // 遍历数据
                for (let row of jsonData) {
                    var sales={};
                    try {// 这里你可以处理每一行的数据  || rows.findIndex(rows[0])>0
                        if(row[0]=="商品ID" || (rows !=null && rows.some(x=>x.sp_id==row[0])))
                            continue;
                        rowright=rowright+1;
                        sales.sp_id=row[0];
                        sales.title=row[1];
                        sales.type=row[2];
                        sales.discription=row[3];
                        sales.picUrl=row[4];
                        sales.status=0;//row[5];
                        sales.price=row[9];
                        sales.ks_id=this.file.name;
                        rows.push(sales);
                        
                    } catch (error) {
                        rowerror=rowerror+1;    
                        console.error('处理第 ' + (jsonData.indexOf(row) + 1) + ' 行数据时发生错误：', error);
                        continue;
                    }
                }
                salesAddData(rows).then(res => {
                            // rowcount=rowcount+1;
                            alert('共完成数据：'+res+'条');
                        });
                        setTimeout(500);
                //console.log(rows);  
                console.log('共'+rowcount+'/'+rows.length+'有效数据被更新，总'+jsonData.length+'数据被导入,非法数据'+rowerror+'条');
            };
            reader.readAsArrayBuffer(this.file);
        },
        fileData(){
            // let formData = new FormData();
            // formData.append('file', this.file);

            // axios.post('http://your-backend-server.com/upload', formData, {
            //     headers: {
            //     'Content-Type': 'multipart/form-data'
            //     }
            // }).then(response => {
            //     console.log(response);
            // }).catch(error => {
            //     console.log(error);
            // });
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
