import { useMemo, useCallback } from 'react'
import { cellState, cellType } from '../constants'
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

    const { rIndex, cIndex, onClick, type, state } = props

    const handleClick = useCallback(() => {
        const { onClick, ...rest } = props
        onClick?.(rest)
    }, [props])

    const classNames = useMemo(() => {
        const c1 = `${type === cellType.SHIP ? 'has-ship-part' : ''}`
        const c2 = `${onClick ? '' : 'disabled'}`
        const c3 = `${state === cellState.HIDDEN ? 'hidden' : ''}`
        const c4 = `${state === cellState.HIT ? 'hit' : ''}`
        return `battle-cell ${c1} ${c2} ${c3} ${c4}`
    }, [type, onClick, state])

    return (
        <div className={classNames} onClick={handleClick}>
            r:{rIndex}
            c:{cIndex}
        </div>
    )
}

const BattleZone = (props) => {

    const {
        board,
        onClick,
        className = ''
    } = props

    const editBoardUI = useMemo(() => {
        return board.map((row, rIndex) => {
            const cells =  row.map((cell, cIndex) => {
                const data = { ...cell }
                return  (
                    <Cell
                        key={cell.id}
                        {...data}
                        onClick={!cell.disabled ? onClick : undefined}
                    />
                )
            })
            return (
                <Row key={rIndex}>
                    {cells}
                </Row>
            )
        })
    }, [board, onClick])

    return (
        <div
            className={`battle-zone ${className}`}
        >
                {editBoardUI}
        </div>
    )
}

export default BattleZone
