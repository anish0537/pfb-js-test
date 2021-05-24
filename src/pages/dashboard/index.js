import React, {useState, useEffect} from 'react';
import CardsComponent from '../../components/card';
import SearchInput from '../../components/search-input';
import {Row, Col} from 'antd';
import _ from 'lodash';
import moment from 'moment';
// STYLES
import './style.scoped.scss';
// SERVICE
import { getPlayersData } from '../../services/dashboard';

const Dashboard = ({}) => {
    const [players, setPlayers] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [hasSearchValue, setHasSearchValue] = useState(false);

    const mapAndUpdatePlayersData = (data) => {
        return _.map(data.playerList, (playerObj) => {
            return {
                id: playerObj.Id,
                pfName: playerObj.PFName,
                tName: playerObj.TName,
                skillDesc: playerObj.SkillDesc,
                value: Math.round(playerObj.Value * 100)/100,
                upComingMatch: playerObj.UpComingMatchesList.length > 0 ? {
                    match: `${playerObj.UpComingMatchesList[0].CCode} vs ${playerObj.UpComingMatchesList[0].VsCCode}`,
                    date: moment(playerObj.UpComingMatchesList[0].MDate).format('DD-MM-YYYY h:mm:ss a')
                } : {
                    match: '-- vs --',
                    date: '--'
                }
            }
        });
    }

    useEffect(async () => {
        let { data } = await getPlayersData();
        data = mapAndUpdatePlayersData(data);
        data = _.orderBy(data, ['value'], ['asc']);
        setPlayers(data);
    },[]);

    const loadDefaultImg = (e) => {
        e.target.onerror = null;
        e.target.src = '/assets/player-images/placeholder.jpg';
    }

    const playerImage = (id = '') => (
        <div className='card-size'>
            <img className='img' src={`/assets/player-images/${id}.jpg`} onError={loadDefaultImg} alt='' />
        </div>
    );
    const playerDetails = (playerObj) => (
        <div className=''>
            <p>Name: {playerObj.pfName}</p>
            <p>Team: {playerObj.tName}</p>
            <p>Skill: {playerObj.skillDesc}</p>
            <p>Value: {playerObj.value} $</p>
            <p>Upcoming Match: {playerObj.upComingMatch.match}</p>
            <p>Date: {playerObj.upComingMatch.date}</p>
        </div>
    )
    const playerCollection = hasSearchValue || filteredData.length > 0 ? filteredData : players;
    const filterKeys = ['pfName', 'tName'];
    console.log(hasSearchValue)
    return (
        <div className='dashboard-wrapper'>
            <SearchInput 
                collection={players} 
                setFilter={setFilteredData} 
                hasValue={setHasSearchValue} 
                filterFor={filterKeys} 
            />
            <br />
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 16 }, { xs: 8, sm: 16, md: 24, lg: 16 }]}>
                {playerCollection.map((playerData, idx) => 
                    <Col key={idx} className="gutter-row" lg={{span: 6}} md={{span: 6}} sm={{span: 8}} xs={{span: 24}}>
                        <CardsComponent
                            meta={{
                                title: playerData.pfName,
                                desc: `Value: ${playerData.value}$ Skill: ${playerData.skillDesc}`
                            }}
                            frontSide={() => playerImage(playerData.id)}
                            backSide={() => playerDetails(playerData)}
                            frontClassName='card-wrapper'
                            backClassName='card-wrapper'  
                        />
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default Dashboard;