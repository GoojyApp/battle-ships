import { useSelector } from 'react-redux'
import { navigationSelectors } from '../../store.js/pages/pagesSlice'
import { appPages } from '../../constants/pages'
import BattleShipsGame from '../../games/battle-ships/game/Game'
import './style.scss'

const HomePage = (props) => {

    return (
        <div>
            Home
        </div>
    )
}

const MainScreen = (props) => {

    const pages = useSelector(navigationSelectors.getPages)
    const selectedPage = useSelector(navigationSelectors.getSelectedPage)

    return (
        <div className='main-screen'>
            {
                (selectedPage.id === appPages.HOME.id) ? (
                    <HomePage/>
                ) : (
                    <BattleShipsGame/>
                )
            }
        </div>
    )
}

export default MainScreen
