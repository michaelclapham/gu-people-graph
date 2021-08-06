import { ProductAndEngineeringStream } from "./pne_types";

export const pAndEStreams: ProductAndEngineeringStream[] = [
    {
        name: 'End to End Experiences',
        teams: [
            {
                name: 'Data Tech',
                githubTeamSlug: 'data-technology'
            },
            {
                name: 'Targeted Experiences',
                githubTeamSlug: 'tx-engineers'
            },
            {
                name: 'Identity',
                githubTeamSlug: 'identity'
            }
        ]
    },
    {
        name: 'Journalism & Ed Tools',
        teams: [
            {
                name: 'Ophan',
                githubTeamSlug: 'ophan'
            },
            {
                name: 'Investigations',
                githubTeamSlug: 'investigations'
            },
            {
                name: 'Digital CMS',
                githubTeamSlug: 'digital-cms'
            }
        ]
    }
];