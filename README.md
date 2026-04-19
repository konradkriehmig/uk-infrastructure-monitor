# I made an operational dashboard where you can trade paper crypto based on live data, representing the UK's electricity market with real geo data

<img width="2028" height="1488" alt="image" src="https://github.com/user-attachments/assets/c20ed1e4-52b1-425f-9896-42db876b0bf8" />

You have a supply (Altcoin Portfolio) and demand (Bitcoin portfolio). The frequency (50 Hz, needs to be stable) is the spread between the two. You need to keep your Bitcoin portfolio value close to your Altcoin portfolio value by pressing the buttons in the middle. 

Also you can see the whole grid system of the UK (based on real data from NESO) and create/resolve incidents affecting certain grid supply points:

I chose the Uk because the APIs are very accessible.
<img width="2039" height="1505" alt="image" src="https://github.com/user-attachments/assets/96cec322-45c4-45c4-aab4-4740cb839b87" />

Further, energy plants are producting electricity, you can see all the energy plants in the UK on the map (real publicly available data). This helps you understand where the grid is transporting electricity from and you can also see that for example most hydro and wind energy comes from the North, while Solar mainly comes from the South.

<img width="2018" height="1443" alt="image" src="https://github.com/user-attachments/assets/002fe226-a69e-4108-8662-b17691c6d49b" />

Next step: Automation
a) Deterministic: let algorithm press buttons based on what gets closed to frequency
b) Non-deterministic: AIP logic executes trades based on prediction models like Monte-Carlo, adding resources so that the frequency is most likely to stay stable as long as possible
c) Adding budget constraints, always take what is cheapest and most stable

