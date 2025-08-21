import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = 'mongodb+srv://hp482863:mhaRtr12UIVWCHEA@black.pqvcq0a.mongodb.net/vershash?retryWrites=true&w=majority&appName=black';

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Admin = mongoose.model('Admin', AdminSchema);

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    // Admin credentials
    const username = 'admin';
    const password = 'vershash2024'; // Vous pouvez changer ce mot de passe
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('⚠️  Un admin avec ce nom existe déjà');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const admin = new Admin({
      username,
      password: hashedPassword,
    });

    await admin.save();
    
    console.log('✅ Admin créé avec succès!');
    console.log('📧 Username:', username);
    console.log('🔑 Password:', password);
    console.log('\n🌐 Connectez-vous sur: http://localhost:3000/admin');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();