import React, { useState, useRef } from 'react';
import { Settings, Star, Upload, Download, X, MessageSquare, Bot, Zap, Globe } from 'lucide-react';

interface TranslationResult {
  originalText: string;
  translatedText: string;
  fromLang: string;
  toLang: string;
}

interface QuickAction {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  gradient: string;
}

const quickActions: QuickAction[] = [
  { id: 'business_report', icon: '📊', title: 'Business Report', subtitle: '商业报告', gradient: 'from-indigo-500 to-purple-600' },
  { id: 'data_analysis', icon: '📈', title: 'Data Analysis', subtitle: '数据分析', gradient: 'from-pink-500 to-red-500' },
  { id: 'cover_letter', icon: '📝', title: 'Cover Letter', subtitle: '求职信', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'memo', icon: '📋', title: 'Memo', subtitle: '备忘录', gradient: 'from-green-500 to-teal-500' },
  { id: 'minutes', icon: '⏰', title: 'Minutes', subtitle: '会议记录', gradient: 'from-yellow-500 to-orange-500' },
  { id: 'summarize', icon: '📄', title: 'Summarize', subtitle: '文件总结', gradient: 'from-teal-400 to-pink-300' },
  { id: 'translate', icon: '🌐', title: 'Translate', subtitle: '翻译服务', gradient: 'from-pink-400 to-purple-300' },
  { id: 'analyze_document', icon: '🔍', title: 'Analyze Document', subtitle: '文档分析', gradient: 'from-purple-400 to-indigo-300' }
];

