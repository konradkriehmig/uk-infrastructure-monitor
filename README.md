# Simulation of an operational dashboard monitoring the UK's electricity market with real geo data

<img width="2402" height="1489" alt="image" src="https://github.com/user-attachments/assets/0a6a9b80-3c6d-473b-bc67-a76d7d8d689a" />

You have a supply (Altcoin Portfolio) and demand (Bitcoin portfolio). The frequency (50 Hz, needs to be stable) is the spread between the two. You need to keep your Bitcoin portfolio value close to your Altcoin portfolio value by pressing the buttons in the middle. 

Also you can see the whole grid system of the UK (based on real data from NESO) and create/resolve incidents affecting certain grid supply points:

I chose the Uk because the APIs are very accessible.

<img width="2401" height="1495" alt="image" src="https://github.com/user-attachments/assets/c7347108-65a2-4f27-a695-d58d4b0efecf" />

Further, energy plants are producting electricity, you can see all the energy plants in the UK on the map (real publicly available data). This helps you understand where the grid is transporting electricity from and you can also see that for example most hydro and wind energy comes from the North, while Solar mainly comes from the South.

<img width="2399" height="1484" alt="image" src="https://github.com/user-attachments/assets/1a548a2a-3dfa-4f24-9da4-50527c82f4fb" />

#### Tech Stack:
- Palantir Foundry/AIP Dev-Tier: Data Connections, Data Pipelines and Code Transforms, Ontology (objects, links, actions), Python/Typescript functions, Automate, Workshop, AIP Logic, AIP Agent
- AWS EC2 instance as streaming agent, setup guide: AWS-EC2-Instance/AWS-EC2-INSTANCE-SETUP.md

#### Next step/options to contributute:
- AIP logic executes trades based on prediction models like Monte-Carlo, adding resources so that the frequency is most likely to stay stable as long as possible
- Adding budget constraints, always take what is cheapest and most stable
- getting real electricity transmission data (paid)

https://www.youtube.com/watch?v=iNONhBTszeA

Sharing .zip file on request.
