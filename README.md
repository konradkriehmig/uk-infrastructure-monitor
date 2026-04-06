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
3) although demand and supply matching is already automated on a 24h basis, there is a lack of intelligence layer to offset disturbances and make predictions within hours.
4) Palantir's AIP intelligence layer would be able to further remove inefficiency and decrease consumer bills
