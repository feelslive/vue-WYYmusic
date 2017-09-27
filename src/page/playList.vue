<template>
	<div class="playlist">
		<div class="pl-tit" :style="{'background': 'rgba(206, 61, 62, '+ opacity +')'}" style="transition: opacity .1s;">
			<div class="pl-tit-left" @click="back()">
				<span>←</span>
			</div>
			<div class="pl-tit-text">
				<span>{{fname}}</span>
			</div>
		</div>
		<!--  :style="{backgroundImage:'url('+items.coverImgUrl+'?param=300y300)'}" -->
		<div class="playinfo">
			<div class="pl-info-pic">
				<span>{{items.playCount | sub}}</span>
				<img :src="items.coverImgUrl" alt="">
			</div>
			<div class="pl-info-intr">
				<p>{{items.name}}</p>
				<div class="intrpic">
					<div class="avapic">
						<img :src="cres.avatarUrl" alt="">
					</div>
					<span>{{cres.nickname}}</span>
				</div>
			</div>
			<div class="bg-mask"></div>
			<div class="bg-player" :style="{backgroundImage:'url('+items.coverImgUrl+')'}"></div>
		</div>
		
		<div class="playlist-holder">
			<div class="add-playall">
				<div class="playall">
					<i>+</i>
					<span>播放全部</span>
				</div>
			</div>
			<mu-circular-progress v-if="loding" :size="90" color="red"/>
			<div class="playall-list">
				<ul>
					<router-link :to="'/playDetail/'+track.id" tag='li' v-for='(track,index) in tracks' key='index'>
						<div class="tr-num">{{index+1}}</div>
						<div class="tr-name">
							<p>{{track.name}}</p>
							<span>{{track.ar[0].name}}</span>
						</div>
					</router-link>
				</ul>
			</div>
		</div>

	</div>
</template>

<script >
	export default {
		data(){
			return {
				items:"",
				cres:"",
				tracks:"",
				opacity:0,
				fname:"歌单",
				sname:'',
				loding:false,
				id:this.$route.params.id
			}
		},
		created(){
			//https://api.imjad.cn/cloudmusic/?type=playlist&id=809092896
	        this.loding=true
	        this.$http.get("https://api.imjad.cn/cloudmusic/?type=playlist&id="+this.id)
	          .then((res)=>{
	            this.items = res.body.playlist
	            this.sname = res.body.playlist.name
	            this.cres = res.body.playlist.creator
	            this.tracks = res.body.playlist.tracks
	            this.loding=false
	            //console.log(this.tracks)
	        },function(error){
	            console.log(error);
	        })
  		},
  		mounted(){
  			 window.onscroll = () => {
	        	console.log("滚动了")
		        var opa = window.pageYOffset / 150
		        if (opa > 0.5) {
		          this.fname = this.sname
		        } else {
		          this.fname = '歌单'
		        }
		        this.opacity = window.pageYOffset / 150
		    }
		    window.addEventListener('scroll',function(){ 
		    	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; 
		    	if(scrollTop>300){ //判断当滚到高度大于300时候 
		    		console.log('300'); //这里写要触发的事件 
				} 
			},true)
  		},
  		methods:{
  			back () {
		      this.$router.go(-1)
		    }
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
		}

	}
</script>

<style scoped lang="less">
.playlist {
	max-width: 720px;
	height: 100%;
	// overflow: hidden;
	margin: 0 auto;
	margin-bottom: 60px;
}
.pl-tit {
	font-size: .8rem;
	height:2.8rem;
	width:100%;
	max-width: 720px;
	color:#fff;
	z-index:30;
	line-height: 2.8rem;
	// background: #ce3d3e!important;
	position: fixed;
	display: flex;
	.pl-tit-left {
		flex:1;
	}
	.pl-tit-text {
		flex:4;
		text-align: left;
		overflow: hidden;
	}
}
.playinfo {
	height: 11.7rem;
	padding:3rem .5rem 0;
	color: #fff;
	position: relative;
	background-size: cover;
	display: flex;
	.pl-info-pic {
		width: 7rem;
		float: left;
		margin-top: .5rem;
		position: relative;
		overflow: hidden;
		span {
			position: absolute;
		    display: block;
		    padding-right: 5px;
		    width: 100%;
		    left: 0;
		    top: 0;
		    font-size: 12px;
		    text-align: right;
		    color:#fff;
		    background: rgba(0,0,0,.35);
		    z-index: 11;
		}
		img {
			max-width: 100%;
			height: auto;
		}
	}
	.pl-info-intr {
		// width:9rem;
		margin-left: 1rem;
		float: left;
		text-align: left;
		p {
			margin: .8rem 0;
		}
		.intrpic {
			.avapic {
				float: left;
				width:1.5rem;
				height: 1.5rem;
				img{
					border-radius: 50%;
					width:100%;
					height:100%;
				}
			}
			span {
				float: left;
				margin-left: .1rem;
				line-height: 1.5rem;
			}
			
		}
	}
	.bg-mask {
		position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    background-color: #292a2b;
	    background-color: rgba(0, 0, 0, 0.35);
	    z-index: -1;
	}
	.bg-player {
		position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    background-repeat: no-repeat;
	    background-size: cover;
	    background-position: bottom right;
	    filter: blur(40px);
	    -webkit-filter: blur(40px);
	    z-index: -1;
	}
}
.playlist-holder {
	// position: relative;
    background: #fff;
    z-index: 1;
}
.add-playall {
	text-align: left;
	font-size: .8rem;
	height: 1.8rem;
	line-height: 1.8rem;
	padding-left: 1rem;
	border-bottom: 1px solid #ededed;
}
.playall-list {
	li {
		width: 100%;
		display: flex;
		.tr-num {
			flex:1;
			font-size: .9rem;
			font-weight: bold;
			color: #999;
		}
		.tr-num:after {
	        display:inline-block;
	        width:0;
	        height:100%;
	        vertical-align:middle;
	        content:"";
	    }
		.tr-name {
			text-align: left;
			margin:0 .3rem .3rem 0;
			border-bottom: 1px solid #ededed;
			flex:4;
			overflow: hidden;
			p{
				margin-top: .8rem;
				font-size: .8rem;
			}
			span {
				color: #999;
				font-size: .6rem;
			}
		}
	}
}
    
</style>