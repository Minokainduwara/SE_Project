import React, { useState } from 'react';
import NavigationSidebar from '../components/userProfile/NavigationSidebar';
import MyProfilePage from '../components/userProfile/MyProfilePage';
import MyOrdersPage from '../components/userProfile/MyOrdersPage';
import MyWishlistPage from '../components/userProfile/MyWishlistPage';
import ReviewsPage from '../components/userProfile/ReviewsPage';
import Header from '../components/homePage/Header';
import Footer from '../components/homePage/footer';

const UserProfilePage = () => {
  const [activePage, setActivePage] = useState('profile');
  const [userInfo, setUserInfo] = useState({
    firstName: 'James',
    lastName: 'Grey',
    email: 'james.grey@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main Street',
    city: 'New York',
    zipCode: '10001',
    country: 'United States',
    profilePhoto: null
  });

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      alert('Logged out successfully!');
      // Add your logout logic here
    }
  };

  const handleUpdateProfile = (updatedData) => {
    setUserInfo(updatedData);
  };

  const handleProfilePhotoUpdate = (photoUrl) => {
    setUserInfo({
      ...userInfo,
      profilePhoto: photoUrl
    });
  };

  const renderPage = () => {
    switch (activePage) {
      case 'profile':
        return <MyProfilePage userInfo={userInfo} onUpdateProfile={handleUpdateProfile} />;
      case 'orders':
        return <MyOrdersPage />;
      case 'wishlist':
        return <MyWishlistPage />;
      case 'reviews':
        return <ReviewsPage />;
      default:
        return <MyProfilePage userInfo={userInfo} onUpdateProfile={handleUpdateProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <div className="flex">
        {/* Navigation Sidebar - Fixed on the left */}
        <div className="w-80 flex-shrink-0">
          <div className="fixed h-screen overflow-y-auto">
            <NavigationSidebar
              activePage={activePage}
              setActivePage={setActivePage}
              onLogout={handleLogout}
              userInfo={userInfo}
              onProfilePhotoUpdate={handleProfilePhotoUpdate}
            />
          </div>
        </div>

        {/* Main Content Area - Takes remaining space */}
        <div className="flex-1 p-6">
          {renderPage()}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default UserProfilePage;