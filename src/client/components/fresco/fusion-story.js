import SmartRenderer from '../../../../../fc-core/src/component-interface/smart-renderer'
import AnimationManager from '../../../../../fc-core/src/animation-manager'
import Raphael from '../../../../../fc-core/src/_internal/vendors/redraphael/source/raphael'
import SmartLabelManager from '../../../../../fc-core/src/_internal/vendors/fusioncharts-smartlabel/src/SmartlabelManager.js'

const animationManagerFactory = fusionStory => {
  const animationManager = fusionStory.attachChild(
    AnimationManager,
    'animationManager'
  )

  animationManager.addToEnv('chart', fusionStory)
  animationManager.configure()
  animationManager.setAnimationState('default')
}
const hasSetDimension = child => child.setDimension

class FusionStory extends SmartRenderer {
  constructor () {
    super()

    this.registerFactory('animationManager', animationManagerFactory)

    this.addToEnv('smartLabel', new SmartLabelManager(document.body))
  }

  __setDefaultConfig () {
    super.__setDefaultConfig()
    this.config.width = this.config.height = '100%'
  }

  configureAttributes (config = {}) {
    Object.assign(this.config, config)

    this.addToEnv('core-options', {})
    this.addToEnv('chartInstance', { args: {} })
  }

  draw () {
    const children = this.getChildren()
    this.addToEnv('animationManager', children.animationManager.elemStore[0])
    const config = this.config
    let paper

    if (!(paper = this.getFromEnv('paper'))) {
      paper = Raphael(config.id, config.width, config.height)
      this.addToEnv('paper', paper)
    }

    const { width, height } = paper.canvas.getBoundingClientRect()
    const setDimension = child => child.setDimension(width, height)

    for (const key in children) {
      if (children.hasOwnProperty(key)) {
        const childs = children[key].elemStore
        childs.filter(hasSetDimension).forEach(setDimension)
      }
    }
  }
}

export default FusionStory
