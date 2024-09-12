import { useSelector } from "react-redux"
import PreparingBoard from "../board/PreparingBoard"
import { getBoard, getShips, getIsPrepare, getPlayer, getBot } from "../../../store.js/battleShipsGame/battleShipsGameSlice"
import BattleBoard from "../board/BattleBoard"



const Game = (props) => {
    
    const player = useSelector(getPlayer)
    const bot = useSelector(getBot)
    const board = useSelector(getBoard)
    const ships = useSelector(getShips)
    const isPrepare = useSelector(getIsPrepare)

    return (
        <div>
            {
                isPrepare ? (
                    <BattleBoard
                        player={player}
                        bot={bot}
                    />
                ) : (
                    <PreparingBoard
                        board={board}
                        ships={ships}
                    />
                )
            }
        </div>
    )
}

export default Game
