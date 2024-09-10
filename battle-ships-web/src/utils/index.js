import { fromJS } from "immutable"


export const createMatrix = (size, onCreateCell) => {
    const matrix = Array(size).fill(Array(size).fill())
        .map((row, rIndex) => row.map((_, cIndex) => onCreateCell?.(rIndex, cIndex)))
    return matrix
}

export const deepCopy = (obj) => fromJS(obj).toJS()

export const removeItem = (lst, index) => {
    if (!Array.isArray(lst) || typeof index !== 'number') return
    const copy = [...lst]
    delete copy[index]
    return copy.filter(item => item !== undefined)
}
