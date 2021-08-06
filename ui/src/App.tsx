import React from 'react';
import logo from './logo.svg';
import './App.css';
import { streams } from './streams_with_members';
import ForceGraph from 'force-graph';

const userNameStyle: React.CSSProperties = {
  color: 'white'
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Guardian - Product and Engineering Streams</h1>
        {streams.map((stream) => <section key={stream.name}>
          <h2>{stream.name} - Teams</h2>
          <ul>
          {stream.teams.map((team) => <li key={team.name}>
            <h3>{team.name}</h3>
            <ul>
              {team.teamMembers.map((teamMember) => 
                <li key={teamMember.login}>
                  <img src={teamMember.avatar_url} width={50} height={50}></img>
                  <a href={'http://github.com/' + teamMember.login} style={userNameStyle}>{teamMember.name}</a>
                </li>
              )}
            </ul>
          </li>)}
          </ul>
        </section>)}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
