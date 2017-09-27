import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import rage from '@/page/rage'
import songList from '@/page/songList'
import leaderBoard from '@/page/leaderBoard'
import hotSinger from '@/page/hotSinger'
import playList from '@/page/playList'
import playDetail from '@/page/playDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
      	{
	      path: '/home/rage',
	      name: 'rage',
	      component: rage
	    },
      	{
	      path: '/home/songList',
	      name: 'songList',
	      component: songList
	    },
	    {
	      path: '/home/leaderBoard',
	      name: 'leaderBoard',
	      component: leaderBoard
	    },
	    {
	      path: '/home/hotSinger',
	      name: 'hotSinger',
	      component: hotSinger
	    }
      ]
    },
    {
    	path: '/playList/:id',
    	name: 'playList',
    	component: playList
    },
    {
    	path: '/playDetail/:id',
    	name: 'playDetail',
    	component: playDetail
    },
	{
	  path: '*', redirect: '/home/rage'
	}
    
  ]
})
