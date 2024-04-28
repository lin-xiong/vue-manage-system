<template>
    <div>
        <div class="container" style="padding:0px;">
            <el-select v-model="filterName" placeholder="请选择">
                <el-option v-for="item in nameFilters"
                :key="item.value"
                :label="item.text"
                :value="item.value">
                </el-option>
            </el-select>
            <el-table :data="filteredData"
                :default-sort = "{prop: 'name', order: 'descending'}" border class="table" ref="multipleTable" header-cell-class-name="table-header" :height="700" :stripe="true" >
                <el-table-column prop="id" label="序号" type="index" width="80" align="center"></el-table-column>
        
                <el-table-column prop="user" label="终端" width="80" align="center" sortable></el-table-column>
                <el-table-column prop="t" label="时间" width="180" align="center" :formatter="formatDate" sortable> </el-table-column>
                <el-table-column prop="log" label="日志信息"  align="left"></el-table-column>
            
            </el-table>
        </div>

    </div>
</template>

<script>

import * as signalR from '@microsoft/signalr';

export default {
    name: 'termiRunning',
    data() {
        return {
            tableData: [],
            nameFilters: [
                { text: '全部', value: '' },
                // { text: 'R01', value: 'R01' },
                // { text: 'R02', value: 'R02' },
            ],
            filterName: '',
            filteredData: [],
        };
    },
    created() {
        console.log("created"); 
        // alert(process.env.VUE_APP_API_TARGET);
        this.connection = new signalR.HubConnectionBuilder()
            // .withUrl("http://192.168.123.200:5001/loghub")
            .withUrl(process.env.VUE_APP_API_TARGET+"/loghub")
            .build();       

        this.connection.on("ReceiveMessage", (user, message) => {
            // this.tableData.push(message);
            let n=Object.assign({},{"user":user},message);
            this.tableData.unshift(n);
            // alert(this.nameFilters.some(x=>x.value==n.user))
            if (!this.nameFilters.some(x=>x.value==n.user))
            {
                this.nameFilters.push({"text":n.user,"value":n.user});
            }
            console.log(this.tableData); 
        });

        this.connection.start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection :('));
    },
    watch: {
        filterName() {
            this.filterData();
        },
        tableData(){
            this.filterData();
        }
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            
            
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
        filterData() {
            if (this.filterName) {
                this.filteredData = this.tableData.filter(item => item.user === this.filterName);
            } else {
                this.filteredData = this.tableData;
            }
        }
    },
    deactivated()
    {
    
    },
    activated(){
        
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
.left-align .cell {
  text-align: left !important;
}
</style>
