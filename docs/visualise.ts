import { ProductAndEngineeringStream } from "../gu-people-data/src/pne_types";

async function main() {
  const contentDiv = document.getElementById("content");
  const streams: ProductAndEngineeringStream[] = await (
    await fetch("streams_with_members.json")
  ).json();
  for (let stream of streams) {
      contentDiv.appendChild
    for (let team of stream.teams) {
    }
  }
}
