## ADDED Requirements

### Requirement: Login frame with account selection
The system SHALL display a login frame showing previously-used accounts (from localStorage) as clickable items, plus a username/PIN form for new logins.

#### Scenario: Returning user selects saved account
- **WHEN** the user clicks a saved account from the list
- **THEN** the system SHALL attempt to load the garden using that account's stored token
- **THEN** if the token is valid, transition to the garden frame

#### Scenario: Returning user with expired token
- **WHEN** a saved account's token returns 401
- **THEN** the system SHALL remove that account from localStorage and show the login form with an error message

#### Scenario: New user creates account
- **WHEN** the user enters a username and 6-digit PIN and clicks "Skapa odling" (Create farm)
- **THEN** the system SHALL call the sign-up endpoint, store the token in localStorage, and transition to the garden frame

#### Scenario: Existing user logs in
- **WHEN** the user enters credentials and clicks "Logga in" (Login)
- **THEN** the system SHALL call the login endpoint, store/update the token in localStorage, and transition to the garden frame

### Requirement: Multi-account localStorage management
The system SHALL store multiple account tokens under the localStorage key `farming-game-accounts` as a JSON array of `{ username, token }` objects.

#### Scenario: Token stored on successful auth
- **WHEN** login or sign-up succeeds
- **THEN** the token SHALL be added to (or updated in) the accounts array in localStorage

#### Scenario: Active token is component state
- **WHEN** an account is selected or authenticated
- **THEN** the active token SHALL be stored in React component state (not read from localStorage on every request)

### Requirement: Loading screen during auth
The system SHALL show a full-overlay loading screen with the watering can image (from button-images) and "Laddar..." text while authentication or initial garden load is in progress.

#### Scenario: Auth request in flight
- **WHEN** the user submits login/signup or selects a saved account
- **THEN** a loading overlay SHALL appear covering the modal until the auth response and garden data arrive
