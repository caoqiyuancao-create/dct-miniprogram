const TOTAL = 36000;
const INTRO = 2200;
const STEP = (TOTAL - INTRO) / 7;

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
  { left: 140, top: 148, width: 584, rotate: -2.4 },
  { left: 808, top: 76, width: 584, rotate: 1.5 },
  { left: 1476, top: 152, width: 584, rotate: -1.2 },
  { left: 2144, top: 84, width: 584, rotate: 1.8 },
  { left: 2812, top: 156, width: 584, rotate: -1.6 },
  { left: 3480, top: 76, width: 584, rotate: 1.1 },
  { left: 4148, top: 126, width: 584, rotate: -1 },
  { left: 4816, top: 160, width: 652, rotate: 1.2 }
];

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
    playing: false,
    paused: false,
    toggleLabel: 'Ⅱ'
  },

  lifetimes: {
    attached() {
      this.resetState();
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
      this.clearTicker();
    }
  },

  methods: {
    resetState() {
      this.startedAt = 0;
      this.pausedAt = 0;
      this.currentCaptionIndex = 0;
      this.setData({
        activeIndex: 0,
        captionChanging: false,
        caption: {
          num: '01',
          title: sceneCopy[0].title,
          line: sceneCopy[0].line
        },
        elapsedText: '00:00',
        openingHidden: false,
        playing: false,
        paused: false,
        toggleLabel: 'Ⅱ'
      });
    },

    replay() {
      this.clearTicker();
      this.startedAt = Date.now();
      this.pausedAt = 0;
      this.currentCaptionIndex = 0;
      this.setData({
        activeIndex: 0,
        captionChanging: false,
        caption: {
          num: '01',
          title: sceneCopy[0].title,
          line: sceneCopy[0].line
        },
        elapsedText: '00:00',
        openingHidden: false,
        // Toggle the class off/on so CSS animations restart reliably.
        playing: false,
        paused: false,
        toggleLabel: 'Ⅱ'
      });
      setTimeout(() => {
        this.setData({ playing: true });
        this.startTicker();
      }, 30);
    },

    toggle() {
      if (!this.data.playing || this.pausedAt >= TOTAL) {
        this.replay();
        return;
      }

      if (this.data.paused) {
        this.startedAt = Date.now() - this.pausedAt;
        this.setData({
          paused: false,
          toggleLabel: 'Ⅱ'
        });
        this.startTicker();
        return;
      }

      this.pausedAt = Math.min(Date.now() - this.startedAt, TOTAL);
      this.clearTicker();
      this.setData({
        paused: true,
        toggleLabel: '▶'
      });
    },

    startTicker() {
      this.clearTicker();
      this.tick();
      this.ticker = setInterval(() => this.tick(), 500);
    },

    clearTicker() {
      if (this.ticker) {
        clearInterval(this.ticker);
        this.ticker = null;
      }
    },

    tick() {
      const elapsed = Math.min(Date.now() - this.startedAt, TOTAL);
      const seconds = Math.floor(elapsed / 1000);
      const sceneProgress = Math.max((elapsed - INTRO) / STEP, 0);
      const captionIndex = Math.min(Math.round(sceneProgress), sceneCopy.length - 1);

      if (captionIndex !== this.currentCaptionIndex) {
        this.updateCaption(captionIndex);
      }

      this.setData({
        openingHidden: elapsed > INTRO,
        elapsedText: `00:${pad2(seconds)}`
      });

      if (elapsed >= TOTAL) {
        this.pausedAt = TOTAL;
        this.clearTicker();
        this.setData({
          paused: true,
          toggleLabel: '▶'
        });
      }
    },

    updateCaption(index) {
      this.currentCaptionIndex = index;
      this.setData({
        activeIndex: index,
        captionChanging: true
      });
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
