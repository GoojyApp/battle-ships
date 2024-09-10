import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { appPages } from '../../constants/pages';
import ListGroup from 'react-bootstrap/ListGroup';
import { navigationSelectors, setPage } from '../../store.js/pages/pagesSlice';
import './style.scss'


function AppMenu() {

  const dispatch = useDispatch()
  const selectedPage = useSelector(navigationSelectors.getSelectedPage)

  const onClickItem = useCallback((e) => {
    dispatch(setPage(e.target.id))
  }, [])

  return (
    <div>
      <span>Games</span>
    <ListGroup className='app-menu'>
      <ListGroup.Item
        onClick={onClickItem}
        id={appPages.BATTLE_SHIPS.id}
      >
        Battle ships
      </ListGroup.Item>
      <ListGroup.Item>
        Tic tac toe (coming soon..)
      </ListGroup.Item>
    </ListGroup>
    </div>
  );
}

export default AppMenu;