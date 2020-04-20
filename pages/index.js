import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const Index = props => {
  const [heroes, setHeroes] = useState(props.heroes)
  const [highestWinrate, setHighestWinrate] = useState()
  const [activeRole, setActiveRole] = useState()

  const changeFilter = async (role) => {
    setActiveRole(role || 'all');

    if (role === '') {
      return setHeroes(props.heroes)
    }

    return setHeroes(props.heroes.filter(el => {
      return el.role === role
    }))
  }

  useEffect(() => {
    setHighestWinrate(Math.max.apply(Math, heroes.map(o => { return o.winrate; })))
    console.log([props.heroes])
  }, [heroes])

  return (
    <div className="container">
      <div className="wrap">
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>Statistics</h2>
          <div className="role-filters">
            <a className={`role-selection all ${activeRole === 'all' ? 'active' : null}`} onClick={() => changeFilter('')}>
              All
            </a>
            <a className={`role-selection tank ${activeRole === 'tank' ? 'active' : null}`} onClick={() => changeFilter('Tank')}>
              <img className="role-img" src={require('../public/assets/role/tank.png')} />
              Tank
            </a>
            <a className={`role-selection bruiser ${activeRole === 'bruiser' ? 'active' : null}`} onClick={() => changeFilter('Bruiser')}>
              <img className="role-img" src={require('../public/assets/role/bruiser.png')} />
              Bruiser
            </a>
            <a className={`role-selection ranged ${activeRole === 'ranged assassin' ? 'active' : null}`} onClick={() => changeFilter('Ranged Assassin')}>
              <img className="role-img" src={require('../public/assets/role/ranged.png')} />
              Ranged Assassin
            </a>
            <a className={`role-selection melee ${activeRole === 'melee assassin' ? 'active' : null}`} onClick={() => changeFilter('Melee Assassin')}>
              <img className="role-img" src={require('../public/assets/role/melee.png')} />
              Melee Assassin
            </a>
            <a className={`role-selection healer ${activeRole === 'healer' ? 'active' : null}`} onClick={() => changeFilter('Healer')}>
              <img className="role-img" src={require('../public/assets/role/healer.png')} />
              Healer
            </a>
            <a className={`role-selection support ${activeRole === 'support' ? 'active' : null}`} onClick={() => changeFilter('Support')}>
              <img className="role-img" src={require('../public/assets/role/support.png')} />
              Support
            </a>
          </div>
        </header>
        <header className="header">
          <div className="hero cell-mr">
            Hero
          </div>
          <div className="games-played cell-mr">
            # Games
          </div>
          <div className="popularity sort cell-mr">
            Popularity
          </div>
          <div className="pickrate cell-mr">
            Pick
          </div>
          <div className="banrate cell-mr">
            Ban
          </div>
          <div className="winrate cell-mr">
            Win
          </div>
          <div className="delta-winrate">
            % Δ
          </div>
        </header>
        {heroes ? heroes.sort((a, b) => b.popularity - a.popularity).map(hero => {
          return (
            <div className="row">
              <div className="hero-img">
                <img height="34px" src={`https://www.heroesprofile.com/includes/images/heroes/${hero.img}`} />
              </div>   
              <div className="hero-name cell cell-mr">
                {hero.name}
              </div>
              <div className="games-played cell cell-mr">
                {hero.gamesPlayed}
              </div>
              <div className="popularity cell cell-mr">
                {hero.popularity}%
                <div style={{ height: '4px', width: `${hero.popularity}%`, backgroundColor: '#60CDCD' }} />
              </div>
              <div className="pickrate cell cell-mr">
                {hero.pickrate}%
              </div>
              <div className="banrate cell cell-mr">
                {hero.banrate}%
              </div>
              <div className="winrate cell cell-mr">
                {hero.winrate}%
                <div style={{ height: '4px', width: `${((hero.winrate - (highestWinrate - hero.winrate)) / highestWinrate) * 100}%`, backgroundColor: '#3BE33B' }} />
              </div>
              <div className={`delta-winrate ${hero.deltaWinrate[0] === '-' ? 'negative' : 'positive'} cell`}>
                {hero.deltaWinrate}
              </div>
            </div>
          )
        }) : null}
      </div>
    <style jsx>{`
      .container {
        font-size: 14px;
      }

      .hero-img {
        height: 34px;
        margin: auto 10px auto 0;
        width: fit-content;
        border-radius: 3px;
        border: 1px solid #030303;
      }

      header {
        color: #cacaca
      }

      .header {
        display: flex;
        font-weight: 600;
        padding: 10px 0;
      }

      .role-filters {
        display: flex;
        border: 1px solid #2a2a2a;
        border-radius: 4px;
      }

      .role-filters a {
        font-size: 12px;
        padding: 10px 14px;
        border-right: 1px solid #2a2a2a;
        cursor: pointer;
      }

      .role-filters a.support {
        border-right: none;
      }

      .role-filters a.active {
        color: #eee;
        background: #272626;
        font-weight: 700;
      }

      .role-img {
        height: 16px;
        margin-right: 5px;
      }

      .role-selection {
        display: flex;
        align-items: center;
      }

      .cell {
        padding-top: 14px;
      }

      .cell-mr {
        margin-right: 30px;
      }

      .row {
        display: flex;
        height: 46px;
        border-top: 1px solid #2a2a2a;
        width: fit-content;
      }

      .wrap {
        margin: 0 auto;
        width: 860.625px;
        position: relative;
        border-bottom: 1px solid #2a2a2a;
      }
      
      .hero {
        margin-left: 45px;
        width: 110px;
      }

      .hero-name {
        width: 110px;
      }

      .games-played {
        width: 90px;
      }

      .popularity {
        width: 120px;
      }

      .sort::after {
        font-family: "Font Awesome 5 Free";
        content: "\f0d7";
        font-style: normal;
        font-weight: 900;
        margin-left: 5px;
      }

      .pickrate {
        width: 75px;
      }

      .banrate {
        width: 75px;
      }

      .winrate {
        width: 120px;
      }

      .delta-winrate {
        width: 45px;
      }

      .negative {
        color: #FF4500
      }

      .positive {
        color: #3BE33B
      }
    `}</style>
    <style jsx global>{`
        @import url("https://use.fontawesome.com/releases/v5.13.0/css/all.css");

        body {
          color: #888;
          font-family: lato,sans-serif;
          background: #171717;
          margin: 0;
          width: calc(100vw - 34px);
        }
    `}</style>
    </div>
  )

};

export async function getStaticProps() {
  let heroes = require('../Heroes.json');

  return await axios.get('https://herobuilds-api.herokuapp.com/api/heroes/').then(res => {
    let heroesWithRoles = res.data.heroes.map(hero => {
      heroes.forEach(i => {
        if (i.PrimaryName === hero.name) {
          hero.role = i.Group;
        }
      })
    })

    return {
      props: heroesWithRoles
    }
  })
}

export default Index;