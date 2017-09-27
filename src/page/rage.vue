<template>
	<div class="rage">
		<div class="m-sp">
			<swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
			<swiper-slide v-for="(banner,index) in banners" key='index'>
			<img :src="banner" alt="">
			</swiper-slide>

			<div class="swiper-pagination"  slot="pagination"></div>
			</swiper>
		</div>
		<rmlist></rmlist>
	</div>
</template>

<script >
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import rmlist from '../components/rmlist.vue'
	export default {
		name:"rage",
		data(){
			return {
				banners:['../../static/img/banner1.jpg','../../static/img/banner2.jpg','../../static/img/banner3.jpg','../../static/img/banner4.jpg'],
				notNextTick: true,
				swiperOption: {  
                    pagination: '.swiper-pagination',  
                    autoplay: 3000,
                    loop:true,
                   	autoplayDisableOnInteraction : false,
					onTransitionStart(swiper){
					// console.log(swiper)
					},
                    onSlideChangeEnd: swiper => {  
                        //这个位置放swiper的回调方法  
                        this.page = swiper.realIndex+1;  
                        this.index = swiper.realIndex;  
                    },  
                }
			}
		},
		components: {
		    swiper,
		    swiperSlide,
		    rmlist

		},
		computed: {  
  			swiper() {
		        return this.$refs.mySwiper.swiper
		    }
        },  

	}
</script>

<style scoped lang="less">
.rage {
	margin-bottom: 60px;
}
.m-sp {
	width:100%;
	img {
		width:100%;
		height:100%;
	}
}
</style>