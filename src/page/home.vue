<template>
	<div class="home">
		<div class="m-head">
			<div class="logo">
				<span>网易云音乐</span>
			</div>
			<div class="search">
				<input type="text" placeholder="搜索歌曲"/>
			</div>
		</div>
		<div class='m-tabs'>
			<mu-tabs :value="activeTab" @change="handleTabChange">
				<mu-tab value="rage" title="时下流行"/>
				<mu-tab value="songList" title="歌单"/>
				<mu-tab value="leaderBoard" title="排行榜"/>
				<mu-tab value="hotSinger" title="热门歌手"/>
			</mu-tabs>
			<div class='default-view'>
				<keep-alive>
		          <router-view></router-view>
		        </keep-alive>
			</div>
		</div>
	</div>
	
</template>

<script >
	export default {
		data(){
			return{
				activeTab: 'rage'
			}
		}, 
		components: {
		},
		created() {
			// 当created函数时监测路由信息,防止页面刷新tab高亮错误
	      	var tmpArr = this.$route.path.split('/')
		    if (tmpArr[1] === 'home') {
		       this.handleTabChange(tmpArr[2])
		    }
		},
		// watch函数监测路由的变化,保持tab面板的高亮位置正确
	    watch: {
	      '$route' (to, from) {
	        const path = to.path
	        var tmpArr = path.split('/')
	        if (tmpArr[1] === 'home') {
	          this.handleTabChange(tmpArr[2])
	        }
	      }
	    },
        mounted () {
        },
		methods: {
			handleTabChange (val) {
				this.activeTab = val
        		this.$router.push({ path: '/home/' + val })
			},
			handleActive () {
				window.alert('tab active')
			}
		}

	}
</script>

<style scoped lang='less'>
.m-head {
	position:fixed;
	width:100%;
	max-width: 720px;
	height:2.8rem;
	display:flex;
	align-items: center;
	padding: 0 .5rem;
	font-size: 1rem;
	color: #fff;
	z-index:10;
	justify-content: space-between;
	background-color: #ce3d3e;
	overflow: hidden;
	.search {
		// position: relative;
		input {
			display: inline-block;
			width:6rem;
			height: 1.5rem;
			text-indent: .5rem;
			vertical-align:top;
			border-radius:1.5rem;
			font-size: .8rem;
		}
	}	
}
.m-tabs {
	padding-top: 104px;
	.mu-tabs {
		background-color: #fff;
		color: #000!important;
		position: fixed;
		top:56px;
		max-width: 720px;
		button {
			color: #888;
		}
		.mu-tab-active {
			color: #ce3d3e;
		}

	}
}
</style>