import UUID from 'uuidjs';
export const generatorId = () => UUID.generate();

export const idToRgba = (id) => id.split('-');

export const rgbaToId = (rgba) => rgba.join('-');

// 这里最多可以绘制图形 256*256*256个  16,777,216 约1600万个
const idPool = {};

export const createId = () => {
  let id = createOnceId();

  while (idPool[id]) {
    id = createOnceId();
  }
  console.log(id)
  return id;
};

export const createOnceId = () => Array(3).fill(0).map(() => Math.ceil(Math.random() * 255)).concat(255).join('-');

// 判断两个set容器相等,注意这里只判断字符串类型的set容器
export const equalSet = (a, b)=> [...a].join('') === [...b].join('')

// set容器的差值
export const diffSet = (a, b) => new Set([...a].filter(x => !b.has(x)));