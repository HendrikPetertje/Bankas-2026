## ADDED Requirements

### Requirement: API client module
The system SHALL provide a typed API client module (`api.ts`) that wraps all backend endpoints at `https://bankas2026-backend.hendrikpeter.net`.

#### Scenario: Sign up
- **WHEN** `signUp(username, pin)` is called with valid credentials
- **THEN** a POST to `/api/users/sign-up` is made and the response `{ token, garden }` is returned

#### Scenario: Login
- **WHEN** `login(username, pin)` is called
- **THEN** a POST to `/api/users/login` is made and the response `{ token, garden }` is returned

#### Scenario: Get garden state
- **WHEN** `getMyFarm(token)` is called
- **THEN** a GET to `/api/farms/me` with Bearer auth is made and the garden is returned

#### Scenario: Get plant info
- **WHEN** `getPlantInfo()` is called
- **THEN** a GET to `/api/farms/plant-info` is made and the plant catalog is returned

#### Scenario: Plot actions
- **WHEN** `cleanPlot(token, plotNumber)`, `seedPlot(token, plotNumber, plantKind)`, `waterPlot(token, plotNumber)`, or `harvestPlot(token, plotNumber)` is called
- **THEN** the corresponding POST to `/api/farms/plots/{plot_number}/{action}` is made with Bearer auth and the updated garden is returned

### Requirement: Error handling in API client
The API client SHALL detect HTTP error responses and throw typed errors.

#### Scenario: Authentication expired
- **WHEN** any authenticated endpoint returns 401
- **THEN** the client SHALL throw an `AuthExpiredError`

#### Scenario: Validation or conflict error
- **WHEN** an endpoint returns 409 or 422
- **THEN** the client SHALL throw an `ApiError` containing the error detail message from the response body

#### Scenario: Network failure
- **WHEN** a fetch call fails due to network error
- **THEN** the client SHALL throw an `ApiError` with a generic network failure message
