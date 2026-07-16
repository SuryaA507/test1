import React, { useState } from 'react';
import { Search, ArrowUpDown, GraduationCap, Clock, Award, FolderGit, Check } from 'lucide-react';
import { students } from '../data/students';
import type { Student } from '../data/students';

interface StudentDirectoryProps {
  onSelectStudent: (student: Student) => void;
  selectedStudent: Student | null;
  onCloseModal: () => void;
}

export const StudentDirectory: React.FC<StudentDirectoryProps> = ({ 
  onSelectStudent, 
  selectedStudent, 
  onCloseModal 
}) => {
  const [search, setSearch] = useState('');
  const [majorFilter, setMajorFilter] = useState('All');
  const [impactFilter, setImpactFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'gpa' | 'hours'>('name');

  // Filter & Sort Logic
  const filteredStudents = students
    .filter(s => {
      const matchesSearch = 
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.major.toLowerCase().includes(search.toLowerCase()) ||
        s.skills.some(sk => sk.toLowerCase().includes(search.toLowerCase())) ||
        s.id.toLowerCase().includes(search.toLowerCase());
      
      const matchesMajor = majorFilter === 'All' || s.major === majorFilter;
      const matchesImpact = impactFilter === 'All' || s.communityImpact === impactFilter;
      
      return matchesSearch && matchesMajor && matchesImpact;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'gpa') return b.gpa - a.gpa;
      if (sortBy === 'hours') return b.communityHours - a.communityHours;
      return 0;
    });

  const majors = ['All', ...Array.from(new Set(students.map(s => s.major)))];
  const impacts = ['All', 'High', 'Medium', 'Low'];

  return (
    <div style={{ marginTop: '10px', minHeight: 'calc(100vh - 180px)', position: 'relative' }}>
      
      {/* Search and Filters Bar (Cream Frosted Panel) */}
      <div className="directory-filters-panel">
        {/* Capsule Search Bar */}
        <div className="directory-search-container">
          <Search size={16} style={{ color: 'var(--beige-primary)' }} />
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student nodes..."
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              width: '100%'
            }}
          />
        </div>

        {/* Filters */}
        <div className="directory-filters-group">
          
          {/* Major Filter */}
          <div className="directory-filter-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>MAJOR:</span>
            <select
              value={majorFilter}
              onChange={(e) => setMajorFilter(e.target.value)}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(200, 192, 175, 0.4)',
                borderRadius: '9999px',
                color: 'var(--text-primary)',
                padding: '6px 14px',
                fontSize: '0.8rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {majors.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Community Impact Filter */}
          <div className="directory-filter-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>IMPACT:</span>
            <select
              value={impactFilter}
              onChange={(e) => setImpactFilter(e.target.value)}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(200, 192, 175, 0.4)',
                borderRadius: '9999px',
                color: 'var(--text-primary)',
                padding: '6px 14px',
                fontSize: '0.8rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {impacts.map(i => <option key={i} value={i}>{i} Impact</option>)}
            </select>
          </div>

          {/* Sorting */}
          <div className="directory-filter-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>
              <ArrowUpDown size={12} /> SORT:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(200, 192, 175, 0.4)',
                borderRadius: '9999px',
                color: 'var(--text-primary)',
                padding: '6px 14px',
                fontSize: '0.8rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="name">Name</option>
              <option value="gpa">Highest GPA</option>
              <option value="hours">Community Hours</option>
            </select>
          </div>

        </div>
      </div>

      {/* Grid of Student Cards */}
      <div className="student-grid">
        {filteredStudents.map(student => (
          <div 
            key={student.id}
            className="glass-panel-card"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div>
              {/* Profile Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '18px' }}>
                <div 
                  style={{ 
                    width: '45px', 
                    height: '45px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, var(--bg-cream-darker), var(--beige-bright))',
                    border: '2px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 4px 12px rgba(140, 125, 99, 0.1)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.95rem'
                  }}
                >
                  {student.avatar}
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    {student.name}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {student.major} • {student.year}
                  </span>
                </div>
              </div>

              {/* Stats Badges */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
                <div 
                  style={{
                    background: 'var(--beige-light)',
                    border: '1px solid rgba(200, 192, 175, 0.25)',
                    borderRadius: '9999px',
                    padding: '4px 12px',
                    fontSize: '0.75rem',
                    color: 'var(--beige-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontWeight: 600
                  }}
                >
                  <GraduationCap size={12} />
                  {student.gpa.toFixed(2)} GPA
                </div>
                <div 
                  style={{
                    background: 'var(--beige-light)',
                    border: '1px solid rgba(200, 192, 175, 0.25)',
                    borderRadius: '9999px',
                    padding: '4px 12px',
                    fontSize: '0.75rem',
                    color: 'var(--beige-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontWeight: 600
                  }}
                >
                  <Clock size={12} />
                  {student.communityHours} Hrs
                </div>
              </div>

              {/* Skills Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                {student.skills.slice(0, 3).map(skill => (
                  <span 
                    key={skill}
                    style={{
                      background: 'rgba(200, 192, 175, 0.15)',
                      border: '1px solid rgba(200, 192, 175, 0.2)',
                      borderRadius: '6px',
                      padding: '2px 8px',
                      fontSize: '0.65rem',
                      color: 'var(--text-secondary)',
                      fontWeight: 600
                    }}
                  >
                    {skill}
                  </span>
                ))}
                {student.skills.length > 3 && (
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', alignSelf: 'center', marginLeft: '2px' }}>
                    +{student.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Row */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(200, 192, 175, 0.2)',
                paddingTop: '14px',
                marginTop: '10px'
              }}
            >
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic', fontWeight: 500 }}>
                {student.category}
              </span>
              <button
                onClick={() => onSelectStudent(student)}
                className="capsule-button-primary"
              >
                Inspect
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Profile Inspector */}
      {selectedStudent && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(40, 38, 35, 0.4)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(12px)',
            padding: '20px'
          }}
          onClick={onCloseModal}
        >
          <div 
            className="glass-panel modal-content-panel"
            style={{
              width: '100%',
              maxWidth: '650px',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(200, 192, 175, 0.5)',
              boxShadow: '0 24px 64px rgba(140, 125, 99, 0.18)',
              borderRadius: '28px',
              overflow: 'hidden',
              animation: 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Titlebar */}
            <div 
              style={{
                background: 'rgba(255, 255, 255, 0.5)',
                borderBottom: '1px solid rgba(200, 192, 175, 0.25)',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={onCloseModal} 
                  style={{ 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '50%', 
                    backgroundColor: 'var(--mac-red)', 
                    border: 'none', 
                    cursor: 'pointer' 
                  }}
                  title="Close"
                ></button>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--mac-yellow)', opacity: 0.5 }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--mac-green)', opacity: 0.5 }}></div>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--beige-primary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Student node: {selectedStudent.id}
              </span>
              <div style={{ width: '40px' }}></div>
            </div>

            {/* Profile Content */}
            <div className="modal-body" style={{ padding: '30px', maxHeight: '70vh', overflowY: 'auto' }}>
              
              {/* Header Profile */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                <div 
                  style={{ 
                    width: '65px', 
                    height: '65px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, var(--bg-cream-darker), var(--beige-bright))',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '1.4rem',
                    boxShadow: '0 4px 15px rgba(140, 125, 99, 0.15)',
                    border: '2px solid #ffffff'
                  }}
                >
                  {selectedStudent.avatar}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {selectedStudent.name}
                  </h2>
                  <div style={{ fontSize: '0.85rem', color: 'var(--beige-primary)', fontWeight: 600 }}>
                    {selectedStudent.major} • {selectedStudent.year}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Classification: <span style={{ color: 'var(--beige-primary)', fontWeight: 600 }}>{selectedStudent.category}</span>
                  </div>
                </div>
              </div>

              {/* Highlights Panels Grid */}
              <div className="modal-highlights-grid">
                <div style={{ background: 'rgba(200, 192, 175, 0.08)', border: '1px solid rgba(200, 192, 175, 0.25)', borderRadius: '16px', padding: '16px 20px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '8px' }}>
                    ACADEMIC PERFORMANCE
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>{selectedStudent.gpa.toFixed(2)}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ 4.00 GPA</span>
                  </div>
                </div>

                <div style={{ background: 'rgba(200, 192, 175, 0.08)', border: '1px solid rgba(200, 192, 175, 0.25)', borderRadius: '16px', padding: '16px 20px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '8px' }}>
                    COMMUNITY SERVICE
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>{selectedStudent.communityHours}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hours logged</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--beige-primary)', fontWeight: 600, marginTop: '4px' }}>
                    Impact Rating: {selectedStudent.communityImpact}
                  </div>
                </div>
              </div>

              {/* Bio Background */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--beige-primary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px', fontWeight: 700 }}>
                  RAG Database Bio Summary
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', background: 'rgba(200, 192, 175, 0.1)', padding: '14px 18px', borderRadius: '12px', borderLeft: '3px solid var(--beige-primary)', border: '1px solid rgba(200,192,175,0.2)' }}>
                  {selectedStudent.background}
                </p>
              </div>

              {/* Community Leadership */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--beige-primary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px', fontWeight: 700 }}>
                  Community Leadership Role
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <Award size={16} style={{ color: 'var(--beige-primary)' }} />
                  {selectedStudent.communityLeadership}
                </div>
              </div>

              {/* Academic Achievements */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--beige-primary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px', fontWeight: 700 }}>
                  Key Achievements & Credentials
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedStudent.academicAchievements.map((ach, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'start', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <Check size={14} style={{ color: 'var(--beige-primary)', marginTop: '3px', flexShrink: 0 }} />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--beige-primary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px', fontWeight: 700 }}>
                  Core Project Portfolios
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedStudent.projects.map((proj, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'start', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <FolderGit size={14} style={{ color: 'var(--beige-primary)', marginTop: '3px', flexShrink: 0 }} />
                      <span>{proj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Footer */}
              <div>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--beige-primary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px', fontWeight: 700 }}>
                  Indexed Skills Inventory
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedStudent.skills.map(skill => (
                    <span 
                      key={skill}
                      style={{
                        background: 'var(--beige-light)',
                        border: '1px solid rgba(200, 192, 175, 0.35)',
                        borderRadius: '6px',
                        padding: '4px 12px',
                        fontSize: '0.75rem',
                        color: 'var(--beige-primary)',
                        fontWeight: 600
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div 
              style={{
                background: 'rgba(255, 255, 255, 0.5)',
                borderTop: '1px solid rgba(200, 192, 175, 0.25)',
                padding: '16px 30px',
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <button
                onClick={onCloseModal}
                className="capsule-button-primary"
                style={{ padding: '8px 24px' }}
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default StudentDirectory;
