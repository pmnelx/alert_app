import React, { useState, useEffect } from 'react';
    import axios from 'axios';

    const generateRandomAlerts = () => {
      const projects = ['Project A', 'Project B', 'Project C'];
      return Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        message: `Alert ${i + 1}`,
        datetime: new Date().toISOString(),
        project: projects[i % projects.length],
        status: Math.random() > 0.5 ? 'Success' : 'Failure'
      }));
    };

    const App = () => {
      const [alerts, setAlerts] = useState(generateRandomAlerts());

      useEffect(() => {
        axios.get('/api/alerts').then(response => {
          setAlerts(response.data);
        });
      }, []);

      return (
        <div className="app">
          <h1>Alert Management</h1>
          <div className="alert-grid">
            {alerts.map(alert => (
              <div key={alert.id} className={`alert-card ${alert.status.toLowerCase()}`}>
                <p><strong>Message:</strong> {alert.message}</p>
                <p><strong>Datetime:</strong> {alert.datetime}</p>
                <p><strong>Project:</strong> {alert.project}</p>
                <p><strong>Status:</strong> {alert.status}</p>
              </div>
            ))}
          </div>
        </div>
      );
    };

    export default App;
