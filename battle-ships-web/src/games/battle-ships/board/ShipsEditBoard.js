import { useMemo, useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCellsEditableOnBoard, editShipPositionOnBoard, setShipPositionOnBoard } from '../battleShipsUtils'
import { setShip } from '../../../store.js/battleShipsGame/battleShipsGameSlice'
import { cellType } from '../constants'
import ShipSelection from './ShipSelection'
import './style.scss'


const Row = (props) => {

    const { children } = props

    return (
        <div className='battle-row'>
            {children}
        </div>
    )
}

const Cell = (props) => {

    const dispatch = useDispatch()
    
    const { rIndex, cIndex, edit, type } = props

    const handleClick = useCallback(() => {
        const { onClick, ...rest } = props
        if (!props.edit) return
        onClick?.(rest)
    }, [props])

    const className = `${type === cellType.SHIP ? ' has-ship-part' : ''}`

    return (
        <div className={`battle-cell ${edit ? '' : 'disabled'} ${className}`} onClick={handleClick}>
            r:{rIndex}
            c:{cIndex}
        </div>
    )
}

const ShipsEditBoard = (props) => {

    const {
        board,
        ships
    } = props

    const [editBoard, setEditBoard] = useState([[]])
    const [selectedShip, setSelectedShip] = useState()

    const editAbleCells = getCellsEditableOnBoard(editBoard, selectedShip?.position ?? [])

    useEffect(() => {
        setEditBoard(board)
    }, [board])

    const onClickShip = useCallback((ship) => {
        setSelectedShip(ship)
    }, [])

    const onShipPositionDone = useCallback((ship) => {
        setEditBoard(prev => setShipPositionOnBoard(prev, ship))
    }, [])

    useEffect(() => {
        if (!selectedShip) return
        if (selectedShip.ready) {
            // Edit done
            onShipPositionDone(selectedShip)
        } else {
            setEditBoard(prev => editShipPositionOnBoard(prev, selectedShip))
        }
    }, [selectedShip, onShipPositionDone])

    const onClickCell = useCallback(({ rIndex, cIndex, id }) => {
        if (!selectedShip) return
        if (!selectedShip.ready) {
        setSelectedShip(prev => {
            if (prev.ready) return prev
            const position = [...prev.position, { rIndex, cIndex, id }]
            const ready = position.length === prev.size
            return {
                ...prev,
                position,
                ready
            }
        })
        }
    }, [selectedShip])

    const editBoardUI = useMemo(() => {
        return editBoard.map((row, rIndex) => {
            const cells =  row.map((cell, cIndex) => (
                <Cell
                    key={cell.id}
                    {...cell}
                    edit={Boolean(editAbleCells.find(c => c.id === cell.id))}
                    onClick={onClickCell}
                />
            ))
            return (
                <Row key={rIndex}>
                    {cells}
                </Row>
            )
        })
    }, [editBoard, onClickCell, editAbleCells])

    return (
        <div
            className='board'
        >
            <div className='battle-zone'>
                {editBoardUI}
            </div>
            <ShipSelection
                onClick={onClickShip}
                ships={ships}
                selected={selectedShip}
            />
        </div>
    )
}

export default ShipsEditBoard
