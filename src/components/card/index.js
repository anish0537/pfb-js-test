import React, {useState} from 'react';
import ReactCardFlip from 'react-card-flip';
import {Card} from 'antd';
// STYLES
import './style.scoped.scss';

const {Meta} = Card;

const CardsComponent = ({frontSide, meta = {title: '', desc: ''}, backSide, backClassName = '', frontClassName = '', backSideStyle = {}, frontSideStyle = {}}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = (e, flipState) => {
        e.preventDefault();
        setIsFlipped(flipState);
    }

    return (
        <ReactCardFlip isFlipped={isFlipped}>
            <Card 
                hoverable
                bordered
                className={frontClassName} 
                cover={frontSide()}
                style={frontSideStyle}
                actions={[
                    <div onClick={e => flipCard(e, true)}>More</div>
                ]}
            >
                <Meta title={meta.title} description={meta.desc} />
            </Card>
            <Card 
                hoverable
                bordered
                className={backClassName}
                style={backSideStyle}
                actions={[
                    <div onClick={e => flipCard(e, false)}>Back</div>
                ]}
            >
                {backSide()}
            </Card>
        </ReactCardFlip>
    );
}

export default CardsComponent;
