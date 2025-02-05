import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../shared-theme/AppTheme.jsx';
import AppAppBar from './components/AppAppBar.jsx';
import Hero from './components/Hero.jsx';
import LogoCollection from './components/LogoCollection.jsx';
import Highlights from './components/Highlights.jsx';
import Pricing from './components/Pricing.jsx';
import Features from './components/Features.jsx';
import Footer from './components/Footer.jsx';

export default function LandingPage(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Hero />
      <div>
        <LogoCollection />
        <Features />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
