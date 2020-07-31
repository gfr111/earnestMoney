<template>
    <div class="listBox" :style="{height:height}">
         <div class="headers">
            <div class="returnImg" @click="beforePage">
              <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/return.png" class="beforePage"/>
            </div>
            <text class="title">定金详情</text>
            <text style="font-size:34px;color: #ffffff;">保存</text>          
        </div>
        <list :style="{height:height-180}" class="listBox"> 
          <cell>
             <div class="detailBox">
                 <div class="memberMess" @click="showMember">
                       <div class="avatar">
                          <image :src="traineePhoto?traineePhoto:'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/defaultAvata.png'" class="avatarIcon"/>
                      </div>                 
                     <div class="messBox">
                         <div class="leftBox">
                             <text class="name">{{traineeName}}</text>
                             <text class="phone">{{traineePhone}}</text>
                         </div>
                         <div class="price">
                             <text style="color:#E7541E;font-size:28px;">¥ </text>
                             <text style="color:#E7541E;font-size:36px;">{{amount}}</text>
                         </div>
                     </div>
                 </div>
                 <div class="detailItem">
                     <text class="itemName">当前状态</text>
                     <text class="itemContent">{{status}}</text>
                 </div>
                  <div class="detailItem">
                     <text class="itemName">定金类型</text>
                     <text class="itemContent">{{usedType}}定金</text>
                 </div>
                  <div class="detailItem">
                     <text class="itemName">定金编号</text>
                     <text class="itemContent">{{contractSerialNum}}</text>
                 </div>
                  <div class="detailItem">
                     <text class="itemName">收款时间</text>
                     <text class="itemContent">{{payDate}}</text>
                 </div>
                  <div class="detailItem">
                     <text class="itemName">支付方式</text>
                     <text class="itemContent">{{payMethod?payMethod:''}}{{payMethod2?'、'+payMethod2:''}}</text>
                 </div>
                  <div class="detailItem">
                     <text class="itemName">有效天数</text>
                     <text class="itemContent">{{duration}}天</text>
                 </div>
                  <div class="detailItem">
                     <text class="itemName">到期日</text>
                     <text class="itemContent">{{expireDate}}</text>
                 </div>
                  <div class="detailItem">
                     <text class="itemName">备注</text>
                     <text class="itemContent">{{comment||'暂无备注'}}</text>
                 </div>
                 <div class="protocolBox">
                     <text class="protocolTitle">定金协议</text>
                     <div class="imgBox" v-if="protocolPhotos.length!=0">
                         <image :src="item" class="protocolImg" v-for="(item,index) in protocolPhotos" :key="index" @click="enlargePic(item)"/>
                     </div>
                     <text v-else style="margin-left:30px;" class="protocolTitle">暂无协议图片</text>
                 </div>
             </div>
          </cell>    
        </list>   
        <text class="checkOrder" @click="toDetail">查看收据</text>
        <div class="bg" :style="{height:height}" v-if="isPreview" @click="hidePreview">
          <image :src="previewImg" class="previewPic"/>
        </div>
    </div> 
