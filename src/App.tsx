import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PaidIcon from '@mui/icons-material/Paid';
import EditNoteIcon from '@mui/icons-material/EditNote';

import './App.css';
import { TableList } from './components/TableList';
import { AppBar, Paper } from '@mui/material';
import { mesasInitialState } from './constants';
import { MesaState } from './types';
import { useState } from 'react';
import { Checkout } from './components/Checkout';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      hidden={value !== index}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const [mesas, setMesas] = useState<MesaState>(mesasInitialState);

  const handleTabSelect = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <div className='App-container'>
      <Paper square sx={{ height: '100%', boxShadow: 'none' }}>
        <CustomTabPanel value={currentTab} index={0}>
          <TableList mesas={mesas} setMesas={setMesas} />
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={1}>
          <Checkout mesas={mesas} setMesas={setMesas} />
        </CustomTabPanel>
      </Paper>
      <footer>
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, backgroundColor: 'background.paper' }}>
          <Tabs sx={{
            '.MuiTabs-indicator': {
              top: 0,
            },
          }} centered variant='fullWidth' value={currentTab} onChange={handleTabSelect}>
            <Tab iconPosition='start' icon={<EditNoteIcon />} label="Garçom" />
            <Tab iconPosition='start' icon={<PaidIcon />} label="Caixa" />
          </Tabs>
        </AppBar>

      </footer>
    </div>
  );
}

export default App;

