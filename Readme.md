# gcp deployment load balancer


**1. Create a VPC and Subnet:**

- Open Google Cloud Console.
- Go to "VPC networks" in the navigation menu.
- Click "Create VPC network."
- Provide a name for the network (e.g., `my-vpc`).
- Choose a region (e.g., `us-central1`).
- Create a subnet within the VPC:
  - Give it a name (e.g., `my-subnet`).
  - Set the IP range (e.g., `10.7.0.0/24`).
  - Click "Create."

**2. Create Virtual Machines:**

- Go to "Compute Engine" in the navigation menu.
- Create the client VM:
  - Click "Create instance."
  - Choose the region and zone (e.g., `us-central1`).
  - Set machine type, boot disk, etc.
  - In the "Networking" section, choose your VPC and subnet.
  - Add any necessary firewall tags (e.g., `client-server`).
  - Click "Create."
- Repeat the process for the backend VM and SQL VM, adjusting settings as needed.

**3. Set Up Load Balancer:**

- Go to "Load balancing" in the navigation menu.
- Click "Create a load balancer."
- Choose "HTTP(S) Load Balancing."
- Configure backend services:
  - Create a backend service for your backend VM(s):
    - Choose a name (e.g., `backend-service`).
    - Configure instance groups with your backend VMs.
    - Add a health check.
  - Create a backend service for your SQL VM:
    - Similar steps as above, but no need for a health check.
- Configure frontend service:
  - Give your load balancer a name.
  - Choose your VPC network and subnet.
  - Add an IP address (static or ephemeral).
  - Specify the protocol and port (e.g., HTTP on port 80).
- Create the load balancer.

**4. Configure VMs:**

- SSH into each VM using Cloud Shell or another SSH client.
- Set up the client VM as needed for your application.
- Configure the backend VM with your backend application.
- Set up the SQL VM with your database server.

**5. Firewall Rules:**

- Go to "Firewall" in the navigation menu.
- Create firewall rules to allow necessary traffic to the VMs:
  - For example, allow HTTP traffic to the client and backend VMs.
  - Allow SQL traffic to the SQL VM.
  
**6. Test the Setup:**

- Access the client VM's external IP in a browser to see if the load balancer is distributing traffic.
- Verify that the backend VM is properly serving requests.
- Check the SQL VM's status and connectivity.