</template>
<style scoped>
.bg{
    background-color:rgba(0, 0, 0, 0.6);
    position: absolute;
    left: 0;
    top:0;
    width: 750px;
    align-content: center;
    justify-content: center;
}
.previewPic{
  width: 680px;
  height: 650px;
  margin-left: 35px;
}
.listBox{
  background-color: #ffffff;
}
.headers{
  width: 750px;
  height:88px;
  padding-left: 30px;
  padding-right: 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-bottom-color: #f6f6ff;
  border-bottom-style: solid;
  border-bottom-width: 1px;
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
.beforePage{
    width: 48px;
    height: 48px;
 }
 .detailBox{
     padding-left: 30px;
     padding-right: 30px;
 }
 .memberMess{
     height: 180px;
     flex-direction: row;
     align-items: center;
     border-bottom-color: #f6f6ff;
     border-bottom-style: solid;
     border-bottom-width: 1px;
     margin-bottom: 40px;
 }
 .avatar{
     width: 80px;
     margin-right: 20px;
     height: 80px;
     border-radius: 100px;
 }
 .avatarIcon{
      width: 80px;
     height: 80px; 
     border-radius: 100px;
 }
 .messBox{
     width: 590px;
     flex-direction: row;
     align-items: center;
     justify-content: space-between;
 }
 .name{
     color: #303030;
     font-size: 30px;
 }
 .phone{
     color: #303030;
     font-size: 28px;
 }
 .price{
     flex-direction: row;
     align-items: center;
 }
 .detailItem{
     flex-direction: row;
     margin-bottom: 20px;
 }
 .itemName{
     color: #888888;
     font-size: 28px;
     margin-right: 42px;
     width: 120px;
 }
 .itemContent{
   color: #2E3D50;
   font-size: 28px;
   width: 460px;
 }
 .protocolBox{
     border-top-color: #f6f6ff;
     border-top-style: solid;
     border-top-width: 1px;
     margin-top: 20px;
     padding-top:40px;
 }
 .protocolTitle{
    color: #888888;
    font-size: 28px;
    margin-bottom: 20px; 
 }
 .imgBox{
     flex-direction: row;
     align-items: center;
 }
 .protocolImg{
    width: 160px;
    height: 160px;
    margin-right: 20px;
 }
 .checkOrder{
     width: 750px;
     height: 88px;
     text-align: center;
     line-height: 88px;
     background-color: #12C48B;
     color: #ffffff;
     font-size: 30px;
     position: absolute;
     bottom: 0;
 }
</style>
<script>
  var nativeMoudle= weex.requireModule('nativeModule');
  const storage = weex.requireModule("storage");  
  var stream = weex.requireModule('stream'); 
export default {
      data: () => ({
          height:'',               
          depositId:'',
        //   webHost:'http://10.0.0.12:8080',
         webHost:'https://www.forzadata.cn',
          token:'eyJuYW1lIjoi546L6JaHIiwicGhvbmUiOiIxNzY4MjMwNjYwMSIsImFjY291bnRJZCI6Nzk4MzksImltcGVyc29uYXRlZCI6ZmFsc2V9./820YzcQ7Eqx6EEnYAngCzuQjr3gtRjOzXtxb1tzXaA=',
          traineePhoto:'',
          traineeName:'',
          traineePhone:'',
          amount:'',
          status:'',
          usedType:'',
          contractSerialNum:'',
          payDate:'',
          expireDate:'',
          protocolPhotos:[],
          comment:'',
          payMethod:'',
          payMethod2:'',
          receiptUrl:'',
          duration:'',
          centerId:'',
          isPreview:false,
          previewImg:'',
          traineeId:''
      }),
       created(){
             var that=this;      
             
             that.depositId=JSON.stringify(that.$route.query.id);
             nativeMoudle.getMetaData(function(map){
                that.centerId=map.centerId;
                that.token=map.token;
                if(map.serverUrl==''||map.serverUrl==null||map.serverUrl==undefined){
                  that.webHost='https://www.forzadata.cn';
                }else{
                  that.webHost=map.serverUrl;
                }
                 that.height = map.isPhoneBangseries? (750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-118):(750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-50);  
             });
             nativeMoudle.showProgressDialog();  
            
             setTimeout(() => {
               that.getDetail();               
             }, 50); 
             weex.requireModule('globalEvent').addEventListener('androidback', function (e) {  
                this.$router.go(-1);
            })
      },
      methods:{  
           enlargePic(item){
            // nativeMoudle.toast('pic')
             this.isPreview=true;
             this.previewImg=item;
         },
           hidePreview(){
            this.isPreview=false;
        },
          beforePage(){
              this.$router.go(-1);
          },
          getDetail(){
                var that=this;                                                              
                stream.fetch({
                    method: 'GET',
                    url: that.webHost+'/api/weex/deposit/'+that.centerId+'/'+that.depositId+'/detail',
                    type:'json',
                    headers:{
                        "Content-Type": 'application/json',
                        'X-AUTH-TOKEN':that.token
                    }
                    }, function(ret) {
                    if(ret.ok){                                
                            if(ret.data.status==0){  
                                that.traineeId=ret.data.data.traineeId;                                 
                                that.traineePhoto=ret.data.data.traineePhoto; 
                                that.traineeName=ret.data.data.traineeName; 
                                that.traineePhone=ret.data.data.traineePhone; 
                                that.amount=ret.data.data.amount; 
                                that.status=ret.data.data.status; 
                                that.usedType=ret.data.data.usedType;  
                                that.contractSerialNum=ret.data.data.serialNum; 
                                that.payDate=ret.data.data.payDate;     
                                that.expireDate=ret.data.data.expireDate;
                                that.receiptUrl=ret.data.data.receiptUrl;
                                if(ret.data.data.protocolPhotos){
                                   that.protocolPhotos=ret.data.data.protocolPhotos;
                                } 
                                if(ret.data.data.payMethod){
                                     that.payMethod=ret.data.data.payMethod;
                                }
                                if(ret.data.data.payMethod2){
                                     that.payMethod2=ret.data.data.payMethod2;
                                }                           
                                that.comment=ret.data.data.comment;  
                                that.duration=ret.data.data.duration;                                                   
                            }else{
                                nativeMoudle.toast(ret.data.message)
                            }
                            nativeMoudle.progressDialogDismiss();
                    }else{
                        nativeMoudle.toast('网络错误！');
                    }
                
                    },function(response){
                    });
          },
          toDetail(){
              var that=this;
            //   nativeMoudle.toast(that.depositId);
               that.$router.push({name:'deposit',query:{depositId:that.depositId}}); 
          },
          showMember(){
             nativeMoudle.goToTraineeDetail(this.traineeId) 
          }
      }
}
</script>

