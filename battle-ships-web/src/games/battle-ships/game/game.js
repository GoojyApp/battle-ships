import { useSelector } from "react-redux"
import ShipsEditBoard from "../board/ShipsEditBoard"
import { getBoard, getShips } from "../../../store.js/battleShipsGame/battleShipsGameSlice"



const Game = (props) => {
    
    const board = useSelector(getBoard)
    const ships = useSelector(getShips)

    return (
        <div>
            <ShipsEditBoard
                board={board}
                ships={ships}
            />
        </div>
    )
}

export default Game
