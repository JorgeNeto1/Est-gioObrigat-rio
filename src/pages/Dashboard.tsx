import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import PatientDashboard from '../components/PatientDashboard';
import PsychologistDashboard from '../components/PsychologistDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return user.role === 'psychologist' ? <PsychologistDashboard /> : <PatientDashboard />;
};

export default Dashboard;