import { useState } from 'react';
import { Sparkles, Users, Scale, Sliders } from 'lucide-react';
import MacTitleBar from './components/MacTitleBar';
import RagChat from './components/RagChat';
import StudentDirectory from './components/StudentDirectory';
import ComparisonView from './components/ComparisonView';
import AnalyticsView from './components/AnalyticsView';
import type { Student } from './data/students';

function App() {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'directory', 'compare', 'analytics'
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);


  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setActiveTab('directory');
  };

  return (
    <div className="app-container">
      
      {/* Background Glowing Ambient Spheres (Soft cream and white highlights) */}
      <div 
        className="sphere-glow"
        style={{
          top: '15%',
          left: '20%',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, #ffffff 0%, rgba(223, 216, 202, 0.6) 60%, transparent 100%)',
          boxShadow: '0 0 100px rgba(223, 216, 202, 0.4)',
          animation: 'float-slow 22s infinite alternate ease-in-out',
          zIndex: 0
        }}
      ></div>
      
      <div 
        className="sphere-glow"
        style={{
          bottom: '20%',
          right: '15%',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, #ffffff 0%, rgba(200, 192, 175, 0.5) 60%, transparent 100%)',
          boxShadow: '0 0 120px rgba(200, 192, 175, 0.3)',
          animation: 'float-slow 18s infinite alternate-reverse ease-in-out',
          animationDelay: '-4s',
          zIndex: 0
        }}
      ></div>

      <div className="glass-panel main-glass-panel">
        {/* macOS Window Controls Header */}
        <MacTitleBar 
          title="RAG-Student Query System" 
          subtitle="Indexed Knowledge Database & Multi-Agent Comparison" 
        />

        {/* Tab Controls Bar */}
        <div className="tab-controls-bar">
          <div className="tab-container">
            {/* Tab Button: Ask RAG */}
            <button
              onClick={() => setActiveTab('chat')}
              className={`tab-btn ${activeTab === 'chat' ? 'tab-btn-active' : ''}`}
            >
              <Sparkles size={15} />
              Ask RAG AI
            </button>

            {/* Tab Button: Student Directory */}
            <button
              onClick={() => setActiveTab('directory')}
              className={`tab-btn ${activeTab === 'directory' ? 'tab-btn-active' : ''}`}
            >
              <Users size={15} />
              Student Directory
            </button>

            {/* Tab Button: Comparison */}
            <button
              onClick={() => setActiveTab('compare')}
              className={`tab-btn ${activeTab === 'compare' ? 'tab-btn-active' : ''}`}
            >
              <Scale size={15} />
              Compare Tools
            </button>

            {/* Tab Button: Analytics & Sorting */}
            <button
              onClick={() => setActiveTab('analytics')}
              className={`tab-btn ${activeTab === 'analytics' ? 'tab-btn-active' : ''}`}
            >
              <Sliders size={15} />
              Factor Weighing
            </button>
          </div>
        </div>

        {/* View Layout Switcher */}
        <div className="app-view-content">
          {activeTab === 'chat' && (
            <RagChat 
              onSelectStudent={handleSelectStudent} 
              onSwitchTab={(tab) => setActiveTab(tab)} 
            />
          )}
          {activeTab === 'directory' && (
            <StudentDirectory 
              onSelectStudent={setSelectedStudent} 
              selectedStudent={selectedStudent} 
              onCloseModal={() => setSelectedStudent(null)} 
            />
          )}
          {activeTab === 'compare' && (
            <ComparisonView />
          )}
          {activeTab === 'analytics' && (
            <AnalyticsView />
          )}
        </div>

        {/* Console Status Footer */}
        <div className="app-footer">
          <div className="app-footer-brand">
            BY TRAIT CENTER
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
