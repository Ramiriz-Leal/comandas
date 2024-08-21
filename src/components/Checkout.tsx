import { IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { CommonPageProps, ItemType, MesaStateItem } from "../types"
import { useState } from "react"
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ItemPrecoMap } from "../constants";

type TableListProps = CommonPageProps

export const Checkout = ({ mesas, setMesas }: TableListProps) => {
    const [selectedTableId, setSelectedTableId] = useState<number | undefined>(undefined)

    const selectedTable = mesas.find(({ id }) => id === selectedTableId)


    return (
        selectedTable ? <DetailView backToList={() => setSelectedTableId(undefined)} mesa={selectedTable} /> : <ListView mesas={mesas} onTableSelect={(id) => setSelectedTableId(id)} />

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
    backToList: () => void
}

const DetailView = ({ mesa, backToList }: DetailViewProps) => {
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
            <List sx={{ marginTop: 0, }}>
                {Object.keys(mesa.consumo).map((key) => (
                    <ListItem
                        key={key}
                    >
                        <ListItemText sx={{
                            padding: '1em'
                        }}>
                            {`${mesa.consumo[key as ItemType]} ${key} = R$ ${mesa.consumo[key as ItemType] * ItemPrecoMap[key as ItemType]}`}
                        </ ListItemText>
                    </ListItem>
                ))}
            </List >
            <Typography sx={{
                margin: '0 1em',
            }} variant="h5" >
                total R${Object.keys(mesa.consumo).map((key) => mesa.consumo[key as ItemType] * ItemPrecoMap[key as ItemType]).reduce((acc, curr) => acc + curr, 0)}.00
            </Typography>
        </>
    )
}