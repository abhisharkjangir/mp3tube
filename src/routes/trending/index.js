import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Trending = require('./containers/trendingcontainer').default
      const reducer = require('./modules/trendingmodule').default

      /*  Add the reducer to the store on key 'trending'  */
      injectReducer(store, { key: 'trending', reducer })

      /*  Return getComponent   */
      cb(null, Trending)

    /* Webpack named bundle   */
    }, 'trending')
  }
})
