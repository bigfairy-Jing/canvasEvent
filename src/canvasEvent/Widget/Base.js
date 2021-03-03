
import { generatorId } from './lib/helper'

export default class Base {

  constructor(){
    this.id = generatorId()
    this.listeners = {}
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

}