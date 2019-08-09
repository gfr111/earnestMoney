<template>
    <div class="addBox" :style="{height:height}">
         <div class="headers">
            <div class="returnImg" @click="returnPage">
              <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/return.png" class="returnIcon"/>
            </div>
            <text class="title">办理定金</text>
            <image src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/delete.png' class="eidtPros" @click="deleteOrder"/>
        </div>
        <div class="addContent" >
            <div class="addContentTop">
              <div class="addItemBox">         
                   <text class="warning">*</text>
                    <div class="messCon">                              
                      <text class="leftTxt">定金金额（元）</text>   
                      <div class="rightBox">
                        <input placeholder="请输入定金金额" class="moneyInput" type="number" @focus="isShow=false"  placeholder-color='#A3A3A3;' v-model="depositPrice" @change="getDepositPrice"/>
                        <text  class="courseType" >元</text>
                      </div>
                  </div>
              </div>
               <div class="addItemBox">
                    <text class="warning">*</text>
                    <div class="messCon">                              
                      <text class="leftTxt">定金类型</text>   
                      <div class="rightBox" @click="selectCourseStyle">
                        <text class="courseType">{{usedType==1?'会员卡':usedType==2?'私教课':'培训课'}}</text>
                        <image src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/blackRight.png' class="rightIcon"/>
                      </div>
                  </div>
              </div>
               <div class="addItemBox">         
                   <text class="warning">*</text>
                    <div class="messCon">                              
                      <text class="leftTxt">有效天数（天）</text>   
                      <div class="rightBox">
                        <input placeholder="请输入有效天数" class="moneyInput" type="number" @focus="isShow=false" placeholder-color='#A3A3A3;' v-model="depositDay" @change="getDepositDay"/>
                        <text  class="courseType">天</text>
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
                 <textarea class="textarea" @focus="isShow=false" ref="inputText" @input="oninput" placeholder="请输入备注内容" maxlength="100" v-model='content'></textarea>
              </div>
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
        <div class="bg deletePop" :style="{height:height}"  v-if="(isDelete)" @click="emptyClick">
                <div class="deletePopBox">
                <text class="deletePopTitle">提示</text>  
                <text class="deletePopContent">· 确认要删除该订单？</text>
                <div class="deleteBtnBox">
                    <text class="cancelDelete" @click="cancelDeleteEvent">取消</text>
                    <text class="submitDelete" @click="submitCancelEvent">确定</text>
                </div>
                </div>  
        </div> 
       <div class="postBox" :style="{visibility: componentVisibility}" @click="sunmitChange">
          <text class="postBtn">提交</text>
       </div>
    </div> 
