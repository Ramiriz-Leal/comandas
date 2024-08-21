import { ItemConsumoMap, ItemType, MesaState } from "./types"

export const ItemPrecoMap: Record<ItemType, number> = {
    [ItemType.BEBIDA]: 5,
    [ItemType.ENTRADA]: 10,
    [ItemType.PRATO_PRINCIPAL]: 20,
    [ItemType.SOBREMESA]: 5
}

const consumoInitialItem: ItemConsumoMap = {
    [ItemType.BEBIDA]: 0,
    [ItemType.ENTRADA]: 0,
    [ItemType.PRATO_PRINCIPAL]: 0,
    [ItemType.SOBREMESA]: 0
}

const totalTables = 20

const mesasInitialState: MesaState = []

for (let i = 1; i <= totalTables; i++) {
    mesasInitialState.push({
        id: i,
        consumo: { ...consumoInitialItem }
    })
}

export { mesasInitialState }
