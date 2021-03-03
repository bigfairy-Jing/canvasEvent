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
  lastDownId; // 最后一个按下的id
  lastMoveId; // move的id

  addAction(action, ev) {
    
    const { type, id } = action;
    // 在一个widget上mousemove
    if (type === ActionTypes.move) {
      this.fire(id, EventNames.mousemove, ev);
    }

    // 进入一个新的widget ，可能存在上一个widget的离开
    if (type === ActionTypes.move && (!this.lastMoveId || this.lastMoveId !== id)) {
      this.fire(id, EventNames.mouseenter, ev);
      this.fire(this.lastMoveId, EventNames.mouseleave, ev);
    }

    // mousedown
    if (type === ActionTypes.down) {
      this.fire(id, EventNames.mousedown, ev);
    }

    // mouseup
    if (type === ActionTypes.up) {
      this.fire(id, EventNames.mouseup, ev);
    }

    // click
    if (type === ActionTypes.up && this.lastMoveId === id) {
      this.fire(id, EventNames.click, ev);
    }

    if (type === ActionTypes.move) this.lastMoveId = action.id;
    else if (type === ActionTypes.down) this.lastDownId = action.id;
  }

  addListeners(id, listeners) {
    this.listenersMap[id] = listeners;
  }

  fire(id, eventName, ev) {
    if (this.listenersMap[id] &&this.listenersMap[id][eventName] ) {
      
      this.listenersMap[id][eventName].forEach((listener) => listener(ev));
    }
  }
}
