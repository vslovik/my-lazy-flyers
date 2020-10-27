import React, {useState, useEffect} from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Flyer from './Flyer';
import Top from './Top';
import { GiHamburgerMenu } from 'react-icons/gi';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import config from './config.json';

const App = () => {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

	const [listItems, setListItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [page, setPage] = useState(1);
  
  const handleTop = (flag) => {
    setShow(flag)
  }

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
    try {
      const result = await axios.get(config.SERVER_URL + `?page=${page}&limit=` + config.LAYOUT.ITEMS_PER_PAGE);
      setIsFetching(false);
      let data = [];
      if (result && result.data && result.data.data && result.data.data.length) {
        data = result.data.data;
        setPage(page + 1);
        setListItems(() => {
          return [...listItems, ...data];
        });
      } else {
        setIsFetched(true);
        setIsFetching(false);
      }
    } catch (err) {
      console.log(err)
    }
  };

	useEffect(() => {
		fetchData();
		window.addEventListener('scroll', handleScroll);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
      if (isFetched) return;
      if (!isFetching) return;
      fetchData();
  }, [isFetching, isFetched]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const getStoredHearts = () => {
    let index = {};
    const keys = Object.keys(localStorage)
    for (const ind in keys) {
      const key = keys[ind];
      if (key.indexOf(config.STORAGE.FLYER_KEY_PREFIX) !== -1) {
        const id = key.split(':')[2]
        index[id] = JSON.parse(localStorage.getItem(key)); 
      }
    }
    return index;
  }; 

  const [heartIndex, setHeartIndex] = useState(getStoredHearts());
  const handleHeart = (flyer, isFavorite) => {
    var arr = heartIndex;
    if (isFavorite) {
      arr[flyer.id] = flyer
      localStorage.setItem(config.STORAGE.FLYER_KEY_PREFIX + flyer.id, JSON.stringify(flyer));
    } else {
      if (arr.hasOwnProperty(flyer.id)) {
        delete arr[flyer.id];
        localStorage.removeItem(config.STORAGE.FLYER_KEY_PREFIX + flyer.id);
      }
    } 
    setHeartIndex(arr);
  }

  const numrows = Math.round(listItems.length / config.LAYOUT.COLS_PER_ROW);
  const numcols = config.LAYOUT.COLS_PER_ROW;
  let item;
  let rows = [];
  for (var r = 0; r < numrows; r++) {
    let cols = [];
    for (var c = 0; c < numcols; c++) {
      if (r*config.LAYOUT.COLS_PER_ROW + c >= listItems.length) {
        break;
      }
      item = listItems[r*config.LAYOUT.COLS_PER_ROW + c]
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