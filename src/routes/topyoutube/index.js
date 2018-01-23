import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'topyoutube',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Topyoutube = require('./containers/topyoutubecontainer').default
      const reducer = require('./modules/topyoutubemodule').default

      /*  Add the reducer to the store on key 'trending'  */
      injectReducer(store, { key: 'topyoutube', reducer })

      /*  Return getComponent   */
      cb(null, Topyoutube)

    /* Webpack named bundle   */
    }, 'topyoutube')
  }
})
