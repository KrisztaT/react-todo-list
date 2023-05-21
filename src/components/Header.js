import { Card, ListGroup, Button } from "react-bootstrap";
import { FunnelFill, SortDownAlt } from 'react-bootstrap-icons'

const Header = ({ dispatch }) => {
  const sortByDueDate = () => {
    dispatch({ type: "SORT_BY_DUE_DATE" });
  };

  return (
    <Card.Header className="text-center sticky-top">
      <h1>ToDo List</h1>
      <ListGroup>
        <ListGroup.Item>
          <div className="d-flex justify-content-between align-items-center overflow-auto">
            <div className="d-flex overflow-auto ">
            <Button variant="outline-secondary" onClick={sortByDueDate}>Date <SortDownAlt size={16} /></Button>
            <Button variant="outline-secondary" onClick={sortByDueDate}>Status <FunnelFill size={16} /></Button>
          </div>
            <div>Weather Data data</div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card.Header>
  );
};

export default Header;
