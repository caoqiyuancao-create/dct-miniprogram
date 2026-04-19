Component({
  options: { styleIsolation: 'isolated' },
  properties: {
    x: { type: Number, value: 50 },
    y: { type: Number, value: 50 },
    s: { type: Number, value: 12 },
    o: { type: Number, value: 0.8 }
  },
  data: {},
  observers: {
    's, x, y, o': function (s, x, y, o) {
      const box = s * 2;
      this.setData({
        _box: box,
        _style: `left:${x}%;top:${y}%;opacity:${o};width:${box}rpx;height:${box}rpx;transform:translate(-50%,-50%);`
      });
    }
  }
});
