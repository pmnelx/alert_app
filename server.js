import express from 'express';
    import cors from 'cors';

    const app = express();
    app.use(cors());
    app.use(express.json());

    let alerts = generateRandomAlerts();

    function generateRandomAlerts() {
      const projects = ['Project A', 'Project B', 'Project C'];
      return Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        message: `Alert ${i + 1}`,
        datetime: new Date().toISOString(),
        project: projects[i % projects.length],
        status: Math.random() > 0.5 ? 'Success' : 'Failure'
      }));
    }

    app.get('/api/alerts', (req, res) => {
      res.json(alerts);
    });

    app.post('/api/alerts', (req, res) => {
      const newAlert = { ...req.body, id: alerts.length + 1 };
      if (alerts.length >= 200) {
        alerts.shift();
      }
      alerts.unshift(newAlert);
      res.status(201).json(newAlert);
    });

    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
