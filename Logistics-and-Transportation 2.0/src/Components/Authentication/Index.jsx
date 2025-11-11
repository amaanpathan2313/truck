 import React, { useState, useEffect } from 'react';

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Enhanced screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.nav-container')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen, isMobile]);

  // Enhanced responsive breakpoints
  const getResponsiveValue = (mobile, tablet, desktop) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  // Styles objects
  const styles = {
    // Global styles
    global: {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      lineHeight: 1.6,
      color: '#333',
      overflowX: 'hidden',
    },

    // Layout
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: getResponsiveValue('0 16px', '0 20px', '0 20px'),
    },

    // Navigation
    navbar: {
      position: 'fixed',
      top: 0,
      width: '100%',
      background: 'rgba(255, 255, 255, 0.97)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      padding: getResponsiveValue('0.75rem 0', '1rem 0', '1rem 0'),
      borderBottom: '1px solid #e5e7eb',
      WebkitBackdropFilter: 'blur(10px)', // Safari support
    },

    navContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: getResponsiveValue('0 16px', '0 20px', '0 20px'),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: 700,
      fontSize: getResponsiveValue('1.1rem', '1.25rem', '1.5rem'),
      zIndex: 1001,
    },

    logoIcon: {
      fontSize: getResponsiveValue('1.25rem', '1.5rem', '1.75rem'),
    },

    navMenu: {
      display: getResponsiveValue('none', 'flex', 'flex'),
      gap: getResponsiveValue('0', '1.5rem', '2rem'),
      alignItems: 'center',
      ...(isMobile && menuOpen && {
        display: 'flex',
        position: 'fixed',
        top: '100%',
        left: 0,
        width: '100%',
        height: 'calc(100vh - 100%)',
        background: 'white',
        flexDirection: 'column',
        padding: '2rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        borderTop: '1px solid #e5e7eb',
        justifyContent: 'flex-start',
        gap: '0',
        overflowY: 'auto',
      }),
    },

    navLink: {
      textDecoration: 'none',
      color: '#4b5563',
      fontWeight: 500,
      transition: 'color 0.3s',
      fontSize: getResponsiveValue('1.1rem', '1rem', '1rem'),
      padding: getResponsiveValue('1rem 0', '0.5rem 0', '0'),
      display: 'block',
      width: getResponsiveValue('100%', 'auto', 'auto'),
      textAlign: getResponsiveValue('center', 'left', 'left'),
      borderBottom: isMobile && menuOpen ? '1px solid #f3f4f6' : 'none',
      ':hover': {
        color: '#2563eb',
      },
    },

    navButtons: {
      display: getResponsiveValue('none', 'flex', 'flex'),
      gap: '1rem',
      alignItems: 'center',
      ...(isMobile && menuOpen && {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        padding: '2rem 0 0',
        marginTop: '1rem',
        borderTop: '1px solid #e5e7eb',
      }),
    },

    btnLogin: {
      padding: getResponsiveValue('1rem 2rem', '0.5rem 1rem', '0.5rem 1rem'),
      border: 'none',
      background: 'none',
      color: '#4b5563',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontSize: getResponsiveValue('1.1rem', '1rem', '1rem'),
      width: getResponsiveValue('100%', 'auto', 'auto'),
      borderRadius: getResponsiveValue('8px', '4px', '4px'),
      ':hover': {
        color: '#2563eb',
        background: getResponsiveValue('#f8fafc', 'transparent', 'transparent'),
      },
    },

    btnPrimary: {
      background: '#2563eb',
      color: 'white',
      border: 'none',
      padding: getResponsiveValue('1rem 2rem', '0.75rem 1.5rem', '0.75rem 1.5rem'),
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: getResponsiveValue('1.1rem', '1rem', '1rem'),
      width: getResponsiveValue('100%', 'auto', 'auto'),
      boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
    },

    hamburger: {
      display: getResponsiveValue('flex', 'none', 'none'),
      flexDirection: 'column',
      gap: '4px',
      cursor: 'pointer',
      padding: '0.5rem',
      background: 'none',
      border: 'none',
      zIndex: 1001,
    },

    hamburgerSpan: {
      width: '25px',
      height: '3px',
      background: '#333',
      transition: '0.3s',
      borderRadius: '2px',
      transformOrigin: 'center',
    },

    // Hero Section
    hero: {
      padding: getResponsiveValue('80px 0 40px', '100px 0 60px', '120px 0 80px'),
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      minHeight: getResponsiveValue('auto', '80vh', '100vh'),
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    },

    heroContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: getResponsiveValue('0 16px', '0 20px', '0 20px'),
      display: 'grid',
      gridTemplateColumns: getResponsiveValue('1fr', '1fr', '1fr 1fr'),
      gap: getResponsiveValue('2rem', '3rem', '4rem'),
      alignItems: 'center',
    },

    heroTitle: {
      fontSize: getResponsiveValue('2rem', '2.5rem', '3.5rem'),
      fontWeight: 800,
      lineHeight: 1.1,
      marginBottom: '1.5rem',
      textAlign: getResponsiveValue('center', 'left', 'left'),
    },

    highlight: {
      background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },

    heroSubtitle: {
      fontSize: getResponsiveValue('1rem', '1.125rem', '1.25rem'),
      marginBottom: '2rem',
      opacity: 0.9,
      lineHeight: 1.6,
      textAlign: getResponsiveValue('center', 'left', 'left'),
    },

    heroButtons: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '3rem',
      flexDirection: getResponsiveValue('column', 'row', 'row'),
      alignItems: 'center',
    },

    btnLarge: {
      padding: getResponsiveValue('1rem 2rem', '1rem 2rem', '1rem 2rem'),
      fontSize: getResponsiveValue('1.1rem', '1.1rem', '1.1rem'),
      width: getResponsiveValue('100%', 'auto', 'auto'),
      minWidth: getResponsiveValue('auto', '180px', '200px'),
    },

    btnSecondary: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      padding: getResponsiveValue('1rem 2rem', '1rem 2rem', '0.75rem 1.5rem'),
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      fontSize: getResponsiveValue('1.1rem', '1rem', '1rem'),
      width: getResponsiveValue('100%', 'auto', 'auto'),
      minWidth: getResponsiveValue('auto', '180px', '200px'),
    },

    heroStats: {
      display: 'grid',
      gridTemplateColumns: getResponsiveValue('repeat(2, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)'),
      gap: getResponsiveValue('1rem', '1.5rem', '2rem'),
    },

    statItem: {
      textAlign: 'center',
      padding: getResponsiveValue('0.5rem', '1rem', '1rem'),
    },

    statNumber: {
      fontSize: getResponsiveValue('1.5rem', '1.75rem', '2rem'),
      fontWeight: 800,
      marginBottom: '0.5rem',
    },

    statLabel: {
      fontSize: getResponsiveValue('0.75rem', '0.8rem', '0.9rem'),
      opacity: 0.8,
    },

    // Dashboard Preview
    dashboardPreview: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      overflow: 'hidden',
      transform: getResponsiveValue('scale(0.95)', 'scale(0.98)', 'scale(1)'),
      transformOrigin: 'center',
      margin: getResponsiveValue('0 auto', '0 auto', '0'),
      maxWidth: getResponsiveValue('95%', '90%', '100%'),
    },

    dashboardHeader: {
      background: '#f8fafc',
      padding: '1rem',
      borderBottom: '1px solid #e5e7eb',
    },

    windowControls: {
      display: 'flex',
      gap: '0.5rem',
    },

    windowControl: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: '#e5e7eb',
    },

    dashboardContent: {
      display: 'flex',
      height: getResponsiveValue('200px', '250px', '300px'),
      flexDirection: getResponsiveValue('column', 'row', 'row'),
    },

    sidebar: {
      width: getResponsiveValue('100%', '200px', '200px'),
      background: '#f8fafc',
      padding: '1rem',
      borderRight: getResponsiveValue('none', '1px solid #e5e7eb', '1px solid #e5e7eb'),
      borderBottom: getResponsiveValue('1px solid #e5e7eb', 'none', 'none'),
      display: getResponsiveValue('flex', 'block', 'block'),
      overflowX: getResponsiveValue('auto', 'visible', 'visible'),
      gap: getResponsiveValue('1rem', '0', '0'),
    },

    sidebarItem: {
      padding: '0.75rem 1rem',
      marginBottom: getResponsiveValue('0', '0.5rem', '0.5rem'),
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: '#4b5563',
      whiteSpace: 'nowrap',
      flexShrink: 0,
      fontSize: getResponsiveValue('0.9rem', '1rem', '1rem'),
    },

    sidebarItemActive: {
      background: '#2563eb',
      color: 'white',
    },

    mainContent: {
      flex: 1,
      padding: getResponsiveValue('1rem', '1.25rem', '1.5rem'),
      background: 'white',
      overflow: 'auto',
    },

    contentHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      flexDirection: getResponsiveValue('column', 'row', 'row'),
      gap: getResponsiveValue('1rem', '0', '0'),
    },

    contentHeaderH3: {
      color: '#1f2937',
      fontSize: getResponsiveValue('1rem', '1.125rem', '1.25rem'),
      textAlign: getResponsiveValue('center', 'left', 'left'),
      margin: 0,
    },

    btnSmall: {
      background: '#10b981',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      fontSize: getResponsiveValue('0.8rem', '0.875rem', '0.875rem'),
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontWeight: 500,
    },

    tripList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },

    tripItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: getResponsiveValue('0.75rem', '1rem', '1rem'),
      background: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      flexDirection: getResponsiveValue('column', 'row', 'row'),
      textAlign: getResponsiveValue('center', 'left', 'left'),
    },

    tripIcon: {
      fontSize: getResponsiveValue('1.25rem', '1.5rem', '1.5rem'),
    },

    tripInfo: {
      flex: 1,
    },

    tripRoute: {
      fontWeight: 600,
      color: '#1f2937',
      fontSize: getResponsiveValue('0.9rem', '1rem', '1.125rem'),
      marginBottom: getResponsiveValue('0.25rem', '0', '0'),
    },

    tripDriver: {
      fontSize: getResponsiveValue('0.75rem', '0.875rem', '0.875rem'),
      color: '#6b7280',
    },

    tripStatus: {
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: getResponsiveValue('0.7rem', '0.75rem', '0.75rem'),
      fontWeight: 600,
    },

    tripStatusOnTime: {
      background: '#d1fae5',
      color: '#065f46',
    },

    // Features Section
    features: {
      padding: getResponsiveValue('40px 0', '60px 0', '80px 0'),
      background: '#f8fafc',
    },

    sectionHeader: {
      textAlign: 'center',
      marginBottom: getResponsiveValue('2rem', '3rem', '4rem'),
    },

    sectionHeaderH2: {
      fontSize: getResponsiveValue('1.75rem', '2rem', '2.5rem'),
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '1rem',
      lineHeight: 1.2,
    },

    sectionHeaderP: {
      fontSize: getResponsiveValue('0.9rem', '1rem', '1.125rem'),
      color: '#6b7280',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: 1.6,
    },

    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: getResponsiveValue(
        '1fr',
        'repeat(2, 1fr)',
        'repeat(auto-fit, minmax(300px, 1fr))'
      ),
      gap: getResponsiveValue('1.5rem', '2rem', '3rem'),
    },

    featureCard: {
      background: 'white',
      padding: getResponsiveValue('1.25rem', '1.5rem', '2rem'),
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
    },

    featureImageContainer: {
      width: '100%',
      height: getResponsiveValue('150px', '200px', '250px'),
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: '1.5rem',
      background: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },

    featureImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
    },

    featureIcon: {
      fontSize: getResponsiveValue('2.5rem', '2.75rem', '3rem'),
      marginBottom: '1rem',
    },

    featureCardH3: {
      fontSize: getResponsiveValue('1.125rem', '1.25rem', '1.5rem'),
      fontWeight: 600,
      marginBottom: '1rem',
      color: '#1f2937',
    },

    featureCardP: {
      color: '#6b7280',
      marginBottom: '1.5rem',
      lineHeight: 1.6,
      fontSize: getResponsiveValue('0.875rem', '0.95rem', '1rem'),
    },

    featureLink: {
      color: '#2563eb',
      textDecoration: 'none',
      fontWeight: 600,
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      fontSize: getResponsiveValue('0.9rem', '1rem', '1.125rem'),
      marginTop: 'auto',
      padding: '0.5rem 0',
    },

    // CTA Section
    cta: {
      padding: getResponsiveValue('40px 0', '60px 0', '80px 0'),
      background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
      color: 'white',
      textAlign: 'center',
    },

    ctaContent: {
      maxWidth: '800px',
      margin: '0 auto',
    },

    ctaH2: {
      fontSize: getResponsiveValue('1.75rem', '2rem', '2.5rem'),
      fontWeight: 700,
      marginBottom: '1rem',
      lineHeight: 1.2,
    },

    ctaP: {
      fontSize: getResponsiveValue('0.9rem', '1rem', '1.125rem'),
      opacity: 0.9,
      marginBottom: '2rem',
      lineHeight: 1.6,
    },

    ctaButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexDirection: getResponsiveValue('column', 'row', 'row'),
    },

    // Footer
    footer: {
      background: '#111827',
      color: 'white',
      padding: getResponsiveValue('30px 0 20px', '50px 0 20px', '60px 0 20px'),
    },

    footerContent: {
      display: 'grid',
      gridTemplateColumns: getResponsiveValue(
        '1fr',
        'repeat(2, 1fr)',
        '2fr 1fr 1fr 1fr'
      ),
      gap: getResponsiveValue('2rem', '2rem', '3rem'),
      marginBottom: '3rem',
    },

    footerSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      textAlign: getResponsiveValue('center', 'left', 'left'),
    },

    footerH4: {
      color: '#f9fafb',
      marginBottom: '1rem',
      fontSize: getResponsiveValue('1rem', '1.125rem', '1.25rem'),
    },

    footerLink: {
      color: '#d1d5db',
      textDecoration: 'none',
      transition: 'color 0.3s',
      fontSize: getResponsiveValue('0.9rem', '0.95rem', '0.95rem'),
      ':hover': {
        color: '#60a5fa',
      },
    },

    footerBottom: {
      borderTop: '1px solid #374151',
      paddingTop: '2rem',
      textAlign: 'center',
      color: '#9ca3af',
      fontSize: getResponsiveValue('0.8rem', '0.875rem', '1rem'),
    },
  };

  // Hover effect functions
  const handleHover = (e, isHover) => {
    if (isHover) {
      e.target.style.background = '#1d4ed8';
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.3)';
    } else {
      e.target.style.background = '#2563eb';
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 2px 4px rgba(37, 99, 235, 0.2)';
    }
  };

  const handleSecondaryHover = (e, isHover) => {
    if (isHover) {
      e.target.style.background = 'rgba(255, 255, 255, 0.2)';
      e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
      e.target.style.transform = 'translateY(-2px)';
    } else {
      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
      e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
      e.target.style.transform = 'translateY(0)';
    }
  };

  const handleCardHover = (e, isHover) => {
    const image = e.currentTarget.querySelector('img');
    if (isHover) {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
      if (image) {
        image.style.transform = 'scale(1.05)';
      }
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
      if (image) {
        image.style.transform = 'scale(1)';
      }
    }
  };

  // Logistics images
  const featureImages = {
    tripManagement: 'https://images.unsplash.com/photo-1624898115402-eddff44b6491?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80',
    driverManagement: 'https://plus.unsplash.com/premium_photo-1661637707438-5914a8e1bea2?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80',
    fleetManagement: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80',
    analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80'
  };

  // Data arrays
  const features = [
    {
      icon: '🚛',
      title: 'Trip Management',
      description: 'Efficiently plan, track, and optimize all your transportation routes with real-time GPS tracking and automated scheduling.',
      image: featureImages.tripManagement
    },
    {
      icon: '👨‍💼',
      title: 'Driver Management',
      description: 'Manage driver schedules, documents, compliance, and performance metrics with our comprehensive driver portal.',
      image: featureImages.driverManagement
    },
    {
      icon: '🚚',
      title: 'Fleet Management',
      description: 'Track vehicle maintenance, fuel consumption, insurance, and all truck details in one centralized platform.',
      image: featureImages.fleetManagement
    },
    {
      icon: '📊',
      title: 'Analytics & Reports',
      description: 'Get detailed insights into your operations with customizable reports, performance analytics, and business intelligence.',
      image: featureImages.analytics
    }
  ];

  const stats = [
    { number: '99%', label: 'On-time Delivery' },
    { number: '15%', label: 'Fuel Savings' },
    { number: '24/7', label: 'Support' },
    { number: '50%', label: 'Paperwork Reduced' }
  ];

  return (
    <div style={styles.global}>
      {/* Navigation */}
      <nav style={styles.navbar} className="nav-container">
        <div style={styles.navContainer}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>🚛</span>
            <span>LogiTrack Pro</span>
          </div>

          <div style={styles.navMenu}>
            <a href="#features" style={styles.navLink} onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#solutions" style={styles.navLink} onClick={() => setMenuOpen(false)}>Solutions</a>
            <a href="#pricing" style={styles.navLink} onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="#contact" style={styles.navLink} onClick={() => setMenuOpen(false)}>Contact</a>
          </div>

          <div style={styles.navButtons}>
            <button
              onClick={() => { window.location.href = './Login'; }}
              style={styles.btnLogin}
            >
              Login
            </button>
            <button
              onClick={() => { window.location.href = './Registration'; }}
              style={styles.btnPrimary}
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              Get Started
            </button>
          </div>

          <button
            style={styles.hamburger}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            aria-label="Toggle menu"
          >
            <span style={{
              ...styles.hamburgerSpan,
              transform: menuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'
            }}></span>
            <span style={{
              ...styles.hamburgerSpan,
              opacity: menuOpen ? 0 : 1
            }}></span>
            <span style={{
              ...styles.hamburgerSpan,
              transform: menuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'
            }}></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          <div>
            <h1 style={styles.heroTitle}>
              Streamline Your <span style={styles.highlight}>Logistics Operations</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Manage trips, drivers, and trucks with our comprehensive logistics platform.
              Increase efficiency, reduce costs, and grow your transportation business.
            </p>
            <div style={styles.heroButtons}>
              <button
                onClick={() => { window.location.href = './Registration'; }}
                style={{ ...styles.btnPrimary, ...styles.btnLarge }}
                onMouseEnter={(e) => handleHover(e, true)}
                onMouseLeave={(e) => handleHover(e, false)}
              >
                Start Free Trial
              </button>
              <button
                style={{ ...styles.btnSecondary, ...styles.btnLarge }}
                onMouseEnter={(e) => handleSecondaryHover(e, true)}
                onMouseLeave={(e) => handleSecondaryHover(e, false)}
              >
                Watch Demo
              </button>
            </div>
            <div style={styles.heroStats}>
              {stats.map((stat, index) => (
                <div key={index} style={styles.statItem}>
                  <div style={styles.statNumber}>{stat.number}</div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={styles.dashboardPreview}>
              <div style={styles.dashboardHeader}>
                <div style={styles.windowControls}>
                  <span style={styles.windowControl}></span>
                  <span style={styles.windowControl}></span>
                  <span style={styles.windowControl}></span>
                </div>
              </div>
              <div style={styles.dashboardContent}>
                <div style={styles.sidebar}>
                  <div style={{ ...styles.sidebarItem, ...styles.sidebarItemActive }}>Dashboard</div>
                  <div style={styles.sidebarItem}>Trips</div>
                  <div style={styles.sidebarItem}>Drivers</div>
                  <div style={styles.sidebarItem}>Trucks</div>
                  <div style={styles.sidebarItem}>Analytics</div>
                </div>
                <div style={styles.mainContent}>
                  <div style={styles.contentHeader}>
                    <h3 style={styles.contentHeaderH3}>Active Trips</h3>
                    <button style={styles.btnSmall}>+ New Trip</button>
                  </div>
                  <div style={styles.tripList}>
                    {[1, 2, 3].map(item => (
                      <div key={item} style={styles.tripItem}>
                        <div style={styles.tripIcon}>🚛</div>
                        <div style={styles.tripInfo}>
                          <div style={styles.tripRoute}>NYC → CHI</div>
                          <div style={styles.tripDriver}>Driver: John Doe</div>
                        </div>
                        <div style={{ ...styles.tripStatus, ...styles.tripStatusOnTime }}>On Time</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={styles.features}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionHeaderH2}>Everything You Need to Manage Your Fleet</h2>
            <p style={styles.sectionHeaderP}>
              Powerful tools designed specifically for logistics and transportation companies
            </p>
          </div>
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={styles.featureCard}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <div style={styles.featureImageContainer}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    style={styles.featureImage}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureCardH3}>{feature.title}</h3>
                <p style={styles.featureCardP}>{feature.description}</p>
                <button style={styles.featureLink}>Learn More →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <div style={styles.container}>
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaH2}>Ready to Transform Your Logistics Operations?</h2>
            <p style={styles.ctaP}>Join thousands of transportation companies using our platform</p>
            <div style={styles.ctaButtons}>
              <button
                onClick={() => { window.location.href = './Registration'; }}
                style={{ ...styles.btnPrimary, ...styles.btnLarge }}
                onMouseEnter={(e) => handleHover(e, true)}
                onMouseLeave={(e) => handleHover(e, false)}
              >
                Start Free Trial
              </button>
              <button
                style={{ ...styles.btnSecondary, ...styles.btnLarge }}
                onMouseEnter={(e) => handleSecondaryHover(e, true)}
                onMouseLeave={(e) => handleSecondaryHover(e, false)}
              >
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerContent}>
            <div style={styles.footerSection}>
              <div style={{ ...styles.logo, justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <span style={styles.logoIcon}>🚛</span>
                <span>LogiTrack Pro</span>
              </div>
              <p>Empowering logistics companies with innovative technology solutions since 2024.</p>
            </div>
            <div style={styles.footerSection}>
              <h4 style={styles.footerH4}>Product</h4>
              <a href="#features" style={styles.footerLink}>Features</a>
              <a href="#pricing" style={styles.footerLink}>Pricing</a>
              <a href="#api" style={styles.footerLink}>API</a>
            </div>
            <div style={styles.footerSection}>
              <h4 style={styles.footerH4}>Company</h4>
              <a href="#about" style={styles.footerLink}>About</a>
              <a href="#careers" style={styles.footerLink}>Careers</a>
              <a href="#contact" style={styles.footerLink}>Contact</a>
            </div>
            <div style={styles.footerSection}>
              <h4 style={styles.footerH4}>Support</h4>
              <a href="#help" style={styles.footerLink}>Help Center</a>
              <a href="#docs" style={styles.footerLink}>Documentation</a>
              <a href="#status" style={styles.footerLink}>Status</a>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p>&copy; 2024 LogiTrack Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;