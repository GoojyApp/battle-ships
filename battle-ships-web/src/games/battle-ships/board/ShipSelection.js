import { useCallback } from 'react'
import './style.scss'


const Ship = (props) => {
    const { size, selected } = props;

    const handleClick = useCallback(() => {
        const { onClick, ...rest } = props
        onClick?.(rest)
    }, [props])

    return (
        <div 
            className={`ship ${selected ? 'selected' : ''}`}
            onClick={handleClick}
            style={{ width: 30 * size, height: 30 }}
        >
            size {size}
        </div>
    )
}

const ShipSelection = (props) => {

    const { onClick, ships, selected } = props

    const shipsUI = ships.map((ship, i) => (
        <Ship
            key={i}
            {...ship}
            selected={selected?.id === ship.id}
            onClick={onClick}
        />
    ))

    return (
        <div className='ship-kinds'>
            Select Ship and place it on the board!
            <div className='ships-wrapper'>
                {shipsUI}
            </div>
        </div>
    )
}

export default ShipSelection
