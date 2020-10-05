<template>
    <div>
        <div class="container" style="padding:0px;">
            <div style="padding:8px 0px 0px 5px; ">
                <el-select v-model="retrunQuery.shopName"  placeholder="选择店铺">
                    <el-option v-for="item in multiShop" :key="item.id" :label="item.shopName" :value="item.shopName" ></el-option>
                </el-select>
                <el-input v-model="retrunQuery.courier" placeholder="快递员" class="handle-input mr10" style="width:200px"></el-input>
                <el-button style="margin-left:10px" type="primary" icon="el-icon-search" @click="handleHHSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-add" @click="setReturn">寄回</el-button>
                <el-button type="primary" icon="el-icon-add" @click="returnGoods">物流列表</el-button>
            </div> 
           
            <div class="container" style="padding:0px; width:78%; float:left;">
            <el-table :data="orderTableData" :default-sort = "{prop: 'courier' , exeTime: 'asc'}" border class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange" :height="700" :stripe="true" id="orderTable" >
                <el-table-column prop="id1" label="序号" type="index" width="50" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
                <el-table-column prop="shopName"  label="店铺名称" width="180" align="center"></el-table-column>
                <el-table-column prop="sku"  label="SKU" width="210" align="center"></el-table-column>
                <el-table-column prop="courier"  label="快递员" width="115" align="center"></el-table-column>
                <el-table-column prop="orderid"  label="订单号" width="120" align="center"></el-table-column>
                <el-table-column prop="exeTime"  label="执行时间" align="center" width="100" :formatter="formatDate"></el-table-column>
                <el-table-column prop="addr" label="收货地址" align="center" :formatter="formatAddr"></el-table-column>
                <el-table-column type="selection" width="55" align="center"></el-table-column>
            </el-table>
           </div>
            <div class="container" style="padding:0px; width:18%; float:right;">
            <el-table :data="courierTableData" border class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange" :stripe="true" id="orderTable" >
                <el-table-column prop="courier"  label="快递员" width="270" align="center"></el-table-column>
                <el-table-column prop="count"  label="件数" align="center" width="50"></el-table-column>
            </el-table>
            </div>
        </div>
   <!-- 回收货物操作弹出框 -->
<el-dialog title="回寄设置" :visible.sync="setReturnVisible" width="30%">
            <el-form ref="setReturnform" :model="setReturnform" label-width="70px">
                <el-form-item label="店铺名称">
                    <el-input v-model="setReturnform.shopName" readonly="true"></el-input>
                </el-form-item>
                 <el-form-item label="sku">
                    <el-input v-model="setReturnform.sku" type="textarea" rows="5"></el-input>
                </el-form-item>
                <!-- <el-select v-model="setReturnform.sku"  placeholder="选择sku">
                    <el-option v-for="item in setReturnform.skus" :key="item.sku" :label="item.sku" :value="item.sku" ></el-option>
                </el-select> -->
                <el-form-item label="快递员">
                    <el-input v-model="setReturnform.courier" readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="回寄信息">
                    <el-input v-model="setReturnform.returnAddr" type="textarea" rows="5"></el-input>
                </el-form-item>
                <el-form-item label="回寄日期">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="回寄日期"
                                v-model="setReturnform.returnTime"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                </el-form-item>
                <el-form-item label="操作单号">
                    <el-input v-model="setReturnform.Oids" type="textarea" rows="2" readonly="true"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setReturnVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveReturnform">确 定</el-button>
            </span>
        </el-dialog>

      <!-- 物流列表 -->
        <el-dialog title="物流列表" :visible.sync="returnVisible" width="80%">
            <div class="container" style="padding:0px;">
            <div class="handle-box" style="padding:8px 0px 0px 5px;">
                
                <el-input v-model="query.courier" placeholder="快递员" class="handle-input mr10"></el-input>
                <el-input v-model="query.sku" placeholder="sku" class="handle-input mr10"></el-input>
                <el-button style="margin-left:10px" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table :data="goodsTableData" :default-sort = "{prop: 'returnTime', status: 'asc'}" border class="table" ref="multipleTable" header-cell-class-name="table-header" :height="550" :stripe="true" 
             @row-click="getOrderList" id="goodsListTable">
                <el-table-column prop="oids" v-if="false"></el-table-column> 
                <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
                <el-table-column prop="shopName"  label="店铺名称" align="center" width="150"></el-table-column>
                <el-table-column prop="sku"  label="SKU" align="center" width="150" ></el-table-column>
                <el-table-column prop="returnAddr"  label="回寄信息" align="center"></el-table-column>
                <el-table-column prop="courier"  label="快递员" align="center"></el-table-column>
                <el-table-column label="进度" width="120" align="center" prop="status">
                    <template slot-scope="scope">
                        <el-span v-show='scope.row.status==1' >途中</el-span>
                        <el-span v-show='scope.row.status==10' >已完成</el-span>
                        <el-button type="text" icon="el-icon-lx-copy" @click="handleGot(scope.$index, scope.row)" 
                         v-show='scope.row.status==1' >收到</el-button>
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
        </el-dialog>
        <!-- 详细订单弹出框 -->
        <el-dialog title="详细订单" :visible.sync="orderListVisible">
            <div class="container" style="padding:0px; ">
            <el-table :data="orderListData" :default-sort = "{prop: 'exeTime'}" border class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange" :height="700" :stripe="true" id="orderTable" >
                <el-table-column prop="id1" label="序号" type="index" width="50" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
                <el-table-column prop="shopName"  label="店铺名称" width="180" align="center"></el-table-column>
                <el-table-column prop="sku"  label="SKU" width="210" align="center"></el-table-column>
                <el-table-column prop="courier"  label="快递员" width="115" align="center"></el-table-column>
                <el-table-column prop="orderid"  label="订单号" width="120" align="center"></el-table-column>
                <el-table-column prop="price"  label="价格" width="70" align="center"></el-table-column>
                <el-table-column prop="exeTime"  label="执行时间" align="center" width="100" :formatter="formatDate"></el-table-column>
                <el-table-column prop="addr" label="收货地址" align="center" :formatter="formatAddr"></el-table-column>
            </el-table>
           </div>
        </el-dialog>
    </div>
