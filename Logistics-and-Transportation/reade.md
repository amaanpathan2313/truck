 # Logistics-and-Transportation


 # video :  

## Overview
This is a React-based web application designed to manage truck-related information, including truck details, driver information, transport history, maintenance schedules, and revenue tracking. The application uses Firebase Realtime Database for data storage and retrieval and is styled with CSS for a responsive and visually appealing user interface.

## Features
- **Manage Truck Information**: Add, edit, and delete truck details such as company name, model number, passing date, insurance, PUC, and registration number.
- **Manage Driver Information**: View, edit, and delete driver details, including name, address, phone number, age, and assigned vehicle number.
- **Transport History**: Log and manage transport records, including date, time, start and end locations, distance, and charges.
- **Truck Maintenance**: Display a Google Calendar iframe for scheduling and viewing truck maintenance tasks.
- **Revenue Summary**: Display daily, weekly, and monthly revenue based on transport history data.

## Project Structure
The application consists of the following main components:

- **ManageTruckInformation.jsx**: Handles the addition, display, and deletion of truck information. Includes a form for adding new trucks and a grid to display existing truck records.
- **ManageDriver.jsx**: Displays a list of drivers and allows deletion and navigation to the edit page for driver details.
- **EditDriver.jsx**: Allows editing of existing driver details using a form pre-filled with data fetched from Firebase.
- **TransportHistory.jsx**: Manages transport logs with a form to add new entries and a grid to display existing records.
- **TruckMaintanance.jsx**: Embeds a Google Calendar for tracking maintenance schedules with an alert to guide users.
- **Revenue.jsx**: Calculates and displays daily, weekly, and monthly revenue based on transport history data.

## Prerequisites
To run this project, you need the following:
- Node.js (v14 or higher)
- npm or yarn
- Firebase Realtime Database (set up with appropriate credentials and rules)
- A modern web browser

## Installation
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Set Up Firebase**:
   - Create a Firebase project and enable the Realtime Database.
   - Configure the Firebase SDK in your project by adding your Firebase configuration to a file (e.g., `firebase.js`).
   - Ensure the database URLs in the components (e.g., `https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/`) match your Firebase project.

4. **Run the Application**:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

   The application will be available at `http://localhost:3000`.

## Usage
- **Manage Trucks**: Navigate to the truck management section to add new trucks or remove existing ones. Truck details are displayed in a grid format.
- **Manage Drivers**: View all drivers in a grid. Click "Edit" to modify a driver's details or "Remove" to delete a driver.
- **Edit Driver**: Update driver details using the form, which is pre-filled with existing data.
- **Transport History**: Log new transport entries or remove existing ones. Entries are displayed in a grid with details like date, time, and distance.
- **Truck Maintenance**: View the embedded Google Calendar for maintenance schedules. An alert prompts users to add the calendar to their account.
- **Revenue Summary**: View calculated revenue for daily, weekly, and monthly periods based on transport history.

## Styling
- The application uses a custom CSS file (`managetruckinfo.css`, `EditUser.css`, `Revenue.css`) for styling.
- Background images from Unsplash are used to enhance the visual appeal, with a blurred overlay effect for forms and data grids.
- The layout is responsive, using CSS Grid and Flexbox for alignment and spacing.

## Known Issues
- The `editUser` function is referenced in `ManageTruckInformation.jsx` and `TransportHistory.jsx` but is not defined in those components, causing potential runtime errors.
- The `Content-Type` header in `EditDriver.jsx` is incorrectly set to `application/.json` instead of `application/json`.
- The `useEffect` hook in `TransportHistory.jsx` includes `obj` as a dependency, which may cause unnecessary re-renders.
- Input types in forms (e.g., `type="number"` for dates) may not be optimal for all fields.

## Future Improvements
- Implement the `editUser` function in `ManageTruckInformation.jsx` and `TransportHistory.jsx` to enable editing of truck and transport records.
- Fix the `Content-Type` header in `EditDriver.jsx`.
- Optimize the `useEffect` dependency in `TransportHistory.jsx` to prevent excessive fetching.
- Add form validation to ensure correct data entry.
- Enhance accessibility with ARIA attributes and better keyboard navigation.
- Add loading spinners and error messages for better user feedback during API calls.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a pull request.

## License
This project is licensed under the MIT License.