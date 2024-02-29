
import Vue from 'vue'
import store from '@/store'
const adminPerms = '*:*:*'
Vue.directive('n', {
  inserted(el,data){
    // console.log('el',el);
    // console.log('data',data);
    const mens=store.state.user.userInfo.permissions
    console.log('mens',mens);
    if(!mens.includes(data.value)&&!mens.includes(adminPerms)){
      el.parentNode.removeChild(el)
    }
  }
})

