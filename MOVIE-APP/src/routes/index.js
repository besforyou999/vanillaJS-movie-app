import { createRouter } from '../core/heropy'
import Home from './Home'
import Movie from './Movie'

// createRouter : 페이지를 구분하는 다양한 옵션을 받을 수 있음.
export default createRouter([
  { path: '#/', component: Home },
  { path: '#/movie', component: Movie}
])