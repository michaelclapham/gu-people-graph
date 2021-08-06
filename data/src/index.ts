import { Octokit } from "@octokit/rest";
import { ProductAndEngineeringStream } from "./pne_types";
import { pAndEStreams } from "./streams_data";
import * as fs from "fs";

import { GetResponseTypeFromEndpointMethod } from "@octokit/types";
import { botUsernames } from "./bots";

type UserResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.users.getByUsername
>;
export type User = UserResponse['data'];


require("dotenv").config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function populateStreamsWithMembers(streams: ProductAndEngineeringStream[]): Promise<ProductAndEngineeringStream[]> {
  for (let stream of streams) {
    for (let team of stream.teams) {
        const members = await octokit.paginate<User>(`GET /orgs/guardian/teams/${team.githubTeamSlug}/members`, {});
        team.teamMembers = members;
    }
  }
  return streams;
}

async function populateStreamsWithFullMembers(streams: ProductAndEngineeringStream[]): Promise<ProductAndEngineeringStream[]> {
    for (let stream of streams) {
      for (let team of stream.teams) {
          const members = await octokit.paginate<User>(`GET /orgs/guardian/teams/${team.githubTeamSlug}/members`, {});
          const promises = members
          .filter((teamMember) => botUsernames.indexOf(teamMember.login as string) < 0 )
          .map(async (teamMember) => {
              console.log(`For stream ${stream.name}, team ${team.name}, fetching ${teamMember.login}`);
              const res = await octokit.users.getByUsername({ username: teamMember.login as string });
              return res.data;
          });
          team.teamMembers = await Promise.all(promises);
      }
    }
    return streams;
  }
  

  populateStreamsWithFullMembers(pAndEStreams).then((streamsWithMembers) => {
    fs.writeFileSync("../docs/streams_with_members.json", JSON.stringify(streamsWithMembers, null, 2));
});