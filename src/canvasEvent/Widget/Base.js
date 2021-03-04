
import { createId } from '../lib/helper'
export class Base {

  constructor(props){
    this.id = createId()
    this.listeners = {}
    this.isAnimation = props.isAnimation || false // 这个元素是否需要移动位置,以及是否需要重叠，监听事件
  }

  draw (){
    throw new Error('this widget not have draw methods')
  }

  on(eventName, listenerFn) {
    if(this.listeners[eventName]){
      this.listeners[eventName].push(listenerFn)
    }else{
      this.listeners[eventName] = [listenerFn]
    }
  }

  getListeners() {
    return this.listeners
  }

  getId(){
    return this.id
  }

  getIsAnimation(){
    return this.isAnimation
  }
}