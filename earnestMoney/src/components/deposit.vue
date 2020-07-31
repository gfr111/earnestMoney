<template>
    <div class="addBox" :style="{height:height}">
         <div class="headers">
            <div class="returnImg" @click="returnPage">
              <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/return.png" class="returnIcon"/>
            </div>
            <text class="title">定金收据</text>
            <text  style="font-size:34px;color: #ffffff;">保存</text>
        </div>
        <div class="depositBox">
            <div class="centerMess">
                <div class="centerNameBox">
                    <div style="width:56px;height:56px;border-radius:100px; margin-right: 30px;">
                         <image :src='orderMess.centerReceiptLogo||"https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/centerIcon.png"' class="centerIcon"/>
                    </div>
                    <text class="centerName">{{orderMess.centerName}}</text>
                </div>
                <div class="priceBox">
                    <text class="price">¥{{orderMess.amount}}</text>
                    <image class='depositLogo' :src='orderMess.centerReceiptSign' v-if="orderMess.centerReceiptSign!=''&&orderMess.centerReceiptSign!=null&&orderMess.centerReceiptSign!=undefiend"/>
                </div>
            </div>
            <div class="depositMess">
                <div class="depositItem">
                    <text class="depositMessName">会员</text>
                    <text class="depositMessContent">{{orderMess.traineeName}}（{{orderMess.traineePhone}}）</text>
                </div>
                <div class="depositItem">
                    <text class="depositMessName">定金类型</text>
                    <text class="depositMessContent">{{orderMess.depositType}}</text>
                </div>
                <div class="depositItem">
                    <text class="depositMessName">有效天数</text>
                    <text class="depositMessContent">{{orderMess.duration}}天</text>
                </div>
                <div class="depositItem">
                    <text class="depositMessName">支付方式</text>
                    <text class="depositMessContent">{{orderMess.payMethod}}</text>
                </div>
                <div class="depositItem">
                    <text class="depositMessName">支付时间</text>
                    <text class="depositMessContent">{{orderMess.paidTime}}</text>
                </div>
                <div class="depositItem">
                    <text class="depositMessName">收款人</text>
                    <text class="depositMessContent">{{orderMess.sellerName}}</text>
                </div>
                <div class="depositNote">
                    <text class="depositMessName">备注</text>
                    <text class="depositMessContent">{{orderMess.comment||'无'}}</text>
                </div>
            </div>
            <div class="codeBox">
                <image :src='serialNumBarCode' class="barCode"/>
                <text class="codeTxt">{{orderMess.serialNum}}</text>              
            </div>
        </div>
        <div class="checkCode" @click="showCode">
            <image src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/checkCode.png' class="codeIcon"/>
            <text class="checkCodeTxt">扫码查看</text>
        </div>
    </div> 