</template>
<style scoped>
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
  color: #ffffff;
}
.returnIcon{
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
.selectBox{
    width: 750px;
    background-color: #ffffff;
    position: absolute;
    bottom: 0;
     width: 750px;
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
    color: #A3A3A3;
    font-size: 30px;
  }
  .deletePop{
  justify-content: center;
  align-content: center;
}
.deletePopBox{
  width:620px;
  height: 320px;
  border-radius: 16px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  opacity:1;
  flex-direction: column;
  margin-left: 64px;
}
.deleteBtnBox{
  flex-direction: row;
  justify-content: flex-start;
  background-color: #ffffff;
  border-top-color: #E9E9E9;
  border-top-style: solid;
  border-top-width: 1px;
  width:620px;
  border-bottom-left-radius:16px;
  border-bottom-right-radius: 16px; 

}
.cancelDelete{
  width: 310px;
  height: 90px;
   line-height: 90px;
  border-right-color: #E9E9E9;
  border-right-style: solid;
  border-right-width: 1px;
  color: #A3A3A3;
  font-size: 32px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  border-bottom-left-radius:16px;
}
.submitDelete{
  width: 309px;
  height: 90px;
   line-height: 90px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  color: #13C38C;
  text-align: center;
  font-size: 32px;
  flex-direction: column;
   border-bottom-right-radius: 16px; 

}
.deletePopTitle{
  color: #323232;
   width:620px;
  font-size: 36px;
  margin-top: 30px;
  margin-bottom: 40px;
  background-color: #ffffff;
  font-weight: 600;
  text-align: center;
}
.deletePopContent{
  margin-bottom: 60px;
  text-align: center;
   width:620px;
  color: #323232;
  font-size: 36px;
  background-color: #ffffff;
}
.cancel{
    width: 30px;
    height: 30px;
    position: absolute;
    top:-1px;
    right: -1px;
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
          list: [  { title: '私教课', value: 2,checked: false},
                   { title: '培训课', value: 3, checked: false},
                    { title: '会员卡', value: 1, checked: false}],   
         webHost:'http://10.0.0.116:8080',
        //   webHost:'https://www.forzadata.cn',
          traineeId:'1529520',
          photoArray:[],
          isUploading:false,
          centerId:269,
          content:null,
          isFocus:'',
          token:'eyJuYW1lIjoi5qKB5pWZ57uDIiwicGhvbmUiOiIxNTg4ODgzMDg0OCIsImFjY291bnRJZCI6NTMxNDM0LCJpbXBlcnNvbmF0ZWQiOmZhbHNlfQ==.ditfYWGgTu0/eoSa7Da/b8eKihB7qttr9qQGA10Ok/A=',
          addPhoto:"",
          rigthPhoto:'',
          clearPhoto:'',
          depositPrice:'',
          depositDay:'',
          usedType:null,
          componentVisibility:'visible',
          depositId:null,
          isDelete:false,
          coachAPP:true

      }),
       created(){
              var that=this;      
              nativeMoudle.getMetaData(function(map){
                that.traineeId=map.traineeId;
                that.centerId=map.centerId;
                that.token=map.token;
                that.coachAPP=map.coachAPP;
            });
            that.height = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-50;
            setTimeout(() => {
                that.getmess();
            }, 50);
             weex.requireModule('globalEvent').addEventListener('androidback', function (e) {  
               that.$router.go(-1);
            })
      },
      methods:{
          emptyClick(){

          },
        returnPage() {
            this.$router.go(-1);
            this.$refs.inputText.blur();
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
                if(ret.data.status==0){
                   me.content=ret.data.data.comment==null?'':ret.data.data.comment;
                   me.depositPrice=ret.data.data.amount;
                   me.depositDay=ret.data.data.duration;
                   me.usedType=ret.data.data.usedType;
                   me.photoArray=ret.data.data.photos;
                   me.depositId=ret.data.data.id;
                   if(me.usedType==2){
                       me.list[0].checked=true;
                   }else if(me.usedType==3){
                       me.list[1].checked=true;
                   }else if(me.usedType==1){
                       me.list[2].checked=true;
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
        deleteOrder(){
           this.isDelete=true;
           this.componentVisibility='hidden';
        },
        cancelDeleteEvent(){
         this.isDelete=false;
         this.componentVisibility='visible';
      },
       submitCancelEvent(){
            var that=this;
             nativeMoudle.showProgressDialog();
            stream.fetch({
                method:"DELETE",
                type:'json',
                url:that.webHost+'/api/weex/deposit/'+that.centerId+'/preDeposit/'+that.depositId,
                headers:{
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN':that.token
                }
            }, function(ret) {
                if(ret.ok){
                    nativeMoudle.progressDialogDismiss();
                    if(ret.data.status==0){
                        that.isDelete=false; 
                        nativeMoudle.toast('删除成功');    
                        setTimeout(() => {
                            that.$router.go(-1);
                        }, 1000); 
                        }else{
                           that.isDelete=false; 
                           nativeMoudle.toast(ret.data.message);  
                        }
                }else{
                     that.isDelete=false; 
                    nativeMoudle.toast('网络错误！'); 
                }
                
            })
       },
        sunmitChange(){
            var that=this;
            nativeMoudle.showProgressDialog();
            var URL = that.webHost+'/api/weex/deposit/'+that.centerId+'/'+that.traineeId;
            var arr=JSON.stringify({
                    orderSource:that.coachAPP?'4':'2',
                    duration:that.depositDay,
                    amount:that.depositPrice,
                    usedType:that.usedType,
                    photos:that.photoArray,
                    id:that.depositId,
                    comment:that.content  
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
                                that.$router.go(-1);
                            }, 1000);
                        }else{
                         nativeMoudle.toast(ret.data.message);
                        }
                   }else{
                       nativeMoudle.toast('网络错误！')
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
            var GET_URL = that.webHost+'/api/center/trainee/'+that.traineeId+'/followUp/image';
            var requestData = {
                url:GET_URL,
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
        oninput (event) {
            this.content=event.value;
        },
        getDepositPrice(event){
          this.depositPrice=event.value;
        },
         getDepositDay(event){
          this.depositDay=event.value;
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
       }
      }
}
</script>

