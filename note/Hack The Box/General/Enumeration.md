*Identify all of the ways we could attack with knowledge of the limitations of tools*
## Network Mapper (Nmap)

### Options
1. **(Default)** TCP-SYN scan **-sS** sends 1 packet with the SYN flag and never completes the 3-way handshake. TCP-RST **reset** indicates an unexpected TCP packet arrives at a host. Nmap may not receive a packet back - **filtered** due to dropped (firewall) or ignored
2. Ping Scan **-sn** disables port scan
3. Output in the 3 major formats **-oA tnet**
4. Shows all packets sent and received **--packet-trace**
5. Displays the reason for specific result **--reason**
### Techniques
1. Host discovery
> Method: ICMP echo requests **-PE**
2. Port scanning
3. Service enumeration & detection
4. OS detection
5. Scriptable interaction

### Problem
1. If we disable port scan (`-sn`), Nmap automatically ping scan with `ICMP Echo Requests` (`-PE`). Once such a request is sent, we usually expect an `ICMP reply` if the pinging host is alive. The more interesting fact is that our previous scans did not do that because before Nmap could send an ICMP echo request, it would send an `ARP ping` resulting in an `ARP reply`. We can confirm this with the "`--packet-trace`" option. To ensure that ICMP echo requests are sent, we also define the option (`-PE`) for this.