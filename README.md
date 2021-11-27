# Credit Card Form

http://credit-card-form-daniellzl.surge.sh/

A simple credit card form with error validation made using `create-react-app`

### User Stories

1. User can enter name, card number, CVV2, expiration month and year into form fields
2. Invalid inputs should present an error to the user. Errors:
   - name is required
   - card number is required
   - card number must match known vendor format (ex. "4111 1111 1111 1111" for Visa)
   - cvv2 is required
   - cvv2 must match known vendor format (ex. "123" for Visa)
   - card number and cvv2 must match known vendor format (ex. "4111 1111 1111 1111" and "123" for Visa)
   - expiration month is required
   - expiration month must be month from "01" to "12"
   - expiration year is required
   - expiration year must be year from "2000" to "2099"
   - expiration month and year must be in the future (ex. "12" and "2099")
3. User can submit a valid form

# Setup

1. From root directory, run `yarn`.
2. Run `yarn start` to start the local development server.
3. Run `yarn test` to run tests.

# Improvements

1. Fix cursor jumpiness when deleting characters from fields that are being validated (ex. card number)
2. Better tests
3. Type checking
