import React  from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import TableViewIcon from '@mui/icons-material/TableView';
import { Box } from '@mui/system';
import Filters from '../components/Filters';
import CompareCars from '../components/CompareCars';
import { useDispatch } from 'react-redux';
import { viewCharts, viewRecords } from '../redux/tabsSlice';
export default function IconTabs() {
  const dispatch =  useDispatch();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue==0){
      dispatch(viewCharts(""))
    } else {
      dispatch(viewRecords(""))
    }
  };

  return (
    <Box>
      <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon position tabs example"
      centered
      >
      <Tab icon={<AutoGraphIcon />} iconPosition="start" label="chart drawer" />
      <Tab icon={<TableViewIcon />} iconPosition="start" label="view records" />
    </Tabs>
    <CompareCars/>
    </Box>
    
  );
}
