import React, {useState, useEffect} from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';

const Heart = (props) => {

    const [active, setActive] = useState(props.active);

    useEffect(() => {
      setActive(props.active)
    }, [props.active]);

    const handleLike = () => {
      props.handleHeart(props.flyer, true);
      setActive(true);
    };

    const handleDislike = () => {
      props.handleHeart(props.flyer, false);
      setActive(false);
    };
  
    return (
      <span className="heart">    
        {active ? <AiFillHeart onClick={handleDislike} /> : <AiOutlineHeart onClick={handleLike} />}                                                                                                         
      </span>
    );
}

export default Heart;