<template>
	<div class="playerBar">
		<div class="play-mimi">
			<div class="mini-content">
				<audio src=""></audio>
				<div class="cover">
					<mu-circular-progress v-if="loding" :size="30" color="red"/>
					<img src="" alt="">
				</div>
				<div class="info">
					<div class="name">
						
					</div>
					<div class="artist">
						
					</div>
				</div>
				<!-- 按钮 -->
				<div class="control">
					<mu-icon-button class="mini-btn player-list"/>
			        <mu-icon-button class="mini-btn player" :class="{pause: playing}" @click="toggleStatus"/>
			        <mu-icon-button class="mini-btn next"/>
				</div>
				<!-- 进度条 -->
				<div class="pro">
					<div class="pro-load"></div>
					<div class="pro-play"></div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script >
	export default {
		data(){
			return{
				loding:false,
				playing:false
			}
		},
		methods:{
			toggleStatus(){
				this.playing = !this.playing
			}
		}

	}
</script>

<style scoped lang="less">
.playerBar{
	position: fixed;
	bottom:0;
	width: 100%;
	max-width: 720px;
}
    .play-mimi {
    	width: 100%;
	    height: 2.8rem;
	    position: relative;
	    background-color: rgba(255, 255, 255, 0.9);
	    color: #333333;
	    .cover {
	    	float: left;
	    	width: 2.2rem;
		    height: 2.2rem;
		    overflow: hidden;
		    float: left;
		    margin: .2rem 0 0 .4rem;
		    background: url('../../static/img/player-bar.png') no-repeat;
		    background-size: cover;
	    }
	    .info{
	    	overflow: hidden;
		    position: relative;
		    width: 40%;
		    float: left;
		    padding-top: 0.2rem;
		    padding-left: .3rem;
	    }
	    .control {
	    	float: right;
	    	/*按钮*/
		  .control .mini-btn {
		    width: 5rem;
		    height: 5rem;
		  }
		  .player-mini .mini-content .info .control {
		    position: absolute;
		    height: 100%;
		    top: 50%;
		    margin-top: 1rem;
		    right: 0;
		  }
		  /*列表按钮*/
		  .player-list {
		    background: url("../../static/img/playbar_btn_playlist.png") no-repeat!important;
		    background-size: cover!important;
		  }
		  .player {
		    background: url("../../static/img/playbar_btn_play.png") no-repeat!important;
		    background-size: cover!important;
		  }
		  .pause {
		    background: url("../../static/img/playbar_btn_pause.png") no-repeat!important;
		    background-size: cover!important;
		  }
		  .next {
		    background: url("../../static/img/playbar_btn_next.png") no-repeat!important;
		    background-size: cover!important;
		  }


		}
    }
</style>