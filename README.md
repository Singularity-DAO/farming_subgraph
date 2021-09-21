# Singularity farming contract Subgraph

The Graph exposes a GraphQL endpoint to query the events and entities within the SingularityDao ecosytem.

**Master Chef**: Indexes all MasterChef staking data: https://thegraph.com/studio/subgraph/singularity/


## To build and deploy

1. Install graph-CLI : `yarn global add @graphprotocol/graph-cli` or `npm install -g @graphprotocol/graph-cli`
2. Authenticate within the CLI, build and deploy your subgraph to the Studio : `graph auth  --studio [API_KEY]` 
3. Build the Subgraph `graph codegen && graph build`
4. Deploy the Subgraph `graph deploy --studio [SUBGRAPH_NAME]`.

## Example Queries
COMING SOON
