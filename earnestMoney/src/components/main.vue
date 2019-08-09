<template>
    <div class="addBox" :style="{height:height}">
         <div class="headers">
            <div class="returnImg" @click="beforePage">
              <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/return.png" class="beforePage"/>
            </div>
            <text class="title">办理定金</text>
            <text class="nullBox" v-if="!hasHandsels">保存</text>
            <image src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/editPro.png' class="eidtPros" v-else  @click="edit"/>
        </div>
        <div class="addContent" v-if="!hasHandsels">
            <div class="addContentTop">
              <div class="addItemBox" style="border-top-width:0;">         
                   <text class="warning">*</text>
                    <div class="messCon">                              
                      <text class="leftTxt">定金金额（元）</text>   
                      <div class="rightBox">
                        <input placeholder="请输入定金金额" class="moneyInput" ref="inputText" type="number"  placeholder-color='#A3A3A3;' v-model="depositMoney"/>
                      </div>
                  </div>
              </div>
               <div class="addItemBox">
                    <text class="warning">*</text>
                    <div class="messCon">                              
                      <text class="leftTxt">定金类型</text>   
                      <div class="rightBox" @click="selectCourseStyle">
                        <text class="courseType">{{usedType==1?'会员卡':usedType==2?'私教课':'培训课'}}</text>
                        <image src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/blackRight.png' class="rightIcon" />
                      </div>       
                  </div>
              </div>
               <div class="addItemBox">         
                   <text class="warning">*</text>
                    <div class="messCon">                              
                      <text class="leftTxt">有效天数（天）</text>   
                      <div class="rightBox">
                        <input placeholder="请输入有效天数" ref="inputText" class="moneyInput" type="number"  placeholder-color='#A3A3A3;' v-model="depositDay"/>
                      </div>
                  </div>
              </div>
               <div class="protocolBox">
                  <text class="protocolTitle">协议</text>
                  <div class="imgBox">
                      <div class="imgAdds" v-for="(item,index) in photoArray" :key="index">
                        <image class="showPhoto"  :src="item+'?x-oss-process=image/resize,h_200'"/>    
                        <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/deletePro.png" class="cancel" @click="clearImg(index)"/>    
                      </div>
                      <div class="imgAdds"  v-if="photoArray.length<3"  @click="pickImg">
                        <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/icon_plus.png" class="addPhoto" />
                      </div>
                    </div>
              </div>
              <div class="noteBox">
                <text class="noteTitle">备注</text>
                 <textarea class="textarea" placeholder-color='#A3A3A3;' ref="inputText" @input="oninput" placeholder="请输入备注内容" maxlength="100" v-model="note"></textarea>
              </div>
            </div>      
        </div>
        <div class="hasHandsel" v-else>
            <div class="messItems"  >
               <text class="messName">定金金额（元）</text>
               <text class="messContent">{{depositMess.amount||'--'}}元</text>
            </div>
            <div class="messItem">
               <text class="messName">定金类型</text>
               <text class="messContent">{{depositMess.usedType==1?'会员卡':depositMess.usedType==2?'私教课':'培训课'}}</text>
            </div>
            <div class="messItem">
               <text class="messName">有效天数（天）</text>
               <text class="messContent">{{depositMess.duration}}天</text>
            </div>
            <div class="procotolMess" v-if="depositMess.photos.length!=0">
              <text class="procotolTitle">协议</text>
              <div class="imgBox">
                <div class="imgAdds" v-for="(item,index) in depositMess.photos" :key="index">
                    <image class="showPhoto"  :src="item"/>            
                </div>
              </div>
            </div>
            <div class="noteMess">
              <text class="procotolTitle">备注</text>
              <text class="noteCon">{{depositMess.comment||'无'}}</text>
            </div>
        </div>
        <div class="bg"  v-if="isShow" :style="{height:height}" @click="emptyClick">
            <div class="selectBox">
                <div class="selectHeader">
                    <text class="dispire" @click="hideList">取消</text>
                    <text class="titles">定金类型</text>
                    <text class="finish" @click="getItem">完成</text>
                </div>
                <list class="scrollers">
                    <cell v-if="(isShow)">
                        <div class="lists" v-for="(item,index) in list" :key="index" @click="chooseItem(item.value)" >
                            <text :class="[item.checked?'select':'contents']">{{item.title}}</text>
                        </div>
                    </cell>
                </list>          
            </div>
        </div> 
        <div class="bg"  v-if="isPay" :style="{height:height}" @click="emptyClick">
            <div class="payMethodBox">
              <div class="payMethodTitle">
                  <text class="payTitle" style="font-weight:600;">请选择支付方式</text>
                  <image src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/greyCancel.png' class="hidePayBtn" @click="hidePay"/>
              </div>
              <div class="payMethodTitle">
                  <text class="payTitle">支付金额</text>
                  <text class="payTitle" style="color:#FD5000;">¥{{depositMess.amount}}</text>
              </div>
              <div class="payBox">
                  <div class="methodStyle" @click="pay(1)">
                      <image class="payIcon" src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/wechat.png'/>
                      <div class="parRight">
                          <text class="payName">微信</text>
                          <text class="scanCode">扫码支付</text>
                      </div>
                  </div>
                  <div class="methodStyle" @click="pay(2)">
                      <image class="payIcon" src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/alipay.png'/>
                      <div class="parRight">
                          <text class="payName">支付宝</text>
                          <text class="scanCode">扫码支付</text>
                      </div>
                  </div>
              </div>
            </div>
        </div> 
        <div class="bg centerBg"  v-if="showPayCode" :style="{height:height}" @click="emptyClick">
           <div class="codeBox">
               <div class="qrCodeTop">
                   <div class="codeTitle">
                        <text class="nullBox" style=" width: 32px;">12</text>
                        <text class="payName" style="font-size:36px;">扫码支付</text>
                        <image src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/greyCancel.png' class="hidePayBtn" @click="hidePaycode"/>
                    </div>
                     <div class="codePriceBox">
                        <text style="color:#323232;font-size:32px;">支付：</text>
                        <text style="color:#FD5000;font-size:36px;">¥{{depositMess.amount}}</text>
                    </div>
               </div>
               <div class="qrCodeBox">
                   <image :src='qrCodeLink' class="qrCode"/>
               </div>
               <div class="supportPayBox">
                  <text class="supportTxt">支持以下方式</text>   
                  <view class="payMethodsIcon">
                    <image class="payIcon" src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/wechat.png' style="margin-right:30px;"/>
                    <image class="payIcon" src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/alipay.png'/>
                  </view>
                </div>          
                <div class="buttonBox">
                    <text class="dispireBtn" @click="hidePaycode">取消</text>
                    <text class="payFinish" @click="payResults">已支付</text>
                </div>
           </div>
        </div> 
       <div class="postBox"  v-if="!hasHandsels" :style="{visibility: componentVisibility}" @click="sunmitChange">
          <text class="postBtn">提交</text>
       </div>
        <div class="postBox"  v-if="!isFinish&&hasHandsels"  @click="toPay" :style="{visibility: componentVisibility}">
          <text class="postBtn">发起付款</text>
       </div>
    </div> 
