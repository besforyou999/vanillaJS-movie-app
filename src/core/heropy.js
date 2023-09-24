// Component //
export class Component {
  constructor(payload = {}) {
    const { 
      tagName = 'div',
      state = {},
      props = {},
    } = payload
    this.el = document.createElement(tagName)
    this.state = state
    this.props = props
    this.render()
  }
  render() {
    // ...
    
  }
}

// Router //
function routeRender(routes) {
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
}

export function createRouter(routes) {
  return function() {
    window.addEventListener('popstate', () => {
      routeRender(routes)
    })
    routeRender(routes)
  }
}