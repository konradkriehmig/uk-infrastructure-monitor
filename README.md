# Monitoring the UKs infrastructure
I built a monitor for the UK government in Palantir Foundry/AIP to monitor its energy infrastructure.

Main Points:
- I used publicly available data to simulate a real world scenario
- You can interact with the Ontology using the workshop, action include reporting an incident and changing the status of a plant
- The Ontology is connected to an agent that can carry out these actions for you

<img width="2188" height="1485" alt="image" src="https://github.com/user-attachments/assets/9fc1d298-84ec-4d2d-beef-ec2be6becc87" />

APIs: carbon intensity data from UK gov

The following video helped me immensely creating it:
https://www.youtube.com/watch?v=bPGnvfyMuxE

How to contribute:
Think about how to prevent failures, estimate demand and supply, schedule maintenance

Further problems to be solved:
1) there is currently a supply and demand gap in the uk energy market with inefficiency leading to
2) higher consumer prices, like in 2022 where household electricity bills painfully increased by 54% in a single quarter.
3) although demand and supply matching is already automated on a 24h basis, there is a lack of intelligence layer to predict supply within hours.
4) Palantir's AIP intelligence layer would be able to further remove inefficiency and decrease consumer bills

[WIP] Pitch for this project: 
When demand rises on Britain's grid, a gas plant fires up to cover the gap — and that plant sets the price everyone pays. Bills spike with gas prices, as they have again in 2026.
Thousands of cold stores, factories, and data centres can drop their load for minutes at a time so that plant never gets called. No one notices. Bills just don't climb as high. This already happens through the Demand Flexibility Service — but it's fragmented across 20+ separate markets with no shared view of what's available or where.
This project is that shared view. One platform on Foundry showing every flexible asset on the grid, ready to be dispatched when and where it's needed. Operators coordinate through AI agents — one watching grid conditions, one managing asset availability, one handling dispatch — each scoped to a specific job, supervised by humans, and orchestrated together. Less gas burned, lower bills, today.
