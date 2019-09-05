/* eslint-disable no-new */
import { Story, notes, configs } from '../src/lib/story'
import RatingChart from '../components/html/rating'

const ratingStory = new Story('Rating').addMetas([configs()])

ratingStory.addChapter(
  'Default undefined height, width, ratingFill, nonRatingFill, orientation, ratingStroke, nonRatingStroke',
  story => {
    new RatingChart(story)
  },
  [
    notes('Default height = 400px, width = 400px, ratingFill = #ff0, nonRatingFill = #ddd, orientation = l2r, ratingStroke = nonRatingStroke = none')
  ]
)
ratingStory.addChapter(
  'Height Proper Values(Number)',
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
ratingStory.addChapter(
  'Height Proper Values(%)',
  story => {
    let args = {
      'height': '124%'
    }
    new RatingChart(story, args)
  },
  [
    notes('Height will be set to 124%')
  ]
)
ratingStory.addChapter(
  'Height Proper Values(px)',
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
ratingStory.addChapter(
  'Width Proper Values(%)',
  story => {
    let args = {
      'width': '144%'
    }
    new RatingChart(story, args)
  },
  [
    notes('Width will be set to 144%')
  ]
)
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
    notes('Width will be set to 400px, console an error')
  ]
)
ratingStory.addChapter(
  'Accept all Fill possible Values',
  story => {
    let args = {
      'ratingFill': 'black',
      'nonRatingFill': 'green'
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'ratingFill': '#cff' }), 2000)
    setTimeout(() => a.update({ 'ratingFill': 'rgb(225,150,100)' }), 4000)
  },
  [
    notes('Values of hex and rgb is only checked, in case of similarity nonRating falls back to default')
  ]
)
ratingStory.addChapter(
  'Fill Improper Value',
  story => {
    let args = {
      'ratingFill': 'black'
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'nonRatingFill': 'rg(100)' }), 2000)
    setTimeout(() => a.update({ 'nonRatingFill': 'black' }), 2000)
  },
  [
    notes('Values of hex and rgb is only checked, others are handled by browser, or should be handled by user')
  ]
)
ratingStory.addChapter(
  'Orientation',
  story => {
    let args = {
      'orientation': 'r2l'
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'orientation': 't2b' }), 2000)
    setTimeout(() => a.update({ 'orientation': 'b2t' }), 2000)
    setTimeout(() => a.update({ 'orientation': 'gfr' }), 2000)
  },
  [
    notes('4 cases \'l2r\', \'r2l\', \'t2b\', \'b2t\', in case of error, fallback to default and console an error')
  ]
)

ratingStory.addChapter(
  'Accept all Stroke possible Values',
  story => {
    let args = {
      'strokeWidth': 2,
      'ratingStroke': 'green'
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'ratingStroke': '#cff' }), 2000)
    setTimeout(() => a.update({ 'ratingStroke': 'rgb(233,122,231)' }), 4000)
  },
  [
    notes('Values of hex and rgb is only checked, in case of similarity nonRating falls back to default')
  ]
)
ratingStory.addChapter(
  'Stroke Improper Value',
  story => {
    let args = {
      'strokeWidth': 2,
      'ratingStroke': 'green'
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'nonRatingStroke': '10#0' }), 2000)
    setTimeout(() => a.update({ 'nonRatingStroke': 'green' }), 2000)
  },
  [
    notes('Values of hex and rgb is only checked, others are handled by browser, or should be handled by user')
  ]
)
ratingStory.addChapter(
  'strokeWidth',
  story => {
    let args = {
      'strokeWidth': 1,
      'ratingStroke': 'red'
    }
    let a = new RatingChart(story, args)
    setTimeout(() => { a.update({ 'strokeWidth': 2 }) }, 2000)
  },
  [
    notes('Render a strokeWidth of 2px')
  ]
)
ratingStory.addChapter(
  'strokeWidth Improper values',
  story => {
    let args = {
      'strokeWidth': -20
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'strokeWidth': 'green' }), 2000)
  },
  [
    notes('Render a strokeWidth calculated lower limit,console log an error')
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
    setTimeout(() => a.update({ 'justifyContent': 'end', 'alignItem': 'end' }), 4000)
    setTimeout(() => a.update({ 'justifyContent': 'space-evenly' }), 6000)
    setTimeout(() => a.update({ 'orientation': 't2b', 'alignItem': 'center' }), 8000)
  },
  [
    notes('Render all meaningful possible states')
  ]
)
ratingStory.addChapter(
  'JustifyContent improper value and alignContent improper value',
  story => {
    let args = {
      'justifyContent': 'ceneeter',
      'alignContent': 'starrrrt'
    }
    new RatingChart(story, args)
  },
  [
    notes('Render default(center) and console an error')
  ]
)
ratingStory.addChapter(
  'Padding',
  story => {
    let args = {
      'padding': 5
    }
    new RatingChart(story, args)
  },
  [
    notes('Render padding of 5px')
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
    setTimeout(() => a.update({ 'padding': 300 }), 4000)
  },
  [
    notes('Render padding of 10% of side, console log an error')
  ]
)
ratingStory.addChapter(
  'Number of Stars',
  story => {
    let args = {
      'numberOfStars': 7
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'numberOfStars': 9.7 }), 2000)
    setTimeout(() => a.update({ 'numberOfStars': 'green' }), 2000)
  },
  [
    notes('Render correctly 7 stars, 9 stars.')
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
    notes('Render correctly 5/7 stars rating, 5.712/7, then fallback to 100% rating, console log all errors')
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
    setTimeout(() => a.update({ 'orientation': 'l2r', 'numberOfStars': 4 }), 6000)
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
export default ratingStory
