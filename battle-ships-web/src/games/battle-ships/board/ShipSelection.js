import { useCallback, useMemo } from 'react'
import './style.scss'


const Ship = (props) => {
    const { size, selected, ready } = props;

    const handleClick = useCallback(() => {
        const { onClick, selected, ...rest } = props
        onClick?.(rest)
    }, [props])

    const classNames = useMemo(() => {
        const cs1 = selected ? 'selected' : ''
        const cs2 = ready ? 'ready' : ''
        return `ship ${cs1} ${cs2}`
    }, [ready, selected])

    return (
        <div 
            className={classNames}
            onClick={handleClick}
            style={{ width: 30 * size, height: 30 }}
        >
            size {size}
        </div>
    )
}

const ShipSelection = (props) => {

    const { onClick, ships, selected, onClickRandom } = props

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
            Select and place ship on board or click for random position
            <button onClick={onClickRandom}>Random</button>
            <div className='ships-wrapper'>
                {shipsUI}
            </div>
        </div>
    )
}

export default ShipSelection
