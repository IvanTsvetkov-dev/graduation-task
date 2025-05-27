import './css/style.css'
import './css/fontello.css'
import { Header } from './components/Header/header'
import { Footer } from './components/Footer/footer'
import { IndexMain } from './components/IndexPage-Main/index-main'
import { Switch, Route } from 'react-router-dom'
import { SearchMainPage } from './components/SearchPage-Main/search-main'
function App() {
	return (
		<>
			<Header />
			<Switch>
				<Route exact path='/' component={IndexMain} />
				<Route path='/search' component={SearchMainPage} />
			</Switch>
			<Footer />
		</>
	)
}
export default App
