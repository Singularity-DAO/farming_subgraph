# Singularity Subgraph

The Graph exposes a GraphQL endpoint to query the events and entities within the SingularityDao ecosytem.

**Master Chef**: Indexes all MasterChef staking data: https://thegraph.com/studio/subgraph/singularity/


## To build and deploy

1. Install graph-CLI : `npm install -g @graphprotocol/graph-cli`
2. Install graph ts : `npm i @graphprotocol/graph-ts`
3. Authenticate within the CLI, build and deploy your subgraph to the Studio : `graph auth  --studio [API_KEY]` 
4. Build the Subgraph `graph codegen && graph build`
5. Deploy the Subgraph `graph deploy --studio singularity`.

## Example Queries
COMING SOON