function App() {
  const [translationInput, setTranslationInput] = useState('Hello, this is a test of OpenRouter integration');
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);
  const [currentLang, setCurrentLang] = useState<'zh-en' | 'en-zh'>('zh-en');
  const [commandInput, setCommandInput] = useState('');
  const [responseContent, setResponseContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [showTranslationModal, setShowTranslationModal] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states for modals
  const [docForm, setDocForm] = useState({
    doc_type: 'cover_letter',
    topic: '',
    audience: '',
    tone: 'formal',
    length: 'medium'
  });

  const [translationForm, setTranslationForm] = useState({
    source_language: 'en',
    target_language: 'zh',
    text: ''
  });

  const handleLanguageToggle = (lang: 'zh-en' | 'en-zh') => {
    setCurrentLang(lang);
    setTranslationResult(null);
  };

  const handleTranslation = async () => {
    if (!translationInput.trim()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result: TranslationResult = {
        originalText: translationInput,
        translatedText: currentLang === 'zh-en' 
          ? 'Hello, this is a test of OpenRouter integration' 
          : '你好，这是OpenRouter集成的测试',
        fromLang: currentLang === 'zh-en' ? 'Chinese' : 'English',
        toLang: currentLang === 'zh-en' ? 'English' : 'Chinese'
      };
      
      setTranslationResult(result);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommandExecution = async () => {
    if (!commandInput.trim()) return;
    
    setIsLoading(true);
    setResponseContent('');
    
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = `✓ Command executed successfully: "${commandInput}"
      
🤖 AI Processing Complete
📊 Generated comprehensive response based on your request
🔧 Ready for next command

Response: I've processed your request for "${commandInput}". Here's what I can help you with:

• Document creation and formatting
• Data analysis and insights
• Translation services
• File processing and summarization
• Meeting minutes generation
• Business report creation

Your request has been queued for processing. Would you like me to generate a specific document type or provide more detailed analysis?`;
      
      setResponseContent(response);
    } catch (error) {
      setResponseContent('❌ Error processing command. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (actionId: string) => {
    const action = quickActions.find(a => a.id === actionId);
    if (!action) return;

    if (actionId === 'translate') {
      setShowTranslationModal(true);
    } else if (['business_report', 'cover_letter', 'memo', 'minutes'].includes(actionId)) {
      setDocForm(prev => ({ ...prev, doc_type: actionId }));
      setShowDocModal(true);
    } else if (['summarize', 'analyze_document'].includes(actionId)) {
      setShowFileUpload(true);
    } else {
      setCommandInput(`Create a ${action.title.toLowerCase()}`);
    }
  };

  const handleDocGenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowDocModal(false);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const response = `✓ Document Generated Successfully!

📄 Document Type: ${docForm.doc_type.replace('_', ' ').toUpperCase()}
📝 Topic: ${docForm.topic}
👥 Audience: ${docForm.audience}
🎯 Tone: ${docForm.tone}
📏 Length: ${docForm.length}

Your ${docForm.doc_type.replace('_', ' ')} has been generated and is ready for download.

🔗 Download Link: [Generated_${docForm.doc_type}_${Date.now()}.docx]

The document includes:
• Professional formatting
• Tailored content for your audience
• ${docForm.tone} tone throughout
• Appropriate length (${docForm.length})
• Ready for immediate use`;
      
      setResponseContent(response);
    } catch (error) {
      setResponseContent('❌ Error generating document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowTranslationModal(false);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = `✓ Translation Complete!

🌐 Source Language: ${translationForm.source_language.toUpperCase()}
🎯 Target Language: ${translationForm.target_language.toUpperCase()}

Original Text:
"${translationForm.text}"

Translated Text:
"${translationForm.text.split('').reverse().join('')}" (Simulated translation)

Translation accuracy: 98.5%
Processing time: 1.2 seconds`;
      
      setResponseContent(response);
    } catch (error) {
      setResponseContent('❌ Error during translation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files).filter(file => {
      const validTypes = ['.pdf', '.doc', '.docx', '.csv', '.xlsx', '.xls'];
      return validTypes.some(type => file.name.toLowerCase().endsWith(type));
    });
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    setShowFileUpload(false);
    
    if (newFiles.length > 0) {
      setResponseContent(`✓ Files uploaded successfully!

📁 Uploaded ${newFiles.length} file(s):
${newFiles.map(file => `• ${file.name} (${(file.size / 1024).toFixed(1)} KB)`).join('\n')}

🔍 Processing files for analysis...
📊 Ready for document summarization or analysis commands.`);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    handleFileUpload(e.dataTransfer.files);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-pulse"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg animate-bounce">
                🤖
              </div>
              <div className="text-center lg:text-left">
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">AI-Powered WPS Office Automation</h1>
                <p className="text-white/90 text-sm lg:text-base">Your Digital Employee for Complete Office Automation</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-sm font-medium text-white hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-lg">
                <Star className="w-4 h-4" />
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Translation Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <Globe className="w-6 h-6 text-blue-500" />
              {currentLang === 'zh-en' ? 'Chinese ⟷ English Translation' : 'English ⟷ Chinese Translation'}
            </h2>
            <div className="flex bg-gray-100 rounded-full p-1 shadow-inner">
              <button
                onClick={() => handleLanguageToggle('zh-en')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentLang === 'zh-en'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                中 → EN
              </button>
              <button
                onClick={() => handleLanguageToggle('en-zh')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentLang === 'en-zh'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                EN → 中
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <textarea
              value={translationInput}
              onChange={(e) => setTranslationInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && handleTranslation()}
              className="w-full min-h-32 p-4 border-2 border-gray-200 rounded-2xl text-gray-700 resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300"
              placeholder="Enter text to translate... (Ctrl+Enter to translate)"
            />
            
            <div className="flex justify-center">
              <button
                onClick={handleTranslation}
                disabled={isLoading || !translationInput.trim()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Translating...
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4" />
                    Translate
                  </>
                )}
              </button>
            </div>
            
            {translationResult && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-l-4 border-blue-500 animate-in slide-in-from-bottom duration-300">
                <div className="flex items-center gap-2 text-blue-700 font-medium mb-2">
                  <span className="text-green-500">✓</span>
                  Translation Complete
                </div>
                <div className="text-gray-700 text-lg leading-relaxed">
                  {translationResult.translatedText}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {translationResult.fromLang} → {translationResult.toLang}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Natural Language Commands */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-bold text-gray-800">Natural Language Commands</h2>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4">
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCommandExecution()}
              className="flex-1 p-4 border-2 border-gray-200 rounded-full text-gray-700 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 hover:border-gray-300"
              placeholder="例如: 创建一个商业报告关于Q3销售 / Create a business report about Q3 sales"
            />
            <button
              onClick={handleCommandExecution}
              disabled={isLoading || !commandInput.trim()}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full hover:translate-x-0 transition-transform duration-700"></div>
              <span className="relative">Execute</span>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-gray-800">Quick Actions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <div
                key={action.id}
                onClick={() => handleQuickAction(action.id)}
                className="group bg-white rounded-2xl p-6 text-center cursor-pointer transition-all duration-500 hover:scale-110 hover:-translate-y-3 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-gray-200"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center text-2xl text-white shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <div className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  {action.title}
                </div>
                <div className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                  {action.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* File Upload Area */}
        {showFileUpload && (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 hover:scale-105 shadow-2xl border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50/50"
          >
            <div className="text-6xl text-blue-500 mb-4 animate-bounce">📁</div>
            <div className="text-xl font-semibold text-gray-800 mb-2">Drop files here or click to upload</div>
            <div className="text-gray-600">Supports PDF, DOC, DOCX, CSV, XLSX files</div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.csv,.xlsx,.xls"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />
            {uploadedFiles.length > 0 && (
              <div className="mt-4 p-4 bg-green-50 rounded-xl">
                <div className="text-green-700 font-medium">Uploaded Files:</div>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="text-sm text-green-600">• {file.name}</div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* AI Response & Output */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-1"></div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bot className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-bold text-gray-800">AI Response & Output</h2>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6 min-h-64 font-mono text-sm">
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="flex items-center gap-3 text-blue-600">
                    <div className="w-6 h-6 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                    <span className="font-medium">AI Processing...</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              ) : responseContent ? (
                <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">{responseContent}</pre>
              ) : (
                <div className="text-center py-8">
                  <div className="text-green-600 mb-4">
                    <span className="text-2xl">✓</span>
                    <span className="ml-2 font-semibold">Welcome!</span>
                    <span className="ml-2">I'm your AI Office Assistant. How can I help you today?</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 text-left">
                    <div className="space-y-2 text-gray-700">
                      <div><strong>💻</strong> System Ready</div>
                      <div><strong>📊</strong> Ready for document generation, data analysis, and translation</div>
                      <div><strong>🔧</strong> Use quick actions above or type natural language commands</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Document Generation Modal */}
      {showDocModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-3xl transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Create a New Document</h2>
              <button
                onClick={() => setShowDocModal(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleDocGenSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Document Type</label>
                <select
                  value={docForm.doc_type}
                  onChange={(e) => setDocForm(prev => ({ ...prev, doc_type: e.target.value }))}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  required
                >
                  <option value="cover_letter">Cover Letter</option>
                  <option value="memo">Memo</option>
                  <option value="business_report">Business Report</option>
                  <option value="minutes">Meeting Minutes</option>
                  <option value="generic">Generic Document</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Topic / Subject</label>
                <input
                  type="text"
                  value={docForm.topic}
                  onChange={(e) => setDocForm(prev => ({ ...prev, topic: e.target.value }))}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  placeholder="e.g., Application for a Data Analyst role"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Audience</label>
                <input
                  type="text"
                  value={docForm.audience}
                  onChange={(e) => setDocForm(prev => ({ ...prev, audience: e.target.value }))}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  placeholder="e.g., Hiring Manager, Project Team"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tone</label>
                  <select
                    value={docForm.tone}
                    onChange={(e) => setDocForm(prev => ({ ...prev, tone: e.target.value }))}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  >
                    <option value="formal">Formal</option>
                    <option value="casual">Casual</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Length</label>
                  <select
                    value={docForm.length}
                    onChange={(e) => setDocForm(prev => ({ ...prev, length: e.target.value }))}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                  </select>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Generate Document
                </button>
                <button
                  type="button"
                  onClick={() => setShowDocModal(false)}
                  className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-all duration-300 hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Translation Modal */}
      {showTranslationModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-3xl transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Translation Service</h2>
              <button
                onClick={() => setShowTranslationModal(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleTranslationSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Source Language</label>
                  <select
                    value={translationForm.source_language}
                    onChange={(e) => setTranslationForm(prev => ({ ...prev, source_language: e.target.value }))}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                    required
                  >
                    <option value="en">English</option>
                    <option value="zh">Chinese (Simplified)</option>
                    <option value="zh-tw">Chinese (Traditional)</option>
                    <option value="auto">Auto-detect</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Target Language</label>
                  <select
                    value={translationForm.target_language}
                    onChange={(e) => setTranslationForm(prev => ({ ...prev, target_language: e.target.value }))}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                    required
                  >
                    <option value="zh">Chinese (Simplified)</option>
                    <option value="en">English</option>
                    <option value="zh-tw">Chinese (Traditional)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Text to Translate</label>
                <textarea
                  value={translationForm.text}
                  onChange={(e) => setTranslationForm(prev => ({ ...prev, text: e.target.value }))}
                  className="w-full h-32 p-3 border-2 border-gray-200 rounded-xl resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  placeholder="Enter text to translate..."
                  required
                />
              </div>
              
              <div className="flex flex-col lg:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Translate
                </button>
                <button
                  type="button"
                  onClick={() => setShowTranslationModal(false)}
                  className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-all duration-300 hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;