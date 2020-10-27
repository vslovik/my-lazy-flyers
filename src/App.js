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
    console.log('LENGTH', data.length, data[0]) // ToDo: check it
    setPage(page + 1);
    setListItems(() => {
      return [...listItems, ...data];
    });
  };

	useEffect(() => {
		fetchData();
		window.addEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
      if (!isFetching) return;
      fetchData();
      setIsFetching(false);
	}, [isFetching]);


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
      item = listItems[r*4 + c]
      if (item.id == 45) {
        console.log('45', item.id, heartIndex.hasOwnProperty(item.id));
      }
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
      {isFetching && <h1>Fetching more flyers...</h1>}
    </Container>
  )
}

export default App;