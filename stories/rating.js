/* eslint-disable no-new */
import { Story, notes, configs } from '../src/lib/story'
import RatingChart from '../components/html/rating'

const ratingStory = new Story('Rating').addMetas([configs()])

ratingStory.addChapter(
  'Check if container is a valid DOM Element',
  story => {
    new RatingChart('abc')
  },
  [
    notes('Invalid DOM Element')
  ]
)
ratingStory.addChapter(
  'Default undefined height, width, ratedFill, nonRatedFill, orientation, ratedStroke, nonRatedStroke',
  story => {
    new RatingChart(story)
  },
  [
    notes('Default configuration')
  ]
)
ratingStory.addChapter(
  'Height Proper Values',
  story => {
    let args = {
      'height': 450
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'height': '340px' }), 1000)
  },
  [
    notes('Height will be set to 450px => 340px')
  ]
)
// fallback ???
ratingStory.addChapter(
  'Height Improper Value < 10px',
  story => {
    let args = {
      'height': '4px'
    }
    new RatingChart(story, args)
  },
  [
    notes('Height will be set to 400px, console an error')
  ]
)
ratingStory.addChapter(
  'Width Proper Values',
  story => {
    let args = {
      'width': 470
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'width': '400px' }), 1000)
  },
  [
    notes('Width will be set to 470px => 400px')
  ]
)
ratingStory.addChapter(
  'Width Improper Value < 10px',
  story => {
    let args = {
      'width': '-4px'
    }
    new RatingChart(story, args)
  },
  [
    notes('Width will be set to 400px, console an error')
  ]
)
ratingStory.addChapter(
  'Height and Width Updation',
  story => {
    let args = {
      'width': '200px'
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'width': '333px' }), 1000)
    setTimeout(() => a.update({ 'width': '900px' }), 2000)
    setTimeout(() => a.update({ 'height': '100px' }), 3000)
  },
  [
    notes('Height = 400px => 400px => 400px => 100px, width = 200px => 333px => 900px => 900px')
  ]
)
ratingStory.addChapter(
  'Accept all Fill possible Values',
  story => {
    let args = {
      'ratedFill': 'black',
      'nonRatedFill': 'green',
      'rating': 2
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'ratedFill': '#cff' }), 1000)
    setTimeout(() => a.update({ 'ratedFill': 'rgb(225,150,100)' }), 2000)
    setTimeout(() => a.update({ 'nonRatedFill': 'red' }), 3000)
  },
  [
    notes('ratedFill: black, nonRatedFill: green => ratedFill: #cff => ratedFill: rgb(255,150,100) => nonRatedFill: red')
  ]
)
ratingStory.addChapter(
  'Fill Improper Value',
  story => {
    let args = {
      'ratedFill': 'rgb(11)'
    }
    new RatingChart(story, args)
  },
  [
    notes('ratedFill: rgb(11)(#ff0)')
  ]
)
ratingStory.addChapter(
  'Accept all Stroke possible Values',
  story => {
    let args = {
      'strokeWidth': 2,
      'ratedStroke': 'green'
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'ratedStroke': '#cff' }), 1000)
    setTimeout(() => a.update({ 'ratedStroke': 'rgb(233,122,231)' }), 2000)
    setTimeout(() => a.update({ 'nonRatedStroke': 'blue', 'rating': 3 }), 1000)
  },
  [
    notes('ratedStroke => green => #cff => rgb(233,122,231), nonRatedStroke => blue, rating => 3')
  ]
)
ratingStory.addChapter(
  'Stroke Improper Value',
  story => {
    let args = {
      'strokeWidth': 2,
      'ratedStroke': 'green'
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'ratedStroke': '#3100' }), 1000)
    setTimeout(() => a.update({ 'ratedStroke': 'red' }), 2000)
  },
  [
    notes('ratedStroke=> green => #3100(green) => red')
  ]
)
ratingStory.addChapter(
  'Orientation',
  story => {
    let args = {
      'orientation': 'r2l'
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'orientation': 't2b' }), 1000)
    setTimeout(() => a.update({ 'orientation': 'b2t' }), 2000)
    setTimeout(() => a.update({ 'orientation': 'gfr' }), 3000)
  },
  [
    notes('orientation => r2l => t2b => b2t => b2t, gfr(b2t) is error')
  ]
)
ratingStory.addChapter(
  'JustifyContent and Align Item along the axis',
  story => {
    let args = {
      'width': 900,
      'height': 100
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'justifyContent': 'start' }), 1000)
    setTimeout(() => a.update({ 'justifyContent': 'end', 'alignItem': 'end' }), 2000)
    setTimeout(() => a.update({ 'justifyContent': 'space-evenly' }), 3000)
    setTimeout(() => a.update({ 'orientation': 't2b', 'height': 500, 'width': 150, 'alignItem': 'start' }), 4000)
  },
  [
    notes('justify: center => start => end => space-evenly, orientation => l2r => t2b alignItem => center => end => start')
  ]
)
ratingStory.addChapter(
  'JustifyContent and Align Item opposite the axis',
  story => {
    let args = {
      'width': 100,
      'height': 900,
      'orientation': 't2b',
      'alignItem': 'center'
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'justifyContent': 'start' }), 1000)
    setTimeout(() => a.update({ 'justifyContent': 'end' }), 2000)
    setTimeout(() => a.update({ 'justifyContent': 'space-evenly' }), 3000)
  },
  [
    notes('justify: center => start => end => space-evenly, alignItem => center => end => start')
  ]
)
ratingStory.addChapter(
  'JustifyContent improper value and alignContent improper value',
  story => {
    let args = {
      'justifyContent': 'ceneeter',
      'alignItem': 'starrrrt'
    }
    new RatingChart(story, args)
  },
  [
    notes('justifyContent: ceneteer(center) alignItem: starrrt (center)')
  ]
)
ratingStory.addChapter(
  'Padding',
  story => {
    let args = {
      'padding': 5
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'padding': 2 }), 1000)
  },
  [
    notes('Render padding of 5px => 2px')
  ]
)
ratingStory.addChapter(
  'Padding Improper Value',
  story => {
    let args = {
      'padding': -2
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'padding': 'green' }), 1000)
    setTimeout(() => a.update({ 'padding': 4 }), 2000)
  },
  [
    notes('Padding: -2(1) => green(1) => 4')
  ]
)
ratingStory.addChapter(
  'strokeWidth',
  story => {
    let args = {
      'strokeWidth': 2,
      'ratedStroke': 'red'
    }
    let a = new RatingChart(story, args)
    setTimeout(() => { a.update({ 'strokeWidth': 4 }) }, 1000)
    setTimeout(() => { a.update({ 'orientation': 'b2t' }) }, 2000)
  },
  [
    notes('strokeWidth => 2 => 4, orientation => l2r => b2t')
  ]
)
ratingStory.addChapter(
  'strokeWidth Improper values',
  story => {
    let args = {
      'strokeWidth': -20
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'strokeWidth': 'green' }), 1000)
  },
  [
    notes('strokeWidth: -20(0) => green(0)')
  ]
)
ratingStory.addChapter(
  'Number of Stars',
  story => {
    let args = {
      'numberOfStars': 7
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'numberOfStars': 9 }), 1000)
    setTimeout(() => a.update({ 'numberOfStars': 3 }), 2000)
  },
  [
    notes('numberOfStars: 7 => 9 => 3')
  ]
)
ratingStory.addChapter(
  'Number of Stars (Initial value is not configurable)',
  story => {
    let args = {
      'numberOfStars': 400
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'numberOfStars': 4 }), 1000)
    setTimeout(() => a.update({ 'numberOfStars': 6 }), 2000)
  },
  [
    notes('numberOfStars: 400(Blank screen) => 4 => 6')
  ]
)

