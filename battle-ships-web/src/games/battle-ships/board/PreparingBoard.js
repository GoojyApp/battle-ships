import { useMemo, useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCellsEditableOnBoard } from '../battleShipsUtils'
import { deepCopy, removeItem } from '../../../utils'
import { setShip } from '../../../store.js/battleShipsGame/battleShipsGameSlice'
import { cellType } from '../constants'
import ShipSelection from './ShipSelection'
import BattleZone from './BattleZone'
import './style.scss'



const PreparingBoard = (props) => {

    const {
        board,
        ships
    } = props

    const dispatch = useDispatch()

    const [editShip, setEditShip] = useState()

    const editAbleCells = getCellsEditableOnBoard(board, editShip)

    const onClickShip = useCallback((ship) => {
        if (ship.ready) return
        setEditShip(deepCopy(ship))
    }, [])

    useEffect(() => {
        if (!editShip || editShip.ready) return
        if (editShip.position.length === editShip.size) {
            // Edit done
            dispatch(setShip(editShip))
        }
    }, [editShip, dispatch])

    const onClickCell = useCallback(({ rIndex, cIndex, id }) => {
        if (!editShip || editShip.position.length >= editShip.size) return
        /*
            TODO - add orientation and sort position by sequence
            Allow to remove only the head/tail of sequence ship parts
        */
        setEditShip(prev => {
            const index = prev.position.findIndex((p) => p.id === id)
            const position = index !== -1 ? removeItem(prev.position, index) : [...prev.position, { rIndex, cIndex, id }]
            return {
                ...prev,
                position,
            }
        })
    }, [editShip])

    const editedBoard = useMemo(() => {
        const editedBoard = deepCopy(board)
        editedBoard.forEach(row => {
            row.forEach(cell => {
                const editedCell = editShip?.position.find((p) => p.id === cell.id)
                cell.type = editedCell ? cellType.SHIP : cell.type
                cell.disabled = !editedCell && !editAbleCells.find(edit => edit.id === cell.id)
            })
        });
        return editedBoard
    }, [board, editAbleCells, editShip])

    return (
        <div
            className='board'
        >
            <BattleZone
                board={editedBoard}
                onClick={onClickCell}
            />
            <ShipSelection
                onClick={onClickShip}
                ships={ships}
                selected={editShip}
            />
        </div>
    )
}

export default PreparingBoard
