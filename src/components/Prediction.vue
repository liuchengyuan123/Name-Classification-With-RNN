<template>
  <div>
    <nav class='navbar navbar-expand-lg navbar-light bg-dark'>
      <transition name='slide-fade'>
        <div @click='hidden = !hidden' v-show='hidden'>
          <svg
            height='1.5em'
            viewBox='0 0 16 16'
            class='bi bi-person-square nav-item'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'
            />
            <path
              fill-rule='evenodd'
              d='M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
            />
          </svg>
        </div>
      </transition>
      <transition name='slide-fade'>
        <div v-show='!hidden'>
          <div class='nav-item'>
            <input
              v-model='country'
              type='input'
              class='nav-item'
              id='input-space'
              placeholder='input a name'
            />
            <button
              class='btn btn-light'
              style='margin-left: 5px'
              @click='handleClick'
            >
              go
            </button>
            <button
              class='btn btn-light'
              style='margin-left: 5px'
              @click='hidden = !hidden'
            >
              hide
            </button>
          </div>
        </div>
      </transition>
      <div class='nav-item nav-right'>
        <div>
          <svg
            height='1.5em'
            viewBox='0 0 16 16'
            class='bi bi-three-dots'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z'
            />
          </svg>
        </div>
      </div>
    </nav>
    <div class='container'>
      <div class='board'>
        <div class='row' v-for='(items, i) in filename' :key='i'>
          <div class='col-2' v-for='item in items' :key='item'>
            <!-- {{ item }} -->
            <img :src='item' class='flag' :id='item' />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      filename: [],
      tmp: [],
      country: 'chinese',
      hidden: true
    }
  },
  methods: {
    handleClick: function () {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 6; j++) {
          var ele = document.getElementById(this.filename[i][j])
          if (this.tmp[i][j] === this.country + '.png') {
            console.log(i, j)
            ele.classList.add('flag-active')
          } else {
            ele.classList.remove('flag-active')
          }
        }
      }
    }
  },
  mounted: function () {
    console.log('in amounted')
    this.tmp = [
      [
        'arabic.png',
        'chinese.png',
        'czech.png',
        'dutch.png',
        'english.png',
        'french.png'
      ],
      [
        'german.png',
        'greek.png',
        'irish.png',
        'Italian.png',
        'japanese.png',
        'korean.png'
      ],
      [
        'polish.png',
        'portuguese.png',
        'russian.png',
        'scottish.png',
        'spanish.png',
        'vietnamese.png'
      ]
    ]
    this.filename = new Array(3)
    for (var j = 0; j < this.tmp.length; j++) {
      var w = new Array(6)
      for (var i = 0; i < this.tmp[j].length; i++) {
        w[i] = require('../../static/flags/' + this.tmp[j][i])
      }
      this.filename[j] = w
    }
    console.log(this.filename)
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
slide-fade-leave-to {
  transform: scale(0);
}
nav {
  margin-top: 0;
  margin-bottom: 20px;
  height: 50px;
  color: white;
}
.nav-item {
  margin: 0, 5px;
  /* float: left; */
}
.nav-right {
  position: absolute;
  right: 10px;
}
.flag {
  max-width: 80%;
  height: auto;
  margin: 5px 0;
  opacity: 0.1;
}
.flag-active {
  /* transform: scale(1.2); */
  opacity: 1;
  animation: pulse 0.5s;
}
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.55;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
#input-space {
  height: 35px;
  text-align: center;
  background: rgb(61, 61, 61);
  color: white;
  width: 200px;
  /*   border-radius: 5px;
  border: 0.5px solid;
 */
  border: 0px;
  border-bottom: 1px solid whitesmoke;
}
#input-space:focus {
  border: 0px;
  border-bottom: 1px solid whitesmoke;
}
</style>