ratingStory.addChapter(
  'Rating with proper & improper values',
  story => {
    let args = {
      'numberOfStars': 7,
      'rating': 5
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'rating': 5.712 }), 1000)
    setTimeout(() => a.update({ 'rating': 'green' }), 2000)
  },
  [
    notes('rating => 5/7 => 5.712/7 => green(7)')
  ]
)
ratingStory.addChapter(
  'Rating with orientation along the axis',
  story => {
    let args = {
      'numberOfStars': 7,
      'rating': 5
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'rating': 4.712 }), 1000)
    setTimeout(() => a.update({ 'orientation': 't2b' }), 2000)
  },
  [
    notes('rating => 5/7 => 4.712/7')
  ]
)
ratingStory.addChapter(
  'Rating with orientation along opposite axis',
  story => {
    let args = {
      'numberOfStars': 6,
      'orientation': 'r2l',
      'rating': 5
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'rating': 4.712 }), 1000)
    setTimeout(() => a.update({ 'orientation': 'b2t' }), 2000)
  },
  [
    notes('rating => 5/6 => 4.712/6')
  ]
)
ratingStory.addChapter(
  'Changing number of stars and rating',
  story => {
    let args = {
      'numberOfStars': 7,
      'rating': 5.71
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'numberOfStars': 4, 'rating': 3.1 }), 1000)
    setTimeout(() => a.update({ 'rating': 0.341, 'numberOfStars': 8, 'orientation': 'r2l' }), 2000)
  },
  [
    notes('numberOfStars => 7 => 4 => 8, rating => 5.71 => 3.1 => 0.341')
  ]
)
ratingStory.addChapter(
  'Configuration is not Possible',
  story => {
    let args = {
      'width': 12,
      'height': 200,
      'numberOfStars': 7,
      'rating': 5
    }
    new RatingChart(story, args)
  },
  [
    notes('Configuration is not possible')
  ]
)
ratingStory.addChapter(
  'Change in number of stars and rating',
  story => {
    let args = {
      'width': 200,
      'height': 200,
      'numberOfStars': 7,
      'rating': 5
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'numberOfStars': 10 }), 1000)
    setTimeout(() => a.update({ 'numberOfStars': 20 }), 2000)
    setTimeout(() => a.update({ 'numberOfStars': 5 }), 3000)
    setTimeout(() => a.update({ 'numberOfStars': 2 }), 4000)
    setTimeout(() => a.update({ 'numberOfStars': 6 }), 5000)
  },
  [
    notes('numberOfStars => 7 => 10 => 20 => 5 => 2 => 6')
  ]
)
ratingStory.addChapter(
  'Stress Test only changing number of Stars',
  story => {
    let args = {
      'width': 400,
      'height': 400,
      'numberOfStars': 7,
      'rating': 5
    }
    let a = new RatingChart(story, args)
    let startTime = new Date() * 1
    let currTime = 0
    let count = 0
    while (currTime <= 100) {
      let i = Math.floor(Math.random() * 10)
      let numberOfStars = (7 + i) % 10
      count += 1
      a.update({ 'numberOfStars': numberOfStars })
      currTime = (new Date() * 1) - startTime
    }
    console.log(count)
  },
  [
    notes('numberOfStars is a random value between 1 and 10')
  ]
)
ratingStory.addChapter(
  'Stress Test only changing rating',
  story => {
    let args = {
      'width': 400,
      'height': 400,
      'numberOfStars': 7,
      'rating': 5
    }
    let a = new RatingChart(story, args)
    let startTime = new Date() * 1
    let currTime = 0
    let count = 0
    while (currTime <= 100) {
      count += 1
      a.update({ 'rating': Math.random() * 7 })
      currTime = (new Date() * 1) - startTime
    }
    console.log(count)
  },
  [
    notes('numberOfStars is a random value between 1 and 10')
  ]
)
ratingStory.addChapter(
  'User provided methods',
  story => {
    let a = new RatingChart(story)
    setTimeout(() => {
      a.onUpdate = 'hello from onUpdate'
      a.onDraw = 'hello from onDraw'
      a.update({ 'ratingFill': 'yellow' })
    }, 1000)
    setTimeout(() => {
      a.onUpdate = function () {
        console.log('Calling from onUpdate Method')
      }
      a.onDraw = function () {
        console.log('Calling from onDraw method')
      }
      a.update({ 'ratingFill': 'green' })
    }, 2000)
  },
  [
    notes('Initially error, then onUpdate and onDraw will be called')
  ]
)
ratingStory.addChapter(
  'Rating value passed from server',
  story => {
    let a = new RatingChart(story)
    setTimeout(() => {
      a.onUpdate = function () {
        console.log('Calling from onUpdate Method')
      }
      a.onDraw = function () {
        console.log('Calling from onDraw method')
      }
      a.update({ 'ratingFill': 'green' })
    }, 0)
    let rating = new EventSource('http://localhost:3000/rating')
    rating.onmessage = function (event) {
      a.update({ 'rating': +event.data })
    }
  },
  [
    notes('Rating value passed from server')
  ]
)

