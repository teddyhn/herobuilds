import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Router from 'next/router'
import HeroTiles from '../../components/HeroTiles/HeroTiles'
import TypeaheadFilter from '../../components/Typeahead/TypeaheadFilter'
import Layout from '../../components/Layout'
import Progress from '../../components/ProgressBar/Progress'
import Navbar from '../../components/Navbar/Navbar'

export const Index = props => {
    const [isLoading, setIsLoading] = useState(true)
    const [activeRole, setActiveRole] = useState('All')
    const [heroes, setHeroes] = useState()

    useEffect(() => {
        const handleRouteChange = url => {
          setIsLoading(true);
        }

        const handleRouteChangeComplete = url => {
            setIsLoading(false);
        }
    
        Router.events.on('routeChangeStart', handleRouteChange)
        Router.events.on('routeChangeComplete', handleRouteChangeComplete)
    
        setHeroes(props.heroes.filter(el => { return activeRole !== 'All' ? el.role === activeRole : el }))
        setIsLoading(false)
    
        return () => {
          Router.events.off('routeChangeStart', handleRouteChange);
          Router.events.off('routeChangeComplete', handleRouteChangeComplete);
        }
    }, [activeRole])

    return (
        <Layout>
            <Navbar />
            <Progress isAnimating={isLoading} />
            <div className="top-module">
                <div className="wrap">
                    <h2 style={{ color: "#cbcbcb" }}>Heroes</h2>
                    <TypeaheadFilter />
                </div>
            </div>
            <div className="container">
                <div className="wrap">
                    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="role-filters">
                            <a className={`role-selection all ${activeRole === 'All' ? 'active' : null}`} onClick={() => setActiveRole('All')}>
                                <div>All</div>
                            </a>
                            <a className={`role-selection tank ${activeRole === 'Tank' ? 'active' : null}`} onClick={() => setActiveRole('Tank')}>
                                <img className="role-img" src={require('../../public/assets/role/tank.png')} />
                                <p>Tank</p>
                            </a>
                            <a className={`role-selection bruiser ${activeRole === 'Bruiser' ? 'active' : null}`} onClick={() => setActiveRole('Bruiser')}>
                                <img className="role-img" src={require('../../public/assets/role/bruiser.png')} />
                                <p>Bruiser</p>
                            </a>
                            <a className={`role-selection ranged ${activeRole === 'Ranged Assassin' ? 'active' : null}`} onClick={() => setActiveRole('Ranged Assassin')}>
                                <img className="role-img" src={require('../../public/assets/role/ranged.png')} />
                                <p>Ranged Assassin</p>
                            </a>
                            <a className={`role-selection melee ${activeRole === 'Melee Assassin' ? 'active' : null}`} onClick={() => setActiveRole('Melee Assassin')}>
                                <img className="role-img" src={require('../../public/assets/role/melee.png')} />
                                <p>Melee Assassin</p>
                            </a>
                            <a className={`role-selection healer ${activeRole === 'Healer' ? 'active' : null}`} onClick={() => setActiveRole('Healer')}>
                                <img className="role-img" src={require('../../public/assets/role/healer.png')} />
                                <p>Healer</p>
                            </a>
                            <a className={`role-selection support ${activeRole === 'Support' ? 'active' : null}`} onClick={() => setActiveRole('Support')}>
                                <img className="role-img" src={require('../../public/assets/role/support.png')} />
                                <p>Support</p>
                            </a>
                        </div>
                    </header>
                    {heroes ? <HeroTiles heroes={heroes}/> : null}
                </div>
                
            </div>
            <style jsx>{`
                .top-module {
                    margin-top: 58px;
                    background: #242424;
                    padding: 10vh 0 20px 0;
                }

                .hero-img {
                    cursor: pointer;
                    height: 34px;
                    margin: auto 10px auto 0;
                    width: fit-content;
                }
        
                header {
                    color: #cacaca;
                    margin: 20px 0;
                }
        
                .role-filters {
                    display: flex;
                    border: 1px solid #2a2a2a;
                    border-radius: 4px;
                }
        
                .role-filters a {
                    font-size: 0.75rem;
                    padding: 10px 14px;
                    border-right: 1px solid #2a2a2a;
                    cursor: pointer;
                    user-select: none;
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

                .role-selection p {
                    margin: 0;
                }
        
                .wrap {
                    margin: 0 auto;
                    width: 50%;
                    max-width: 960px;
                    position: relative;
                }
                
                .wrap > h2 {
                    margin-top: 0;
                }

                @media only screen and (max-width: 1500px) {
                    .wrap {
                        width: 80%;
                    }
                }

                @media only screen and (max-width: 1200px) {
                    .wrap {
                        width: 90%;
                    }
                }

                @media only screen and (max-width: 900px) {
                    .role-selection p {
                        display: none;
                    }

                    .role-img {
                        margin-right: 0;
                    }
                }
            `}</style>
            <style jsx global>{`
                html {
                    overflow-y: overlay;
                }
                
                body {
                    color: #888;
                    font-family: lato,sans-serif;
                    background: #171717;
                    margin: 0;
                }
            `}</style>
        </Layout>
    )
}

export async function getStaticProps() {
    let heroes = require('../../Heroes.json');
  
    return await axios.get('https://herobuilds-api.herokuapp.com/api/heroes/').then(res => {
      res.data.heroes.map(hero => {
        heroes.forEach(i => {
          if (i.PrimaryName === hero.name) {
            hero.role = i.Group;
            hero.subgroup = i.SubGroup;
          }
        })
      })
  
      return {
        props: res.data
      }
    })
  }
  
export default Index;