// TasksList.js
import React from 'react';
import { DataProvider } from './DataContext';

const TasksList = ({ children }) => {
  return <DataProvider>{children}</DataProvider>;
};

export default TasksList;
