# I made an operational dashboard where you can trade paper crypto based on real data, representing the UK's electricity market with real geo data

<img width="2028" height="1488" alt="image" src="https://github.com/user-attachments/assets/c20ed1e4-52b1-425f-9896-42db876b0bf8" />

You have a supply (Altcoin Portfolio) and demand (Bitcoin portfolio). The frequency (50 Hz, needs to be stable) is the spread between the two. You need to keep your Bitcoin portfolio value close to your Altcoin portfolio value by pressing the buttons in the middle. 

Also you can see the whole grid system of the UK (based on real data from NESO) and create/resolve incidents affecting certain grid supply points:

<img width="2039" height="1505" alt="image" src="https://github.com/user-attachments/assets/96cec322-45c4-45c4-aab4-4740cb839b87" />

Further, energy plants are producting electricity, you can see all the energy plants in the UK on the map (real publicly available data). This helps you understand where the grid is transporting electricity from and you can also see that for example most hydro and wind energy comes from the North, while Solar mainly comes from the South.

<img width="2018" height="1443" alt="image" src="https://github.com/user-attachments/assets/002fe226-a69e-4108-8662-b17691c6d49b" />











Old:

# Monitoring the UKs infrastructure
I built a monitor for the UK government in Palantir Foundry/AIP to monitor its energy infrastructure.

(Built in Palantir Foundry/AIP free-tier ans AWS free-tier, no setup costs, used CoPilot for getting the grid lines into workshop)

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

# Part 2: Demand and Supply mapping to Cryptocurrency

lets think about our objects we want to create for a moment:

1) Electricity demand: Bitcoin portfolio

2) Electricity supply: Altcoin portfolio

   a. nuclear supply - cannot be bought, should be more stable

   b. solar supply - cannot be bought, volatile

   c. import supply - can be bought, volatile

   d. gas supply - can be bought, most volatile

   b. solar supply - cannot be bought, volatile

   e. hydro supply - cannot be bought, stable
