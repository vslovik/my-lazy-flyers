import React, {useState, useEffect} from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Flyer from './Flyer';
import Top from './Top';
import { GiHamburgerMenu } from 'react-icons/gi';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

function App() {

  const ITEMS_PER_PAGE = 8;

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleTop = (flag) => {
    setShow(flag)
  }

	const [listItems, setListItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
	const [page, setPage] = useState(1);

	const handleScroll = () => {
    if (isFetched) return;
		if (
			Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
			isFetching
		)
			return;
		setIsFetching(true);
	};

  const fetchData = async () => {
    const result = await axios.get(`http://127.0.0.1:3000/flyers?page=${page}&limit=` + ITEMS_PER_PAGE); //ToDo: move url to config
    setIsFetching(false);
    let data = [];
    if (result && result.data && result.data.data && result.data.data.length) { // ToDo: handle errors
      data = result.data.data;
      console.log('PAGE', page, 'DATA', data)
    
      setPage(page + 1);
      setListItems(() => {
        return [...listItems, ...data];
      });
    } else {
      setIsFetched(true)
    }
  };

	useEffect(() => {
		fetchData();
		window.addEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
      if (isFetched) return;
      if (!isFetching) return;
      fetchData();
	}, [isFetching, isFetched]);


  const getStoredHearts = () => {
    let index = {};
    const keys = Object.keys(localStorage)
    // console.log('keys', keys);
    for (const ind in keys) {
      const key = keys[ind];
      if (key.indexOf('favorite:flyer:') !== -1) {
        const id = key.split(':')[2]
        index[id] = JSON.parse(localStorage.getItem(key)); 
      }
    }
    //console.log('INDEX', index);
    return index;
  }; 

  const [heartIndex, setHeartIndex] = useState(getStoredHearts());
  const handleHeart = (flyer, isFavorite) => {
    console.log('flyer', flyer, 'isFavorite', isFavorite);
    var arr = heartIndex;
    if (isFavorite) {
      arr[flyer.id] = flyer
      localStorage.setItem('favorite:flyer:' + flyer.id, JSON.stringify(flyer));
    } else {
      if (arr.hasOwnProperty(flyer.id)) {
        delete arr[flyer.id];
        localStorage.removeItem('favorite:flyer:' + flyer.id);
      }
    } 
    setHeartIndex(arr);
  }
  
  const numrows = Math.round(listItems.length / 4);
  const numcols = 4;
  let item;
  let rows = [];
  for (var r = 0; r < numrows; r++) {
    let cols = [];
    for (var c = 0; c < numcols; c++) {
      if (r*4 + c >= listItems.length) {
        break;
      }
      item = listItems[r*4 + c]
      if (item.retailer) {
        cols.push(
          <Col xs={6} sm={3} key={c}>
            <Flyer 
              flyer={item} 
              handleHeart={handleHeart}
              isFavorite={heartIndex.hasOwnProperty(item.id)}
              />
          </Col>
      )
      };
    }
    rows.push(<Row key={r}>{cols}</Row>)
  }

  return(
    <Container>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <GiHamburgerMenu onClick={handleShow} /> Shopfully
        </Navbar.Brand>
      </Navbar>
      {rows}
      <Top 
        show={show} 
        handleTop={handleTop}
        handleHeart={handleHeart}
        items={Object.values(heartIndex)}
      />
      
      <Modal show={isFetching}>
        <Modal.Body>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            &nbsp;Fetching more flyers...
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default App;