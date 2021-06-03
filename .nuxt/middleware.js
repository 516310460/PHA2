const middleware = {}

middleware['Auth'] = require('../middleware/Auth.js')
middleware['Auth'] = middleware['Auth'].default || middleware['Auth']

export default middleware
