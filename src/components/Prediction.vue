<template>
  <div>
    <nav class='navbar navbar-expand-lg navbar-light bg-dark'>
      <div class='title'>
        <h3>Name Classification With RNN
        </h3>
      </div>
      <div class='nav-item nav-right'>
        <div @mouseenter="spanlist = !spanlist" @mouseleave="spanlist=!spanlist">
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
        <transition name="dropdown">
        <div class="dropdown-list" v-show="spanlist">
          <ul class="list-group">
            <li v-for="(item, i) in countryList" :key="i" class="list-group-item">
              {{ item }}
            </li>
            <!-- <li class="list-group-item">
              h
            </li> -->
          </ul>
        </div>
        </transition>
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
    <hr>
    <div class='container'>
    <div class='row justify-content-md-center'>
      <div class='col-md-3'>
        <div class="form-group">
          <input type="input" v-model='country' placeholder="name" class="form-control">
          <small class="form-text text-muted">the name you want to know</small>
        </div>
        <button class='btn btn-light' @click="handleClick">GO</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      filename: [],
      tmp: [],
      country: '',
      hidden: true,
      spanlist: false,
      countryList: []
    }
  },
  methods: {
    getReq: function () {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 6; j++) {
          var ele = document.getElementById(this.filename[i][j])
          if (this.tmp[i][j] === this.countryList[0] + '.png') {
            console.log(i, j)
            ele.classList.add('flag-active')
          } else {
            ele.classList.remove('flag-active')
          }
        }
      }
    },
    handleClick: function () {
      console.log('axios here')
      axios.get('/api/data').then((res) => {
        this.countryList = res.data.list.slice(0, 3)
        console.log(this.countryList)
        this.getReq()
      })
      // console.log(res)
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
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all .2s ease;
}
.dropdown-enter,
.dropdown-leave-to {
  transform: scaleY(0);
  overflow: hidden;
  /* height: 0; */
}
.dropdown-list {
  max-height: 200px;
  width: 200px;
  color: black;
  /* overflow-y: scroll; */
  /* overflow-y: hidden; */
  /* top: 100px; */
}
.slide-fade-enter-active {
  transition: all 0.3s;
}
.slide-fade-enter,
slide-fade-leave-to {
  transform: scale(0);
}
nav {
  margin-top: 0;
  margin-bottom: 20px;
  height: 80px;
  color: white;
  z-index: 10;
  text-align: center;
}
.nav-right {
  position: absolute;
  right: 10px;
  top: 20px;
  width: 200px;
}
.flag {
  max-width: 80%;
  height: auto;
  margin: 5px 0;
  opacity: 0.1;
  z-index: -1;
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
