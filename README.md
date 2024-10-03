# NLM Drug API Integration

## Setup

1. Clone the repository:
   git clone https://github.com/GalaxyWar121710/CPS-assessment.git
2. Install dependencies:
   npm install
3. Start the server:
   npm start
4. Run the tests:
   npm test

## API Endpoints

- `GET /api/drugs/:name` - Fetch drug details by name.
- `GET /api/drugs/:rxcui/proprietary/:srclist/:rxaui` - Fetch proprietary information for a drug by RxCUI.
