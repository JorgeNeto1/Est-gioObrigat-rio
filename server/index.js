import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the server directory
dotenv.config({ path: join(__dirname, '.env') });

const app = express();

// Force port to 3001 if not properly set
const PORT = parseInt(process.env.PORT) || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/psiagenda';

console.log('🔧 Configuration loaded:');
console.log(`   - Port: ${PORT}`);
console.log(`   - MongoDB URI: ${MONGO_URI}`);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Appointment Schema
const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    patientEmail: {
      type: String,
      required: true,
    },
    patientPhone: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Primeira Consulta', 'Sessão Regular', 'Terapia de Casal', 'Retorno'],
      required: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'confirmed', 'cancelled', 'completed'],
      default: 'scheduled',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['patient', 'psychologist'],
      default: 'patient',
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Models
const Appointment = mongoose.model('Appointment', appointmentSchema);
const User = mongoose.model('User', userSchema);

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'PsiAgenda API is running',
    timestamp: new Date().toISOString(),
    port: PORT,
  });
});

// Appointment Routes

// GET all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const { patientId, status, date } = req.query;

    const filter = {};
    if (patientId) filter.patientId = patientId;
    if (status) filter.status = status;
    if (date) filter.date = date;

    const appointments = await Appointment.find(filter).sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET appointment by ID
app.get('/api/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new appointment
app.post('/api/appointments', async (req, res) => {
  try {
    const {
      patientId,
      patientName,
      patientEmail,
      patientPhone,
      date,
      time,
      type,
      notes,
    } = req.body;

    // Check if slot is already taken
    const existingAppointment = await Appointment.findOne({
      date,
      time,
      status: { $ne: 'cancelled' },
    });

    if (existingAppointment) {
      return res.status(400).json({ error: 'Time slot is already booked' });
    }

    const appointment = new Appointment({
      patientId,
      patientName,
      patientEmail,
      patientPhone,
      date,
      time,
      type,
      notes,
    });

    const savedAppointment = await appointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH update appointment
app.patch('/api/appointments/:id', async (req, res) => {
  try {
    const { date, time } = req.body;

    // If updating date/time, check availability
    if (date && time) {
      const existingAppointment = await Appointment.findOne({
        _id: { $ne: req.params.id },
        date,
        time,
        status: { $ne: 'cancelled' },
      });

      if (existingAppointment) {
        return res.status(400).json({ error: 'Time slot is already booked' });
      }
    }

    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE appointment
app.delete('/api/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Routes

// GET all users
app.get('/api/users', async (req, res) => {
  try {
    const { role } = req.query;
    const filter = {};
    if (role) filter.role = role;

    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new user
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, phone, role, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const user = new User({
      name,
      email,
      phone,
      role,
      password, // Em produção, fazer hash dessa senha
    });

    const savedUser = await user.save();

    // Remove password from response
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH update user
app.patch('/api/users/:id', async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    // If updating email, check if it's already taken
    if (updateData.email) {
      const existingUser = await User.findOne({
        email: updateData.email,
        _id: { $ne: req.params.id },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Email is already taken' });
      }
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 👉 AUTH ROUTE (LOGIN)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Aqui ainda é senha em texto puro (para faculdade). Em produção, usar hash.
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json(userResponse);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Available time slots endpoint
app.get('/api/appointments/available-slots/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const timeSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

    // Get booked appointments for the date
    const bookedAppointments = await Appointment.find({
      date,
      status: { $ne: 'cancelled' },
    });

    const bookedTimes = bookedAppointments.map((apt) => apt.time);

    const availableSlots = timeSlots.map((time) => ({
      time,
      available: !bookedTimes.includes(time),
    }));

    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Function to find an available port
const findAvailablePort = async (startPort) => {
  const net = await import('net');

  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // Try next port
        findAvailablePort(startPort + 1).then(resolve).catch(reject);
      } else {
        reject(err);
      }
    });
  });
};

// Start server with intelligent port selection
const startServer = async () => {
  try {
    await connectDB();

    let serverPort = PORT;

    try {
      // Try to use the configured port first
      await new Promise((resolve, reject) => {
        const server = app.listen(serverPort, () => {
          console.log(`🚀 Server running on port ${serverPort}`);
          console.log(`📱 API Health Check: http://localhost:${serverPort}/api/health`);
          console.log(
            `📋 Appointments API: http://localhost:${serverPort}/api/appointments`,
          );
          console.log(`👥 Users API: http://localhost:${serverPort}/api/users`);
          console.log(`🔐 Auth API: http://localhost:${serverPort}/api/auth/login`);
          resolve(server);
        });

        server.on('error', (err) => {
          if (err.code === 'EADDRINUSE') {
            reject(new Error(`Port ${serverPort} is busy`));
          } else {
            reject(err);
          }
        });
      });
    } catch (error) {
      if (error.message.includes('is busy')) {
        console.log(`⚠️  Port ${serverPort} is busy, finding available port...`);

        // Find an available port
        serverPort = await findAvailablePort(serverPort + 1);

        app.listen(serverPort, () => {
          console.log(`🚀 Server running on port ${serverPort}`);
          console.log(
            `⚠️  Note: Using port ${serverPort} instead of ${PORT} (original port was busy)`,
          );
          console.log(`📱 API Health Check: http://localhost:${serverPort}/api/health`);
          console.log(
            `📋 Appointments API: http://localhost:${serverPort}/api/appointments`,
          );
          console.log(`👥 Users API: http://localhost:${serverPort}/api/users`);
          console.log(`🔐 Auth API: http://localhost:${serverPort}/api/auth/login`);
        });
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);

    if (error.message.includes('EADDRINUSE')) {
      console.log('💡 Troubleshooting tips:');
      console.log('   1. Stop other services running on this port');
      console.log('   2. Change the PORT in server/.env file');
      console.log(
        '   3. Kill processes: netstat -ano | findstr :5000 (Windows) or lsof -ti:5000 | xargs kill (Mac/Linux)',
      );
    }

    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully');
  process.exit(0);
});

startServer().catch(console.error);
