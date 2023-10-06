import { Component } from "../core/heropy";
import Headline from '../components/Headline'

export default class Home extends Component {
  render() {
    const headline = new Headline().el
    // Home 컴포넌트는 container 이름을 가진 div로 만들어지고
    this.el.classList.add('container')
    this.el.append(
      headline // headline 컴포넌트가 append 될것
    )
  }
}