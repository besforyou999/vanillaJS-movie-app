// Component //
export class Component {
  constructor(payload = {}) {
    const { 
      tagName = 'div',  // 최상위 요소의 태그 이름
      state = {},
      props = {},
    } = payload
    this.el = document.createElement(tagName) // 컴포넌트의 최상위 요소
    this.state = state // 컴포넌트가 사용될 때 부모 컴포넌트에서 받는 데이터
    this.props = props // 컴포넌트 안에서 사용할 데이터
    this.render()
  }
  render() { // 컴포넌트를 렌더링하는 함수
    // ...
    
  }
}



// Router //
// 페이지 렌더링!
function routeRender(routes) {
  // 접속할 때 해시 모드가 아니면 (해시가 없으면) /#/로 리다이렉트!
  if (!location.hash) {
    history.replaceState(null, '', '/#/')
  }

  const routerView = document.querySelector('router-view')
  // 주소에서 # 뒤쪽 모든 내용을 가지고 옴. 단, ? 이후 쿼리는 필요없으므로 split
  const [hash, queryString = ''] = location.hash.split('?')

  // a=123&b=456
  const query = queryString
    .split('&')
    .reduce((acc, cur) => {
      const [key, value] = cur.split('=')
      acc[key] = value
      return acc
  }, {})

  history.replaceState(query, '')
  
  // 현재 루트
  const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash))
  routerView.innerHTML = ''
  routerView.append(new currentRoute.component().el)

  // 화면 전환되면 스크롤 위치 최상단으로
  window.scrollTo(0, 0)
}

export function createRouter(routes) {
  return function() {
    window.addEventListener('popstate', () => {
      routeRender(routes)
    })
    routeRender(routes)
  }
}



//////// Store ////////
export class Store {
  constructor(state) {
    this.state = {}
    this.observers = {}
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: val => {
          state[key] = val 
          this.observers[key].forEach(observer => observer(val))
        }
      })
    }
  }
  subscribe(key, cb) {
    Array.isArray(this.observers[key])
      ? this.observers[key].push(cb)
      : this.observers[key] = [cb]
  }
}