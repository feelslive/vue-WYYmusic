<template>
  <div class="rmlist">
    <div class="rmhead">
      <span><i class='m-icon'></i>推荐歌单</span>
      <router-link to='/home/songList/'>更多></router-link>
    </div>
    <mu-circular-progress v-if="loding" :size="90" color="red"/>
    <ul class='m-playlist'>
      <router-link tag="li" :to="'/playList/'+item.id" v-for="(item,index) in items" key="index">
        <span>{{item.playCount | sub}}</span>
        <img :src="item.coverImgUrl" alt="">
        <p v-rainbow>{{item.name | slc}}</p>
      </router-link>
    </ul>
      <div class="rmhead">
        <span><i class='m-icon'></i>推荐歌单</span>
        <router-link to='/home/songList/'>更多></router-link>
      </div>
      <ul class='m-playlist'>
        <router-link tag="li" :to="'/playList/'+item.id" v-for="(item,index) in itemsmv" key="index">
          <span>{{item.playCount | sub}}</span>
          <img :src="item.coverImgUrl" alt="">
          <p v-rainbow>{{item.name | slc}}</p>
        </router-link>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'rmlist',
  data () {
    return {
      items:"",
      itemsmv:"",
      loding:false,
    }
  },
  created(){
      this.loding=true
      this.$http.get("http://musicapi.duapp.com/api.php?type=topPlayList&offset=0&limit=6")
          .then((res)=>{
            this.items = res.body.playlists
            console.log(this.items)
            this.loding=false
      })
      this.loding=true
      this.$http.get("http://musicapi.duapp.com/api.php?type=topPlayList&offset=7&limit=6")
          .then((res)=>{
            this.itemsmv = res.body.playlists
            console.log(this.items)
            this.loding=false
      })
  },
  filters:{
    sub(val){
      if(val>=10000){
        return parseInt(val/10000)+"万"
      }else {
        return val
      }
      
    },
    slc(str){
      return str.slice(0,14);
    }
  },
  directives:{
    'rainbow':{
      bind(el,binding,vnode){
         el.style.color = "#" + Math.random().toString(8).slice(2,8);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.rmhead {
  display: flex;
  justify-content: space-between;
  font-size: .8rem;
  padding: 0 .5rem;
  margin: .2rem 0;
    span {
      line-height: 1.2rem;
      .m-icon {
      display: inline-block;
      width:1.2rem;
      height:1.2rem;
      margin-right: .1rem;
      background:url('../../static/img/aei.png') no-repeat;
      background-size: cover;
      vertical-align: bottom;
      }
    }
    a {
      margin-right: .2rem;
      color: #ce3d3e;
      font-size: .7rem;
    }
    
}
.m-playlist {
  overflow: hidden;
  display: flex;
  flex-wrap:wrap;
  padding: 0 .5rem;
  li {
    width:31%;
    margin: 1.1%;
    position: relative;
    span {
      position: absolute;
      display: block;
      width:100%;
      color:#fff;
      text-align: right;
      padding-right: .5rem;
      background:rgba(0,0,0,.2);
    }
    img {
      width:100%;
      height: auto;
    }
    p{
      font-size: .7rem;
      text-align: left;
    }
  }
}
</style>
