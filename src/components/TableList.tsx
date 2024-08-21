import { IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { CommonPageProps, ItemType, MesaStateItem } from "../types"
import { useState } from "react"
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

type TableListProps = CommonPageProps

export const TableList = ({ mesas, setMesas }: TableListProps) => {
    const [selectedTableId, setSelectedTableId] = useState<number | undefined>(undefined)

    const selectedTable = mesas.find(({ id }) => id === selectedTableId)
    const addToTable = (id: number, item: ItemType) => {
        setMesas((mesas) => mesas.map((mesa) => {
            if (mesa.id === id) {
                return {
                    ...mesa,
                    consumo: {
                        ...mesa.consumo,
                        [item]: (mesa.consumo[item] || 0) + 1
                    }
                }
            }
            return mesa
        }))
    }

    const removeFromTable = (id: number, item: ItemType) => {
        setMesas((mesas) => mesas.map((mesa) => {
            if (mesa.id === id) {
                return {
                    ...mesa,
                    consumo: {
                        ...mesa.consumo,
                        [item]: Math.max((mesa.consumo[item] || 0) - 1, 0)
                    }
                }
            }
            return mesa
        }))
    }

    return (
        selectedTable ? <DetailView backToList={() => setSelectedTableId(undefined)} removeFromTable={removeFromTable} addToTable={addToTable} mesa={selectedTable} /> : <ListView mesas={mesas} onTableSelect={(id) => setSelectedTableId(id)} />

    )
}

type ListViewProps = Pick<TableListProps, 'mesas'> & {
    onTableSelect: (id: number) => void
}

const ListView = ({ mesas, onTableSelect }: ListViewProps) => {
    return (
        <List sx={{ marginTop: 0, paddingBottom: '15vh' }}>
            {mesas.map(({ id }) => (
                <ListItemButton
                    key={id}
                    disableGutters
                    onClick={() => onTableSelect(id)}
                    sx={{
                        px: 2,
                        py: 1,
                        '&:hover': {
                            bgcolor: 'action.focus',
                        },
                    }}
                >
                    <ListItemText primary={`Mesa número ${id}`} />
                </ListItemButton>
            ))}
        </List>
    )
}

type DetailViewProps = {
    mesa: MesaStateItem
    addToTable: (id: number, item: ItemType) => void
    removeFromTable: (id: number, item: ItemType) => void
    backToList: () => void
}

const DetailView = ({ mesa, addToTable, removeFromTable, backToList }: DetailViewProps) => {
    return (
        <>
            <Typography sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                padding: '0 1em'
            }} variant="h3" gutterBottom>
                <IconButton onClick={backToList} edge="start" aria-label="delete">
                    <ChevronLeftIcon />
                </IconButton>
                Mesa número {mesa.id}
            </Typography>
            <List sx={{ marginTop: 0, paddingBottom: '15vh' }}>
                {Object.keys(mesa.consumo).map((key) => (
                    <ListItem
                        key={key}
                    >
                        <IconButton onClick={() => removeFromTable(mesa.id, key as ItemType)} edge="start" aria-label="delete">
                            <Remove />
                        </IconButton>
                        <ListItemText sx={{
                            padding: '1em'
                        }}>
                            {`${key}: ${mesa.consumo[key as ItemType]}`}
                        </ ListItemText>
                        <IconButton onClick={() => addToTable(mesa.id, key as ItemType)} edge="end" aria-label="delete">
                            <Add />
                        </IconButton>
                    </ListItem>
                ))}
            </List >
        </>
    )
}