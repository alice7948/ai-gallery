const fs = require('fs');
const path = require('path');

// tools.jsonを読み込み
const toolsPath = path.join(__dirname, '../data/tools.json');
const toolsData = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

// APIキー
const API_KEY = process.env.SCREENSHOT_API_KEY || 'test-key';

// 各ツールのスクリーンショットURLを更新
function updateScreenshots() {
  const updatedTools = toolsData.tools.map(tool => {
    // Screenshotone APIを使用
    const screenshotUrl = `https://api.screenshotone.com/take?access_key=${API_KEY}&url=${encodeURIComponent(tool.url)}&viewport_width=600&viewport_height=400&format=jpg&cache=true`;
    
    return {
      ...tool,
      screenshot: screenshotUrl
    };
  });

  // 更新したデータを保存
  const updatedData = { tools: updatedTools };
  fs.writeFileSync(toolsPath, JSON.stringify(updatedData, null, 2));
  
  console.log('✅ Screenshots updated for all tools');
}

// 実行
updateScreenshots();
