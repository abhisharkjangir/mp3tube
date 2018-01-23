import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'toppunjabi',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Toppunjabi = require('./containers/toppunjabicontainer').default
      const reducer = require('./modules/toppunjabimodule').default

      /*  Add the reducer to the store on key 'trending'  */
      injectReducer(store, { key: 'toppunjabi', reducer })

      /*  Return getComponent   */
      cb(null, Toppunjabi)

    /* Webpack named bundle   */
    }, 'toppunjabi')
  }
})
