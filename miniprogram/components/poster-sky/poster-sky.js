Component({
  options: { multipleSlots: true, styleIsolation: 'shared' },
  properties: {
    tone:  { type: String,  value: 'light' },
    rays:  { type: Boolean, value: true },
    stars: { type: Boolean, value: true },
    minHeight: { type: String, value: '' }
  },
  data: {
    rayList: [
      { deg: -62, len: 170, w: 42, op: 0.22 },
      { deg: -55, len: 160, w: 28, op: 0.17 },
      { deg: -48, len: 175, w: 50, op: 0.26 },
      { deg: -40, len: 165, w: 32, op: 0.16 },
      { deg: -33, len: 170, w: 60, op: 0.24 },
      { deg: -25, len: 160, w: 28, op: 0.14 },
      { deg: -18, len: 150, w: 44, op: 0.20 },
      { deg: -10, len: 140, w: 26, op: 0.12 }
    ],
    starList: [
      { x: 78, y: 18, s: 18, o: 0.9  },
      { x: 62, y: 44, s: 13, o: 0.75 },
      { x: 86, y: 54, s: 10, o: 0.65 },
      { x: 48, y: 66, s: 16, o: 0.85 },
      { x: 72, y: 78, s: 11, o: 0.7  },
      { x: 34, y: 30, s: 9,  o: 0.55 },
      { x: 92, y: 32, s: 8,  o: 0.5  },
      { x: 22, y: 72, s: 12, o: 0.7  }
    ]
  }
});
