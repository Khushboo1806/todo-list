import React, {useState} from "react";
import { Card, Flex, Pagination, Typography} from "antd";
import dayjs from "dayjs";
import StatusButtons from "./StatusButton";
const {Title} = Typography;
function CardStyle({Data}){
  const cardsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const paginatedData = Data.slice(startIndex, endIndex);
    return (
      <div>
        <Flex wrap gap="large" justify="space-evenly">
        {paginatedData.map((datas) => (
            <Card
              key={datas.id}
              title={datas.task_name}
              style={{ 
                width: 300,
                border: '1px solid #000', }}
              hoverable
            >
              <Title level={5}>Date : {dayjs(datas.date).format('YYYY-MM-DD')}</Title>
              <StatusButtons initialDatas={datas}/>
            </Card>
          ))}
    </Flex>
        <Pagination 
        current={currentPage}
        pageSize={cardsPerPage}
        total={Data.length}
        onChange={handlePageChange}
        style={{ marginTop: '20px', textAlign: 'center' }}
      />
    </div>
    );
}

export default CardStyle;