<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 店铺
                </el-breadcrumb-item>
                <el-breadcrumb-item>添加店铺</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="shopForm" :model="shopForm" label-width="130px">
                    <el-form-item label="店铺名称">
                        <el-input v-model="shopForm.shopName"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="shopForm.tel"></el-input>
                    </el-form-item>

                    <el-form-item label="优惠券二维码地址">
                        <el-input v-model="shopForm.youHuiQuan"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确定添加</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { addShopData } from '../../api/index';
export default {
    name: 'AddShop',
    data() {
        return {
            shopForm: {
                shopName: '',
                tel: '',
                youHuiQuan: '',
                action:'',
                method:'post'
            },
            rules: {
                shopName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
            }
        };
    },
    methods: {
        onSubmit() {
             this.$refs.shopForm.validate(valid => {
                if (valid) {
                    addShopData(this.form).then(res => {
                        console.log(res);
                        if(res)
                         {  
                            this.$message.success('提交成功！');
                         }
                    });
                }
             });      
        }
    }
};
</script>