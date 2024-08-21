export enum ItemType {
    BEBIDA = 'Bebidas',
    ENTRADA = 'Entrads',
    PRATO_PRINCIPAL = 'Pratos principais',
    SOBREMESA = 'Sobremesas'
}


export type ItemConsumoMap = Record<ItemType, number>

export type MesaStateItem = {
    id: number,
    consumo: ItemConsumoMap
}
export type MesaState = MesaStateItem[]

export type CommonPageProps = {
    mesas: MesaState,
    setMesas: React.Dispatch<React.SetStateAction<MesaState>>
}