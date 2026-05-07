## Architecture

```mermaid
flowchart TD
  Client[Client / Postman / Browser]
  API[Express API]
  Controller[Controller]
  Service[Service]
  Repository[Repository]
  Redis[(Redis Cache)]
  DB[(PostgreSQL)]

  Client --> API
  API --> Controller
  Controller --> Service
  Service --> Redis
  Service --> Repository
  Repository --> DB
  ```md
## Trade-offs

Click count is updated synchronously in the first version.
This keeps the implementation simple, but under high traffic it may slow down redirect requests.
A future improvement is to push click events to a queue and process them asynchronously.