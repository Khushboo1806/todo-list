import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Segmented, Typography } from 'antd';
import CardStyle from '../components/CardStyle';
import { DataContext } from '../context/DataContext';
import { useParams, useNavigate } from 'react-router-dom';
import Create from '../components/create';
const {Title} = Typography;
function Main() {
  const { data, setStatus } = useContext(DataContext);
  const [segment, setSegment] = useState('In Progress');
  let { segment: segmentParam } = useParams(); // Corrected typo
  const navigate = useNavigate();

  const formatSegmentForURL = (segment) => {
    return segment.toLowerCase().replace(/[\s-]+/g, '_');
  };

  const formatSegmentFromURL = (segment) => {
    return segment.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  const handleSegmentChange = useCallback((value) => {
    setSegment(value);
    switch(value) {
      case 'Complete':
        setStatus(2);
        break;
      case 'Delete':
        setStatus(0);
        break;
      default:
        setStatus(1);
    }
    // Update the URL with the new segment
    navigate(`/${formatSegmentForURL(value)}`);
  }, [setStatus, navigate]);

  useEffect(() => {
    if (segmentParam) {
      const formattedSegment = formatSegmentFromURL(segmentParam);
      handleSegmentChange(formattedSegment);
    }
  }, [segmentParam, handleSegmentChange]);

  return (
    <div>
      <Create />
      <Segmented
        options={['In Progress', 'Complete', 'Delete']}
        value={segment}
        onChange={handleSegmentChange}
      />
      <Title level={1} style={{textAlign:'center'}}>{segment} Tasks</Title>
      <CardStyle Data={data?.rows || []} />
    </div>
  );
}

export default Main;
