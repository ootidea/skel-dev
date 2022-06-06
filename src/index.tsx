/* @refresh reload */
import { render } from 'solid-js/web'
import { App } from './App'
import './index.scss'
import './lib/common.scss'

render(() => <App />, document.getElementById('root') as HTMLElement)
