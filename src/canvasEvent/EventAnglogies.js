import { equalSet, diffSet } from './lib/helper'

export const ActionTypes = {
  down: 'down',
  up: 'up',
  move: 'move'
};

export const EventNames = {
  click: 'click',
  mousedown: 'mousedown',
  mousemove: 'mousemove',
  mouseup: 'mouseup',
  mouseenter: 'mouseenter',
  mouseleave: 'mouseleave'
};

export class EventAnglogies {
  listenersMap = {};
  lastDownIdSet = new Set(); // 最后一个按下的一堆idSet
  lastMoveIdSet = new Set(); // move的idSet

  dispatchAction(action, ev) {

    const { type, idSet } = action;
    
    if (type === ActionTypes.move) {
      // mousemove
      this.fire(idSet, EventNames.mousemove, ev);

      // mouseenter
      const enterSet = diffSet(idSet, this.lastMoveIdSet)
      enterSet.size && this.fire(enterSet, EventNames.mouseenter, ev)

      // mouseleave
      const leaveSet = diffSet(this.lastMoveIdSet, idSet)
      leaveSet && this.fire(leaveSet, EventNames.mouseleave, ev)
    }

    // mousedown
    if (type === ActionTypes.down) {
      this.fire(idSet, EventNames.mousedown, ev);
    }

    // mouseup
    if (type === ActionTypes.up) {
      this.fire(idSet, EventNames.mouseup, ev);
    }

    // click
    if (type === ActionTypes.up && equalSet(this.lastDownIdSet, idSet)) {
      this.fire(idSet, EventNames.click, ev);
    }

    if (type === ActionTypes.move) this.lastMoveIdSet = action.idSet;
    else if (type === ActionTypes.down) this.lastDownIdSet = action.idSet;
  }

  addListeners(id, listeners) {
    this.listenersMap[id] = listeners;
  }

  fire(idSet, eventName, ev) {
    idSet.forEach(id => {
      if (this.listenersMap[id] && this.listenersMap[id][eventName]) {
        this.listenersMap[id][eventName].forEach((listener) => listener(ev));
      }
    })
  }
}
