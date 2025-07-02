const fs = require('fs');
const path = require('path');
const themes = ['butterfly', 'next', 'fluid', 'matery', 'stellar']; // 更多主题选择
const configPath = path.join(__dirname, '../_config.yml');

let themeIndex = 0;
let postCounter = 0;

function changeTheme() {
  postCounter++;
  
  // 每5篇文章切换一次主题
  if (postCounter % 5 === 0) {
    themeIndex = (themeIndex + 1) % themes.length;
    const newTheme = themes[themeIndex];
    
    const config = fs.readFileSync(configPath, 'utf8');
    const updatedConfig = config.replace(
      /theme: .*/,
      `theme: ${newTheme}`
    );
    
    fs.writeFileSync(configPath, updatedConfig);
    console.log(`主题已切换为: ${newTheme}`);
    return newTheme;
  }
  
  // 不切换主题时返回当前主题
  const config = fs.readFileSync(configPath, 'utf8');
  const match = config.match(/theme: (.*)/);
  return match ? match[1] : themes[0];
}

module.exports = {
  changeTheme,
  getCurrentTheme: () => {
    const config = fs.readFileSync(configPath, 'utf8');
    const match = config.match(/theme: (.*)/);
    return match ? match[1] : themes[0];
  }
};