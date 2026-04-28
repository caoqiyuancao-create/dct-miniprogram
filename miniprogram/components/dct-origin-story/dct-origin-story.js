const TOTAL = 36000;
const INTRO = 2200;
const VIEWPORT_CENTER = 375;

const sceneCopy = [
  {
    title: '包包大人登场',
    line: 'ENFP，执行力满分。故事先从一个会把想法立刻推进的人开始。'
  },
  {
    title: '三个非典型医学研究生',
    line: 'Gia、曹叔和包包大人凑到一起，各自带着不同的兴趣和奇思妙想。'
  },
  {
    title: '论文写到发慌',
    line: '某个夜晚，咖啡、电脑和截止日期，把聊天推向了一个更大的问题。'
  },
  {
    title: '一累，就开始做梦',
    line: '江边散步的时候，大家把“以后想做什么”讲成了一个可以实现的画面。'
  },
  {
    title: '有人想养狗，有人想烘焙',
    line: '小葵、甜品、烤箱和生活感，开始进入这个学术梦想。'
  },
  {
    title: '也有人想要治疗空间',
    line: '认真倾听、认真交流，变成了这个空间最重要的底色。'
  },
  {
    title: '那就开个学术沙龙',
    line: '狗子、厨子与治疗师，最后变成了 DCT 这个名字。'
  },
  {
    title: 'DCT 真的开张了',
    line: '有狗，有猫，有甜品，有特调，还有一群愿意认真聊一切的人。'
  }
];

const layout = [
  { left: 140, top: 148, width: 584, rotate: -2.4, center: 432 },
  { left: 808, top: 76, width: 584, rotate: 1.5, center: 1100 },
  { left: 1476, top: 152, width: 584, rotate: -1.2, center: 1768 },
  { left: 2144, top: 84, width: 584, rotate: 1.8, center: 2436 },
  { left: 2812, top: 156, width: 584, rotate: -1.6, center: 3104 },
  { left: 3480, top: 76, width: 584, rotate: 1.1, center: 3772 },
  { left: 4148, top: 126, width: 584, rotate: -1, center: 4440 },
  { left: 4816, top: 160, width: 652, rotate: 1.2, center: 5142 }
];

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function mix(a, b, t) {
  return a + (b - a) * t;
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

Component({
  data: {
    scenes: layout.map((item, index) => ({
      image: `/assets/story-panels/panel-${pad2(index + 1)}.jpg`,
      baseStyle: [
        `left:${item.left}rpx`,
        `top:${item.top}rpx`,
        `width:${item.width}rpx`,
        `transform:rotate(${item.rotate}deg)`
      ].join(';')
    })),
    caption: {
      num: '01',
      title: sceneCopy[0].title,
      line: sceneCopy[0].line
    },
    activeIndex: 0,
    captionChanging: false,
    elapsedText: '00:00',
    openingHidden: false,
    toggleLabel: 'Ⅱ',
    trackStyle: '',
    glowStyle: '',
    progressStyle: ''
  },

  lifetimes: {
    attached() {
      this.startedAt = Date.now();
      this.pausedAt = 0;
      this.isPaused = true;
      this.currentCaptionIndex = -1;
      this.tick();
    },
    ready() {
      this.visibilityObserver = this.createIntersectionObserver({
        thresholds: [0, 0.2, 0.8]
      });
      this.visibilityObserver.relativeToViewport({ bottom: 0 }).observe('.origin-story', res => {
        if (!this.hasStarted && res.intersectionRatio > 0.2) {
          this.hasStarted = true;
          this.replay();
        }
      });
    },
    detached() {
      if (this.visibilityObserver) {
        this.visibilityObserver.disconnect();
        this.visibilityObserver = null;
      }
      this.clearTimer();
    }
  },

  methods: {
    replay() {
      this.clearTimer();
      this.startedAt = Date.now();
      this.pausedAt = 0;
      this.isPaused = false;
      this.currentCaptionIndex = -1;
      this.setData({
        toggleLabel: 'Ⅱ',
        openingHidden: false
      });
      this.tick();
      this.timer = setInterval(() => this.tick(), 80);
    },

    toggle() {
      if (this.pausedAt >= TOTAL) {
        this.replay();
        return;
      }

      if (this.isPaused) {
        this.startedAt = Date.now() - this.pausedAt;
        this.isPaused = false;
        this.setData({ toggleLabel: 'Ⅱ' });
        this.tick();
        this.timer = setInterval(() => this.tick(), 80);
        return;
      }

      this.pausedAt = Math.min(Date.now() - this.startedAt, TOTAL);
      this.isPaused = true;
      this.clearTimer();
      this.setData({ toggleLabel: '▶' });
    },

    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    tick() {
      const elapsed = this.isPaused ? this.pausedAt : Math.min(Date.now() - this.startedAt, TOTAL);
      const progress = Math.min(Math.max((elapsed - INTRO) / (TOTAL - INTRO), 0), 1);
      const exact = progress * (layout.length - 1);
      const baseIndex = Math.min(Math.floor(exact), layout.length - 1);
      const nextIndex = Math.min(baseIndex + 1, layout.length - 1);
      const captionIndex = Math.min(Math.round(exact), layout.length - 1);
      const local = easeOutCubic(exact - baseIndex);
      const center = mix(layout[baseIndex].center, layout[nextIndex].center, local);
      const y = mix(layout[baseIndex].top + 240, layout[nextIndex].top + 240, local);
      const pulse = Math.sin((exact % 1) * Math.PI);
      const zoom = 1.04 + pulse * 0.115;
      const tx = VIEWPORT_CENTER - center * zoom;
      const seconds = Math.floor(elapsed / 1000);

      if (captionIndex !== this.currentCaptionIndex) {
        this.updateCaption(captionIndex);
      }

      this.setData({
        activeIndex: captionIndex,
        openingHidden: elapsed > INTRO,
        elapsedText: `00:${pad2(seconds)}`,
        trackStyle: `transform:translateX(${tx.toFixed(1)}rpx) scale(${zoom.toFixed(3)})`,
        glowStyle: `transform:translate(${center.toFixed(1)}rpx, ${y.toFixed(1)}rpx) translate(-50%, -50%);opacity:${(0.56 + pulse * 0.16).toFixed(2)}`,
        progressStyle: `width:${((elapsed / TOTAL) * 100).toFixed(2)}%`
      });

      if (elapsed >= TOTAL) {
        this.pausedAt = TOTAL;
        this.isPaused = true;
        this.clearTimer();
        this.setData({ toggleLabel: '▶' });
      }
    },

    updateCaption(index) {
      this.currentCaptionIndex = index;
      this.setData({ captionChanging: true });
      setTimeout(() => {
        this.setData({
          captionChanging: false,
          caption: {
            num: pad2(index + 1),
            title: sceneCopy[index].title,
            line: sceneCopy[index].line
          }
        });
      }, 160);
    }
  }
});
