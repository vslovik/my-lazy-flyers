import React, {useState, useEffect} from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Flyer from './Flyer';
import Top from './Top';
import { GiHamburgerMenu } from 'react-icons/gi';
import axios from 'axios';

function App() {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleTop = (flag) => {
    setShow(flag)
  }

	const [listItems, setListItems] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [page, setPage] = useState(1);

	useEffect(() => {
		fetchData();
		window.addEventListener('scroll', handleScroll);
	}, []);

	const handleScroll = () => {
		if (
			Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
			isFetching
		)
			return;
		setIsFetching(true);
		console.log(isFetching);
	};

  const fetchData = async () => {
      const result = await axios.get(`http://127.0.0.1:3000/flyers?page=${page}&limit=8`); //ToDo: move url to config
      let data = [];
      if (result && result.data && result.data.data && result.data.data.length) { // ToDo: handle errors
        data = JSON.parse(result.data.data);
      }
      console.log('LENGTH', data.length, data[0])
			setPage(page + 1);
			setListItems(() => {
				return [...listItems, ...data];
      });
	};

	useEffect(() => {
		if (!isFetching) return;
		fetchMoreListItems();
	}, [isFetching]);

	const fetchMoreListItems = () => {
		fetchData();
		setIsFetching(false);
  };

  // let flyers = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id:7}, {id:8}, {id:9}, {id:10}, {id:11}, {id:12}]
  const numrows = Math.round(listItems.length / 4);
  const numcols = 4;
  let item;
  let rows = [];
  for (var r = 0; r < numrows; r++) {
    let cols = [];
    for (var c = 0; c < numcols; c++) {
      item = listItems[r*4 + c]
      if (item.retailer) {
        cols.push(
          <Col xs={6} sm={3}>
            <Flyer 
              id={item.id} 
              title={item.title}
              retailer={item.retailer}
              category={item.category}
              />
          </Col>
      )
      };
    }
    rows.push(<Row>{cols}</Row>)
  }

  return(
    <Container>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <GiHamburgerMenu onClick={handleShow} /> Shopfully
        </Navbar.Brand>
      </Navbar>
      {rows}
      <Top show={show} handleTop={handleTop}/>
      {isFetching && <h1>Fetching more flyers...</h1>}
    </Container>
  )
}

export default App;