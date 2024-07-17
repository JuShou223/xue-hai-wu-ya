// Symbol类型学习
// ========================================================================== //
// 迭代器
const iteratorObj = {
  start: 1,
  end: 3,
  [Symbol.iterator]: function () {
    return this
  },
  next: function () {
    if (this.start > this.end) {
      this.start = 1
      return { value: false, done: true }
    } else {
      return { value: this.start++, done: false }
    }
  }
}
const iteratorObj2 = (function *() {
  yield 1;
  yield 2;
  yield 3;
})()
const iteratorObj3 = {
  start: 1,
  end: 5,
  [Symbol.iterator]: function () {
    return this
  },
  next: function () {
    if (this.start === 3) {
      this.throw()
    }
    if (this.start > this.end) {
      this.start = 1
      return { value: false, done: true }
    } else {
      return { value: this.start++, done: false }
    }
  },
  return () {
    console.log('done');
    return { done: true }
  },
}
for (const a of iteratorObj3) {
  console.log(a)
}
// console.log(iteratorObj[Symbol.iterator]())
// ========================================================================== //

// ========================================================================== //
// 手动实现symbol
// ========================================================================== //
