<template>
    <div class="pagination">
      <span :class="['jump', 'pre', {disabled:pstart}]" @click="jumpPage(current_page - 1)"><span class="icon-left"></span>上一页</span>
      <!-- <span class="jump" @click="jumpPage(1)">第一页</span> -->
      <span class="jump" @click="jumpPage(1)" v-show="efont">1</span>
      <span class="ellipsis" v-show="efont">...</span>
      <span class="jump"
            v-for="num in indexs"
            v-bind:key="num"
            :class="{bgprimary:current_page==num}"
            @click="jumpPage(num)"
      >{{num}}</span>
      <span class="ellipsis" v-show="ebehind">...</span>
      <span class="jump" @click="jumpPage(pages)" v-show="ebehind"> {{pages}} </span>

      <span :class="['jump','next',{disabled:pend}]" @click="jumpPage(current_page + 1)">下一页<span class="icon-left"></span></span>
      <!-- <span class="jump" @click="jumpPage(pages)">最后一页</span> -->
      <span class="jumppoint">跳转到：</span>
      <span class="jumpinp">
        <input type="number" v-model="changePage" @keyup.enter="jumpPage(changePage)">
      </span>
      <span class="jump gobtn" @click="jumpPage(changePage)">确定</span>
    </div>
</template>

<script>
export default {
  name: 'MoPaging',
  data () {
    return {
      current_page: this.pageIndex, // 当前页
      pages: this.total, // 总页数
      changePage: this.pageIndex, // 跳转页
    };
  },
  // 通过props来接受从父组件传递过来的值
  props: {
    perPages: {
      type: Number,
      default: 5,
    },
    // 当前页码
    pageIndex: {
      default: 1,
    },
    // 每页显示条数
    pageSize: {
      type: Number,
      default: 10,
    },
    // 总页数
    total: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    jumpPage (id) {
      this.current_page = id;
      this.$emit('change', this.current_page);
    },
  },
  computed: {
    show () {
      return this.pages && this.pages !== 1;
    },
    pstart () {
      return this.current_page === 1;
    },
    pend () {
      return this.current_page === this.pages;
    },
    efont () {
      if (this.pages <= 7) return false;
      return this.current_page > 5;
    },
    ebehind () {
      if (this.pages <= 7) return false;
      var nowAy = this.indexs;
      return nowAy[nowAy.length - 1] !== this.pages;
    },
    indexs () {
      var left = 1;
      var right = this.pages;
      var ar = [];
      if (this.pages >= 7) {
        if (this.current_page > 5 && this.current_page < this.pages - 4) {
          left = Number(this.current_page) - 3;
          right = Number(this.current_page) + 3;
        } else {
          if (this.current_page <= 5) {
            left = 1;
            right = 7;
          } else {
            right = this.pages;

            left = this.pages - 6;
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    },
  },
  watch: {
    changePage () {
      this.changePage =
        this.changePage > this.total ? this.pages : this.changePage;
      this.changePage = this.changePage < 1 ? 1 : this.changePage;
    },
  },
};
</script>

<style scoped>
.pagination {
  display: block;
  padding: 0;
  margin: 39px auto;
  font-size: 12px;
  list-style: none;
  user-select: none;
  text-align: center;

  & .jump {
    display: inline-block;
    padding: 0px;
    margin-left: 10px;
    min-width: 26px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    cursor: pointer;
    color: #787878;
  }

  & input {
    outline: none;
    resize: none;
    width: 40px;
    height: 25px;
    border-radius: 3px;
    text-align: center;
    padding: 0px;
    border: solid 1px #c8c8c8;
  }

  & .ellipsis {
    padding: 0px 8px;
  }

  & .jumppoint {
    margin-left: 20px;
  }

  & .gobtn {
    width: 50px;
    height: 25px;
    border-radius: 3px;
    text-align: center;
    padding: 0px;
    border: solid 1px #c8c8c8;
    vertical-align: bottom;
  }

  & .bgprimary {
    color: #ff8847;
    border: 1px solid #ff8847;
    border-radius: 50%;
    position: relative;
    z-index: 1;
    cursor: not-allowed;
  }

  & .pre {
    color: #ff8847;
  }

  & .next {
    color: #ff8847;
    & .icon-left:before {
      transform: rotate(180deg);
    }
  }

  & .disabled {
    pointer-events: none;
    color: #c8c8c8;
  }
}
</style>
