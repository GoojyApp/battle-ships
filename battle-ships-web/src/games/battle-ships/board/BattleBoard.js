import { useMemo, useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCellsEditableOnBoard } from '../battleShipsUtils'
import { deepCopy, removeItem } from '../../../utils'
import { getIsPrepare, setShip, getBot, getPlayer, getIsPlayerTurn, setPlayerShoots } from '../../../store.js/battleShipsGame/battleShipsGameSlice'
import { cellState, cellType } from '../constants'
import BattleZone from './BattleZone'
import './style.scss'


const BattleBoard = (props) => {

    const dispatch = useDispatch()

    const { player, bot } = props

    const isPlayerTurn = useSelector(getIsPlayerTurn)
    
    const onClickCell = useCallback(({ rIndex, cIndex, id }) => {
        if (!isPlayerTurn) return
        dispatch(setPlayerShoots(id))
    }, [isPlayerTurn, dispatch])

    const playerBoard = useMemo(() => {
        const { board } = player
        const playerBoard = deepCopy(board)
        playerBoard.forEach(row => {
            row.forEach(cell => {
            })
        });
        return playerBoard
    }, [player])

    const markerBoard = useMemo(() => {
        const { board, markerBoard } = bot
        const copy = deepCopy(markerBoard)
        player.shoots.forEach((shoot) => {
            const [rIndex, cIndex] = shoot.split(',').map(n => +n)
            const data = board[rIndex][cIndex]
            const state = data.type === cellType.SHIP ? cellState.HIT : cellState.MISS
            copy[rIndex][cIndex].state = state
            console.log(state)
        })
        return copy
    }, [bot, player.shoots])

    return (
        <div
            className='battle-board'
        >
            <div>
                <span>{isPlayerTurn ? 'Your turn' : 'Bot turn'}</span>
            </div>
            <div className='battle-zone-wrapper'>
                <BattleZone
                    board={playerBoard}
                    className='player-zone'
                    />
                <BattleZone
                    board={markerBoard}
                    className='bot-zone'
                    onClick={onClickCell}
                />
            </div>
        </div>
    )
}

export default BattleBoard