</template>
<style scoped>
.headers{
  width: 750px;
  height:88px;
  padding-left: 30px;
  padding-right: 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
}
.returnImg{
    width: 100px;
    height: 80px;
    flex-direction: row;
    align-items: center;
}
.title{
  font-size:34px;
  color: #53575A;
}
.nullBox{
  font-size:34px;
  color: #ffffff;
}
.returnIcon{
    width: 48px;
    height: 48px;
 }
 .depositBox{
     padding-left: 60px;
     padding-right: 60px;
     border-top-width: 20px;
     border-top-style: solid;
     border-top-color: #F5F4F9;
 }
 .centerMess{
     padding-bottom: 28px;
     border-bottom-color: #E1E1E1;
     border-bottom-style: solid;
     border-bottom-width: 1px;
 }
 .centerNameBox{
     margin-top: 40px;
     flex-direction: row;
     align-items: center;
 }
 .centerIcon{
     width: 56px;
     height: 56px;
    
 }
 .centerName{
     color: #000000;
     font-size: 32px;
 }
 .priceBox{
     flex-direction: row;
     justify-content: space-between;
     align-items: center;
 }
 .price{
     color: #000000;
     font-size: 52px;
     font-weight: 600;
     margin-top: 60px;
 }
 .depositLogo{
     width: 142px;
     height: 142px;
 }
 .depositItem{
     flex-direction: row;
     align-items: center;
     margin-bottom: 20px;
 }
 .depositMess{
     padding-bottom: 28px;
     border-bottom-color: #E1E1E1;
     border-bottom-style: solid;
     border-bottom-width: 1px; 
     padding-top:46px;
 }
 .depositNote{
     flex-direction: row;
      margin-bottom: 20px;
 }
 .depositMessName{
     width: 112px;
     margin-right: 52px;
     color: #888888;
     font-size: 28px;
 }
 .depositMessContent{
     color: #2E3D50;
     font-size: 28px;
     width: 460px;
     flex-wrap: wrap;
 }
 .codeBox{
     flex-direction: column;
     align-items: center;
     padding-top: 34px;
 }
 .barCode{
       width: 506px;
       height: 120px;
       background-color: #888888;
       margin-bottom: 10px;
 }
 .codeTxt{
     color: #2E3D50;
     font-size: 28px;
     margin-bottom: 44px;
 }
 .checkCode{
     width: 630px;
     height: 100px;
     flex-direction: row;
     align-items: center;
     justify-content: center;
     background-color: #474F60;
     box-shadow:0px 2px 6px 0px rgba(0,0,0,0.2);
     border-radius: 60px;
     position: absolute;
     bottom: 40px;
     left: 60px;
 }
 .codeIcon{
   width: 36px;
   height: 36px;
   margin-right: 18px;
 } 
 .checkCodeTxt{
   color: #ffffff;
   font-size: 32px;
 }
</style>
<script>
var nativeMoudle= weex.requireModule('nativeModule');
const storage = weex.requireModule("storage");  
var modal = weex.requireModule("modal");
var stream = weex.requireModule('stream'); 
export default {
      data: () => ({
         height:'',
         orderMess:'',
         traineeId:'',
         centerId:'',
         token:'',
        //  webHost:'http://10.0.0.12:8080',
        webHost:'https://www.forzadata.cn',
         traineePhone:'',
         serialNumBarCode:''
      }),
       created(){
              var that=this;      
              nativeMoudle.getMetaData(function(map){
                that.traineeId=map.traineeId;
                that.centerId=map.centerId;
                that.token=map.token;
                that.height = map.isPhoneBangseries? (750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-118):(750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-50);           
                if(map.serverUrl==''||map.serverUrl==null||map.serverUrl==undefined){
                  that.webHost='https://www.forzadata.cn';
                }else{
                  that.webHost=map.serverUrl;
                }
            });
            nativeMoudle.showProgressDialog();
            // nativeMoudle.toast(that.$route.query.depositId);
            
            setTimeout(() => {
               that.getmess(that.$route.query.depositId);
            }, 100);
             weex.requireModule('globalEvent').addEventListener('androidback', function (e) {  
                nativeMoudle.close();
            })
      },
      methods:{
        returnPage() {
            nativeMoudle.close();
            this.$refs.inputText.blur();
        },
        getmess(id){
            var me=this;
            var GET_URL = me.webHost+'/api/weex/deposit/'+me.centerId+'/'+id+'/receipt';
            stream.fetch({
            method: 'GET',
            url: GET_URL,
            type:'json',
            headers:{
                'X-AUTH-TOKEN':me.token
            }
            }, function(ret) {             
            if(ret.ok){
                nativeMoudle.progressDialogDismiss();
                if(ret.data.status==0){
                    var traineePhone=ret.data.data.traineePhone+'';
                    me.orderMess=ret.data.data;
                    me.serialNumBarCode=ret.data.data.serialNumBarCode.replace(/\s*/g,"");
                   if(ret.data.data.traineePhone!=''&&ret.data.data.traineePhone!=null&&ret.data.data.traineePhone!=undefined&&ret.data.data.traineePhone.indexOf('T')==-1){
                       me.traineePhone=traineePhone.replace(traineePhone.substring(3,7), "****");     
                   }else{
                         me.traineePhone=traineePhone;     
                   }       
                }else{
                   nativeMoudle.toast(ret.data.message);
                }      
            }else{
                nativeMoudle.toast('网络错误！');
            }
            },function(response){
                 
            });
        },
        showCode(){
            nativeMoudle.showQrCode(this.orderMess.h5);
        }
      }
}
</script>