</template>
<style scoped>
.supportPayBox{
  align-items: center;
  justify-content: center;
}
.supportTxt{
    color: #323232;
    font-size: 28px;
    margin-bottom:20rpx;
}
.payMethodsIcon{
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 40rpx;
}
.textarea{
    height: 200px;
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
  color: #F5F5F5;
}
.beforePage{
    width: 48px;
    height: 48px;
 }
.addContent{
  border-top-color: #F6F6F6;
  border-top-style: solid;
  border-top-width: 1px;
}
.addContentTop{
  margin-left: 20px;
}
.addItemBox{
  height: 96px;
  align-items: center;
  flex-direction: row;

}
.leftBox{
   align-items: center;
  flex-direction: row;
}
.rightBox{
   align-items: center;
   flex-direction: row;
   margin-right: 40px;
}
.courseType{
  color: #2E3D50;
  font-size: 30px;
  margin-right: 10px;
}
.rightIcon{
width: 32px;
height: 32px;;
}
.warning{
  color: #FB6666;
  font-size: 30px;
  margin-right: 12px;
    margin-left: 10px;
}
.leftTxt{
    color: #2E3D50;
    font-size: 30px;
}
.moneyInput{
  width: 210px;
  font-size: 30px;
  text-align: right;
  align-items: center;
  padding-right: 2px;
  height: 90px;
  text-indent: 6px;
}
.cancel{
    width: 30px;
    height: 30px;
    position: absolute;
    top:-1px;
    right: -1px;
}
.messCon{
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: #E1E1E1;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  width: 700px;
  height: 96px;
}
.bg{
    background-color:rgba(0, 0, 0, 0.6);
    position: absolute;
    left: 0;
    top:0;
    width: 750px;
}
.centerBg{
  align-items: center;
  justify-content: center;
}
.selectBox{
    width: 750px;
    background-color: #ffffff;
    position: absolute;
    bottom: 0;
}
.selectHeader{
    padding-left:20px;
    width: 730px;
    height: 100px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    background-color: #ffffff;
    border-bottom-color: #E7E7E7;
    border-bottom-style: solid;
    border-bottom-width: 1px;
}
.dispire{
    font-size: 32px;
    color: #828282;
}
.finish{
    font-size: 32px;
    color: #12C48B;
}
.titles{
      font-size: 32px;
      color: #2A3E49;
}
.lists{
    width:750px;
    height: 80px;
    justify-content: center;
    align-items: center;

}
.contents{
    font-size:30px; 
    color: #CCCCD1;
    border-bottom-color:#E7E7E7;
    border-bottom-style: solid;
    border-bottom-width: 1px; 
}
.select{
     font-size:34px; 
     color: #575757;
     border-bottom-color:#E7E7E7;
     border-bottom-style: solid;
     border-bottom-width: 1px; 
}
.scrollers{
    width: 750px;
    height:400px;
    padding-top:80px;
    background-color: #ffffff;
}
.imgBox{
    flex-direction: row;
}
.imgAdds{
       margin-bottom: 20px;
       align-items: center;
       flex-direction: row;
       width:180px;
       height: 180px;
       margin-right: 40px;
}
.showPhoto{
      width:160px;
      height: 160px;
}
.addPhoto{
    width:160px;
    height: 160px;
}
.protocolBox{
    border-bottom-color:#E7E7E7;
    border-bottom-style: solid;
    border-bottom-width: 1px; 
    padding-top:18px;
    padding-bottom: 48px;
    margin-left: 40px;
}
.protocolTitle{
  color: #2E3D50;
  font-size: 30px;
  margin-bottom: 20px;
}
.postBox{
    height: 88px;
    width: 750px;
    background-color: #12C48B;
    position: absolute;
    bottom: 0;
    align-items: center;
    justify-content: center;
  }
  .postBtn{
    color: #ffffff;
    font-size: 30px;
  }
  .noteBox{
    padding-top: 28px;
    padding-left: 45px;
  }
  .noteTitle{
    color: #2E3D50;
    font-size: 30px;
    margin-bottom: 8px;
  }
  .eidtPros{
    width: 40px;
    height: 40px;
  }
  .traineeMess{
    height: 180px;
    align-items: center;
    flex-direction: row;
  }
  .traineeImg{
    width: 140px;
    height: 140px;
    margin-right: 20px;
    margin-left: 46px;
  }
  .rightItem{
    margin-bottom: 10px;
    color: #464646;
    font-size: 28px;
  }
  .messItem{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 96px;
    margin-left: 50px;
    width: 700px;
    border-top-color:#E1E1E1;
    border-top-style: solid;
    border-top-width: 1px; 
    padding-right: 40px;
  }
  .messItems{
     flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 96px;
    margin-left: 50px;
    width: 700px;
    padding-right: 40px;
  }
  .messName{
    color: #2E3D50;
    font-size: 30px;
  }
  .messContent{
    color: #2E3D50;
    font-size: 30px;
  }
  .procotolMess{
    border-top-color:#E1E1E1;
    border-top-style: solid;
    border-top-width: 1px; 
    margin-left: 50px;
    width: 700px;
    padding-top:20px;
    padding-bottom: 48px;
  }
  .procotolTitle{
    color: #2E3D50;
    font-size: 30px;
    margin-bottom: 12px;

  }
  .noteMess{
    border-top-color:#E1E1E1;
    border-top-style: solid;
    border-top-width: 1px; 
    margin-left: 50px;
    width: 700px;
    padding-top: 20px;
  }
  .noteCon{
    color: #2E3D50;
    font-size: 30px;
  }
  .payMethodBox{
    background-color: #ffffff;
    padding-top:40px;
    padding-bottom: 80px;
    position: absolute;
    bottom: 0;
    opacity: 1;
    width:750px;
  }
  .payMethodTitle{
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 60px;
      padding-right: 40px;
  }
  .codeTitle{
      width: 570px;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      padding-right: 40px;
      padding-left: 40px;
  }
  .qrCodeTop{
      background-color: #F5F5F5;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
  }
  .codeBox{
    background-color: #ffffff;
    width:570px;
    border-radius: 8px;
  }
  .payTitle{
    color: #323232;
    font-size: 32px;
    margin-left: 40px;
  }
  .hidePayBtn{
      width: 32px;
      height: 32px;
  }
  .payBox{
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-left: 40px;
      padding-right: 40px;
  }
  .methodStyle{
      width: 320px;
      height: 140px;
      background-color: #F6F6F6;
      border-radius: 16px;
      flex-direction: row;
      align-items: center;
      justify-content: center;
  }
  .payIcon{
      width: 80px;
      height: 80px;
  }
  .parRight{
      height: 80px;
      justify-content: space-between;
  }
  .payName{
      color: #323232;
      font-size: 32px;
  }
  .scanCode{
        color: #ABA7AA;
      font-size: 26px;
  }
  .qrCodeBox{
    width: 570px;
    height: 290px;
    margin-top:60px;
    justify-content: center;
    align-items: center;
  }
  .qrCode{
     width: 290px;
     height: 290px; 
     margin-bottom: 20rpx;
  }
  .codePriceBox{
      flex-direction: row;
    justify-content: center;
      align-items: center;
      margin-bottom: 16px;
      margin-top: 20px;
  }
  .buttonBox{
    flex-direction: row;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #E9E9E9;
    width: 570px;
  }
  .dispireBtn{
     width: 286px;
     line-height: 100px;
     text-align: center;
     color: #A3A3A3;
     font-size: 32px;
     border-right-width: 1px;
     border-right-style: solid;
     border-right-color: #E9E9E9;
     border-bottom-left-radius: 16px;
  }
  .payFinish{
     width: 286px;
     line-height: 100px;
     text-align: center;
     color: #0279FF;
     font-size: 32px; 
     border-bottom-right-radius: 16px;
  }
