import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Search, BookOpen, Layers, Users, TrendingUp } from 'lucide-react';
import { queryRagSystem, students } from '../data/students';
import type { Student } from '../data/students';

interface Message {
  sender: 'user' | 'rag';
  text: string;
  references?: string[];
  timestamp: Date;
}

interface RagChatProps {
  onSelectStudent: (student: Student) => void;
  onSwitchTab: (tab: string) => void;
}

export const RagChat: React.FC<RagChatProps> = ({ onSelectStudent, onSwitchTab }) => {
  const [queryText, setQueryText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'rag',
      text: "Hello! I am the Student RAG Insights Assistant. I have indexed our student academic database, including GPA, community hours, research papers, project details, and demographic markers.\n\nAsk me any question about our students, sort them by specific criteria, or request a comparison. For example, try clicking one of the suggested prompts below!",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    { text: "Find students with high academic standing who also have substantial community service hours.", label: "Top Scholar-Leaders" },
    { text: "Compare Aria Sterling and Elena Rostova in terms of community leadership and GPA.", label: "Aria vs Elena" },
    { text: "Recommend a student who has strong Python coding skills and is highly active in community service.", label: "Python Outreach Experts" },
    { text: "Compare Marcus Vance and Elena Rostova.", label: "Marcus vs Elena" }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setQueryText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = queryRagSystem(text);
      const ragMsg: Message = {
        sender: 'rag',
        text: response.answer,
        references: response.referencedStudentIds,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, ragMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const renderTextContent = (text: string) => {
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h3 key={idx} style={{ color: 'var(--beige-primary)', margin: '14px 0 8px 0', fontSize: '1.05rem', fontWeight: 700 }}>{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('* ') || line.startsWith('- ')) {
        const cleaned = line.substring(2);
        return <li key={idx} style={{ marginLeft: '16px', marginBottom: '6px', color: 'var(--text-secondary)' }}>{parseBoldText(cleaned)}</li>;
      }
      if (/^\d+\.\s/.test(line)) {
        return <div key={idx} style={{ marginLeft: '12px', marginBottom: '6px', color: 'var(--text-secondary)' }}>{parseBoldText(line)}</div>;
      }
      return <p key={idx} style={{ marginBottom: '8px', lineHeight: '1.5', color: 'var(--text-secondary)' }}>{parseBoldText(line)}</p>;
    });
  };

  const parseBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} style={{ color: 'var(--beige-primary)', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="chat-container">
      {/* Sidebar - RAG Stats and Quick Actions */}
      <div 
        className="glass-panel chat-sidebar"
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.45)',
          border: '1px solid rgba(200, 192, 175, 0.35)',
          borderRadius: '24px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Sparkles size={18} style={{ color: 'var(--beige-primary)' }} />
            <h2 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Knowledge Base
            </h2>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.7)', border: '1px solid rgba(200, 192, 175, 0.3)', borderRadius: '14px', padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 700 }}>
                <Users size={12} style={{ color: 'var(--beige-primary)' }} />
                INDEXED PROFILES
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{students.length} Students</div>
            </div>
            
            <div style={{ background: 'rgba(255, 255, 255, 0.7)', border: '1px solid rgba(200, 192, 175, 0.3)', borderRadius: '14px', padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 700 }}>
                <TrendingUp size={12} style={{ color: 'var(--beige-primary)' }} />
                MEAN ACC GPA
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {(students.reduce((acc, curr) => acc + curr.gpa, 0) / students.length).toFixed(2)}
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.7)', border: '1px solid rgba(200, 192, 175, 0.3)', borderRadius: '14px', padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 700 }}>
                <BookOpen size={12} style={{ color: 'var(--beige-primary)' }} />
                FOCUS FACTORS
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: '1.4' }}>
                GPA, Communities, Hackathons, Projects, GIS, CS, Bioinformatics
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            <p style={{ fontWeight: 700, color: 'var(--beige-primary)', marginBottom: '4px' }}>Vector Mappings:</p>
            Our retrieval agent fetches matching student embeddings based on academic transcripts and community records.
          </div>
        </div>

        <button
          onClick={() => onSwitchTab('compare')}
          className="capsule-button-primary"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px'
          }}
        >
          <Layers size={14} />
          Go to Compare
        </button>
      </div>

      {/* Chat Pane */}
      <div 
        className="glass-panel chat-pane"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px',
          background: 'rgba(255, 255, 255, 0.45)',
          border: '1px solid rgba(200, 192, 175, 0.35)',
          borderRadius: '24px',
          overflow: 'hidden'
        }}
      >
        {/* Messages Stream */}
        <div 
          className="chat-messages-stream"
          style={{
            flex: 1,
            overflowY: 'auto',
            paddingRight: '8px',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}
        >
          {messages.map((msg, index) => (
            <div 
              key={index}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
              className="animate-fade-in"
            >
              {/* Message Bubble (Frosted glass bubble styling) */}
              <div 
                style={{
                  background: msg.sender === 'user' ? '#ffffff' : 'rgba(200, 192, 175, 0.12)',
                  border: msg.sender === 'user' ? '1px solid rgba(200, 192, 175, 0.4)' : '1px solid rgba(200, 192, 175, 0.2)',
                  borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  padding: '14px 18px',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)',
                  boxShadow: msg.sender === 'user' ? '0 6px 20px rgba(140, 125, 99, 0.05)' : 'none'
                }}
              >
                {msg.sender === 'user' ? (
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{msg.text}</p>
                ) : (
                  <div>{renderTextContent(msg.text)}</div>
                )}
              </div>

              {/* Timestamp */}
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', padding: '0 6px', fontWeight: 500 }}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>

              {/* Render references as clickable cards */}
              {msg.references && msg.references.length > 0 && (
                <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '10px', width: '100%' }}>
                  <div style={{ width: '100%', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>
                    RETRIEVED NODES:
                  </div>
                  {msg.references.map(refId => {
                    const student = students.find(s => s.id === refId);
                    if (!student) return null;
                    return (
                      <div 
                        key={refId}
                        onClick={() => onSelectStudent(student)}
                        style={{
                          background: '#ffffff',
                          border: '1px solid rgba(200, 192, 175, 0.35)',
                          borderRadius: '16px',
                          padding: '10px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontSize: '0.8rem'
                        }}
                        className="glass-panel-card reference-card"
                      >
                        <div style={{ 
                          width: '28px', 
                          height: '28px', 
                          borderRadius: '50%', 
                          background: 'linear-gradient(135deg, var(--bg-cream-darker), var(--beige-bright))',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          color: 'var(--text-primary)',
                          fontWeight: 'bold',
                          fontSize: '0.75rem',
                          border: '1px solid rgba(200, 192, 175, 0.2)'
                        }}>
                          {student.avatar}
                        </div>
                        <div>
                          <div style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{student.name}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 500 }}>{student.major} • GPA {student.gpa}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div 
                style={{
                  background: 'rgba(200, 192, 175, 0.1)',
                  border: '1px solid rgba(200, 192, 175, 0.2)',
                  borderRadius: '14px',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--beige-primary)', borderRadius: '50%', animation: 'fadeIn 1s infinite alternate' }}></div>
                <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--beige-primary)', borderRadius: '50%', animation: 'fadeIn 1s infinite alternate 0.2s' }}></div>
                <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--beige-primary)', borderRadius: '50%', animation: 'fadeIn 1s infinite alternate 0.4s' }}></div>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>Retrieving index mappings...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggested Prompts Grid */}
        {messages.length === 1 && (
          <div style={{ marginBottom: '15px' }}>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>
              Suggested Queries
            </span>
            <div className="suggested-prompts-grid">
              {suggestedPrompts.map((p, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(p.text)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(200, 192, 175, 0.45)',
                    borderRadius: '16px',
                    color: 'var(--text-secondary)',
                    padding: '10px 14px',
                    fontSize: '0.8rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word'
                  }}
                  className="glass-panel-card"
                  title={p.text}
                >
                  <span style={{ color: 'var(--beige-primary)', fontWeight: 700, display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {p.label}
                  </span>
                  {p.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar (Capsule design) */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(queryText); }}
          style={{
            display: 'flex',
            gap: '10px',
            background: '#ffffff',
            border: '1px solid rgba(200, 192, 175, 0.5)',
            borderRadius: '9999px',
            padding: '4px 6px 4px 18px',
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(140, 125, 99, 0.04)'
          }}
        >
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input 
            type="text"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            placeholder="Ask RAG to inspect or compare nodes..."
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              height: '40px'
            }}
          />
          <button
            type="submit"
            style={{
              background: 'var(--beige-primary)',
              border: 'none',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
              transition: 'all 0.2s'
            }}
            className="glow-btn"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
};
export default RagChat;
