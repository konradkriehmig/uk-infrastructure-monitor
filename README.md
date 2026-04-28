An operational monitor for the UK electricity grid, built on Palantir Foundry. Uses NESO grid topology and Carbon Intensity API data, with a high-frequency price feed simulating real-time supply variation. Local GSPs can report incidents, which propagate through the ontology and trigger a simulated supply drop the operator must respond to.

[Note: the live streaming component currently uses Crypto price data as a stand-in, since it's the highest-frequency free public feed available. The NESO grid topology and energy plant data are real; the per-second supply variation is driven by price movement mapped onto generation values.]

The map shows the whole high-voltage grid system of the UK (based on real data from NESO). 

<img width="2399" height="1484" alt="image" src="https://github.com/user-attachments/assets/1a548a2a-3dfa-4f24-9da4-50527c82f4fb" />

Further, energy plants are producing electricity, you can see all the energy plants in the UK on the map (real publicly available data). This helps you understand where the grid is transporting electricity from and map shows that for example most hydro and wind energy comes from the North, while Solar mainly comes from the South.

<img width="2389" height="1484" alt="image" src="https://github.com/user-attachments/assets/105ac40c-cc21-4ce8-8d82-90b52da30d1a" />

Local GSP operators, which are distinct from the national grid operator, would mark incidents in the system if they occur. Currently, the project simulates a supply drop, whenever a GSP reports an issue. In such a case, it is the grid operator's responsibility to stabilize the frequency to serve electricity demand and reduce physical strain on the grid.

<img width="2402" height="1489" alt="image" src="https://github.com/user-attachments/assets/0a6a9b80-3c6d-473b-bc67-a76d7d8d689a" />

The monitor lets user control electricity supply by pressing buttons that will trigger an action, simulating a request for the production of a specific electricity source type. I chose the UK for this project because the APIs are very accessible.

#### Tech Stack:
- Palantir Foundry/AIP Dev-Tier: Data Connections, Data Pipelines and Code Transforms, Ontology (objects, links, actions), Python/Typescript functions, Automate, Workshop, AIP Logic, AIP Agent
- AWS EC2 instance as streaming agent, setup guide: [ AWS-EC2-Instance/AWS-EC2-INSTANCE-SETUP.md](https://github.com/konradkriehmig/uk-infrastructure-monitor/tree/main/AWS-EC2-Instance)

#### Next steps:
- AIP Logic dispatches energy based on prediction models like Monte-Carlo, adding resources so that the frequency is most likely to stay stable as long as possible
- Adding budget constraints, always take what is cheapest and most stable
- Replace streaming pipeline source with live transmission data from a paid feed


