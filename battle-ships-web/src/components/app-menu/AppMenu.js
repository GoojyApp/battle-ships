import { useCallback } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './style.scss'


function AppMenu() {

  const onClickItem = useCallback((e) => {
    console.log('item', e.target.id)
  }, [])

  return (
    <div>
      <span>Games</span>
    <ListGroup className='app-menu'>
      <ListGroup.Item
        onClick={onClickItem}
        id='battleShipsItem'
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