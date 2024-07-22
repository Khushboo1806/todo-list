import React, { useState, useContext } from 'react';
import { Button, message, Flex } from 'antd';
import { CheckCircleFilled, EditFilled, DeleteFilled } from '@ant-design/icons';
import { DataContext } from '../context/DataContext';

const StatusButtons = ({ initialDatas }) => {
  const [datas, setDatas] = useState(initialDatas);
  const { status,getData} = useContext(DataContext);


  const handleClick = async (newStatus) => {
    // Prevent updates if the current status is completed or deleted
    if (datas.status === 0) {
      return;
    }

    try {
      const response = await fetch('http://139.59.47.49:4004/api/task/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: datas.id,
            status: newStatus,
          }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Failed to update status', responseData);
        throw new Error(responseData.message || 'Failed to update status');
      }
      setDatas((prevDatas) => ({
        ...prevDatas,
        status: newStatus,
      }));

      console.log('Status updated:', responseData);
      message.success('Status updated successfully');
      getData(status);
    } catch (error) {
      console.error('Error updating status:', error);
      message.error('Failed to update status');
    }
  };

  return (
    <Flex justify="end">
      {datas.status !== 0  &&<Button
        icon={<CheckCircleFilled style={{ color: datas.status === 2 ? 'green' : 'black' }} />}
        onClick={() => handleClick(2)} // Mark as completed
      />}
       { datas.status === 1 && <Button
        icon={<EditFilled style={{ color: datas.status === 1 ? 'orange' : 'black' }} />}
        onClick={() => handleClick(1)} // Mark as in progress
      />}
      <Button
        icon={<DeleteFilled style={{ color: datas.status === 0 ? 'red' : 'black' }} />}
        onClick={() => handleClick(0)} // Mark as deleted
      />
    </Flex>
  );
};

export default StatusButtons;
