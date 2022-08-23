import React, { useState } from "react";
import Item from './Item';
import "../../css/Carousel.css";
import "../../css/Transition.css";
import { Transition, CSSTransition } from "react-transition-group";
import { Container } from "@material-ui/core";
import { style } from "@mui/system";
import {AiOutlineArrowRight,AiOutlineArrowLeft} from "react-icons/ai";

function Carousel (props) {
    const { par_items, par_active, par_setActive } = props;
    const [direction, setDirection ] = useState('');

    // 리스트 아이템 생성 
    function generateItems() {
        var _items = []
        var level
        console.log(par_active)
        for (var i = par_active - 2; i < par_active + 3; i++) {
            var index = i
            if (i < 0) {
                index = par_items.length + i
            } else if (i >= par_items.length) {
                index = i % par_items.length
            }
            level = par_active - i
            _items.push(<Item key={index} id={par_items[index]} level={level} />)
        }
        return _items
    }

    // 왼쪽 이동
    const moveLeft = () => {
        var newActive = par_active
        newActive--
        par_setActive(newActive < 0 ? par_items.length - 1 : newActive);
        setDirection('left');
    }

    // 오른쪽 이동
    const moveRight = () => {
        var newActive = par_active
        par_setActive((newActive + 1) % par_items.length)
        setDirection('right');
    }
    
   
    return(
        <div id="carousel" className="noselect">  
            <div className="arrow arrow-left" onClick={() => moveLeft()}><AiOutlineArrowLeft/></div>
            <div className="arrow arrow-right" onClick={() => moveRight()}><AiOutlineArrowRight/></div>
            <Transition  in={true} timeout={200} appear className="transition-group">
            {(status)=>(
                <Container 
                    className={`pageSlider pageSlider-${status}`}
                    transitionName={direction}
                    timeout={500}
                    key={0}
                    style={{}}>
                    {generateItems()}
                </Container>
            )}
            </Transition>
            
        </div>
    )
    
}

export default Carousel;