ratingStory.addChapter(
  'Final testing',
  story => {
    let rating = new RatingChart(story, { 'rating': 4.5, 'numberOfStars': 5 })
    let T = 1
    let startTime = ((new Date()).getTime() * 1)
    let time = 0
    let colors = ['#ff0', '#f00', '#0f0', '#000']
    while (time < 100) {
      rating.update({
        'width': 400 + ((T * 100) % 400),
        'height': 400 + ((T * 100) % 400),
        'rating': (4.5 + T + 1) % ((5 + T) % 10 + 1),
        'numberOfStars': (5 + T) % 10 + 1,
        'ratedFill': colors[T % 4]
      })
      time = ((new Date()).getTime() * 1) - startTime
      T++
    }
    console.log(T + ' tests in ' + time + 'ms')
  },
  [
    notes('Testing Final Config')
  ]
)
ratingStory.addChapter(
  'Testing of number of draws in 100ms',
  story => {
    let rating = new RatingChart(story, {
      'rating': 4.5,
      'numberOfStars': 5
    })
    let startTime
    let time = 0
    let colors = ['#ff0', '#f00', '#0f0', '#000']
    let calledDraw = 0
    rating.onPreDraw = function () {
      startTime = ((new Date()).getTime() * 1)
    }
    rating.onDraw = function () {
      calledDraw++
      time += ((new Date()).getTime() * 1) - startTime
      if (calledDraw < 100) {
        rating.update({
          'width': 400 + ((calledDraw * 100) % 400),
          'height': 400 + ((calledDraw * 100) % 400),
          'rating': ((4.5 + calledDraw) % 10 + 1) % ((5 + calledDraw) % 10 + 1),
          'numberOfStars': (5 + calledDraw) % 10 + 1,
          'ratedFill': colors[calledDraw % 4]
        })
      } else {
        console.log('Draw done ' + calledDraw + 'time(s) in ' + time + 'ms')
      }
    }
  },
  [
    notes('Testing timee taken to call draw 100 times')
  ]
)
ratingStory.addChapter(
  'Multiple Rating Chart',
  story => {
    new RatingChart(story, {
      'rating': 4.5,
      'numberOfStars': 5
    })
    new RatingChart(story, {
      'rating': 4.5,
      'ratedFill': 'black'
    })
  },
  [
    notes('Testing timee taken to call draw 100 times')
  ]
)
export default ratingStory
