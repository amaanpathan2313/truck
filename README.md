 # 🚛 Logistics & Transportation Management System

Deployed Link :  https://logistics-transportation.netlify.app/
 
A beautiful, responsive full-stack note-taking application built with Express.js backend and vanilla HTML/CSS/JavaScript frontend.

# Project Screenshots : 

* Index page
![Index_page](../truck/Logistics-and-Transportation%202.0/project_screenshorts/index_page.png)

* Login Page
![Login_Page](../truck/Logistics-and-Transportation%202.0/project_screenshorts/login_page.png)

* Dashbord Page
![Dashbord_page](../truck/Logistics-and-Transportation%202.0/project_screenshorts/Dashbord.png)

* Driver management page
![Driver_management_page](../truck/Logistics-and-Transportation%202.0/project_screenshorts/Driver_management_section.JPG)

* Transport History page
![transport_History_page](../truck/Logistics-and-Transportation%202.0/project_screenshorts/transport_History.png)

* Truck management page
![truck_management_page](../truck/Logistics-and-Transportation%202.0/project_screenshorts/truck_management.JPG)

* revenue Analytics page
![revenue_Analyticse](../truck/Logistics-and-Transportation%202.0/project_screenshorts/revenue_Analytics.JPG)

A modern, responsive web application for managing logistics and transportation operations with user management, and revenue analytics.

## ✨ Features


### 🗂️ Driver Management
- **Complete CRUD operations** for driver profiles
- **Driver information management**
- **Admin dashboard** for user oversight
- **Real-time data updates**

### 🚚 Truck Management
- **Fleet management system** with detailed truck information
- **Insurance & PUC tracking** with expiry dates
- **Maintenance scheduling**
- **Vehicle status monitoring**

### 💰 Revenue & Analytics
- **Real-time revenue tracking** (Daily, Weekly, Monthly)
- **Interactive charts** and data visualization
- **Multiple chart types** (Bar, Pie, Line)
- **Currency conversion** support
- **Theme customization**

### 🎨 UI/UX Features
- **Modern glass morphism design**
- **Responsive layout** for all devices
- **Smooth animations** and transitions
- **Dark/Light theme support**
- **Interactive components**

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **Recharts** - Data visualization
- **CSS3** - Advanced styling with animations

### Backend & Database
- **Firebase Realtime Database** - Cloud database
- **REST API** - HTTP methods for CRUD operations

### Development Tools
- **JavaScript ES6+** - Modern JavaScript features
- **CSS-in-JS** - Component-level styling
- **Git** - Version control

## 📁 Project Structure

```
logistics-transportation-system/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── Components/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   └── Registration.js
│   │   │
│   │   ├── Dashboard/
│   │   │   ├── AdminHome.js
│   │   │   ├── UserHome.js
│   │   │   └── Revenue.js
│   │   │
│   │   ├── Management/
│   │   │   ├── ManageTruckInformation.js
│   │   │   ├── EditDriver.js
│   │   │   └── EditUser.js
│   │   │
│   │   └── Common/
│   │       ├── Header.js
│   │       └── Footer.js
│   │
│   ├── Features/
│   │   └── auth/
│   │       ├── authSlice.js
│   │       └── authService.js
│   │
│   ├── Styles/
│   │   ├── Login.css
│   │   ├── EditUser.css
│   │   └── ManageTruckInformation.css
│   │
│   ├── Utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   │
│   ├── App.js
│   ├── App.css
│   └── index.js
│
├── package.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/logistics-transportation-system.git
   cd logistics-transportation-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Configuration**
   - Create a new Firebase project
   - Enable Realtime Database
   - Update Firebase configuration in your components

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Firebase Setup
Update the Firebase configuration in your components:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project.firebasedatabase.app",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_DATABASE_URL=your_database_url
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
```

## 📊 Component Details

### 🔐 Authentication Components
- **Login**: User authentication with email and password
- **Registration**: New user account creation with validation

### 🏠 Dashboard Components
- **AdminHome**: Administrative dashboard with overview
- **UserHome**: User-specific dashboard and features
- **Revenue**: Analytics and revenue tracking with charts

### 🛠️ Management Components
- **ManageTruckInformation**: Complete truck fleet management
- **EditDriver**: Driver profile editing and management
- **EditUser**: User profile management and updates

## 🎨 Styling & Design System

### Design Principles
- **Glass Morphism**: Semi-transparent backgrounds with blur effects
- **Responsive Grid**: CSS Grid and Flexbox layouts
- **Smooth Animations**: CSS transitions and keyframe animations
- **Consistent Typography**: Google Fonts with proper hierarchy

### Color Palette
```css
/* Primary Colors */
--primary-blue: #4facfe;
--primary-green: #00f2fe;
--accent-purple: #667eea;
--accent-pink: #764ba2;

/* Neutral Colors */
--dark-bg: rgba(0, 0, 0, 0.7);
--light-bg: rgba(255, 255, 255, 0.1);
--text-light: #ffffff;
--text-dark: #2d3748;
```

## 🔄 State Management

### Redux Store Structure
```javascript
{
  auth: {
    user: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
  }
}
```

### API Integration
All components use Firebase Realtime Database with REST API:
- **GET**: Fetch data for display
- **POST**: Create new records
- **PUT**: Update existing records
- **DELETE**: Remove records

## 📱 Responsive Design

The application is fully responsive across all devices:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Features

- Input validation and sanitization
- Protected routes based on user roles
- Secure authentication flow
- Error boundary implementation

## 🚀 Performance Optimizations

- Lazy loading of components
- Efficient re-rendering with React hooks
- Optimized images and assets
- Minimal bundle size

## 📈 Future Enhancements

- [ ] Real-time GPS tracking
- [ ] Push notifications
- [ ] Advanced reporting
- [ ] Multi-language support
- [ ] PWA implementation
- [ ] Advanced search and filters
- [ ] Document management
- [ ] Integration with mapping services

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Team

- **Project Lead**: [Your Name]
- **Frontend Development**: [Your Name]
- **UI/UX Design**: [Your Name]

## 📞 Support

For support, email your-email@example.com or join our Slack channel.

## 🙏 Acknowledgments

- Unsplash for beautiful background images
- Firebase for backend services
- React community for excellent documentation
- Recharts for data visualization components

---

<div align="center">

**Built with ❤️ using React & Firebase**

*Making Logistics Management Simple & Efficient*

</div>