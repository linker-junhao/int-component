<template>
  <img :src="targetSrc">
</template>

<script>
const lazyQuene = new Map();

const genScrollHandler = function (container) {
  let done = true;
  return function () {
    if (done) {
      done = false;
      setTimeout(() => {
        const imgs = lazyQuene.get(container).values();
        Array.from(imgs).filter((imgComp) => imgComp.loaded === false).forEach((imgComp) => {
          const imgElem = imgComp.$el;
          const bound = imgElem.getBoundingClientRect();
          if (bound.y > container.getBoundingClientRect().y && bound.y < window.innerHeight) {
            imgComp.targetSrc = imgComp.src;
          }
        });
        done = true;
      }, 800);
    }
  };
};

const addScrooEvent = function (container) {
  const handler = genScrollHandler(container);
  container.addEventListener('scroll', handler);
  return handler;
};

export default {
  name: 'ImageLoad',
  props: {
    src: {
      type: String,
      required: true
    },
    lazy: {
      type: Boolean,
      default() {
        return false;
      }
    },
    container: {
      type: [HTMLElement, Window, String],
      default() {
        return window;
      }
    }
  },
  data() {
    return {
      lazyIdx: null,
      containerElem: window,
      targetSrc: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=',
      loaded: !this.lazy
    };
  },
  mounted() {
    if (!this.lazy) {
      this.targetSrc = this.src;
    } else {
      if (this.container.constructor === String) {
        this.containerElem = document.querySelector(this.container);
      } else {
        this.containerElem = this.container;
      }
      this.lazyListen();
    }
  },
  beforeDestroy() {
    if (lazyQuene.get(this.containerElem).has(this)) {
      lazyQuene.get(this.containerElem).delete(this);
    }
  },
  methods: {
    lazyListen() {
      if (this.lazy) {
        if (lazyQuene.has(this.containerElem)) {
          lazyQuene.get(this.containerElem).set(this, this);
        } else {
          lazyQuene.set(this.containerElem, new Map().set(this, this));
        }
        const lazyLoadHandler = addScrooEvent(this.containerElem);
        this.$nextTick(() => {
          lazyLoadHandler();
        });
      }
    }
  }
};
</script>
