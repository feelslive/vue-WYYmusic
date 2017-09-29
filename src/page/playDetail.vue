<template>
	<div class="playerDetail">
		
		<div class="content">
			<div class="player-wrapper">
				<div class="player-inner">
					<div class="mu-appbar">
						<!-- 上一步 -->
						<div class="left" @click="back()">
							<span></span>
						</div>
						<!-- 歌名 -->
						<div class="mu-appbar-title">
							<div class="play-title">
								<div class="play-name">
									<span>{{itempics.name}}</span>
								</div>
								<div class="play-singer">{{itemar.name}}</div>
							</div>
						</div>
						<!-- 分享 -->
						<div class="right">
							<span></span>
						</div>
					</div>
					<div class="bar-line"></div>
					<div class="mu-flexbox main mu-flex-col">
						<audio :src="items.url" autoplay="autoplay" id="audio" loop="loop" ref='audio'></audio>
						<div class="mu-flexbox-item" style="flex: 1 1 auto; order: 0;">
							<div class="cd-holder">
								<div class="stick" :class="{cdplay:!playing}">
									
								</div>
								<div class="cd-wrapper" :class="{cdrotate:!playing}">
									<div class="cd-mask"></div>
									<img :src="itemal.picUrl" alt="">
								</div>
							</div>
							
						</div>
						<div class="mu-flexbox-item bottom-wrapper">
							<!-- 歌词 -->
							<div class="lyric-holder">
				                <div class="lrc-inner" style="transition: -webkit-transform 0.3s ease-out; transform-origin: 0px 0px 0px;" :style="{'transform':' translate3d(0px,'+ lrcOffset +'px, 0px)'}">
				                  <p v-for="(item, index) in afterLrc" 
					                  :id="'line-'+index" 
					                  :key="index">
					                  {{item.txt}}
				                  </p>
				                </div>
				            </div>
							<!-- 播放时间 -->
							<div class="process-bar">
								<div class="pro">
									<div class="pro-wrap">
										<mu-slider class="song-slider" v-model="Timedd" @change="changeTime"/>
									</div>
									<div class="time">
										<time id="cur">{{currentTime | time}}</time>
										<time id="total">{{durationTime | time}}</time>
									</div>
								</div>
							</div>
							<!-- 控制按钮 -->
							<div class="control-bar">
								<div class="action">
									<span @click='ckload'></span> 
									<span></span> 
									<span class="noplay" :class="{pause: playing}" @click="tooglplay"></span>
									<span></span> 
									<span></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="mask">
				<div class="album-cover" :style="{backgroundImage:'url('+itemal.picUrl+')'}">
					
				</div>
				<div class="cover-mask" style="opacity: 0.6;">
					
				</div>
			</div>
		</div>
	</div>
</template>

