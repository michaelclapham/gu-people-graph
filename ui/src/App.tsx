import React from 'react';
import './App.css';
import { streams } from './streams_with_members';
import ForceGraph2D, { GraphData, LinkObject, NodeObject } from 'react-force-graph-2d';

const userNameStyle: React.CSSProperties = {
  color: 'white'
};

// Random tree
// const N = 300;
// const gData = {
//   nodes: Array.from(Array(N), (x, i) => ({ id: i })),
//   links: Array.from(Array(N), (x, i) => ({ id: i }))
//     .filter(node => node.id)
//     .map(node => ({
//       source: node.id,
//       target: Math.round(Math.random() * (node.id - 1))
//     }))
// };

type GuGraphNode = NodeObject & {
  type: "STREAM" | "TEAM" | "TEAM_MEMBER",
  name?: string,
  imgUrl?: string;
  imgLoaded?: boolean;
  img?: HTMLImageElement;
};

function generateGraphData(): GraphData {
  let i = 0;
  let nodes: GuGraphNode[] = [];
  let links: LinkObject[] = [];
  for (let stream of streams) {
    const streamNode: GuGraphNode = { id: i++, type: "STREAM", name: stream.name };
    nodes.push(streamNode);
    for (let team of stream.teams) {
      const teamNode: GuGraphNode = { id: i++, type: "TEAM", name: team.name };
      nodes.push(teamNode);
      links.push({ source: streamNode.id, target: teamNode.id });
      for (let teamMember of team.teamMembers) {
        const teamMemberNode: GuGraphNode = {
          id: i++, type: "TEAM_MEMBER",
          name: teamMember.name,
          imgUrl: teamMember.avatar_url,
          imgLoaded: false
        };
        nodes.push(teamMemberNode);
        links.push({ source: teamNode.id, target: teamMemberNode.id, });
      }
    }
  }
  return { nodes, links };
}

const gData = generateGraphData();

function renderNode(node: NodeObject, ctx: CanvasRenderingContext2D) {
  if (node.x && node.y) {
    ctx.fillStyle = "red";
    ctx.ellipse(node.x, node.y, 20, 20, 0, 0, Math.PI * 2);
  }
  
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ForceGraph2D
          graphData={gData}
          nodeRelSize={12}
          nodeCanvasObject={(no, ctx) => {
            const node = no as GuGraphNode;
            if (node.imgUrl && !node.img) {
              node.img = new Image();
              node.img.src = node.imgUrl;
              node.img.onload = () => { node.imgLoaded = true };
            }
            if (node.x && node.y) {
              const size = 12;
              if (node.type === "STREAM") {
                ctx.fillStyle = "red";
              } else {
                ctx.fillStyle = "blue";
              }
              ctx.fillRect(node.x, node.y, size, size);
              if (node.imgLoaded && node.img) {
                ctx.drawImage(node.img, node.x, node.y, size, size);
              }
            }
          }}
        >
        </ForceGraph2D>
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