</style>
<script>
var imageModule= weex.requireModule('image');
var uploadModule= weex.requireModule('transfer');
var nativeMoudle= weex.requireModule('nativeModule');
const storage = weex.requireModule("storage");  
 var modal = weex.requireModule("modal");
var stream = weex.requireModule('stream'); 
export default {
      data: () => ({
          isShow: false,
          height:'',
          list: [  { title: '私教课', value: 2,checked: true},
                   { title: '培训课', value: 3, checked: false},
                   { title: '会员卡', value: 1, checked: false}],
          depositMess:'',    
        //   webHost:'http://10.0.0.12:9090',
          webHost:'https://www.forzadata.cn',
          traineeId:'1529520',
          photoArray:[],
          isUploading:false,
          centerId:269,
          isFocus:'',
          token:'eyJuYW1lIjoi5qKB5pWZ57uDIiwicGhvbmUiOiIxNTg4ODgzMDg0OCIsImFjY291bnRJZCI6NTMxNDM0LCJpbXBlcnNvbmF0ZWQiOmZhbHNlfQ==.ditfYWGgTu0/eoSa7Da/b8eKihB7qttr9qQGA10Ok/A=',
          addPhoto:"",
          rigthPhoto:'',
          clearPhoto:'',
          hasHandsels:null,
          isPay:false,
          componentVisibility:'visible',
          showPayCode:false,
          coachAPP:true,
          depositMoney:'',
          depositDay:'',
          note:'',
          usedType:'',
          payMess:'',
          isFinish:false,
          qrCodeLink:''
      }),
       created(){
              var that=this;      
              nativeMoudle.getMetaData(function(map){
                that.traineeId=map.traineeId;
                that.centerId=map.centerId;
                that.token=map.token;
                that.coachAPP=map.coachAPP;
            });
            nativeMoudle.showProgressDialog();
            that.height = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-50;
            setTimeout(() => {
                that.getmess();
            }, 50);
             weex.requireModule('globalEvent').addEventListener('androidback', function (e) {  
                nativeMoudle.close();
            })
      },
      methods:{
        emptyClick(){},
        beforePage() {
            if(!this.hasHandsels){
               this.$refs.inputText.blur();
            }
            setTimeout(()=>{
                nativeMoudle.close();
            },50)
        },
        edit(){
            this.$router.push('edit');
        },
        sunmitChange(){
            var that=this;
            nativeMoudle.showProgressDialog();
            var URL = that.webHost+'/api/weex/deposit/'+that.centerId+'/'+that.traineeId;
            var arr=JSON.stringify({
                    orderSource:that.coachAPP?'4':'2',
                    duration:that.depositDay,
                    amount:that.depositMoney,
                    usedType:that.usedType,
                    photos:that.photoArray,
                    id:that.hasHandsels?that.depositMess.id:'',
                    comment:that.note  
                })  
             stream.fetch({
                method: 'POST',
                url: URL,
                type:'json',
                headers:{
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN':that.token
                },
                body:arr
                }, function(ret) {
                   if(ret.ok){
                       nativeMoudle.progressDialogDismiss();
                        if(ret.data.status==0){
                            nativeMoudle.toast('提交成功！');
                            setTimeout(() => {
                                 that.getmess();
                            }, 500);
                        }else{
                         nativeMoudle.toast(ret.data.message);
                        }
                   }else{
                       nativeMoudle.toast('网络错误！')
                   }
               
                },function(response){
            }); 
        },
        getmess(){
            var me=this;
            var GET_URL = me.webHost+'/api/weex/deposit/'+me.centerId+'/'+me.traineeId;
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
                    if(ret.data.data==null){
                         me.hasHandsels=false;
                         if(me.coachAPP){
                             me.usedType=2;
                         }else{
                             me.usedType=1;
                         }
                    }else{
                        me.hasHandsels=true;
                        me.depositMess=ret.data.data;
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
        pickImg(){
             this.$refs.inputText.blur();
             var that=this;
             var length=3-that.photoArray.length;
            imageModule.pickImage({
                limit:length,
                showCamera: false
            }, function(ret){
               if(ret.paths.length==0){
                    return;
                }
                var item = ret.paths.pop();
                that.uploadImg(item,ret.paths);
                weex.requireModule('nativeModule').toast("上传中");
            })
        },
        uploadImg(item,paths){   
            var that = this;
            var URL = that.webHost+'/api/fitnessCenter/'+that.centerId+'/image';
            var requestData = {
                url:URL,
                path:item,
                method:'POST',
                header:{'X-AUTH-TOKEN':that.token},
                headers:{'X-AUTH-TOKEN':that.token},
                formData:{file:item,keyword:"center-deposit"}
            }
            uploadModule.upload(JSON.stringify(requestData),function(ret){
                if(JSON.parse(ret.data).status==0){
                    var a=JSON.parse(ret.data).data.url;  
                    that.photoArray.push(a);
                    if(paths.length==0){
                        return;
                    }
                    item = paths.pop();
                    that.uploadImg(item,paths);
                }else{  
                 weex.requireModule('nativeModule').toast(JSON.parse(ret.data).message);         
                }
            })
        },
        selectCourseStyle () {
            this.isShow = !this.isShow;
            this.componentVisibility='hidden';
            this.$refs.inputText.blur();  
            if(this.usedType==2){
               this.list[0].checked=true;
               this.list[1].checked=false;
               this.list[2].checked=false;
            }else if(this.usedType==3){
                this.list[1].checked=true;
                this.list[0].checked=false;
                this.list[2].checked=false;
            }else if(this.usedType==1){
                this.list[2].checked=true;
                this.list[0].checked=false;
                this.list[1].checked=false;
            }
        }, 
        hideList(){
           this.isShow = !this.isShow;
           this.componentVisibility='visible';
        },
        getItem(){
          var that=this;
          for(var i=0,len=that.list.length;i<len;i++){
             if(that.list[i].checked){
                that.usedType=that.list[i].value;
             }
          }
           that.isShow = !that.isShow;
           that.componentVisibility='visible';
        },
       chooseItem(id){
           var that=this;
           for(var i=0,len=that.list.length;i<len;i++){
             if(that.list[i].value==id){
                 that.list[i].checked=true;
             }else{
                 that.list[i].checked=false
             }
          }
       },
        oninput (event) {
            this.note=event.value;
        },
       sumbitRecord(){
        this.$refs.inputText.blur();
        var me=this;
        var GET_URL;
        var arr;
         GET_URL = me.webHost+'/api/saleConsultant/member/'+me.centerId+'/followup/add';
        arr=JSON.stringify(
                {
                    type:me.followId,
                    dialStatus:me.phoneId,
                    photos:me.photoArray,
                    serviceType:me.relationId,
                    content:me.content,
                    traineeId:me.traineeId,
                    dialReserve:false
        })  
        me.sumbit(GET_URL,arr);
       },
       sumbit(GET_URL,arr){
           var that=this
                stream.fetch({
                    method: 'POST',
                    url: GET_URL,
                    type:'json',
                    headers:{
                        "Content-Type": 'application/json',
                        'X-AUTH-TOKEN':that.token
                    },
                    body:arr
                    }, function(ret) {
                    if(ret.data.status==0){
                        modal.toast({
                            'message': "添加成功",
                            'duration':0.2
                        })
                        that.$router.push('/');
                    }else{
                        modal.toast({
                            'message': "请输入内容！",
                            'duration': 1
                        })
                    }
                    },function(response){
                });
       },
       clearImg(index){
         this.photoArray.splice(index, 1);
       },
       toPay(){
        //    this.isPay=true;
             this.showPayCode=true;
           this.componentVisibility='hidden';
            nativeMoudle.showProgressDialog();
           this.pay(1);
       },
       hidePay(){
        //    this.isPay=false;
            this.showPayCode=false;
           this.componentVisibility='visible';
       },
        pay(payMethod){
            var me=this;        
            var payNum=payMethod==1?'010':'020'
            var GET_URL = me.webHost+'/api/weex/deposit/'+me.centerId+'/getPreDepositPayOrder/'+me.depositMess.id+'/'+payNum;
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
                    me.isPay=false;
                    me.showPayCode=true;
                    // if(payMethod=='1'){
                    // me.payStyle='微信支付';    
                    // }else{
                    // me.payStyle='支付宝支付';    
                    // }   
                    //  nativeMoudle.toast(ret.data.data.qrCodeLink);                 
                    if(ret.data.data.depositId!=''&&ret.data.data.depositId!=null&&ret.data.data.depositId!=undefined){
                          me.$router.push({name:'deposit',query:{id:ret.data.data.depositId}});
                    }else{
                         me.payMess=ret.data.data;
                         me.qrCodeLink=ret.data.data.qrCodeLink.replace(/\s*/g,"");
                    }
                }else{
                    nativeMoudle.toast(ret.data.message);
                }      
            }else{
                nativeMoudle.toast('网络错误！')
            }
            },function(response){
                    
            });
        },
       hidePaycode(){
        this.componentVisibility='visible';
        this.showPayCode=false;
       },
         //查询支付结果
       payResults(){
          nativeMoudle.showProgressDialog();
          this.loader(0);
        //    this.$router.push({name:'deposit',query:{id:71125}});
       },
       loader(i){
            i++;
            var that=this;
            stream.fetch({
            method:"GET",
            type:'json',
            url:that.webHost+'/api/weex/deposit/'+that.centerId+'/order/'+that.payMess.orderId+'/status',
            headers:{
                "Content-Type": 'application/json',
                'X-AUTH-TOKEN':that.token
            }
         }, function(ret) {
           if(!ret.ok){
               nativeMoudle.toast('请求失败');
           }else{
              if(ret.data.status==0){
               if(ret.data.data.paid){ 
                   nativeMoudle.progressDialogDismiss();                         
                    setTimeout(()=>{
                       that.$router.push({name:'deposit',query:{id:ret.data.data.depositId}});
                    },1000)
               }else{
                   nativeMoudle.progressDialogDismiss();
                   nativeMoudle.toast('支付失败，请重新支付！');
                   that.componentVisibility='visible';
                   that.showPayCode=false;
               }
            }else{
              if(i>15){
                  nativeMoudle.progressDialogDismiss();
                 nativeMoudle.toast('支付超时');
                 that.componentVisibility='visible';
                 that.showPayCode=false;
                 return;
              }else{
                setTimeout(function(){
                    that.loader(i);
                },1000)
              }
            }
           }
        })
       },
      },
      watch:{
      '$route'(){
          this.created();
      }
    }
}
</script>