<script >
	export default {
		data(){
			return {
				items:"",
				itempics:"",
				itemar:"",
				itemal:"",
				lyric: '',
				afterLrc:[],
				lrcIndex:0,
				currentTime:0,//开始时间
				durationTime:0,//总共时间
				Timedd:0,
				playing:false,//暂停播放
				id:this.$route.params.id
			}
		},
		created(){
			//音乐播放：http://musicapi.duapp.com/api.php?type=url&id=191232
			//列表：https://api.imjad.cn/cloudmusic/?type=playlist&id=803927975
			//歌词：https://api.imjad.cn/cloudmusic/?type=lyric&id=115569
	        this.$http.get("https://api.imjad.cn/cloudmusic/?type=detail&id="+this.id)
	          .then((res)=>{
	            this.itempics = res.body.songs[0]
	            this.itemar = res.body.songs[0].ar[0]
	            this.itemal = res.body.songs[0].al
	             //console.log(this.itemal)
	        },function(error){
	            console.log(error);
	        })
	        this.$http.get("http://musicapi.duapp.com/api.php?type=url&id="+this.id)
	          .then((res)=>{
	            this.items = res.body.data[0]
	            // console.log(this.items)
	        },function(error){
	            console.log(error);
	        })
			this.$http.get("https://api.imjad.cn/cloudmusic/?type=lyric&id="+this.id)
				.then((res)=>{
					this.lyric = res.data.lrc.lyric
					this.getLrc()
					
				},function(error){
				console.log(error);
			})

			
			setTimeout(()=>{
				this.alltime()
			},1000)
			
			
  		},
  		computed:{
  			lrcOffset () {
		      if (this.afterLrc) {
		        // 1、根据时间获得歌词
		        var current = Math.round(this.currentTime)
		        // 2、根据时间得到歌词
		        
		        for (var i = 0; i < this.afterLrc.length; i++) {
		        	//console.log(current+"shi")
		          if (this.afterLrc[i].time == current){
		          	this.lrcIndex = i
		          } 
		        }
		        return -(this.lrcIndex) * 42
		      }
		    }
  		},
  		mounted(){
				
  		},
		methods:{
			back () {
				this.$router.go(-1)
			},
			tooglplay(){
				this.playing=!this.playing
				if(this.playing){
					this.isrotate = false
					document.querySelector("#audio").pause()
				}else{
					this.isrotate = true
					document.querySelector("#audio").play()
				}
			},
			ckload(){
				document.querySelector("#audio").load()
			},
			changeTime(){

			},
			alltime(){
				var _this = this
				var audio = document.querySelector("#audio");
				//console.log(audio)

				var au = this.$refs.audio;
				this.durationTime = au.duration
				setInterval(()=>{
					this.currentTime = au.currentTime
					this.durationTime = au.duration
					this.Timedd = this.currentTime/this.durationTime*100
				},1000);
				// _this.currentTime = audio.currentTime
			},
			getLrc () {
		      if (this.lyric) {
		        var lyrics = this.lyric.split('\n')
		        var lrcObj = []
		        /*eslint-disable */
		        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
		        /*eslint-enable */
		        // 思路：1、把歌词进行处理以时间和歌词组成一个对象，放入afterLrc数组中
		        // 2、在computed方法中根据当前的时间进行匹配歌词，然后查找在数据中的位置计算offset值
		        for (var i = 0; i < lyrics.length; i++) {
		          var timeRegExpArr = lyrics[i].match(timeReg)
		          if (!timeRegExpArr) continue
		          var txt = lyrics[i].replace(timeReg, '')
		          // 处理时间
		          for (var k = 0; k < timeRegExpArr.length; k++) {
		            var array = {}
		            var t = timeRegExpArr[k]
		            /*eslint-disable */
		            var min = Number(String(t.match(/\[\d*/i)).slice(1))
		            var sec = Number(String(t.match(/\:\d*/i)).slice(1))
		            /*eslint-enable */
		            var time = min * 60 + sec
		            array.time = time
		            array.txt = txt
		            lrcObj.push(array)
		          }
		        }
		        this.afterLrc = lrcObj
		      }
		    }
		},
		filters: {
	    // 时间字符格式化
		    time (value) {
		      var length = Math.floor(parseInt(value))
		      var minute = Math.floor(value / 60)
		      if (minute < 10) {
		        minute = '0' + minute
		      }
		      var second = length % 60
		      if (second < 10) {
		        second = '0' + second
		      }
		      return minute + ':' + second
		    }
	  	}
	}
</script>

<style scoped lang='less'>
.content {
	overflow: hidden;
    min-height: 25rem;
    height: 100%;
}
    .mu-appbar {
    	color: #fff;
    	height: 2.8rem;
    	background-color: transparent;
    	.left {
    		height: 100%;
    		width:2.06rem;
    		background: url(../../static/img/return.png) no-repeat center;
    		background-size: 1.2rem;
    		span{
    			margin-left: 1rem;
    			text-align: center;
    		}
    	}
    	.right {
    		height: 100%;
    		width:2.06rem;
    		background: url(../../static/img/share.png) no-repeat center;
    		background-size: 1.2rem;
    		span{
    			margin-left: 1rem;
    			text-align: center;
    		}
    	}
    	.play-title{
    		height: 56px;
		    font-size: 16px;
		    // color: #fff;
		    .play-name{
		    	padding-top: 0.4rem;
    			line-height: 1.8;
    			text-align: left;
		    }
		    .play-singer {
		    	font-size: 14px;
			    color: #a8a7a7;
			    text-align: left;
			    line-height: 1;
		    }
    	}
    }
    .bar-line {
    	bottom: 0;
	    left: 0;
	    display: block;
	    width: 100%;
	    height: 0.05rem;
	    background: radial-gradient(#d3d3d3 -90%, transparent 100%);
    }
    .main {
    	height: 100%;
    	
    	.cd-holder {
    		position: relative;
    		overflow: hidden;
    		
    		.stick {
    			position: absolute;
			    width: 4rem;
			    height: 6rem;
			    right: 30%;
			    background: url('../../static/img/stick_bg.png') no-repeat left -0.4rem;
			    background-size: cover;
			    z-index: 8;
			    transition: all 300ms ease-in;
			    -webkit-transform-origin: left top;
			    -ms-transform-origin: left top;
			    transform-origin: left top;
			    -webkit-transform: rotate(-20deg);
			    -ms-transform: rotate(-20deg);
			    transform: rotate(-20deg);
    		}
    		.cdplay {
	    		background-position-y: -0.7rem;
			    -webkit-transform: rotate(0deg);
			    -ms-transform: rotate(0deg);
			    transform: rotate(0deg);
    		}
    		.cdrotate{
    			-webkit-animation: rotating 10s linear .3s infinite;
    			animation: rotating 10s linear .3s infinite;
    		}
    		.cd-wrapper {
    			position: relative;
			    max-width: 65%;
			    min-height: 12.1rem;
			    padding: .8rem .9rem;
			    border-radius: 50%;
			    background: rgba(107, 107, 107, 0.3);
			    margin: 2.5rem auto 0;
			    .cd-mask {
			    	position: absolute;
				    width: 100%;
				    height: 100%;
				    top: 0;
				    left: 0;
				    background: url('../../static/img/cd_wrapper.png') no-repeat center center;
				    background-size: contain;
			    }
			    img {
			    	width: 100%;
				    height: 100%;
				    min-height: 80px;
				    border-radius: 50%;
			    }
    		}
    	}
    	.bottom-wrapper {
    		padding: 0 1.5rem 0;
		    color: #fff;
		    -webkit-align-items: flex-end;
		    -ms-flex-align: end;
		    align-items: flex-end;
    		.lyric-holder{
    			margin-top: .6rem;
			    position: relative;
			    overflow: hidden;
			    height: 3.7rem;
			   	.lrc-inner{
			   		position: absolute;
				    left: 10px;
				    right: 10px;
				    overflow: hidden;
					p {
				    overflow: hidden;
				    height: 42px;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				    font-size: 16px;
				    color: #fff;
				    text-align: center;
				    line-height: 42px;
					}
			   	} 
    		}
    		.process-bar{
    			.pro{
    				position: relative;
    				.pro-wrap {
    					margin: 0 2rem;
					    padding: 1rem 0 0;
					    position: relative;
					    .mu-slider {
					    	.mu-slider-thumb {
						    	color: red!important;
						    	background-color:red!important;
					    	}
					    }
					    
    				}
    				.time {
    					color: #fff;
    					font-size: 12px;
    					#cur {
							left: 0;
    					}
    					#total {
							right: 0;
    					}
    					time {
    						position: absolute;
						    top: 54%;
						    opacity: .5;
    					}
    				}
    			}
    		}
    		.control-bar {
    			.action {
    				display: flex;
    				span {
    					flex: 1;
					    display: inline-block;
					    height: 60px;
					    background-repeat: no-repeat;
					    background-position: 50%;
    				}
    				span:first-child {
    					background: url(../../static/img/seq.png);
    					background-size: 60px 60px;
    				}
    				span:nth-child(2) {
    					background: url(../../static/img/prev.png);
    					background-size: 60px 60px;
    				}
    				span.noplay{
    					background: url(../../static/img/pause.png);
    					background-size: 60px 60px;
    				}
    				span:nth-child(4) {
    					background: url(../../static/img/next.png);
    					background-size: 60px 60px;
    				}
    				span:nth-child(5){
    					background: url(../../static/img/list.png);
    					background-size: 60px 60px;
    				}
    				.pause {
					    background: url("../../static/img/play.png") no-repeat!important;
					    background-size: 60px 60px!important;
					}
    			}
    		}
    		
    	}
    }

    .mask {
    	width: 100%;
	    height: 100%;
	    overflow: hidden;
	    position: absolute;
	    left: 0;
	    top: 0;
	    z-index: -1;
	    .album-cover {
	    	position: absolute;
		    top: 0;
		    bottom: 0;
		    left: 0;
		    z-index: 2;
		    width: 100%;
		    height: 100%;
		    background-size: cover;
		    background-position: center;
		    filter: blur(1.2rem);
		    -webkit-filter: blur(1.2rem);
		    -webkit-transform: scale(1.05);
	    }
	    .cover-mask {
	    	position: absolute;
		    top: 0;
		    bottom: 0;
		    left: 0;
		    z-index: 3;
		    width: 100%;
		    height: 100%;
		    background-color: rgba(0, 0, 0, 0.8);
	    }
    }





	@-webkit-keyframes rotating{
		0% { -webkit-transform:rotate(0deg); }
		100% { -webkit-transform:rotate(360deg); }
	}
	@keyframes rotating {
		0% { transform: rotate(0deg);}
		100% { transform: rotate(360deg);}
	}
</style>
