import React, { useState } from 'react';
import './index.css';

const courses = [
  { id: 1, title: 'Ingliz Tili', level: 'Beginner - Advanced', duration: '6 Oy', price: '400,000 UZS / oy', icon: '🌍' },
  { id: 2, title: 'IELTS Preparation', level: 'Intermediate+', duration: '3 Oy', price: '600,000 UZS / oy', icon: '🎓' },
  { id: 3, title: 'Matematika', level: 'Barcha sinflar', duration: '9 Oy', price: '350,000 UZS / oy', icon: '📐' },
  { id: 4, title: 'Dasturlash (Web)', level: 'Noldan Pro gacha', duration: '8 Oy', price: '800,000 UZS / oy', icon: '💻' }
];

const teachers = [
  { id: 1, name: 'Sardor Qodirov', subject: 'IELTS / Ingliz Tili', experience: '5 Yil', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256' },
  { id: 2, name: 'Malika Karimova', subject: 'Matematika', experience: '7 Yil', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256' },
  { id: 3, name: 'Aziz Rahimov', subject: 'Dasturlash', experience: '4 Yil', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256' }
];

export default function App() {
  const [form, setForm] = useState({ name: '', phone: '', course: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setForm({ name: '', phone: '', course: '' });
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar glass">
        <div className="logo">Edu<span>Pro</span></div>
        <ul className="nav-links">
          <li><a href="#home">Asosiy</a></li>
          <li><a href="#courses">Kurslar</a></li>
          <li><a href="#teachers">Ustozlar</a></li>
          <li><a href="#contact" className="btn-primary">Ro'yxatdan O'tish</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Kelajagingizni biz bilan <span>quring!</span></h1>
          <p>Zamonaviy metodika, professional ustozlar va shinam xonalar. O'z sohangizning yetuk mutaxassisi bo'ling.</p>
          <div className="hero-buttons">
            <a href="#contact" className="btn-primary glow">Bepul Darsga Yozilish</a>
            <a href="#courses" className="btn-secondary">Kurslarni Ko'rish</a>
          </div>
        </div>
        <div className="hero-image-wrapper">
            <div className="blob"></div>
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" alt="Students learning" className="hero-img" />
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat-card">
          <h3>500+</h3>
          <p>Muvaffaqiyatli bitiruvchilar</p>
        </div>
        <div className="stat-card">
          <h3>15+</h3>
          <p>Professional ustozlar</p>
        </div>
        <div className="stat-card">
          <h3>10+</h3>
          <p>Turli xil kurslar</p>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="section">
        <h2 className="section-title">Bizning <span>Kurslar</span></h2>
        <div className="grid courses-grid">
          {courses.map(course => (
            <div key={course.id} className="card course-card">
              <div className="course-icon">{course.icon}</div>
              <h3>{course.title}</h3>
              <p className="level">{course.level}</p>
              <div className="course-details">
                <span>⏱ {course.duration}</span>
                <span className="price">{course.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Teachers Section */}
      <section id="teachers" className="section bg-darker">
        <h2 className="section-title">Bizning <span>Ustozlar</span></h2>
        <div className="grid teachers-grid">
          {teachers.map(teacher => (
            <div key={teacher.id} className="card teacher-card">
              <img src={teacher.img} alt={teacher.name} className="teacher-img" />
              <div className="teacher-info">
                <h3>{teacher.name}</h3>
                <p className="subject">{teacher.subject}</p>
                <p className="experience">Tajriba: {teacher.experience}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section registration-section">
        <div className="contact-container glass">
          <div className="contact-info">
            <h2>Kursga yozilish</h2>
            <p>Ma'lumotlaringizni qoldiring, biz sizga tez orada aloqaga chiqamiz va barcha savollaringizga javob beramiz.</p>
            <div className="contact-details">
              <p>📍 Manzil: Toshkent sh., Chilonzor tumani</p>
              <p>📞 Tel: +998 90 123 45 67</p>
              <p>✉️ Email: info@edupro.uz</p>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Ism va Familiya</label>
              <input type="text" placeholder="Masalan: Alisher Valiyev" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Telefon raqam</label>
              <input type="tel" placeholder="+998 90 123 45 67" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Yo'nalishni tanlang</label>
              <select required value={form.course} onChange={e => setForm({...form, course: e.target.value})}>
                <option value="">-- Kursni tanlang --</option>
                <option value="ingliz">Ingliz tili</option>
                <option value="ielts">IELTS</option>
                <option value="matematika">Matematika</option>
                <option value="dasturlash">Dasturlash</option>
              </select>
            </div>
            <button type="submit" className="btn-primary w-full">Yuborish</button>
          </form>
        </div>
      </section>

      {/* Success Modal */}
      <div className={`success-modal ${showSuccess ? 'active' : ''}`}>
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h3>Ajoyib!</h3>
          <p>Arizangiz qabul qilindi. Tez orada siz bilan bog'lanamiz!</p>
          <button className="btn-primary mt-3" onClick={() => setShowSuccess(false)}>Yopish</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 EduPro O'quv Markazi. Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  );
}
