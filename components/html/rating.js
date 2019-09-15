export default class RatingChart {
  constructor (container, args) {
    if (!(container instanceof HTMLElement)) {
      console.error('Container is not a valid DOM Element')
      return null
    }
    this._config = {
      height: 400,
      width: 400,
      numberOfStars: 5,
      ratedFill: '#ff0',
      nonRatedFill: '#ddd',
      ratedStroke: 'none',
      nonRatedStroke: 'none',
      rating: undefined,
      justifyContent: 'center',
      alignItem: 'center',
      orientation: 'l2r',
      container: container,
      strokeWidth: 0,
      padding: 1,
      isAnimationFrameAvailable: true
    }
    this._svg = {
      element: createDOMNode('svg'),
      'width': undefined,
      'height': undefined,
      defs: {
        element: undefined,
        defsCommonProperties: {
          stopOffset: undefined,
          orientation: undefined,
          x1: undefined,
          x2: undefined,
          y1: undefined,
          y2: undefined
        },
        gradientFill: {
          element: undefined,
          url: 'gradient-fill',
          ratedStop: {
            element: undefined,
            'stop-color': undefined
          },
          nonRatedStop: {
            element: undefined,
            'stop-color': undefined
          }
        },
        gradientStroke: {
          element: undefined,
          url: 'gradient-stroke',
          ratedStop: {
            element: undefined,
            'stop-color': undefined
          },
          nonRatedStop: {
            element: undefined,
            'stop-color': undefined
          }
        }
      },
      stars: []
    }
    this._config.container.appendChild(this._svg.element)
    this._createAndUpdate(args)
  }
  _createAndUpdate (args) {
    if (!args || (args && this._validateAndSet(args))) {
      if (this._config.isAnimationFrameAvailable) {
        this._config.isAnimationFrameAvailable = false
        requestAnimationFrame(() => {
          this._config.isAnimationFrameAvailable = true
          this._draw()
        })
      }
    }
  }
  update (args) {
    this._createAndUpdate(args)
    if (typeof this.onUpdate === 'function') {
      this.onUpdate()
    } else if (this.onUpdate) {
      console.error('onUpdate is not a function')
    }
  }
  _validateAndSet (args) {
    if (args.height) {
      let val = typeof args.height === 'number' ? args.height : extractNumericalValue(args.height)
      if (val > 10) {
        this._config.height = val
      } else {
        console.error('Height is less than 10px')
      }
    }
    if (args.width) {
      let val = typeof args.width === 'number' ? args.width : extractNumericalValue(args.width)
      if (val > 10) {
        this._config.width = val
      } else {
        console.error('Width is less than 10px')
      }
    }
    if (args.ratedFill) {
      if (checkColorCode(args.ratedFill)) {
        this._config.ratedFill = args.ratedFill
      } else {
        console.error('Invalid value RatedFill')
      }
    }
    if (args.nonRatedFill) {
      if (checkColorCode(args.nonRatedFill)) {
        this._config.nonRatedFill = args.nonRatedFill
      } else {
        console.error('Invalid value NonRatedFill')
      }
    }
    if (args.ratedStroke) {
      if (checkColorCode(args.ratedStroke)) {
        this._config.ratedStroke = args.ratedStroke
      } else {
        console.error('Invalid value ratedStroke')
      }
    }
    if (args.nonRatedStroke) {
      if (checkColorCode(args.nonRatedStroke)) {
        this._config.nonRatedStroke = args.nonRatedStroke
      } else {
        console.error('Invalid value NonRatedStroke')
      }
    }
    if (args.justifyContent) {
      if (typeof args.justifyContent === 'string' &&
      ['start', 'end', 'center', 'space-evenly'].includes(args.justifyContent.toLowerCase())) {
        this._config.justifyContent = args.justifyContent
      } else {
        console.error('Invalid value of JustifyContent')
      }
    }
    if (args.alignItem) {
      if (typeof args.alignItem === 'string' &&
      ['start', 'end', 'center'].includes(args.alignItem.toLowerCase())) {
        this._config.alignItem = args.alignItem
      } else {
        console.error('Invalid value of AlignItem')
      }
    }
    if (args.strokeWidth) {
      if (args.strokeWidth > 0) {
        this._config.strokeWidth = args.strokeWidth
      } else {
        console.error('StrokeWidth should be a positive number')
      }
    }
    if (args.padding) {
      if (args.padding > 0) {
        this._config.padding = args.padding
      } else {
        console.error('Padding should be a positive number')
      }
    }
    if (args.orientation) {
      if (['l2r', 'r2l', 't2b', 'b2t'].includes(args.orientation)) {
        this._config.orientation = args.orientation
      } else {
        console.error('Invalid value of orientation')
      }
    }
    if (args.numberOfStars) {
      if (args.numberOfStars > -1) {
        this._config.numberOfStars = Number.parseInt(args.numberOfStars)
      } else {
        console.error('Improper value of numberOfStars')
      }
    }
    if (args.rating) {
      if (this._config.numberOfStars > args.rating && args.rating > -1) {
        this._config.rating = args.rating
      } else {
        this._config.rating = undefined
        console.error('Improper rating value')
      }
    } else if (this._config.numberOfStars < this._config.rating) {
      this._config.rating = undefined
      console.error('Rating cannot be more than numberOfStars')
    }
    return this._checkConfig()
  }
  _checkConfig () {
    let block
    if (this._config.orientation === 'l2r' || this._config.orientation === 'r2l') {
      block = Math.min(this._config.height, this._config.width / this._config.numberOfStars)
    } else {
      block = Math.min(this._config.width, this._config.height / this._config.numberOfStars)
    }
    if (block * 0.1 < this._config.padding) {
      console.error('Configuration not possible as Padding cannot be greater than 10% of blockSize')
      return false
    }
    if (block * 0.1 < this._config.strokeWidth) {
      console.error('Configuration not possible as StrokeWidth cannot be greater than 10% of blockSize')
      return false
    }
    if ((block - 2 * (this._config.padding + this._config.strokeWidth)) / block < 0.2) {
      console.error('Configuration not possible as Content area should be atleast 20% of available space')
      return false
    }
    return true
  }
  _draw () {
    if (typeof this.onPreDraw === 'function') {
      this.onPreDraw()
    } else if (this.onPreDraw) {
      console.error('OnPreDraw should be a function')
    }
    this._setAttribute(this._svg, {
      'width': this._config.width,
      'height': this._config.height
    }, true)
    let blockSize
    let justify
    let align
    if (this._config.orientation === 'l2r' || this._config.orientation === 'r2l') {
      blockSize = Math.min(this._config.height, this._config.width / this._config.numberOfStars)
      justify = this._calculateJustifyAndAlign(this._config.justifyContent, this._config.width, blockSize, this._config.numberOfStars)
      align = this._calculateJustifyAndAlign(this._config.alignItem, this._config.height, blockSize)
    } else {
      blockSize = Math.min(this._config.width, this._config.height / this._config.numberOfStars)
      justify = this._calculateJustifyAndAlign(this._config.justifyContent, this._config.height, blockSize, this._config.numberOfStars)
      align = this._calculateJustifyAndAlign(this._config.alignItem, this._config.width, blockSize)
    }
    let rating = this._config.rating ? this._config.rating : this._config.numberOfStars
    let ratedFill
    let nonRatedFill
    let ratedStroke
    let nonRatedStroke
    if (this._config.orientation === 'l2r' || this._config.orientation === 't2b') {
      [ratedFill, nonRatedFill] = [this._config.ratedFill, this._config.nonRatedFill];
      [ratedStroke, nonRatedStroke] = [this._config.ratedStroke, this._config.nonRatedStroke]
    } else {
      rating = this._config.numberOfStars - rating;
      [ratedFill, nonRatedFill] = [this._config.nonRatedFill, this._config.ratedFill];
      [ratedStroke, nonRatedStroke] = [this._config.nonRatedStroke, this._config.ratedStroke]
    }
    if (Number.parseInt(rating) !== rating) {
      this._createOrUpdateGradient(ratedFill, nonRatedFill, ratedStroke, nonRatedStroke)
    }
    const n = this._config.numberOfStars > this._svg.stars.length ? this._config.numberOfStars : this._svg.stars.length
    const currentNumberOfStars = this._svg.stars.length
    let offset
    let args = {
      'stroke-width': this._config.strokeWidth
    }
    const radius = (blockSize - 2 * (this._config.strokeWidth + this._config.padding)) / 2
    const relativePath = this._calculateStar(radius)
    for (let i = 0; i < n; i++) {
      if (i > this._config.numberOfStars) {
        this._svg.stars.pop().element.remove()
      } else {
        if (i >= currentNumberOfStars) {
          let path = createDOMNode('path')
          this._svg.element.appendChild(path)
          this._svg.stars.push({
            element: path,
            'd': undefined,
            'fill': undefined,
            'stroke': undefined,
            'stroke-width': undefined
          })
        }
        if (this._config.justifyContent !== 'space-evenly') {
          offset = justify + blockSize * i
        } else {
          offset = (2 * i + 1) * justify + i * blockSize
        }
        if (this._config.orientation === 'l2r' || this._config.orientation === 'r2l') {
          args['d'] = 'M' + (radius + offset + this._config.strokeWidth + this._config.padding) +
          ',' + (align + this._config.strokeWidth + this._config.padding) + ' ' + relativePath
        } else {
          args['d'] = 'M' + (radius + align + this._config.strokeWidth + this._config.padding) +
          ',' + (offset + this._config.strokeWidth + this._config.padding) + ' ' + relativePath
        }
        if (rating >= 1) {
          args['fill'] = ratedFill
          args['stroke'] = ratedStroke
        } else if (rating > 0 && rating < 1) {
          args['fill'] = 'url(#' + this._svg.defs.gradientFill.url + ')'
          args['stroke'] = 'url(#' + this._svg.defs.gradientStroke.url + ')'
        } else {
          args['fill'] = nonRatedFill
          args['stroke'] = nonRatedStroke
        }
        this._setAttribute(this._svg.stars[i], args, true)
        rating -= 1
      }
    }
    if (typeof this.onDraw === 'function') {
      this.onDraw()
    } else if (this.onDraw) {
      console.error('onDraw is not a function')
    }
  }
  _createOrUpdateGradient (ratedFill, nonRatedFill, ratedStroke, nonRatedStroke) {
    if (!this._svg.defs.element) {
      this._svg.defs.element = createDOMNode('defs')
      this._svg.defs.gradientFill.element = createDOMNode('linearGradient')
      this._svg.defs.gradientFill.ratedStop.element = createDOMNode('stop')
      this._svg.defs.gradientFill.nonRatedStop.element = createDOMNode('stop')
      this._svg.defs.gradientStroke.element = createDOMNode('linearGradient')
      this._svg.defs.gradientStroke.ratedStop.element = createDOMNode('stop')
      this._svg.defs.gradientStroke.nonRatedStop.element = createDOMNode('stop')
      this._svg.defs.gradientFill.element.appendChild(this._svg.defs.gradientFill.ratedStop.element)
      this._svg.defs.gradientFill.element.appendChild(this._svg.defs.gradientFill.nonRatedStop.element)
      this._svg.defs.gradientStroke.element.appendChild(this._svg.defs.gradientStroke.ratedStop.element)
      this._svg.defs.gradientStroke.element.appendChild(this._svg.defs.gradientStroke.nonRatedStop.element)
      this._svg.defs.element.appendChild(this._svg.defs.gradientFill.element)
      this._svg.defs.element.appendChild(this._svg.defs.gradientStroke.element)
      this._svg.element.appendChild(this._svg.defs.element)
      this._svg.defs.defsCommonProperties.x1 = '0%'
      this._svg.defs.defsCommonProperties.y1 = '0%'
      this._setAttribute(this._svg.defs.gradientFill.element, {
        'x1': this._svg.defs.defsCommonProperties.x1,
        'y1': this._svg.defs.defsCommonProperties.y1,
        'id': this._svg.defs.gradientFill.url
      })
      this._setAttribute(this._svg.defs.gradientStroke.element, {
        'x1': this._svg.defs.defsCommonProperties.x1,
        'y1': this._svg.defs.defsCommonProperties.y1,
        'id': this._svg.defs.gradientStroke.url
      })
    }
    let orientation = (this._config.orientation === 'r2l' || this._config.orientation === 'l2r') ? 'row' : 'column'
    if (this._svg.defs.defsCommonProperties.orientation !== orientation) {
      this._svg.defs.defsCommonProperties.orientation = orientation
      this._svg.defs.defsCommonProperties.x2 = (orientation === 'row') ? '100%' : '0%'
      this._svg.defs.defsCommonProperties.y2 = (orientation === 'row') ? '0%' : '100%'
      this._setAttribute(this._svg.defs.gradientFill.element, {
        'x2': this._svg.defs.defsCommonProperties.x2,
        'y2': this._svg.defs.defsCommonProperties.y2
      })
      this._setAttribute(this._svg.defs.gradientStroke.element, {
        'x2': this._svg.defs.defsCommonProperties.x2,
        'y2': this._svg.defs.defsCommonProperties.y2
      })
    }
    let n = this._config.rating - Math.trunc(this._config.rating)
    n = ((this._config.orientation === 'l2r' || this._config.orientation === 't2b') ? n : 1 - n) * 100 + '%'
    if (this._svg.defs.defsCommonProperties.stopOffset !== n) {
      this._svg.defs.defsCommonProperties.stopOffset = n
      this._setAttribute(this._svg.defs.gradientFill.ratedStop.element, { 'offset': n })
      this._setAttribute(this._svg.defs.gradientFill.nonRatedStop.element, { 'offset': n })
      this._setAttribute(this._svg.defs.gradientStroke.ratedStop.element, { 'offset': n })
      this._setAttribute(this._svg.defs.gradientStroke.nonRatedStop.element, { 'offset': n })
    }
    this._setAttribute(this._svg.defs.gradientFill.ratedStop, {
      'stop-color': ratedFill
    }, true)
    this._setAttribute(this._svg.defs.gradientFill.nonRatedStop, {
      'stop-color': nonRatedFill
    }, true)
    this._setAttribute(this._svg.defs.gradientStroke.ratedStop, {
      'stop-color': ratedStroke
    }, true)
    this._setAttribute(this._svg.defs.gradientStroke.nonRatedStop, {
      'stop-color': nonRatedStroke
    }, true)
  }
  _calculateJustifyAndAlign (alignment, side, blockSize, numberOfStars = 1) {
    if (alignment === 'start') {
      return 0
    } else if (alignment === 'end') {
      return side - blockSize * numberOfStars
    } else if (alignment === 'center') {
      return (side - blockSize * numberOfStars) / 2
    } else if (alignment === 'space-evenly') {
      return (side - blockSize * numberOfStars) / (2 * numberOfStars)
    }
  }
  _setAttribute (node, attrs = {}, willCheck = false) {
    for (let property in attrs) {
      if (willCheck) {
        if (property === 'd' || node[property] !== attrs[property]) {
          node[property] = attrs[property]
          node.element.setAttribute(property, attrs[property])
        }
      } else {
        node.setAttribute(property, attrs[property])
      }
    }
  }
  _calculateStar (radius) {
    const distanceHorizontal = (radius * (Math.cos(Math.PI * 36 / 180))) / 2
    const distanceVertical = radius * (Math.sin(Math.PI * 36 / 180))
    const d = 'l' + distanceHorizontal + ',' + distanceVertical + ' ' +
        'h' + (radius - distanceHorizontal) + ' ' +
        'l-' + (radius - distanceHorizontal) + ',' + (radius - distanceVertical) + ' ' +
        'l' + (radius - distanceHorizontal) + ',' + radius + ' ' +
        'l-' + radius + ',-' + (radius / 2) + ' ' +
        'l-' + radius + ',' + (radius / 2) + ' ' +
        'l' + (radius - distanceHorizontal) + ',-' + radius + ' ' +
        'l-' + (radius - distanceHorizontal) + ',-' + (radius - distanceVertical) + ' ' +
        'h' + (radius - distanceHorizontal) + ' ' + 'z'
    return d
  }
}
function checkColorCode (str) {
  if (str.startsWith('#') && !(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)|(^#[0-9a-f]{6}$)|(^#[0-9a-f]{3}$) /i.test(str))) {
    return false
  } else if (str.startsWith('rgb') && !(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/i.test(str))) {
    return false
  }
  return true
}
function extractNumericalValue (val) {
  return +val.replace(/(px)$/g, '')
}
function createDOMNode (nodeName) {
  const xlmnsSvg = 'http://www.w3.org/2000/svg'
  return document.createElementNS(xlmnsSvg, nodeName)
}
