import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Sparkles, Scale, ArrowLeftRight } from 'lucide-react';
import { students, queryRagSystem } from '../data/students';
import { useIsMobile } from '../hooks/useIsMobile';

export const ComparisonView: React.FC = () => {
  const isMobile = useIsMobile();
  const [studentAId, setStudentAId] = useState(students[0]?.id || '');
  const [studentBId, setStudentBId] = useState(students[2]?.id || ''); // Elena Rostova by default
  const [comparisonSummary, setComparisonSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  const studentA = students.find(s => s.id === studentAId);
  const studentB = students.find(s => s.id === studentBId);

  useEffect(() => {
    if (studentA && studentB) {
      setLoadingSummary(true);
      const timer = setTimeout(() => {
        const prompt = `compare ${studentA.name} and ${studentB.name}`;
        const result = queryRagSystem(prompt);
        setComparisonSummary(result.answer);
        setLoadingSummary(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [studentAId, studentBId]);

  const chartData = [
    {
      metric: 'GPA (x100)',
      [studentA?.name || 'Student A']: (studentA?.gpa || 0) * 100,
      [studentB?.name || 'Student B']: (studentB?.gpa || 0) * 100,
    },
    {
      metric: 'Community Hours',
      [studentA?.name || 'Student A']: studentA?.communityHours || 0,
      [studentB?.name || 'Student B']: studentB?.communityHours || 0,
    }
  ];

  const parseMarkdownSummary = (text: string) => {
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h3 key={idx} style={{ color: 'var(--beige-primary)', margin: '14px 0 8px 0', fontSize: '1rem', fontWeight: 700 }}>{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
        return <div key={idx} style={{ marginLeft: '8px', marginBottom: '8px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{parseBoldText(line)}</div>;
      }
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return <li key={idx} style={{ marginLeft: '20px', marginBottom: '4px', color: 'var(--text-secondary)' }}>{parseBoldText(line.substring(2))}</li>;
      }
      return <p key={idx} style={{ marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>{parseBoldText(line)}</p>;
    });
  };

  const parseBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} style={{ color: 'var(--beige-primary)' }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px' }}>
      
      {/* Top Selector Panel */}
      <div className="compare-selectors-panel">
        <div className="compare-selector-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>STUDENT A:</span>
          <select
            value={studentAId}
            onChange={(e) => setStudentAId(e.target.value)}
            style={{
              background: '#ffffff',
              border: '1px solid rgba(200, 192, 175, 0.4)',
              borderRadius: '9999px',
              color: 'var(--text-primary)',
              padding: '8px 16px',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer',
              width: '200px'
            }}
          >
            {students.filter(s => s.id !== studentBId).map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.major})</option>
            ))}
          </select>
        </div>

        <div className="compare-arrow-icon">
          <ArrowLeftRight size={18} />
        </div>

        <div className="compare-selector-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>STUDENT B:</span>
          <select
            value={studentBId}
            onChange={(e) => setStudentBId(e.target.value)}
            style={{
              background: '#ffffff',
              border: '1px solid rgba(200, 192, 175, 0.4)',
              borderRadius: '9999px',
              color: 'var(--text-primary)',
              padding: '8px 16px',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer',
              width: '200px'
            }}
          >
            {students.filter(s => s.id !== studentAId).map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.major})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Cards */}
      <div className="compare-cards-grid">
        {/* Student A Details */}
        {studentA && (
          <div className="glass-panel-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '18px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, var(--bg-cream-darker), var(--beige-bright))', 
                border: '2px solid #ffffff',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--text-primary)',
                fontWeight: 'bold',
                boxShadow: '0 2px 8px rgba(140, 125, 99, 0.1)'
              }}>
                {studentA.avatar}
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{studentA.name}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{studentA.major} • {studentA.year}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '18px', background: 'rgba(200, 192, 175, 0.15)', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(200, 192, 175, 0.25)' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>GPA</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{studentA.gpa.toFixed(2)}</span>
              </div>
              <div style={{ borderLeft: '1px solid rgba(200, 192, 175, 0.3)' }}></div>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>COMMUNITY HOURS</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{studentA.communityHours} Hrs</span>
              </div>
              <div style={{ borderLeft: '1px solid rgba(200, 192, 175, 0.3)' }}></div>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>IMPACT</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--beige-primary)' }}>{studentA.communityImpact}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
              <div>
                <strong style={{ color: 'var(--beige-primary)' }}>Core Skills:</strong> {studentA.skills.join(', ')}
              </div>
              <div style={{ borderBottom: '1px solid rgba(200, 192, 175, 0.2)', margin: '6px 0' }}></div>
              <div>
                <strong style={{ color: 'var(--beige-primary)' }}>Key Achievements:</strong>
                <ul style={{ paddingLeft: '15px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {studentA.academicAchievements.slice(0, 2).map((a, i) => <li key={i} style={{ color: 'var(--text-secondary)' }}>{a}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Student B Details */}
        {studentB && (
          <div className="glass-panel-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '18px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, var(--bg-cream-darker), var(--beige-bright))', 
                border: '2px solid #ffffff',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--text-primary)',
                fontWeight: 'bold',
                boxShadow: '0 2px 8px rgba(140, 125, 99, 0.1)'
              }}>
                {studentB.avatar}
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{studentB.name}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{studentB.major} • {studentB.year}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '18px', background: 'rgba(200, 192, 175, 0.15)', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(200, 192, 175, 0.25)' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>GPA</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{studentB.gpa.toFixed(2)}</span>
              </div>
              <div style={{ borderLeft: '1px solid rgba(200, 192, 175, 0.3)' }}></div>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>COMMUNITY HOURS</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{studentB.communityHours} Hrs</span>
              </div>
              <div style={{ borderLeft: '1px solid rgba(200, 192, 175, 0.3)' }}></div>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>IMPACT</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--beige-primary)' }}>{studentB.communityImpact}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
              <div>
                <strong style={{ color: 'var(--beige-primary)' }}>Core Skills:</strong> {studentB.skills.join(', ')}
              </div>
              <div style={{ borderBottom: '1px solid rgba(200, 192, 175, 0.2)', margin: '6px 0' }}></div>
              <div>
                <strong style={{ color: 'var(--beige-primary)' }}>Key Achievements:</strong>
                <ul style={{ paddingLeft: '15px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {studentB.academicAchievements.slice(0, 2).map((a, i) => <li key={i} style={{ color: 'var(--text-secondary)' }}>{a}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chart comparison & RAG Analysis */}
      <div className="compare-analysis-grid">
        {/* Recharts Graphical Chart */}
        <div 
          className="glass-panel" 
          style={{ 
            padding: '24px', 
            background: 'rgba(255, 255, 255, 0.4)',
            border: '1px solid rgba(200, 192, 175, 0.35)',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '350px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
            <Scale size={16} style={{ color: 'var(--beige-primary)' }} />
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Performance Metrics
            </h4>
          </div>
          
          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: isMobile ? 15 : 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(200, 192, 175, 0.25)" />
                <XAxis dataKey="metric" stroke="var(--text-muted)" fontSize={isMobile ? 9 : 11} height={isMobile ? 35 : 30} />
                <YAxis stroke="var(--text-muted)" fontSize={11} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#ffffff', 
                    border: '1px solid rgba(200, 192, 175, 0.5)',
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    fontSize: '11px',
                    boxShadow: '0 4px 12px rgba(140, 125, 99, 0.05)'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey={studentA?.name || 'Student A'} fill="url(#colorA)" radius={[4, 4, 0, 0]} />
                <Bar dataKey={studentB?.name || 'Student B'} fill="url(#colorB)" radius={[4, 4, 0, 0]} />
                
                {/* Gradient variables in chart matching custom beige colors */}
                <defs>
                  <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--beige-primary)" stopOpacity={0.95}/>
                    <stop offset="95%" stopColor="var(--beige-bright)" stopOpacity={0.5}/>
                  </linearGradient>
                  <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#bfb6a4" stopOpacity={0.95}/>
                    <stop offset="95%" stopColor="#e6e2da" stopOpacity={0.5}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RAG Synthesized Analysis */}
        <div 
          className="glass-panel" 
          style={{ 
            padding: '24px', 
            background: 'rgba(255, 255, 255, 0.4)',
            border: '1px solid rgba(200, 192, 175, 0.35)',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            height: '350px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
            <Sparkles size={16} style={{ color: 'var(--beige-primary)' }} />
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              RAG Comparison Synthesis
            </h4>
          </div>

          <div 
            style={{ 
              flex: 1, 
              overflowY: 'auto', 
              background: 'rgba(255, 255, 255, 0.65)', 
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid rgba(200, 192, 175, 0.25)'
            }}
          >
            {loadingSummary ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '10px' }}>
                <div style={{ width: '20px', height: '20px', border: '2px solid rgba(200,192,175,0.2)', borderTopColor: 'var(--beige-primary)', borderRadius: '50%', animation: 'fadeIn 1s infinite linear' }}></div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Retrieving comparative weights...</span>
              </div>
            ) : (
              <div>
                {parseMarkdownSummary(comparisonSummary)}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
export default ComparisonView;
