import { useMemo, useCallback } from 'react'
import { cellType } from '../constants'
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

    const { rIndex, cIndex, onClick, type } = props

    const handleClick = useCallback(() => {
        const { onClick, ...rest } = props
        onClick?.(rest)
    }, [props])

    const className = `${type === cellType.SHIP ? ' has-ship-part' : ''}`

    return (
        <div className={`battle-cell ${onClick ? '' : 'disabled'} ${className}`} onClick={handleClick}>
            {/* r:{rIndex}
            c:{cIndex} */}
        </div>
    )
}

const BattleZone = (props) => {

    const {
        board,
        onClick
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
            className='battle-zone'
        >
                {editBoardUI}
        </div>
    )
}

export default BattleZone
