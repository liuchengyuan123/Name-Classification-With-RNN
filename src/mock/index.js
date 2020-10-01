const Mock = require('mockjs')

var list = [
  'arabic',
  'chinese',
  'czech',
  'dutch',
  'english',
  'french',
  'german',
  'greek',
  'irish',
  'Italian',
  'japanese',
  'korean',
  'polish',
  'portuguese',
  'russian',
  'scottish',
  'spanish',
  'vietnamese'
]

Mock.mock('/api/data', (req) => {
  // console.log(req)
  return {
    list: Mock.Random.shuffle(list)
  }
})
