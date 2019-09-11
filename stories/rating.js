/* eslint-disable no-new */
import { Story, notes, configs } from '../src/lib/story'
import RatingChart from '../components/html/rating'

const ratingStory = new Story('Rating').addMetas([configs()])

ratingStory.addChapter(
  'Default undefined height, width, ratedFill, nonRatedFill, orientation, ratedStroke, nonRatedStroke',
  story => {
    new RatingChart(story)
  },
  [
    notes('Default height = 400px, width = 400px, ratedFill = #ff0, nonRatedFill = #ddd, orientation = l2r, ratedStroke = nonRatedStroke = none')
  ]
)
ratingStory.addChapter(
  'Height Proper Values(Number) 450',
  story => {
    let args = {
      'height': 450
    }
    new RatingChart(story, args)
  },
  [
    notes('Height will be set to 450px')
  ]
)
// ratingStory.addChapter(
//   'Height Proper Values(%) 124%',
//   story => {
//     let args = {
//       'height': '124%'
//     }
//     new RatingChart(story, args)
//   },
//   [
//     notes('Height will be set to 124%')
//   ]
// )
ratingStory.addChapter(
  'Height Proper Values(px) 340px',
  story => {
    let args = {
      'height': '340px'
    }
    new RatingChart(story, args)
  },
  [
    notes('Height will be set to 340px')
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
  'Width Proper Values(Number)',
  story => {
    let args = {
      'width': 470
    }
    new RatingChart(story, args)
  },
  [
    notes('Width will be set to 470px')
  ]
)
// ratingStory.addChapter(
//   'Width Proper Values(%)',
//   story => {
//     let args = {
//       'width': '144%'
//     }
//     new RatingChart(story, args)
//   },
//   [
//     notes('Width will be set to 144%')
//   ]
// )
ratingStory.addChapter(
  'Width Proper Values(px)',
  story => {
    let args = {
      'width': '405px'
    }
    new RatingChart(story, args)
  },
  [
    notes('Width will be set to 405px')
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
    setTimeout(() => a.update({ 'width': '333px' }), 2000)
    setTimeout(() => a.update({ 'width': '900px' }), 2000)
    setTimeout(() => a.update({ 'height': '100px' }), 2000)
  },
  [
    notes('Height = 400px, width = 200px,:: height = 400px width: 333px :: height = 400px, width = 900px :: height = 100px, width= 900px')
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
    setTimeout(() => a.update({ 'ratedFill': '#cff' }), 2000)
    setTimeout(() => a.update({ 'ratedFill': 'rgb(225,150,100)' }), 4000)
    setTimeout(() => a.update({ 'nonRatedFill': 'red' }), 6000)
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
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'ratedFill': 'blue' }), 1000)
    setTimeout(() => a.update({ 'ratedFill': 'green' }), 2000)
  },
  [
    notes('ratedFill: rgb(11)(#ff0)  => blue => green')
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
    notes('orientation => r2l => t2b => b2t => b2t, gfr is error')
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
    setTimeout(() => a.update({ 'ratedStroke': '10#0' }), 1000)
    setTimeout(() => a.update({ 'ratedStroke': 'red' }), 2000)
  },
  [
    notes('ratedStroke=> green => 10#0(green) => red')
  ]
)
ratingStory.addChapter(
  'strokeWidth',
  story => {
    let args = {
      'strokeWidth': 1,
      'ratedStroke': 'red'
    }
    let a = new RatingChart(story, args)
    setTimeout(() => { a.update({ 'strokeWidth': 4 }) }, 1000)
  },
  [
    notes('strokeWidth => 1 => 2')
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
    notes('strokeWidth: -20 (0) => green(0)')
  ]
)
ratingStory.addChapter(
  'JustifyContent and Align Item',
  story => {
    let args = {
      'justifyContent': 'center',
      'alignItem': 'center',
      'width': 900,
      'height': 100
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'justifyContent': 'start' }), 2000)
    setTimeout(() => a.update({ 'justifyContent': 'end', 'alignItem': 'end' }), 3000)
    setTimeout(() => a.update({ 'justifyContent': 'space-evenly' }), 4000)
    setTimeout(() => a.update({ 'orientation': 't2b', 'alignItem': 'center', 'height': 300 }), 5000)
  },
  [
    notes('justify: center => start => end => space-evenly, orientation => t2b alignItem => center')
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
    setTimeout(() => a.update({ 'padding': 'green' }), 2000)
    setTimeout(() => a.update({ 'padding': 4 }), 3000)
    setTimeout(() => a.update({ 'padding': 300 }), 4000)
  },
  [
    notes('Padding: -2 (1) => green(1) => 4 => 300(4)')
  ]
)
ratingStory.addChapter(
  'Number of Stars',
  story => {
    let args = {
      'numberOfStars': 7
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'numberOfStars': 9 }), 2000)
    setTimeout(() => a.update({ 'numberOfStars': 400 }), 3000)
  },
  [
    notes('numberOfStars: 7 => 9 => 400(9)')
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
    setTimeout(() => a.update({ 'rating': -30 }), 3000)
    setTimeout(() => a.update({ 'rating': 30 }), 4000)
  },
  [
    notes('rating => 5/7 => 5.712/7 => green(5.712) => -30(5.712) => 30 (5.712)')
  ]
)
ratingStory.addChapter(
  'Rating with DOM re-render',
  story => {
    let args = {
      'orientation': 't2b',
      'numberOfStars': 7,
      'rating': 5
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'rating': 5.71, 'orientation': 'r2l' }), 2000)
    setTimeout(() => a.update({ 'orientation': 'l2r', 'numberOfStars': 4 }), 4000)
  },
  [
    notes('Render correctly 7/5, 7/5.71, then fallback to undefined')
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
  'Stress Test',
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
      setTimeout(() => a.update({ 'numberOfStars': numberOfStars }), 0)
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
      a.onUpdate = function () {
        console.log('Calling from onUpdate Method')
      }
      a.onDraw = function () {
        console.log('Calling from onDraw method')
      }
      a.update({ 'ratingFill': 'green' })
    }, 1000)
  },
  [
    notes('onUpdate and onDraw will be called after 1s')
  ]
)
export default ratingStory
