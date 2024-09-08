import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/Layout';
import { Home } from '@/pages/Home';
import { Analytics } from '@/pages/Analytics';
import { Settings } from '@/pages/Settings';
import { Help } from '@/pages/Help';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
      </Route>
    </Routes>
  );
};