</template>

<script>
import { goodsEditData } from '../../api/index';
import { goodsSearchData } from '../../api/index';
import { goodsAddData } from '../../api/index';
import { shopListData } from '../../api/index';
import { orderSearchData } from '../../api/index';
import { getOrderListData } from '../../api/index';

import FileSaver from 'file-saver';
import XLSX from 'xlsx';
export default {
    name: 'exportOrderData',
    data() {
        return {
            query: {
                status:1,
                pageIndex: 1,
                pageSize: 10
            },
            retrunQuery:{
                pageIndex: 1,
                pageSize: 10
                },
            orderTableData: [],
            goodsTableData: [],
            multipleSelection: [],
            orderListData:[],
            delList: [],
            returnVisible: false,
            addVisible: false,
            setReturnVisible:false,
            orderListVisible:false,
            pageTotal: 0,
            setReturnform:{
                //returnTime:Date
            },
            courierTableData: [],
            multiShop: [],
            multiHHShop: [],
            form: {},
            idx: -1,
            id: -1,
            setTimer:null,
            getDataOnce:true,
            multiShop: [],
            totalCount:0
        };
    },
    created() {
        console.log("created"); 
        if(!this.getDataOnce) return;
        this.getDataOnce=false;
        this.handleHHSearch();
        this.getData();
    },
    methods: {
        getData() {
            shopListData().then(res => {
                console.log(res);
                this.multiShop = res.data ;
                this.multiHHShop = res.data ;
                var allshop= {id:0,shopName:'全部'};
                this.multiShop.splice(0,0,allshop);
            });
            
        },
        // 触发搜索按钮
        handleSearch() {
            //this.$set(this.query, 'pageIndex', 1);
            console.log(this.query); 
            if (this.query.shopName=='全部')
                this.$set(this.query, 'shopName', '');
            goodsSearchData(this.query).then(res => {
                console.log(res);
                this.goodsTableData = res.data;
                this.totalCount=res.data.length;
            });
        },
        // 触发搜索按钮
        handleHHSearch() {
            //this.$set(this.query, 'pageIndex', 1);
            console.log(this.retrunQuery); 
            orderSearchData(this.retrunQuery).then(res => {
                console.log(res);
                this.orderTableData = res.data;
                this.courierTableData=[];
                console.log(res.data.length);
                res.data.forEach(item=>{
                    var isok=false;
                    for(let v of this.courierTableData){
                        if(v.courier==item.courier){
                        isok=true;v.count+=1;
                        }
                    }
                    if(!isok){
                        this.courierTableData.push({"courier":item.courier,"count":1});
                    }
                });
                console.log(this.courierTableData);
                //this.pageTotal = res.pageTotal ; 
            });
        },
        // 回收货物操作
        returnGoods(index, row) {
            this.returnVisible = true;
        },
        // 回收货物设置操作
        setReturn(index, row) {
            const length = this.multipleSelection.length;
            if (length<=0)
            {
                this.$alert("请选择归集货品订单");
                return ;
            }
            let str = '';
            let shopNames='';
            this.delList = this.delList.concat(this.multipleSelection);
            //this.setReturnform=this.multipleSelection[0];
            //this.setReturnform.sku=this.retrunQuery.sku;
            let skuList=[];
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].id + ',';
                shopNames+=this.multipleSelection[i].shopName + ',';
                let _skus=this.multipleSelection[i].sku.split('+');
                for(let j = 0; j < _skus.length; j++){
                    let _sku=_skus[j].split('@');
                    let _count=1;
                    if (_sku.length==2 ){
                        _count=Number(_sku[1]);
                    }
                    let _s=skuList.find(x=>x.sku==_sku[0]);
                    if (null==_s){
                        skuList.push({sku:_sku[0],count:_count});
                    }else{
                        _s.count+=_count;
                    }
                }
            }
            console.log(skuList);
            let skustring='';
            skuList.forEach(function (item,index,input) {
                skustring+=item.sku+"数量:"+item.count+"\r";
            });
            this.setReturnform.sku=skustring;
            this.setReturnform.Oids=str.substring(0,str.length-1);
            this.setReturnform.shopName=shopNames.substring(0,shopNames.length-1);
            this.setReturnform.courier=this.retrunQuery.courier;
            this.multipleSelection = [];
            this.setReturnVisible = true;
        },
        // 回收货物设置操作
        saveReturnform(index, row) {
            console.log(this.setReturnform)
            if (!this.setReturnform.sku)
            {
                this.$alert("请规范指定sku");
                return ;
            }
            if (!this.setReturnform.courier)
            {
                this.$alert("请规范指定快递员");
                return ;
            }
            if (!this.setReturnform.returnTime)
            {
                this.$alert("请选择回寄日期");
                return ;
            }
            let oidslen=this.setReturnform.Oids.split(',').length;
           // 二次确认执行
            this.$confirm('确定回寄'+oidslen+'件商品吗？', '提示', {
                type: 'warning'
            }).then(res => {
                goodsAddData(this.setReturnform).then(res => {
                    console.log(res);
                    if(res==1){
                        this.retrunQuery.sku=null;
                        this.retrunQuery.courier=null;
                        this.handleHHSearch();
                        this.setReturnVisible = false;
                        this.returnVisible = false;
                        this.$message.success('执行成功');
                    }
                });
            }).catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleGot(index, row){
            row.status=10;
            goodsEditData(row).then(res => {
                 console.log(res);
                    if(res==1){}
            }).catch(() => {});
        },
        getOrderList(row, event, column) {
            let oQuery={};
            this.$set(oQuery, 'oids', row.oids);
　　　　　　 getOrderListData(oQuery).then(res => {
                 console.log(res);
                 this.orderListData=res.data;
                 this.orderListVisible=true;
            }).catch(() => {});

        }, 
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        formatDateTime(row, column) {
            // 获取单元格数据
            let data = row[column.property]
            if(data == null) {
                return null
            }
            let dt = new Date(data)
            return dt.getFullYear() + '-' + (dt.getMonth() +1) + '-' + dt.getDate()+" "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
        },
        formatDate(row, column) {
            // 获取单元格数据
            let data = row[column.property]
            if(data == null) {
                return null
            }
            let dt = new Date(data)
            return dt.getFullYear() + '-' + (dt.getMonth() +1) + '-' + dt.getDate();
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
                let arr = data.split('地址：');
                if (arr)
                    return arr[1];
                else
                    return data;
        },
        formatStatus(row, column) {
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
        //定义导出Excel表格事件
        exportExcel() {
        /* 从表生成工作簿对象 */
        var wb = XLSX.utils.table_to_book(document.querySelector("#goodsListTableExport"),{raw:true});
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
