import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Sliders, HelpCircle, Trophy, Sparkles } from 'lucide-react';
import { students } from '../data/students';
import { useIsMobile } from '../hooks/useIsMobile';

export const AnalyticsView: React.FC = () => {
  const isMobile = useIsMobile();
  const [gpaWeight, setGpaWeight] = useState(50); // 0 - 100
  const [communityWeight, setCommunityWeight] = useState(30); // 0 - 100
  const [skillsWeight, setSkillsWeight] = useState(10); // 0 - 100
  const [projectsWeight, setProjectsWeight] = useState(10); // 0 - 100

  const scoredStudents = useMemo(() => {
    return students
      .map(student => {
        const normalizedGpa = (student.gpa / 4.0) * 100;
        const normalizedCommunity = Math.min((student.communityHours / 210) * 100, 100);
        const normalizedSkills = Math.min((student.skills.length / 5) * 100, 100);
        const normalizedProjects = Math.min((student.projects.length / 2) * 100, 100);

        const totalWeight = gpaWeight + communityWeight + skillsWeight + projectsWeight || 1;
        const weightedScore = Math.round(
          (normalizedGpa * gpaWeight +
            normalizedCommunity * communityWeight +
            normalizedSkills * skillsWeight +
            normalizedProjects * projectsWeight) / totalWeight
        );

        let classification = 'General Pool';
        let classificationColor = 'var(--text-muted)';
        if (weightedScore >= 80) {
          classification = 'Elite Scholar-Leader';
          classificationColor = 'var(--beige-primary)';
        } else if (weightedScore >= 65) {
          classification = 'High Profile Specialist';
          classificationColor = 'var(--beige-bright)';
        } else if (weightedScore >= 45) {
          classification = 'Core Contributor';
          classificationColor = '#706450';
        }

        return {
          ...student,
          score: weightedScore,
          classification,
          classificationColor
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [gpaWeight, communityWeight, skillsWeight, projectsWeight]);

  return (
    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px' }}>
      
      {/* Control panel and visual ranking stand side by side */}
      <div className="analytics-dashboard-grid">
        {/* Sliders Panel */}
        <div 
          className="glass-panel"
          style={{
            padding: '24px',
            background: 'rgba(255, 255, 255, 0.45)',
            border: '1px solid rgba(200, 192, 175, 0.35)',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={18} style={{ color: 'var(--beige-primary)' }} />
            <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Classifying Factor Weights
            </h3>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Adjust the sliders below to calibrate sorting weights. The classification rankings update dynamically.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* GPA Weight Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Academic (GPA)</span>
                <span style={{ color: 'var(--beige-primary)', fontWeight: 'bold' }}>{gpaWeight}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={gpaWeight} 
                onChange={(e) => setGpaWeight(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--beige-primary)',
                  cursor: 'pointer',
                  height: '4px',
                  background: 'rgba(200,192,175,0.25)',
                  borderRadius: '2px'
                }}
              />
            </div>

            {/* Community Weight Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Community Outreach</span>
                <span style={{ color: 'var(--beige-primary)', fontWeight: 'bold' }}>{communityWeight}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={communityWeight} 
                onChange={(e) => setCommunityWeight(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--beige-primary)',
                  cursor: 'pointer',
                  height: '4px',
                  background: 'rgba(200,192,175,0.25)',
                  borderRadius: '2px'
                }}
              />
            </div>

            {/* Skills Weight Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Skills Inventory</span>
                <span style={{ color: 'var(--beige-primary)', fontWeight: 'bold' }}>{skillsWeight}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={skillsWeight} 
                onChange={(e) => setSkillsWeight(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--beige-primary)',
                  cursor: 'pointer',
                  height: '4px',
                  background: 'rgba(200,192,175,0.25)',
                  borderRadius: '2px'
                }}
              />
            </div>

            {/* Projects Weight Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Project Portfolio</span>
                <span style={{ color: 'var(--beige-primary)', fontWeight: 'bold' }}>{projectsWeight}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={projectsWeight} 
                onChange={(e) => setProjectsWeight(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--beige-primary)',
                  cursor: 'pointer',
                  height: '4px',
                  background: 'rgba(200,192,175,0.25)',
                  borderRadius: '2px'
                }}
              />
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(200,192,175,0.2)', paddingTop: '15px', fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', gap: '6px' }}>
            <HelpCircle size={14} style={{ flexShrink: 0 }} />
            <span>Scores are dynamically calculated using mathematical scaling variables.</span>
          </div>
        </div>

        {/* Live Score Standings (Visual Chart) */}
        <div 
          className="glass-panel"
          style={{
            padding: '24px',
            background: 'rgba(255, 255, 255, 0.4)',
            border: '1px solid rgba(200, 192, 175, 0.35)',
            borderRadius: '24px',
            height: '100%',
            minHeight: '340px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
            <Sparkles size={16} style={{ color: 'var(--beige-primary)' }} />
            <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Live Score Standings
            </h3>
          </div>

          <div style={{ width: '100%', height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={scoredStudents}
                margin={{ top: 10, right: 10, left: -20, bottom: isMobile ? 25 : 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(200, 192, 175, 0.25)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--text-muted)" 
                  fontSize={isMobile ? 8 : 10} 
                  interval={0} 
                  height={isMobile ? 45 : 30}
                  tick={{ 
                    fill: 'var(--text-secondary)',
                    angle: isMobile ? -30 : 0,
                    textAnchor: isMobile ? 'end' : 'middle'
                  }} 
                  tickFormatter={(name) => isMobile ? name.split(' ')[0] : name}
                />
                <YAxis stroke="var(--text-muted)" fontSize={11} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#ffffff', 
                    border: '1px solid rgba(200, 192, 175, 0.5)',
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    fontSize: '11px',
                    boxShadow: '0 4px 12px rgba(140, 125, 99, 0.05)'
                  }}
                  formatter={(value) => [`${value} Points`, 'Score']}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {scoredStudents.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        index === 0 
                          ? 'var(--beige-primary)' 
                          : index < 3 
                            ? 'var(--beige-bright)' 
                            : 'rgba(200, 192, 175, 0.4)'
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sorted Students Ranking Table */}
      <div 
        className="glass-panel"
        style={{
          padding: '24px',
          background: 'rgba(255, 255, 255, 0.4)',
          border: '1px solid rgba(200, 192, 175, 0.35)',
          borderRadius: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
          <Trophy size={16} style={{ color: 'var(--beige-primary)' }} />
          <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            RAG Ranking & Classifications
          </h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table 
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.85rem',
              textAlign: 'left'
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(200, 192, 175, 0.4)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 10px', fontWeight: 700 }}>RANK</th>
                <th style={{ padding: '12px 10px', fontWeight: 700 }}>STUDENT</th>
                <th style={{ padding: '12px 10px', fontWeight: 700 }}>GPA</th>
                <th className="mobile-hide" style={{ padding: '12px 10px', fontWeight: 700 }}>COMMUNITY</th>
                <th className="mobile-hide" style={{ padding: '12px 10px', fontWeight: 700 }}>SKILLS</th>
                <th className="mobile-hide" style={{ padding: '12px 10px', fontWeight: 700 }}>PROJECTS</th>
                <th style={{ padding: '12px 10px', fontWeight: 700, textAlign: 'center' }}>SCORE</th>
                <th style={{ padding: '12px 10px', fontWeight: 700 }}>CLASSIFICATION</th>
              </tr>
            </thead>
            <tbody>
              {scoredStudents.map((s, idx) => (
                <tr 
                  key={s.id} 
                  style={{ 
                    borderBottom: '1px solid rgba(200, 192, 175, 0.2)',
                    background: idx === 0 ? 'rgba(200, 192, 175, 0.1)' : 'none',
                    transition: 'background 0.2s'
                  }}
                  className="glass-panel-hover"
                >
                  <td style={{ padding: '14px 10px', fontWeight: 700, color: idx === 0 ? 'var(--beige-primary)' : 'var(--text-muted)' }}>
                    #{idx + 1}
                  </td>
                  <td style={{ padding: '14px 10px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>{s.major}</div>
                  </td>
                  <td style={{ padding: '14px 10px', color: 'var(--text-secondary)', fontWeight: 500 }}>{s.gpa.toFixed(2)}</td>
                  <td className="mobile-hide" style={{ padding: '14px 10px', color: 'var(--text-secondary)', fontWeight: 500 }}>{s.communityHours} Hrs</td>
                  <td className="mobile-hide" style={{ padding: '14px 10px', color: 'var(--text-secondary)', fontWeight: 500 }}>{s.skills.length}</td>
                  <td className="mobile-hide" style={{ padding: '14px 10px', color: 'var(--text-secondary)', fontWeight: 500 }}>{s.projects.length}</td>
                  <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                    <span 
                      style={{ 
                        fontWeight: 800, 
                        color: idx === 0 ? 'var(--beige-primary)' : 'var(--text-primary)',
                        background: 'rgba(255, 255, 255, 0.8)',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        border: '1px solid rgba(200, 192, 175, 0.35)'
                      }}
                    >
                      {s.score}
                    </span>
                  </td>
                  <td style={{ padding: '14px 10px' }}>
                    <span 
                      style={{ 
                        color: s.classificationColor, 
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        border: `1px solid ${s.classificationColor}40`,
                        background: `rgba(255, 255, 255, 0.8)`,
                        padding: '3px 12px',
                        borderRadius: '9999px'
                      }}
                    >
                      {s.classification}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
export default AnalyticsView;
