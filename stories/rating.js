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
// fallback ???
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
  'Accept all Fill possible Values',
  story => {
    let args = {
      'ratingFill': 'black',
      'nonRatingFill': 'green'
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'ratingFill': '#fcc' }), 2000)
    setTimeout(() => a.update({ 'nonRatingFill': 'rgb(225, 150,100)' }), 2000)
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
      'ratingStroke': 'green',
      'nonRatingStroke': 'black'
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'ratingStroke': '#cfc' }), 2000)
    setTimeout(() => a.update({ 'nonRatingStroke': 'rgb(125,150,100)' }), 2000)
  },
  [
    notes('Values of hex and rgb is only checked, in case of similarity nonRating falls back to default')
  ]
)
ratingStory.addChapter(
  'Stroke Improper Value',
  story => {
    let args = {
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
      'strokeWidth': 2
    }
    new RatingChart(story, args)
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
  'Justify-content',
  story => {
    let args = {
      'justify-content': 'center'
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'justify-content': 'start' }), 2000)
    setTimeout(() => a.update({ 'justify-content': 'end' }), 2000)
    setTimeout(() => a.update({ 'justify-content': 'strech' }), 2000)
  },
  [
    notes('Render all possible states')
  ]
)
ratingStory.addChapter(
  'Justify-content improper value',
  story => {
    let args = {
      'justify-content': 'ceneeter'
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
    setTimeout(() => a.update({ 'padding': 300 }), 2000)
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
    setTimeout(() => a.update({ 'numberOfStars': -30 }), 2000)
  },
  [
    notes('Render correctly 7 stars, 9 stars then fallback to 5, console log an error')
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
    setTimeout(() => a.update({ 'numberOfStars': -30 }), 2000)
    setTimeout(() => a.update({ 'numberOfStars': 30 }), 2000)
  },
  [
    notes('Render correctly 7 stars, 9 stars then fallback to 5, then throw an error and console log all errors')
  ]
)
ratingStory.addChapter(
  'Rating',
  story => {
    let args = {
      'numberOfStars': 7,
      'rating': 8
    }
    new RatingChart(story, args)
  },
  [
    notes('fallback to 100% rating, console log error')
  ]
)
ratingStory.addChapter(
  'Rating',
  story => {
    let args = {
      'numberOfStars': 7,
      'rating': 5
    }
    let a = new RatingChart(story, args)
    setTimeout(() => a.update({ 'rating': 5.712 }), 2000)
    setTimeout(() => a.update({ 'rating': 'green' }), 2000)
    setTimeout(() => a.update({ 'rating': -30 }), 2000)
    setTimeout(() => a.update({ 'rating': 30 }), 2000)
  },
  [
    notes('Render correctly 5/7 stars rating, 5.712/7, then fallback to 100% rating, console log all errors')
  ]
)
export default ratingStory
